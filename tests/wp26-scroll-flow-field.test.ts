import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-26 adds a visible scroll flow field behind persistent actors", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /className="scroll-flow-field"/);
  assert.match(layerSource, /className="scroll-flow-spine"/);
  assert.match(layerSource, /scroll-flow-slice active/);
  assert.match(layerSource, /data-flow-offset=\{offset\}/);
  assert.match(layerSource, /"--flow-offset": offset/);
  assert.match(layerSource, /"--flow-distance": Math\.abs\(offset\)/);
  assert.match(layerSource, /data-flow-world=\{activeWorld\}/);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-flow-field\s*\{[\s\S]*z-index:\s*5/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-flow-slice\s*\{[\s\S]*clip-path:\s*polygon/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-flow-slice\.active\s*\{[\s\S]*opacity:\s*0\.72/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-flow-slice\s*\{[\s\S]*var\(--free-scroll-offset, 0px\) \* 0\.46/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-flow-spine\s*\{[\s\S]*var\(--free-scroll-offset, 0px\) \* -0\.28/s);
});

test("WP-26 leaves the scroll flow field out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-flow-field/);
  assert.doesNotMatch(runtimeSource, /\.scroll-flow-slice/);
  assert.doesNotMatch(runtimeSource, /select\(root, "\.scroll-flow-field"\)/);
  assert.doesNotMatch(runtimeSource, /selectAll\(root, "\.scroll-flow-slice"\)/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /Lenis/);
});
