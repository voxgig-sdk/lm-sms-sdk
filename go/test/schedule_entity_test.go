package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/lm-sms-sdk/go"
	"github.com/voxgig-sdk/lm-sms-sdk/go/core"

	vs "github.com/voxgig-sdk/lm-sms-sdk/go/utility/struct"
)

func TestScheduleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Schedule(nil)
		if ent == nil {
			t.Fatal("expected non-nil ScheduleEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"schedule": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Schedule(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Schedule(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := scheduleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "schedule." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_SMS_TEST_SCHEDULE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		scheduleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.schedule")))
		var scheduleRef01Data map[string]any
		if len(scheduleRef01DataRaw) > 0 {
			scheduleRef01Data = core.ToMapAny(scheduleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = scheduleRef01Data

		// LIST
		scheduleRef01Ent := client.Schedule(nil)
		scheduleRef01Match := map[string]any{}

		scheduleRef01ListResult, err := scheduleRef01Ent.List(scheduleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, scheduleRef01ListOk := scheduleRef01ListResult.([]any)
		if !scheduleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", scheduleRef01ListResult)
		}

		// UPDATE
		scheduleRef01DataUp0Up := map[string]any{
			"id": scheduleRef01Data["id"],
		}

		scheduleRef01MarkdefUp0Name := "messageId"
		scheduleRef01MarkdefUp0Value := fmt.Sprintf("Mark01-schedule_ref01_%d", setup.now)
		scheduleRef01DataUp0Up[scheduleRef01MarkdefUp0Name] = scheduleRef01MarkdefUp0Value

		scheduleRef01ResdataUp0Result, err := scheduleRef01Ent.Update(scheduleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		scheduleRef01ResdataUp0 := core.ToMapAny(entityData(scheduleRef01ResdataUp0Result))
		if scheduleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if scheduleRef01ResdataUp0["id"] != scheduleRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if scheduleRef01ResdataUp0[scheduleRef01MarkdefUp0Name] != scheduleRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", scheduleRef01MarkdefUp0Name, scheduleRef01ResdataUp0[scheduleRef01MarkdefUp0Name])
		}

		// LOAD
		scheduleRef01MatchDt0 := map[string]any{
			"id": scheduleRef01Data["id"],
		}
		scheduleRef01DataDt0Loaded, err := scheduleRef01Ent.Load(scheduleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		scheduleRef01DataDt0LoadResult := core.ToMapAny(entityData(scheduleRef01DataDt0Loaded))
		if scheduleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if scheduleRef01DataDt0LoadResult["id"] != scheduleRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func scheduleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "schedule", "ScheduleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read schedule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse schedule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"schedule01", "schedule02", "schedule03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LM_SMS_TEST_SCHEDULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_SMS_TEST_SCHEDULE_ENTID": idmap,
		"LM_SMS_TEST_LIVE":      "FALSE",
		"LM_SMS_TEST_EXPLAIN":   "FALSE",
		"LM_SMS_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_SMS_TEST_SCHEDULE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LM_SMS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LM_SMS_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewLmSmsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LM_SMS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LM_SMS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
