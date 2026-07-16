# Architecture Overview

## Current Application Shape

The project is a Next.js App Router shopping-list app. Routes live under root `app/`; feature UI, auth, and database code live under `src/`.

Primary local `dev`, `build:local`, and `start` scripts run Next.js through Varlock. The default `build` script runs plain `next build` so hosted builds can use platform environment variables directly.

## Key Dependencies

- React renders the application and component state.
- Next.js owns routing under root `app`.
- Better Auth, Neon, and Drizzle support auth and shopping-list data.
- React Server Components are preferred for route shells and rendered data.
- `@dnd-kit` owns grip-handle sortable todo reordering in a small client island.
- React Hook Form manages form-local client state.
- Zod validates form and server-action inputs.
- TanStack Query owns client mutation lifecycle and pending state without duplicating Server Component reads in its cache.
- Local React state owns transient shopping-list edit selection inside the sortable-list client island.
- Base UI is the default headless UI component system for new or reworked interactive controls.
- CSS Modules provide component/page styling.
- Global CSS provides fonts, resets, and reusable CSS custom properties.
- Varlock loads local server-only environment values before development and local build commands.
- Vercel System Environment Variables provide production, preview, and branch-preview hostnames for Better Auth origin checks and fallback URL resolution.
- Oxlint and Oxfmt own local linting and formatting.

## Planned Platform Migration

ADR-002 accepts a staged migration from Vite/Firebase to Next.js App Router,
Neon PostgreSQL, Drizzle, and Better Auth.

Target route behavior:

- `/` is the authenticated homepage and shopping-list route.
- Unauthenticated users visiting `/` redirect to `/login`.
- `/login` hosts sign-in.
- `/signup` hosts sign-up and collects a unique nickname stored in Better Auth `user.name`.
- `/settings` hosts signed-in account settings.
- Authenticated users visiting `/login` or `/signup` redirect to `/`.

Detailed plan: `next-neon-better-auth-migration-plan.md`

Current migration progress:

- `app/page.tsx` validates a Better Auth session and renders the Neon-backed shopping-list route.
- `app/login/page.tsx` redirects authenticated users and renders Better Auth sign-in UI.
- `app/signup/page.tsx` redirects authenticated users and renders Better Auth sign-up UI.
- `app/settings/page.tsx` validates a Better Auth session and renders account settings with account removal.
- `app/api/auth/[...all]/route.ts` mounts Better Auth route handlers.
- The signed-in shopping-list shell and list render as Server Components; client islands are limited to forms, sign-out, edit-selection controls, and sortable todo reordering.
- Shopping-list mutations run through authenticated server actions with Zod validation.
- `src/db` contains the Drizzle schema, Neon client, and shopping-item query helpers, with generated migrations under `drizzle/`.
- The legacy Vite/Firebase route surface has been removed.

State boundary decisions: `../decisions/ADR-003-rsc-first-client-state-boundaries.md` and `../decisions/ADR-007-use-local-ui-state-and-query-mutations.md`

Todo drag-reorder decision: `../decisions/ADR-005-use-dnd-kit-for-todo-reordering.md`

UI component system decision: `../decisions/ADR-006-use-base-ui-as-default-ui-system.md`

Component composition diagram: `component-composition.mmd`

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
