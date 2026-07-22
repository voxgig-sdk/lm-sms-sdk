# Typed models for the LmSms SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Schedule(TypedDict, total=False):
    message_id: str
    recipient: str
    scheduled_at_date: str
    send_at_date: str
    tag: str


class ScheduleLoadMatch(TypedDict):
    id: str


class ScheduleListMatch(TypedDict, total=False):
    message_id: str
    recipient: str
    scheduled_at_date: str
    send_at_date: str
    tag: str


class ScheduleUpdateData(TypedDict):
    id: str


class ScheduleRemoveMatch(TypedDict, total=False):
    message_id: str
    recipient: str
    scheduled_at_date: str
    send_at_date: str
    tag: str


class SendMessage(TypedDict):
    pass


class SendMessageCreateData(TypedDict):
    pass
