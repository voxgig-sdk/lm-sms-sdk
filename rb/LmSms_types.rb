# frozen_string_literal: true

# Typed models for the LmSms SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Schedule entity data model.
#
# @!attribute [rw] message_id
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduled_at_date
#   @return [String, nil]
#
# @!attribute [rw] send_at_date
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
Schedule = Struct.new(
  :message_id,
  :recipient,
  :scheduled_at_date,
  :send_at_date,
  :tag,
  keyword_init: true
)

# Request payload for Schedule#load.
#
# @!attribute [rw] id
#   @return [String]
ScheduleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Schedule#list.
#
# @!attribute [rw] message_id
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduled_at_date
#   @return [String, nil]
#
# @!attribute [rw] send_at_date
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
ScheduleListMatch = Struct.new(
  :message_id,
  :recipient,
  :scheduled_at_date,
  :send_at_date,
  :tag,
  keyword_init: true
)

# Request payload for Schedule#update.
#
# @!attribute [rw] id
#   @return [String]
ScheduleUpdateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Schedule#remove.
#
# @!attribute [rw] message_id
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduled_at_date
#   @return [String, nil]
#
# @!attribute [rw] send_at_date
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
ScheduleRemoveMatch = Struct.new(
  :message_id,
  :recipient,
  :scheduled_at_date,
  :send_at_date,
  :tag,
  keyword_init: true
)

# SendMessage entity data model.
class SendMessage
end

# Request payload for SendMessage#create.
class SendMessageCreateData
end

