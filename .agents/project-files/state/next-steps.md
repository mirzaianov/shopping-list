# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Fix the Varlock `.env.schema` initialization error for `KP_PASSWORD` so `pnpm build` can run through the package script.

After the release-age window passes, update `varlock` and `@varlock/keepass-plugin` to the latest versions allowed by `minimumReleaseAge`.

## Immediate Goal

Resolve the `Referenced item "KP_PASSWORD" is not valid` error from `varlock run -- vite build`, then rerun `pnpm build`.

## Open Questions

- Should alert/console usage in auth flows remain as temporary UX, or be replaced with in-app messaging?
