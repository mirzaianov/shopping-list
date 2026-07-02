# Architecture Overview

## Current Application Shape

The project is a Next.js App Router shopping-list app. UI, auth, and database code live under `src/`.

Primary `dev`, `build`, and `start` scripts run Next.js through Varlock.

## Key Dependencies

- React renders the application and component state.
- Next.js owns routing under `src/app`.
- Better Auth, Neon, and Drizzle support auth and shopping-list data.
- CSS Modules provide component/page styling.
- Global CSS provides fonts, resets, and reusable CSS custom properties.
- Varlock loads local server-only environment values before development and build commands.
- Oxlint and Oxfmt own local linting and formatting.

## Planned Platform Migration

ADR-002 accepts a staged migration from Vite/Firebase to Next.js App Router,
Neon PostgreSQL, Drizzle, and Better Auth.

Target route behavior:

- `/` is the authenticated homepage and shopping-list route.
- Unauthenticated users visiting `/` redirect to `/login`.
- `/login` hosts sign-in and sign-up.
- Authenticated users visiting `/login` redirect to `/`.

Detailed plan: `next-neon-better-auth-migration-plan.md`

Current migration progress:

- `src/app/page.tsx` validates a Better Auth session and renders the Neon-backed shopping-list route.
- `src/app/login/page.tsx` redirects authenticated users and renders Better Auth sign-in/sign-up UI.
- `src/app/api/auth/[...all]/route.ts` mounts Better Auth route handlers.
- `src/db` contains the Drizzle schema, Neon client, and shopping-item query helpers, with a generated migration under `drizzle/`.
- The legacy Vite/Firebase route surface has been removed.

## UI Reference Direction

Future UI changes that move the app toward the Things-inspired personal task
model should use `../references/things-3-images/` as visual reference material.
Use the images for layout density, sidebar/content hierarchy, task-list
structure, and responsive adaptation. Do not copy the Things 3 interface
directly.

## Constraints

- Do not commit real database/auth credentials or local KeePass paths.
- Do not expose Neon or Better Auth secrets as `NEXT_PUBLIC_*` values.
- Keep local env values in ignored `.env.local` files.
- Preserve pnpm as the current package manager unless a migration is explicitly requested.
- Keep app changes small and verify with the configured format, typecheck, lint, and build scripts when the change warrants it.
