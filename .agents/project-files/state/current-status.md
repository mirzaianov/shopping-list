# Current Status

Status: project-state current repository state

## Project State

This is an existing React shopping list frontend built with Vite. The app supports email/password authentication and shopping-list management backed by Firebase services.

## Current Tooling Baseline

- Runtime/package manager: Node with pnpm.
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days.
- Frontend: React 19, Vite 8, React Router 7, Tailwind CSS 4, daisyUI 5.
- Language: TypeScript for Vite config, Firebase setup, and React app code, with strict checking via `tsconfig.json`.
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- CSS pipeline: Tailwind CSS 4 uses `@tailwindcss/postcss` through PostCSS.
- Backend services: Firebase client SDK, Realtime Database, Firebase Authentication.
- Environment: Varlock resolves Firebase `VITE_*` values from KeePass-backed `.env.schema`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has project initialization tooling in place. React app source has been migrated from JSX to TSX, PropTypes were replaced with TypeScript props, and `pnpm format:check`, `pnpm typecheck`, and `pnpm lint` pass.

Direct Vite production build passes, but the package `pnpm build` script is currently blocked before Vite starts by Varlock initialization reporting `.env.schema` item `KP_PASSWORD` as invalid.
