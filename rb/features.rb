# LmSms SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LmSmsFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmSmsBaseFeature.new
    when "test"
      LmSmsTestFeature.new
    else
      LmSmsBaseFeature.new
    end
  end
end
