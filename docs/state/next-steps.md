# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Review and commit the manually accepted two-factor implementation.
2. Apply `drizzle/0005_mature_cannonball.sql` to each deployment database before deploying code
   that enables the Better Auth two-factor plugin.
3. Deploy and smoke-test production enrollment, TOTP sign-in, one backup code, and disable using
   a dedicated test account; do not exercise the lockout path in production.
4. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
5. Add password reset through the configured Resend sender.
6. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Commit the accepted two-factor implementation, apply its migration to the deployment target, deploy,
and complete the production smoke test.

## Open Questions

- What final production domain(s) should be covered before HSTS is enabled?

## Deferred UI Notes

- Design the email-change confirmation flow after outbound email is configured; require current-address approval and new-address verification.
- Design the password-change confirmation flow around Better Auth's current-password check and decide whether to revoke other sessions.
