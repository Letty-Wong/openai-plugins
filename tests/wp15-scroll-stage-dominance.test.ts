import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-15 promotes the scroll stack into the primary visual stage", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /scroll-stage-focus-field/);
  assert.match(layerSource, /scroll-journey-stage/);
  assert.match(layerSource, /scroll-stack-rail/);
  assert.match(layerSource, /data-scene-state=\{sceneState/);
  assert.match(presentationCss, /\.scroll-narrative-layer\s*\{[^}]*z-index:\s*18/s);
  assert.match(presentationCss, /\.scroll-stage-focus-field\s*\{[^}]*radial-gradient/s);
  assert.match(presentationCss, /\.scroll-viewport-stack\s*\{[^}]*z-index:\s*5/s);
  assert.match(presentationCss, /\.scroll-journey-stage\s*\{[^}]*z-index:\s*24/s);
  assert.match(presentationCss, /\.scroll-viewport-card\.active\s*\{[^}]*opacity:\s*0\.08/s);
  assert.match(presentationCss, /\.scroll-stack-rail\s*\{[^}]*z-index:\s*6/s);
  assert.match(presentationCss, /\.scroll-film-strip\s*\{[^}]*opacity:\s*0\.82/s);
  assert.match(presentationCss, /\.scroll-panel-track\s*\{[^}]*opacity:\s*0\.58/s);
  assert.match(presentationCss, /\.visual-copy\s*\{[^}]*z-index:\s*21/s);
  assert.match(presentationCss, /\.visual-copy \.display-title\s*\{[^}]*1\.9vw/s);
  assert.match(presentationCss, /\.scroll-viewport-card\.active\s*\{[^}]*backdrop-filter:\s*blur\(7px\)/s);
  assert.match(presentationCss, /\.cinematic-route-map\s*\{[^}]*opacity:\s*0\.28/s);
});

test("WP-15 keeps archived dominance layers out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const packageSource = readFileSync("package.json", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-stage-focus-field/);
  assert.doesNotMatch(runtimeSource, /\.scroll-stack-rail span/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /Lenis/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
  assert.doesNotMatch(packageSource, /framer-motion/);
  assert.doesNotMatch(packageSource, /three/);
});
