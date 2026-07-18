# ADR-008: Use a local Oxlint plugin for variable padding

## Status

Accepted

## Date

2026-07-17

## Context

The project uses Oxlint and Oxfmt without ESLint or Prettier. Oxlint 1.71 does
not have a native equivalent of `padding-line-between-statements`, but it can
load ESLint-compatible JavaScript plugins through its alpha `jsPlugins` API.

## Decision

Use the repository-local `oxlint-plugin.mjs` to require a blank line between a
contiguous group of `const`, `let`, or `var` declarations and the next
non-declaration statement.

Register it through Oxlint's `jsPlugins` configuration and test its focused
behavior with Node's built-in test runner. Keep `pnpm lint` as the project-wide
entry point.

## Alternatives Considered

### Add ESLint or a stylistic plugin

- Pros: Provides an established configurable rule.
- Cons: Duplicates the current linter and adds dependencies for one convention.
- Rejected: The local rule preserves the smaller toolchain.

### Wait for native Oxlint support

- Pros: Avoids maintaining project code.
- Cons: Leaves the requested convention unenforced.
- Rejected for now: Replace the local plugin when Oxlint provides an equivalent
  native rule.

## Consequences

- Declaration-group padding is enforced without another package.
- The rule intentionally supports only the required declaration case.
- Oxlint's alpha JavaScript plugin API may require adjustment after upgrades.
