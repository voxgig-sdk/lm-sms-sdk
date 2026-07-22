-- LmSms SDK error

local LmSmsError = {}
LmSmsError.__index = LmSmsError


function LmSmsError.new(code, msg, ctx)
  local self = setmetatable({}, LmSmsError)
  self.is_sdk_error = true
  self.sdk = "LmSms"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LmSmsError:error()
  return self.msg
end


function LmSmsError:__tostring()
  return self.msg
end


return LmSmsError
