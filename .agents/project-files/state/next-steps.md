# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Add CSP in report-only mode before enforcing it.
2. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
3. Add email verification/password reset when a mail provider is selected.
4. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Complete security hardening step 5: add CSP in report-only mode before enforcing it.

## Open Questions

- Do existing Firebase users/list items need a migration path, or can Better Auth start with fresh accounts?
- What final production domain(s) should be covered before HSTS is enabled?
- Which CSP violations appear in report-only mode before enforcement?
- Which mail provider should send Better Auth verification and password-reset emails?
