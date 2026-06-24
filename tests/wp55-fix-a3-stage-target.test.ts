import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { beats } from "../src/content/beats";
import {
  assertStablePoseEquality,
  labArtifactIds,
  resolveStageTarget
} from "../src/presentation/spatial-lab/stage-target";

test("WP-55 FIX-A3 StageTarget is independent from old spatial pose algorithms", () => {
  const targetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");

  assert.doesNotMatch(targetSource, /getCameraPoseForBeat/);
  assert.doesNotMatch(targetSource, /getSpatialPoseForActor/);
  assert.doesNotMatch(targetSource, /getRoutePhaseForScene/);
  assert.doesNotMatch(targetSource, /orderInScene/);
  assert.doesNotMatch(targetSource, /beatDrift/);
});

test("WP-55 FIX-A3 validates every Beat target lifecycle invariant", () => {
  beats.forEach((beat) => {
    const target = resolveStageTarget(beat.id);
    Object.values(target.actors).forEach((actor) => {
      if (actor.lifecycle === "off") {
        assert.equal(actor.visible, false, `${beat.id} ${actor.actorId}`);
        assert.equal(actor.opacity, 0, `${beat.id} ${actor.actorId}`);
      }
      if (!actor.visible) assert.equal(actor.opacity, 0, `${beat.id} ${actor.actorId}`);
      if (actor.visible) assert.notEqual(actor.lifecycle, "off", `${beat.id} ${actor.actorId}`);
    });

    Object.values(target.artifacts).forEach((artifact) => {
      if (artifact.lifecycle === "off") {
        assert.equal(artifact.visible, false, `${beat.id} ${artifact.artifactId}`);
        assert.equal(artifact.opacity, 0, `${beat.id} ${artifact.artifactId}`);
      }
      if (!artifact.visible) assert.equal(artifact.opacity, 0, `${beat.id} ${artifact.artifactId}`);
      if (artifact.visible) assert.notEqual(artifact.lifecycle, "off", `${beat.id} ${artifact.artifactId}`);
    });
  });
});

test("WP-55 FIX-A3 stable adjacent Beats keep outer pose equality", () => {
  for (let index = 1; index < beats.length; index += 1) {
    const previous = resolveStageTarget(beats[index - 1].id);
    const next = resolveStageTarget(beats[index].id);
    assertStablePoseEquality(previous, next);
  }
});

test("WP-55 FIX-A3 movementKind distribution matches the stage contract", () => {
  const counts = beats.reduce(
    (result, beat) => {
      result[resolveStageTarget(beat.id).movementKind] += 1;
      return result;
    },
    { actor: 0, spatial: 0, stable: 0 }
  );
  const total = beats.length;

  assert.ok(counts.stable / total >= 0.6 && counts.stable / total <= 0.7, JSON.stringify(counts));
  assert.ok(counts.actor / total >= 0.2 && counts.actor / total <= 0.3, JSON.stringify(counts));
  assert.ok(counts.spatial / total >= 0.08 && counts.spatial / total <= 0.11, JSON.stringify(counts));
});

test("WP-55 FIX-A3 Ring pose is unified on the IntegrationRing actor", () => {
  const target = resolveStageTarget("21.1");
  const ring = target.actors["actor.integration-ring"];
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.equal(ring.geometry.segmentProgress.length, 5);
  assert.deepEqual(ring.geometry.segmentProgress, [1, 1, 1, 1, 1]);
  assert.match(labSource, /actor\.geometry\.role/);
  assert.match(labSource, /state=\{actor\.geometry\}/);
  assert.doesNotMatch(labSource, /target\.ring/);
});

test("WP-55 FIX-A3 ProductStage and artifacts keep stable identity through the final act", () => {
  const productStart = resolveStageTarget("08.7");
  const finale = resolveStageTarget("21.9");

  assert.equal(productStart.actors["actor.product-stage"].actorId, "actor.product-stage");
  assert.equal(productStart.actors["actor.product-stage"].visible, true);
  assert.equal(finale.actors["actor.product-stage"].actorId, "actor.product-stage");
  assert.equal(finale.actors["actor.product-stage"].visible, true);

  labArtifactIds.forEach((artifactId) => {
    assert.equal(resolveStageTarget("10.1").artifacts[artifactId].artifactId, artifactId);
    assert.equal(finale.artifacts[artifactId].artifactId, artifactId);
  });
});

test("WP-55 FIX-A3 world target owns tone and Ring tone derives from it", () => {
  const product = resolveStageTarget("09.1");
  const safety = resolveStageTarget("16.1");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.equal(product.world.tone, "paper");
  assert.equal(safety.world.tone, "dark");
  assert.match(labSource, /data-world-tone=\{target\.world\.tone\}/);
  assert.match(labSource, /tone=\{target\.world\.tone === "dark" \? "paper" : "ink"\}/);
});
