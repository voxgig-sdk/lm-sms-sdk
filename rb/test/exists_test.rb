# LmSms SDK exists test

require "minitest/autorun"
require_relative "../LmSms_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LmSmsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
