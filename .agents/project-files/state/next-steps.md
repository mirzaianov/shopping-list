# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Continue the approved security-hardening sequence one step at a time:

1. Make the dev server localhost-only by default and add a separate LAN script.
2. Fix dependency audit findings for transitive `esbuild` and `postcss`.
3. Review Better Auth hardening and make useful defaults explicit.
4. Add CSP in report-only mode before enforcing it.
5. Decide whether and when to add HSTS after the production HTTPS domain policy is stable.

## Immediate Goal

Complete security hardening step 2: make local development bind to localhost by default while preserving an explicit LAN command.

## Open Questions

- Do existing Firebase users/list items need a migration path, or can Better Auth start with fresh accounts?
- What final production domain(s) should be covered before HSTS is enabled?
- Which CSP violations appear in report-only mode before enforcement?
