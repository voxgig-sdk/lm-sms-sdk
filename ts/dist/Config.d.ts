import { BaseFeature } from './feature/base/BaseFeature';
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    main: {
        name: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            schedule: {};
            send_message: {};
        };
    };
    entity: {
        schedule: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: ({
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            } | {
                                active: boolean;
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            })[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                messageId: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                messageId: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        send_message: {
            fields: never[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config };
