# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

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
