import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { productDemoMaterials } from "../src/content/product-prototype";
import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

test("WP-59 FT-03 gives scenes 16-20 a readable safety-to-action path", () => {
  const safety = resolveStageTarget("17.1");
  const review = resolveStageTarget("18.4");
  const confirm = resolveStageTarget("18.7");
  const radar = resolveStageTarget("19.1");
  const action = resolveStageTarget("20.10");

  assert.equal(safety.actors["actor.safety-boundary"].cameraPresence, "featured");
  assert.equal(safety.actors["actor.source-packet"].visible, true);
  assert.equal(safety.world.lightingMode, "safety");

  assert.equal(review.actors["actor.human-review"].cameraPresence, "featured");
  assert.equal(confirm.actors["actor.action-confirm-gate"].cameraPresence, "featured");
  assert.equal(confirm.actors["actor.product-stage"].visible, true);

  assert.equal(radar.actors["actor.scenario-radar"].cameraPresence, "featured");
  assert.equal(action.actors["actor.action-path"].cameraPresence, "featured");
  assert.equal(action.actors["actor.integration-ring"].visible, true);
  assert.equal(action.actors["actor.product-stage"].visible, true);

  [safety, review, confirm, radar, action].forEach((target) => {
    const actors = Object.values(target.actors);
    assert.equal(actors.filter((actor) => actor.cameraPresence === "featured").length, 1, target.beatId);
    assert.ok(actors.filter((actor) => actor.cameraPresence === "support").length <= 2, target.beatId);
    assert.ok(actors.filter((actor) => actor.cameraPresence === "ambient").length <= 1, target.beatId);
    assert.ok(Object.values(target.artifacts).filter((artifact) => artifact.visible).length <= 3, target.beatId);
  });
});

test("WP-59 FT-04 establishes the final pullback loop with placeholder CTA only", () => {
  const finale = resolveStageTarget("21.1");
  const plan = finale.transitionPlan;

  assert.equal(plan?.id, "transition-plan.ft04.finale-pullback-loop");
  assert.equal(plan?.fromBeatId, "20.10");
  assert.equal(plan?.toBeatId, "21.1");
  assert.equal(plan?.model, "legacy-waypoint");
  assert.ok(plan && "waypoints" in plan);
  assert.deepEqual(plan.waypoints.map((waypoint) => waypoint.label), [
    "action-route-complete",
    "loop-begins-to-close",
    "pull-back-to-reveal-loop",
    "establish-final-loop-cta"
  ]);
  assert.equal(finale.actors["actor.cta-dock"].cameraPresence, "featured");
  assert.equal(finale.actors["actor.integration-ring"].visible, true);
  assert.equal(finale.actors["actor.action-path"].visible, true);
  assert.equal(finale.actors["actor.product-stage"].visible, true);
  assert.equal(finale.product.placeholderOnly, true);
  assert.equal(finale.actors["actor.integration-ring"].geometry.role, "final-loop-cta-placeholder");
});

test("WP-59 customer demo actors have audience bodies without engineering labels in review", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const actionPathSource = readFileSync("src/presentation/spatial-lab/ActionPathGreybox.tsx", "utf8");
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(labSource, /function SourcePacketGreybox/);
  assert.match(labSource, /function HumanReviewGreybox/);
  assert.match(labSource, /function ActionConfirmGateGreybox/);
  assert.match(labSource, /function ScenarioRadarGreybox/);
  assert.match(labSource, /function CtaDockGreybox/);
  assert.match(labSource, /二维码待配置/);
  assert.match(labSource, /演示后行动/);
  assert.deepEqual(productDemoMaterials.route.rows, ["资料清单", "场景诊断", "样板计划"]);
  assert.match(labSource, /productDemoMaterials\.route\.rows/);
  assert.match(actionPathSource, /30 分钟/);
  assert.match(runtimeSource, /previousTarget\.beatId === "20\.10" && target\.beatId === "21\.1"/);
  assert.match(runtimeSource, /previousTarget\.beatId === "21\.1" && target\.beatId === "20\.10"/);
  assert.match(cssSource, /\.spatial-lab-cta-dock-geometry/);
  assert.match(cssSource, /\.spatial-lab-scenario-radar-geometry/);
  assert.match(cssSource, /\.action-path-labels/);
  assert.match(cssSource, /\.cta-action-lines/);
  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.artifact-debug-id/);
});

test("WP-59 VP-01 adds customer-facing scene context and premium placeholder product visuals", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(labSource, /function SceneContextLayer/);
  assert.match(labSource, /className="spatial-lab-scene-context"/);
  assert.match(labSource, /product-visual-backplate/);
  assert.match(labSource, /ProductStage renderState="silhouette" variant="route-anchor"/);
  assert.match(cssSource, /\.spatial-lab-scene-context/);
  assert.match(cssSource, /\.product-visual-backplate/);
  assert.match(cssSource, /\.product-visual-glow/);
  assert.doesNotMatch(labSource, /qr\.png|QRCode|真实报名链接/);
});

test("WP-59 VP-02 keeps the freeze headline clear of the product anchor", () => {
  const freeze = resolveStageTarget("15.8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.ok(Math.abs(freeze.camera.x + freeze.actors["actor.product-stage"].x) <= 40);
  assert.ok(freeze.actors["actor.product-stage"].y >= 96);
  assert.match(cssSource, /data-world-motion-state="frozen"[\s\S]*top: 27%/);
});
