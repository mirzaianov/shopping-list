# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-18: Updated the approved minor dependency set and pinned pnpm 11.11.0
  while keeping TypeScript 6 and patch-only packages unchanged. [Reason why added:
  records the deliberately scoped dependency-maintenance baseline.]

- 2026-07-18: Upgraded the KeePass plugin to v2 and made `KP_PASSWORD`
  explicitly internal. [Reason why added: keeps the database credential available
  to Varlock without injecting it into application processes.]

- 2026-07-18: Replaced the obsolete Superpowers documentation structure with durable ADRs
  and architecture plans, while removing completed implementation specs that duplicated
  code and current-state records. [Reason why added: aligns project documentation with the
  updated brainstorming ownership and retention rules.]

- 2026-07-18: Completed the production CSP report-only review, traced the remaining
  `unsafe-eval` report to a generated Next.js chunk, and retained the report-only policy.
  [Reason why added: records the decision not to weaken or enforce CSP under the current
  runtime behavior.]

- 2026-07-17: Documented the approved optional TOTP and encrypted backup-code plan using
  Better Auth, including trusted devices, recovery limits, session revocation, and rollout
  ordering. [Reason why added: preserves the agreed 2FA security model before
  implementation.]

- 2026-07-17: Added a repository-local Oxlint rule for blank lines after
  variable-declaration groups and normalized existing violations. [Reason why
  added: enforces the requested declaration grouping without ESLint, Prettier,
  or another package.]

- 2026-07-17: Added Better Auth email-link verification through Resend, a dedicated check-email and resend flow, login callback notices, existing-account grandfathering migration, and focused verification-result tests. [Reason why added: prevents new accounts from signing in before proving email ownership while preserving current users.]

- 2026-07-17: Replaced Sonner with a shared Base UI toast manager and host while preserving notification types, colors, icons, duration, pausing, squircle clipping, and the full-width progress indicator. [Reason why added: completes the Base UI primitive migration and removes the redundant notification dependency.]

- 2026-07-17: Added shared Base UI tooltips to icon-only modal, account, todo, drag, and password controls, removed redundant native title popups from visible-text buttons, and preserved each trigger's accessible name and interaction ownership. [Reason why added: standardizes supplemental button labels around shared focus, hover, positioning, and motion behavior.]

- 2026-07-17: Migrated Login and Signup controls to Base UI Field with React Hook Form Controller while preserving autofill, password visibility, live validation, and reserved error sizing. [Reason why added: completes the accessible Base UI field migration across authentication flows.]
