"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ScheduleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_SMS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_SMS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmSmsSDK.test();
        const ent = testsdk.Schedule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_SMS_TEST_LIVE;
        for (const op of ['list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'schedule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "messageId": { "a": true, "fo": "uuid", "h": "Message Id", "n": "messageId", "r": false, "t": "`$STRING`", "key$": "messageId", "index$": 1 }, "recipient": { "a": true, "h": "Recipient", "n": "recipient", "r": false, "t": "`$STRING`", "key$": "recipient", "index$": 2 }, "scheduledAtDate": { "a": true, "fo": "date-time", "h": "Scheduled At Date", "n": "scheduledAtDate", "r": false, "t": "`$STRING`", "key$": "scheduledAtDate", "index$": 3 }, "sendAtDate": { "a": true, "fo": "date-time", "h": "Send At Date", "n": "sendAtDate", "r": false, "t": "`$STRING`", "key$": "sendAtDate", "index$": 4 }, "tag": { "a": true, "h": "Tag", "n": "tag", "r": false, "t": "`$STRING`", "key$": "tag", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "schedule", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /sms/v1/schedules", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 25, "k": "query", "n": "size", "or": "size", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$ARRAY`", "index$": 3 }, { "a": true, "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/sms/v1/schedules", "q": { "exist": ["end", "page", "size", "sort", "start", "tag"] }, "r": {}, "s": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /sms/v1/schedules/{messageId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/sms/v1/schedules/{messageId}", "q": { "exist": ["id"] }, "r": { "param": { "messageId": "id" } }, "s": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /sms/v1/schedules", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "message_id", "or": "message_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/sms/v1/schedules", "q": { "exist": ["message_id", "tag"] }, "r": {}, "s": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /sms/v1/schedules/{messageId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/sms/v1/schedules/{messageId}", "q": { "exist": ["id"] }, "r": { "param": { "messageId": "id" } }, "s": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }, { "var": "id" }], "t": { "req": { "sendAtDate": "`reqdata.send_at_date`" }, "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "schedule", "name__orig": "schedule", "Name": "Schedule", "name_": "schedule", "name-": "schedule", "NAME": "SCHEDULE", "index$": 0 }, { "active": true, "entity": "schedule", "key$": "BasicScheduleFlow", "kind": "basic", "name": "BasicScheduleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "schedule_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_up0", "textfield": "messageId" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_dt0" }, "m": { "id": "schedule01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "index$": 2 }] }, 'Schedule', { "GET /sms/v1/schedules": { "protocol": "http", "parameters": [{ "name": "sort", "in": "query", "description": "List of fields used to sort results", "schema": { "type": "array", "items": { "type": "string" } }, "index$": 0 }, { "name": "page", "in": "query", "description": "Requested page", "schema": { "type": "integer", "format": "int32", "default": 1 }, "index$": 1 }, { "name": "size", "in": "query", "description": "Number of items per page", "schema": { "maximum": 100, "minimum": 0, "type": "integer", "format": "int32", "default": 25 }, "index$": 2 }, { "name": "tag", "in": "query", "description": "Return schedule sending related with the same tag", "schema": { "type": "string" }, "index$": 3 }, { "name": "start", "in": "query", "description": "Return sending with scheduled date after start date", "schema": { "type": "string", "format": "date-time" }, "index$": 4 }, { "name": "end", "in": "query", "description": "Return sending with scheduled date before end date", "schema": { "type": "string", "format": "date-time" }, "index$": 5 }] }, "GET /sms/v1/schedules/{messageId}": { "protocol": "http", "parameters": [{ "name": "messageId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] }, "DELETE /sms/v1/schedules": { "protocol": "http", "parameters": [{ "name": "messageId", "in": "query", "schema": { "type": "string", "format": "uuid" }, "index$": 0 }, { "name": "tag", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /sms/v1/schedules/{messageId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "sendAtDate": { "type": "string", "format": "date-time", "key$": "sendAtDate" } }, "additionalProperties": false, "x-ref": "#/components/schemas/ScheduledSendingPatch", "index$": 1 } } } }, "parameters": [{ "name": "messageId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0];
        // LIST
        const schedule_ref01_ent = client.Schedule();
        const schedule_ref01_match = {};
        const schedule_ref01_list = (await schedule_ref01_ent.list(schedule_ref01_match)).map((e) => e.data());
        // UPDATE
        const schedule_ref01_data_up0 = {};
        schedule_ref01_data_up0.id = schedule_ref01_data.id;
        const schedule_ref01_markdef_up0 = { name: 'messageId', value: 'Mark01-schedule_ref01_' + setup.now };
        schedule_ref01_data_up0[schedule_ref01_markdef_up0.name] = schedule_ref01_markdef_up0.value;
        const schedule_ref01_resdata_up0 = (await schedule_ref01_ent.update(schedule_ref01_data_up0)).data();
        (0, node_assert_1.default)(schedule_ref01_resdata_up0.id === schedule_ref01_data_up0.id);
        (0, node_assert_1.default)(schedule_ref01_resdata_up0[schedule_ref01_markdef_up0.name] === schedule_ref01_markdef_up0.value);
        // LOAD
        const schedule_ref01_match_dt0 = {};
        schedule_ref01_match_dt0.id = schedule_ref01_data.id;
        const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(schedule_ref01_data_dt0.id === schedule_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/schedule/ScheduleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmSmsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['schedule01', 'schedule02', 'schedule03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_SMS_TEST_SCHEDULE_ENTID': idmap,
        'LM_SMS_TEST_LIVE': 'FALSE',
        'LM_SMS_TEST_EXPLAIN': 'FALSE',
        'LM_SMS_APIKEY': '',
    });
    idmap = env['LM_SMS_TEST_SCHEDULE_ENTID'];
    const live = 'TRUE' === env.LM_SMS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_SMS_TEST_SCHEDULE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LmSmsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LM_SMS_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LM_SMS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ScheduleEntity.test.js.map