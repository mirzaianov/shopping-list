# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Implement the approved Better Auth TOTP and backup-code plan in
   `docs/superpowers/specs/2026-07-17-two-factor-authentication-design.md`.
2. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
3. Add password reset through the configured Resend sender.
4. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Add optional TOTP and encrypted backup-code authentication, applying its database migration
before deploying the Better Auth plugin.

## Open Questions

- What final production domain(s) should be covered before HSTS is enabled?

## Deferred UI Notes

- Design the email-change confirmation flow after outbound email is configured; require current-address approval and new-address verification.
- Design the password-change confirmation flow around Better Auth's current-password check and decide whether to revoke other sessions.
