# Current Status

Status: project-state current repository state

## Project State

This is a Next.js shopping-list app. The app supports email/password authentication with Better Auth and shopping-list management backed by Neon PostgreSQL through Drizzle.

Project support docs include Things 3 reference material and UI reference images, ADR-001 for a possible personal task-management evolution, ADR-002 plus an architecture migration plan for moving to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, ADR-003 for the RSC-first client-state boundary, and an architecture component-composition diagram. [Reason why added: future agents should distinguish current implementation from accepted product and platform directions.]

## Current Tooling Baseline

- Runtime/package manager: Node with pnpm.
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days.
- Frontend: Next.js 16 App Router, React 19, and component-local CSS Modules.
- Language: TypeScript for Next.js, database, auth, and React app code, with strict checking via `tsconfig.json`.
- RSC boundary: route shells and shopping-list rendering prefer Server Components; client islands are reserved for forms, sign-out, and edit-selection controls.
- Form/state libraries: React Hook Form handles form-local client state, Zod handles runtime validation, and the global Zustand store in `src/store` is limited to transient shopping-list edit selection through slice creators.
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- Styling: Global CSS is limited to fonts, resets, and reusable CSS custom properties; component/page styles live beside their TSX files as `*.module.css`.
- Source layout: Next routes live in `src/app`; shared components live in `src/components`; auth clients live in `src/lib`; auth form contracts live in `src/features/auth`; feature UI lives in `src/features/login`, `src/features/signup`, and `src/features/home`; global client store slices live in `src/store`; database code lives in `src/db`.
- Backend services: Better Auth plus Neon/Drizzle own auth and shopping-list data.
- Environment: Varlock resolves server-only `DATABASE_URL` and `BETTER_AUTH_SECRET`; Next and Drizzle scripts run through `varlock run --`.
- Accepted platform direction: staged migration to Next.js App Router, Better Auth, Neon PostgreSQL, and Drizzle; `/` is the authenticated homepage, unauthenticated users redirect to `/login`, and registration lives at `/signup`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has completed the planned Vite/Firebase removal. React app source uses TSX and PropTypes have been replaced with TypeScript props. The signed-in shopping-list view has been split into an RSC shell/list with small client islands for form handling, sign-out, and edit selection.

Varlock-backed Next development/build commands depend on local `.env.local` values and KeePassXC access. Do not inspect `.env.local` unless the user explicitly asks.

Full `pnpm format:check` is currently blocked by unrelated formatting issues in `.agents/project-files/references/things-3.md` and `.agents/settings.yaml`; targeted checks for the Next route files pass.
