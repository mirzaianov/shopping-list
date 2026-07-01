# Next Steps

Status: project-state immediate recommendation

## Recommended Next Steps

Review the Step 1 Next.js shell changes, then continue ADR-002 Phase 1 by moving route behavior toward `/` and `/login` while Firebase remains temporarily available.

## Immediate Goal

After manual review, create the Next `/login` route and begin moving the existing Firebase-backed auth screens out of the Vite router.

## Open Questions

- Do existing Firebase users/list items need a migration path, or can Better Auth start with fresh accounts?
