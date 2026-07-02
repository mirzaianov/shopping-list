# Next.js, Neon, and Better Auth Migration Plan

Status: planned architecture migration

## Goal

Migrate the current Vite/Firebase shopping-list app to a Next.js App Router app
that uses Neon PostgreSQL for persistence and Better Auth for email/password
authentication.

The target route behavior is:

- `/` is the authenticated homepage and shopping-list screen.
- Unauthenticated users visiting `/` are redirected to `/login`.
- `/login` hosts sign-in UI.
- `/signup` hosts sign-up UI.
- Authenticated users visiting `/login` or `/signup` are redirected back to `/`.

## Current State

The app is currently a Vite React SPA:

- React Router owns `/` and `/homepage`.
- Firebase Authentication owns email/password auth.
- Firebase Realtime Database stores todos under the current Firebase user id.
- Firebase reads and writes happen directly inside client components.
- Varlock resolves Firebase `VITE_*` values from KeePass-backed env entries.

## Target State

The target app is a small full-stack Next.js application:

- Next.js App Router owns routing, layouts, server components, and server
  actions.
- Better Auth owns users, sessions, email/password sign-in, sign-up, and
  sign-out.
- Neon PostgreSQL stores auth tables and shopping-list items.
- Drizzle owns typed schema definitions, migrations, and database queries.
- Server actions own create, edit, and delete mutations.
- Server-rendered pages validate sessions before reading user-owned data.

Expected source shape:

```text
src/app/layout.tsx
src/app/globals.css
src/app/page.tsx
src/app/login/page.tsx
src/app/signup/page.tsx
src/app/api/auth/[...all]/route.ts

src/components/
src/lib/auth.ts
src/lib/auth-client.ts
src/db/client.ts
src/db/schema.ts
src/db/queries.ts
```

## Data Model

Keep the first database model as small as the current product requires.

```text
shopping_items
- id
- user_id
- todo
- changed_on
```

Do not add completion state, projects, areas, tags, or scheduling during this
migration unless the product scope is changed separately. ADR-001 covers the
larger Things 3-inspired direction, but this migration should first preserve the
current shopping-list behavior.

## Environment Variables

Replace Firebase browser-exposed env values with server-owned values:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

Keep these values server-only. Do not prefix them with `NEXT_PUBLIC_`.

Varlock should remain the repository-owned environment policy:

- `.env.schema` stays committed.
- `.env.local` stays ignored.
- KeePass-backed values remain local-machine/user specific.
- `dev`, `build`, and `start` scripts run through `varlock run --`.

## Migration Phases

### Phase 1: Next.js Shell

Install and configure Next.js while Firebase remains in place temporarily.

Expected changes:

- Add `next` and Next-compatible config.
- Replace Vite scripts with `next dev`, `next build`, and `next start`.
- Add `next-env.d.ts`.
- Update `tsconfig.json` for Next.js.
- Move global CSS import into `src/app/layout.tsx`.
- Move the authenticated screen toward `src/app/page.tsx`.
- Move sign-in UI toward `src/app/login/page.tsx`.
- Move sign-up UI toward `src/app/signup/page.tsx`.
- Remove React Router once App Router routes replace `/` and `/homepage`.

Acceptance checks:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- Manual route check for `/`, `/login`, and `/signup`

### Phase 2: Database Layer

Add Neon PostgreSQL with Drizzle before replacing Firebase reads/writes.

Expected changes:

- Add `@neondatabase/serverless`, `drizzle-orm`, and `drizzle-kit`.
- Add `src/db/schema.ts`, `src/db/client.ts`, and `drizzle.config.ts`.
- Add migrations for Better Auth tables and `shopping_items`.
- Add small query functions for list, create, update, and delete operations.

Acceptance checks:

- Drizzle migration generation succeeds.
- Drizzle migration apply succeeds against the configured Neon database.
- A server-side smoke query can read from the database.

### Phase 3: Better Auth

Replace Firebase Authentication with Better Auth.

Expected changes:

- Add `better-auth`.
- Configure `src/lib/auth.ts` with email/password enabled.
- Add `src/lib/auth-client.ts` only for sign-in/sign-up client interactions.
- Mount Better Auth at `src/app/api/auth/[...all]/route.ts`.
- Validate sessions on protected server pages and server actions.
- Use middleware/proxy only for redirect UX, not as the security boundary.

Acceptance checks:

- Sign up creates a user/session.
- Sign in creates a session.
- Sign out clears the session.
- Unauthenticated `/` redirects to `/login`.
- Authenticated `/login` redirects to `/`.
- Authenticated `/signup` redirects to `/`.

### Phase 4: Shopping-List CRUD Cutover

Move shopping-list persistence from Firebase client calls to server actions.

Expected changes:

- `src/app/page.tsx` validates the session and fetches the current user's items.
- Create, edit, and delete operations are server actions.
- Each mutation checks the session and scopes database operations by `user_id`.
- Client components keep only form state and interaction behavior.

Acceptance checks:

- A signed-in user can create, edit, and delete items.
- Items are scoped to the signed-in user.
- Empty and duplicate item checks still run.
- Unauthenticated mutation attempts fail server-side.

### Phase 5: Firebase and Vite Removal

Remove old dependencies and configuration after the new stack owns auth and
data.

Expected removals:

- `firebase`
- `react-router-dom`
- `uid`
- `vite`
- `@vitejs/plugin-react`
- `firebase.ts`
- `src/main.tsx`
- `vite.config.ts`
- `index.html`
- Firebase `VITE_*` entries in `.env.schema`

Acceptance checks:

- `pnpm install --no-frozen-lockfile`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

## User Migration

Firebase password hashes are not assumed portable into Better Auth.

Default migration policy:

- Start new auth accounts in Better Auth.
- If existing Firebase data must be preserved, migrate list items by matching
  Firebase user email to the new Better Auth user after the user creates or
  resets the account.
- Require password reset or fresh sign-up for existing Firebase users.

## Risks

- Combining framework, auth, and database migration in one commit would make
  failures hard to isolate.
- Better Auth session checks must happen on protected server pages/actions, not
  only through cookie-presence middleware.
- Database credentials must never become `NEXT_PUBLIC_*`.
- Static rendering must not cache user-specific todo data.
- Firebase user migration needs an explicit product decision if existing users
  matter.

## References

- https://nextjs.org/docs/app/guides/migrating/from-vite
- https://neon.com/docs/guides/nextjs
- https://neon.com/docs/guides/drizzle
- https://better-auth.com/docs/installation
- https://better-auth.com/docs/integrations/next
- https://better-auth.com/docs/authentication/email-password
