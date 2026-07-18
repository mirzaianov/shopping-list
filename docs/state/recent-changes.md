# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

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

- 2026-07-17: Migrated Add Item and delete-account confirmation controls to Base UI Field with React Hook Form Controller while preserving their inline and conditional-error layouts. [Reason why added: extends the accessible field contract to the remaining single-field shopping and account flows.]

- 2026-07-17: Migrated Edit Item and Edit Nickname controls to Base UI Field with the documented React Hook Form Controller integration while preserving live validation and reserved error-line sizing. [Reason why added: records accessible field associations without moving validation ownership.]

- 2026-07-17: Replaced the Delete Item and Delete Account dialog roots with Base UI Alert Dialog while retaining their shared layout, CSS, actions, and mutation state. [Reason why added: records destructive-confirmation semantics and disabled pointer dismissal.]
