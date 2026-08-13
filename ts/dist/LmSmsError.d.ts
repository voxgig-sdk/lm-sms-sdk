import { Context } from './Context';
declare class LmSmsError extends Error {
    isLmSmsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { LmSmsError };
