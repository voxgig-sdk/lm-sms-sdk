<?php
declare(strict_types=1);

// LmSms SDK exists test

require_once __DIR__ . '/../lmsms_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LmSmsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
