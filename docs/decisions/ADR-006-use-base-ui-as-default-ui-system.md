# ADR-006: Use Base UI as the default UI component system

## Status

Accepted

## Date

2026-07-06

## Context

The app uses component-local CSS Modules for visual styling and has several custom interactive controls. The task row action menu needs shaped Edit and Delete controls with accessible button behavior, and future UI work should not keep rebuilding low-level interactive primitives by hand.

## Decision

Use Base UI as the default headless UI component system for new or reworked interactive controls.

CSS Modules remain responsible for the app's visual language, spacing, colors, and motion. Base UI provides accessible, unstyled component primitives. The first adoption point is the shared button wrapper and task row action menu buttons.

## Alternatives Considered

### Continue custom native controls only

- Pros: No new dependency and complete control.
- Cons: Repeats accessibility and interaction behavior in app code as the UI grows.
- Rejected: The app benefits from a small, maintained headless primitive layer.

### Material UI

- Pros: Full design system and broad component coverage.
- Cons: Brings a stronger visual opinion than the current CSS Modules direction.
- Rejected: The project wants local styling to remain the source of visual truth.

### Radix UI

- Pros: Mature headless primitives.
- Cons: Base UI aligns with the user's requested direction and covers the needed primitives.
- Rejected for now: Base UI is the selected default.

## Consequences

- New or reworked interactive controls should prefer Base UI primitives when they fit.
- Existing controls do not need a broad migration unless they are being changed anyway.
- CSS Modules continue to define all project-specific appearance.
- The dependency surface grows by `@base-ui/react`.
