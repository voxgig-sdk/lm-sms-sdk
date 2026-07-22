-- Typed models for the LmSms SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Schedule
---@field message_id? string
---@field recipient? string
---@field scheduled_at_date? string
---@field send_at_date? string
---@field tag? string

---@class ScheduleLoadMatch
---@field id string

---@class ScheduleListMatch
---@field message_id? string
---@field recipient? string
---@field scheduled_at_date? string
---@field send_at_date? string
---@field tag? string

---@class ScheduleUpdateData
---@field id string

---@class ScheduleRemoveMatch
---@field message_id? string
---@field recipient? string
---@field scheduled_at_date? string
---@field send_at_date? string
---@field tag? string

---@class SendMessage

---@class SendMessageCreateData

local M = {}

return M
