<?php
declare(strict_types=1);

// LmSms SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LmSmsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LmSmsBaseFeature();
            case "test":
                return new LmSmsTestFeature();
            default:
                return new LmSmsBaseFeature();
        }
    }
}
