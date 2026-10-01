"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'LmSms',
        slug: "lm-sms",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.linkmobility.com",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            schedule: {},
            send_message: {},
        }
    };
    entity = {
        "schedule": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "messageId",
                    "title": "Message Id",
                    "type": "`$STRING`",
                    "format": "uuid"
                },
                {
                    "name": "recipient",
                    "title": "Recipient",
                    "type": "`$STRING`"
                },
                {
                    "name": "scheduledAtDate",
                    "title": "Scheduled At Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "sendAtDate",
                    "title": "Send At Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "tag",
                    "title": "Tag",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "schedule",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sms/v1/schedules",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "schedules"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 25
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "end",
                                    "page",
                                    "size",
                                    "sort",
                                    "start",
                                    "tag"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sms/v1/schedules/{messageId}",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1",
                                "schedules",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "messageId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "messageId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/sms/v1/schedules",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "schedules"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "message_id",
                                        "orig": "messageId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "message_id",
                                    "tag"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/sms/v1/schedules/{messageId}",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "schedules"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1",
                                "schedules",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "messageId": "id"
                                }
                            },
                            "transform": {
                                "req": {
                                    "sendAtDate": "`reqdata.send_at_date`"
                                },
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "messageId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "send_message": {
            "fields": [
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "short": "List of message information includes details such as messageId, recipient, referenceId"
                },
                {
                    "name": "requestId",
                    "title": "Request Id",
                    "type": "`$STRING`",
                    "short": "Unique Id of the request made towards LINK",
                    "format": "uuid"
                }
            ],
            "name": "send_message",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/sms/v1",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata.messages`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/sms/v1/messages",
                            "segments": [
                                {
                                    "lit": "sms"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "messages"
                                }
                            ],
                            "parts": [
                                "sms",
                                "v1",
                                "messages"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata.messages`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map