import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

test("WP-58 FT-02 defines five spatial states instead of waypoint durations", () => {
  const portal = resolveStageTarget("16.1");
  const plan = portal.transitionPlan;

  assert.equal(plan?.id, "transition-plan.ft02.forward-safety-portal");
  assert.equal(plan?.model, "spatial-state");
  assert.ok(plan && "states" in plan);
  assert.deepEqual(plan.states.map((state) => state.id), [
    "state.ft02.A.frozen-compression-field",
    "state.ft02.B.portal-emergence-field",
    "state.ft02.C.boundary-approach-field",
    "state.ft02.D.boundary-crossing-field",
    "state.ft02.E.safety-field-stable"
  ]);
  plan.states.forEach((state) => {
    assert.equal(typeof state.camera.x, "number", state.id);
    assert.equal(state.actors["actor.integration-ring"].actorId, "actor.integration-ring", state.id);
    assert.equal(state.actors["actor.product-stage"].actorId, "actor.product-stage", state.id);
    assert.equal(state.ring, state.actors["actor.integration-ring"].geometry, state.id);
    assert.ok(state.primaryAnchor.id.length > 0, state.id);
    assert.equal("duration" in state, false, state.id);
  });
});

test("WP-58 FT-02 creates a real portal preview and parallax depth", () => {
  const plan = resolveStageTarget("16.1").transitionPlan;
  assert.ok(plan && "states" in plan);

  const [frozen, preview, approach, cross, establish] = plan.states;

  assert.equal(frozen.world.motionState, "frozen");
  assert.deepEqual(frozen.primaryAnchor, { id: "world.frozen-output", type: "world" });
  assert.equal(preview.portal.visible, true);
  assert.ok(preview.portal.opacity > 0.5);
  assert.ok(approach.camera.z > preview.camera.z);
  assert.ok(cross.camera.z > approach.camera.z);
  assert.ok(cross.camera.perspective > approach.camera.perspective);
  assert.equal(approach.camera.focusActorId, "actor.integration-ring");
  assert.equal(cross.camera.focusActorId, "actor.integration-ring");
  assert.ok(cross.portal.radius > approach.portal.radius);
  assert.ok(cross.actors["actor.integration-ring"].scale >= 3.2);
  assert.ok(cross.portal.radius >= 560);
  assert.ok(cross.portal.oldWorldOpacity <= 0.25);
  assert.ok(cross.portal.oldWorldOpacity < approach.portal.oldWorldOpacity);
  assert.ok(Math.abs(cross.artifacts["artifact.F01"].x) > Math.abs(approach.artifacts["artifact.F01"].x));
  assert.ok(Math.abs(cross.artifacts["artifact.F02"].x) > Math.abs(approach.artifacts["artifact.F02"].x));
  assert.equal(cross.world.tone, "dark");
  assert.equal(establish.world.motionState, "settled");
  assert.deepEqual(establish.primaryAnchor, { id: "world.safety-volume", type: "world" });
  assert.equal(establish.actors["actor.integration-ring"].geometry.role, "safety-boundary");
  assert.equal(establish.actors["actor.safety-boundary"].cameraPresence, "featured");
});

test("WP-58 FT-02 keeps direct 16.1 entry as an absolute endpoint", () => {
  const portal = resolveStageTarget("16.1");

  assert.equal(portal.portal.visible, true);
  assert.equal(portal.world.motionState, "settled");
  assert.equal(portal.actors["actor.integration-ring"].cameraPresence, "support");
  assert.equal(portal.actors["actor.product-stage"].cameraPresence, "support");
  assert.equal(portal.actors["actor.safety-boundary"].cameraPresence, "featured");
  assert.equal(portal.actors["actor.safety-boundary"].visible, true);
  assert.ok(portal.safetyNodes.filter((node) => node.visible).length >= 4);
});

test("WP-58 FT-02 reduced motion keeps identity and avoids large rotation", () => {
  const reduced = resolveStageTarget("16.1", { reducedMotion: true });

  assert.equal(reduced.reducedMotion, true);
  assert.equal(reduced.camera.rotationX, 0);
  assert.equal(reduced.camera.rotationY, 0);
  assert.equal(reduced.camera.rotationZ, 0);
  assert.ok(reduced.transitionPlan && "states" in reduced.transitionPlan);
  assert.equal(reduced.transitionPlan.states.length, 5);
  assert.equal(reduced.actors["actor.integration-ring"].actorId, "actor.integration-ring");
  assert.equal(reduced.actors["actor.product-stage"].actorId, "actor.product-stage");
});

test("WP-58 FT-02 extends the existing PoseTransitionRuntime instead of adding another owner", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(runtimeSource, /function playSpatialStatePlan/);
  assert.match(runtimeSource, /function playLegacyWaypointPlan/);
  assert.match(runtimeSource, /interpolateSpatialState/);
  assert.match(runtimeSource, /getTransitionPlayback/);
  assert.match(runtimeSource, /previousTarget\.beatId === "15\.8" && target\.beatId === "16\.1"/);
  assert.match(runtimeSource, /previousTarget\.beatId === "16\.1" && target\.beatId === "15\.8"/);
  assert.match(labSource, /function PortalPreviewLayer/);
  assert.match(labSource, /function SafetyBoundaryGreybox/);
  assert.match(cssSource, /data-world-lighting-mode="safety"[\s\S]*--lab-old-world-opacity/);
  assert.doesNotMatch(runtimeSource, /fromTo/);
  assert.doesNotMatch(labSource, /Second.*Runtime|Portal.*Runtime|Tunnel.*Runtime/);
});
