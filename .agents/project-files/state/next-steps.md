# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Run `pnpm install` to generate `pnpm-lock.yaml`, then fix any dependency or lint fallout from the pnpm migration.

## Immediate Goal

Verify dependency peer compatibility after install, then address the known lint failures in `src/pages/Homepage.jsx`, `tailwind.config.js`, and `vite.config.js`.

## Open Questions

- Should alert/console usage in auth flows remain as temporary UX, or be replaced with in-app messaging?
