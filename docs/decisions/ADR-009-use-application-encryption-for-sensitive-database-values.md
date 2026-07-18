# ADR-009: Use application encryption for sensitive database values

## Status

Proposed

## Date

2026-07-17

## Context

Neon encrypts physical storage, but a logical database dump or leaked database
credentials can still expose Better Auth records and user-authored shopping
items. The selected threat model is a database-only compromise where the
attacker does not also obtain application runtime secrets.

## Decision

Use versioned application-level encryption for sensitive values:

- AES-256-GCM from `node:crypto`, with a fresh IV and authenticated context
  binding each value to its model, field, and record
- an independent HMAC-SHA-256 key for normalized equality-search blind indexes
- keys stored outside Neon in the existing local and production secret systems
- database-boundary encryption for shopping items and a custom Better Auth
  adapter for identity, session, account, and verification data
- Better Auth `scrypt` hashes retained for passwords
- an expand, backfill, verify, and contract migration

The detailed field classification and rollout are in
`docs/architecture/database-theft-encryption-plan.md`.

## Alternatives Considered

### Managed KMS with envelope encryption

- Pros: Stronger key controls and auditing.
- Cons: Adds infrastructure, permissions, network calls, and operational cost.
- Rejected for the first release: Reconsider when compliance or application
  secret compromise enters the threat model.

### PostgreSQL `pgcrypto`

- Pros: Encryption is close to stored data.
- Cons: Decryption keys reach the database execution layer.
- Rejected: It weakens separation between keys and data.

### Storage encryption only

- Pros: No application complexity.
- Cons: Does not protect logical dumps or leaked database credentials.
- Rejected: It does not cover the selected threat model.

## Consequences

- Database-only theft does not reveal protected plaintext.
- A custom Better Auth adapter becomes security-critical.
- Relational metadata remains visible, and server compromise remains out of
  scope.
- Losing every retained encryption key causes permanent data loss.
- No implementation is authorized until this proposed ADR is accepted.
