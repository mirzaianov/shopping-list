# Oxlint Variable Declaration Padding

## Context

The project uses Oxlint for linting and Oxfmt for formatting. It does not use
ESLint or Prettier. Oxlint 1.71 does not provide a native
`padding-line-between-statements` rule, but it can load local
ESLint-compatible JavaScript plugins through its alpha `jsPlugins` API.

The desired behavior is the equivalent of requiring a blank line after a
contiguous group of `const`, `let`, or `var` declarations while allowing those
declarations to remain adjacent to each other.

## Goals

- Enforce one or more blank lines between a variable-declaration group and the
  following non-variable statement.
- Keep consecutive `const`, `let`, and `var` declarations valid without a blank
  line between them.
- Run the rule through the existing Oxlint command without adding a package.
- Cover the local rule with one focused Node test.

## Non-goals

- Reimplement the configurable ESLint Stylistic rule for other statement types.
- Add ESLint, Prettier, or `@stylistic/eslint-plugin`.
- Build or maintain a custom Rust version of Oxlint.
- Add automatic fixing in the first version.
- Duplicate LF policy in lint configuration.

## Rule Behavior

Add a local `padding-line-between-statements` rule that examines adjacent
statements in JavaScript and TypeScript statement lists.

For each `const`, `let`, or `var` declaration:

1. If the next statement is another variable declaration, report nothing.
2. If there is no next statement, report nothing.
3. Otherwise, require at least one whitespace-only line between the declaration
   and the next statement.

The rule checks source text between statement ranges so a comment-only line is
not mistaken for a blank line. It handles LF and CRLF input even though the
repository normalizes tracked text to LF.

Example:

```ts
const first = 1;
const second = 2;

return first + second;
```

The rule reports the following:

```ts
const first = 1;
const second = 2;
return first + second;
```

## Integration

Add a root `oxlint-plugin.mjs` exporting one ESLint-compatible plugin rule.
Register it under a local alias in `.oxlintrc.json` through `jsPlugins`, then
enable `local/padding-line-between-statements` as an error.

The existing `pnpm lint` command remains unchanged. Existing JavaScript and
TypeScript files reported by the new rule receive whitespace-only corrections.

Do not add a `prettier/prettier` equivalent. Oxfmt already defaults
`endOfLine` to `lf`, and `.gitattributes` independently owns the repository LF
policy.

## Validation

- Use Node's built-in test runner to verify consecutive declarations, missing
  padding, valid padding, comments without a blank line, and a declaration at
  the end of a statement list.
- Run the test directly with `node --test`.
- Run `pnpm lint` to verify plugin loading and repository-wide enforcement.
- Run targeted Oxfmt checks for the changed configuration, plugin, test, and
  design files because the known full-project format check has unrelated
  failures.

## Consequences

The project gains the requested rule without another dependency, but the rule
uses Oxlint's alpha JavaScript plugin API. The implementation deliberately
supports only the requested declaration-group behavior. Broader configurable
statement padding should wait for native Oxlint support or a demonstrated need.
