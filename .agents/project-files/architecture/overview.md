# Architecture Overview

## Application Shape

The project is a client-side React app built by Vite. UI code lives under `src/`, while Firebase initialization is kept in the root `firebase.js` module.

## Key Dependencies

- React renders the application and component state.
- React Router handles page navigation.
- Firebase provides authentication and realtime data services.
- Tailwind CSS and daisyUI provide styling primitives.
- Varlock loads local Firebase environment values before development and build commands.

## Constraints

- Do not commit real Firebase credentials or local KeePass paths.
- Keep local env values in ignored `.env.local` files.
- Preserve npm as the current package manager unless a migration is explicitly requested.
- Keep app changes small until lint is reliable.
