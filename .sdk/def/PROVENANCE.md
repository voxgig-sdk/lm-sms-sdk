# Provenance of the API definition

`sms-openapi.json` is LINK Mobility's published definition of the MyLINK SMS
API, copied byte for byte. Nothing in it has been changed.

| | |
|---|---|
| Vendor file | `MyLINK-SMS-API-1.json` |
| Source URL | https://docs.linkmobility.com/api/specs/file/MyLINK-SMS-API-1.json |
| Rendered at | https://docs.linkmobility.com/api-reference/mylink-sms-api (the page's current version is this file) |
| Retrieved | 2026-10-01T18:39:50Z |
| Portal upload time | 2026-10-01T13:23:51Z (`updatedAt` in the docs portal's spec listing) |
| SHA-256 | `f473f3f5b9d007ea270ccbaa70b26d5028ea9ffbceca6e39e1a327d350408064` |
| Size | 111,769 bytes |
| Format | OpenAPI 3.0.1, title "MyLINK SMS API", version `v1` |
| Counts | 4 paths, 6 operations, 60 component schemas |
| Server | `https://api.linkmobility.com` |
| Auth | OAuth2 client credentials; token URL `https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token` |
| Licence | The definition declares none (`info.license` is absent). It is published openly on LINK Mobility's developer portal. Publishing this SDK was approved by Richard Rodger on 2026-10-01. |

## Changes

None to the file. Entity corrections, if any are ever needed, belong in
`.sdk/model/guide/guide.aontu`, never in this file.

## History

The copy this replaced (taken in August 2026) differed only in the list of
callback IP addresses in the API description: the current file adds
108.142.46.101 and 213.199.130.146 and sorts the list. Paths, operations and
schemas are unchanged.
