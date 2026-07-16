# TanStack Query Button Spinners Design

> Implementation update, 2026-07-16: ADR-007 replaced Zustand edit selection with local React state. The homepage Add control is now a primary text button, and Edit Item confirmation is owned by the shared `EditModalLayout`; the mutation ownership described below remains current.

## Goal

Use TanStack Query v5 to own client-side network mutation state and show a shared loading spinner on every button that starts a mutation. A pending mutation disables its initiating button and replaces that button's visible icon and text with the spinner.

Route-only navigation controls remain unchanged. Next.js continues to own route transitions and Server Component data reads.

## State Ownership

- Next.js Server Components continue to read the shopping list, session, and settings data.
- TanStack Query owns client mutation lifecycle state through `useMutation`, including `isPending`.
- Zustand remains limited to transient local UI state: the shopping item currently selected for editing and its open/close actions.
- React Hook Form continues to own form values, validation, and field errors.
- Mutation loading flags are not copied into Zustand, React Hook Form, or component `useState`.

This avoids maintaining a TanStack client cache that duplicates Server Component data. Successful mutations continue to call `router.refresh()` when the server-rendered view needs updating.

## Query Integration

Install `@tanstack/react-query` using the repository's pnpm policy. Add one client `QueryProvider` containing a lazily initialized `QueryClient`, then render that provider around the route children from the root Server Component layout.

Use `useMutation` for:

- sign in
- sign up, including nickname availability checks
- sign out
- create shopping item
- update shopping item
- delete shopping item
- reorder shopping items
- update nickname
- delete account

Existing authenticated Server Actions retain their input validation, authentication, and authorization. TanStack Query changes client orchestration only.

## Spinner And Button Behavior

Add one shared spinner component using the current text color and a CSS rotation animation. Reduced-motion mode keeps the loading glyph visible without rotation.

Extend the shared `Button` component with a `loading` prop. When loading, it:

- disables the underlying button
- sets `aria-busy="true"`
- preserves an accessible loading name
- replaces the normal icon and text with the spinner

The icon-only Add and Save buttons render the same spinner directly while their mutations are pending. Sign Out renders it inside the Base UI menu item. Their existing dimensions remain unchanged.

`DeleteModalLayout` receives separate `confirmDisabled` and `confirmPending` values. Validation may disable Confirm before submission, while `confirmPending` displays the spinner and keeps Confirm disabled during either deletion request.

Cancel, Close, password visibility, edit triggers, menu navigation, drag handles, and route-only buttons do not receive mutation spinners.

## Mutation Results And Errors

Existing success behavior remains unchanged: toasts, form resets, dialog dismissal, Zustand edit cancellation, redirects, and `router.refresh()` occur only after successful mutations.

Existing action-result errors continue to map to the current toasts or React Hook Form field/root errors. Unexpected rejected mutations use the current fallback messages. Sign-up treats its nickname checks and account creation as one pending submit operation.

The reorder operation uses a mutation for network lifecycle and preserves the existing optimistic local order with rollback on failure. It has no button spinner.

## Verification

- Type-check, lint, and format all affected files.
- Confirm every listed network operation uses `useMutation` and no manual mutation-loading `useState` remains.
- Confirm every mutation button disables and replaces its visible content while pending.
- Confirm route-only and immediate UI controls remain unchanged.
- Confirm Server Component reads and Zustand edit-selection state are not moved into TanStack Query.
- Confirm reduced-motion and accessible busy-state behavior remain available.
- Do not use browser automation unless the user explicitly requests it.
