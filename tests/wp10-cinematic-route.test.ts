import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-10 keeps the archived route layer source but no longer mounts it in the main stage", () => {
  const routeSource = readFileSync("src/presentation/stage/CinematicRouteLayer.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(routeSource, /routeSegments/);
  assert.match(routeSource, /id: "opening"/);
  assert.match(routeSource, /id: "product"/);
  assert.match(routeSource, /id: "safety"/);
  assert.match(routeSource, /id: "finale"/);
  assert.doesNotMatch(visualStageSource, /import \{ CinematicRouteLayer \}/);
  assert.doesNotMatch(visualStageSource, /<CinematicRouteLayer resolved=\{resolved\} \/>/);
  assert.doesNotMatch(visualStageSource, /<ScrollNarrativeLayer resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /<SpatialStage resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /<PersistentActorLayer frameKind=\{frameKind\} resolved=\{resolved\} \/>/);
  assert.match(presentationCss, /\.cinematic-route-layer/);
  assert.match(presentationCss, /\.route-map-line-active/);
  assert.match(presentationCss, /\.route-frame-strip/);
});

test("WP-10 keeps asset-gated material as placeholders inside the route layer", () => {
  const routeSource = readFileSync("src/presentation/stage/CinematicRouteLayer.tsx", "utf8");

  assert.match(routeSource, /"产品占位"/);
  assert.match(routeSource, /"CTA 占位"/);
  assert.doesNotMatch(routeSource, /二维码已接入/);
  assert.doesNotMatch(routeSource, /真实产品图/);
});

test("WP-10 keeps archived route motion out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.cinematic-route-layer/);
  assert.doesNotMatch(runtimeSource, /\.route-map-line-active/);
  assert.doesNotMatch(runtimeSource, /\.route-cursor/);
  assert.doesNotMatch(runtimeSource, /prepareRoutePath/);
  assert.doesNotMatch(runtimeSource, /getTotalLength/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
});
