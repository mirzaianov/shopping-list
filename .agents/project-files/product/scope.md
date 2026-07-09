# Product Scope

## Product

Shopping List App is a browser-based shopping list manager.

## In Scope

- Email and password authentication.
- Creating, editing, completing, and deleting shopping-list items.
- Account settings with signed-in account removal.
- Persisting list data with repository-owned backend services. The current implementation uses Neon PostgreSQL with Better Auth.
- Responsive frontend UI suitable for everyday list management.
- Protected homepage behavior: `/` is the signed-in shopping-list screen, unauthenticated users are redirected to `/login`, and sign-up is handled at `/signup`.

## Out of Scope

- Multi-tenant team workflows.
- Native mobile apps.
- Offline-first sync.
- Public third-party API for external clients.
