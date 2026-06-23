import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-27 adds a full-screen scroll curtain behind the actor layer", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /className="scroll-curtain-field"/);
  assert.match(layerSource, /scroll-curtain-panel active/);
  assert.match(layerSource, /data-curtain-offset=\{offset\}/);
  assert.match(layerSource, /"--curtain-offset": offset/);
  assert.match(layerSource, /"--curtain-distance": Math\.abs\(offset\)/);
  assert.match(layerSource, /data-curtain-world=\{activeWorld\}/);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-curtain-field\s*\{[\s\S]*z-index:\s*3/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-curtain-panel\s*\{[\s\S]*min-height:\s*100dvh/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-curtain-panel\.active\s*\{[\s\S]*opacity:\s*0\.82/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-curtain-panel\s*\{[\s\S]*var\(--free-scroll-offset, 0px\) \* 0\.32/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-shell\s*\{[\s\S]*opacity:\s*0\.74 !important/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-panel\.active\s*\{[\s\S]*opacity:\s*0\.78/s);
});

test("WP-27 leaves the curtain field out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-curtain-field/);
  assert.doesNotMatch(runtimeSource, /\.scroll-curtain-panel/);
  assert.doesNotMatch(runtimeSource, /select\(root, "\.scroll-curtain-field"\)/);
  assert.doesNotMatch(runtimeSource, /selectAll\(root, "\.scroll-curtain-panel"\)/);
  assert.doesNotMatch(runtimeSource, /\.scroll-continuum-shell/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /Lenis/);
});
