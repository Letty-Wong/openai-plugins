# SR-07 Start Guard

Run:

```bash
npm run guard:sr07
```

Expected current result:

- `Allowed: false`
- `Gate B decision: PENDING_HUMAN_REVIEW`

SR-07 may only start after `docs/gate-b-review-decision-record.md` is updated by a human reviewer to:

```text
Decision: PASS
```

