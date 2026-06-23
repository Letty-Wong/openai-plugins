import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-34R animates Gate 2 graybox variables without owning WorldCamera transforms", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(runtimeSource, /getSpatialTransitionCue\(beatId\)/);
  assert.match(runtimeSource, /data-spatial-transition-active=\{String\(Boolean\(transitionCue\)\)\}/);
  assert.match(runtimeSource, /data-spatial-transition-kind=\{transitionCue\?\.kind \?\? "none"\}/);
  assert.match(runtimeSource, /function runGate2TransitionCue/);
  assert.match(runtimeSource, /function getGate2TransitionStart/);
  assert.match(runtimeSource, /function setGate2TransitionState/);
  assert.match(runtimeSource, /--gate2-motion-x/);
  assert.match(runtimeSource, /--gate2-axis-progress/);
  assert.match(runtimeSource, /--gate2-portal-progress/);
  assert.match(runtimeSource, /--gate2-reveal-progress/);
  assert.doesNotMatch(runtimeSource, /selectAll\(root, "\\.world-camera"\)/);
  assert.doesNotMatch(runtimeSource, /--camera-x/);
  assert.doesNotMatch(runtimeSource, /--camera-z/);

  assert.match(presentationCss, /--gate2-motion-x:\s*0px/);
  assert.match(presentationCss, /--gate2-axis-progress:\s*1/);
  assert.match(presentationCss, /scaleX\(var\(--gate2-axis-progress\)\)/);
  assert.match(presentationCss, /scale\(var\(--gate2-portal-progress\)\)/);
  assert.match(presentationCss, /var\(--gate2-reveal-progress\)/);
});

test("WP-34R keeps Gate 2 motion reduced-motion safe", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(runtimeSource, /if \(reducedMotion \|\| direction === "hold"\)[\s\S]*setGate2TransitionState\(root\)/);
  assert.match(runtimeSource, /gsap\.killTweensOf\(selectAll\(root, "\.spatial-transition-graybox"\)\)/);
  assert.match(presentationCss, /data-reduced-motion="true"[\s\S]*\.spatial-transition-graybox\s*\{[\s\S]*transition-duration:\s*0ms/);
});
