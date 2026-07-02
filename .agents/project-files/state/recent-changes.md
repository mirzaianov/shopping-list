# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-02: Moved the Zustand edit-selection state out of `src/features/home` into a global `src/store` store composed from a shopping-list slice. [Reason why added: records the requested global store and slice-pattern learning direction.]
- 2026-07-02: Added signup password min/max field validation and routed Better Auth password errors to the password field. [Reason why added: keeps password policy feedback specific instead of showing a vague global signup error.]
- 2026-07-02: Renamed the component-composition diagram from Markdown to raw Mermaid `.mmd` format and updated architecture references. [Reason why added: keeps the architecture diagram in the requested Mermaid-native file format.]
- 2026-07-02: Renamed auth form files to `login-form` and `signup-form`, and moved remaining home `*-view` CSS modules into `src/features/home` with shopping-list/item names. [Reason why added: records the final cleanup of generic view/client-style file names.]
- 2026-07-02: Shortened auth feature component and file names to folder-scoped `Login`, `Signup`, and `Form` components. [Reason why added: records the naming cleanup after auth views moved into feature folders.]
- 2026-07-02: Moved the login-owned form and CSS module from `src/components` into `src/features/login`, leaving shared button UI in `src/components`. [Reason why added: keeps feature-owned auth views beside their page clients after the sign-up folder split.]
- 2026-07-02: Moved sign-up client/view code under `src/features/signup`, moved shared auth form schemas/error copy/page CSS under `src/features/auth`, reduced the auth submit gap after the two-line global error slot, and converted the component-composition doc body to a Mermaid diagram block. [Reason why added: records the feature-folder split and auth form spacing correction requested after the `/signup` route split.]
- 2026-07-02: Split sign-up from `/login` into `/signup`, added first-field autofocus on auth/home forms, reserved two-line global auth error slots, and mapped Better Auth duplicate-user signup errors to specific UI copy. [Reason why added: records the current auth route and form-error behavior after the Better Auth UI cleanup.]
- 2026-07-02: Added an architecture component-composition Mermaid diagram documenting the Next route tree, RSC/client component boundaries, server actions, auth, Drizzle, and Neon edges. [Reason why added: gives future agents a fast visual map of the current migrated architecture.]
- 2026-07-02: Split the signed-in shopping-list screen into an RSC shell/list with small client islands, added React Hook Form, Zod, and narrowly scoped Zustand edit state, and recorded ADR-003 for the server/client boundary. [Reason why added: captures the accepted RSC-first state-management direction after the migration cleanup.]
