# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-03: Added a global `Content-Security-Policy-Report-Only` header in `next.config.ts` for CSP observation before enforcement. [Reason why added: records the fifth approved security-hardening step.]
- 2026-07-03: Made Better Auth password and rate-limit defaults explicit, shared password bounds with signup validation, and documented `BETTER_AUTH_URL` setup. [Reason why added: records the fourth approved security-hardening step.]
- 2026-07-03: Added targeted pnpm overrides for transitive `esbuild` and `postcss`, refreshed the lockfile, and verified `pnpm audit --audit-level moderate` reports no known vulnerabilities. [Reason why added: records the third approved security-hardening step.]
- 2026-07-03: Made `pnpm dev` bind to localhost by default, added explicit `pnpm dev:lan`, and documented the LAN command in the README. [Reason why added: records the second approved security-hardening step to avoid accidental LAN exposure.]
- 2026-07-03: Added low-risk global security headers in `next.config.ts` and recorded deferred CSP/HSTS work in next steps. [Reason why added: records the first approved security-hardening step.]
- 2026-07-02: Moved the Zustand edit-selection state out of `src/features/home` into a global `src/store` store composed from a shopping-list slice. [Reason why added: records the requested global store and slice-pattern learning direction.]
- 2026-07-02: Added signup password min/max field validation and routed Better Auth password errors to the password field. [Reason why added: keeps password policy feedback specific instead of showing a vague global signup error.]
- 2026-07-02: Renamed the component-composition diagram from Markdown to raw Mermaid `.mmd` format and updated architecture references. [Reason why added: keeps the architecture diagram in the requested Mermaid-native file format.]
- 2026-07-02: Renamed auth form files to `login-form` and `signup-form`, and moved remaining home `*-view` CSS modules into `src/features/home` with shopping-list/item names. [Reason why added: records the final cleanup of generic view/client-style file names.]
- 2026-07-02: Shortened auth feature component and file names to folder-scoped `Login`, `Signup`, and `Form` components. [Reason why added: records the naming cleanup after auth views moved into feature folders.]
