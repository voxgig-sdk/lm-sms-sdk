"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmSmsError = void 0;
class LmSmsError extends Error {
    isLmSmsError = true;
    sdk = 'LmSms';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmSmsError = LmSmsError;
//# sourceMappingURL=LmSmsError.js.map