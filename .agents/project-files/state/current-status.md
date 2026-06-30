# Current Status

Status: project-state current repository state

## Project State

This is an existing React shopping list frontend built with Vite. The app supports email/password authentication and shopping-list management backed by Firebase services.

## Current Tooling Baseline

- Runtime/package manager: Node with pnpm.
- pnpm workspace policy: `minimumReleaseAge: 10080` delays newly published package versions by 7 days.
- Frontend: React 19, Vite 8, React Router 7, Tailwind CSS 4, daisyUI 5.
- Code quality tooling: Oxlint for linting and Oxfmt for formatting.
- Backend services: Firebase client SDK, Realtime Database, Firebase Authentication.
- Environment: Varlock resolves Firebase `VITE_*` values from KeePass-backed `.env.schema`.
- Commit policy: Husky commit-msg hook runs commitlint with conventional commit types and optional task-code scope.
- Line endings: repository-owned LF policy via `.gitattributes`.

## Current Repository State

The repository has project initialization tooling in place. `pnpm lint` passes with React hook dependency warnings in `src/pages/Homepage.jsx` and `src/pages/Welcome.jsx`.
