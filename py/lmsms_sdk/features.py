# LmSms SDK feature factory

from lmsms_sdk.feature.base_feature import LmSmsBaseFeature
from lmsms_sdk.feature.debug_feature import LmSmsDebugFeature
from lmsms_sdk.feature.idempotency_feature import LmSmsIdempotencyFeature
from lmsms_sdk.feature.metrics_feature import LmSmsMetricsFeature
from lmsms_sdk.feature.paging_feature import LmSmsPagingFeature
from lmsms_sdk.feature.ratelimit_feature import LmSmsRatelimitFeature
from lmsms_sdk.feature.retry_feature import LmSmsRetryFeature
from lmsms_sdk.feature.test_feature import LmSmsTestFeature
from lmsms_sdk.feature.timeout_feature import LmSmsTimeoutFeature


_FEATURES = {
    "base": lambda: LmSmsBaseFeature(),
    "debug": lambda: LmSmsDebugFeature(),
    "idempotency": lambda: LmSmsIdempotencyFeature(),
    "metrics": lambda: LmSmsMetricsFeature(),
    "paging": lambda: LmSmsPagingFeature(),
    "ratelimit": lambda: LmSmsRatelimitFeature(),
    "retry": lambda: LmSmsRetryFeature(),
    "test": lambda: LmSmsTestFeature(),
    "timeout": lambda: LmSmsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
