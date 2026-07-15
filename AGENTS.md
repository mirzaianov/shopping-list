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

<!-- BEGIN:nextjs-agent-rules -->

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->
