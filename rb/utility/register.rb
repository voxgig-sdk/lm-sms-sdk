# LmSms SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LmSmsUtility.registrar = ->(u) {
  u.clean = LmSmsUtilities::Clean
  u.done = LmSmsUtilities::Done
  u.make_error = LmSmsUtilities::MakeError
  u.feature_add = LmSmsUtilities::FeatureAdd
  u.feature_hook = LmSmsUtilities::FeatureHook
  u.feature_init = LmSmsUtilities::FeatureInit
  u.fetcher = LmSmsUtilities::Fetcher
  u.make_fetch_def = LmSmsUtilities::MakeFetchDef
  u.make_context = LmSmsUtilities::MakeContext
  u.make_options = LmSmsUtilities::MakeOptions
  u.make_request = LmSmsUtilities::MakeRequest
  u.make_response = LmSmsUtilities::MakeResponse
  u.make_result = LmSmsUtilities::MakeResult
  u.make_point = LmSmsUtilities::MakePoint
  u.make_spec = LmSmsUtilities::MakeSpec
  u.make_url = LmSmsUtilities::MakeUrl
  u.param = LmSmsUtilities::Param
  u.prepare_auth = LmSmsUtilities::PrepareAuth
  u.prepare_body = LmSmsUtilities::PrepareBody
  u.prepare_headers = LmSmsUtilities::PrepareHeaders
  u.prepare_method = LmSmsUtilities::PrepareMethod
  u.prepare_params = LmSmsUtilities::PrepareParams
  u.prepare_path = LmSmsUtilities::PreparePath
  u.prepare_query = LmSmsUtilities::PrepareQuery
  u.graphql_body = LmSmsUtilities::GraphqlBody
  u.graphql_errors = LmSmsUtilities::GraphqlErrors
  u.result_basic = LmSmsUtilities::ResultBasic
  u.result_body = LmSmsUtilities::ResultBody
  u.result_headers = LmSmsUtilities::ResultHeaders
  u.transform_request = LmSmsUtilities::TransformRequest
  u.transform_response = LmSmsUtilities::TransformResponse
}
