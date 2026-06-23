# WP-00 Repository Audit

Date: 2026-06-19

## Scope

This audit was performed for `WP-00 | 仓库审计`. No production code, dependencies,
routes, pages, animation code, or assets were added or modified.

Inputs reviewed:

- Repository root: `/Users/macbook/Documents/前端`
- In-repository handoff/spec package: `/Users/macbook/Documents/前端/AI演示网页_规划交付包_V1`
- Delivery package: `/Users/macbook/Downloads/AI演示网页_规划交付包_V1.zip`
- Package files in the delivery package:
  - `README.md`
  - `01_21幕视觉分镜规格_V1_总版.md`
  - `02_Codex落地路线图_V1.md`
  - `03_AI演示网页_设计基线_V1.md`
  - `04_花洒产品演示_素材与内容准备清单_V1.md`
  - `05_花洒产品资料采集表_V1.md`
  - `source/22-第一节课V3_讲师逐字稿.html`
  - `archive/21幕视觉分镜规格_V1_第一批_01-04.md`
  - `archive/21幕视觉分镜规格_V1_第二批_05-08.md`
  - `archive/21幕视觉分镜规格_V1_第三批_09-16.md`
  - `archive/21幕视觉分镜规格_V1_第四批_17-21.md`

Per the delivery package README, the master scene specification is the authority
when archive files conflict with the merged total version.

## Current Repository State

The repository is currently a Git repository on branch `main` with no commits.
It contains planning/specification files but no implemented web application.

Detected files:

- `.git/`
- `.DS_Store` untracked local filesystem metadata
- `AI演示网页_规划交付包_V1/` untracked handoff/spec package
- `docs/repo-audit.md` added by this WP-00 task

Not detected:

- `AGENTS.md`
- `README.md`
- `package.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `package-lock.json`
- `bun.lockb`
- `src/`, `app/`, `pages/`, `public/`, `tests/`
- `tsconfig.json`
- `next.config.*`, `vite.config.*`, `nuxt.config.*`
- `tailwind.config.*`
- CI configuration

## 1. Current Stack And Versions

No implemented application stack is present in the repository.

| Area | Current repository finding | Version |
| --- | --- | --- |
| Framework | None detected | N/A |
| Language | None detected | N/A |
| Package manager | None detected; no manifest or lockfile | N/A |
| Router | None detected | N/A |
| Styling | None detected | N/A |
| Animation | None detected | N/A |
| Testing | None detected | N/A |
| Build system | None detected | N/A |
| Asset pipeline | None detected | N/A |

The delivery package target direction is **Next.js + TypeScript + GSAP + SVG +
DOM + 2.5D product images**, but this is not yet implemented in the repository.
WP-01 or a later approved setup task must establish the actual stack before any
production implementation begins.

## 2. Existing Useful Components And Conflicts

### Useful Existing Components

No source components, routes, styles, animation helpers, test utilities, or asset
registries currently exist in the repository.

Useful planning assets exist in the in-repository handoff/spec package and the
matching external delivery package:

- Locked 21 Scene / 144 Beat structure.
- Scene IDs fixed as `scene-01` through `scene-21`.
- Q&A defined as a Scene 21 submode, not Scene 22.
- Master constraints for `IntegrationRing`, `ProductStage`, `SourcePacket`,
  `ContentShell`, `OutputCards`, `SafetyBoundary`, `ScenarioRadar`,
  `ActionPath`, `CapabilityLoop`, and `QRDock`.
- Content status vocabulary: `VERIFIED`, `APPROVED`, `PLACEHOLDER`,
  `DO_NOT_USE`.
- Asset and product-data requirements for the shower product demonstration.

### Conflicts And Gaps

- The roadmap expects existing package manifests and app structure to audit, but
  the repository has none.
- No package manager can be identified. Do not assume `pnpm`, `npm`, `yarn`, or
  `bun`.
- No route convention exists yet. The roadmap suggests `src/app` with Next.js
  App Router, but this remains only a proposed target.
- No styling convention exists yet. The specifications call for CSS tokens,
  semantic HTML, SVG, DOM layers, masks, and reduced-motion styles, but no CSS
  files exist.
- No animation convention exists yet. The specifications target GSAP and
  absolute target states, but GSAP is not installed and no animation cleanup
  patterns exist.
- No test, e2e, screenshot, typecheck, lint, or production build commands exist.
- No local asset convention exists yet. The roadmap proposes
  `public/presentation/...`, but the repository does not contain `public/`.
- No `AGENTS.md` exists yet, so the non-negotiable architecture rules from the
  roadmap have not been committed into the repo.
- No `docs/scene-spec-master.md` exists yet. The authoritative master spec is
  present only as a handoff file under `AI演示网页_规划交付包_V1/`, not at the
  stable docs path expected by later work packages.

## 3. Proposed Minimal File Changes

For WP-00, the only file change is:

- Add `docs/repo-audit.md`.

Recommended next minimal changes for WP-01, after human approval:

- Add `AGENTS.md` with the architecture, visual, content, technical, and
  validation rules from the roadmap.
- Add the planning documents into stable repo paths, likely:
  - `docs/design-baseline.md`
  - `docs/scene-spec-master.md`
  - `docs/asset-manifest.md`
  - `docs/content-status.md`
  - `docs/implementation-log.md`
- Establish one package manager and commit its manifest/lockfile.
- If no existing app is supplied before WP-01, choose and scaffold the approved
  target stack explicitly instead of pretending it was already present.

Do not implement pages, animation, scene data, or assets during WP-01 unless the
approved work package explicitly expands scope.

## 4. Exact Commands For Validation

Because no package manager, manifest, scripts, framework, or tests exist, the
current repository has no runnable validation commands for application code.

| Validation need | Current exact command | Status |
| --- | --- | --- |
| Lint | N/A | No `package.json` or lint tool exists |
| Typecheck | N/A | No TypeScript config or package scripts exist |
| Unit tests | N/A | No test framework or tests exist |
| E2E tests | N/A | No e2e framework or app entry exists |
| Production build | N/A | No build tool or package scripts exist |

Commands used for this audit:

```sh
pwd
rg --files -g '*规格*' -g '*spec*' -g '*SPEC*' -g '*README*' -g '*readme*' -g '*交接*' -g '*提示词*' -g 'package.json' -g 'pnpm-lock.yaml' -g 'yarn.lock' -g 'package-lock.json' -g 'vite.config.*' -g 'next.config.*' -g 'nuxt.config.*' -g 'tailwind.config.*' -g 'tsconfig*.json' -g 'src/**' -g 'app/**' -g 'pages/**' -g 'docs/**'
unzip -l /Users/macbook/Downloads/AI演示网页_规划交付包_V1.zip
bsdtar -tf /Users/macbook/Downloads/AI演示网页_规划交付包_V1.zip
git status --short --branch
git ls-files
find . -maxdepth 3 -type f \( -iname '*spec*' -o -iname '*规格*' -o -iname '*交接*' -o -iname '*提示词*' -o -iname 'README*' \) -print
find . -maxdepth 4 -type f \( -iname '*spec*' -o -iname '*规格*' -o -iname '*交接*' -o -iname '*提示词*' -o -iname 'README*' -o -iname '*路线图*' -o -iname '*基线*' -o -iname '*清单*' -o -iname '*采集表*' \) -print
```

After WP-01 establishes a package manager, validation should be expressed through
repository scripts with stable names equivalent to:

```sh
<package-manager> run lint
<package-manager> run typecheck
<package-manager> run test
<package-manager> run test:e2e
<package-manager> run build
```

The actual package manager placeholder above must be replaced only after a
manifest and lockfile exist.

## 5. Risks For The Full Presentation

### Full-Screen Keyboard Presentation

- No router or controller exists yet, so there is no state model for Scene,
  Beat, Q&A submode, notes, CTA selection, fullscreen, reduced motion, or reset.
- Fast repeated keyboard input must be queued or reconciled to the latest
  intent; otherwise shared objects can leave stale states.
- Browser fullscreen can fail or exit unexpectedly, so controls need a visible
  fallback.
- Presentation mode must be keyboard/control driven, not scroll driven.

### SVG Morphing And Shared Geometry

- The project requires one `IntegrationRing` identity across Scene 01 through
  Scene 21, with derived roles for ledger, safety boundary, radar, action path,
  and capability loop.
- If each Scene creates separate SVGs, the required continuous-object illusion
  will break.
- Geometry should use stable path IDs and absolute target states. Accumulated
  transforms will make reverse navigation and direct jumps unreliable.
- Complex morphs need reduced-motion equivalents that preserve the narrative
  state without long movement.

### Offline Assets

- No `public/` structure or asset manifest exists.
- Product assets must be local, explicitly dimensioned, and predecoded for risky
  transitions such as Scene 08 -> 09 and Scene 15 -> 16.
- QR codes must be local/static or have explicit placeholders. Random or remote
  generated QR codes are forbidden when final links are missing.
- Images need fallbacks and stable dimensions to avoid layout shift during a live
  presentation.

### State Restoration

- The master spec requires refresh recovery for Scene, Beat, notes, Q&A, CTA,
  reduced motion, and key safety/content states.
- Direct jumps to any Beat must establish the absolute target state without
  replaying the whole history.
- Scene 21 Q&A must preserve `returnState` and restore Scene 21.8 exactly on
  exit.
- Timers, QR state, content approval, execution authorization, and safety gates
  must not be inferred from animation progress.

### Screenshot And Visual Regression Testing

- No app or e2e tooling exists yet, so screenshot testing cannot currently run.
- Required viewports include at least 1920x1080 and 1366x768, plus reduced
  motion and offline conditions.
- Canvas/SVG/DOM animation states must be testable at stable Beat endpoints, not
  only during transitions.
- QR readability, title overlap, product continuity, and object persistence need
  screenshot assertions or review gates.

## 6. Build And Resource Conventions To Establish Later

The specifications imply these conventions, but none are implemented yet:

- `src/app` for the presentation entry and later browse mode if Next.js is
  approved.
- `src/presentation` for shell, controller, state resolver, stage layers, shared
  geometry, presenter HUD, and scenes.
- `src/content` for scene, beat, notes, product facts, output cards, safety,
  milestones, Q&A, and CTA configuration.
- `src/styles` for tokens, typography, presentation layout, and reduced motion.
- `public/presentation` for local product, parts, outputs, textures, QR, and font
  assets.
- `tests/unit`, `tests/integration`, and `tests/e2e` once tooling exists.

These are proposed by the roadmap and should be adapted only after confirming
the actual app framework and package manager.

## 7. WP-00 Conclusion

The repository contains the handoff/specification package, but it is not yet an
application. There is no existing framework, package manager, router, styling
system, animation setup, test setup, build setup, CI, or application asset
convention to preserve.

The next approved work package should first commit the project contract and
source specifications, then deliberately establish the package manager and
minimal validation commands before any scene implementation or animation work.
