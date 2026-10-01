"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "list",
        "method": "GET",
        "path": "/sms/v1/schedules",
        "args": [],
        "select": {
            "end": "v1",
            "page": "v1",
            "size": "v1",
            "sort": "v1",
            "start": "v1",
            "tag": "v1"
        },
        "headers": [],
        "query": [
            "sort",
            "page",
            "size",
            "tag",
            "start",
            "end"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "messageId": "x",
                "scheduledAtDate": "2026-01-01T00:00:00Z",
                "sendAtDate": "2026-01-01T00:00:00Z",
                "tag": "x",
                "recipient": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "load",
        "method": "GET",
        "path": "/sms/v1/schedules/{messageId}",
        "args": [
            {
                "name": "id",
                "wire": "messageId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "messageId": "x",
            "scheduledAtDate": "2026-01-01T00:00:00Z",
            "sendAtDate": "2026-01-01T00:00:00Z",
            "tag": "x",
            "recipient": "x"
        },
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "remove",
        "method": "DELETE",
        "path": "/sms/v1/schedules",
        "args": [],
        "select": {
            "message_id": "v1",
            "tag": "v1"
        },
        "headers": [],
        "query": [
            "messageId",
            "tag"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "messageId": "x",
            "scheduledAtDate": "2026-01-01T00:00:00Z",
            "sendAtDate": "2026-01-01T00:00:00Z",
            "tag": "x",
            "recipient": "x"
        },
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "update",
        "method": "PATCH",
        "path": "/sms/v1/schedules/{messageId}",
        "args": [
            {
                "name": "id",
                "wire": "messageId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "messageId": "x",
            "scheduledAtDate": "2026-01-01T00:00:00Z",
            "sendAtDate": "2026-01-01T00:00:00Z",
            "tag": "x",
            "recipient": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map