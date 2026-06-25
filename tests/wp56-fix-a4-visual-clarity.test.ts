import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  labActorIds,
  resolveStageTarget
} from "../src/presentation/spatial-lab/stage-target";

const proofRoute = ["01.1", "02.1", "03.1", "04.7", "05.1", "08.7"] as const;

test("WP-56 records Human Gate A visual failure before FIX-A4", () => {
  const decision = readFileSync("review/spatial-lab/gate-a-decision-record.md", "utf8");

  assert.match(decision, /Decision: `FAIL_VISUAL_CLARITY`/);
  assert.match(decision, /Next: `FIX-A4`/);
  assert.match(decision, /INVALID_UNTIL_GATE_A_PASS/);
  assert.match(decision, /Do not start FIX-B1/);
});

test("WP-56 review actor wrappers are transparent and debug bounds are debug-only", () => {
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(styleSource, /\.spatial-lab-actor \{[\s\S]*background: transparent;[\s\S]*border: 0;[\s\S]*padding: 0;/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="debug"\] \.spatial-lab-actor::before/);
  assert.match(styleSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.spatial-lab-world-atmosphere \{[\s\S]*pointer-events: none;/);
});

test("WP-56 proof route has one featured actor and bounded support", () => {
  proofRoute.forEach((beatId) => {
    const target = resolveStageTarget(beatId);
    const actors = Object.values(target.actors);

    assert.equal(actors.filter((actor) => actor.cameraPresence === "featured").length, 1, beatId);
    assert.ok(actors.filter((actor) => actor.cameraPresence === "support").length <= 2, beatId);
    assert.ok(actors.filter((actor) => actor.cameraPresence === "ambient").length <= 1, beatId);
    assert.ok(Object.values(target.artifacts).filter((artifact) => artifact.visible).length <= 3, beatId);
  });
});

test("WP-56 proof route uses explicit targets instead of phase-only poses", () => {
  const poseIds = proofRoute.map((beatId) => resolveStageTarget(beatId).camera.poseId);

  assert.deepEqual(poseIds, [
    "camera.fix-a4.judgement-entry",
    "camera.fix-a4.judgement-through",
    "camera.fix-a4.trend-depth",
    "camera.fix-a4.gap-consequence",
    "camera.fix-a4.ledger-arrival",
    "camera.fix-a4.capability-core"
  ]);
});

test("WP-56 proof route keeps actor DOM identity while latent actors do not draw empty cards", () => {
  const target = resolveStageTarget("03.1");
  const hiddenActors = labActorIds.filter((actorId) => !target.actors[actorId].visible);

  assert.ok(hiddenActors.length > 0);
  hiddenActors.forEach((actorId) => {
    assert.equal(target.actors[actorId].visible, false, actorId);
    assert.equal(target.actors[actorId].opacity, 0, actorId);
  });
});

test("WP-56 Spatial Lab has proof bodies and no duplicated main headline", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /function JudgementQuestionGreybox/);
  assert.match(labSource, /function TrendTrackGreybox/);
  assert.match(labSource, /function LedgerDialGreybox/);
  assert.match(labSource, /WorldTypography/);
  assert.doesNotMatch(labSource, /<h2>\{target\.copy\.headline\}<\/h2>/);
});

test("WP-56 world tone and ring geometry state are visibly consumed", () => {
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");
  const ringSource = readFileSync("src/presentation/stage/IntegrationRing.tsx", "utf8");

  assert.match(styleSource, /\.spatial-lab-viewport\[data-world-tone="dark"\]/);
  assert.match(styleSource, /\.spatial-lab-viewport\[data-world-tone="paper"\]/);
  assert.match(styleSource, /stroke-dasharray: var\(--ring-segment-progress, 1\) 1/);
  assert.match(styleSource, /stroke-dashoffset: calc\(var\(--ring-gap, 0\) \/ 520\)/);
  assert.match(ringSource, /"--ring-segment-progress-1"/);
  assert.match(ringSource, /pathLength=\{1\}/);
});
