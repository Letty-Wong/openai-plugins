# FT-02-R1 Correction Review Report

Branch: `V4-gate-a-fix`

Base commit before this pass: `610d6f10e8452dc2ab5911926ee76e3cb7cc8a97`

Scope: FT-02-R1 only. No FT-03 work was started.

## Decision State

- `/` remains the V4 production entry.
- `/legacy` was not modified.
- This pass only corrects:
  - `15.8` freeze endpoint.
  - `16.1` safety endpoint.
  - `15.8 -> 16.1` tunnel strength.
- No formal product assets, QR codes, final typography, particles, or business facts were added.

## Corrections

### 15.8 Freeze Endpoint

- `快，还不够。` remains the only main visual headline.
- Ring is reduced to a midground boundary and no longer dominates the title/product stack.
- ProductStage remains the featured business evidence actor.
- Department outputs are arranged as visible output slots:
  - 市场
  - 销售
  - 视频
  - 外贸
  - 客服
- `world.motionState` remains `frozen`.

### 16.1 Safety Endpoint

- `actor.safety-boundary` is now visible and featured.
- The same `actor.integration-ring` remains present with `geometry.role = "safety-boundary"`.
- Safety space has four visible nodes:
  - 资料
  - 工具
  - 内容
  - 权限
- ProductStage remains the same DOM Actor and stays visible as the business evidence anchor.

### Tunnel Strength

- The existing `PoseTransitionRuntime` still owns playback; no second runtime was added.
- The same waypoint plan remains active:
  - `W0 frozen-output`
  - `W1 portal-preview`
  - `W2 approach-ring`
  - `W3 cross-ring-edge`
  - `W4 establish-safety-world`
- `W3` now forces a clear boundary crossing:
  - Ring scale: `3.42`
  - Portal radius: `620`
  - oldWorldOpacity: `0.2`
- Old output artifacts and frozen typography are reduced by `--lab-old-world-opacity` during the safety transition, not only the atmosphere layer.
- Reduced motion still uses the short endpoint path and lands on the clear safety endpoint.

## Evidence

Screenshots:

- `review/spatial-lab/screenshots/ft02-r1/15.8-freeze-1366x768.png`
- `review/spatial-lab/screenshots/ft02-r1/16.1-safety-1366x768.png`
- `review/spatial-lab/screenshots/ft02-r1/15.8-freeze-1920x1080.png`
- `review/spatial-lab/screenshots/ft02-r1/16.1-safety-1920x1080.png`

Recordings:

- `review/spatial-lab/recordings/ft02-r1/forward-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/ft02-r1/backward-16-1-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/ft02-r1/fast-toggle-6x-1366x768.webm`
- `review/spatial-lab/recordings/ft02-r1/reduced-forward-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/ft02-r1/forward-15-8-to-16-1-1920x1080.webm`
- `review/spatial-lab/recordings/ft02-r1/backward-16-1-to-15-8-1920x1080.webm`
- `review/spatial-lab/recordings/ft02-r1/fast-toggle-6x-1920x1080.webm`
- `review/spatial-lab/recordings/ft02-r1/reduced-forward-15-8-to-16-1-1920x1080.webm`

Preview URLs:

- `http://127.0.0.1:3000/?mode=review&beat=15.8`
- `http://127.0.0.1:3000/?mode=review&beat=16.1`
- `http://127.0.0.1:3000/?mode=debug&beat=16.1`

## Validation

Commands to run before handoff:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Known Limits

- This remains graybox spatial proof, not final visual polish.
- Only `15.8 -> 16.1` was corrected.
- FT-03 and later safety chapter beats remain untouched.
