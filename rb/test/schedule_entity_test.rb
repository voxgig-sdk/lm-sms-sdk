# Schedule entity test

require "minitest/autorun"
require "json"
require_relative "../LmSms_sdk"
require_relative "runner"

class ScheduleEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmSmsSDK.test(nil, nil)
    ent = testsdk.Schedule(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "schedule" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmSmsSDK.test(seed, nil)
    seen = base.Schedule(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmSmsConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmSmsSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Schedule(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = schedule_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "schedule." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMSMS_TEST_SCHEDULE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    schedule_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.schedule")))
    schedule_ref01_data = nil
    if schedule_ref01_data_raw.length > 0
      schedule_ref01_data = Helpers.to_map(schedule_ref01_data_raw[0][1])
    end

    # LIST
    schedule_ref01_ent = client.Schedule(nil)
    schedule_ref01_match = {}

    schedule_ref01_list_result = schedule_ref01_ent.list(schedule_ref01_match, nil)
    assert schedule_ref01_list_result.is_a?(Array)

    # UPDATE
    schedule_ref01_data_up0_up = {
    }

    schedule_ref01_markdef_up0_name = "message_id"
    schedule_ref01_markdef_up0_value = "Mark01-schedule_ref01_#{setup[:now]}"
    schedule_ref01_data_up0_up[schedule_ref01_markdef_up0_name] = schedule_ref01_markdef_up0_value

    schedule_ref01_resdata_up0_result = schedule_ref01_ent.update(schedule_ref01_data_up0_up, nil)
    schedule_ref01_resdata_up0 = Helpers.to_map(schedule_ref01_resdata_up0_result)
    assert !schedule_ref01_resdata_up0.nil?
    assert_equal schedule_ref01_resdata_up0[schedule_ref01_markdef_up0_name], schedule_ref01_markdef_up0_value

    # LOAD
    schedule_ref01_match_dt0 = {}
    schedule_ref01_data_dt0_loaded = schedule_ref01_ent.load(schedule_ref01_match_dt0, nil)
    assert !schedule_ref01_data_dt0_loaded.nil?

  end
end

def schedule_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "schedule", "ScheduleTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmSmsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["schedule01", "schedule02", "schedule03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LMSMS_TEST_SCHEDULE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMSMS_TEST_SCHEDULE_ENTID" => idmap,
    "LMSMS_TEST_LIVE" => "FALSE",
    "LMSMS_TEST_EXPLAIN" => "FALSE",
    "LMSMS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMSMS_TEST_SCHEDULE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LMSMS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LMSMS_APIKEY"],
      },
      extra || {},
    ])
    client = LmSmsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LMSMS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LMSMS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
