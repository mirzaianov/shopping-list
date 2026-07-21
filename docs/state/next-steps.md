# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Apply `drizzle/0005_mature_cannonball.sql` to the intended database before deploying the
   Better Auth two-factor plugin.
2. Manually verify enrollment, authenticator and backup-code sign-in, trusted devices,
   regeneration, disable, lockout, and other-session revocation.
3. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
4. Add password reset through the configured Resend sender.
5. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Apply the generated two-factor migration and manually accept the complete security flow.

## Open Questions

- What final production domain(s) should be covered before HSTS is enabled?

## Deferred UI Notes

- Design the email-change confirmation flow after outbound email is configured; require current-address approval and new-address verification.
- Design the password-change confirmation flow around Better Auth's current-password check and decide whether to revoke other sessions.
