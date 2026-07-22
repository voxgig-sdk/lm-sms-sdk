<?php
declare(strict_types=1);

// LmSms SDK utility: result_headers

class LmSmsResultHeaders
{
    public static function call(LmSmsContext $ctx): ?LmSmsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
