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
(0, node_test_1.describe)('SendMessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_SMS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_SMS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmSmsSDK.test();
        const ent = testsdk.SendMessage();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_SMS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'send_message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "send_message", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /sms/v1", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/sms/v1", "q": {}, "r": {}, "s": [{ "lit": "sms" }, { "lit": "v1" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /sms/v1/messages", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/sms/v1/messages", "q": {}, "r": {}, "s": [{ "lit": "sms" }, { "lit": "v1" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "send_message", "name__orig": "send_message", "Name": "SendMessage", "name_": "send_message", "name-": "send-message", "NAME": "SEND_MESSAGE", "index$": 1 }, { "active": true, "entity": "send_message", "key$": "BasicSendMessageFlow", "kind": "basic", "name": "BasicSendMessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "send_message_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'SendMessage', { "POST /sms/v1": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "array", "items": { "required": ["content", "recipient"], "type": "object", "properties": { "recipient": { "minLength": 1, "pattern": "^\\+.*$", "type": "string", "description": "Recipients must be provided in MSISDN format. Remember that MSISDN must have a leading (+). Example: +4712345678" }, "content": { "required": ["options", "text"], "type": "object", "properties": { "text": { "maxLength": 38862, "minLength": 1, "type": "string", "description": "A single message can be 160 characters (GSM encoding). If message exceeds 160 characters each message part will be split in to 153 characters. Maximum length of a message is dependent on the operator you are sending towards.UCS2 encoding: 70/67 characters single/multipart." }, "options": { "required": [], "type": "object", "properties": {}, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageOptions" } }, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageContent" }, "schedule": { "type": "object", "oneOf": [{ "required": [] }, { "required": [] }], "properties": { "relative": { "maximum": 7889232000, "minimum": 600000, "type": "integer", "description": "Time specified in milliseconds of how much we will offset the message in the future. The maximum value is 3 months (7_889_232_000 milliseconds), which is also the default. The minimum value is 600000 ms (10 minutes)", "format": "int64" }, "absolute": { "type": "string", "description": "Absolute time specified of when this message should be sent. ISO8601 formatted string in UTC.", "format": "date-time" }, "tag": { "maxLength": 100, "minLength": 0, "pattern": "[a-zA-Z0-9_-]+", "type": "string", "description": "A tag for the message schedule. Can be used to group schedules by tag", "nullable": true } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageSchedule" }, "expiration": { "type": "object", "properties": { "relative": { "maximum": 172800000, "minimum": 1, "type": "integer", "description": "Time specified in milliseconds of how long the message is supposed to live. The maximum value is 48 hours (172800000 milliseconds), which is also the default.", "format": "int32" }, "absolute": { "type": "string", "description": "Absolute time specified of when this message should expire. ISO8601 formatted string in UTC.", "format": "date-time" } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageExpiration" }, "callback": { "type": "object", "properties": { "mode": { "enum": [], "type": "string", "description": "Choose how you want to receive your Delivery reports. Mode Profile sends any DLRs towards your default configuration in MyLINK portal), URL sends towards a list of urls provided in the request, Gate sends towards a referenced configuration from MyLINK portal, or None (no DLR is sent anywhere). Each mode requires different request parameters, refer to the fields below.", "x-ref": "#/components/schemas/MessageCallbackMode" }, "urls": { "type": "array", "items": {}, "description": "List of URLs to receive DLRs on. Mandatory when using mode \"URL\" - not relevant to any other modes.", "nullable": true }, "gateId": { "type": "string", "description": "The ID of the callback to be used. Can be set up in the Callbacks section of MyLINK portal. Mandatory when using mode \"Gate\" - not relevant to any other modes.", "nullable": true }, "ttl": { "maximum": 28800000, "minimum": 0, "type": "integer", "description": "Time specified in milliseconds of how long the delivery report is supposed to live. Max value: 28800000. Default value: 14400000. Applicable to all callback modes except for \"None\".<p>Example for mode Profile</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"Profile\" \n\t\t}\n\t}\n]</code></pre><p>Example for mode URL</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"URL\",\n\t\t\t\"urls\": [\"URL\"], \n\t\t\t\"ttl\": 0 \n\t\t}\n\t}\n]</code></pre><p>Example for mode Gate</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"Gate\",\n\t\t\t\"gateId\": \"fb8eac56-4311-4f09-94b9-54f4bee0acb6\", \n\t\t\t\"ttl\": 0 \n\t\t}\n\t}\n]</code></pre>", "format": "int32" } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageCallback" }, "referenceId": { "maxLength": 500, "type": "string", "description": "Your own internal transaction ID. Not used for anything except as a reference. Optional.", "nullable": true }, "priority": { "enum": ["Normal", "High", "Low"], "type": "string", "description": "Set priority on your own messages. Priority only affects your own queue.", "x-ref": "#/components/schemas/MessagePriority" } }, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageRequest" }, "index$": 1 } } } }, "parameters": [] }, "POST /sms/v1/messages": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "array", "items": { "required": ["content", "recipient"], "type": "object", "properties": { "recipient": { "minLength": 1, "pattern": "^\\+.*$", "type": "string", "description": "Recipients must be provided in MSISDN format. Remember that MSISDN must have a leading (+). Example: +4712345678" }, "content": { "required": ["options", "text"], "type": "object", "properties": { "text": { "maxLength": 38862, "minLength": 1, "type": "string", "description": "A single message can be 160 characters (GSM encoding). If message exceeds 160 characters each message part will be split in to 153 characters. Maximum length of a message is dependent on the operator you are sending towards.UCS2 encoding: 70/67 characters single/multipart." }, "options": { "required": [], "type": "object", "properties": {}, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageOptions" } }, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageContent" }, "schedule": { "type": "object", "oneOf": [{ "required": [] }, { "required": [] }], "properties": { "relative": { "maximum": 7889232000, "minimum": 600000, "type": "integer", "description": "Time specified in milliseconds of how much we will offset the message in the future. The maximum value is 3 months (7_889_232_000 milliseconds), which is also the default. The minimum value is 600000 ms (10 minutes)", "format": "int64" }, "absolute": { "type": "string", "description": "Absolute time specified of when this message should be sent. ISO8601 formatted string in UTC.", "format": "date-time" }, "tag": { "maxLength": 100, "minLength": 0, "pattern": "[a-zA-Z0-9_-]+", "type": "string", "description": "A tag for the message schedule. Can be used to group schedules by tag", "nullable": true } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageSchedule" }, "expiration": { "type": "object", "properties": { "relative": { "maximum": 172800000, "minimum": 1, "type": "integer", "description": "Time specified in milliseconds of how long the message is supposed to live. The maximum value is 48 hours (172800000 milliseconds), which is also the default.", "format": "int32" }, "absolute": { "type": "string", "description": "Absolute time specified of when this message should expire. ISO8601 formatted string in UTC.", "format": "date-time" } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageExpiration" }, "callback": { "type": "object", "properties": { "mode": { "enum": [], "type": "string", "description": "Choose how you want to receive your Delivery reports. Mode Profile sends any DLRs towards your default configuration in MyLINK portal), URL sends towards a list of urls provided in the request, Gate sends towards a referenced configuration from MyLINK portal, or None (no DLR is sent anywhere). Each mode requires different request parameters, refer to the fields below.", "x-ref": "#/components/schemas/MessageCallbackMode" }, "urls": { "type": "array", "items": {}, "description": "List of URLs to receive DLRs on. Mandatory when using mode \"URL\" - not relevant to any other modes.", "nullable": true }, "gateId": { "type": "string", "description": "The ID of the callback to be used. Can be set up in the Callbacks section of MyLINK portal. Mandatory when using mode \"Gate\" - not relevant to any other modes.", "nullable": true }, "ttl": { "maximum": 28800000, "minimum": 0, "type": "integer", "description": "Time specified in milliseconds of how long the delivery report is supposed to live. Max value: 28800000. Default value: 14400000. Applicable to all callback modes except for \"None\".<p>Example for mode Profile</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"Profile\" \n\t\t}\n\t}\n]</code></pre><p>Example for mode URL</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"URL\",\n\t\t\t\"urls\": [\"URL\"], \n\t\t\t\"ttl\": 0 \n\t\t}\n\t}\n]</code></pre><p>Example for mode Gate</p><pre><code>[\n \t{\n\t\t\"callback\": {\n\t\t\t\"mode\": \"Gate\",\n\t\t\t\"gateId\": \"fb8eac56-4311-4f09-94b9-54f4bee0acb6\", \n\t\t\t\"ttl\": 0 \n\t\t}\n\t}\n]</code></pre>", "format": "int32" } }, "additionalProperties": false, "x-ref": "#/components/schemas/MessageCallback" }, "referenceId": { "maxLength": 500, "type": "string", "description": "Your own internal transaction ID. Not used for anything except as a reference. Optional.", "nullable": true }, "priority": { "enum": ["Normal", "High", "Low"], "type": "string", "description": "Set priority on your own messages. Priority only affects your own queue.", "x-ref": "#/components/schemas/MessagePriority" } }, "additionalProperties": false, "x-ref": "#/components/schemas/SmsMessageRequest" }, "index$": 1 } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const send_message_ref01_ent = client.SendMessage();
        let send_message_ref01_data = setup.data.new.send_message['send_message_ref01'];
        send_message_ref01_data = (await send_message_ref01_ent.create(send_message_ref01_data)).data();
        (0, node_assert_1.default)(null != send_message_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/send_message/SendMessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmSmsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['send_message01', 'send_message02', 'send_message03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_SMS_TEST_SEND_MESSAGE_ENTID': idmap,
        'LM_SMS_TEST_LIVE': 'FALSE',
        'LM_SMS_TEST_EXPLAIN': 'FALSE',
        'LM_SMS_APIKEY': '',
    });
    idmap = env['LM_SMS_TEST_SEND_MESSAGE_ENTID'];
    const live = 'TRUE' === env.LM_SMS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_SMS_TEST_SEND_MESSAGE_ENTID'];
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
//# sourceMappingURL=SendMessageEntity.test.js.map