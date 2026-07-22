<?php
declare(strict_types=1);

// LmSms SDK utility: prepare_body

class LmSmsPrepareBody
{
    public static function call(LmSmsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
