# Nickname Dialog Actions

## Context

The Edit Nickname dialog currently uses a two-step flow: a neutral Continue action opens a second confirmation view with Cancel and Confirm. Other editing and destructive dialogs use a direct action row, so this extra step makes the modal inconsistent and requires transient confirmation state.

## Decision

Use a one-step edit form while retaining the existing top-right Close button.

- Keep the nickname label, editable input, validation error line, and top-right Close control.
- Place a two-button action row below the error line, matching the Delete Item modal layout.
- Cancel uses the neutral button variant and closes the dialog without submitting.
- Confirm uses the primary button variant and submits the nickname update directly.
- Disable both action buttons while the update is pending.
- Keep schema validation, unchanged-nickname validation, server errors, success closing, and route refresh behavior.

## Implementation

Remove the intermediate confirmation view and its `isConfirming`, `pendingNickname`, and `isUpdating` state. Use React Hook Form's `isSubmitting` state for pending UI. The submit handler validates the changed nickname, calls the existing update action with the submitted value, reports errors under the input, and closes the dialog on success.

## Validation

- The dialog opens with the input, top-right Close, neutral Cancel, and primary Confirm visible.
- Cancel and top-right Close dismiss without updating.
- Confirm validates and submits exactly once.
- Both bottom actions are disabled while submitting.
- Validation and server errors remain visible below the input.
- Formatting, lint, TypeScript, and diff checks pass.
