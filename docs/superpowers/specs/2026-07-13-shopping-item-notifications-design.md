# Shopping Item Notifications

## Status

Proposed design for the first notification slice. Scope is limited to shopping-item mutations.

## Goal

Give users immediate, accessible feedback after creating, editing, deleting, or reordering a shopping item. The feedback is transient UI state only; it is not persisted and does not become a notification history.

## Scope

Included:

- Creating a shopping item.
- Editing a shopping item.
- Deleting a shopping item.
- Reordering shopping items.

Excluded:

- Nickname updates.
- Account deletion.
- Sign-up, sign-in, and sign-out feedback.
- A server-side notification model or notification history.

## Decision

Use Sonner as the notification layer. Render one `Toaster` in the root App Router layout and call Sonner's `toast.success` or `toast.error` APIs from the existing client components that already await shopping-list server actions.

This avoids a custom notification provider, store slice, timer system, and dismissal logic. Sonner is an acceptable dependency because the project needs shared feedback across sibling client islands and already uses a component-oriented UI stack.

## User Experience

| Operation | Success | Failure |
| --- | --- | --- |
| Create | `Item added` | Show the action validation or server error. Keep the form value. |
| Edit | `Item updated` | Show the action validation or server error. Keep the dialog open. |
| Delete | `Item deleted` | Show the action or request error. Keep the dialog open when the delete fails. |
| Reorder | No success toast; the optimistic movement is visible immediately. | Roll back the list and show the existing order error through the notification surface. |

Success toasts use a short duration. Error toasts remain dismissible and use an accessible alert presentation. Limit the default visible toast count to one so rapid list interactions do not create a noisy stack.

## Architecture and Data Flow

1. Add `sonner` as a runtime dependency.
2. Render a single `Toaster` from `app/layout.tsx`, positioned at the bottom center with a mobile-safe offset and the app's visual tokens.
3. Call `toast.success` only after the relevant server action returns without an error.
4. Call `toast.error` when an action returns an error or an awaited request rejects.
5. Keep `router.refresh()` after successful create and edit operations.
6. Change the delete dialog from an opaque native form action to a client-controlled submit that awaits `deleteShoppingItemAction`. Close the dialog and refresh only after success.
7. Keep reorder optimistic. On failure, restore the previous item order and show the error notification; do not add a success toast for every drag.

No server-action response contract change is required. Existing `ActionResult.error` values remain the source of user-facing failure text.

## Accessibility and Styling

- Use Sonner's built-in accessible notification behavior and explicit close controls.
- Keep notifications non-blocking and avoid moving focus after a mutation.
- Match the app's color tokens for success and error states.
- Apply the app's squircle treatment to the toast surface, with the existing border-radius fallback for browsers without `corner-shape` support.
- Respect reduced-motion preferences through Sonner configuration or the app's existing motion styles.

## Validation

- Format all changed TypeScript, CSS, and package files.
- Run Oxlint and TypeScript checks.
- Verify create, edit, delete, and reorder success paths manually.
- Verify validation failures and request failures do not show false success notifications.
- Verify delete failure leaves the dialog open and failed reorder restores the previous order.
- Verify notifications are readable on desktop and mobile and can be dismissed with keyboard input.

## Non-Goals and Deferred Work

Do not add a notification queue, persistence, undo actions, or notification preferences in this slice. Add those only if real usage shows that one visible transient notification is insufficient.
