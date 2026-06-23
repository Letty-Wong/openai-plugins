# WP-07 / WP-08A Animation Timeline And Runtime Plan

## Purpose

WP-07 prepared the animation system without implementing runtime animation.
WP-08A adds the first narrow runtime pass for code-generated objects only.

Together these packages answer five questions:

- Which beats are allowed to become motion prototypes first?
- What is the one primary movement, one supporting movement, and optional ambient loop for each beat?
- What happens in reduced-motion mode?
- Which animations are blocked until real assets or business approvals arrive?
- Which code-generated beats are now allowed to execute GSAP runtime motion?

## Runtime Status

Current status:

- Motion runtime: enabled for the WP-08A whitelist only.
- GSAP: installed and approved as the only runtime for this pass.
- Framer Motion: not installed.
- Three.js / WebGL: not installed.
- Timeline execution: implemented only inside `StageMotionRuntime`.
- Scroll-driven presentation: forbidden.

Contract data remains the single source of truth:

- `src/presentation/motion/motion-types.ts`
- `src/presentation/motion/asset-gates.ts`
- `src/presentation/motion/motion-registry.ts`

The runtime leaf is:

- `src/presentation/motion/StageMotionRuntime.tsx`

It is mounted inside `VisualStage`, reads the current Beat and motion contract,
and scopes all GSAP work to `.visual-stage`.

## First Motion Contract Beats

| Beat | Role | Runtime Status | Gate |
| --- | --- | --- | --- |
| `01.1` | Entry portal forms from first signal point | WP-08A runtime enabled | `code-generated-ok` |
| `03.5` | AI timeline node joins the efficiency wave | WP-08A runtime enabled | `code-generated-ok` |
| `05.1` | Ledger dial takes over from path handoff | WP-08A runtime enabled | `code-generated-ok` |
| `08.7` | Registered product slot appears | Contract only | `product-silhouette-approved` |
| `09.2` | Product reveal and typography occlusion | Blocked by asset | `product-warm-red-registered` |
| `15.8` | Generated output freezes before safety turn | Contract only | `business-output-approved` |
| `16.3` | Shared ring tightens into safety boundary | Blocked by asset | `product-warm-red-registered` |
| `18.7` | Human review and execution confirm stay separate | WP-08A runtime enabled | `code-generated-ok` |
| `19.7` | Scenario radar holds self-check CTA placeholder | Contract only | `cta-configured` |
| `20.10` | Action path summarizes the next steps | WP-08A runtime enabled | `code-generated-ok` |
| `21.8` | Finale capability loop and CTA hold state | Blocked by asset | `cta-configured` |

## Motion Discipline

Every registered beat follows the same rule:

```text
1 primary movement
+ 0 or 1 supporting movement
+ 0 or 1 ambient loop
```

No beat contract allows accumulated transforms. Runtime implementation must read
absolute target states from the current Beat and must clean up on navigation.

Allowed movement properties for first runtime pass:

- `transform`
- `opacity`
- SVG stroke offset where the path is stable

Forbidden for first runtime pass:

- Animating layout dimensions.
- Animating `top`, `left`, `width`, or `height`.
- Long typewriter effects.
- Whole-page fade as default transition.
- Any animation that hides CTA readability or Q&A recovery.

## WP-08A Runtime Scope

`StageMotionRuntime` currently runs only these Beat IDs:

```text
01.1, 03.5, 05.1, 18.7, 20.10
```

Runtime behavior:

- Uses `gsap.context()` scoped to `.visual-stage`.
- Calls `context.revert()` when the Beat changes, the stage refreshes, or the
  component unmounts.
- Resets runtime targets before playing the current Beat.
- Uses transform, opacity, and stable SVG stroke offset only.
- Does not listen to scroll.
- Does not display engineering gate messages on the audience screen.

Asset-gated beats that still do not run runtime motion:

```text
09.2, 16.3, 21.8
```

## Reduced Motion

Reduced motion contracts are already defined per beat.

Allowed reduced-motion behavior:

- `hold`
- `static-swap`
- `short-fade` up to `250ms`

Reduced motion must preserve all logic:

- Same Scene.
- Same Beat.
- Same content state.
- Same safety boundary.
- Same CTA placeholder state.
- Same Q&A return behavior.

## Asset Gates

### Pass Now

`code-generated-ok`

- DOM/SVG primitives can be animated later without external assets.

### Placeholder Allowed

`product-silhouette-approved`

- Coarse product continuity can be reviewed with the registered placeholder.
- Final product animation remains blocked.

### Blocked

`product-warm-red-registered`

Required before product reveal or Scene 15 -> 16 light-swap animation:

- Warm transparent product render.
- Red-light transparent product render.
- Pixel-registered canvas.
- Product usage permission.

`business-output-approved`

Required before public-facing business output animation:

- Approved sales sample.
- Approved video/storyboard sample.
- Approved FAQ or objection-handling sample.
- Claim reviewer sign-off.

`cta-configured`

Required before QRDock becomes real:

- Primary QR asset.
- Short link or registration id.
- Final CTA wording.
- Host, date, privacy, and eligibility copy.

## Next Runtime Package

The next approved animation package should stay narrow:

```text
WP-08B: Expand runtime only if the next target beats do not require blocked
product, business-output, or CTA assets.
```

It must still avoid product reveal, red-light product swap, and final QR
behavior until their asset gates pass.
