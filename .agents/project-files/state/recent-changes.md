# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-06: Moved todo editing from the top add form into a controlled Base UI dialog with RHF/Zod validation and project-local CSS Modules. [Reason why added: records the accepted modal edit interaction and Base UI dialog adoption.]
- 2026-07-06: Adopted Base UI as the default headless UI component system, wired the shared button wrapper to Base UI, and upgraded todo row Edit/Delete menu actions to labeled buttons. [Reason why added: records the new UI-system baseline and first adoption point.]
- 2026-07-06: Kept grip-handle drag reordering, changed the drag icon to a six-dot grip, moved edit/delete behind a right-side options button, and recorded native Popover/Anchor Positioning polyfills as a deferred UI option. [Reason why added: records the accepted row-action UI direction.]
- 2026-07-04: Added ADR-005 for using dnd-kit and persisted dense positions for todo reordering, and linked it from the architecture overview. [Reason why added: records the durable rationale for the drag-reorder implementation.]
- 2026-07-04: Added persisted grip-handle todo drag reordering with dense Neon positions, dnd-kit sortable UI, motion polish, hydration-stable DnD ids, and corrected reorder SQL typing. [Reason why added: records completion of the approved drag-reorder feature.]
- 2026-07-04: Marked the Next.js, Better Auth, Neon, and Drizzle migration as manually accepted after the user confirmed auth flows, redirects, CRUD, moved data visibility, and Neon rows. [Reason why added: records final migration acceptance.]
- 2026-07-04: Recorded that Firebase-era shopping-list data was moved manually and removed manual data recreation from the active roadmap. [Reason why added: records completion of the user-owned data migration task.]
- 2026-07-04: Marked the Next.js, Better Auth, Neon, and Drizzle migration plan as implemented pending final manual acceptance, and added the closeout checklist. [Reason why added: records the move from migration implementation to manual acceptance.]
- 2026-07-04: Marked Firebase-era data migration as intentionally manual and removed the automated import question from active project state. [Reason why added: records the user's decision to manually migrate any old data.]
- 2026-07-03: Tuned the report-only CSP for development by allowing local WebSocket HMR and skipping `upgrade-insecure-requests` in dev, then documented that full browser-console review needs the normal Varlock-backed dev environment. [Reason why added: records the attempted CSP review step and the remaining environment-bound check.]
