<?php
declare(strict_types=1);

// LmSms SDK utility: result_body

class LmSmsResultBody
{
    public static function call(LmSmsContext $ctx): ?LmSmsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
