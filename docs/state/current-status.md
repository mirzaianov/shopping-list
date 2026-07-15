# Current Status

Status: project-state current repository state

## Project State

This is a Next.js shopping-list app. The app supports email/password authentication with Better Auth and shopping-list management backed by Neon PostgreSQL through Drizzle.

Project support docs include Things 3 reference material and UI reference images, ADR-001 for a possible personal task-management evolution, ADR-002 plus an architecture migration plan for moving to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, ADR-003 for the RSC-first client-state boundary, ADR-004 for separate auth routes, ADR-005 for dnd-kit todo reordering, ADR-006 for Base UI as the default UI component system, and an architecture component-composition diagram. [Reason why added: future agents should distinguish current implementation from accepted product and platform directions.]

## Current Tooling Baseline

- Runtime/package manager: Node 24+ with pnpm.
- Project support files: canonical project context lives under root `docs/`, while `.agents/` holds local operational policy and optional repo-local skills. [Reason why added: records repository adoption of global project-support structure.]
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days, and targeted overrides keep vulnerable transitive `esbuild` and `postcss` resolutions on patched versions.
- Frontend: Next.js 16 App Router, React 19, and component-local CSS Modules.
- Language: TypeScript for Next.js, database, auth, and React app code, with strict checking via `tsconfig.json`.
- RSC boundary: route shells and shopping-list rendering prefer Server Components; client islands are reserved for forms, the Base UI account menu and edit dialog, and sortable drag-reorder behavior.
- Form/state libraries: React Hook Form handles form-local client state, Zod handles runtime validation, and the global Zustand store in `src/store` is limited to transient shopping-list edit selection through slice creators.
- UI component system: Base UI is the default headless component layer for new or reworked interactive controls, while CSS Modules continue to own visual styling. [Reason why added: records the accepted UI-system baseline after adopting Base UI for action buttons.]
- Modal styling: all four Base UI dialogs share one layout for the backdrop, viewport, card, title, top-right Close control, and open/close motion; feature modules own only their dialog content and actions. [Reason why added: records the consolidated modal UI contract and prevents shell styling from drifting.]
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- Styling: Global CSS is limited to fonts, resets, and reusable CSS custom properties; component/page styles live beside their TSX files as `*.module.css`.
- Button styling: shared text buttons use one structural raised-button behavior selected by their top face, independent `primary`, `destructive`, and `neutral` color variants, and separate standard/compact/full-width layout classes. Icon-only controls retain their simple press interaction. [Reason why added: records the consolidated button styling contract after removing duplicated behavior selectors.]
- Source layout: Next routes live in root `app`; shared components live in `src/components`; auth clients live in `src/lib`; auth form contracts live in `src/features/auth`; feature UI lives in `src/features/login`, `src/features/signup`, `src/features/home`, and `src/features/settings`; global client store slices live in `src/store`; database code lives in `src/db`.
- Backend services: Better Auth plus Neon/Drizzle own auth and shopping-list data.
- Account settings: `/settings` is protected, displays locked nickname, email, and masked password fields, permits a server-validated nickname change after explicit confirmation, and lets a signed-in user delete their account after typing their email. Better Auth deletes the user and Drizzle cascades owned sessions, accounts, and shopping items. [Reason why added: records the profile-settings and account-removal behavior.]
- Auth policy: Better Auth explicitly uses the shared app password bounds of 8-128 characters, requires a unique 3-32 character lowercase nickname during sign-up, and uses production-only rate limiting with a 10-second window and 100-request cap. [Reason why added: records the completed auth-hardening baseline for future security work.]
- Environment: Varlock resolves server-only `DATABASE_URL`, `BETTER_AUTH_SECRET`, and local `BETTER_AUTH_URL` for local development, local production builds, local start, and Drizzle scripts. On Vercel, Better Auth derives allowed production/preview hosts and its fallback URL from Vercel System Environment Variables, with Preview preferring `VERCEL_URL` and also trusting `VERCEL_BRANCH_URL`. The Better Auth browser client uses the current browser origin as its absolute same-origin auth base URL. The default `pnpm build` runs plain `next build` so Vercel can use project environment variables directly; `pnpm build:local` keeps the Varlock-backed local build path. `pnpm dev` binds to localhost while `pnpm dev:lan` explicitly exposes the dev server on the local network.
- Security headers: `next.config.ts` applies low-risk global headers for MIME sniffing, referrer policy, camera/microphone/geolocation permissions, legacy frame blocking, and a global Content-Security-Policy-Report-Only baseline for observation before enforcement. The development CSP allows local WebSocket HMR, the preview CSP allows Vercel Toolbar script/connect/image/style/font/frame sources, and the report-only policy omits `upgrade-insecure-requests`.
- Accepted platform direction: staged migration to Next.js App Router, Better Auth, Neon PostgreSQL, and Drizzle; `/` is the authenticated homepage, unauthenticated users redirect to `/login`, and registration lives at `/signup`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has completed and manually accepted the planned Vite/Firebase migration to Next.js, Better Auth, Neon, and Drizzle. React app source uses TSX and PropTypes have been replaced with TypeScript props. The signed-in shopping-list view has been split into an RSC shell/list with small client islands for form handling, a Base UI account menu and modal editing, and grip-handle todo reordering. The account menu shows nickname/email, Settings and Sign Out actions, and a static signed-in presence indicator. Sign-up stores the user's nickname in Better Auth `user.name`, while sign-in remains email/password. [Reason why added: records the homepage account-control boundary and signed-in identity presentation.]

Manual acceptance passed on 2026-07-04: sign up, sign in, sign out, auth redirects, create/edit/delete, moved data visibility, and Neon row checks all passed in the user's environment.

Firebase-era user/list data was moved manually; no automated Firebase import exists for this migration.

Varlock-backed Next development/local build commands depend on local `.env.local` values and KeePassXC access. Do not inspect `.env.local` unless the user explicitly asks.

Local CSP review with the normal `pnpm dev` script is currently blocked when Varlock cannot initialize KeePass `KP_PASSWORD`; use the user's working dev environment for the final browser-console CSP pass.

Full `pnpm format:check` is currently blocked by an unrelated formatting issue in `docs/references/things-3.md`; targeted checks for the Next route files pass.
