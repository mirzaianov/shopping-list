# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-01: Added root `AGENTS.md`, `.agents/settings.yaml`, and corrected stale scaffold docs for CSS Modules, `firebase.ts`, and Varlock-backed local env handling. [Reason why added: records the project-builder scaffold fixes and removes a stale Varlock blocker from canonical state.]
- 2026-07-01: Added Things 3 reference material under `.agents/project-files/references/`, recorded the Things-inspired personal task model as ADR-001, and removed the temporary `plans/` folder. [Reason why added: records the final project-files convention and keeps prior-art notes separate from architectural decisions.]
- 2026-06-30: Renamed source files to lowercase/kebab-case while preserving the original Vite folder structure (`src/pages`, `src/components`, root app entry files, and Firebase setup location). [Reason why added: records the final naming-convention change without implying a Next.js or folder-structure migration.]
- 2026-06-30: Replaced Tailwind/daisyUI utility styling with component-local CSS Modules and global CSS custom-property tokens. [Reason why added: records the current styling baseline and explains why Tailwind-related dependencies/configs are absent.]
- 2026-06-30: Migrated the Vite React app from JavaScript/JSX to TypeScript/TSX, added strict `tsconfig.json`, replaced PropTypes with typed props, and added `pnpm typecheck`. [Reason why added: records the language/tooling baseline future agents should expect.]
- 2026-06-30: Migrated code quality tooling from ESLint/Prettier to Oxlint/Oxfmt. [Reason why added: records the current lint/format stack expected by package scripts.]
- 2026-06-30: Switched package-manager metadata and docs from npm to pnpm, using `pnpm-workspace.yaml` as the project pnpm settings file. [Reason why added: records the package-manager migration baseline before lockfile generation.]
- 2026-06-30: Added canonical `.agents/project-files` documentation structure for project state, product scope, roadmap, and architecture context. [Reason why added: gives future agents a stable local context location.]
- 2026-06-30: Initialized project tooling with Varlock env scripts, Husky/commitlint commit policy, and LF line-ending ownership. [Reason why added: records the setup baseline now expected by the repo.]
