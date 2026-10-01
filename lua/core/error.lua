-- LmSms SDK error

local json = require("dkjson")

local LmSmsError = {}
LmSmsError.__index = LmSmsError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function LmSmsError.new(code, msg, ctx)
  local self = setmetatable({}, LmSmsError)
  self.is_sdk_error = true
  self.sdk = "LmSms"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function LmSmsError:context()
  return CONTEXT[self]
end


function LmSmsError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function LmSmsError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function LmSmsError:to_json()
  return json.encode(self:to_table())
end


function LmSmsError:__tostring()
  return self.msg
end


function LmSmsError.__tojson(self)
  return self:to_json()
end


return LmSmsError
