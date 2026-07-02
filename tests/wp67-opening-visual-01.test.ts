import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import type { BeatId } from "../src/presentation/core/state-types";
import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

const openingAssetPath = "public/assets/opening/judgement-device-v1.webp";
const scene1BeatIds = ["01.1", "01.2", "01.3"] as const satisfies readonly BeatId[];

test("OPENING-VISUAL-01 keeps Scene 1 on the same judgement actor identity", () => {
  scene1BeatIds.forEach((beatId) => {
    const target = resolveStageTarget(beatId);
    const judgementActor = target.actors["actor.judgement-question"];

    assert.equal(judgementActor.actorId, "actor.judgement-question", beatId);
    assert.equal(judgementActor.visible, true, beatId);
    assert.equal(judgementActor.cameraPresence, "featured", beatId);
  });
});

test("OPENING-VISUAL-01 uses a local bitmap layer without replacing judgement geometry", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /className="spatial-lab-judgement-stack"/);
  assert.match(labSource, /data-actor-geometry="judgement-question"/);
  assert.match(labSource, /data-judgement-variant=\{variant\}/);
  assert.match(labSource, /data-opening-device-active=\{String\(beatId\.startsWith\("01\."\)\)\}/);
  assert.match(labSource, /className="spatial-lab-opening-device"/);
  assert.match(labSource, /src="\/assets\/opening\/judgement-device-v1\.webp"/);
  assert.match(labSource, /className="spatial-lab-judgement-geometry"/);
});

test("OPENING-VISUAL-01 stores the generated device as a local WebP asset", () => {
  const header = readFileSync(openingAssetPath).subarray(0, 12).toString("ascii");

  assert.equal(existsSync(openingAssetPath), true);
  assert.equal(header.slice(0, 4), "RIFF");
  assert.equal(header.slice(8, 12), "WEBP");
});

test("OPENING-VISUAL-01 styling is scoped to Scene 1 review visuals", () => {
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(cssSource, /\.spatial-lab-opening-device/);
  assert.match(cssSource, /data-opening-device-active="true"/);
  assert.match(cssSource, /\[data-current-beat-id\^="01\."\] \.spatial-lab-viewport/);
  assert.match(cssSource, /\[data-current-beat-id\^="01\."\] \.spatial-lab-world-typography/);
  assert.match(cssSource, /\[data-current-beat-id\^="01\."\] \.spatial-lab-screen-copy/);
});

test("OPENING-VISUAL-01 does not route the asset through motion, targets, or legacy", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const targetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");
  const legacySource = readFileSync("app/legacy/page.tsx", "utf8");

  assert.doesNotMatch(runtimeSource, /judgement-device-v1/);
  assert.doesNotMatch(targetSource, /judgement-device-v1/);
  assert.doesNotMatch(legacySource, /judgement-device-v1/);
});
