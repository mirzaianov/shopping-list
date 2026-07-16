# Agent Instructions

This repository keeps project-specific support files under `docs/`.

Before planning or editing, read the relevant files:

- `docs/state/current-status.md`
- `docs/state/recent-changes.md`
- `docs/state/next-steps.md`
- `docs/product/scope.md`
- `docs/architecture/overview.md`
- `docs/decisions/` when changing durable product or architecture direction
- `docs/references/` when using prior-art or source material

Do not read local secret files such as `.env.local` unless the user explicitly asks.
Use `.env.schema` and README setup notes for environment structure.

## Git Commit Suggestions

- Follow `commitlint.config.js`: allowed types are `feat`, `fix`, `refactor`, `docs`, `chore`, and `test`.
- Use the uppercase task code from the current branch as the scope when present.
- Write an imperative English subject that starts uppercase, is at most 50 characters, and has no final period.
- After an individual implementation prompt, suggest a commit message for that prompt's change, even when the working tree contains earlier uncommitted changes.
- Describe all current changes only when the user explicitly asks for an aggregate commit; split unrelated work into focused commits.
- Do not use unsupported types such as `style`; use `feat` for an intentional user-visible UI change or `fix` for a correction.

<!-- BEGIN:nextjs-agent-rules -->

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->
