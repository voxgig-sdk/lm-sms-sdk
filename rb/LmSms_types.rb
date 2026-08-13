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
# @!attribute [rw] messageId
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduledAtDate
#   @return [String, nil]
#
# @!attribute [rw] sendAtDate
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
Schedule = Struct.new(
  :messageId,
  :recipient,
  :scheduledAtDate,
  :sendAtDate,
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
# @!attribute [rw] messageId
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduledAtDate
#   @return [String, nil]
#
# @!attribute [rw] sendAtDate
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
ScheduleListMatch = Struct.new(
  :messageId,
  :recipient,
  :scheduledAtDate,
  :sendAtDate,
  :tag,
  keyword_init: true
)

# Request payload for Schedule#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] messageId
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduledAtDate
#   @return [String, nil]
#
# @!attribute [rw] sendAtDate
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
ScheduleUpdateData = Struct.new(
  :id,
  :messageId,
  :recipient,
  :scheduledAtDate,
  :sendAtDate,
  :tag,
  keyword_init: true
)

# Request payload for Schedule#remove.
#
# @!attribute [rw] messageId
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] scheduledAtDate
#   @return [String, nil]
#
# @!attribute [rw] sendAtDate
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
ScheduleRemoveMatch = Struct.new(
  :messageId,
  :recipient,
  :scheduledAtDate,
  :sendAtDate,
  :tag,
  keyword_init: true
)

# SendMessage entity data model.
class SendMessage
end

# Request payload for SendMessage#create.
class SendMessageCreateData
end

