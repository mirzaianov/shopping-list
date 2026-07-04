# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-04: Added ADR-005 for using dnd-kit and persisted dense positions for todo reordering, and linked it from the architecture overview. [Reason why added: records the durable rationale for the drag-reorder implementation.]
- 2026-07-04: Added persisted grip-handle todo drag reordering with dense Neon positions, dnd-kit sortable UI, motion polish, hydration-stable DnD ids, and corrected reorder SQL typing. [Reason why added: records completion of the approved drag-reorder feature.]
- 2026-07-04: Marked the Next.js, Better Auth, Neon, and Drizzle migration as manually accepted after the user confirmed auth flows, redirects, CRUD, moved data visibility, and Neon rows. [Reason why added: records final migration acceptance.]
- 2026-07-04: Recorded that Firebase-era shopping-list data was moved manually and removed manual data recreation from the active roadmap. [Reason why added: records completion of the user-owned data migration task.]
- 2026-07-04: Marked the Next.js, Better Auth, Neon, and Drizzle migration plan as implemented pending final manual acceptance, and added the closeout checklist. [Reason why added: records the move from migration implementation to manual acceptance.]
- 2026-07-04: Marked Firebase-era data migration as intentionally manual and removed the automated import question from active project state. [Reason why added: records the user's decision to manually migrate any old data.]
- 2026-07-03: Tuned the report-only CSP for development by allowing local WebSocket HMR and skipping `upgrade-insecure-requests` in dev, then documented that full browser-console review needs the normal Varlock-backed dev environment. [Reason why added: records the attempted CSP review step and the remaining environment-bound check.]
- 2026-07-03: Added a global `Content-Security-Policy-Report-Only` header in `next.config.ts` for CSP observation before enforcement. [Reason why added: records the fifth approved security-hardening step.]
- 2026-07-03: Made Better Auth password and rate-limit defaults explicit, shared password bounds with signup validation, and documented `BETTER_AUTH_URL` setup. [Reason why added: records the fourth approved security-hardening step.]
- 2026-07-03: Added targeted pnpm overrides for transitive `esbuild` and `postcss`, refreshed the lockfile, and verified `pnpm audit --audit-level moderate` reports no known vulnerabilities. [Reason why added: records the third approved security-hardening step.]
