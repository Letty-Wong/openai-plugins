# Implementation Log

## 2026-06-23 | WP-47 Gate 2 Human Evidence Checklist

### Goal

Generate a reviewer-facing Markdown checklist for the remaining human Gate 2
evidence: screenshots, no-cut recordings, and the final decision record.

### Files Added Or Updated

- `docs/gate2-human-evidence-checklist-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `review/gate2/human-evidence-checklist.md`
- `scripts/gate2-evidence-status.ts`
- `scripts/gate2-human-evidence-checklist.ts`
- `scripts/gate2-review-manifest.ts`
- `tests/wp47-gate2-human-evidence-checklist.test.ts`

### Decisions

- The command is `npm run review:gate2:checklist`.
- It writes `review/gate2/human-evidence-checklist.md`.
- It reuses the Gate 2 manifest screenshot URLs and no-cut recording scripts.
- It marks current command logs as complete and human screenshots/recordings as
  incomplete based on the evidence status rows.
- It does not capture screenshots, record videos, approve Gate 2, start WP-38,
  or open material gates.

### Validation Commands

Completed in this run:

```sh
npm run review:gate2:checklist # passed
npm run review:gate2:evidence # passed, current status INCOMPLETE_HUMAN_EVIDENCE
npm run lint # passed
npm run typecheck # passed
npm run test # passed, 144 tests
npm run build # passed
```

### Remaining Risks

- Human screenshots, no-cut recordings, and decision entry are still required.

## 2026-06-23 | WP-46 Gate 2 Evidence Status

### Goal

Add a read-only evidence status command that reports which Gate 2 review
evidence files are present and which human-captured files are still missing.

### Files Added Or Updated

- `docs/gate2-evidence-scaffold-command.md`
- `docs/gate2-evidence-status-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `review/gate2/README.md`
- `scripts/gate2-evidence-scaffold.ts`
- `scripts/gate2-evidence-status.ts`
- `scripts/gate2-review-kit.ts`
- `tests/wp46-gate2-evidence-status.test.ts`

### Decisions

- The command is `npm run review:gate2:evidence`.
- It checks every file listed by the Gate 2 review kit.
- It reports `INCOMPLETE_HUMAN_EVIDENCE`, `READY_FOR_DECISION`, or
  `REVIEW_DECIDED`.
- Current expected status is `INCOMPLETE_HUMAN_EVIDENCE`: command logs are
  present, while screenshots, recordings, and the final human decision are not.
- It does not approve Gate 2, start WP-38, or open material gates.

### Validation Commands

Completed in this run:

```sh
npm run review:gate2:scaffold # passed
npm run review:gate2:kit # passed
npm run review:gate2:logs # passed
npm run review:gate2:evidence # passed, current status INCOMPLETE_HUMAN_EVIDENCE
npm run lint # passed
npm run typecheck # passed
npm run test # passed, 139 tests
npm run build # passed
```

### Remaining Risks

- Human screenshots, no-cut recordings, and decision entry are still required.

## 2026-06-23 | WP-45 Gate 2 Command Log Capture

### Goal

Capture the current local Gate 2 command outputs into stable text evidence
files before human screenshot and recording review.

### Files Added Or Updated

- `docs/gate2-command-log-capture-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `review/gate2/README.md`
- `review/gate2/command-logs/README.md`
- `review/gate2/command-logs/audit-materials.txt`
- `review/gate2/command-logs/preflight-gate2.txt`
- `review/gate2/command-logs/review-gate2.txt`
- `review/gate2/command-logs/status-gates.txt`
- `scripts/gate2-command-log-capture.ts`
- `scripts/gate2-evidence-scaffold.ts`
- `scripts/gate2-review-kit.ts`
- `tests/wp45-gate2-command-log-capture.test.ts`

### Decisions

- The command is `npm run review:gate2:logs`.
- It writes four text files: preflight, review manifest, material audit, and
  gate status.
- It refreshes command-log evidence from current local state.
- It does not capture screenshots, record videos, approve Gate 2, start WP-38,
  or open material gates.

### Validation Commands

Completed in this run:

```sh
npm run review:gate2:scaffold # passed
npm run review:gate2:kit # passed
npm run review:gate2:logs # passed
npm run lint # passed
npm run typecheck # passed
npm run test # passed, 134 tests
npm run build # passed
```

### Remaining Risks

- Human screenshots, no-cut recordings, and decision entry are still required.

## 2026-06-23 | WP-44 Gate 2 Evidence Scaffold

### Goal

Create a repeatable Gate 2 evidence workspace scaffold so human reviewers have
stable local folders for command logs, screenshots, and no-cut recordings.

### Files Added Or Updated

- `docs/gate2-evidence-scaffold-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `review/gate2/README.md`
- `review/gate2/command-logs/README.md`
- `review/gate2/recordings/README.md`
- `review/gate2/screenshots/1366/README.md`
- `review/gate2/screenshots/1920/README.md`
- `scripts/gate2-evidence-scaffold.ts`
- `scripts/gate2-review-kit.ts`
- `tests/wp44-gate2-evidence-scaffold.test.ts`

### Decisions

- The command is `npm run review:gate2:scaffold`.
- It only creates reviewer-facing folders and README files.
- It is repeatable and does not overwrite existing evidence files.
- It does not create fake screenshots or videos.
- It does not approve Gate 2, start WP-38, or open material gates.

### Validation Commands

Completed in this run:

```sh
npm run review:gate2:scaffold # passed
npm run review:gate2:kit # passed
npm run preflight:gate2 # passed
npm run audit:materials # passed
npm run status:gates # passed
npm run lint # passed
npm run typecheck # passed
npm run test # passed, 130 tests
npm run build # passed
```

### Remaining Risks

- Actual command logs, screenshots, no-cut recordings, and human decision entry
  are still required.

## 2026-06-23 | WP-43 Gate 2 Review Kit

### Goal

Add a single Gate 2 review kit command that combines the preflight, review
manifest, command list, and evidence file index into one reviewer-facing output.

### Files Added Or Updated

- `docs/gate2-review-kit-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `scripts/gate2-review-kit.ts`
- `tests/wp43-gate2-review-kit.test.ts`

### Decisions

- The command is `npm run review:gate2:kit`.
- It prints the command sequence, suggested evidence filenames, current
  preflight, and the Chinese review manifest.
- It does not capture evidence, approve Gate 2, start WP-38, or open material
  gates.

### Validation Commands

Completed in this run:

```sh
npm run review:gate2:kit # passed
npm run preflight:gate2 # passed
npm run audit:materials # passed
npm run status:gates # passed
npm run lint # passed
npm run typecheck # passed
npm run test # passed, 126 tests
npm run build # passed
```

### Remaining Risks

- Actual human screenshots, no-cut recordings, and decision entry are still
  required.

## 2026-06-23 | WP-42 Gate 2 Review Preflight

### Goal

Add a Gate 2 review preflight command that combines gate status, WP-38 blocking,
and material placeholder checks into one reviewer-facing readiness report.

### Files Added Or Updated

- `docs/gate2-review-preflight-command.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `scripts/gate2-review-preflight.ts`
- `tests/wp42-gate2-review-preflight.test.ts`

### Decisions

- The command is `npm run preflight:gate2`.
- Current expected status is `READY_FOR_HUMAN_REVIEW`.
- This means the project is ready to capture Gate 2 screenshots and no-cut
  recordings.
- It does not mean Gate 2 passed, does not authorize WP-38, and does not open
  material gates.

### Validation Commands

Completed:

```sh
npm run preflight:gate2 # passed
npm run audit:materials # passed
npm run status:gates    # passed
npm run lint            # passed
npm run typecheck       # passed
npm run test            # passed, 122 tests
npm run build           # passed
```

### Remaining Risks

- Human review evidence is still missing. This preflight only confirms readiness
  to run that review.

## 2026-06-23 | WP-41 Material Placeholder Audit

### Goal

Add a read-only audit that verifies missing product, CTA, QR, and business
materials are still represented as placeholders. This supports the current goal:
continue progressing through the correction plan while uploaded materials remain
absent and blocked.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/material-placeholder-audit-command.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `scripts/material-placeholder-audit.ts`
- `tests/wp41-material-placeholder-audit.test.ts`

### Decisions

- The command is `npm run audit:materials`.
- Current expected result is `PASS`, meaning the placeholder state is intact.
- `PASS` does not approve real materials. It only confirms that missing
  materials are not being faked or silently replaced.
- The audit checks product placeholder identity, product fact/claim status, CTA
  status, material-dependent motion gates, and local product/CTA/QR media files.

### Validation Commands

Completed:

```sh
npm run audit:materials # passed
npm run status:gates    # passed
npm run lint            # passed
npm run typecheck       # passed
npm run test            # passed, 118 tests
npm run build           # passed
```

### Remaining Risks

- Future uploaded assets still need separate source, authorization, and content
  status review before they can replace placeholders.

## 2026-06-23 | WP-40 WP-38 Start Guard

### Goal

Add an explicit WP-38 start guard so future work cannot accidentally treat the
candidate specs as implementation approval while Gate 2 is still pending human
review.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `docs/wp38-start-guard.md`
- `package.json`
- `scripts/guard-wp38-start.ts`
- `scripts/project-gate-status.ts`
- `tests/wp40-wp38-start-guard.test.ts`

### Decisions

- The command is `npm run guard:wp38`.
- The command is expected to exit non-zero while Gate 2 is
  `PENDING_HUMAN_REVIEW`, `SMALL_FIX`, `FAIL`, or `UNKNOWN`.
- The command only allows WP-38 when Gate 2 decision is exactly `PASS`.
- The command is not part of the normal passing validation suite because the
  current correct project state is blocked.
- Material gates remain closed even if WP-38 is later allowed.

### Validation Commands

Completed:

```sh
npm run status:gates # passed
npm run lint         # passed
npm run typecheck    # passed
npm run test         # passed, 114 tests
npm run build        # passed
```

### Remaining Risks

- This guard prevents accidental startup, but it does not replace human Gate 2
  review.

## 2026-06-23 | WP-39 Gate Status Command

### Goal

Add a read-only command that summarizes the current Gate 2, WP-38, and material
gate status. This makes it harder for future work to accidentally treat
candidate specs as implementation approval or replace placeholders before the
matching gate passes.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-gate-status-command.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `scripts/project-gate-status.ts`
- `tests/wp39-gate-status-command.test.ts`

### Decisions

- The command is `npm run status:gates`.
- The command reads `docs/gate2-review-decision-record.md`,
  `docs/wp38-candidate-graybox-specs.md`, and `docs/missing-materials.md`.
- Current expected status is Gate 2 `PENDING_HUMAN_REVIEW`, WP-38 blocked, and
  material gates closed.
- The command is intentionally read-only. It does not change gate status,
  launch WP-38, or approve assets.

### Validation Commands

Completed:

```sh
npm run status:gates # passed
npm run lint         # passed
npm run typecheck    # passed
npm run test         # passed, 110 tests
npm run build        # passed
```

### Remaining Risks

- This is a guardrail and status summary only. Human Gate 2 review is still
  required before implementation can advance.

## 2026-06-23 | WP-38 Candidate Graybox Specs

### Goal

Prepare the two allowed post-Gate-2 graybox work package specifications without
starting either implementation path. This keeps forward progress aligned with
the ChatGPT correction plan while preserving the Gate 2 human-review boundary.

### Files Added Or Updated

- `docs/gate2-review-decision-record.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `docs/wp38-candidate-graybox-specs.md`
- `tests/wp38-candidate-graybox-specs.test.ts`

### Decisions

- WP-38 is not started while Gate 2 remains `PENDING_HUMAN_REVIEW`.
- If Gate 2 later passes, exactly one candidate can be chosen:
  `WP-38R-A Scene 01-08 纵向连续灰盒` or
  `WP-38R-B 横向产品段完整灰盒`.
- Both candidates stay graybox-only. Product assets, QR codes, business facts,
  final typography, texture polish, full 21-Scene production, and old
  page-chain architecture remain blocked.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 106 tests
npm run build      # passed
```

### Remaining Risks

- Human Gate 2 review is still the gating event. These specs help the next
  approved step start cleanly, but they do not authorize implementation.

## 2026-06-23 | WP-37R-B Gate 2 Decision Record

### Goal

Add a decision record template for the human Gate 2 review. The project now has
a place to record whether Gate 2 is `PASS`, `SMALL_FIX`, or `FAIL`, while
keeping the default status as `PENDING_HUMAN_REVIEW`.

### Files Added Or Updated

- `docs/gate2-evidence-ledger.md`
- `docs/gate2-review-decision-record.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `tests/wp37rb-gate2-decision-record.test.ts`

### Decisions

- The decision record starts as `PENDING_HUMAN_REVIEW`; it must not be treated
  as accepted until evidence and human judgment are filled in.
- If Gate 2 passes, the next work must choose exactly one limited graybox path:
  `WP-38R-A Scene 01-08 纵向连续灰盒` or
  `WP-38R-B 横向产品段完整灰盒`.
- If Gate 2 needs small fixes, only the three Gate 2 transition cues may be
  tuned.
- If Gate 2 fails, the next work returns to actors, camera pose, spatial route,
  and graybox structure.
- Material gates remain closed regardless of the Gate 2 decision.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 102 tests
npm run build      # passed
```

### Remaining Risks

- The actual review outcome is still missing. This template improves decision
  hygiene; it does not make the decision.

## 2026-06-23 | WP-37R Gate 2 Evidence Ledger

### Goal

Create a Gate 2 evidence ledger that maps the correction gate requirements in
`AGENTS.md` to concrete human-review evidence. This keeps the project from
advancing into final visuals, true product assets, QR codes, or business facts
before the user accepts the graybox direction.

### Files Added Or Updated

- `docs/gate2-evidence-ledger.md`
- `docs/gate2-human-review-package.md`
- `docs/gate2-review-automation.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `tests/wp37r-gate2-evidence-ledger.test.ts`

### Decisions

- Gate 2 is explicitly still not accepted until human screenshots and no-cut
  recordings are reviewed.
- The ledger maps every `AGENTS.md` Gate 2 evidence requirement to a current
  source and an expected human action.
- Passing Gate 2 remains separate from passing material gates.
- The next work package is conditional: if Gate 2 passes, move to a limited
  graybox expansion; if it does not pass, repair only Gate 2.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 99 tests
npm run build      # passed
```

### Remaining Risks

- Human visual judgment is still required. This ledger organizes evidence; it
  does not make the acceptance decision.

## 2026-06-23 | WP-36R Gate 2 Review Manifest Helper

### Goal

Add a lightweight Chinese review helper for Gate 2 so the user can generate the
current transition contract, screenshot URLs, recording scripts, and material
gate reminders without reading code. This does not change production visual
logic and does not replace human review.

### Files Added Or Updated

- `docs/gate2-human-review-package.md`
- `docs/gate2-review-automation.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `package.json`
- `scripts/gate2-review-manifest.ts`
- `tests/wp36r-gate2-review-manifest.test.ts`

### Decisions

- The helper command is `npm run review:gate2`.
- The generated transition table reads from `spatialTransitionCues`, keeping
  the checklist aligned with the code contract.
- The helper only prints Markdown to stdout. It does not open the browser,
  capture screenshots, record video, or make an acceptance decision.
- Material gates remain explicit: product placeholder, CTA placeholder, no fake
  QR code, and no invented business facts.

### Validation Commands

Completed:

```sh
npm run review:gate2 # passed
npm run lint         # passed
npm run typecheck    # passed
npm run test         # passed, 96 tests
npm run build        # passed
```

### Remaining Risks

- Human no-cut recordings and visual judgment are still required before Gate 2
  can be accepted.

## 2026-06-23 | WP-35R Gate 2 Human Review Package

### Goal

Prepare the human review package for Gate 2 so the user can judge the three
spatial transitions without reading code or English source files. This is a
documentation and acceptance-contract pass only; it does not change production
visual logic or cross any material gate.

### Files Added Or Updated

- `docs/gate2-human-review-package.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `tests/wp35r-gate2-human-review-package.test.ts`

### Decisions

- Human review focuses on direction clarity, actor continuity, input stability,
  reduced motion, and placeholder integrity.
- The required no-cut recordings are split into four scripts:
  Scene 08 to 09, Scene 15 to 16, Scene 20 to 21, and Reduced Motion.
- The package includes a screenshot checklist for 1366x768 and 1920x1080.
- Pass/fail criteria explicitly block fake product assets, fake QR codes, and
  invented business facts.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 93 tests
npm run build      # passed
```

### Remaining Risks

- The package defines what to record and judge, but the actual no-cut recordings
  still need to be captured during human review.

## 2026-06-23 | WP-34R Gate 2 Interruptible Motion

### Goal

Make the Gate 2 graybox transitions interruptible under presenter navigation
without giving the motion runtime ownership of `WorldCamera` camera variables.
Missing product assets, CTA QR codes, and business facts remain placeholders.

### Files Added Or Updated

- `docs/gate2-interruptible-motion.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/styles/presentation.css`
- `tests/wp34r-gate2-interruptible-motion.test.ts`

### Decisions

- Gate 2 motion is driven through `.spatial-transition-graybox` CSS variables:
  `--gate2-motion-x`, `--gate2-motion-y`, `--gate2-motion-opacity`,
  `--gate2-axis-progress`, `--gate2-portal-progress`, and
  `--gate2-reveal-progress`.
- `ContinuityMotionRuntime` kills existing graybox tweens on Beat change before
  starting the next transition cue.
- `WorldCamera` remains the sole camera pose owner; the runtime does not write
  `--camera-*` variables or `.world-camera` transforms.
- Reduced motion and hold states set Gate 2 variables directly to stable target
  values.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 91 tests
npm run build      # passed
```

### Browser Checks

Completed:

- 1366x768 and 1920x1080 keyboard navigation passed through `09.1`, `16.1`,
  and `21.1`.
- `09.1`, `16.1`, and `21.1` exposed runtime transition kinds
  `turn-horizontal-product`, `portal-forward-safety`, and `dolly-back-finale`.
- After forward, backward, and rapid forward/back/forward navigation, Gate 2
  variables returned to stable values:
  `--gate2-motion-x: 0px`, `--gate2-motion-y: 0px`,
  `--gate2-motion-opacity: 1`, `--gate2-axis-progress: 1`,
  `--gate2-portal-progress: 1`, and `--gate2-reveal-progress: 1`.
- Reduced Motion was enabled through the real presenter control. At `16.1`,
  `data-reduced-motion="true"` and `data-continuity-reduced="true"` with all
  Gate 2 variables at stable target values.
- Legacy page-chain audience mounts stayed at `0`.
- Product placeholder remained present; CTA remained placeholder where visible.

### Remaining Risks

- This proves the runtime ownership pattern for the graybox cues, but it is not
  yet the full human-review Gate 2 recording package.

## 2026-06-23 | WP-33R Gate 2 Transition Graybox

### Goal

Make the three Gate 2 spatial transitions explicit and verifiable without
adding another audience-stage layer or crossing any material gate. The work
stays in graybox form: no real product images, real QR codes, final visual
polish, business facts, WebGL, or Three.js.

### Files Added Or Updated

- `docs/gate2-transition-graybox.md`
- `docs/implementation-log.md`
- `docs/project-handoff-report.md`
- `docs/project-status.md`
- `src/presentation/stage/SpatialStage.tsx`
- `src/presentation/stage/spatial-poses.ts`
- `src/styles/presentation.css`
- `tests/wp33r-gate2-spatial-transitions.test.ts`

### Decisions

- `spatialTransitionCues` is now the single data source for the three Gate 2
  transitions.
- The only Gate 2 transition Beats are still `09.1`, `16.1`, and `21.1`.
- `SpatialStage` now reads Beat-level camera poses through
  `getCameraPoseForBeat(...)`; ordinary Beats fall back to Scene-level camera
  poses.
- The three transition camera poses are:
  `camera.turn-horizontal-product`, `camera.portal-forward-safety`, and
  `camera.dolly-back-finale`.
- `SpatialTransitionGraybox` renders inside the existing `SpatialStage`, not as
  a new main-stage layer.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed after build regenerated .next/types
npm run test       # passed, 89 tests
npm run build      # passed
```

### Browser Checks

Completed:

- 1366x768 and 1920x1080 checks passed for `09.1`, `16.1`, and `21.1`.
- `09.1` reported `data-spatial-transition-kind="turn-horizontal-product"`
  and `data-camera-pose-id="camera.turn-horizontal-product"`.
- `16.1` reported `data-spatial-transition-kind="portal-forward-safety"`
  and `data-camera-pose-id="camera.portal-forward-safety"`.
- `21.1` reported `data-spatial-transition-kind="dolly-back-finale"` and
  `data-camera-pose-id="camera.dolly-back-finale"`.
- Each checked transition rendered one graybox axis, one portal, and one reveal
  marker inside `SpatialStage`.
- Legacy page-chain audience mounts stayed at `0`.
- Product placeholder remained present; CTA remained placeholder where visible.

### Remaining Risks

- This is the first explicit graybox state for the three transitions. It is not
  yet the final interruptible motion pass or Gate 2 no-cut recording.
- Human review is still required before visual polish or real asset replacement.

## 2026-06-23 | WP-32R Spatial Pose Application

### Goal

Apply the correction report at the durable agent-contract level and begin using
`SpatialPose` as real persistent-actor layout input. This remains a graybox
correction pass: no real product assets, real QR codes, final typography,
business facts, or new page-chain visual layers.

### Files Added Or Updated

- `AGENTS.md`
- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/spatial-pose-application.md`
- `docs/spatial-pose-runtime.md`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp31r-spatial-pose-runtime.test.ts`
- `tests/wp32r-spatial-pose-application.test.ts`

### Decisions

- `AGENTS.md` now explicitly says not to solve the remaining PPT feeling by
  adding more page stacks, curtains, flow fields, scroll worlds, or helper
  continuity layers.
- Gate 2 is now documented as the three key transition graybox: Scene 08 to 09,
  Scene 15 to 16, and Scene 20 to 21.
- `PersistentActorLayer` now exposes spatial function, occlusion, pose id, and
  CSS custom properties for pose x/y/z/scale/opacity.
- `.persistent-actor` consumes those pose variables through `translate3d(...)`
  and `scale(...)`.
- Actor role opacity and spatial pose opacity are separated through
  `--actor-role-opacity` and `--spatial-pose-opacity`, avoiding two CSS rules
  fighting over the same wrapper `opacity` value.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 87 tests
npm run build      # passed
```

### Browser Checks

Completed:

- 1366x768 `20.10`: hydrated, `data-current-beat-id="20.10"`,
  `data-route-phase="action"`, `data-camera-pose-id="camera.vertical-action"`,
  and `data-beat-movement-kind="actor"`.
- 1366x768 `20.10`: visible actors included `actor.integration-ring`,
  `actor.product-stage`, `actor.safety-boundary`, `actor.action-path`, and
  `actor.cta-dock`; each exposed `data-spatial-pose-id` plus computed
  `--spatial-pose-x/y/z/scale` values.
- 1366x768 `09.1`, `16.1`, and `21.1`: all reported
  `data-beat-movement-kind="spatial"` with camera poses
  `camera.horizontal-product`, `camera.z-forward-safety`, and
  `camera.z-back-finale`.
- 1920x1080 `20.10`, `09.1`, `16.1`, and `21.1`: same spatial stage and pose
  contracts passed.
- Legacy page-chain audience mounts stayed at `0` for `.scroll-narrative-layer`,
  `.scroll-continuum-shell`, `.scroll-flow-field`, and `.scroll-curtain-field`.
- Product placeholder remained present through the checked product beats; CTA
  placeholder remained present where CTA is in range.

### Remaining Risks

- This applies pose variables to actor wrappers, but the three key transition
  grayboxes are not finished yet.
- Historical page-chain CSS remains in the stylesheet as archived reference.
- `ArtifactSystem` convergence is still future work.

## 2026-06-23 | WP-31R Spatial Pose And Runtime Convergence

### Goal

Promote the WP-30R graybox rules into typed spatial data and remove legacy
page-chain selectors from the active continuity runtime. Missing product assets,
QR codes, and business facts remain placeholders.

### Files Added Or Updated

- `AGENTS.md`
- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/spatial-pose-runtime.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/presentation/stage/SpatialStage.tsx`
- `src/presentation/stage/spatial-poses.ts`
- `tests/wp10-cinematic-route.test.ts`
- `tests/wp11-scroll-narrative.test.ts`
- `tests/wp12-visual-director.test.ts`
- `tests/wp13-scroll-film-strip.test.ts`
- `tests/wp14-viewport-scroll-stack.test.ts`
- `tests/wp15-scroll-stage-dominance.test.ts`
- `tests/wp16-continuity-object.test.ts`
- `tests/wp17-director-focus.test.ts`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp19-stage-continuity.test.ts`
- `tests/wp26-scroll-flow-field.test.ts`
- `tests/wp27-scroll-curtain-field.test.ts`
- `tests/wp30r-spatial-stage.test.ts`
- `tests/wp31r-spatial-pose-runtime.test.ts`

### Decisions

- `spatial-poses.ts` is now the single code source for route phase, camera
  pose, actor spatial pose, and Beat movement kind.
- `SpatialStage` renders pose data; it no longer owns route or camera decision
  logic.
- `PersistentActorLayer` emits `data-spatial-pose-id` for visible actors.
- `ContinuityMotionRuntime` no longer targets legacy page-chain selectors such
  as `scroll-narrative-layer`, `scroll-continuum-shell`, `scroll-flow-field`,
  `scroll-curtain-field`, `story-spine`, `cinematic-route-layer`, or
  `continuity-object-layer`.
- Historical tests now distinguish archived source/CSS from active runtime
  ownership.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 85 tests
npm run build      # passed
```

### Browser Checks

- Opened `http://localhost:3000/?verify=wp31r-pose#scene-20/20.10`.
- After hydration, the page reported `data-current-beat-id="20.10"`,
  `data-route-phase="action"`, `data-camera-pose-id="camera.vertical-action"`,
  and `data-beat-movement-kind="actor"`.
- Visible actors all emitted `data-spatial-pose-id`, including
  `pose.integration-ring.action`, `pose.product-stage.action`,
  `pose.safety-boundary.action`, `pose.action-path.action`, and
  `pose.cta-dock.action`.
- Legacy page-chain audience mounts stayed at `0` for `.scroll-narrative-layer`,
  `.scroll-continuum-shell`, `.scroll-flow-field`, and `.scroll-curtain-field`.
- Product placeholder and CTA placeholder remained present.
- Checked `09.1`, `16.1`, and `21.1`: each reported
  `data-beat-movement-kind="spatial"` with camera poses
  `camera.horizontal-product`, `camera.z-forward-safety`, and
  `camera.z-back-finale`.
- Dev server output showed only normal GET requests during the check.

### Remaining Risks

- Browser verification for `data-spatial-pose-id` has passed at the checked
  beats. Wider viewport visual QA is still needed.
- Spatial pose values are exposed as data and diagnostics, but not yet applied
  to every actor's layout.
- Historical page-chain CSS remains in the stylesheet as archived reference.

## 2026-06-23 | WP-30R Spatial Stage Graybox

### Goal

Move the audience main stage away from page-chain continuity and onto a single
spatial graybox with one camera and persistent actors. Missing product assets,
QR codes, and business facts remain placeholders.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/spatial-stage-graybox.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/SpatialStage.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp09-continuity-storytelling.test.ts`
- `tests/wp10-cinematic-route.test.ts`
- `tests/wp11-scroll-narrative.test.ts`
- `tests/wp30r-spatial-stage.test.ts`

### Decisions

- `VisualStage` now mounts `SpatialStage` instead of `ScrollNarrativeLayer`.
- `ScrollNarrativeLayer` and its page-chain classes remain in source as
  legacy/reference material, but they are no longer audience main-stage
  structure.
- `SpatialStage` provides route phase, focus actor, movement kind, and camera
  pose diagnostics through data attributes.
- `WorldCamera` owns camera CSS variables as absolute pose values.
- `ContinuityMotionRuntime` only fades `SpatialStage`; it does not own camera
  transform variables.
- The three spatial movement cues are marked at `09.1`, `16.1`, and `21.1`.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 82 tests
npm run build      # passed
```

### Browser Checks

- Opened `http://localhost:3000/?verify=wp30r-spatial#scene-20/20.10`.
- After hydration, the page reported `data-current-beat-id="20.10"`,
  `data-spatial-mode="world-camera-graybox"`, and
  `data-frame-kind="action-path"`.
- `.spatial-stage` count was `1`; `.world-camera` count was `1`.
- Legacy audience mounts were all `0`: `.scroll-narrative-layer`,
  `.scroll-continuum-shell`, `.scroll-flow-field`, and
  `.scroll-curtain-field`.
- Product placeholder remained present through `shower-h1-placeholder`; CTA
  remained `data-cta-status="PLACEHOLDER"`.
- Checked `09.1`, `16.1`, and `21.1`: each reported
  `data-beat-movement-kind="spatial"` with camera poses
  `camera.horizontal-product`, `camera.z-forward-safety`, and
  `camera.z-back-finale`.
- Dev server output showed only normal GET requests during the check.

### Remaining Risks

- `CameraPose`, `SpatialPose`, and `BeatMovementKind` are still embedded in the
  graybox component instead of a typed pose registry.
- `ContinuityMotionRuntime` still contains compatibility selectors for
  page-chain layers that are no longer mounted.
- Browser visual verification has confirmed the graybox DOM contract, but human
  visual review is still needed for composition quality before styling is
  polished.

## 2026-06-23 | WP-29R Spatial Contract Reset

### Goal

Turn the correction report into durable planning contracts before changing the
main visual architecture again. This work defines the intended spatial route,
actor identities, movement kinds, camera/actor pose concepts, and property
ownership rules for the next rebuild pass.

### Files Added Or Updated

- `AGENTS.md`
- `docs/actor-identity-v3.md`
- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/spatial-motion-bible.md`
- `tests/wp29r-spatial-contract.test.ts`

### Decisions

- `docs/spatial-motion-bible.md` is now the reader-facing spatial contract for
  the corrected direction: one world coordinate system, one camera, persistent
  actors, three major spatial transitions, and no scroll-position Beat mapping.
- `docs/actor-identity-v3.md` is now the actor identity contract for WP-30R:
  stable actor ids, one entrance, hold across continuous Beats, one exit, and
  no duplicated bodies in the audience main stage.
- `IntegrationRing` remains the global continuity actor across all 21 scenes.
- `ProductStage` remains onstage from `08.7` through `21.9`; missing product
  material stays as `shower-h1-placeholder`.
- `SourcePacket`, fact/benefit cards, and output cards should converge into a
  future `ArtifactSystem` instead of becoming separate competing systems.
- `stage.scroll-world`, `scroll-continuum-shell`, neighboring Scene peeks,
  `scroll-flow-field`, and `scroll-curtain-field` are documented as temporary
  graybox/reference layers, not final continuity actors.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 80 tests
npm run build      # passed
```

### Remaining Risks

- WP-29R is a contract/documentation pass only. The old page-chain visual layers
  are still in the main stage until WP-30R.
- `CameraPose`, `SpatialPose`, and `BeatKind` are documented concepts but not
  yet TypeScript production types.
- Property ownership is documented as a table, but current runtime ownership has
  not yet been fully refactored.

## 2026-06-23 | WP-28R Spatial Continuity Correction

### Goal

Apply the external correction report at the project-contract level and stop the
main presentation state from being driven by browser scroll position. This is
the first reset step toward a single spatial stage instead of page-chain
continuity.

### Files Added Or Updated

- `AGENTS.md`
- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/spatial-reset-audit.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/motion/StageMotionRuntime.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp28-spatial-correction.test.ts`

### Decisions

- Presenter Mode is reaffirmed as the primary mode.
- Wheel and trackpad input may remain, but only as thresholded discrete cues
  for previous/next Beat.
- `window.scrollY -> rawIndex -> beatIndex -> jumpToBeat` is removed.
- The hidden 144-section native scroll driver is removed.
- Existing visual progress variables are temporarily retained for compatibility,
  but they are now derived from current Beat order, not scroll position.
- GSAP null target warnings are disabled in the two existing runtimes while
  legacy layers are being removed; empty selectors are expected during the
  transition and should not create browser-console noise.
- WP-22/WP-23/WP-26/WP-27 page-chain layers are frozen as legacy/reference
  direction. They should not be strengthened as the final architecture.
- The next architecture target is `SpatialStage` / `WorldCamera` with absolute
  camera and actor poses.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 78 tests
npm run build      # passed
```

### Browser Checks

- Opened `http://localhost:3000/?verify=wp28-clean#scene-20/20.10`.
- Initial state reported `data-current-beat-id="20.10"` and
  `data-navigation-mode="presenter-cue-and-wheel"`.
- `.native-scroll-driver` / `.native-scroll-beat` count was `0`.
- Wheel input advanced discretely to `21.1`.
- `window.scrollY` stayed `0`, confirming Beat state is no longer derived from
  page scroll position.
- A clean dev-server run produced no new runtime error output during the check.

### Remaining Risks

- Page-chain visual layers are still mounted; this pass only removes scroll
  position authority and updates the contract.
- Runtime property ownership is not yet audited.
- `native-scroll-*` CSS variable names are still present as compatibility
  names even though they are no longer scroll-position driven.

## 2026-06-22 | WP-27 Full-Screen Scroll Curtain

### Goal

Make the presentation feel less like a centered card stack and more like
full-screen pages passing through a fixed camera. This continues the
reference-site direction while preserving stable actors and placeholder gates.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp19-stage-continuity.test.ts`
- `tests/wp26-scroll-flow-field.test.ts`
- `tests/wp27-scroll-curtain-field.test.ts`

### Decisions

- Add `scroll-curtain-field` as the strongest continuous-scroll visual layer.
- Render previous, current, and next Scene as full-screen `100dvh` curtain
  panels, driven by `--free-scroll-offset` and `--free-scroll-progress`.
- Reduce `scroll-continuum-shell` and active continuum panel opacity so they act
  as secondary readouts instead of the main card.
- Add the curtain layer to `ContinuityMotionRuntime` so keyboard, controls, and
  native scroll share the same GSAP cleanup and transition behavior.
- Keep the pass strictly code-generated: no real product assets, QR codes,
  unapproved business facts, new dependencies, Three.js, WebGL, or Framer
  Motion.

### Validation Commands

Completed so far:

```sh
npm run typecheck  # passed
npm run test       # passed, 76 tests
```

Pending for this WP:

```sh
npm run lint
npm run build
```

### Remaining Risks

- Browser verification is still required to confirm the curtain is visible
  enough at projector sizes and does not cover persistent actors.
- Human review is still needed for subjective motion intensity.

## 2026-06-22 | WP-26 Scroll Flow Visual Intensification

### Goal

Make the continuous-scroll direction visible to a human viewer, not just true
in DOM structure. The stage should feel more like a world moving through a
fixed camera, closer to the reference-site mechanism, while keeping all missing
assets as placeholders.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp26-scroll-flow-field.test.ts`

### Decisions

- Add `scroll-flow-field` as a visible world-flow layer behind the persistent
  actors.
- Render up to five large angled Scene slices around the active Scene so the
  viewer can see previous/current/next space moving through one camera. At the
  beginning and end of the 21-scene run, the slice count naturally shrinks to
  the available neighboring scenes.
- Drive the flow layer from the existing native scroll CSS variables:
  `--free-scroll-offset` and `--free-scroll-progress`.
- Add the flow layer to `ContinuityMotionRuntime` so keyboard/controls and
  native scroll both keep the same interruptible motion cleanup behavior.
- Keep the work visual-only: no real product assets, QR codes, new business
  facts, Three.js, WebGL, Framer Motion, or additional dependencies.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 74 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768` at `20.10`: one `scroll-flow-field` rendered, four boundary
  slices were available near the end of the show, and the active slice measured
  about `1814 x 614`.
- Native scroll from `20.10` advanced to `21.1`; the active flow slice transform
  changed clearly while archived layer count remained `0`.
- `1920 x 1080` at `09.2`: one `scroll-flow-field` rendered with five slices,
  and the active slice measured about `2550 x 863`.
- Product status stayed on `shower-h1-placeholder`.
- Reduced motion switched to `data-reduced-motion="true"` and
  `data-continuity-reduced="true"`; the flow layer stayed visible as a static
  structural cue and archived layer count remained `0`.

### Remaining Risks

- The flow layer is now visible enough in DOM geometry checks. Human review is
  still needed to judge whether the motion intensity feels right in the room.

## 2026-06-22 | WP-25 Main Stage Merge And Legacy Layer Pruning

### Goal

Continue correcting the presentation toward the user's requested continuous
scrolling theater. The visible stage should no longer be a pile of route,
story, object, and frame layers. It should read as one scroll world plus one
persistent actor layer.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `tests/wp09-continuity-storytelling.test.ts`
- `tests/wp10-cinematic-route.test.ts`
- `tests/wp16-continuity-object.test.ts`

### Decisions

- Keep `ScrollNarrativeLayer` as the single audience-facing continuous world.
- Keep `PersistentActorLayer` as the single owner of the real actor bodies.
- Stop mounting `StorySpine`, `CinematicRouteLayer`, and
  `ContinuityObjectLayer` inside `VisualStage`. Their source files remain as
  archived reference layers while the stage-play rewrite continues.
- Update tests so old route/object/story layers are no longer treated as
  required audience-stage mounts.
- Add `.persistent-actor-layer` to the continuity runtime cleanup and transition
  scope so actor-layer movement is managed with the same interruptible GSAP
  context as the scroll world.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

### Browser Checks

- `20.10`: archived layer mount count was `0` for `StorySpine`,
  `CinematicRouteLayer`, `ContinuityObjectLayer`, and `StructuralUI`.
  `actor.action-path`, `actor.product-stage`, and `actor.cta-dock` each
  rendered once.
- `10.4`, `15.8`, `18.7`, `19.7`: each showed one active continuum panel plus
  the immediate previous and next panels; archived layer count stayed `0`.
- `10.4`, `15.8`, `18.7`, `19.7`: old direct frame-body duplicates stayed at
  `0` for source packet, output stack, scenario radar, and action path line.
- Native scroll from `20.10` advanced to `21.1` while archived layer count
  remained `0`.
- `1920 x 1080` at `09.2`: the active panel was about `888px` tall, adjacent
  panels each peeked at about `98px`, and the product remained
  `shower-h1-placeholder`.

### Remaining Risks

- The continuity runtime still contains selectors for archived historical
  layers. They no longer match mounted audience DOM, but a later cleanup pass
  should remove them once browser verification proves the new stage composition.
- The page still needs stronger visual polish so the scroll continuum is felt
  immediately, not only measured in DOM tests.

## 2026-06-22 | WP-24 Middle Persistent Actors

### Goal

Continue the stage-play correction by consolidating the middle-section actors
that still looked like component piles: source packet, fact-to-benefit
translation, output cards, safety boundary, and scenario radar.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/stage/MiddleActors.tsx`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp05b-product-continuity.test.ts`
- `tests/wp20-stage-actor-lifecycle.test.ts`
- `tests/wp20r-persistent-actors.test.ts`

### Decisions

- Add `MiddleActors` as the shared body file for the middle run of the show.
- Render `actor.source-packet`, `actor.fact-to-benefit`,
  `actor.output-cards`, `actor.safety-boundary`, and
  `actor.scenario-radar` only through `PersistentActorLayer`.
- Keep the existing placeholder content and selectors so asset gates and
  existing styling remain intact.
- Remove the old private `VisualStage` actor bodies:
  `TechnicalFacts`, `BenefitTranslation`, `OutputFreeze`, `ApprovalGate`,
  `BoundaryLoop`, `ScenarioRadar`, `SourcePacketMini`, and `OutputCardStack`.
- Keep real product assets, QR assets, and business claims blocked behind the
  existing placeholder/material gates.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

### Notes

- An initial parallel validation run caused `npm run typecheck` to read
  `.next/types` while `npm run build` was regenerating it. Running
  `npm run typecheck` again after the build passed cleanly.
- Browser visual verification is still needed for WP-25, especially `10.4`,
  `15.8`, `18.7`, and `19.7`.

### Remaining Risks

- The actor bodies are now consolidated, but the remaining historical scroll
  and route layers still need pruning so the page has one visible scroll world,
  one persistent actor layer, and one low-priority presenter/caption layer.

## 2026-06-21 | WP-23 Scroll Continuum Edge Peeks

### Goal

Make the continuous-scroll feeling visible at a glance. The previous continuum
pass made the active panel visible, but adjacent sections still sat just outside
the viewport, so the page could still read like a single slide.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`

### Decisions

- Add `data-continuum-offset` and `data-continuum-near` to every continuum
  panel so the renderer can distinguish immediate neighbors from distant
  scenes.
- In `stage-play-v2`, switch continuum panel layout from grid flow to
  viewport-centered absolute positioning.
- Keep only the active panel and its immediate previous / next panels visible.
  Distant panels stay hidden so the stage does not become a stack of many
  translucent pages.
- Tighten the vertical offset between adjacent panels so the previous and next
  scenes visibly peek from the top and bottom of the screen.
- Keep all real product and CTA materials as placeholders.

### Validation Commands

Completed:

```sh
npm run typecheck  # passed
npm run test       # passed, 72 tests
```

### Browser Checks

- `1366 x 768`: at `20.10`, the active panel was visible at about `631px`
  tall, Scene 19 peeked from the top at about `73px`, Scene 21 peeked from the
  bottom at about `73px`, and distant visible panel count was `0`.
- `1366 x 768`: scrolling from `20.10` advanced to `21.3`; Scene 20 remained
  visible at the top at about `97px`.
- `1920 x 1080`: at `09.2`, the active product panel was visible at about
  `888px`, Scene 08 and Scene 10 each peeked at about `98px`.
- `1920 x 1080`: the product remained the placeholder
  `shower-h1-placeholder`.

### Remaining Risks

- The scroll staging now reads more clearly, but middle-section actors still
  need consolidation so product facts, output cards, safety, and scenario
  radar do not feel like separate component piles.

## 2026-06-21 | WP-22 Full-Screen Scroll Continuum V2

### Goal

Make the reference-site direction visibly obvious instead of theoretical:
the stage should read as a continuous full-screen scroll narrative, not a stack
of faint cards or a PPT-like Beat switch.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp19-stage-continuity.test.ts`

### Decisions

- Promote `scroll-continuum-shell` from hidden background to the main
  stage-play visual layer.
- Treat its 21 panels as full-screen sections: the active Scene takes most of
  the viewport, while adjacent Scenes remain part of the same vertical world.
- Demote `scroll-cinema-corridor` to atmospheric depth so it supports the
  long-scroll effect instead of acting like another card deck.
- Reduce old `visual-copy` opacity further so giant PPT text does not compete
  with the continuous stage.
- Keep state deterministic and Beat-based. Native scroll still maps to Beat
  state; no ScrollTrigger, Lenis, Framer Motion, Three.js, WebGL, real product
  assets, QR assets, or unapproved business facts were added.
- Fix a deep-link edge case where `stateSource="jump"` stayed active when the
  page was already close to the target scroll position, preventing subsequent
  native scroll from advancing Beat state.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768`: `20.10` loaded with `stage-play-v2`,
  `actor.action-path` as lead, `scroll-continuum-shell` visible at opacity
  `0.96`, and the active continuum section visible across roughly 75% of its
  area.
- `1366 x 768`: old duplicate route layers remained hidden, the presenter HUD
  stayed collapsed, and only the small edge toggle was visible.
- `1366 x 768`: after entering by deep link at `20.10`, native scroll advanced
  to `21.3`; the active continuum panel stayed visible in the viewport.
- `1920 x 1080`: `09.2` loaded with `actor.product-stage` as lead; the active
  continuum section remained visible across roughly 75% of its area.
- `1920 x 1080`: product material remained the local placeholder
  `shower-h1-placeholder`; no real product asset or business fact was
  invented.

### Remaining Risks

- The long-scroll stage is now visible, but the middle section still contains
  support artifacts that should be merged into persistent actors: source
  packet, fact-to-benefit, output cards, safety boundary, and scenario radar.
- Final polish still depends on approved product imagery, product facts, and
  CTA materials.

## 2026-06-21 | WP-21R-D Persistent Opening Actors

### Goal

Apply the stage-play rule to the front section: define the opening actors first,
then let them enter, hold, and exit as one continuous stage body instead of
being recreated by separate Beat branches.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/stage-actor-ownership-matrix.md`
- `src/presentation/stage/OpeningActors.tsx`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp05a-prototype.test.ts`
- `tests/wp20-stage-actor-lifecycle.test.ts`
- `tests/wp20r-persistent-actors.test.ts`

### Decisions

- Add `OpeningActors` for the judgement question and ledger dial.
- Render `actor.judgement-question` and `actor.ledger-dial` only from
  `PersistentActorLayer`, using `stage-script` role and lifecycle data.
- Remove the old `question-core` body from the question frame.
- Remove the compact ledger ghost from `path-dial`.
- Remove the private `LedgerDial` renderer from `VisualStage`; the ledger actor
  now owns that body.
- Keep the work scoped to actor ownership and visual continuity. Do not add
  product assets, QR assets, business facts, new routes, Three.js, WebGL,
  Framer Motion, or new animation packages.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768`: `01.1` rendered exactly one
  `actor.judgement-question` with lifecycle `enter`; `.question-core`,
  `.path-dial-ghost`, and direct legacy `.ledger-dial` counts were all `0`.
- `1366 x 768`: `03.5` kept exactly one `actor.judgement-question` with
  lifecycle `hold`; no ledger actor was present yet.
- `1366 x 768`: `05.1` rendered exactly one `actor.ledger-dial` with lifecycle
  `enter`; the judgement actor was offstage.
- `1366 x 768`: `08.6` kept exactly one `actor.ledger-dial` with lifecycle
  `exit`; no legacy ledger ghost was present.

### Remaining Risks

- This pass fixes the front-section actor ownership, but the middle section
  still needs the same treatment for output cards, safety boundary, source
  packet, fact-to-benefit, and scenario radar.
- The page can still feel text-heavy until the remaining actors are merged and
  their support/background roles are styled down.

## 2026-06-21 | WP-21R-A Stage Play Actor Recut Planning

### Goal

Pause visual patching and reset the next implementation around a stage-play
model: define actors first, then scenes, entrances, holds, exits, and duplicate
component ownership.

### Files Added Or Updated

- `docs/stage-play-actor-recut.md`
- `docs/project-status.md`

### Decisions

- Do not modify old visual logic in this step.
- Treat Beat changes as director cues, not new pages.
- Require every shared object to have one actor identity, one main body, and a
  lifecycle phase before more animation work continues.
- Move the next acceptance point to manual confirmation of actor ownership,
  entrance/exit timing, CTA timing, output-system timing, route-layer pruning,
  and the scroll-feel boundary.

### Validation Commands

Not run. Documentation-only planning step.

### Remaining Risks

- Existing visual layers can still overlap until the confirmed actor contract is
  applied to code.
- `AGENTS.md` still forbids true smooth-scroll-driven presentation mode, so the
  immediate path remains Beat-controlled with continuous stage movement.

## 2026-06-21 | WP-21R-A/B Stage Play Mode First Cut

### Goal

Move from planning into a visible stage-play correction: reduce stacked visual
systems, keep one continuous scroll-like scene lens, and place persistent actors
in the foreground.

### Files Added Or Updated

- `src/presentation/stage/VisualStage.tsx`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp19-stage-continuity.test.ts`
- `docs/project-status.md`

### Decisions

- Add `data-stage-mode="stage-play-v2"`, `data-stage-act`, and
  `data-lead-actor` to the visual stage so CSS and future runtime code can
  style by current act and lead actor.
- Keep `scroll-cinema-corridor` as the single visible continuous scene lens.
- Hide duplicate audience route systems in stage-play mode:
  `CinematicRouteLayer`, `StorySpine`, `StructuralUI`,
  `ContinuityObjectLayer`, film strip, viewport stack, panel track, ribbon,
  lens frame, story window, and scroll theater shell.
- Raise `PersistentActorLayer` above the scroll lens so product, action path,
  and integration ring read as actors on stage instead of background ghosts.
- Update runtime opacity targets so the continuous scroll lens is visible
  instead of locked at `0.08`.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

Browser checks completed:

- `1366 x 768`, `20.10`: `data-stage-mode="stage-play-v2"`,
  `data-lead-actor="actor.action-path"`, scroll lens visible, persistent
  actors foregrounded, route/story/continuity duplicate layers hidden.
- `1366 x 768`, `09.2`: product actor is lead and remains a placeholder
  product body.
- `1366 x 768`, `21.8`: CTA remains placeholder, product remains support, and
  route/story duplicate layers stay hidden.
- `1920 x 1080`, `20.10`: scroll lens and foreground action path remain
  visible.
- Wheel scroll from `20.10` advanced to `21.1`, confirming vertical scroll
  input is active alongside keyboard controls.

### Remaining Risks

- This is a first visual correction, not final art direction. Some background
  scene typography still needs finer tuning so it feels like set design rather
  than a faded slide.
- `human-review`, `action-confirm-gate`, and `cta-dock` still need to be moved
  into persistent actor ownership in the next stage.
- True smooth-scroll-driven presentation mode remains outside the current
  project contract.

## 2026-06-21 | WP-21R-C Persistent Safety And CTA Actors

### Goal

Continue removing slide-like repeated entrances in the safety/action/CTA
section by making review, authorization, and CTA dock real persistent stage
actors.

### Files Added Or Updated

- `src/presentation/stage/SafetyActors.tsx`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/presentation/stage/stage-actors.ts`
- `src/presentation/stage/stage-script.ts`
- `src/styles/presentation.css`
- `tests/wp05c-safety-action-cta.test.ts`
- `tests/wp20-stage-actor-lifecycle.test.ts`
- `tests/wp20r-persistent-actors.test.ts`
- `docs/project-status.md`

### Decisions

- Extract `HumanReviewNode`, `ActionConfirmGate`, and `CtaDock` into shared
  `SafetyActors` components.
- Render those three actors from `PersistentActorLayer` with
  `data-stage-actor-id`, `data-actor-role`, and `data-lifecycle-phase`.
- Extend `actor.action-confirm-gate` through `19.8`, so authorization remains
  visible during scenario diagnosis instead of vanishing after `18.8`.
- Remove duplicate review/confirm/CTA bodies from `ApprovalGate`,
  `BoundaryLoop`, `ScenarioRadar`, and `ActionPath` frame branches.
- Keep CTA as `PLACEHOLDER`; no real QR code or short link is invented.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

Browser checks completed:

- `18.7`: human review and action confirm actors enter from
  `PersistentActorLayer`; old frame branch duplicate counts are 0.
- `19.7`: human review and action confirm actors hold as support conditions;
  CTA dock appears as compact support; old frame branch duplicate counts are 0.
- `21.8`: CTA dock is lead, product remains support, CTA status remains
  `PLACEHOLDER`.

### Remaining Risks

- Visual polish still needs another pass: the safety/radar area now has correct
  actor ownership, but the composition should be refined so the review and
  authorization nodes feel integrated into the stage path.
- The first eight scenes still need the same level of actor continuity polish
  now applied to product/action/CTA.

## 2026-06-19 | WP-01 Project Contract And Baseline

### Goal

Establish the project contract, stable documentation paths, a minimal
Next.js/TypeScript baseline, npm package management, and repeatable validation
commands.

### Files Added

- `AGENTS.md`
- `README.md`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tsconfig.json`
- `next-env.d.ts`
- `eslint.config.mjs`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `tests/wp01-baseline.test.mjs`
- `docs/design-baseline.md`
- `docs/scene-spec-master.md`
- `docs/asset-manifest.md`
- `docs/content-status.md`
- `docs/implementation-log.md`
- `docs/project-status.md`

### Decisions

- Use npm as the package manager.
- Use Next.js App Router with TypeScript for the minimal baseline.
- Use Node's built-in test runner for WP-01 to avoid adding a test framework
  before behavior exists.
- Do not add GSAP, Three.js, product assets, QR generation, scene data, or
  animation code in WP-01.
- Keep `AI演示网页_规划交付包_V1/` as the original handoff package.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 2 tests
npm run build      # passed, static / route generated
```

Notes:

- `next build` used Next.js 16.2.9 with Turbopack.
- Next.js adjusted `tsconfig.json` to use `jsx: react-jsx` and include
  `.next/dev/types/**/*.ts`.

### Remaining Risks

- Scene/Beat data and absolute target state schema are not implemented until
  WP-02.
- Presenter navigation, state restoration, Q&A mode, fullscreen behavior, and
  reduced-motion persistence are not implemented until WP-03 or later.
- Real product assets, product facts, CTA links, QR codes, and business fields
  still require business approval before final visual work.

## 2026-06-19 | WP-02 Content IDs And Absolute State Schema

### Goal

Represent the 21 locked scenes, 144 locked beats, speaker cue placeholders,
Q&A, CTA placeholder, and deterministic target state resolver as type-safe data.

### Files Added Or Updated

- `src/content/scenes.ts`
- `src/content/beats.ts`
- `src/content/speaker-notes.ts`
- `src/content/qa.ts`
- `src/content/cta.ts`
- `src/presentation/core/state-types.ts`
- `src/presentation/core/state-resolver.ts`
- `tests/wp02-content-schema.test.ts`
- `docs/project-status.md`
- `AGENTS.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`

### Decisions

- Keep screen copy at the Scene level for WP-02 and attach it to every Beat as
  the current visual baseline.
- Generate deterministic placeholder target state IDs for every Beat using
  `target:{sceneId}:{beatId}` and `reduced:{sceneId}:{beatId}`.
- Keep CTA as `PLACEHOLDER`; no QR code or random link is generated.
- Use `tsx` as a dev-only test runner so TypeScript data modules can be tested
  directly.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 8 tests
npm run build      # passed
```

Browser checks completed:

- `1366 x 768`: `01.1`, `09.2`, `18.7`, `20.10`, and `21.8` all displayed
  the cinematic route layer with a visible route cursor and 4 route frames.
- `1920 x 1080`: route mapping reported `opening` for `01.1`, `product` for
  `09.2`, `safety` for `18.7`, and `finale` for `20.10` / `21.8`.
- `09.2` preserved the product placeholder and kept asset-gated product reveal
  runtime disabled.
- `21.7` reported `data-cta-status="PLACEHOLDER"` and `21.8` kept final CTA
  runtime disabled.
- Reduced motion was toggled on `20.10`; the route layer remained visible and
  the runtime reported reduced-motion state. Motion was toggled back to normal
  after the check.

### Remaining Risks

- Speaker notes are placeholders keyed by Beat; full manuscript mapping remains
  future work.
- Target states are deterministic structural placeholders, not final visual
  geometry.
- Presenter controls, URL/localStorage restoration, fullscreen behavior,
  reduced-motion persistence, and Q&A interaction remain WP-03 scope.

## 2026-06-19 | WP-03 Presenter Shell And State Restoration

### Goal

Create a usable placeholder presentation player with state-driven navigation,
URL hash/localStorage restoration, presenter HUD controls, notes, reduced
motion, fullscreen request handling, chapter navigation, and Scene 21 Q&A
submode.

### Files Added Or Updated

- `src/presentation/core/PresentationController.ts`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/core/keyboard.ts`
- `src/presentation/core/persistence.ts`
- `app/page.tsx`
- `app/globals.css`
- `tests/wp03-controller.test.ts`
- `docs/missing-materials.md`
- `docs/project-status.md`
- `docs/implementation-log.md`

### Decisions

- Keep controller logic pure and independent from React rendering.
- Use URL hash for direct Beat identity in the format `#scene-15/15.7`.
- Use localStorage for notes visibility, reduced motion, and Q&A state.
- Keep the visual stage as a placeholder; no formal Scene artwork or animation
  is implemented in WP-03.
- Document missing product, CTA, business, and visual assets in
  `docs/missing-materials.md`.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 38 tests
npm run build      # passed
```

Browser checks completed:

- `1366 x 768`: StorySpine was visible with 21 Scene nodes.
- `1920 x 1080`: StorySpine was visible with 21 Scene nodes.
- Normal motion mode: `01.1 -> 01.2` reported
  `data-continuity-direction="forward"` and
  `data-continuity-reduced="false"`.
- Reduced-motion persistence check: `21.9 -> 21.8` reported
  `data-continuity-direction="backward"` and preserved the simplified motion
  branch.
- `09.2` kept the product placeholder and did not enable product-reveal
  runtime motion.
- `21.8` kept the CTA placeholder and did not enable final QR runtime motion.

### Remaining Risks

- Browser-level fullscreen behavior still depends on the runtime context.
- The shell is a functional placeholder, not the final visual stage.
- Screenshot and browser E2E automation are not installed yet; WP-03 behavior is
  covered by controller and persistence tests.
- Speaker notes remain placeholders until manuscript mapping is completed.

## 2026-06-19 | WP-04 Visual Tokens, Stage, And Integration Ring

### Goal

Create a unified static visual stage for the presenter player without adding
animation. Establish design tokens, typography, the fixed layer model, a shared
five-segment `IntegrationRing`, structural UI, and four static keyframes.

### Files Added Or Updated

- `src/styles/tokens.css`
- `src/styles/typography.css`
- `src/styles/presentation.css`
- `src/styles/reduced-motion.css`
- `src/presentation/stage/VisualStage.tsx`
- `src/presentation/stage/BackgroundSystem.tsx`
- `src/presentation/stage/TypographySystem.tsx`
- `src/presentation/stage/IntegrationRing.tsx`
- `src/presentation/stage/StructuralUI.tsx`
- `src/presentation/stage/static-frames.ts`
- `src/presentation/core/PresentationShell.tsx`
- `app/globals.css`
- `tests/wp04-visual-stage.test.ts`
- `docs/project-status.md`
- `docs/implementation-log.md`

### Decisions

- Keep WP-04 static: no GSAP, no timelines, no per-Beat animation.
- Use one inline SVG `IntegrationRing` with stable segment IDs and role variants
  for portal, safety boundary, and capability loop.
- Use CSS-only placeholder product geometry until real product assets are
  approved.
- Show `CTA PLACEHOLDER` in the final frame instead of generating or embedding a
  scannable QR code.

### Validation Commands

Run after implementation:

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

### Remaining Risks

- No screenshot automation is installed yet; visual review should inspect
  `01.2`, `09.2`, `16.3`, and `21.8` manually in the browser.
- Product silhouette is only a registered placeholder, not a final product
  asset.
- WP-05A is still required to prove ring continuity, text occlusion, and the
  ledger transition under navigation pressure.

## 2026-06-19 | WP-05A Ring, Text Occlusion, And Ledger Prototype

### Goal

Prototype the highest-risk first-chapter continuity path:

```text
01.1 -> 02.4
03.5 -> 04.7 -> 05.1
```

The goal is to prove a single `IntegrationRing` identity can read as an opening
portal, judgement ring, AI time track, business path handoff, and ledger dial
without creating a second global geometry system.

### Files Added Or Updated

- `src/presentation/stage/static-frames.ts`
- `src/presentation/stage/IntegrationRing.tsx`
- `src/presentation/stage/TypographySystem.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp04-visual-stage.test.ts`
- `tests/wp05a-prototype.test.ts`
- `docs/project-status.md`
- `docs/implementation-log.md`

### Decisions

- Keep the prototype deterministic and state-based; no GSAP timeline is added.
- Map only the approved WP-05A beats to prototype frames:
  `01.1`, `01.2`, `01.3`, `02.x`, `03.5`, `04.7`, `05.1`.
- Represent text walls, timeline nodes, business paths, and the ledger dial with
  DOM/SVG primitives.
- Preserve the existing `IntegrationRing` component and stable segment IDs.
- Do not implement Scene 06 or later motion in this package.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 19 tests
npm run build      # passed
```

### Remaining Risks

- The prototype is static/deterministic; it proves target states and continuity,
  not final animated timing.
- Browser screenshot review is still manual.
- WP-05B must still prove product continuity from `08.7 -> 09.2` and
  `10.4 -> 11.6`.

## 2026-06-19 | WP-05B Product Continuity And Benefit Translation Prototype

### Goal

Prototype the product continuity path before real assets are approved:

```text
08.7 -> 09.2
10.4 -> 11.6
```

The goal is to prove the same registered product object can move from a neutral
sample slot into product focus, source-backed technical facts, and benefit
translation without pretending placeholder facts are approved business claims.

### Files Added Or Updated

- `src/content/product-prototype.ts`
- `src/presentation/stage/ProductStage.tsx`
- `src/presentation/stage/static-frames.ts`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp05b-product-continuity.test.ts`
- `docs/project-status.md`
- `docs/implementation-log.md`

### Decisions

- Register one placeholder product ID: `shower-h1-placeholder`.
- Keep all product facts and benefit claims at `PLACEHOLDER` status.
- Use stable product anchors for later real asset alignment:
  `productCenter`, `valveCore`, `railMid`, `nozzleDetail`.
- Represent `SourcePacket`, fact cards, source IDs, and `BenefitMaster` as
  static DOM/SVG primitives.
- Do not add real product images, certification claims, business facts, GSAP,
  Three.js, WebGL, or animation timelines.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 23 tests
npm run build      # passed
```

### Remaining Risks

- Product geometry is still a code placeholder and must be replaced only after
  real product assets and public-use permission are confirmed.
- Fact labels and benefits are continuity placeholders, not final marketing
  claims.
- Browser screenshot review is still manual.
- WP-05C should next prove safety boundary, output-flow, and CTA continuity.

## 2026-06-19 | WP-05C Safety Boundary, Action Path, And CTA Placeholder Prototype

### Goal

Prototype the final high-risk continuity chain before browser visual review:

```text
15.8 -> 16.3
18.7 -> 18.8
19.7 -> 19.9 -> 20.10 -> 21.7 -> 21.8
```

The goal is to prove that generated output is caught by a safety boundary,
content approval remains separate from execution authorization, diagnostic
radar can become an action path, and CTA surfaces stay as explicit placeholders
until business links and QR assets are approved.

### Files Added Or Updated

- `src/content/safety-prototype.ts`
- `src/presentation/stage/static-frames.ts`
- `src/presentation/stage/IntegrationRing.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp05c-safety-action-cta.test.ts`
- `docs/project-status.md`
- `docs/implementation-log.md`

### Decisions

- Map only representative high-risk beats for WP-05C instead of filling every
  Scene 16-21 beat.
- Keep `HumanReviewNode` and `ActionConfirmGate` as separate structures.
- Keep `ActionConfirmGate.executionAuthorized` false in placeholder data.
- Keep `ScenarioRadar` candidate data configurable and avoid fake scores.
- Keep CTA as `PLACEHOLDER`; do not generate QR codes, short links, submission
  success states, or registration IDs.
- Reuse static DOM/SVG primitives; do not add GSAP, Three.js, WebGL, browser
  timers, form submission, or sound.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 28 tests
npm run build      # passed
```

### Remaining Risks

- WP-05C is still a static prototype; it proves structure and continuity, not
  final animated timing.
- Browser screenshot review is now needed for `15.8`, `18.7`, `19.7`, `20.10`,
  `21.7`, and `21.8`.
- Real QR code, short link, registration wording, host information, and privacy
  copy remain blocked on business confirmation.

## 2026-06-19 | WP-06 Browser Visual QA And Corrections

### Goal

Check the static prototype in real browser viewports and fix only concrete
layout, readability, and navigation issues found during review.

### Files Added Or Updated

- `docs/visual-qa.md`
- `docs/project-status.md`
- `docs/implementation-log.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/stage/TypographySystem.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp03-controller.test.ts`

### Decisions

- Use browser checks at `1366 x 768` and `1920 x 1080`.
- Validate representative high-risk beats from WP-05C instead of every beat.
- Treat direct hash navigation failure as a real presenter/QA issue and fix it.
- Keep WP-06 static; do not add animation, GSAP, screenshots as committed
  binaries, real QR codes, or external assets.

### Fixes

- Added runtime `hashchange` handling for direct Beat navigation.
- Removed duplicated fallback scene copy from `TypographySystem`.
- Added explicit accessible headings for safety, approval gate, and boundary
  loop frames.
- Reduced boundary loop scale for `1366 x 768`.
- Shifted the scenario radar composition away from the large title.
- Constrained and recolored the finale title for contrast on the dark left
  panel.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 28 tests
npm run build      # passed
```

### Remaining Risks

- Browser screenshot review is manual; no visual regression baseline exists yet.
- Real product imagery, QR code, host details, and CTA wording remain blocked on
  business confirmation.
- Motion timing and transition quality are still future work.

## 2026-06-20 | WP-07 Motion Timeline Contract And Asset Gates

### Goal

Prepare the animation layer without installing or running an animation runtime.
WP-07 defines the first motion contracts, reduced-motion behavior, and asset
gates that must pass before product, business-output, or CTA animations can be
implemented.

### Files Added Or Updated

- `docs/animation-plan.md`
- `docs/project-status.md`
- `docs/implementation-log.md`
- `src/presentation/motion/motion-types.ts`
- `src/presentation/motion/asset-gates.ts`
- `src/presentation/motion/motion-registry.ts`
- `tests/wp07-motion-contract.test.ts`

### Decisions

- Keep WP-07 as contract-only: no GSAP, no Framer Motion, no runtime timeline.
- Register only high-risk continuity beats for the first motion plan.
- Enforce one primary motion, one optional secondary motion, and one optional
  ambient loop per Beat.
- Require reduced-motion fallback for every motion contract.
- Block product reveal, Scene 15 -> 16 red-light swap, public business-output
  animation, and real QRDock behavior until their asset gates pass.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 33 tests
npm run build      # passed
```

### Remaining Risks

- The motion registry is not an animation runtime.
- GSAP cleanup, interruption handling, and timeline scoping still need a later
  implementation package.
- Product, business-output, and CTA animations remain blocked by real asset and
  business approval gaps.

## 2026-06-20 | WP-08A First Code-Generated Motion Runtime

### Goal

Enable the first controlled animation runtime without touching real product
assets, real QR codes, product reveal, red-light product swap, or public
business-output samples.

Runtime is limited to these code-generated Beat IDs:

```text
01.1, 03.5, 05.1, 18.7, 20.10
```

### Files Added Or Updated

- `package.json`
- `package-lock.json`
- `docs/animation-plan.md`
- `docs/project-status.md`
- `docs/implementation-log.md`
- `src/presentation/motion/motion-types.ts`
- `src/presentation/motion/motion-registry.ts`
- `src/presentation/motion/StageMotionRuntime.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp07-motion-contract.test.ts`

### Decisions

- Install `gsap` as the only approved animation runtime for this package.
- Keep Framer Motion, Three.js, WebGL, scroll-driven animation, real products,
  real QR codes, and real business-output animations out of scope.
- Mount one isolated client leaf, `StageMotionRuntime`, inside `VisualStage`.
- Keep `motion-registry.ts` as the contract source and let the runtime read only
  the current Beat, frame kind, reduced-motion state, and gate readiness.
- Scope GSAP work with `gsap.context()` under `.visual-stage` and call
  `context.revert()` on Beat changes and unmount.
- Use only transform, opacity, and stable SVG path stroke offsets.
- Leave `09.2`, `16.3`, and `21.8` blocked by asset gates.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 35 tests
npm run build      # passed
```

Browser checks completed:

- `1366 x 768`: `01.1`, `03.5`, `05.1`, `18.7`, and `20.10` reported
  `data-motion-enabled="true"`.
- `1920 x 1080`: `01.1`, `03.5`, `05.1`, `18.7`, and `20.10` reported
  `data-motion-enabled="true"`.
- `09.2`, `16.3`, and `21.8` reported `data-motion-enabled="false"` at both
  checked viewports.
- Reduced motion was toggled on `20.10`; the same Beat stayed active and the
  runtime reported `data-motion-reduced="true"`.
- Scene 21 Q&A mode kept `21.8` runtime disabled because CTA assets remain
  gated.

### Remaining Risks

- Motion quality still needs human review under real presenter navigation
  pressure.
- The runtime currently covers only the first five approved code-generated
  Beats.
- Product reveal, red-light product swap, public business-output animation, and
  final QR behavior remain blocked by missing approved assets and business
  configuration.

## 2026-06-20 | WP-09 Continuous Storytelling Prototype

### Goal

Start moving the courseware away from hard slide replacement and toward a
continuous presenter-controlled visual journey inspired by La Revoltosa and
NANFU.

The intended feeling is scroll-like continuity, but the implementation remains
Beat-driven and presenter-controlled.

### Files Added Or Updated

- `docs/project-status.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/motion/motion-types.ts`
- `src/presentation/stage/StorySpine.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp07-motion-contract.test.ts`
- `tests/wp09-continuity-storytelling.test.ts`

### Decisions

- Add `StorySpine` as the visible route across all 21 Scenes and 144 Beats.
- Group the course into five visible worlds: judgement, ledger, product,
  safety, and action.
- Compute forward/backward/hold direction from Beat order in
  `PresentationShell`.
- Add `ContinuityMotionRuntime` as an isolated client leaf inside `VisualStage`.
- Scope all continuity motion to `.visual-stage` with `gsap.context()` and
  `context.revert()`.
- Keep motion transform/opacity based.
- Do not introduce Framer Motion, Three.js, WebGL, ScrollTrigger, or
  scroll-driven presentation mode.
- Keep product and CTA asset-gated moments as placeholders.

### Validation Commands

Run after implementation:

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

### Remaining Risks

- This is the first continuity pass; human review must tune pacing and spatial
  weight.
- Story continuity is now visible, but detailed per-path choreography still
  needs stronger art direction across the four priority paths.
- Missing product renders and QR assets still prevent final product reveal and
  CTA animation.

## 2026-06-20 | WP-10 Cinematic Route Layer

### Goal

Strengthen the first continuity prototype so the audience sees a long visual
journey instead of only large slide-like text changes.

This package translates the La Revoltosa / NANFU research into one visible
route layer while keeping the presentation Beat-driven and presenter-controlled.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/CinematicRouteLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp10-cinematic-route.test.ts`

### Decisions

- Add `CinematicRouteLayer` as a mid-stage route system above generated
  artifacts and below presenter UI.
- Group the long presentation into four visible routes:
  `判断与四本账`, `产品样板`, `安全边界`, and `行动收束`.
- Keep route content data-driven from current Beat order.
- Keep real product and CTA moments marked as placeholders inside the route
  layer.
- Extend `ContinuityMotionRuntime` to animate route path stroke, route cursor,
  and route frames.
- Keep all continuity behavior scoped to `.visual-stage` through
  `gsap.context()` and cleanup on navigation/unmount.
- Do not add ScrollTrigger, browser scroll control, Framer Motion, Three.js, or
  WebGL.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 41 tests
npm run build      # passed
```

### Remaining Risks

- The route layer improves continuity, but final taste still needs human review
  at real projection size.
- The layer is still code-generated and placeholder-safe; final product renders,
  QR, and business facts remain gated.
- The next package should tune spatial hierarchy and pacing rather than expand
  dependency surface.

## 2026-06-20 | WP-11 Scroll-Like Narrative Lens

### Goal

Make the presentation visibly feel less like slide replacement and more like a
continuous long-page visual performance, while preserving presenter-controlled
Beat navigation.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp11-scroll-narrative.test.ts`

### Decisions

- Add `ScrollNarrativeLayer` as a large background/midground lens system.
- Render all 21 Scenes as a diagonal scene reel, so the audience can feel a
  long route moving through one fixed stage.
- Add a fixed story window, two kinetic ribbon rows, and a progress slit.
- Drive the reel from current Beat / Scene state, not from browser scroll.
- Keep the layer `aria-hidden`; semantic readable content remains in normal
  stage copy.
- Animate temporary motion offsets through CSS variables so GSAP does not
  overwrite the absolute CSS-variable track position.
- Keep product and CTA material placeholders unchanged.
- Do not add ScrollTrigger, Lenis, Framer Motion, Three.js, WebGL, or real
  product assets.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 44 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768` and `1920 x 1080`: the longform layer displayed 21 scene
  panels, two ribbon rows, and the fixed story window.
- `01.1`, `09.2`, `18.7`, `20.10`, and `21.8`: the active Scene panel was
  visible in the viewport after the track calibration pass.
- The first track implementation was too conservative in one direction and then
  over-shifted later Scenes; the final calibration keeps early, product, safety,
  and finale checkpoints visible.

### Remaining Risks

- The visual continuity is now much more visible, but this is still a
  code-generated stage. It needs human taste review for density, overlap, and
  whether the long reel should be darker or more dominant during live delivery.
- Real product material, QR, and business facts remain gated and should not be
  faked in later visual polish.

## 2026-06-20 | WP-12 Narrative Lens Visibility Push

### Goal

Respond to the visual gap that the continuous layer could still read as
background decoration rather than the main scroll-like experience.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp12-visual-director.test.ts`

### Decisions

- Raise `ScrollNarrativeLayer` to a stronger visual layer so it is no longer
  just a subtle background texture.
- Add a red fixed lens frame with four corners and two internal scan lines.
- Add a visible scene/progress readout, now displayed as `SCENE / progress`.
- Add an 8-step depth stack to give the stage a stronger camera/reel feeling.
- Make the active Scene panel larger and more opaque.
- Keep the stronger lens driven by Beat state and scoped GSAP CSS-variable
  offsets.
- Preserve product and CTA placeholders and keep asset-gated runtime motion
  disabled.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 46 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768` and `1920 x 1080`: the stronger lens frame, scene/progress
  readout, 8 depth bars, 21 scene panels, and 2 ribbon rows were present.
- `20.10`: longform layer reported `z-index=7`, active Scene panel visible,
  and `scrollWorld="action"`.
- Product and CTA placeholder checks remain required after future visual
  changes.

### Remaining Risks

- This improves visibility, but real taste still depends on live projection and
  human review. The next pass should tune overlap between the stronger lens,
  product placeholder, route HUD, and readable speaker content.

## 2026-06-20 | WP-13 Main Stage Scroll Film Strip

### Goal

Make the scroll-like continuity impossible to miss by showing adjacent Scenes
in the same visible stage, not only through background tracks, route lines, or
progress frames.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp13-scroll-film-strip.test.ts`

### Decisions

- Add `scroll-film-strip` as a highly visible mid/lower stage reel.
- Show the active Scene plus available previous/next Scenes as one continuous
  strip.
- Enlarge the active card and show the current Beat position as `SCROLL REEL`.
- Animate the film strip through CSS-variable offsets inside
  `ContinuityMotionRuntime`.
- Preserve reduced-motion logic: the strip remains visible without directional
  flourish.
- Keep all real product, QR, and business-material moments gated.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 48 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768` and `1920 x 1080`: `20.10` displayed the film strip, current
  active Scene card, lens frame, and current Scene panel.
- `09.2`: film strip displayed 5 cards and product reveal stayed disabled with
  the product model still marked as placeholder.
- `21.7`: film strip handled the end boundary with 3 cards; CTA remained
  `PLACEHOLDER` and final CTA runtime stayed disabled.
- Reduced motion kept the film strip and active card visible.

### Remaining Risks

- The experience is now much more visibly continuous, but density is high.
  Next visual-director work should decide whether to hide the route HUD during
  the strongest film moments or tune opacity by Scene world.

## 2026-06-20 | WP-14 Viewport Scroll Stack

### Goal

Make the continuous scrolling metaphor visible in the main stage itself, not
only through a bottom film strip or route HUD.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp14-viewport-scroll-stack.test.ts`

### Decisions

- Add `scroll-viewport-stack` with previous, current, and next Scene cards.
- Keep the current Scene as the dominant full-height card.
- Let the previous Scene peek from above and the next Scene peek from below,
  creating an immediate vertical scroll-page effect.
- Drive the stack from current Scene state and Beat direction; no browser scroll
  listeners, ScrollTrigger, Lenis, Framer Motion, Three.js, or WebGL.
- Preserve reduced-motion behavior by keeping the stack visible while removing
  directional flourish.
- Preserve product and CTA asset gates.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 50 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768` and `1920 x 1080`: `20.10` displayed the viewport stack, active
  Scene card, film strip, and lens frame.
- `20.10`: previous Scene, active Scene, and next Scene all peeked in the
  viewport.
- Reduced motion kept the stack and active card visible.
- `09.2`: product remained placeholder and product reveal runtime stayed
  disabled.
- `21.7`: CTA remained `PLACEHOLDER` and final CTA runtime stayed disabled.

### Remaining Risks

- This is now visually forceful. The next pass should tune hierarchy between
  the viewport stack, product placeholder, readable copy, and route/film HUDs so
  the result feels intentional rather than crowded.

## 2026-06-20 | WP-15 Scroll Stage Dominance Push

### Goal

Respond to the latest visual review: the courseware still felt too close to
large-type PPT because the scroll-like system was visible but not yet the first
thing the audience sees.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp12-visual-director.test.ts`
- `tests/wp15-scroll-stage-dominance.test.ts`

### Decisions

- Raise `ScrollNarrativeLayer` to `z-index: 9`, directly under readable copy
  and structural UI, so the scrolling stage becomes a foreground visual system.
- Add `scroll-stage-focus-field` as a masked red/black focus plane behind the
  viewport stack.
- Add `scroll-stack-rail` with 21 scene ticks, so the vertical page-stack feels
  tied to the full course route.
- Enlarge and brighten the active viewport card, while reducing the older
  diagonal panel track and film strip to supporting rhythm.
- Reduce oversized `visual-copy` typography into a supporting semantic cue
  layer, so the viewport stack is no longer hidden behind PPT-like titles.
- Fade the cinematic route map and make the active viewport card more opaque,
  so old path graphics do not compete with the current scrolling page.
- Drive the new focus field and rail from `ContinuityMotionRuntime`, with
  reduced-motion coverage.
- Keep presenter mode Beat-driven. Do not add ScrollTrigger, Lenis, Framer
  Motion, Three.js, WebGL, real product assets, or QR material.

### Validation Commands

Completed:

```sh
npm run test -- --test-name-pattern=WP-15  # passed, 52 tests discovered / 52 passed
```

Full validation and browser checks are run after this implementation note.

### Browser Checks

- `1366 x 768`: `20.10` displayed `ScrollNarrativeLayer` at `z-index=9`,
  `visual-copy` at `z-index=8`, and the active viewport card covered roughly
  57% of the visual stage.
- `1920 x 1080`: `20.10` displayed the active viewport card across roughly
  59% of the visual stage, with 21 rail ticks and one active rail tick.
- Reduced motion kept the viewport stack, active card, focus field, and rail
  visible while setting continuity runtime to reduced state.
- `09.2`, `21.7`, and `21.8` kept `StageMotionRuntime`
  `data-motion-enabled="false"` for asset-gated moments.
- `09.2` preserved `data-product-id="shower-h1-placeholder"`.
- `21.7` and `21.8` preserved `data-cta-status="PLACEHOLDER"`.

### Remaining Risks

- The stage is now intentionally more dominant. The remaining gap to NANFU or
  La Revoltosa is not more text animation; it is the lack of approved real
  product imagery, product detail states, and business-approved CTA material.

## 2026-06-20 | WP-16 Product And Action Continuity Object

### Goal

Move beyond a scroll-like page stack by adding persistent objects that are
carried through the two most important late-stage paths: product explanation and
action convergence.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp15-scroll-stage-dominance.test.ts`
- `tests/wp16-continuity-object.test.ts`

### Decisions

- Add `ContinuityObjectLayer` above the scroll stage and below the story route,
  so the audience sees a persistent object instead of only large text and cards.
- Product path `08.7 -> 11.6` now uses one code-generated product object with a
  product shell, source track, fact track, benefit track, and four-step rail.
- Action path `19.7 -> 21.8` now uses one persistent action path with scenario
  card, milestone rail, and CTA status card.
- Keep product and CTA values as placeholders. The object layer binds to
  `shower-h1-placeholder`, product fact/claim placeholder data, and CTA
  `PLACEHOLDER`.
- Reduce `visual-copy` sizing further so text becomes a supporting semantic cue
  rather than the dominant PPT-like surface.
- Extend `ContinuityMotionRuntime` so the continuity object and its rails enter
  with Beat direction and clean up through the existing `gsap.context()` scope.
- Do not add ScrollTrigger, Lenis, Framer Motion, Three.js, WebGL, real product
  imagery, QR codes, or unapproved business facts.

### Validation Commands

Completed during implementation:

```sh
npm run test -- --test-name-pattern=WP-16     # passed, 54 tests discovered / 54 passed
npm run typecheck                             # passed
npm run test -- --test-name-pattern='WP-1[56]' # passed
```

Full validation is run after this implementation note.

### Browser Checks

- `1366 x 768`: `08.7`, `09.2`, `10.4`, and `11.6` all rendered
  `data-continuity-object="product"` with steps `0` through `3`.
- Product continuity retained `data-product-id="shower-h1-placeholder"` and
  active fact / active claim placeholder IDs.
- `1366 x 768`: `19.7`, `20.10`, `21.7`, and `21.8` all rendered
  `data-continuity-object="action"` with steps `0` through `3`.
- Action continuity kept `data-cta-status="PLACEHOLDER"` while milestones
  progressively activated.
- `1920 x 1080`: `11.6` retained the product continuity object, with the object
  shell visible in the main stage.
- Reduced motion: `20.10` retained the action continuity object and CTA
  `PLACEHOLDER` state.

### Remaining Risks

- The visual language is now more object-driven, but still code-generated.
  Final NANFU-like product quality requires approved real product images,
  cutouts, detail states, and lighting assets.
- Density remains high in some scenes. The next pass should tune pacing and
  reduce nonessential background marks around the primary object.

## 2026-06-20 | WP-17 Director Focus And Object Dominance

### Goal

Translate the latest La Revoltosa / NANFU reference review into the current
stage: make product and action continuity beats feel object-led rather than
large-type slide-led, while keeping presenter navigation, placeholders, and
offline-friendly DOM/SVG constraints.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `docs/reference-sites-analysis.md`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
- `src/styles/presentation.css`
- `tests/wp17-director-focus.test.ts`

### Decisions

- Add `director-focus-plane` and `director-focus-frame` to both product and
  action continuity objects.
- Use the focus plane as a visual director layer: product and action objects
  stay dominant, while the scroll stack, film strip, route map, and auxiliary
  HUD marks recede during object beats.
- Animate the focus plane, focus frame, and action path line through the
  existing scoped GSAP runtime.
- Keep reduced-motion behavior stable and non-looping.
- Do not add real product assets, QR assets, ScrollTrigger, Lenis, Framer
  Motion, Three.js, WebGL, or unapproved business facts.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 56 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768`: `11.6` rendered product focus with
  `data-director-focus="product"`, `data-product-id="shower-h1-placeholder"`,
  product focus frame, and active scroll card opacity `0.58`.
- `1366 x 768`: `20.10` rendered action focus with
  `data-director-focus="action"`, action focus frame, panel track opacity
  `0.36`, and CTA `PLACEHOLDER`.
- `1920 x 1080`: `11.6` kept the product shell and focus frame visible in
  normal motion; runtime reported `data-continuity-reduced="false"`.
- `1920 x 1080`: `20.10` kept the action path and focus frame visible in
  normal motion; runtime reported `data-continuity-reduced="false"`.
- Reduced motion: `20.10` kept the action continuity object, action focus
  frame, and CTA `PLACEHOLDER`, while runtime reported
  `data-continuity-reduced="true"`.

### Remaining Risks

- The current product is still a code-generated stand-in. The page can become
  less PPT-like through focus and continuity, but final product polish still
  depends on approved real product imagery and detail states.

## 2026-06-21 | WP-20R Persistent Actor Layer

### Goal

Begin turning the stage-theater contract into real rendering structure by
moving repeated primary actor bodies out of per-frame branches and into one
persistent actor layer.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/core/persistence.ts`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/presentation/motion/StageMotionRuntime.tsx`
- `src/presentation/stage/PersistentActorLayer.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/styles/presentation.css`
- `tests/wp03-controller.test.ts`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp20-stage-actor-lifecycle.test.ts`
- `tests/wp20r-persistent-actors.test.ts`

### Decisions

- Add `PersistentActorLayer` as the first real stage actor shell.
- Move `IntegrationRing` into the persistent actor layer while preserving the
  existing `.integration-geometry`, `.ring-wrap`, and `.integration-ring`
  selectors.
- Render `ProductStage` only from the persistent actor layer, using
  `stage-script` lifecycle and role data.
- Move the `ActionPath` line, selected scenario, and milestones into the
  persistent actor layer.
- Leave old frame branches responsible only for supporting artifacts such as
  prep cards, fact cards, source packet, scope notes, and CTA.
- Keep CTA as placeholder and do not add real product assets, QR assets,
  ScrollTrigger, Lenis, Framer Motion, Three.js, WebGL, or unapproved facts.
- Add read-only `data-current-beat-id` and `data-hydrated` diagnostics on
  `PresentationShell`.
- Guard native scroll sync so an initial scroll position cannot overwrite a
  pending hash / keyboard / control jump.
- Make presentation storage read/write tolerant of blocked or unavailable
  `localStorage`, so hash hydration still works in embedded browser contexts.
- Make GSAP selector helpers no-op on missing single targets to reduce runtime
  warning noise during Beat transitions.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 72 tests
npm run build      # passed
```

### Browser Check

- Restarted the local Next dev server and used `http://localhost:3000`.
- `09.2` loaded with `data-hydrated="true"`,
  `data-current-beat-id="09.2"`, one `ProductStage`, and one
  `IntegrationRing`.
- `20.10` loaded with `data-hydrated="true"`,
  `data-current-beat-id="20.10"`, one `ProductStage`, one `IntegrationRing`,
  one `ActionPath`, and CTA `PLACEHOLDER`.
- `21.8` loaded with `data-hydrated="true"`,
  `data-current-beat-id="21.8"`, one `ProductStage`, one `IntegrationRing`,
  and CTA `PLACEHOLDER`.
- `127.0.0.1:3000` is not the recommended verification URL in dev mode because
  Next blocks cross-origin access to development resources from that host.

### Remaining Risks

- CTA compact/expanded still needs the same persistent actor treatment in a
  later pass.
- Safety boundary and human review still need to consume `stage-script`
  lead/support/background roles for real visual hierarchy.

## 2026-06-21 | WP-19R Stage Script Data Contract

### Goal

Stop adding visual layers on top of the current implementation and establish a
stage-theater contract first: define the cast, the acts, the lead actor for
each Beat range, and the lifecycle rules that prevent repeated entrances.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/stage/stage-actors.ts`
- `src/presentation/stage/stage-script.ts`
- `tests/wp19r-stage-script.test.ts`

### Decisions

- Keep this work package data-only. Do not change `VisualStage`, CSS, motion
  runtime, routes, dependencies, product assets, QR assets, or business facts.
- Extend the actor registry with the missing stage actors: judgement question,
  ledger dial, safety boundary, and presenter controls.
- Add `stage-script.ts` as a director-facing contract that maps any Beat to an
  act, a lead actor, actor roles, and actor lifecycle.
- Treat Beat as a cue rather than a page. The lead actor may change, but an
  actor that remains visible must stay in `hold`, not repeat `enter`.
- Keep presenter controls as a separate `control` actor so they can be folded
  without being confused with the audience stage.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 68 tests
npm run build      # passed
```

### Contract Checks

- `01.1 -> 04.7` leads with `actor.judgement-question`.
- `05.1 -> 08.6` leads with `actor.ledger-dial`.
- `08.7 -> 15.8` leads with `actor.product-stage`.
- `16.1 -> 18.9` leads with `actor.safety-boundary`.
- `19.1 -> 19.8` leads with `actor.scenario-radar`.
- `19.9 -> 21.6` leads with `actor.action-path`.
- `21.7 -> 21.9` leads with `actor.cta-dock`.
- Every registered actor has exactly one `enter` and one `exit` across the
  144-Beat script, with continuous `hold` states in between.

### Remaining Risks

- The runtime and visual layers still need to consume this script. This work
  package creates the guardrails, but it does not yet remove old duplicate
  stage bodies from rendering.

## 2026-06-20 | WP-18 Full-Screen Scroll Theater Correction

### Goal

Respond to the core visual issue reported during review: too many components
were stacked together, content was hard to read, and the experience still felt
like left/right page switching instead of a full-screen continuous scroll.

### Files Added Or Updated

- `docs/implementation-log.md`
- `docs/project-status.md`
- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/core/keyboard.ts`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
- `src/presentation/stage/StructuralUI.tsx`
- `src/presentation/stage/VisualStage.tsx`
- `src/presentation/motion/ContinuityMotionRuntime.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`

### Decisions

- Add `scroll-cinema-corridor` as the primary visual surface. The active Scene
  now occupies most of the viewport, while previous/next Scenes sit above and
  below as a continuous vertical strip.
- Add `scroll-momentum-band` as subtle moving context, but disable its loop in
  reduced-motion mode.
- Demote the older story window, lens frame, viewport stack, film strip, panel
  track, ribbon, route map, and integration ring to background opacity so they
  no longer compete with the main content.
- Add wheel / trackpad navigation. Vertical scroll input is throttled and mapped
  to previous/next Beat, preserving presenter state control and hash recovery
  while making the interaction feel vertically scroll-driven.
- Add ArrowUp / ArrowDown / PageUp / PageDown keyboard support. Left/right keys
  remain as compatibility, but controls are labeled Up / Down.
- Replace the outdated visible footer text `Presenter-controlled static stage /
  WP-04` with `144-beat continuous stage`.
- Keep product and CTA assets as placeholders. Do not add ScrollTrigger, Lenis,
  Framer Motion, Three.js, WebGL, real product imagery, QR codes, or unapproved
  business facts.

### Validation Commands

Completed:

```sh
npm run lint       # passed
npm run typecheck  # passed
npm run test       # passed, 58 tests
npm run build      # passed
```

### Browser Checks

- `1366 x 768`: `21.1` rendered the active scroll theater card at roughly
  `958 x 662`; story window opacity was `0.12`, viewport stack opacity was
  `0.18`, and visual copy was no longer dominant.
- `1366 x 768`: a wheel gesture advanced the deck from `#scene-20/20.10` to
  `#scene-21/21.1` with continuity direction `forward`.
- `1920 x 1080`: `11.6` rendered the active scroll theater card at roughly
  `1264 x 920`; product continuity object remained bound to
  `shower-h1-placeholder`.
- `1920 x 1080`: control labels rendered as `Up` / `Down`, and the footer
  rendered `144-beat continuous stage`.

### Remaining Risks

- The visual direction is now much closer to a continuous scroll theater, but
  individual Scene card composition still needs polishing so each screen has
  one clear point and fewer repeated text fragments.
- Product realism still depends on approved real product assets or a stronger
  2.5D placeholder art pass.
