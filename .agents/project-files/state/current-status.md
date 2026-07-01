# Current Status

Status: project-state current repository state

## Project State

This is an existing React shopping list frontend built with Vite. The app supports email/password authentication and shopping-list management backed by Firebase services.

Project support docs include Things 3 reference material and UI reference images, ADR-001 for a possible personal task-management evolution, and ADR-002 plus an architecture migration plan for moving to Next.js, Neon PostgreSQL, Drizzle, and Better Auth. [Reason why added: future agents should distinguish current implementation from accepted product and platform directions.]

## Current Tooling Baseline

- Runtime/package manager: Node with pnpm.
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days.
- Frontend: React 19, Vite 8, React Router 7, and component-local CSS Modules.
- Language: TypeScript for Vite config, Firebase setup, and React app code, with strict checking via `tsconfig.json`.
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- Styling: Global CSS is limited to fonts, resets, and reusable CSS custom properties; component/page styles live beside their TSX files as `*.module.css`.
- Source layout: app code keeps the Vite folder structure (`src/app.tsx`, `src/pages`, `src/components`, `src/types.ts`, and root `firebase.ts`) with lowercase/kebab-case source filenames and component-local CSS Modules.
- Backend services: Firebase client SDK, Realtime Database, Firebase Authentication.
- Environment: Varlock resolves Firebase `VITE_*` values from KeePass-backed `.env.schema`.
- Accepted platform direction: staged migration to Next.js App Router, Better Auth, Neon PostgreSQL, and Drizzle; `/` becomes the authenticated homepage and unauthenticated users redirect to `/login`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has project initialization tooling in place. React app source uses TSX, PropTypes have been replaced with TypeScript props, and `pnpm format:check`, `pnpm typecheck`, and `pnpm lint` pass.

Varlock-backed development and build commands depend on local `.env.local` values and KeePassXC access. Do not inspect `.env.local` unless the user explicitly asks.
