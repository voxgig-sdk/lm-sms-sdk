<?php
declare(strict_types=1);

// LmSms SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

LmSmsUtility::setRegistrar(function (LmSmsUtility $u): void {
    $u->clean = [LmSmsClean::class, 'call'];
    $u->done = [LmSmsDone::class, 'call'];
    $u->make_error = [LmSmsMakeError::class, 'call'];
    $u->feature_add = [LmSmsFeatureAdd::class, 'call'];
    $u->feature_hook = [LmSmsFeatureHook::class, 'call'];
    $u->feature_init = [LmSmsFeatureInit::class, 'call'];
    $u->fetcher = [LmSmsFetcher::class, 'call'];
    $u->make_fetch_def = [LmSmsMakeFetchDef::class, 'call'];
    $u->make_context = [LmSmsMakeContext::class, 'call'];
    $u->make_options = [LmSmsMakeOptions::class, 'call'];
    $u->make_request = [LmSmsMakeRequest::class, 'call'];
    $u->make_response = [LmSmsMakeResponse::class, 'call'];
    $u->make_result = [LmSmsMakeResult::class, 'call'];
    $u->make_point = [LmSmsMakePoint::class, 'call'];
    $u->make_spec = [LmSmsMakeSpec::class, 'call'];
    $u->make_url = [LmSmsMakeUrl::class, 'call'];
    $u->param = [LmSmsParam::class, 'call'];
    $u->prepare_auth = [LmSmsPrepareAuth::class, 'call'];
    $u->prepare_body = [LmSmsPrepareBody::class, 'call'];
    $u->prepare_headers = [LmSmsPrepareHeaders::class, 'call'];
    $u->prepare_method = [LmSmsPrepareMethod::class, 'call'];
    $u->prepare_params = [LmSmsPrepareParams::class, 'call'];
    $u->prepare_path = [LmSmsPreparePath::class, 'call'];
    $u->prepare_query = [LmSmsPrepareQuery::class, 'call'];
    $u->result_basic = [LmSmsResultBasic::class, 'call'];
    $u->result_body = [LmSmsResultBody::class, 'call'];
    $u->result_headers = [LmSmsResultHeaders::class, 'call'];
    $u->transform_request = [LmSmsTransformRequest::class, 'call'];
    $u->transform_response = [LmSmsTransformResponse::class, 'call'];
});
