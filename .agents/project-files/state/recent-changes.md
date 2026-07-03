# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-03: Added targeted pnpm overrides for transitive `esbuild` and `postcss`, refreshed the lockfile, and verified `pnpm audit --audit-level moderate` reports no known vulnerabilities. [Reason why added: records the third approved security-hardening step.]
- 2026-07-03: Made `pnpm dev` bind to localhost by default, added explicit `pnpm dev:lan`, and documented the LAN command in the README. [Reason why added: records the second approved security-hardening step to avoid accidental LAN exposure.]
- 2026-07-03: Added low-risk global security headers in `next.config.ts` and recorded deferred CSP/HSTS work in next steps. [Reason why added: records the first approved security-hardening step.]
- 2026-07-02: Moved the Zustand edit-selection state out of `src/features/home` into a global `src/store` store composed from a shopping-list slice. [Reason why added: records the requested global store and slice-pattern learning direction.]
- 2026-07-02: Added signup password min/max field validation and routed Better Auth password errors to the password field. [Reason why added: keeps password policy feedback specific instead of showing a vague global signup error.]
- 2026-07-02: Renamed the component-composition diagram from Markdown to raw Mermaid `.mmd` format and updated architecture references. [Reason why added: keeps the architecture diagram in the requested Mermaid-native file format.]
- 2026-07-02: Renamed auth form files to `login-form` and `signup-form`, and moved remaining home `*-view` CSS modules into `src/features/home` with shopping-list/item names. [Reason why added: records the final cleanup of generic view/client-style file names.]
- 2026-07-02: Shortened auth feature component and file names to folder-scoped `Login`, `Signup`, and `Form` components. [Reason why added: records the naming cleanup after auth views moved into feature folders.]
- 2026-07-02: Moved the login-owned form and CSS module from `src/components` into `src/features/login`, leaving shared button UI in `src/components`. [Reason why added: keeps feature-owned auth views beside their page clients after the sign-up folder split.]
- 2026-07-02: Moved sign-up client/view code under `src/features/signup`, moved shared auth form schemas/error copy/page CSS under `src/features/auth`, reduced the auth submit gap after the two-line global error slot, and converted the component-composition doc body to a Mermaid diagram block. [Reason why added: records the feature-folder split and auth form spacing correction requested after the `/signup` route split.]
