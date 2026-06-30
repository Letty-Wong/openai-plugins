import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

const protectedPaths = [
  ["02 -> 03", "02.1", "03.1"],
  ["03 -> 04", "03.7", "04.1"],
  ["07 -> 08", "07.8", "08.1"],
  ["08 -> 09", "08.7", "09.1"],
  ["14 -> 15", "14.7", "15.1"],
  ["15 -> 16", "15.8", "16.1"],
  ["16 -> 17", "16.6", "17.1"],
  ["17 -> 18", "17.9", "18.1"],
  ["20 -> 21", "20.10", "21.1"]
] as const;

test("RC-LOCK-01 records the V4 motion lock baseline and protected paths", () => {
  const report = readFileSync("review/v4-motion-lock-report.md", "utf8");

  assert.match(report, /V4-RC-Motion-Lock/);
  assert.match(report, /66b566f/);

  protectedPaths.forEach(([label, fromBeatId, toBeatId]) => {
    assert.match(report, new RegExp(label.replace(" -> ", " -> ")));
    assert.match(report, new RegExp(`${fromBeatId} -> ${toBeatId}`));
  });
});

test("RC-LOCK-01 preserves key transition plan ownership", () => {
  assert.equal(resolveStageTarget("08.1").transitionPlan?.id, "transition-plan.rcfix02r.ledger-to-capability");
  assert.equal(resolveStageTarget("09.1").transitionPlan?.id, "transition-plan.ft01.product-turn");
  assert.equal(resolveStageTarget("16.1").transitionPlan?.id, "transition-plan.ft02.forward-safety-portal");
  assert.equal(resolveStageTarget("18.1").transitionPlan?.id, "transition-plan.rcfix02r.review-handoff");
  assert.equal(resolveStageTarget("21.1").transitionPlan?.id, "transition-plan.ft04.finale-pullback-loop");
});

test("RC-LOCK-01 keeps primary actor identities across protected routes", () => {
  protectedPaths.forEach(([, fromBeatId, toBeatId]) => {
    const from = resolveStageTarget(fromBeatId);
    const to = resolveStageTarget(toBeatId);

    assert.equal(from.actors["actor.integration-ring"].actorId, to.actors["actor.integration-ring"].actorId);
    assert.equal(from.actors["actor.product-stage"].actorId, to.actors["actor.product-stage"].actorId);
    assert.equal(from.artifacts["artifact.F01"].artifactId, to.artifacts["artifact.F01"].artifactId);
  });
});

test("RC-LOCK-01 keeps review mode free of visible engineering labels", () => {
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.artifact-debug-id/);
  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.world-debug-role/);
  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.spatial-lab-transition-readout/);
  assert.match(labSource, /className="artifact-debug-id"/);
  assert.match(labSource, /className="world-debug-role"/);
});

test("RC-LOCK-01 keeps the V4 motion runtime model locked", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /function playSpatialStatePlan/);
  assert.match(runtimeSource, /function playLegacyWaypointPlan/);
  assert.match(runtimeSource, /applyPoseTarget\(root, finalTarget, 0\)/);
  assert.doesNotMatch(runtimeSource, /fromTo/);
});
