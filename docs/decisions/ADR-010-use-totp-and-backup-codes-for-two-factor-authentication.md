# ADR-010: Use TOTP and backup codes for two-factor authentication

## Status

Accepted

## Date

2026-07-17

## Context

Users need optional two-factor authentication that fits the existing Better
Auth and Settings architecture without making email ownership a substitute for
the second factor.

## Decision

Use Better Auth's built-in `twoFactor` and `twoFactorClient` plugins with:

- authenticator-app TOTP and 10 encrypted, one-time backup codes only
- password confirmation before enabling, disabling, or regenerating 2FA
- successful TOTP verification before enrollment becomes active
- backup codes displayed once with Copy, Download, and saved-code confirmation
- an optional 30-day trusted-device period, unchecked by default
- a 10-minute challenge and a 15-minute lockout after 10 failed attempts
- revocation of every other session after enabling or disabling 2FA
- locally rendered QR codes

Do not provide email OTP, administrator bypass, or remote recovery. Apply the
plugin-owned schema migration before enabling the plugin.

The detailed flows and implementation order are in
`docs/architecture/two-factor-authentication-plan.md`.

## Alternatives Considered

### Custom TOTP implementation

- Pros: Full control.
- Cons: Duplicates security-sensitive behavior maintained by Better Auth.
- Rejected: The built-in plugin supports the required flow.

### Email OTP fallback

- Pros: Uses existing Resend infrastructure.
- Cons: Depends on the same email account used for verification and recovery.
- Rejected: It weakens factor separation.

### Managed external identity provider

- Pros: Outsources authentication operations.
- Cons: Adds disproportionate infrastructure and migration work.
- Rejected: Better Auth already supports the required factors.

## Consequences

- Settings needs enrollment, backup-code regeneration, and disable flows.
- Login needs a TOTP and backup-code challenge route.
- Enrollment secrets must remain absent from URLs, logs, browser storage, and
  query caches.
- Losing both the authenticator and every backup code prevents remote recovery.
