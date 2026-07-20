# Account Menu Design

Status: implemented

## Goal

Replace the homepage's always-visible account row with a compact account menu that keeps identity and account actions available without competing with the task list.

## Structure

- Keep `src/features/home/home.tsx` server-rendered.
- Pass the authenticated user's nickname and email from `src/app/page.tsx`.
- Add a small client account-menu component using Base UI Menu.
- Render the existing atemoya fruit logo on the left, the lowercase `atemoya` heading in the center, and the account trigger on the right.
- Use one local `2rem` header-size token for the logo, heading line box, and round account trigger.
- Render the nickname's first two characters uppercased in the trigger.
- Use a native squircle corner shape on the trigger, with a visually similar 10px rounded-corner fallback.
- Attach a static green presence indicator inside the trigger's top-left edge to show that the current user is signed in.
- Render the nickname and email as non-interactive identity content above a separator.
- Render full-width Settings and Sign Out actions vertically below the separator with Lucide icons.

## Interaction

- Base UI owns focus, arrow-key navigation, Escape dismissal, outside-click dismissal, portal rendering, and collision-aware positioning.
- Settings navigates to `/settings` and closes the menu.
- Sign Out preserves the existing Better Auth sign-out flow and redirects to `/login`.
- The trigger has an accessible account-menu label and visible keyboard focus.
- The accessible trigger label also communicates the signed-in status represented by the presence indicator.

## Visual Direction

- Match the task options panel's border, radius, surface, shadow, padding, and action spacing.
- Keep both actions neutral because signing out is reversible; destructive styling remains reserved for deletion.
- Use the existing dark `--color-base-content` token and the default menu font size for the heading.
- Center the heading by its lowercase metrics while preserving descenders such as the `y`.
- Offset the presence indicator across the trigger's top-left edge, place a concentric container-colored circular halo above the trigger border, and place the glowing green circular dot above that halo.
- Keep the presence indicator static; a pulse would imply live availability state that the app does not track.
- Use a short origin-aware opacity/scale transition and disable movement for reduced-motion users.
- Constrain long identity text without allowing it to overflow the popup.

## Verification

- Check keyboard opening, arrow navigation, activation, Escape dismissal, and focus return.
- Check outside-click dismissal and viewport-edge positioning.
- Check `KI` rendering, the green presence indicator, long email wrapping, Settings navigation, and Sign Out behavior.
- Run targeted formatting, lint, and TypeScript checks; do not run the test suite unless requested.
