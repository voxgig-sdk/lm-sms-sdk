# MyLINK SMS API

&lt;div&gt;&lt;h2&gt;Purpose and functionality&lt;/h2&gt; MyLINK SMS API is a REST API supporting the needs for sending and receiving SMS to the recipients you want to reach, either if it is for time critical SMS or high load purposes. MyLINK SMS API is LINK Mobility’s new flagship SMS product, and is a part of our CPaaS offering. &lt;h2&gt;Current supported functionality&lt;/h2&gt;&lt;ul style=&quot;list-style:disc inside;&quot;&gt; &lt;li&gt;&lt;a href=&quot;#tag/Send-Messages/paths/~1sms~1v1~1messages/post&quot;&gt;Send SMS (Mobile Terminated)&lt;/a&gt;&lt;ul style=&quot;list-style:circle;&quot;&gt;&lt;li&gt;Send single message&lt;/li&gt;&lt;li&gt;Batch Sending MT Messages&lt;/li&gt;&lt;/ul&gt; &lt;/li&gt;&lt;li&gt;&lt;a href=&quot;#tag/SmsScheduling&quot;&gt;Scheduling sendings&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=&quot;#tag/Receive-Messages/operation/MobileOriginated&quot;&gt;Receive SMS (Mobile Originated)&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=&quot;#tag/Receive-Messages/operation/Delivery%20Report&quot;&gt;Delivery Reports&lt;/a&gt;&lt;/li&gt; &lt;li&gt;Message Obfuscation&lt;/li&gt; &lt;li&gt;Portal access for statistics and product administration&lt;/li&gt;&lt;/ul&gt;&lt;h2&gt;Getting started&lt;/h2&gt;&lt;ul style=&quot;list-style:disc inside;&quot; &gt; &lt;li&gt;Get in touch with us to get a demo or sign up for the product: &lt;a href=&quot;https://www.linkmobility.com/contact-us&quot;&gt;Click here&lt;/a&gt;&lt;/li&gt; &lt;li&gt;Accept your invitation to the MyLINK portal to generate your API secrets &lt;/li&gt; &lt;li&gt;Revisit the developer portal for how to send an SMS &lt;/li&gt;&lt;/ul&gt;&lt;div&gt;

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 2 entities and 6 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Schedule](docs/api/schedule.html)

Results: Success.

SDK operations: `list`, `load`, `remove`, `update`.

### [SendMessage](docs/api/send_message.html)

Results: Accepted.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Schedule](docs/api/schedule.html) | `list` | `GET /sms/v1/schedules` | Required |
| [Schedule](docs/api/schedule.html) | `load` | `GET /sms/v1/schedules/{messageId}` | Required |
| [Schedule](docs/api/schedule.html) | `remove` | `DELETE /sms/v1/schedules` | Required |
| [Schedule](docs/api/schedule.html) | `update` | `PATCH /sms/v1/schedules/{messageId}` | Required |
| [SendMessage](docs/api/send_message.html) | `create` | `POST /sms/v1` | Required |
| [SendMessage](docs/api/send_message.html) | `create` | `POST /sms/v1/messages` | Required |

## Connect to the API

- API server: `https://api.linkmobility.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Bearer token

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lm-sms_list`: List records for an entity. Supported entities: `schedule`.
- `lm-sms_load`: Load one record for an entity. Supported entities: `schedule`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

