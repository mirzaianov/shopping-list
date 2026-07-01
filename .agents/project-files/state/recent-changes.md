# Recent Changes

Status: project-state recent implementation and documentation history

Keep only the 10 most recent entries.

## Recent Changes

- 2026-07-01: Wrapped the Next App Router layout in the existing page shell styles and corrected CSS Module typography/token drift, including the legacy DaisyUI 4 light theme, control sizing/radius/shadow tokens, login secondary heading size, custom subheading font family, inherited icon colors, button hover colors, and input placeholder colors. [Reason why added: records the UI parity pass before continuing to the database phase.]
- 2026-07-01: Wrapped `next:dev`, `next:build`, and `next:start` with `varlock run --` so temporary Firebase `NEXT_PUBLIC_*` aliases are available to Next during the staged migration. [Reason why added: fixes the Next dev/runtime mismatch where Vite received Varlock env but Next did not.]
- 2026-07-01: Moved the Firebase-backed shopping-list screen into the Next `/` route and the Firebase-backed sign-in/sign-up screen into `/login`, with temporary `NEXT_PUBLIC_FIREBASE_*` env aliases and deferred Firebase initialization for Next prerendering. [Reason why added: records ADR-002 Phase 1 route behavior before replacing Firebase with Better Auth.]
- 2026-07-01: Added a reviewable Next.js 16 App Router shell alongside the existing Vite app, added `next:*` scripts, moved Vite route screens to `src/legacy-pages`, and configured Oxfmt to ignore generated `next-env.d.ts`. [Reason why added: records ADR-002 Phase 1 progress while preserving the current Vite app for manual review.]
- 2026-07-01: Marked the Things 3 desktop/tablet/mobile images as the reference UI set for future Things-inspired app modifications. [Reason why added: future UI work should consult the saved images for layout and hierarchy while avoiding direct copying.]
- 2026-07-01: Added ADR-002 and a detailed architecture plan for migrating from Vite/Firebase to Next.js, Neon PostgreSQL, Drizzle, and Better Auth, with `/` as the protected homepage and `/login` for sign-in/sign-up. [Reason why added: records the accepted platform direction and routing behavior before implementation.]
- 2026-07-01: Added root `AGENTS.md`, `.agents/settings.yaml`, and corrected stale scaffold docs for CSS Modules, `firebase.ts`, and Varlock-backed local env handling. [Reason why added: records the project-builder scaffold fixes and removes a stale Varlock blocker from canonical state.]
- 2026-07-01: Added Things 3 reference material under `.agents/project-files/references/`, recorded the Things-inspired personal task model as ADR-001, and removed the temporary `plans/` folder. [Reason why added: records the final project-files convention and keeps prior-art notes separate from architectural decisions.]
- 2026-06-30: Renamed source files to lowercase/kebab-case while preserving the original Vite folder structure (`src/pages`, `src/components`, root app entry files, and Firebase setup location). [Reason why added: records the final naming-convention change without implying a Next.js or folder-structure migration.]
- 2026-06-30: Replaced Tailwind/daisyUI utility styling with component-local CSS Modules and global CSS custom-property tokens. [Reason why added: records the current styling baseline and explains why Tailwind-related dependencies/configs are absent.]
