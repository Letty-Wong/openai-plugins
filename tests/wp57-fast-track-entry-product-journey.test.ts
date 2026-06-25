import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  labArtifactIds,
  resolveStageTarget
} from "../src/presentation/spatial-lab/stage-target";

const ft01Route = ["08.7", "09.1", "10.1", "11.1", "12.1", "13.1", "14.1", "15.8"] as const;

test("WP-57 FT-00 promotes V4 to / and keeps legacy isolated", () => {
  const homeSource = readFileSync("app/page.tsx", "utf8");
  const legacySource = readFileSync("app/legacy/page.tsx", "utf8");
  const aliasSource = readFileSync("app/spatial-lab/page.tsx", "utf8");
  const stageSource = readFileSync("src/presentation/spatial-lab/PresentationStageV4.tsx", "utf8");
  const clientSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const compatSource = readFileSync("src/presentation/spatial-lab/SpatialLabStage.tsx", "utf8");

  assert.match(homeSource, /PresentationStageV4/);
  assert.doesNotMatch(homeSource, /PresentationShell/);
  assert.match(homeSource, /toValidBeatId/);
  assert.match(homeSource, /toValidMode/);
  assert.match(legacySource, /PresentationShell/);
  assert.match(aliasSource, /PresentationStageV4/);
  assert.match(stageSource, /export function PresentationStageV4/);
  assert.match(stageSource, /initialBeatId = defaultBeatId/);
  assert.match(stageSource, /initialMode = "review"/);
  assert.match(clientSource, /export function PresentationStageClientV4/);
  assert.match(compatSource, /PresentationStageV4 as SpatialLabStage/);
});

test("WP-57 FT-01 keeps ProductStage and IntegrationRing as the same actors", () => {
  ft01Route.forEach((beatId) => {
    const target = resolveStageTarget(beatId);

    assert.equal(target.actors["actor.product-stage"].actorId, "actor.product-stage", beatId);
    assert.equal(target.actors["actor.integration-ring"].actorId, "actor.integration-ring", beatId);
    assert.equal(target.actors["actor.product-stage"].visible, true, beatId);
    assert.equal(target.actors["actor.integration-ring"].visible, true, beatId);
    assert.ok(Math.abs(target.camera.x + target.actors["actor.product-stage"].x) <= 40, beatId);
    assert.ok(Object.values(target.artifacts).filter((artifact) => artifact.visible).length <= 3, beatId);
  });
});

test("WP-57 FT-01.1 keeps the ring turn anchor stable from 08.7 to 09.1", () => {
  const beforeTurn = resolveStageTarget("08.7");
  const turn = resolveStageTarget("09.1");
  const beforeScreenX = beforeTurn.camera.x + beforeTurn.actors["actor.integration-ring"].x;
  const turnScreenX = turn.camera.x + turn.actors["actor.integration-ring"].x;

  assert.ok(Math.abs(beforeScreenX - turnScreenX) <= 24);
});

test("WP-57 FT-01 moves workstations right-to-left while the product stays near center", () => {
  const source = resolveStageTarget("09.1");
  const benefit = resolveStageTarget("11.1");
  const poster = resolveStageTarget("12.1");
  const storyboard = resolveStageTarget("13.1");
  const service = resolveStageTarget("14.1");

  assert.ok(source.artifacts["artifact.F01"].x > benefit.artifacts["artifact.F01"].x);
  assert.ok(benefit.artifacts["artifact.F01"].x > poster.artifacts["artifact.F01"].x);
  assert.ok(poster.artifacts["artifact.F01"].x > storyboard.artifacts["artifact.F01"].x);
  assert.ok(storyboard.artifacts["artifact.F01"].x > service.artifacts["artifact.F01"].x);
});

test("WP-57 FT-01 uses stable artifact ids with product-journey modes", () => {
  const modesByBeat = new Map([
    ["09.1", "source"],
    ["10.1", "source"],
    ["11.1", "benefit"],
    ["12.1", "poster"],
    ["13.1", "storyboard"],
    ["14.1", "email-faq"],
    ["15.8", "department-output"]
  ] as const);

  modesByBeat.forEach((mode, beatId) => {
    const target = resolveStageTarget(beatId);
    labArtifactIds.forEach((artifactId) => {
      assert.equal(target.artifacts[artifactId].artifactId, artifactId, beatId);
      assert.equal(target.artifacts[artifactId].mode, mode, `${beatId} ${artifactId}`);
    });
  });
});

test("WP-57 FT-01.1 freezes 15.8 before the forward tunnel takes over", () => {
  const freeze = resolveStageTarget("15.8");
  const tunnel = resolveStageTarget("16.1");

  assert.equal(freeze.copy.headline, "快，还不够。");
  assert.equal(freeze.copy.caption, "生成速度不是企业能力的全部");
  assert.equal(freeze.world.motionState, "frozen");
  assert.equal(freeze.actors["actor.product-stage"].cameraPresence, "featured");
  assert.equal(freeze.artifacts["artifact.F01"].mode, "department-output");
  assert.equal(freeze.actors["actor.integration-ring"].geometry.role, "department-output-freeze");
  assert.equal(tunnel.transition?.acceptanceFocus[0], "FT-02 forward safety portal waypoints are active");
});
