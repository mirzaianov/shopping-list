# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Fix the two React hook dependency warnings reported by Oxlint.

After the release-age window passes, update `varlock` and `@varlock/keepass-plugin` to the latest versions allowed by `minimumReleaseAge`.

## Immediate Goal

Add `navigate` to the relevant `useEffect` dependency arrays in `src/pages/Homepage.jsx` and `src/pages/Welcome.jsx`, then rerun `pnpm lint`.

## Open Questions

- Should alert/console usage in auth flows remain as temporary UX, or be replaced with in-app messaging?
