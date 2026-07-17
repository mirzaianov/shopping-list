# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-17: Replaced the custom todo action popup, document listeners, and manual ARIA state with Base UI Menu while preserving the existing CSS Module design and edit/delete behavior. [Reason why added: records accessible menu ownership and collision-aware portal positioning.]

- 2026-07-16: Replaced shared-button disabled opacity with semantic primary, danger, and neutral text/edge tokens, preserving the raised border and base. [Reason why added: records the new deterministic disabled-color contract.]

- 2026-07-16: Added ADR-007 for local edit selection and TanStack Query mutation ownership, amended ADR-003, and synchronized stale architecture paths, diagrams, and design-spec notes. [Reason why added: records the current state boundary without rewriting the original RSC decision.]

- 2026-07-16: Added the primary text-and-icon homepage Add button and consolidated Edit Item/Edit Nickname around a shared edit-modal form, action, label, and live-validation layout. [Reason why added: records consistent edit-dialog composition and visible pre-submit validation.]

- 2026-07-15: Added TanStack Query mutation ownership and shared loading spinners for delayed authentication, account, and shopping-list actions while preserving Server Component reads and local React edit selection. [Reason why added: records the async-state boundary and consistent pending-button behavior.]

- 2026-07-15: Moved canonical project support files from `.agents/project-files/` into root `docs/`, updated agent routing and local settings, and preserved existing `docs/superpowers/` specs. [Reason why added: records adoption of the updated global project-builder structure.]

- 2026-07-15: Consolidated raised text-button behavior around the existing top-face structure, separated color variants from sizing/layout, renamed `outline` to `neutral`, and removed duplicated authentication-form button rules. [Reason why added: records the shared button styling API and its reduced duplication.]
- 2026-07-11: Extracted the shared 32px atemoya brand header and applied it to home, settings, login, signup, and the not-found page while retaining the 404 heading. [Reason why added: records consistent branded navigation across every page shell.]
- 2026-07-11: Replaced the Settings title with the home page's 32px centered atemoya wordmark and logo, retaining its title position with an empty account-control column. [Reason why added: records shared brand-header geometry across signed-in views.]
- 2026-07-11: Added locked nickname, email, and masked password fields to Settings plus a validated, uniqueness-checked nickname edit and confirmation dialog. [Reason why added: records the first editable profile-setting flow.]
