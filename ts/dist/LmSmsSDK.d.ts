import { ScheduleEntity } from './entity/ScheduleEntity';
import { SendMessageEntity } from './entity/SendMessageEntity';
export type * from './LmSmsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LmSmsEntityBase } from './LmSmsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LmSmsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    Schedule(data?: any): ScheduleEntity;
    SendMessage(data?: any): SendMessageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LmSmsSDK;
    tester(testopts?: any, sdkopts?: any): LmSmsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LmSmsSDK;
export { stdutil, config, BaseFeature, LmSmsEntityBase, LmSmsSDK, SDK, };
