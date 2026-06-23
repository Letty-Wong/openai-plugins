import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getCameraPoseForBeat,
  getSpatialTransitionCue,
  spatialTransitionCues
} from "../src/presentation/stage/spatial-poses";

test("WP-33R defines the three Gate 2 graybox transition cues", () => {
  assert.equal(spatialTransitionCues.length, 3);
  assert.deepEqual(
    spatialTransitionCues.map((cue) => cue.beatId),
    ["09.1", "16.1", "21.1"]
  );

  assert.equal(getSpatialTransitionCue("09.1")?.kind, "turn-horizontal-product");
  assert.equal(getSpatialTransitionCue("09.1")?.fromPhase, "ledger");
  assert.equal(getSpatialTransitionCue("09.1")?.toPhase, "product");
  assert.equal(getCameraPoseForBeat("09.1", 9).poseId, "camera.turn-horizontal-product");

  assert.equal(getSpatialTransitionCue("16.1")?.kind, "portal-forward-safety");
  assert.equal(getSpatialTransitionCue("16.1")?.fromPhase, "product");
  assert.equal(getSpatialTransitionCue("16.1")?.toPhase, "safety");
  assert.equal(getCameraPoseForBeat("16.1", 16).poseId, "camera.portal-forward-safety");

  assert.equal(getSpatialTransitionCue("21.1")?.kind, "dolly-back-finale");
  assert.equal(getSpatialTransitionCue("21.1")?.fromPhase, "action");
  assert.equal(getSpatialTransitionCue("21.1")?.toPhase, "finale");
  assert.equal(getCameraPoseForBeat("21.1", 21).poseId, "camera.dolly-back-finale");
});

test("WP-33R renders Gate 2 transition grayboxes inside SpatialStage only", () => {
  const spatialStageSource = readFileSync("src/presentation/stage/SpatialStage.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(spatialStageSource, /getCameraPoseForBeat\(resolved\.beat\.id, resolved\.scene\.sceneNumber\)/);
  assert.match(spatialStageSource, /getSpatialTransitionCue\(resolved\.beat\.id\)/);
  assert.match(spatialStageSource, /data-spatial-transition-id=\{transitionCue\?\.id \?\? "none"\}/);
  assert.match(spatialStageSource, /data-spatial-transition-kind=\{transitionCue\?\.kind \?\? "none"\}/);
  assert.match(spatialStageSource, /function SpatialTransitionGraybox/);
  assert.match(spatialStageSource, /data-transition-from=\{cue\.fromPhase\}/);
  assert.match(spatialStageSource, /data-transition-to=\{cue\.toPhase\}/);
  assert.match(presentationCss, /\.spatial-transition-graybox/);
  assert.match(presentationCss, /data-transition-kind="turn-horizontal-product"/);
  assert.match(presentationCss, /data-transition-kind="portal-forward-safety"/);
  assert.match(presentationCss, /data-transition-kind="dolly-back-finale"/);

  assert.doesNotMatch(visualStageSource, /SpatialTransitionGraybox/);
  assert.doesNotMatch(visualStageSource, /scroll-continuum-shell/);
  assert.doesNotMatch(visualStageSource, /scroll-flow-field/);
  assert.doesNotMatch(visualStageSource, /scroll-curtain-field/);
});
