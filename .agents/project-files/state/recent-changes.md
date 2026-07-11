# Recent Changes

- 2026-07-11: Replaced the Settings title with the home page's 32px centered atemoya wordmark and logo, retaining its title position with an empty account-control column. [Reason why added: records shared brand-header geometry across signed-in views.]
- 2026-07-11: Added locked nickname, email, and masked password fields to Settings plus a validated, uniqueness-checked nickname edit and confirmation dialog. [Reason why added: records the first editable profile-setting flow.]
- 2026-07-11: Added independent accessible password-visibility controls to login, signup password, and signup confirmation fields. [Reason why added: records the authentication-form usability improvement.]
- 2026-07-11: Moved Settings navigation home from a top-left icon to the shared secondary `Go Home` button at the bottom of the page. [Reason why added: records the revised settings navigation placement and shared 404 button treatment.]

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-11: Replaced the homepage's inline account row with a 32px logo and account trigger around a centered compact wordmark, plus a Base UI account menu showing uppercase nickname initials, a borderless signed-in presence indicator, nickname/email identity, Settings, and Sign Out actions. [Reason why added: records the compact account-control redesign and new client-island boundary.]
- 2026-07-09: Changed Better Auth to derive trusted Vercel production/preview hosts and fallback URLs from Vercel System Environment Variables, force the browser client to the current origin's absolute auth URL, and tune preview CSP for the Vercel Toolbar. [Reason why added: records the production-domain and preview auth fixes.]
- 2026-07-09: Split Vercel and local production builds by changing `pnpm build` to plain `next build` and adding `pnpm build:local` for Varlock-backed local builds. [Reason why added: records the hosting fix for KeePass-only Varlock initialization.]
- 2026-07-09: Added required unique nicknames to sign-up using Better Auth `user.name`, shared Zod validation, a Drizzle uniqueness constraint, and a generated migration. [Reason why added: records the new user-data requirement and manual database migration dependency.]
- 2026-07-09: Added a protected settings page with email-confirmed Better Auth account deletion and shared destructive button styling. [Reason why added: records the new destructive account-management flow and shared button variant extraction.]
- 2026-07-06: Moved todo editing from the top add form into a controlled Base UI dialog with RHF/Zod validation and project-local CSS Modules. [Reason why added: records the accepted modal edit interaction and Base UI dialog adoption.]
- 2026-07-06: Adopted Base UI as the default headless UI component system, wired the shared button wrapper to Base UI, and upgraded todo row Edit/Delete menu actions to labeled buttons. [Reason why added: records the new UI-system baseline and first adoption point.]
- 2026-07-06: Kept grip-handle drag reordering, changed the drag icon to a six-dot grip, moved edit/delete behind a right-side options button, and recorded native Popover/Anchor Positioning polyfills as a deferred UI option. [Reason why added: records the accepted row-action UI direction.]
- 2026-07-04: Added ADR-005 for using dnd-kit and persisted dense positions for todo reordering, and linked it from the architecture overview. [Reason why added: records the durable rationale for the drag-reorder implementation.]
- 2026-07-04: Added persisted grip-handle todo drag reordering with dense Neon positions, dnd-kit sortable UI, motion polish, hydration-stable DnD ids, and corrected reorder SQL typing. [Reason why added: records completion of the approved drag-reorder feature.]
