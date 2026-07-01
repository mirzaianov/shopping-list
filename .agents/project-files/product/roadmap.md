# Roadmap

## Now

- Keep the existing React/Vite app runnable with Varlock-backed Firebase configuration while the Next.js migration is reviewed step by step.
- Review the minimal Next.js App Router shell added for ADR-002 Phase 1.

## Next

- Move route behavior to `/` for the authenticated homepage and `/login` for sign-in/sign-up.
- Add Neon/Drizzle and Better Auth in separate migration phases before removing Firebase.

## Later

- Consider offline support only if usage requires it.
- Expand toward the Things 3-inspired task model only after the platform migration is stable.
