import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-14 adds a large viewport scroll stack with adjacent scenes", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /viewportScenes/);
  assert.match(layerSource, /scroll-viewport-stack/);
  assert.match(layerSource, /scroll-viewport-card active/);
  assert.match(layerSource, /--stack-y/);
  assert.match(layerSource, /--stack-opacity/);
  assert.match(presentationCss, /\.scroll-viewport-stack/);
  assert.match(presentationCss, /\.scroll-viewport-card/);
  assert.match(presentationCss, /\.scroll-viewport-card\.active/);
});

test("WP-14 leaves the archived viewport stack out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-viewport-stack/);
  assert.doesNotMatch(runtimeSource, /--scroll-stack-motion-y/);
  assert.doesNotMatch(runtimeSource, /--scroll-stack-card-motion-x/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
});
