"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    main = {
        name: 'ProjectName',
    };
    feature = {
        test: {
            "options": {
                "active": false
            }
        },
    };
    options = {
        base: 'https://api.linkmobility.com',
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
                    "active": true,
                    "name": "message_id",
                    "req": false,
                    "type": "`$STRING`",
                    "index$": 0
                },
                {
                    "active": true,
                    "name": "recipient",
                    "req": false,
                    "type": "`$STRING`",
                    "index$": 1
                },
                {
                    "active": true,
                    "name": "scheduled_at_date",
                    "req": false,
                    "type": "`$STRING`",
                    "index$": 2
                },
                {
                    "active": true,
                    "name": "send_at_date",
                    "req": false,
                    "type": "`$STRING`",
                    "index$": 3
                },
                {
                    "active": true,
                    "name": "tag",
                    "req": false,
                    "type": "`$STRING`",
                    "index$": 4
                }
            ],
            "name": "schedule",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "active": true,
                            "args": {
                                "query": [
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "reqd": false,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "active": true,
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "reqd": false,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "active": true,
                                        "example": 25,
                                        "kind": "query",
                                        "name": "size",
                                        "orig": "size",
                                        "reqd": false,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "sort",
                                        "orig": "sort",
                                        "reqd": false,
                                        "type": "`$ARRAY`"
                                    },
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "reqd": false,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "tag",
                                        "orig": "tag",
                                        "reqd": false,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "method": "GET",
                            "orig": "/sms/v1/schedules",
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
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
                            "index$": 0
                        }
                    ],
                    "key$": "list"
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "active": true,
                            "args": {
                                "params": [
                                    {
                                        "active": true,
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "message_id",
                                        "reqd": true,
                                        "type": "`$STRING`",
                                        "index$": 0
                                    }
                                ]
                            },
                            "method": "GET",
                            "orig": "/sms/v1/schedules/{messageId}",
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
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "index$": 0
                        }
                    ],
                    "key$": "load"
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "active": true,
                            "args": {
                                "query": [
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "message_id",
                                        "orig": "message_id",
                                        "reqd": false,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "active": true,
                                        "kind": "query",
                                        "name": "tag",
                                        "orig": "tag",
                                        "reqd": false,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "method": "DELETE",
                            "orig": "/sms/v1/schedules",
                            "parts": [
                                "sms",
                                "v1",
                                "schedules"
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
                            "index$": 0
                        }
                    ],
                    "key$": "remove"
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "active": true,
                            "args": {
                                "params": [
                                    {
                                        "active": true,
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "message_id",
                                        "reqd": true,
                                        "type": "`$STRING`",
                                        "index$": 0
                                    }
                                ]
                            },
                            "method": "PATCH",
                            "orig": "/sms/v1/schedules/{messageId}",
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
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "index$": 0
                        }
                    ],
                    "key$": "update"
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
                            "active": true,
                            "args": {},
                            "method": "POST",
                            "orig": "/sms/v1",
                            "parts": [
                                "sms",
                                "v1"
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "index$": 0
                        },
                        {
                            "active": true,
                            "args": {},
                            "method": "POST",
                            "orig": "/sms/v1/messages",
                            "parts": [
                                "sms",
                                "v1",
                                "messages"
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "index$": 1
                        }
                    ],
                    "key$": "create"
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