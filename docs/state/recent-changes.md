# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-17: Replaced Sonner with a shared Base UI toast manager and host while preserving notification types, colors, icons, duration, pausing, squircle clipping, and the full-width progress indicator. [Reason why added: completes the Base UI primitive migration and removes the redundant notification dependency.]

- 2026-07-17: Added shared Base UI tooltips to icon-only modal, account, todo, drag, and password controls, removed redundant native title popups from visible-text buttons, and preserved each trigger's accessible name and interaction ownership. [Reason why added: standardizes supplemental button labels around shared focus, hover, positioning, and motion behavior.]

- 2026-07-17: Migrated Login and Signup controls to Base UI Field with React Hook Form Controller while preserving autofill, password visibility, live validation, and reserved error sizing. [Reason why added: completes the accessible Base UI field migration across authentication flows.]

- 2026-07-17: Migrated Add Item and delete-account confirmation controls to Base UI Field with React Hook Form Controller while preserving their inline and conditional-error layouts. [Reason why added: extends the accessible field contract to the remaining single-field shopping and account flows.]

- 2026-07-17: Migrated Edit Item and Edit Nickname controls to Base UI Field with the documented React Hook Form Controller integration while preserving live validation and reserved error-line sizing. [Reason why added: records accessible field associations without moving validation ownership.]

- 2026-07-17: Replaced the Delete Item and Delete Account dialog roots with Base UI Alert Dialog while retaining their shared layout, CSS, actions, and mutation state. [Reason why added: records destructive-confirmation semantics and disabled pointer dismissal.]

- 2026-07-17: Replaced the custom todo action popup, document listeners, and manual ARIA state with Base UI Menu while preserving the existing CSS Module design and edit/delete behavior. [Reason why added: records accessible menu ownership and collision-aware portal positioning.]

- 2026-07-16: Replaced shared-button disabled opacity with semantic primary, danger, and neutral text/edge tokens, preserving the raised border and base. [Reason why added: records the new deterministic disabled-color contract.]

- 2026-07-16: Added ADR-007 for local edit selection and TanStack Query mutation ownership, amended ADR-003, and synchronized stale architecture paths, diagrams, and design-spec notes. [Reason why added: records the current state boundary without rewriting the original RSC decision.]

- 2026-07-16: Added the primary text-and-icon homepage Add button and consolidated Edit Item/Edit Nickname around a shared edit-modal form, action, label, and live-validation layout. [Reason why added: records consistent edit-dialog composition and visible pre-submit validation.]
