# LmSms SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LmSmsFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmSmsBaseFeature.new
    when "debug"
      LmSmsDebugFeature.new
    when "idempotency"
      LmSmsIdempotencyFeature.new
    when "metrics"
      LmSmsMetricsFeature.new
    when "paging"
      LmSmsPagingFeature.new
    when "ratelimit"
      LmSmsRatelimitFeature.new
    when "retry"
      LmSmsRetryFeature.new
    when "test"
      LmSmsTestFeature.new
    when "timeout"
      LmSmsTimeoutFeature.new
    else
      LmSmsBaseFeature.new
    end
  end
end
