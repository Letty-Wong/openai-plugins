import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-17 adds a director focus plane for product and action continuity", () => {
  const objectLayerSource = readFileSync("src/presentation/stage/ContinuityObjectLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(objectLayerSource, /className="director-focus-plane"/);
  assert.match(objectLayerSource, /data-director-focus="product"/);
  assert.match(objectLayerSource, /data-director-focus="action"/);
  assert.match(objectLayerSource, /className="director-focus-frame product-focus-frame"/);
  assert.match(objectLayerSource, /className="director-focus-frame action-focus-frame"/);
  assert.match(presentationCss, /\.director-focus-plane\s*\{[^}]*radial-gradient/s);
  assert.match(presentationCss, /\.director-focus-plane\[data-director-focus="action"\]/);
  assert.match(presentationCss, /\.director-focus-frame\s*\{[^}]*z-index:\s*5/s);
  assert.match(presentationCss, /\.product-focus-frame\s*\{[^}]*width:\s*min\(39vw,\s*700px\)/s);
  assert.match(presentationCss, /\.action-focus-frame\s*\{[^}]*width:\s*min\(66vw,\s*1100px\)/s);
});

test("WP-17 makes object beats visually dominant without changing navigation mode", () => {
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const packageSource = readFileSync("package.json", "utf8");

  assert.match(presentationCss, /data-frame-kind="product-slot"[\s\S]*\.scroll-viewport-card\.active/);
  assert.match(presentationCss, /data-frame-kind="action-path"[\s\S]*\.scroll-viewport-card\.active/);
  assert.match(presentationCss, /\.scroll-viewport-card\.active[\s\S]*opacity:\s*0\.58/s);
  assert.match(presentationCss, /\.scroll-panel-track[\s\S]*opacity:\s*0\.36/s);
  assert.match(presentationCss, /\.scroll-lens-readout[\s\S]*opacity:\s*0\.18/s);
  assert.doesNotMatch(runtimeSource, /\.director-focus-plane/);
  assert.doesNotMatch(runtimeSource, /\.director-focus-frame/);
  assert.doesNotMatch(runtimeSource, /\.action-object-path-live/);
  assert.doesNotMatch(runtimeSource, /prepareActionObjectPath/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /Lenis/);
  assert.doesNotMatch(packageSource, /framer-motion/);
  assert.doesNotMatch(packageSource, /three/);
});
