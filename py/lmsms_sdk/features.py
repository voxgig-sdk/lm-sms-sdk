# LmSms SDK feature factory

from lmsms_sdk.feature.base_feature import LmSmsBaseFeature
from lmsms_sdk.feature.test_feature import LmSmsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LmSmsBaseFeature(),
        "test": lambda: LmSmsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
