# Disabled Button Color Tokens

## Context

Shared raised buttons currently derive their text, border, and stationary lower
base from one semantic `currentColor`. Disabled buttons apply `opacity: 0.5` to
the whole control. This produces a uniform fade, not independently controlled
disabled text and border colors.

## Goals

- Give disabled primary, destructive, and neutral buttons explicit semantic
  text and border tokens.
- Keep the existing raised-button geometry and native `disabled` behavior.
- Use the disabled border color for both the moving-face border and stationary
  lower base so the raised shape remains legible.
- Remove parent opacity so the rendered disabled colors are deterministic.

## Non-goals

- Change active button colors, spacing, typography, motion, or focus behavior.
- Restyle inputs, menu items, or any control outside the shared Button.
- Add JavaScript state, a dependency, or a new React component.

## Token Model

Add these global semantic tokens beside the existing active color tokens in
`src/globals.css`:

- `--color-primary-disabled-text` and `--color-primary-disabled-border`
- `--color-danger-disabled-text` and `--color-danger-disabled-border`
- `--color-neutral-disabled-text` and `--color-neutral-disabled-border`

Primary and danger are colored variants: derive their disabled tokens from the
active semantic color by reducing chroma, with the border retaining more chroma
than the text. Neutral variants move lightness toward `--color-surface` while
also reducing chroma. The formulas use relative `oklch()` values as proposed.

Relative color conversion can render differently near a display gamut edge.
Before accepting the change, verify the actual primary, destructive, and
neutral disabled colors in the supported browsers. If a result clips or lacks
sufficient legibility, retain the token names and replace only that formula
with an explicit in-gamut value.

## Button Mapping

`src/components/button.module.css` will split its present `currentColor` use
into button-local text and edge custom properties:

1. Each appearance class (`primary`, `destructive`, and `neutral`) supplies
   active text/edge values and matching disabled text/edge values.
2. The ordinary state uses the active text color for the label and icon, and
   the active edge color for the face border and lower base.
3. `:disabled` swaps both local values to their disabled equivalents.
4. The `opacity: 0.5` declaration is removed; `cursor: not-allowed` remains.

The disabled border token deliberately drives the lower base as well as the
face border. That keeps the raised silhouette coherent without inventing a
third, single-purpose disabled-base token.

`src/components/button.tsx` remains unchanged: `disabled={disabled || loading}`
continues to cover both explicit disabled and pending/loading states.

## Validation

- Run the targeted formatter and lint/type checks appropriate to the two CSS
  files and shared button component.
- Inspect primary, destructive, and neutral buttons in enabled, disabled, and
  loading states.
- Confirm disabled buttons do not respond to hover or active transforms and
  retain visible keyboard focus styling where focus can be reached.
- Check text and edge visibility against `--color-surface` in the project's
  supported browsers, including the Safari 18 baseline.

## Consequences

Disabled colors become a deliberate part of the semantic theme rather than a
single compositing effect. The only additional CSS structure is two local
button color roles, needed because the current one-color design cannot express
different disabled text and border values.
