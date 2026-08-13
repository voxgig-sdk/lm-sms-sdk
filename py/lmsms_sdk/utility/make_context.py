# LmSms SDK utility: make_context

from lmsms_sdk.core.context import LmSmsContext


def make_context_util(ctxmap, basectx):
    return LmSmsContext(ctxmap, basectx)
