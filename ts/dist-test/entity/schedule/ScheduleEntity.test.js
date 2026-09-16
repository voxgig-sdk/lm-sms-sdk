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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uuid", "name": "messageId", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "recipient", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "date-time", "name": "scheduledAtDate", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "date-time", "name": "sendAtDate", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "tag", "req": false, "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "schedule", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "end", "orig": "end", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 25, "kind": "query", "name": "size", "orig": "size", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "kind": "query", "name": "start", "orig": "start", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "kind": "query", "name": "tag", "orig": "tag", "reqd": false, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /sms/v1/schedules", "json": "{\"parameters\":[{\"description\":\"List of fields used to sort results\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Requested page\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"format\":\"int32\",\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"size\",\"schema\":{\"default\":25,\"format\":\"int32\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Return schedule sending related with the same tag\",\"in\":\"query\",\"name\":\"tag\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Return sending with scheduled date after start date\",\"in\":\"query\",\"name\":\"start\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Return sending with scheduled date before end date\",\"in\":\"query\",\"name\":\"end\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"message\":{\"description\":\"Human-readable summary of the problem.\",\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"description\":\"Unique Id of the request made towards LINK\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sms/v1/schedules", "segments": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }], "select": { "exist": ["end", "page", "size", "sort", "start", "tag"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "message_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /sms/v1/schedules/{messageId}", "json": "{\"parameters\":[{\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sms/v1/schedules/{messageId}", "rename": { "param": { "messageId": "id" } }, "segments": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "message_id", "orig": "message_id", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "tag", "orig": "tag", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "DELETE /sms/v1/schedules", "json": "{\"parameters\":[{\"in\":\"query\",\"name\":\"messageId\",\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"tag\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/sms/v1/schedules", "segments": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }], "select": { "exist": ["message_id", "tag"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "message_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PATCH /sms/v1/schedules/{messageId}", "json": "{\"parameters\":[{\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PATCH", "orig": "/sms/v1/schedules/{messageId}", "rename": { "param": { "messageId": "id" } }, "segments": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "schedules" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": { "sendAtDate": "`reqdata.send_at_date`" }, "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "schedule", "name__orig": "schedule", "Name": "Schedule", "name_": "schedule", "name-": "schedule", "NAME": "SCHEDULE", "index$": 0 }, { "active": true, "entity": "schedule", "key$": "BasicScheduleFlow", "kind": "basic", "name": "BasicScheduleFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "schedule_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_up0", "textfield": "messageId" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "valid": [], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_dt0" }, "match": { "id": "schedule01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "index$": 2 }] }, 'Schedule');
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