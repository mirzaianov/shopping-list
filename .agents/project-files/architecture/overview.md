# Architecture Overview

## Current Application Shape

The project is currently a client-side React app built by Vite, with a minimal Next.js App Router shell added alongside it for the accepted migration. UI code lives under `src/`, while Firebase initialization is kept in the root `firebase.ts` module.

Primary `dev` and `build` scripts still run Vite. The reviewable Next routes use `next:*` scripts until the migration is ready to replace the Vite entrypoints.

## Key Dependencies

- React renders the application and component state.
- React Router handles page navigation.
- Next.js owns the migration routes under `src/app`.
- Firebase provides authentication and realtime data services.
- Neon and Drizzle are scaffolded for the staged database cutover.
- CSS Modules provide component/page styling.
- Global CSS provides fonts, resets, and reusable CSS custom properties.
- Varlock loads local Firebase environment values before development and build commands.
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

- Next.js 16 is installed alongside Vite.
- `src/app/page.tsx` is the temporary Firebase-backed authenticated homepage route.
- `src/app/login/page.tsx` is the temporary Firebase-backed sign-in/sign-up route.
- `src/db` contains the initial Drizzle schema, Neon client, and shopping-item query helpers, with a generated migration under `drizzle/`.
- Existing Vite route screens moved from `src/pages` to `src/legacy-pages` so Next does not treat them as Pages Router routes.

## UI Reference Direction

Future UI changes that move the app toward the Things-inspired personal task
model should use `../references/things-3-images/` as visual reference material.
Use the images for layout density, sidebar/content hierarchy, task-list
structure, and responsive adaptation. Do not copy the Things 3 interface
directly.

## Constraints

- Do not commit real Firebase credentials or local KeePass paths.
- Do not expose future Neon or Better Auth secrets as `NEXT_PUBLIC_*` values.
- Keep local env values in ignored `.env.local` files.
- Preserve pnpm as the current package manager unless a migration is explicitly requested.
- Keep app changes small and verify with the configured format, typecheck, lint, and build scripts when the change warrants it.
