# ADR-005: Use dnd-kit for todo reordering

## Status

Accepted

## Date

2026-07-04

## Context

The shopping-list app needs user-defined todo ordering. Reordering must work with
mouse and touch, give live visual feedback, preserve edit/delete controls, and
fit the RSC-first boundary from ADR-003.

The old ordering by `changedOn` tracked creation/edit time, not user intent.
Persisted order also needs to survive refresh and be scoped to the authenticated
user.

## Decision

Use `@dnd-kit` for sortable todo reordering, activated only from a grip handle on
each row.

Persist order in Neon/PostgreSQL with a dense integer `position` column on
`shopping_items`. The server renders the initial list order. A small client
sortable island owns drag state, optimistic local order, and calls an
authenticated server action with the ordered ids. The server action validates
auth, ownership, full-list coverage, and duplicate ids before updating
positions.

Do not update `changedOn` during reorder.

## Alternatives Considered

### Native HTML drag and drop

- Pros: Browser API, no dependency.
- Cons: Weak touch behavior for this workflow and more custom accessibility and
  sortable-list logic.
- Rejected: The app needs mouse and touch sorting without owning low-level drag
  mechanics.

### Custom Pointer Events implementation

- Pros: Full control and no drag-drop dependency.
- Cons: Would require custom gesture thresholds, collision detection, keyboard
  behavior, animation, and accessibility semantics.
- Rejected: Too much app-owned infrastructure for one sortable list.

### Sparse order positions

- Pros: Fewer rows updated for large lists.
- Cons: More ordering edge cases and renormalization logic.
- Rejected for now: Dense integer positions are simpler and sufficient for this
  app's expected list size.

## Consequences

- Todo reorder behavior is isolated to a client island; route and initial data
  rendering stay server-first.
- `@dnd-kit` is now an intentional UI dependency for drag-drop behavior.
- Reordering writes all current user-owned positions after drop.
- New todos insert at the top and shift existing user items down.
- Future multi-list drag-drop or sectioned todo ordering should revisit the
  dense-position model before extending it.
