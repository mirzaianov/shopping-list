# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-21: Implemented optional Better Auth TOTP and encrypted backup-code authentication, including Settings management, the sign-in challenge route, trusted devices, lockout configuration, and the generated plugin schema migration. [Reason why added: records the completed code path while database application and manual acceptance remain pending.]

- 2026-07-20: Standardized active code and documentation on task-management
  terminology, including a data-preserving migration to the canonical tasks
  table and title column. [Reason why added: records the product-purpose cleanup
  and canonical persistence vocabulary.]

- 2026-07-20: Extended the local Oxlint statement-padding rule to require a
  blank line before non-leading return statements and migrated existing
  violations. [Reason why added: records the expanded enforced formatting
  contract and its repository-wide adoption.]

- 2026-07-20: Removed Oxlint compatibility overrides and migrated the codebase to
  Ultracite's inherited lint conventions while preserving the established Oxfmt
  settings. [Reason why added: records the intentional lint migration without
  implying a formatting-policy change.]

- 2026-07-18: Enabled React Compiler through Next.js, restored Ultracite's
  compiler diagnostics, and replaced incompatible form subscriptions and
  effect-driven derived state. [Reason why added: keeps automatic component
  optimization active without globally suppressing compiler findings.]

- 2026-07-18: Expanded the local Oxlint declaration-padding rule to require
  blank lines on both sides of declaration groups while exempting statement-list
  boundaries. [Reason why added: aligns the focused local rule with the relevant
  ESLint `padding-line-between-statements` behavior.]

- 2026-07-18: Removed unused repository-local agent settings because
  operational policy already lives in `AGENTS.md` and no project-local skills
  exist. [Reason why added: keeps the documented project-support structure
  aligned with the repository.]

- 2026-07-18: Added Ultracite as the maintained Oxlint and Oxfmt preset layer
  while preserving existing formatting, lint command boundaries, and the local
  declaration-padding rule. [Reason why added: records the expanded code-quality
  baseline without implying a repository-wide style migration.]

- 2026-07-18: Updated the approved minor dependency set and pinned pnpm 11.11.0
  while keeping TypeScript 6 and patch-only packages unchanged. [Reason why added:
  records the deliberately scoped dependency-maintenance baseline.]

- 2026-07-18: Upgraded the KeePass plugin to v2 and made `KP_PASSWORD`
  explicitly internal. [Reason why added: keeps the database credential available
  to Varlock without injecting it into application processes.]
