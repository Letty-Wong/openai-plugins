# Project Objective

Build an original full-screen presenter-controlled web experience with 21 scenes
and 144 beats. The source manuscript provides speaker meaning; the master scene
specification controls visual and interaction behavior.

# Non-Negotiable Architecture

- Scene ids are `scene-01` through `scene-21`.
- Beat ids are stable and data-driven.
- Use absolute target states; never accumulate transforms from click history.
- Keep one `IntegrationRing` geometry identity across all scenes.
- Keep one `ProductStage` from scene 08.7 through scene 21.
- Keep artifact ids stable across shared-element transitions.
- Q&A is a submode of scene 21, not scene 22.
- Presenter Mode is the primary mode.
- Presentation mode is keyboard/controls driven, not scroll-position driven.
- Mouse wheel and trackpad input may trigger one discrete previous/next Beat cue
  after a threshold; they must never map `scrollY` to Scene or Beat indexes.
- All readable content remains semantic HTML.
- Scene and Beat are state/cue data, not full-page scroll sections.

# Visual Constraints

- Use near-black, warm paper, signal red, and metal gray.
- Do not use blue-purple AI gradients, robot imagery, code rain, platform-logo
  walls, generic lock/shield icon grids, or default full-screen fades.
- Use only the five transition families defined in the master specification.
- Use one primary movement, one supporting movement, and one optional ambient
  loop per beat.
- Do not solve continuity by adding more visual helper layers. The audience
  stage should converge to Background/Atmosphere, WorldCamera,
  PersistentActors, CopyLayer, and PresenterControls.
- Do not render previous/current/next Scene as independent full-page bodies in
  the audience main stage.
- Do not continue the WP-22/WP-23/WP-26/WP-27 page-chain direction as the final
  visual architecture: `scroll-continuum-shell`, neighboring Scene peeks,
  `scroll-flow-field`, and `scroll-curtain-field` are legacy/reference layers
  until explicitly reapproved.
- Do not solve the remaining PPT feeling by adding page stacks, helper
  curtains, flow fields, parallel scroll worlds, or another continuity layer.
  Correctness must come from actor identity, absolute poses, camera movement,
  depth, occlusion, and function changes inside one space.
- The intended final spatial route is: Scene 01-08 vertical down; Scene 08-09
  turns into one horizontal product journey; Scene 15-16 moves forward through
  the ring on the Z axis; Scene 16-20 returns to vertical down; Scene 20-21
  pulls backward on the Z axis to reveal the complete loop.
- Do not use vertical upward travel as a macro route.
- Only three major spatial transitions are allowed in V1: Scene 08 to 09,
  Scene 15 to 16, and Scene 20 to 21.
- Do not treat all 144 Beats as 144 spatial pushes. Most Beats should be
  stable observation or actor emphasis, not camera travel.

# Content Integrity

- Content status is `VERIFIED`, `APPROVED`, `PLACEHOLDER`, or `DO_NOT_USE`.
- Never invent MOQ, price, lead time, warranty, certifications, performance
  figures, diagnostic scores, availability, dates, or seat counts.
- Content approval and execution authorization are separate states.
- Demo data must be public, fictional, or anonymized.

# Technical Constraints

- V1 uses SVG, DOM, CSS masks, and GSAP.
- Do not add Three.js/WebGL until the full 2.5D path passes acceptance.
- Do not add smooth scrolling to presentation mode.
- Do not map browser scroll position, `scrollY`, intersection observers, or a
  scroll timeline to the 144 Beat state.
- Do not create one timeline that owns the entire site.
- Every animation scope must clean up on unmount and on navigation interruption.
- One transform, opacity, or CSS custom property must have exactly one runtime
  owner. Maintain a property ownership table before adding or expanding runtime
  animation.
- Camera and actor motion must be expressed as absolute poses, not accumulated
  deltas.
- Pose data may feed CSS custom properties, but a component or runtime must not
  also write the same transform/opacity property without being declared as the
  owner.
- Images must have local fallbacks and explicit dimensions.
- The full presentation must work offline after assets are loaded locally.

# Spatial Continuity Contract

- Continuity means one coordinate system, one camera, and persistent actors
  changing pose, depth, occlusion, and function. It does not mean chaining
  separate full-page Scene panels.
- Scene is lighting, composition, depth, and cue context. Beat is a director cue.
  Neither should create a new page body in the audience stage.
- Keep `docs/spatial-motion-bible.md` and `docs/actor-identity-v3.md` as the
  planning contracts before implementing new spatial motion.
- Add `CameraPose`, persistent actor poses, and Beat movement kind contracts
  before implementing new spatial motion in production code.
- Beat movement kinds are:
  - `stable`: camera holds; text or emphasis changes only. Target share: 60-70%.
  - `actor`: camera mostly holds; actors move, morph, or change emphasis.
    Target share: 20-30%.
  - `spatial`: the global route, camera, or depth meaningfully changes. Target
    share: about 10%.
- `IntegrationRing` is the global continuity actor. Ledger, capability core,
  product gate, translation gate, safety boundary, scenario radar, action
  route, and final loop are roles/poses of the same ring unless an approved
  package explicitly separates them.
- `ProductStage` is one persistent actor from `08.7` through Scene 21. It may
  shrink, dim, be occluded, or become an anchor, but it must not be recreated as
  a new product reveal in each section.
- Product information, facts, benefit cards, and business outputs should
  converge into one `ArtifactSystem` with stable artifact ids.
- `HumanReviewNode`, `ActionConfirmGate`, `CtaDock`, and PresenterControls may
  remain independent business/control actors.
- `stage.scroll-world`, `scroll-continuum-shell`, neighboring Scene peeks,
  `scroll-flow-field`, and `scroll-curtain-field` are not final continuity
  actors. They are temporary graybox/reference layers until `SpatialStage` and
  `WorldCamera` replace the page-chain visual model.

# Stage Actor Discipline

- Define actors before arranging scenes. Each persistent actor needs one body,
  one entrance, one exit, and continuous poses while visible across consecutive
  Beats.
- A visible actor may not enter twice without an exit, and may not exit without
  first being visible.
- If two objects are visually and semantically the same, prefer one actor with a
  new role/pose over two separate actors handing off through opacity.
- Shared artifacts must keep stable artifact ids across product facts, benefit
  translation, output examples, and action materials.
- The stage should still read as the same world when colors, textures, and final
  typography are disabled.

# Correction Gates

- Gate 2, the next human-review milestone, is the three key transition graybox:
  Scene 08 to 09, Scene 15 to 16, and Scene 20 to 21.
- Before advancing beyond Gate 2, provide 1366x768 and 1920x1080 evidence,
  forward and backward operation, fast repeated input, reduced-motion evidence,
  current top-level DOM layers, persistent actor identity status, validation
  command results, known risks, and the next proposed work package.
- Do not proceed into full 21-Scene visual production, final typography,
  texture polish, true product assets, or formal CTA replacement until the user
  accepts the graybox direction.

# Current Baseline Boundary

- This repository has passed through WP-31R and now has a first
  `SpatialStage` / `WorldCamera` graybox plus typed spatial pose contracts.
- Preserve the valuable baseline: Scene/Beat data, presenter controls,
  Q&A/state recovery, reduced motion, asset gates, actor lifecycle tests, and
  `PersistentActorLayer`.
- Stop strengthening the page-chain scroll layers. `ScrollNarrativeLayer`,
  `scroll-continuum-shell`, neighboring Scene peeks, `scroll-flow-field`, and
  `scroll-curtain-field` must not be mounted back into the audience main stage
  unless a later approved work package explicitly reverses WP-30R.
- `CameraPose`, `SpatialPose`, and Beat movement kinds now live in
  `src/presentation/stage/spatial-poses.ts`. Future work should apply those
  poses to actor layout, prove the three key graybox transitions, and continue
  reducing legacy page-chain CSS.
- Do not implement real product assets, QR codes, or business facts until the
  matching material gate is approved.

# Validation

Use npm and run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Later presentation work must also validate at 1920x1080 and 1366x768, with
reduced motion and offline mode.
