import { inspect } from 'node:util';
import { LmSmsSDK } from './LmSmsSDK';
import { Utility } from './utility/Utility';
import type { Context } from './types';
declare class LmSmsEntityBase<D = any> {
    name: string;
    name_: string;
    Name: string;
    _client: LmSmsSDK;
    _utility: Utility;
    _entopts: any;
    _data: Partial<D>;
    _match: Partial<D>;
    _entctx: Context;
    constructor(client: LmSmsSDK, entopts: any);
    entopts(): any;
    client(): LmSmsSDK;
    data(this: any, data?: Partial<D>): D;
    match(this: any, match?: Partial<D>): Partial<D>;
    stream(this: any, action: string, args?: any, callopts?: any): AsyncGenerator<any>;
    toJSON(): any;
    toString(): string;
    [inspect.custom](): string;
    _unexpected(this: any, ctx: Context, err: any): any;
}
export { LmSmsEntityBase };
