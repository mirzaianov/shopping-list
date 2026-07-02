# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-02: Split the signed-in shopping-list screen into an RSC shell/list with small client islands, added React Hook Form, Zod, and narrowly scoped Zustand edit state, and recorded ADR-003 for the server/client boundary. [Reason why added: captures the accepted RSC-first state-management direction after the migration cleanup.]
- 2026-07-02: Removed the legacy Vite/Firebase/React Router app surface, deleted obsolete Firebase env aliases, made Next.js the primary dev/build/start target, and dropped Firebase/Vite-related dependencies. [Reason why added: records ADR-002 Phase 5 cleanup after the Better Auth and Neon cutover.]
- 2026-07-02: Added Better Auth with Drizzle-backed route handlers and moved the Next `/` and `/login` routes to Better Auth sessions with Neon-backed shopping-list mutations. [Reason why added: records ADR-002 auth cutover progress before legacy Firebase/Vite cleanup.]
- 2026-07-02: Added Neon/Drizzle dependencies, server-only `DATABASE_URL` schema entry, Drizzle config, initial Better Auth/shopping-list schema, generated migration, and scoped shopping-item query helpers. [Reason why added: records ADR-002 Phase 2 database-layer scaffolding before Better Auth wiring.]
- 2026-07-01: Wrapped the Next App Router layout in the existing page shell styles, corrected CSS Module typography/token drift, and simplified safe style duplication/no-op tokens after the parity pass. [Reason why added: records the UI parity and style optimization pass before continuing to the database phase.]
- 2026-07-01: Wrapped `next:dev`, `next:build`, and `next:start` with `varlock run --` so temporary Firebase `NEXT_PUBLIC_*` aliases are available to Next during the staged migration. [Reason why added: fixes the Next dev/runtime mismatch where Vite received Varlock env but Next did not.]
- 2026-07-01: Moved the Firebase-backed shopping-list screen into the Next `/` route and the Firebase-backed sign-in/sign-up screen into `/login`, with temporary `NEXT_PUBLIC_FIREBASE_*` env aliases and deferred Firebase initialization for Next prerendering. [Reason why added: records ADR-002 Phase 1 route behavior before replacing Firebase with Better Auth.]
- 2026-07-01: Added a reviewable Next.js 16 App Router shell alongside the existing Vite app, added `next:*` scripts, moved Vite route screens to `src/legacy-pages`, and configured Oxfmt to ignore generated `next-env.d.ts`. [Reason why added: records ADR-002 Phase 1 progress while preserving the current Vite app for manual review.]
- 2026-07-01: Marked the Things 3 desktop/tablet/mobile images as the reference UI set for future Things-inspired app modifications. [Reason why added: future UI work should consult the saved images for layout and hierarchy while avoiding direct copying.]
- 2026-07-01: Added ADR-002 and a detailed architecture plan for migrating from Vite/Firebase to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, with `/` as the protected homepage and `/login` for sign-in/sign-up. [Reason why added: records the accepted platform direction and routing behavior before implementation.]
