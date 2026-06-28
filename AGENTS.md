# Codex Execution Constitution V1

This file is the highest-priority project contract for this repository. When an
older planning document, implementation note, test name, or visual habit
conflicts with this constitution, this file wins.

## 0. Supreme Objective

Build a continuous spatial narrative system with:

- one world;
- one camera;
- one primary visual anchor per Beat.

The system is no longer an animation system. It is a spatial generation system.
Any implementation that pulls the project back toward slide-by-slide animation,
page stacks, object piles, helper curtains, or repeated component entrances must
be overwritten or removed.

## 1. Core Spatial Rules

### 1.1 Camera-Only Principle

Camera is the only source of spatial change.

- Only camera and WorldField may change the audience's sense of space.
- Actors, artifacts, and the ring may change pose, role, emphasis, or geometry
  state, but they must not drive the global space.
- The audience should understand movement through camera projection, depth,
  focus, compression, and world field changes, not through objects pushing the
  whole composition around.

Forbidden:

- actor-driven screen travel that pretends to be spatial travel;
- ring-driven viewpoint change;
- artifact-driven global layout change;
- using object movement to fake a new space.

### 1.2 Primary Anchor Principle

Each Beat has exactly one Primary Anchor.

```ts
type PrimaryAnchor = {
  id: string;
  type: "camera" | "actor" | "artifact" | "world";
};
```

Required anchor map:

- Scene 01-08: `IntegrationRing`
- Scene 09-15: `ProductStage`
- Beat `15.8`: `Frozen World`, not any single actor
- Beat `16.1`: `Safety Volume`, the space itself
- Scene 17-21: `Action / Closure Field`

Forbidden:

- multiple main characters in one Beat;
- parallel equal-weight visual centers;
- every visible object using the same visual weight.

### 1.3 World Field Principle

The world is a spatial structure, not a collection of objects.

```ts
type WorldField = {
  depth: number;
  compression: number;
  tone: "dark" | "paper";
  spatialDensity: number;
  motionState: "active" | "frozen" | "portal" | "settled";
};
```

Rules:

- Actors are results inside the world field.
- WorldField controls density, compression, tone, and stillness.
- Space must not be created by stacking UI cards or semi-transparent objects.

## 2. FT System Definition

FT is not an animation sequence. FT is a spatial state transition system.

The wrong model is:

```text
FT = waypoint animation frames
```

The correct model is:

```text
FT = space state conversion
```

### 2.1 FT-02 Standard Model

FT-02 must be modeled as five spatial states:

- `W0 = Freeze Field`
- `W1 = Portal Emergence`
- `W2 = Approach Field`
- `W3 = Boundary Crossing`
- `W4 = Stabilized Field`

Each waypoint is a space state, not a decorative animation frame.

```ts
type SpatialWaypoint = {
  spaceState: string;
  cameraState: string;
  worldField: WorldField;
  actorState: string;
};
```

Every waypoint must define:

- near / mid / far depth roles;
- spatial density change;
- world tone change;
- camera focus change.

Forbidden:

- using scale as the main proof of spatial travel;
- using fade as the main proof of world switching;
- using object movement to fake the tunnel;
- single transform chains that have no readable still-frame space relation.

## 3. 15.8 / 16.1 Spatial Semantics

### 3.1 Beat 15.8 Is A Frozen Compression State

Beat `15.8` is not the end of an animation. It is spatial compression.

Required structure:

- primary anchor: the frozen headline / Frozen World;
- product: secondary evidence anchor;
- artifacts: compressed into the lower system layer;
- ring: boundary, not protagonist.

Required reading:

- information compression;
- visual convergence;
- spatial stillness.

### 3.2 Beat 16.1 Is A Spatial Entry State

Beat `16.1` is not a new page. It is entering another spatial volume.

Required structure:

- ring: boundary object;
- safety nodes: spatial structure;
- product: evidence anchor, not protagonist;
- world: safety field.

## 4. Actor System Rules

### 4.1 Visibility Budget

For each Beat:

- `featured = 1`
- `support <= 2`
- `ambient <= 1`
- `latent = all other persistent actors`

### 4.2 No Empty Actors

If an actor has no geometry, it must not be visible.

### 4.3 Actors Belong To Space

An actor is not a UI card and not a page component. An actor is an object inside
the world coordinate system.

Persistent actors need:

- one body;
- one entrance;
- one exit;
- continuous poses while visible across consecutive Beats.

A visible actor may not enter twice without an exit, and may not exit without
first being visible.

## 5. Artifact System Rules

Artifact is one entity with multiple forms, not a collection of cards.

Mode changes must be morphology changes inside one stable shell:

| Mode | Spatial Expression |
| --- | --- |
| `source` | data structure |
| `benefit` | compressed structure |
| `poster` | vertical expansion |
| `storyboard` | horizontal slices |
| `email-faq` | two-column structure |
| `department-output` | multi-node structure |

Forbidden:

- `mode = new component`;
- `mode = new DOM tree`;
- replacing a stable artifact with a visually similar copy.

Required:

- the same artifact shell changes shape;
- artifact ids stay stable through product facts, benefit translation, output
  examples, and action materials.

## 6. Camera System Rules

Camera is the narrative engine and the only spatial grammar.

Camera must support:

- `position`;
- `depth`;
- `rotation`;
- `focusActorId`.

Camera and actor motion must be expressed as absolute poses, never accumulated
deltas from click history.

## 7. Rendering Rules

### 7.1 No Layer-Stack UI

Forbidden:

- multiple semi-transparent UI bodies stacked as space;
- multiple titles at the same time;
- multiple center points;
- previous/current/next Scene rendered as independent full-page bodies.

### 7.2 One Visual Center

Every frame must have exactly one visual center.

If a still frame without animation cannot express the spatial relationship, the
implementation is wrong.

## 8. Debug And Review Rules

Review mode:

- displays only the spatial result;
- hides actor ids;
- hides pose information;
- hides engineering labels and internal scene names.

Debug mode:

- may show system information;
- may show beat id, actor id, pose, and ownership data;
- must not be used as visual acceptance evidence.

## 9. Execution Order

Phase 1 must happen before later visual production:

- Primary Anchor system;
- Camera-only system;
- WorldField ownership.

Phase 2:

- unified Artifact shell;
- actor visibility budget system.

Phase 3:

- FT-02 spatial rewrite;
- waypoint data becomes spatial state data.

Phase 4:

- rebuild `15.8` and `16.1`;
- remove remaining PPT structure.

Phase 5:

- 21-Scene spatial verification;
- continuity tests.

## 10. Stable Project Constraints

- Scene ids are `scene-01` through `scene-21`.
- Beat ids are stable and data-driven.
- Q&A is a submode of scene 21, not scene 22.
- Presenter Mode is the primary mode.
- Presentation mode is keyboard/controls driven, not scroll-position driven.
- Mouse wheel and trackpad input may trigger one discrete previous/next Beat cue
  after a threshold; they must never map `scrollY` to Scene or Beat indexes.
- All readable content remains semantic HTML.
- Scene and Beat are state/cue data, not full-page scroll sections.
- Use near-black, warm paper, signal red, and metal gray.
- Do not use blue-purple AI gradients, robot imagery, code rain,
  platform-logo walls, generic lock/shield icon grids, or default full-screen
  fades.
- Macro camera route:
  - Scene 01-08 vertical down.
  - Scene 08-09 turns into one horizontal product journey.
  - Scene 15-16 moves forward through the ring on the Z axis.
  - Scene 16-20 returns to vertical down.
  - Scene 20-21 pulls backward on the Z axis to reveal the complete loop.
- Do not use vertical upward travel as a macro route.
- Only three major spatial transitions are allowed in V1: Scene 08 to 09,
  Scene 15 to 16, and Scene 20 to 21.
- Do not treat all 144 Beats as 144 spatial pushes. Most Beats should be stable
  observation or actor emphasis, not camera travel.
- V1 uses SVG, DOM, CSS masks, and GSAP.
- Do not add Three.js/WebGL until the full 2.5D path passes acceptance.
- Do not add smooth scrolling to presentation mode.
- Do not map browser scroll position, `scrollY`, intersection observers, or a
  scroll timeline to the 144 Beat state.
- Do not create one timeline that owns the entire site.
- Every animation scope must clean up on unmount and on navigation
  interruption.
- One transform, opacity, or CSS custom property must have exactly one runtime
  owner. Maintain a property ownership table before adding or expanding runtime
  animation.
- Pose data may feed CSS custom properties, but a component or runtime must not
  also write the same transform/opacity property without being declared as the
  owner.
- Images must have local fallbacks and explicit dimensions.
- The full presentation must work offline after assets are loaded locally.

## 11. Persistent Identity

- Keep one `IntegrationRing` geometry identity across all scenes.
- `IntegrationRing` is the global continuity actor.
- `IntegrationRing` may act as ledger, capability core, product gate,
  translation gate, safety boundary, scenario radar, action route, or final
  loop only through role/pose changes unless an approved package explicitly
  separates it.
- Keep one `ProductStage` from beat `08.7` through scene 21.
- `ProductStage` may shrink, dim, be occluded, or become an anchor, but it must
  not be recreated as a new product reveal in each section.
- `HumanReviewNode`, `ActionConfirmGate`, `CtaDock`, and PresenterControls may
  remain independent business/control actors.
- `ArtifactSystem` is the only approved direction for product information,
  facts, benefit cards, business outputs, and action materials.
- If two objects are visually and semantically the same, prefer one actor with
  a new role/pose over two separate actors handing off through opacity.
- The stage should still read as the same world when colors, textures, final
  typography, and runtime animation are disabled.

## 12. Legacy Boundary

- `/` is the V4 presentation stage.
- `/legacy` is retained only as a backup of the old implementation.
- Do not continue strengthening old `PresentationShell`, old `VisualStage`, or
  page-chain visual layers.
- Stop strengthening the page-chain scroll layers.
- `stage.scroll-world`, `ScrollNarrativeLayer`, `scroll-continuum-shell`,
  neighboring Scene peeks, `scroll-flow-field`, and `scroll-curtain-field` are
  not final continuity actors and must not be remounted into the main audience
  stage unless a later approved package explicitly reverses this constitution.
- Keep `docs/spatial-motion-bible.md` and `docs/actor-identity-v3.md` as
  historical planning contracts, but this constitution is now the higher-level
  execution contract when conflicts exist.

## 13. Content Integrity

- Content status is `VERIFIED`, `APPROVED`, `PLACEHOLDER`, or `DO_NOT_USE`.
- Never invent MOQ, price, lead time, warranty, certifications, performance
  figures, diagnostic scores, availability, dates, seat counts, QR codes, or
  real business links.
- Content approval and execution authorization are separate states.
- Demo data must be public, fictional, or anonymized.
- Do not implement real product assets, QR codes, or business facts until the
  matching material gate is approved.

## 14. Validation

Use npm and run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Presentation work must also validate at 1920x1080 and 1366x768, with reduced
motion and offline mode when the work package changes runtime or visual output.
