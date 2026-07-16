# Button Styles Architecture

## Context

Button styling is currently spread across behavior, appearance, and layout classes. The `pressable`, `action`, and `outline` classes all activate the same raised-button interaction, while `action` and `outline` also carry unrelated color and sizing rules. Authentication forms repeat shared button dimensions and colors locally.

This duplication makes the rendered result depend on overlapping class combinations and has already caused inconsistent bottom bases, hover behavior, and naming.

## Goals

- Keep the current visual design and interaction distances.
- Give each CSS class one responsibility.
- Make raised behavior consistent across Base UI buttons, native buttons, menu items, dialog controls, and Next.js links.
- Rename the neutral appearance from `outline` to `neutral`.
- Remove duplicated behavior selectors and authentication-form sizing rules.

## Non-goals

- Redesign colors, borders, backgrounds, typography, squircles, or motion.
- Add a new React abstraction, dependency, or color token.
- Convert icon-only controls into raised buttons.
- Migrate existing controls to a different headless primitive.

## Decision

Keep the shared button CSS module as the single styling interface. Separate its responsibilities into four independent layers:

1. Base: `.button` owns the reset, focus, disabled state, and common geometry.
2. Structure and behavior: a direct `.buttonTop` child identifies a raised text button. The parent uses `:has(> .buttonTop)` for the stationary base, hover, active, and reduced-motion behavior.
3. Appearance: `.primary`, `.destructive`, and `.neutral` set only the existing semantic color through `currentColor`.
4. Layout: shared classes own standard size, compact action size, and full width. Page modules retain only page-specific placement such as margins.

The shared `Button` component will stop adding `pressable`. Its existing `.buttonTop` child already provides the structural signal, so a second behavior flag is redundant.

## Class Responsibilities

| Concern | Class or selector | Responsibility |
| --- | --- | --- |
| Base | `.button` | Reset, focus visibility, disabled state, shared squircle geometry |
| Raised behavior | `.button:has(> .buttonTop)` | Stationary bottom base and interaction states |
| Moving face | `.buttonTop` | Border, surface, label typography, and vertical transform |
| Primary appearance | `.primary` | Existing blue semantic color |
| Destructive appearance | `.destructive` | Existing red semantic color |
| Neutral appearance | `.neutral` | Existing neutral text and border color; replaces `.outline` |
| Standard size | shared standard-size class | Authentication and navigation text-button dimensions |
| Compact size | `.action` | Menu and dialog action dimensions only |
| Width | `.actionFull` | Full-width layout only |

The final standard-size class name should follow the existing module's naming style and be applied only where the current dimensions match. No compatibility alias for `.outline` will remain because all call sites are migrated in the same change.

## Interaction

- The stationary parent remains at rest and uses `currentColor` as its visible bottom base.
- The `.buttonTop` face starts at the existing raised offset, moves farther up on hover, and returns to zero on active press.
- Icon-only buttons have no `.buttonTop`, retain their current simple active scale, and do not receive the raised base.
- Disabled buttons retain the current reduced-opacity treatment and do not animate.
- Reduced-motion preferences remove the transforms and transitions without changing layout.

Safari 18 supports `:has()`, which is within the project's accepted browser target.

## Migration

- Remove `.pressable` from the shared component and stylesheet.
- Rename every shared `.outline` use to `.neutral`.
- Move standard dimensions duplicated by authentication modules into the shared standard-size class.
- Keep authentication form classes only for page-specific spacing.
- Keep `.action` for compact dimensions, not appearance or behavior.
- Keep `.actionFull` independent so compact actions may be intrinsic or full width.
- Replace repeated variant-specific focus variables with `currentColor` where the rendered color is unchanged.

## Validation

- Search for stale `pressable` and `outline` class references.
- Run formatting, lint, and TypeScript checks for the affected files.
- Verify primary, destructive, and neutral text buttons in authentication, account menu, todo actions, settings, and dialogs.
- Verify icon-only password, close, add/save, account-trigger, drag, and options controls retain their current interaction.
- Check hover, active, disabled, keyboard focus, and reduced-motion states.
- Confirm each raised button renders one stationary base and one moving top face, with no duplicate bottom line.

## Consequences

The CSS module becomes a deeper shared implementation: callers compose appearance and layout while structure selects behavior. This removes a redundant adapter class and centralizes changes to the raised interaction. The tradeoff is reliance on `:has()`, which is acceptable for the Safari 18 browser floor.
