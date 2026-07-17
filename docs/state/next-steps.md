# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Configure the verified Resend sender and API key, run migration `0003_grandfather_existing_emails` before deploying the verification code, and manually test the real email flow.
2. Review CSP report-only violations in the normal Varlock-backed dev/preview environment before enforcing it.
3. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
4. Add password reset through the configured Resend sender.
5. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Configure Resend and deploy the grandfathering migration before enabling email verification in production.

## Open Questions

- What final production domain(s) should be covered before HSTS is enabled?
- Which CSP violations appear in report-only mode before enforcement?
- Which verified sender address should `AUTH_EMAIL_FROM` use in each environment?

## Deferred UI Notes

- Design the email-change confirmation flow after outbound email is configured; require current-address approval and new-address verification.
- Design the password-change confirmation flow around Better Auth's current-password check and decide whether to revoke other sessions.
