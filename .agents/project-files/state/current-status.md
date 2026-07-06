# Current Status

Status: project-state current repository state

## Project State

This is a Next.js shopping-list app. The app supports email/password authentication with Better Auth and shopping-list management backed by Neon PostgreSQL through Drizzle.

Project support docs include Things 3 reference material and UI reference images, ADR-001 for a possible personal task-management evolution, ADR-002 plus an architecture migration plan for moving to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, ADR-003 for the RSC-first client-state boundary, ADR-004 for separate auth routes, ADR-005 for dnd-kit todo reordering, ADR-006 for Base UI as the default UI component system, and an architecture component-composition diagram. [Reason why added: future agents should distinguish current implementation from accepted product and platform directions.]

## Current Tooling Baseline

- Runtime/package manager: Node with pnpm.
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days, and targeted overrides keep vulnerable transitive `esbuild` and `postcss` resolutions on patched versions.
- Frontend: Next.js 16 App Router, React 19, and component-local CSS Modules.
- Language: TypeScript for Next.js, database, auth, and React app code, with strict checking via `tsconfig.json`.
- RSC boundary: route shells and shopping-list rendering prefer Server Components; client islands are reserved for forms, sign-out, edit-selection controls, and sortable drag-reorder behavior.
- Form/state libraries: React Hook Form handles form-local client state, Zod handles runtime validation, and the global Zustand store in `src/store` is limited to transient shopping-list edit selection through slice creators.
- UI component system: Base UI is the default headless component layer for new or reworked interactive controls, while CSS Modules continue to own visual styling. [Reason why added: records the accepted UI-system baseline after adopting Base UI for action buttons.]
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- Styling: Global CSS is limited to fonts, resets, and reusable CSS custom properties; component/page styles live beside their TSX files as `*.module.css`.
- Source layout: Next routes live in `src/app`; shared components live in `src/components`; auth clients live in `src/lib`; auth form contracts live in `src/features/auth`; feature UI lives in `src/features/login`, `src/features/signup`, and `src/features/home`; global client store slices live in `src/store`; database code lives in `src/db`.
- Backend services: Better Auth plus Neon/Drizzle own auth and shopping-list data.
- Auth policy: Better Auth explicitly uses the shared app password bounds of 8-128 characters and production-only rate limiting with a 10-second window and 100-request cap. [Reason why added: records the completed auth-hardening baseline for future security work.]
- Environment: Varlock resolves server-only `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`; Next and Drizzle scripts run through `varlock run --`; `pnpm dev` binds to localhost while `pnpm dev:lan` explicitly exposes the dev server on the local network.
- Security headers: `next.config.ts` applies low-risk global headers for MIME sniffing, referrer policy, camera/microphone/geolocation permissions, legacy frame blocking, and a global Content-Security-Policy-Report-Only baseline for observation before enforcement. The development CSP allows local WebSocket HMR and omits `upgrade-insecure-requests` to avoid dev-only report noise.
- Accepted platform direction: staged migration to Next.js App Router, Better Auth, Neon PostgreSQL, and Drizzle; `/` is the authenticated homepage, unauthenticated users redirect to `/login`, and registration lives at `/signup`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has completed and manually accepted the planned Vite/Firebase migration to Next.js, Better Auth, Neon, and Drizzle. React app source uses TSX and PropTypes have been replaced with TypeScript props. The signed-in shopping-list view has been split into an RSC shell/list with small client islands for form handling, sign-out, edit selection, and grip-handle todo reordering.

Manual acceptance passed on 2026-07-04: sign up, sign in, sign out, auth redirects, create/edit/delete, moved data visibility, and Neon row checks all passed in the user's environment.

Firebase-era user/list data was moved manually; no automated Firebase import exists for this migration.

Varlock-backed Next development/build commands depend on local `.env.local` values and KeePassXC access. Do not inspect `.env.local` unless the user explicitly asks.

Local CSP review with the normal `pnpm dev` script is currently blocked when Varlock cannot initialize KeePass `KP_PASSWORD`; use the user's working dev environment for the final browser-console CSP pass.

Full `pnpm format:check` is currently blocked by unrelated formatting issues in `.agents/project-files/references/things-3.md` and `.agents/settings.yaml`; targeted checks for the Next route files pass.
