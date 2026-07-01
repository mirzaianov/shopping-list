# Product Scope

## Product

Shopping List App is a browser-based shopping list manager.

## In Scope

- Email and password authentication.
- Creating, editing, completing, and deleting shopping-list items.
- Persisting list data with repository-owned backend services. The current implementation uses Firebase; the accepted target is Neon PostgreSQL with Better Auth.
- Responsive frontend UI suitable for everyday list management.
- Protected homepage behavior: `/` is the signed-in shopping-list screen, and unauthenticated users are redirected to login/sign-up.

## Out of Scope

- Multi-tenant team workflows.
- Native mobile apps.
- Offline-first sync.
- Public third-party API for external clients.
