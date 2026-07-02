# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-02: Moved sign-up client/view code under `src/features/signup`, moved shared auth form schemas/error copy/page CSS under `src/features/auth`, reduced the auth submit gap after the two-line global error slot, and converted the component-composition doc body to a Mermaid diagram block. [Reason why added: records the feature-folder split and auth form spacing correction requested after the `/signup` route split.]
- 2026-07-02: Split sign-up from `/login` into `/signup`, added first-field autofocus on auth/home forms, reserved two-line global auth error slots, and mapped Better Auth duplicate-user signup errors to specific UI copy. [Reason why added: records the current auth route and form-error behavior after the Better Auth UI cleanup.]
- 2026-07-02: Added an architecture component-composition Mermaid diagram documenting the Next route tree, RSC/client component boundaries, server actions, auth, Drizzle, and Neon edges. [Reason why added: gives future agents a fast visual map of the current migrated architecture.]
- 2026-07-02: Split the signed-in shopping-list screen into an RSC shell/list with small client islands, added React Hook Form, Zod, and narrowly scoped Zustand edit state, and recorded ADR-003 for the server/client boundary. [Reason why added: captures the accepted RSC-first state-management direction after the migration cleanup.]
- 2026-07-02: Removed the legacy Vite/Firebase/React Router app surface, deleted obsolete Firebase env aliases, made Next.js the primary dev/build/start target, and dropped Firebase/Vite-related dependencies. [Reason why added: records ADR-002 Phase 5 cleanup after the Better Auth and Neon cutover.]
- 2026-07-02: Added Better Auth with Drizzle-backed route handlers and moved the Next `/` and `/login` routes to Better Auth sessions with Neon-backed shopping-list mutations. [Reason why added: records ADR-002 auth cutover progress before legacy Firebase/Vite cleanup.]
- 2026-07-02: Added Neon/Drizzle dependencies, server-only `DATABASE_URL` schema entry, Drizzle config, initial Better Auth/shopping-list schema, generated migration, and scoped shopping-item query helpers. [Reason why added: records ADR-002 Phase 2 database-layer scaffolding before Better Auth wiring.]
- 2026-07-01: Wrapped the Next App Router layout in the existing page shell styles, corrected CSS Module typography/token drift, and simplified safe style duplication/no-op tokens after the parity pass. [Reason why added: records the UI parity and style optimization pass before continuing to the database phase.]
- 2026-07-01: Wrapped `next:dev`, `next:build`, and `next:start` with `varlock run --` so temporary Firebase `NEXT_PUBLIC_*` aliases are available to Next during the staged migration. [Reason why added: fixes the Next dev/runtime mismatch where Vite received Varlock env but Next did not.]
- 2026-07-01: Moved the Firebase-backed shopping-list screen into the Next `/` route and the Firebase-backed sign-in/sign-up screen into `/login`, with temporary `NEXT_PUBLIC_FIREBASE_*` env aliases and deferred Firebase initialization for Next prerendering. [Reason why added: records ADR-002 Phase 1 route behavior before replacing Firebase with Better Auth.]
