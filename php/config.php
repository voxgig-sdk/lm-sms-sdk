<?php
declare(strict_types=1);

// LmSms SDK configuration

class LmSmsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LmSms",
                "slug" => "lm-sms",
                "version" => "0.1.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.linkmobility.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "schedule" => [],
                    "send_message" => [],
                ],
            ],
            "entity" => [
        'schedule' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uuid',
              'name' => 'messageId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'recipient',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'scheduledAtDate',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'sendAtDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tag',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'schedule',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sms/v1/schedules',
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'schedules',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'page',
                      'size',
                      'sort',
                      'start',
                      'tag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                    'schedules',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sms/v1/schedules/{messageId}',
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'schedules',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                    'schedules',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'message_id',
                        'orig' => 'message_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/sms/v1/schedules',
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'schedules',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'message_id',
                      'tag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                    'schedules',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'message_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PATCH',
                  'orig' => '/sms/v1/schedules/{messageId}',
                  'rename' => [
                    'param' => [
                      'messageId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'schedules',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => [
                      'sendAtDate' => '`reqdata.send_at_date`',
                    ],
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                    'schedules',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'send_message' => [
          'fields' => [],
          'name' => 'send_message',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/sms/v1',
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/sms/v1/messages',
                  'segments' => [
                    [
                      'lit' => 'sms',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'sms',
                    'v1',
                    'messages',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LmSmsFeatures::make_feature($name);
    }
}
