// Typed models for the LmSms SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Schedule {
  messageId?: string
  recipient?: string
  scheduledAtDate?: string
  sendAtDate?: string
  tag?: string
}

export interface ScheduleLoadMatch {
  id: string
}

export interface ScheduleListMatch {
  messageId?: string
  recipient?: string
  scheduledAtDate?: string
  sendAtDate?: string
  tag?: string
}

export interface ScheduleUpdateData {
  id: string
  messageId?: string
  recipient?: string
  scheduledAtDate?: string
  sendAtDate?: string
  tag?: string
}

export interface ScheduleRemoveMatch {
  messageId?: string
  recipient?: string
  scheduledAtDate?: string
  sendAtDate?: string
  tag?: string
}

export interface SendMessage {
}

export interface SendMessageCreateData {
}

