# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Review CSP report-only violations in the normal Varlock-backed dev/preview environment before enforcing it.
2. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.
3. Add email verification/password reset when a mail provider is selected.
4. Decide whether Better Auth rate limiting needs shared storage before multi-instance production.

## Immediate Goal

Review CSP report-only violations in the normal Varlock-backed dev/preview environment before enforcing it.

## Open Questions

- What final production domain(s) should be covered before HSTS is enabled?
- Which CSP violations appear in report-only mode before enforcement?
- Which mail provider should send Better Auth verification and password-reset emails?

## Deferred UI Notes

- If todo action positioning needs browser-managed top-layer behavior later, evaluate the Popover API with `@oddbird/popover-polyfill` and CSS Anchor Positioning with its polyfill; the anchor-positioning polyfill is heavier and less complete.
