# ADR-001: Use a Things 3-Inspired Personal Task Model

## Status

Accepted

## Date

2026-07-01

## Context

The project is a personal task and project management app. We use Things 3 as
reference material for its focused personal task-management model.

Things 3 is useful as prior art because it has a narrow product boundary:
capture tasks quickly, organize them into areas and projects, decide what
matters today, and keep future work hidden until relevant.

Reference: `../references/things-3.md`
UI reference images: `../references/things-3-images/`

## Decision

Use a Things 3-inspired personal task-management model as the product direction.

The target model centers on:

```text
Inbox -> process -> Area / Project -> schedule -> Today -> done
```

Initial scope:

```text
1. Capture to Inbox
2. Organize into Areas and Projects
3. Schedule into Today / Upcoming / Anytime / Someday
4. Add tags, notes, checklists, and deadlines
5. Search tasks
6. Persist data locally or through the existing app persistence layer
7. Add basic reminders
```

Explicit non-goals:

```text
- Collaboration
- Shared lists
- Comments
- Attachments
- AI planning
- Web dashboard
- Complex custom views
- Third-party calendar writeback
```

## Migration Order

```text
1. Standardize product language around tasks.
2. Add Inbox as the default capture destination.
3. Add Projects and Areas after the core task flow is stable.
4. Add scheduling views: Today, Upcoming, Anytime, Someday.
5. Add tags, checklists, deadlines, and reminders only after the core views work.
```

## Alternatives Considered

### Keep a simple task-list-only model

- Pros: smallest product, least migration work.
- Cons: does not support broader personal planning.
- Rejected because the product direction includes personal projects and planning.

### Build a team/project-management model

- Pros: supports shared ownership, comments, assignees, and project status.
- Cons: much larger scope and not aligned with Things 3's strength.
- Rejected for the first evolution.

### Add a generic productivity-suite model

- Pros: could include notes, calendar, habits, files, and dashboards.
- Cons: unfocused and expensive to build well.
- Rejected as scope creep.

## Consequences

- Product scope stays personal-first.
- Collaboration and shared workflows remain out of scope until the personal task
  model is solid.
- Future data-model work should account for tasks, projects, areas, scheduling,
  tags, checklists, and deadlines.
- Future UI work for this product direction should consult the Things 3 image
  reference set for layout and hierarchy cues.
- The Things 3 reference remains source material, not a feature checklist or UI
  clone target.
