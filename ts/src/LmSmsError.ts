
import { Context } from './Context'


class LmSmsError extends Error {

  isLmSmsError = true

  sdk = 'LmSms'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LmSmsError
}

