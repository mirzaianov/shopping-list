# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-15: Consolidated raised text-button behavior around the existing top-face structure, separated color variants from sizing/layout, renamed `outline` to `neutral`, and removed duplicated authentication-form button rules. [Reason why added: records the shared button styling API and its reduced duplication.]
- 2026-07-11: Extracted the shared 32px atemoya brand header and applied it to home, settings, login, signup, and the not-found page while retaining the 404 heading. [Reason why added: records consistent branded navigation across every page shell.]
- 2026-07-11: Replaced the Settings title with the home page's 32px centered atemoya wordmark and logo, retaining its title position with an empty account-control column. [Reason why added: records shared brand-header geometry across signed-in views.]
- 2026-07-11: Added locked nickname, email, and masked password fields to Settings plus a validated, uniqueness-checked nickname edit and confirmation dialog. [Reason why added: records the first editable profile-setting flow.]
- 2026-07-11: Added independent accessible password-visibility controls to login, signup password, and signup confirmation fields. [Reason why added: records the authentication-form usability improvement.]
- 2026-07-11: Moved Settings navigation home from a top-left icon to the shared secondary `Go Home` button at the bottom of the page. [Reason why added: records the revised settings navigation placement and shared 404 button treatment.]
- 2026-07-11: Replaced the homepage's inline account row with a 32px logo and account trigger around a centered compact wordmark, plus a Base UI account menu showing uppercase nickname initials, a borderless signed-in presence indicator, nickname/email identity, Settings, and Sign Out actions. [Reason why added: records the compact account-control redesign and new client-island boundary.]
- 2026-07-09: Changed Better Auth to derive trusted Vercel production/preview hosts and fallback URLs from Vercel System Environment Variables, force the browser client to the current origin's absolute auth URL, and tune preview CSP for the Vercel Toolbar. [Reason why added: records the production-domain and preview auth fixes.]
- 2026-07-09: Split Vercel and local production builds by changing `pnpm build` to plain `next build` and adding `pnpm build:local` for Varlock-backed local builds. [Reason why added: records the hosting fix for KeePass-only Varlock initialization.]
- 2026-07-09: Added required unique nicknames to sign-up using Better Auth `user.name`, shared Zod validation, a Drizzle uniqueness constraint, and a generated migration. [Reason why added: records the new user-data requirement and manual database migration dependency.]
