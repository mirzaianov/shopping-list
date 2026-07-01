# Architecture Overview

## Current Application Shape

The project is a client-side React app built by Vite. UI code lives under `src/`, while Firebase initialization is kept in the root `firebase.ts` module.

## Key Dependencies

- React renders the application and component state.
- React Router handles page navigation.
- Firebase provides authentication and realtime data services.
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

## Constraints

- Do not commit real Firebase credentials or local KeePass paths.
- Do not expose future Neon or Better Auth secrets as `NEXT_PUBLIC_*` values.
- Keep local env values in ignored `.env.local` files.
- Preserve pnpm as the current package manager unless a migration is explicitly requested.
- Keep app changes small and verify with the configured format, typecheck, lint, and build scripts when the change warrants it.
