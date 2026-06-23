import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { scenes } from "../src/content/scenes";

test("WP-11 keeps the archived longform narrative layer out of the main stage", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");

  assert.equal(scenes.length, 21);
  assert.match(layerSource, /className=\{`scroll-narrative-layer/);
  assert.match(layerSource, /scroll-panel-track/);
  assert.match(layerSource, /scroll-story-window/);
  assert.match(layerSource, /scroll-ribbon-track/);
  assert.match(layerSource, /scenes\.map/);
  assert.doesNotMatch(visualStageSource, /<ScrollNarrativeLayer resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /<SpatialStage resolved=\{resolved\} \/>/);
  assert.doesNotMatch(layerSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(layerSource, /ScrollTrigger/);
});

test("WP-11 styles the stage as a moving scene reel with a fixed lens", () => {
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  for (const selector of [
    ".scroll-narrative-layer",
    ".scroll-story-window",
    ".scroll-panel-track",
    ".scroll-panel",
    ".scroll-ribbon-track",
    ".scroll-progress-slit"
  ]) {
    assert.match(presentationCss, new RegExp(selector.replace(".", "\\.")));
  }

  assert.match(presentationCss, /--scroll-track-x/);
  assert.match(presentationCss, /--scroll-progress-percent/);
  assert.match(presentationCss, /mask-image/);
});

test("WP-11 keeps archived scene reel selectors out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-narrative-layer/);
  assert.doesNotMatch(runtimeSource, /--scroll-motion-x/);
  assert.doesNotMatch(runtimeSource, /--scroll-track-scale/);
  assert.doesNotMatch(runtimeSource, /\.scroll-story-window/);
  assert.doesNotMatch(runtimeSource, /\.scroll-panel\[data-scene-state="active"\]/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
});
