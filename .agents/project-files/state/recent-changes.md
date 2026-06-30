# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-06-30: Migrated the Vite React app from JavaScript/JSX to TypeScript/TSX, added strict `tsconfig.json`, replaced PropTypes with typed props, and added `pnpm typecheck`. [Reason why added: records the language/tooling baseline future agents should expect.]
- 2026-06-30: Updated Tailwind CSS 4 PostCSS wiring to use `@tailwindcss/postcss`. [Reason why added: direct Vite builds require the split Tailwind 4 PostCSS package.]
- 2026-06-30: Migrated code quality tooling from ESLint/Prettier to Oxlint/Oxfmt. [Reason why added: records the current lint/format stack expected by package scripts.]
- 2026-06-30: Switched package-manager metadata and docs from npm to pnpm, using `pnpm-workspace.yaml` as the project pnpm settings file. [Reason why added: records the package-manager migration baseline before lockfile generation.]
- 2026-06-30: Added canonical `.agents/project-files` documentation structure for project state, product scope, roadmap, and architecture context. [Reason why added: gives future agents a stable local context location.]
- 2026-06-30: Initialized project tooling with Varlock env scripts, Husky/commitlint commit policy, and LF line-ending ownership. [Reason why added: records the setup baseline now expected by the repo.]
