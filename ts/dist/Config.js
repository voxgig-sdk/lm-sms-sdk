"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
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
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
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
                    "type": "`$STRING`"
                },
                {
                    "format": "uuid",
                    "name": "messageId",
                    "type": "`$STRING`"
                },
                {
                    "name": "recipient",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "scheduledAtDate",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "sendAtDate",
                    "type": "`$STRING`"
                },
                {
                    "name": "tag",
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
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "end",
                                    "page",
                                    "size",
                                    "sort",
                                    "start",
                                    "tag"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "message_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/sms/v1/schedules/{messageId}",
                            "rename": {
                                "param": {
                                    "messageId": "id"
                                }
                            },
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
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1",
                                "schedules",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "message_id",
                                        "orig": "message_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "tag",
                                        "orig": "tag",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "message_id",
                                    "tag"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "message_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/sms/v1/schedules/{messageId}",
                            "rename": {
                                "param": {
                                    "messageId": "id"
                                }
                            },
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
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": {
                                    "sendAtDate": "`reqdata.send_at_date`"
                                },
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1",
                                "schedules",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "send_message": {
            "fields": [],
            "name": "send_message",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
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
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1"
                            ]
                        },
                        {
                            "args": {},
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
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "sms",
                                "v1",
                                "messages"
                            ]
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