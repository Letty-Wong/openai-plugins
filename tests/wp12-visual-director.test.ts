import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-12 makes the scroll-like narrative lens visibly dominant", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /scroll-lens-frame/);
  assert.match(layerSource, /scroll-lens-readout/);
  assert.match(layerSource, /scroll-depth-stack/);
  assert.match(layerSource, /progressLabel/);
  assert.match(presentationCss, /\.scroll-lens-frame/);
  assert.match(presentationCss, /\.scroll-lens-readout/);
  assert.match(presentationCss, /\.scroll-depth-stack/);
  assert.match(presentationCss, /\.scroll-narrative-layer\s*\{[^}]*z-index:\s*18/s);
  assert.match(presentationCss, /\.scroll-panel\[data-scene-state="active"\]\s*\{[^}]*scale\(1\.16\)/s);
});

test("WP-12 leaves the archived lens out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-lens-frame/);
  assert.doesNotMatch(runtimeSource, /\.scroll-depth-stack span/);
  assert.doesNotMatch(runtimeSource, /--scroll-motion-x/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
});
