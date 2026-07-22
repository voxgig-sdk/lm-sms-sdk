<?php
declare(strict_types=1);

// LmSms SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LmSmsMakeContext
{
    public static function call(array $ctxmap, ?LmSmsContext $basectx): LmSmsContext
    {
        return new LmSmsContext($ctxmap, $basectx);
    }
}
