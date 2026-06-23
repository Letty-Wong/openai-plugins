# Reference Site Analysis: La Revoltosa And NANFU

## Purpose

The current presentation is technically controllable, but it still reads too
much like large-type slide changes. This document records what should be
learned from two reference sites before the next implementation push:

- https://larevoltosa.es/
- https://www.nanfu.global/

The goal is not to copy their brand, assets, code, or exact effects. The goal is
to translate their continuous visual storytelling methods into this project's
presenter-controlled 21-scene AI courseware.

## Reference 1: La Revoltosa

### 2026-06-20 Recheck Notes

The live site confirms the important direction: it is a full brand world, not a
deck. The source shows a custom WordPress theme, `data-barba` page containers,
fixed bubbles, fixed header/scroll cue, custom Teko / Vulf Mono / GT America
font stack, Lenis smooth-scroll CSS hooks, large red/off-white/black tokens,
clipped media, product cards with separate background / illustration / bottle
layers, Vimeo video, and a bottle/storytelling canvas system.

For this courseware, the useful lesson is not the bottle or the brand style. The
useful lesson is that a persistent object and ambient world keep the page alive,
while text becomes a caption layer around the object.

### What The Site Is Doing

La Revoltosa is not just a sequence of page sections. Its homepage is built as a
brand-world performance:

- A persistent fixed header, scroll cue, and animated bubbles keep the site
  feeling alive even before the content changes.
- A large bottle/storytelling section uses a fixed canvas and 3D bottle object.
- Scroll progress scrubs the bottle position, rotation, scale, and text
  displacement instead of simply fading sections in and out.
- Later sections use pinned/sticky products, marquees, large typography, SVG
  waves, product color worlds, video, and a multi-step contact flow.
- Each product or section can have a different color palette, but transitions
  remain anchored by shared typography, red/off-white/black brand color, and the
  persistent bottle/product logic.

### Evidence From The Site

Observed source and resource signals:

- WordPress theme with custom `dist/app.js` and `dist/app.css`.
- GSAP and ScrollTrigger are bundled in the main JavaScript.
- Lenis smooth scrolling is present.
- `data-barba="wrapper"` and page containers indicate page-transition
  architecture.
- Homepage contains `c-storytelling-v2__canvas`.
- The HTML comments explicitly describe a "Storytelling" section with pinned
  SVG, gallery, and marquee.
- Vimeo is embedded as a controlled video block.
- The app JS contains a bottle controller with a fixed canvas, render loop,
  mouse-follow camera, 3D bottle model, and GSAP scroll timelines.
- CSS defines fixed bubbles, fixed scroll indicator, full-viewport bottle
  canvas, sticky/list product sections, clipped media, and large custom type.

### What To Learn

- The audience feels continuity because one hero object remains alive across
  multiple content changes.
- Big type is not the whole experience; it is one layer moving around the
  persistent object.
- Scroll progress acts like a director timeline: the object rotates, text
  leaves, next material arrives, and the world palette changes.
- Product sections work because product identity stays stable while the
  surrounding explanation changes.
- Ambient micro-motion matters: scroll cue, bubbles, marquee, and hover states
  keep the surface from feeling like static slides.

### What Not To Copy

- Do not copy the brand style, bottle concept, SVG artwork, product colors, or
  videos.
- Do not add Three.js/WebGL in the current project stage; project rules still
  require the SVG/DOM/2.5D path to pass first.
- Do not turn presenter mode into normal page scrolling. The courseware must
  remain controlled by keyboard and presenter controls.

## Reference 2: NANFU

### 2026-06-20 Recheck Notes

The English homepage at `https://www.nanfu.global/` was inspected directly. It
uses a product-performance structure: full-viewport video, 120-frame banner
canvas, `data-vh` timing sections, `data-speed` parallax offsets, Swiper tabs,
product carousels, technology video blocks, annotation chunks, a history
timeline, and a 150-frame battery canvas.

For this courseware, the useful lesson is that claims feel more credible when
they orbit the same visible product or route. The current placeholder product
cannot yet reach NANFU-level product polish, but the stage can already behave
more like an object being explained than like slides being replaced.

### What The Site Is Doing

NANFU is a product-performance story. Its page structure is closer to a product
launch microsite:

- The first screen combines video/canvas sequence, product claim, proof note,
  and "scroll to explore" guidance.
- Long sections are declared with viewport-height multipliers such as
  `data-vh="2.3"` and `data-vh="3.5"`, making the scroll distance part of the
  story timing.
- Text and proof blocks use `data-speed` parallax offsets.
- The product proof section uses tab/swiper mechanics for the three reasons to
  choose NANFU.
- The products section uses a carousel/swiper rhythm.
- The Power Ring technology section combines product imagery, intro video,
  loop video, and fixed annotation chunks.
- The history section uses a horizontal process/timeline and a canvas sequence
  named `batteryCv` with 150 frames.

### Evidence From The Site

Observed source and resource signals:

- The English homepage includes `/templates/assets/home/media.webm`,
  `/templates/assets/home/media.mp4`, `bannerCv`, and a 120-frame banner canvas.
- The homepage includes `data-vh`, `data-speed`, `swiper-wrapper`,
  `data-swiper-parallax`, `Power Ring` / `Aro de Poder` sections, and
  `batteryCv` with 150 frames.
- The JS includes GSAP ScrollTrigger-style timelines, Lenis-like request
  animation frame scrolling, Swiper behavior, scroll progress frame updates, and
  horizontal process translation.

### What To Learn

- A technical product story should not be built as separate claims. It should
  behave as one physical object being explained layer by layer.
- Proof, product, technology, and history are separated into distinct worlds,
  but connected by persistent product imagery and synchronized scroll progress.
- Frame sequences are powerful because they make a product or object feel
  continuously transformed, not swapped.
- The timeline works because the years move horizontally while the product
  frame sequence gives the center object temporal continuity.

### What Not To Copy

- Do not copy NANFU claims, performance numbers, battery visuals, Power Ring
  concept, or product motion.
- Do not introduce unapproved business claims into the AI courseware.
- Do not add real product reveal or QR motion until the corresponding asset
  gates pass.

## Translation To This Courseware

The current courseware must stop feeling like independent slides. The next push
should make it feel like one continuous stage with five persistent visual
systems:

1. `IntegrationRing`: the main continuity object from opening question to final
   capability loop.
2. `ProductStage`: the same product placeholder from scene 08.7 through scene
   21, replaced later only when approved product assets arrive.
3. `StorySpine`: a visible continuous route through 21 scenes and 144 beats.
4. `WorldPalette`: controlled color/world shifts between judgement, product,
   safety, action, and finale sections.
5. `ArtifactTrail`: generated outputs, gates, scenario nodes, and milestones
   remain attached to the same route instead of appearing as isolated cards.

## Recommended Next Work Package: WP-09

### Name

Continuous Storytelling Prototype

### Goal

Move the experience from "large text slides with some animations" toward a
continuous presenter-controlled visual journey inspired by La Revoltosa and
NANFU.

### Scope

- Keep presenter mode keyboard/controls driven.
- Do not add browser scroll control as the primary navigation model.
- Use GSAP only; do not add Framer Motion, Three.js, or WebGL.
- Add a global continuity layer mounted inside `VisualStage`.
- Animate transitions for all Beat changes using the existing
  `transitionPreset` values.
- Keep runtime scoped to `.visual-stage` and clean up on Beat changes.
- Add a visible `StorySpine` / route layer showing where the current Beat sits
  inside the full 21-scene journey.
- Add continuous world shifts:
  - judgement world
  - ledger world
  - product world
  - safety world
  - action/finale world
- Keep missing product and CTA assets as placeholders.

### First Visual Targets

1. Opening path:
   `01.1 -> 02.4 -> 03.5 -> 05.1`

   The ring should feel like it is being carried forward, not recreated.

2. Product path:
   `08.7 -> 09.2 -> 10.4 -> 11.6`

   Product placeholder should hold identity while source facts and benefit
   translation move around it.

3. Safety path:
   `15.8 -> 16.3 -> 18.7 -> 18.8`

   Generated output, safety boundary, human review, and action gate should feel
   like connected checkpoints.

4. Finale path:
   `19.7 -> 20.10 -> 21.8`

   Scenario radar should unfold into route, then route should close into
   capability loop and CTA placeholder.

### Acceptance

- Moving forward/backward no longer feels like hard PPT replacement.
- The stage has a visible journey spine or route.
- At least the four target paths above show object continuity.
- Missing assets remain placeholders.
- Reduced motion still preserves logic with simplified transitions.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass.
- Browser review checks `1366 x 768` and `1920 x 1080`.

## Planning Decision

The next implementation should be bolder than WP-08A. WP-08A proved that scoped
GSAP can run safely. WP-09 should use that safety to build the missing
continuous visual language.

The important constraint is this:

```text
The experience may feel scroll-like, but presenter mode must not become scroll-driven.
```

That means the implementation should use Beat navigation as the timeline
driver, while borrowing the visual grammar of scroll storytelling.
