# LmSms SDK utility: make_context
require_relative '../core/context'
module LmSmsUtilities
  MakeContext = ->(ctxmap, basectx) {
    LmSmsContext.new(ctxmap, basectx)
  }
end
