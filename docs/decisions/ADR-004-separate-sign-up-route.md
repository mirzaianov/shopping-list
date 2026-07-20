# ADR-004: Separate sign-up route from login

## Status

Accepted

## Date

2026-07-02

## Context

ADR-002 originally placed sign-in and sign-up on `/login`. During the Better Auth UI cleanup, the auth forms gained separate validation and global error behavior. Keeping both forms behind a client-side mode switch made route intent and form state harder to reason about.

The app still needs the same protected-homepage behavior:

- `/` is the authenticated task-list screen.
- Unauthenticated users visiting `/` redirect to `/login`.
- Authenticated users visiting auth pages redirect to `/`.

## Decision

Use separate auth routes:

```text
/login   sign-in page
/signup  sign-up page
```

Both routes validate the Better Auth session in Server Components before rendering their client form islands. If a session exists, both routes redirect to `/`.

The sign-up form relies on Better Auth's `signUp.email` result for duplicate-user detection instead of pre-querying the database. This preserves the database/auth uniqueness boundary and avoids a separate race-prone existence check.

## Consequences

- Sign-in and sign-up each have one route, one client form owner, and simpler local form state.
- Better Auth remains the source of truth for duplicate email detection.
- Documentation and diagrams that previously said `/login` hosts both forms should now reference `/signup` for registration.
- ADR-002 remains the platform migration decision, but this ADR amends its auth route model.
