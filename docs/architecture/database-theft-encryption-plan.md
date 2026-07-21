# Database Theft Encryption Plan

## Status

Proposed; not implemented.

## Context

Atemoya stores Better Auth identity and session records plus task data
in Neon PostgreSQL. Neon encrypts physical storage, but a logical database dump
or leaked database credentials can still expose column values.

The selected threat model is a database-only compromise: an attacker obtains
the PostgreSQL contents without also obtaining the application runtime secrets.
Trusted Atemoya servers may decrypt data so the current Server Component,
Better Auth, and Resend flows can continue to work.

## Goals

- Make sensitive user values unreadable in a stolen database.
- Preserve the current Next.js, Drizzle, Better Auth, and Resend behavior.
- Keep encryption and lookup keys outside Neon.
- Detect ciphertext modification or movement between records.
- Support migration, recovery, and encryption-key rotation without data loss.
- Avoid adding a cryptography dependency when Node provides the required
  authenticated encryption and HMAC primitives.

## Non-goals

- End-to-end or zero-knowledge encryption.
- Protection after both the database and application secrets are compromised.
- Hiding relational metadata such as row counts, timestamps, ownership, or task
  order.
- Encrypting opaque record IDs, foreign keys, booleans, timestamps, or numeric
  positions needed by PostgreSQL.
- Adding managed KMS, per-user data keys, searchable encryption, or online
  lookup-key rotation in the first release.

## Approaches Considered

### Versioned application keys

Use Node's built-in cryptography, with independent encryption and lookup keys
stored in the existing Varlock/KeePass and production server-secret systems.

This is the selected approach. It directly covers the database-only threat,
preserves the existing deployment model, and introduces no dependency.

### Managed KMS with envelope encryption

Use a managed KMS key to wrap application or per-user data-encryption keys.

This provides stronger key controls and auditability, but adds an SDK, network
calls, deployment permissions, caching decisions, and operational cost. Adopt
it when compliance, multiple key administrators, or application-secret theft
enters the threat model.

### PostgreSQL `pgcrypto`

Encrypt and decrypt values inside PostgreSQL.

This is rejected because the decryption key reaches the database execution
layer, weakens separation between keys and data, and spreads encryption details
through SQL queries.

## Cryptographic Design

Use AES-256-GCM through Node's built-in `node:crypto` module:

- Each encryption uses a fresh cryptographically random 12-byte IV.
- Each value retains the full 16-byte authentication tag.
- Ciphertext is serialized as a versioned base64url envelope containing the key
  version, IV, tag, and encrypted bytes.
- Additional authenticated data binds the value to its model, field, and
  immutable record ID. Encryption happens only after the record ID exists.
- Decryption rejects unknown versions, malformed envelopes, incorrect tags,
  wrong keys, and values moved to another record or field.

Use a separate 32-byte HMAC-SHA-256 key for blind indexes. Never derive the
lookup key from or reuse the encryption key. Normalize email and nickname using
the same existing application rules before computing their blind indexes.
Unkeyed hashes and deterministic encryption are not acceptable substitutes.

The server-only cryptography boundary validates all configured keys during
application startup. Missing keys, invalid base64, incorrect key lengths, or an
unknown active version prevent startup.

## Key Management

The first release uses two independent versioned secrets:

- a data-encryption key
- a blind-index lookup key

KeePass remains the recoverable source of truth for local and production key
material. Varlock supplies local values, and production supplies server-only
secrets. Keys must never be committed, stored in Neon, exposed through
`NEXT_PUBLIC_*`, or written to logs. `BETTER_AUTH_SECRET` remains independent
and is not reused.

Ciphertext records carry their encryption-key version. Encryption-key rotation
adds a new active version, writes new data with it, re-encrypts older records,
verifies the result, and retires the old key only after backup recovery has
been tested.

Blind-index rotation is a separate maintenance operation because HMAC output is
irreversible and participates in unique lookups. The first release may briefly
disable identity writes while it decrypts identity values, recomputes all blind
indexes under the new lookup key, verifies uniqueness, and switches versions.
Online dual-index rotation should be added only if uptime requirements justify
its extra schema and race-handling complexity.

Loss of the active and retained decryption keys means permanent data loss.
Deployment secrets are not the only key backup.

## Data Classification

### Encrypt

- `tasks.title`
- `user.name`
- `user.email`
- `user.image` when present
- `session.token`
- `session.ip_address`
- `session.user_agent`
- `verification.identifier`
- `verification.value`

### Blind-index when queried by equality

- normalized user email
- normalized nickname
- session token
- verification identifier

Unique constraints move from randomized ciphertext to the corresponding blind
index. The adapter must check every active lookup-key version during a lookup or
maintenance rotation.

### Hash, do not encrypt

Better Auth credential passwords remain one-way `scrypt` hashes. They are never
decrypted or included in the general encryption format. A database thief can
still attempt offline password guessing, so encryption does not replace strong
passwords or Better Auth's memory-hard password hashing.

### Leave readable

- opaque primary IDs and foreign keys
- provider type
- credential account IDs when they duplicate opaque application user IDs
- email-verification state
- creation, update, expiry, and task change timestamps
- task position

These values expose metadata but not user-authored content. Hiding that metadata
would require a different storage model and is outside the selected threat
model.

## Application Boundaries

One server-only cryptography module owns envelope validation, encryption,
decryption, blind-index calculation, and key selection. Callers do not handle
raw keys or implement cryptographic formatting.

Task encryption stays in the existing database query boundary. Create and
update operations encrypt `title` before interpolation or Drizzle writes;
list and returning operations decrypt before producing the existing
`Task` DTO. Ordering continues to use readable IDs, positions, and
timestamps.

Better Auth identity, session, account, and verification encryption uses a
custom database adapter. The adapter transforms:

- create and update data into ciphertext and blind indexes
- equality conditions into blind-index conditions
- database output back into the logical values Better Auth expects

Database hooks alone are insufficient for email, nickname, session, and
verification fields because they do not consistently transform query
conditions. Narrow hooks remain acceptable for future token fields that are
never queried by their plaintext value.

Decrypted values stay inside server-only modules until an existing application
flow needs them. Server Components and actions receive only their current
minimal DTOs. Resend still receives the plaintext email required to deliver a
message; database encryption does not make third-party processing
zero-knowledge.

## Write And Read Flow

Sensitive writes follow this order:

1. Validate the plaintext with existing Zod or Better Auth rules.
2. Normalize equality-lookup values.
3. Compute required blind indexes.
4. Encrypt the original logical values.
5. Persist ciphertext and indexes atomically.

Sensitive reads follow this order:

1. Normalize an equality lookup and compute its blind index.
2. Query the blind-index column.
3. Authenticate and decrypt the matched values inside the server boundary.
4. Return only the logical fields required by the existing caller.

No plaintext user value is included in query logging, error context, migration
progress, analytics, or server diagnostics.

## Migration

Use an expand, backfill, verify, and contract rollout:

1. Add nullable ciphertext, blind-index, and version storage without removing
   plaintext columns.
2. Deploy cryptography helpers and mixed-row reads while continuing existing
   behavior.
3. Enable encrypted writes and the custom Better Auth adapter.
4. Backfill existing rows in bounded, restartable batches.
5. Verify that every encrypted value decrypts, every blind index matches its
   normalized plaintext, uniqueness holds, and row counts are unchanged.
6. Switch to encrypted-only reads and writes.
7. Make required encrypted fields non-null and move unique constraints to blind
   indexes.
8. Remove plaintext columns only after rollback and backup-restoration checks
   pass.

The migration records only stable IDs, state, counts, and failures. It never
logs plaintext. Each batch is idempotent and can resume after interruption.

Rollback remains possible while plaintext columns exist. After the contract
step, any rollback release must understand the encrypted schema; plaintext
shadow writes are not retained.

Existing plaintext backups remain sensitive until their retention period
expires or they are securely removed. New backup-restoration tests must require
the separately supplied application keys.

## Failure Handling

- Authentication-tag, context, or envelope failure stops the request.
- Corrupted ciphertext is never returned, silently skipped, or overwritten.
- User-facing responses remain generic.
- Operational logs may include a stable record ID, model, field, and key
  version, but never plaintext, keys, blind indexes, or full ciphertext.
- Migration failures preserve the source row and record restartable progress.
- Database writes containing ciphertext and blind indexes are atomic.

## Verification

Focused cryptography tests cover:

- round-trip encryption and decryption
- different ciphertext for repeated encryption of the same plaintext
- tamper, wrong-key, wrong-record, and wrong-field rejection
- malformed envelopes and unknown versions
- stable normalized blind indexes

Application tests cover:

- task create, list, update, reorder, and delete
- sign-up, email verification, sign-in, and sign-out
- duplicate email and nickname rejection
- nickname update and account deletion
- session creation, lookup, expiry, and revocation

Migration checks cover:

- mixed plaintext and encrypted rows
- restartable batches
- unchanged ownership, order, timestamps, and row counts
- full decryptability before plaintext removal
- encryption-key rotation
- maintenance-mode blind-index rotation
- isolated backup restoration with and without supplied keys

Finally, inspect representative database rows and captured application logs to
confirm that sensitive plaintext is absent.

## Consequences

- A stolen Neon database no longer reveals user-authored values, identity
  values, session secrets, or verification contents.
- The application server can still decrypt data, which preserves the current
  product architecture.
- Database metadata remains visible.
- A custom Better Auth adapter becomes security-critical and needs focused
  integration coverage.
- Key loss is unrecoverable, while key compromise exposes every value protected
  by that key.
- Password hashes remain subject to offline guessing; they are intentionally
  hashed rather than reversibly encrypted.
- Managed KMS and per-user keys remain a future upgrade rather than first-release
  infrastructure.

## References

- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [Node.js Crypto documentation](https://nodejs.org/api/crypto.html)
- [Neon security overview](https://neon.com/docs/security/security-overview)
- [Better Auth security](https://better-auth.com/docs/reference/security)
- [Better Auth custom database adapter guide](https://better-auth.com/docs/guides/create-a-db-adapter)
