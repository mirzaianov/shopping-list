# ADR-003: Use RSC-first UI with small client state islands

## Status

Accepted

## Date

2026-07-02

## Context

The app migrated to Next.js App Router and initially kept the shopping-list and
login screens as broad client components. That preserved the old Vite-style
state shape but pushed static list markup, route shell markup, and mutation
wiring into the client bundle.

The target direction is to use as much React Server Components as practical
while still using React Hook Form, Zod, and Zustand for learning and for the
places where they fit.

## Decision

Use an RSC-first boundary:

- Server Components own route shells, authenticated data loading, and rendered
  shopping-list markup.
- Server actions own shopping-item mutation authorization, validation, database
  writes, and route revalidation.
- React Hook Form owns form-local client state for shopping-item and auth forms.
- Zod owns runtime validation at both client form and server action boundaries.
- Zustand owns only transient shopping-list edit selection state.

Do not use Zustand as a database cache, auth/session store, or replacement for
server-rendered data.

## Alternatives Considered

### Keep whole pages as Client Components

- Pros: Smallest migration from the old Vite shape.
- Cons: Larger client bundle and unclear ownership between server data and
  client UI state.
- Rejected: Conflicts with the RSC-first goal.

### Use URL state for edit selection

- Pros: More RSC-friendly than a client store and shareable through browser
  history.
- Cons: The user explicitly wants Zustand included for learning.
- Rejected for now: Zustand is scoped narrowly to edit selection.

### Add global app state management

- Pros: Centralized state model.
- Cons: No current cross-route client state exists; persisted data already lives
  in Neon/PostgreSQL and session data lives in Better Auth.
- Rejected: Too much architecture for this app.

## Consequences

- The shopping-list shell and list items can render on the server.
- Client JavaScript is limited to forms, sign-out, and edit-selection buttons.
- Runtime validation is consistent between client and server paths.
- Zustand remains intentionally small and replaceable if URL edit state becomes
  preferable later.
