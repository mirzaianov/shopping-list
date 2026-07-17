# Email Verification Plan

## Goal

Require new email/password accounts to verify email ownership before signing in, while
preserving access for accounts created before the rollout.

## Decisions

- Use Better Auth's built-in email verification tokens and endpoints.
- Send verification mail through Resend's REST API using native `fetch`.
- Keep mail credentials server-only.
- Show a dedicated `/check-email` route after sign-up.
- Redirect successful verification to `/login?verified=1`.
- Do not automatically sign users in from verification links.
- Expire verification links after one hour.
- Mark existing accounts as verified in a one-time data migration.

## Flow

```text
Sign Up
  -> Better Auth creates an unverified account
  -> Resend sends the verification link
  -> /check-email offers resend and login actions
  -> Better Auth verifies the link
  -> /login?verified=1 confirms success
  -> the user signs in
```

## Implementation

1. Add `RESEND_API_KEY` and `AUTH_EMAIL_FROM` to the environment schema.
2. Configure Better Auth with:
   - `emailVerification.sendVerificationEmail`
   - `sendOnSignUp: true`
   - `sendOnSignIn: true`
   - `autoSignInAfterVerification: false`
   - `expiresIn: 3600`
   - `emailAndPassword.requireEmailVerification: true`
3. Add a data-only migration that marks existing users as verified.
4. Remove the redundant Confirm Email field from sign-up.
5. Pass `/login?verified=1` as the sign-up verification callback.
6. Store the pending email in `sessionStorage` and navigate to `/check-email`.
7. Add an accessible resend form using Base UI Field, the shared Button, and a TanStack
   Query mutation.
8. Keep resend responses generic to avoid account enumeration.
9. Show verification success and invalid/expired-link messages on the login page.

## Security And Accessibility

- Never expose the Resend API key to client code.
- Do not log verification URLs or tokens.
- Send mail after the response so provider latency does not reveal account existence.
- Retain Better Auth's production rate limit and add a short client resend cooldown.
- Use visible form labels, native email semantics, an `aria-live` status message, and
  existing focus-visible button styles.
- Keep the submitted email out of URLs and allow manual re-entry when browser state is
  unavailable.

## Verification

- New sign-up returns no session and opens `/check-email`.
- Unverified accounts cannot sign in.
- Existing accounts remain able to sign in after the migration.
- Valid links verify the email and redirect to login.
- Invalid and expired links show recovery guidance.
- Resend disables while pending and during cooldown.
- Type checking, linting, formatting checks, and a production build pass.
