import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-53 FIX-A1 renders real greybox bodies inside stable actor wrappers", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /data-stage-actor-id=\{actor\.actorId\}/);
  assert.match(labSource, /data-actor-geometry="integration-ring"/);
  assert.match(labSource, /data-actor-geometry="product-stage"/);
  assert.match(labSource, /data-actor-geometry="action-path"/);
  assert.match(labSource, /function IntegrationRingActor/);
  assert.match(labSource, /function ProductStageActor/);
  assert.match(labSource, /function ActionPathActor/);
});

test("WP-53 FIX-A1 uses stage-container center coordinates instead of viewport units", () => {
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(styleSource, /--lab-stage-center-x: 50%/);
  assert.match(styleSource, /--lab-stage-center-y: 50%/);
  assert.match(styleSource, /left: var\(--lab-stage-center-x, 50%\)/);
  assert.match(styleSource, /top: var\(--lab-stage-center-y, 50%\)/);
  assert.match(styleSource, /var\(--lab-actor-x, 0px\)/);
  assert.match(styleSource, /var\(--lab-artifact-y, 0px\)/);
  assert.doesNotMatch(styleSource, /50vw/);
  assert.doesNotMatch(styleSource, /42vh/);
});

test("WP-53 FIX-A1 assigns perspective to ScreenViewport and exposes review/debug modes", () => {
  const pageSource = readFileSync("app/spatial-lab/page.tsx", "utf8");
  const stageSource = readFileSync("src/presentation/spatial-lab/SpatialLabStage.tsx", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(pageSource, /readonly mode\?: string/);
  assert.match(pageSource, /toValidMode/);
  assert.match(stageSource, /SpatialLabMode = "review" \| "debug"/);
  assert.match(labSource, /data-lab-mode=\{mode\}/);
  assert.match(labSource, /style=\{viewportStyle\(target\)\}/);
  assert.match(labSource, /"--lab-camera-perspective": `\$\{target\.camera\.perspective\}px`/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="review"\]/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="debug"\]/);
});

test("WP-53 FIX-A1 does not edit StageTarget or PoseTransitionRuntime for transition behavior", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const targetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");

  assert.match(runtimeSource, /return \(\) => context\.revert\(\)/);
  assert.match(runtimeSource, /overwrite: "auto"/);
  assert.match(targetSource, /getCameraPoseForBeat/);
  assert.match(targetSource, /getSpatialPoseForActor/);
  assert.doesNotMatch(targetSource, /IntegrationRingActor/);
  assert.doesNotMatch(runtimeSource, /IntegrationRingActor/);
});
