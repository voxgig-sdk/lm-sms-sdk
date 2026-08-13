# LmSms SDK exists test

import pytest
from lmsms_sdk import LmSmsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LmSmsSDK.test(None, None)
        assert testsdk is not None
