# ADR-011: Use Ultracite presets for Oxlint and Oxfmt

## Status

Accepted

## Date

2026-07-18

## Context

The project already uses Oxlint and Oxfmt, but its configuration only enables a
small manually selected rule set. Maintaining complete React, accessibility,
and Next.js rule coverage locally would duplicate an existing preset and make
tool upgrades harder to review.

Ultracite provides shareable Oxlint and Oxfmt presets. Its default code-style
rules and formatting choices differ from established project conventions, and
its combined CLI changes the existing lint-only script semantics.

## Decision

Use Ultracite as the maintained preset layer for the existing Oxlint and Oxfmt
toolchain:

- Extend the Ultracite core, React, and Next.js Oxlint presets.
- Retain the local declaration-padding plugin accepted in ADR-008.
- Keep explicit overrides for established project style and library
  compatibility.
- Extend the Ultracite Oxfmt preset while preserving the existing print width,
  quotes, trailing commas, prose wrapping, and import order.
- Keep `pnpm lint`, `pnpm format`, `pnpm format:check`, and `pnpm typecheck` as
  separate commands. Use `pnpm check` as their aggregate quality gate.
- Do not enable type-aware Oxlint until it provides enough additional value to
  justify its dependency and runtime cost.

## Alternatives Considered

### Run `ultracite init`

- Pros: Automatically configures the provider and integrations.
- Cons: May change editor, agent, hook, TypeScript, and formatting settings that
  the repository already manages.
- Rejected: Manual configuration keeps the migration scoped and reviewable.

### Adopt every Ultracite default

- Pros: Requires fewer local overrides.
- Cons: Introduces broad non-functional churn such as sorted object keys,
  interface-only object types, import reordering, and changed Markdown wrapping.
- Rejected: These preferences do not justify rewriting existing application and
  documentation code.

### Keep only local Oxlint and Oxfmt configuration

- Pros: Avoids another dependency.
- Cons: Leaves framework and ecosystem rule coverage to be maintained locally.
- Rejected: Ultracite provides useful maintained coverage while preserving the
  underlying tools.

## Consequences

- Oxlint gains maintained core, React, accessibility, and Next.js rule coverage.
- Oxfmt keeps the established repository output.
- Ultracite upgrades may introduce new rules and must be reviewed before
  compatibility overrides are added or removed.
- The local padding plugin remains necessary until Oxlint or Ultracite provides
  an equivalent rule.
