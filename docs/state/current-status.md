# Current Status

Status: project-state current repository state

## Project State

This is a Next.js shopping-list app. The app supports email/password authentication with Better Auth and shopping-list management backed by Neon PostgreSQL through Drizzle.

Project support docs include Things 3 reference material and UI reference images, ADR-001 for a possible personal task-management evolution, ADR-002 plus an architecture migration plan for moving to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, ADR-003 for the RSC-first boundary, ADR-004 for separate auth routes, ADR-005 for dnd-kit todo reordering, ADR-006 for Base UI as the default UI component system, ADR-007 for local UI state and TanStack Query mutation ownership, ADR-008 for local Oxlint declaration padding, proposed ADR-009 plus an architecture plan for database-theft encryption, accepted ADR-010 plus an implementation plan for optional TOTP and backup-code authentication, and an architecture component-composition diagram. [Reason why added: future agents should distinguish current implementation from accepted and proposed product, security, and platform directions.]

## Current Tooling Baseline

- Runtime/package manager: Node 24+ with pnpm.
- Project support files: canonical project context lives under root `docs/`, while `.agents/` holds local operational policy and optional repo-local skills. [Reason why added: records repository adoption of global project-support structure.]
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days, and targeted overrides keep vulnerable transitive `esbuild` and `postcss` resolutions on patched versions.
- Frontend: Next.js 16 App Router, React 19, and component-local CSS Modules.
- Language: TypeScript for Next.js, database, auth, and React app code, with strict checking via `tsconfig.json`.
- RSC boundary: route shells and shopping-list rendering prefer Server Components; client islands are reserved for forms, the Base UI account and todo action menus, edit dialogs, and sortable drag-reorder behavior.
- Form/state libraries: React Hook Form handles form-local client state, Zod handles runtime validation, Base UI Field supplies accessible label, control, and error relationships in authentication forms, edit dialogs, the Add Item form, and delete-account confirmation, TanStack Query owns client mutation and pending state, and local React state owns transient shopping-list edit selection. Server Component reads continue to refresh through Next.js rather than being duplicated in the client query cache.
- UI component system: Base UI is the default headless component layer for interactive controls, including shared buttons, menus, dialogs, fields, icon-control tooltips, and toast notifications, while CSS Modules continue to own visual styling. [Reason why added: records the accepted UI-system baseline and current primitive coverage.]
- Modal styling: two Base UI Dialog edit flows and two Alert Dialog delete confirmations share `ModalLayout` for the backdrop, viewport, card, title, top-right Close control, and motion. Delete dialogs compose `DeleteModalLayout`, edit dialogs compose `EditModalLayout`, and both use shared form, label, error, and action-grid styles. [Reason why added: records the semantic modal split and nested composition contract while preventing visual drift.]
- Code quality tooling: Oxlint for linting, including a repository-local
  JavaScript rule that requires blank lines after variable-declaration groups,
  and Oxfmt for formatting. [Reason why added: records the declaration-padding
  convention and its local Oxlint implementation.]
- Styling: Global CSS is limited to fonts, resets, and reusable CSS custom properties; component/page styles live beside their TSX files as `*.module.css`.
- Button styling: shared text buttons use one structural raised-button behavior selected by their top face, independent `primary`, `destructive`, and `neutral` color variants, and separate standard/compact/full-width layout classes. Disabled variants use semantic text and edge tokens rather than parent opacity. Icon-only controls retain their simple press interaction. [Reason why added: records the consolidated button styling contract after removing duplicated behavior selectors.]
- Source layout: Next routes live in root `app`; shared components live in `src/components`; auth clients live in `src/lib`; auth form contracts live in `src/features/auth`; feature UI lives in `src/features/login`, `src/features/signup`, `src/features/check-email`, `src/features/home`, and `src/features/settings`; database code lives in `src/db`.
- Backend services: Better Auth plus Neon/Drizzle own auth and shopping-list data, while Resend delivers Better Auth verification emails through its REST API.
- Account settings: `/settings` is protected, displays locked nickname, email, and masked password fields, permits a server-validated nickname change after explicit confirmation, and lets a signed-in user delete their account after typing their email. Better Auth deletes the user and Drizzle cascades owned sessions, accounts, and shopping items. [Reason why added: records the profile-settings and account-removal behavior.]
- Auth policy: Better Auth explicitly uses the shared app password bounds of 8-128 characters, requires a unique 3-32 character lowercase nickname during sign-up, requires one-hour email-link verification before sign-in, and uses production-only rate limiting with a 10-second window and 100-request cap. Existing accounts are grandfathered by migration `0003_grandfather_existing_emails`; new sign-ups receive no session until verified. [Reason why added: records the completed auth-hardening baseline and rollout behavior.]
- Environment: Varlock resolves server-only `DATABASE_URL`, `BETTER_AUTH_SECRET`, local `BETTER_AUTH_URL`, `RESEND_API_KEY`, and `AUTH_EMAIL_FROM` for local development, local production builds, local start, and Drizzle scripts. KeePass plugin v2 keeps `KP_PASSWORD` internal so it can unlock the database without entering application processes. On Vercel, Better Auth derives allowed production/preview hosts and its fallback URL from Vercel System Environment Variables, with Preview preferring `VERCEL_URL` and also trusting `VERCEL_BRANCH_URL`. The Better Auth browser client uses the current browser origin as its absolute same-origin auth base URL. The default `pnpm build` runs plain `next build` so Vercel can use project environment variables directly; `pnpm build:local` keeps the Varlock-backed local build path. `pnpm dev` binds to localhost while `pnpm dev:lan` explicitly exposes the dev server on the local network. [Reason why added: records the v2 secret-zero isolation behavior.]
- Security headers: `next.config.ts` applies low-risk global headers for MIME sniffing, referrer policy, camera/microphone/geolocation permissions, legacy frame blocking, and a global Content-Security-Policy-Report-Only policy. Production review found a remaining `unsafe-eval` report from a generated Next.js chunk, so CSP intentionally remains report-only instead of being loosened or enforced. The development CSP allows local WebSocket HMR, the preview CSP allows Vercel Toolbar script/connect/image/style/font/frame sources, and the report-only policy omits `upgrade-insecure-requests`. [Reason why added: records the accepted CSP posture so future work does not repeat the completed review.]
- Accepted platform direction: staged migration to Next.js App Router, Better Auth, Neon PostgreSQL, and Drizzle; `/` is the authenticated homepage, unauthenticated users redirect to `/login`, and registration lives at `/signup`.
- Commit policy: Husky commit-msg runs commitlint with `feat`, `fix`, `refactor`, `docs`, `chore`, and `test`; commit suggestions use the current branch task code when present and describe the latest prompt unless an aggregate commit is explicitly requested.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has completed and manually accepted the planned Vite/Firebase migration to Next.js, Better Auth, Neon, and Drizzle. React app source uses TSX and PropTypes have been replaced with TypeScript props. The signed-in shopping-list view has been split into an RSC shell/list with small client islands for form handling, Base UI account and todo action menus, modal editing, and grip-handle todo reordering. The account menu shows nickname/email, Settings and Sign Out actions, and a static signed-in presence indicator. Sign-up stores the user's nickname in Better Auth `user.name`, sends the user to `/check-email`, and requires email verification before email/password sign-in. [Reason why added: records the homepage account-control boundary and current identity flow.]

Manual acceptance passed on 2026-07-04: sign up, sign in, sign out, auth redirects, create/edit/delete, moved data visibility, and Neon row checks all passed in the user's environment.

Firebase-era user/list data was moved manually; no automated Firebase import exists for this migration.

Varlock-backed Next development/local build commands depend on local `.env.local` values and KeePassXC access. Do not inspect `.env.local` unless the user explicitly asks.

Full `pnpm format:check` is currently blocked by unrelated formatting issues in `docs/references/things-3.md` and `drizzle/meta/0000_snapshot.json`; targeted checks for the current documentation changes pass.
