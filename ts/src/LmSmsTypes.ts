// Typed models for the LmSms SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Schedule {
  message_id?: string
  recipient?: string
  scheduled_at_date?: string
  send_at_date?: string
  tag?: string
}

export interface ScheduleLoadMatch {
  id: string
}

export interface ScheduleListMatch {
  message_id?: string
  recipient?: string
  scheduled_at_date?: string
  send_at_date?: string
  tag?: string
}

export interface ScheduleUpdateData {
  id: string
}

export interface ScheduleRemoveMatch {
  message_id?: string
  recipient?: string
  scheduled_at_date?: string
  send_at_date?: string
  tag?: string
}

export interface SendMessage {
}

export interface SendMessageCreateData {
}

