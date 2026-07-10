# ADR-002: Migrate to Next.js, Neon, and Better Auth

## Status

Accepted

Route model amended by ADR-004.

## Date

2026-07-01

## Context

The current app is a Vite React SPA that uses Firebase Authentication and
Firebase Realtime Database directly from client components.

This works for the current shopping-list behavior, but it keeps auth, data
ownership, and persistence logic in browser-side code. The next platform goal is
to use a relational database and server-owned auth/session checks while keeping
the app small.

The desired route behavior is also changing:

- `/` should be the authenticated homepage and shopping-list route.
- Unauthenticated users should be redirected from `/` to a login/sign-up page.
- Authenticated users should not stay on the login/sign-up page.

## Decision

Migrate the project to Next.js App Router, Neon PostgreSQL, Drizzle, and Better
Auth.

Use the following target route model:

```text
/       authenticated shopping-list homepage
/login  sign-in page
/signup sign-up page
```

Use server-rendered pages and server actions as the security boundary:

- Protected pages validate the Better Auth session before reading data.
- Server actions validate the Better Auth session before mutating data.
- Middleware/proxy may be used for redirect ergonomics, but not as the only
  authorization check.

Use Neon PostgreSQL as the primary database and Drizzle for schema, migrations,
and typed queries.

Preserve these repository conventions:

- pnpm package manager
- TypeScript
- CSS Modules
- Oxlint and Oxfmt
- Varlock-backed env management
- Husky and commitlint
- LF line-ending policy

## Migration Strategy

Use a staged migration:

```text
1. Create a working Next.js shell while Firebase remains temporarily available.
2. Add Neon and Drizzle schema/migrations.
3. Add Better Auth and route handlers.
4. Move shopping-list CRUD to server actions.
5. Remove Firebase, Vite, React Router, and obsolete env values.
```

The detailed execution plan is in
`../architecture/next-neon-better-auth-migration-plan.md`.

## Alternatives Considered

### Big-bang rewrite

- Pros: fastest path to the final file tree.
- Cons: mixes framework, auth, database, routing, and env changes into one
  failure domain.
- Rejected because the current app is small enough to migrate in controlled
  phases.

### Stay on Vite and add a separate backend

- Pros: keeps the current frontend mostly intact.
- Cons: adds an extra app boundary and deployment surface for a project that can
  be handled by Next.js route handlers and server actions.
- Rejected because Next.js gives the app a server boundary without a separate
  service.

### Keep Firebase Authentication with Neon

- Pros: less auth migration work.
- Cons: keeps two identity/data platforms and does not reach the desired Better
  Auth ownership model.
- Rejected because the stated target is Better Auth instead of Firebase
  Authentication.

### Use raw SQL without Drizzle

- Pros: fewer dependencies.
- Cons: auth tables and app tables need repeatable migrations and typed access.
- Rejected because Drizzle is a small enough layer that solves schema and
  migration ownership.

## Consequences

- Firebase user passwords are not assumed portable. Existing users should either
  create/reset accounts in Better Auth or receive a dedicated data migration if
  preserving production users matters.
- User-specific pages must avoid static caching of private data.
- Database credentials and auth secrets must remain server-only env values.
- The app gets a server-owned persistence boundary, so future data-model work
  can evolve beyond Firebase paths.
- `/homepage` should disappear after the App Router migration; `/` becomes the
  protected homepage.
