<?php
declare(strict_types=1);

// LmSms SDK base feature

class LmSmsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LmSmsContext $ctx, array $options): void {}
    public function PostConstruct(LmSmsContext $ctx): void {}
    public function PostConstructEntity(LmSmsContext $ctx): void {}
    public function SetData(LmSmsContext $ctx): void {}
    public function GetData(LmSmsContext $ctx): void {}
    public function GetMatch(LmSmsContext $ctx): void {}
    public function SetMatch(LmSmsContext $ctx): void {}
    public function PrePoint(LmSmsContext $ctx): void {}
    public function PreSpec(LmSmsContext $ctx): void {}
    public function PreRequest(LmSmsContext $ctx): void {}
    public function PreResponse(LmSmsContext $ctx): void {}
    public function PreResult(LmSmsContext $ctx): void {}
    public function PreDone(LmSmsContext $ctx): void {}
    public function PreUnexpected(LmSmsContext $ctx): void {}
}
