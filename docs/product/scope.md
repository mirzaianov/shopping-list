# Product Scope

## Product

Atemoya App is a browser-based personal task and project manager inspired by Things 3.

## In Scope

- Email and password authentication with required unique nicknames collected during sign-up.
- Creating, editing, ordering, completing, and deleting tasks.
- Account settings with signed-in account removal.
- Persisting task data with repository-owned backend services. The current implementation uses Neon PostgreSQL with Better Auth.
- Responsive frontend UI suitable for personal task management.
- Protected homepage behavior: `/` is the signed-in task-list screen, unauthenticated users are redirected to `/login`, and sign-up is handled at `/signup`.

## Out of Scope

- Multi-tenant team workflows.
- Native mobile apps.
- Offline-first sync.
- Public third-party API for external clients.
