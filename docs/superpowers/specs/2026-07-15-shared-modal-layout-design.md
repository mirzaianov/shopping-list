# Shared Modal Layout Design

## Goal

Give every application modal the same shell as the Edit Nickname modal: backdrop, centered card, title, top-right Close button, squircle styling, and open/close animation. Modal-specific forms, messages, inputs, and action buttons remain owned by each feature.

## Architecture

Add one shared `ModalLayout` client component with a colocated CSS module. It accepts a title and children, then renders the existing Base UI portal, backdrop, viewport, popup, accessible Close button, and title. The close button's accessible name is derived from the title, keeping the API small.

The four existing dialogs keep their `Dialog.Root`, triggers, state, submission logic, and feature content. Their duplicated shell markup is replaced by `ModalLayout`. Delete Item gains the same top-right Close button as the other dialogs.

## Styling And Motion

The shared CSS copies the current Edit Nickname shell values: dimensions, spacing, colors, border, squircle radius, shadow, title alignment, close-button placement, 100ms backdrop fade, 100ms popup fade/scale, and reduced-motion handling.

Feature CSS modules retain only body-specific styles such as form controls, messages, errors, rows, and action grids. The two old dialog shell modules are deleted or reduced to feature-only rules as required by their remaining consumers.

## Behavior And Accessibility

Base UI continues to own modal semantics, focus management, Escape handling, and dismissal behavior. Every modal has a visible top-right Close control with an accessible name and title. Existing Cancel buttons and submission behavior remain unchanged.

## Verification

- Type-check and lint the affected React and CSS integration.
- Confirm all four dialogs use `ModalLayout` with distinct titles.
- Confirm no duplicated backdrop, viewport, popup, title, close-button, or animation rules remain.
- Confirm reduced-motion behavior remains available.
