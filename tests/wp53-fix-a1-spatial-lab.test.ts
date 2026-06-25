import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { integrationRingSegmentIds } from "../src/presentation/stage/IntegrationRing";

test("WP-53 FIX-A1 renders real greybox bodies inside stable actor wrappers", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const actionPathSource = readFileSync("src/presentation/spatial-lab/ActionPathGreybox.tsx", "utf8");

  assert.match(labSource, /data-stage-actor-id=\{actor\.actorId\}/);
  assert.match(labSource, /geometryId="integration-ring"/);
  assert.match(labSource, /data-actor-geometry="product-stage"/);
  assert.match(actionPathSource, /data-actor-geometry="action-path"/);
  assert.match(labSource, /function IntegrationRingActor/);
  assert.match(labSource, /ProductStage renderState="silhouette" variant="route-anchor"/);
  assert.match(labSource, /ActionPathGreybox/);
});

test("WP-53 FIX-A1.1 uses one shared IntegrationRing geometry source", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const ringSource = readFileSync("src/presentation/stage/IntegrationRing.tsx", "utf8");

  assert.deepEqual(integrationRingSegmentIds, [
    "integration-ring-segment-1",
    "integration-ring-segment-2",
    "integration-ring-segment-3",
    "integration-ring-segment-4",
    "integration-ring-segment-5"
  ]);
  assert.match(ringSource, /export function IntegrationRingGeometry/);
  assert.match(labSource, /IntegrationRingGeometry/);
  assert.doesNotMatch(labSource, /M120 28 A92/);
  assert.doesNotMatch(labSource, /M 120 28 A 92/);
  assert.doesNotMatch(labSource, /spatial-lab-ring-segment/);
});

test("WP-53 FIX-A1.1 reuses the existing ProductStage anchors", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const productSource = readFileSync("src/presentation/stage/ProductStage.tsx", "utf8");

  assert.match(labSource, /import \{ ProductStage \}/);
  assert.match(labSource, /ProductStage renderState="silhouette" variant="route-anchor"/);
  assert.match(productSource, /data-product-id=\{productPrototype\.id\}/);
  assert.match(productSource, /data-anchor-id="productCenter"/);
  assert.match(productSource, /data-anchor-id="valveCore"/);
  assert.match(productSource, /data-anchor-id="railMid"/);
  assert.match(productSource, /data-anchor-id="nozzleDetail"/);
  assert.doesNotMatch(labSource, /spatial-lab-product-rail/);
  assert.doesNotMatch(labSource, /spatial-lab-product-valve/);
  assert.doesNotMatch(labSource, /spatial-lab-product-head/);
  assert.doesNotMatch(labSource, /spatial-lab-product-hand/);
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
  const productionStageSource = readFileSync("src/presentation/spatial-lab/PresentationStageV4.tsx", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(pageSource, /readonly mode\?: string/);
  assert.match(pageSource, /toValidMode/);
  assert.match(stageSource, /PresentationStageV4 as SpatialLabStage/);
  assert.match(productionStageSource, /SpatialLabMode = "review" \| "debug"/);
  assert.match(labSource, /data-lab-mode=\{mode\}/);
  assert.match(labSource, /style=\{initialViewportStyle\(initialTargetRef\.current\)\}/);
  assert.match(labSource, /"--lab-camera-perspective": `\$\{target\.camera\.perspective\}px`/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="review"\]/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="debug"\]/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.spatial-lab-actor-debug/);
});

test("WP-53 FIX-A1.1 keeps geometry actors transparent even when lead", () => {
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(styleSource, /\.spatial-lab-actor\[data-stage-actor-id="actor\.integration-ring"\]\[data-actor-role="lead"\]/);
  assert.match(styleSource, /\.spatial-lab-actor\[data-stage-actor-id="actor\.product-stage"\]\[data-actor-role="lead"\]/);
  assert.match(styleSource, /\.spatial-lab-actor\[data-stage-actor-id="actor\.action-path"\]\[data-actor-role="lead"\]/);
  assert.match(styleSource, /background: transparent/);
  assert.match(styleSource, /border: 0/);
});

test("WP-53 FIX-A1.1 keeps runtime scoped and FIX-A3 owns StageTarget independence", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const targetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");

  assert.match(runtimeSource, /overwrite: "auto"/);
  assert.doesNotMatch(runtimeSource, /fromTo/);
  assert.doesNotMatch(targetSource, /getCameraPoseForBeat/);
  assert.doesNotMatch(targetSource, /getSpatialPoseForActor/);
  assert.doesNotMatch(targetSource, /getRoutePhaseForScene/);
  assert.doesNotMatch(targetSource, /function IntegrationRingActor/);
  assert.doesNotMatch(runtimeSource, /IntegrationRingActor/);
});
