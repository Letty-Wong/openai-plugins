import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-13 adds an obvious scroll film strip around the active scene", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(layerSource, /filmScenes/);
  assert.match(layerSource, /scroll-film-strip/);
  assert.match(layerSource, /scroll-film-track/);
  assert.match(layerSource, /scroll-film-card active/);
  assert.match(layerSource, /--film-distance/);
  assert.match(layerSource, /SCROLL REEL/);
  assert.match(presentationCss, /\.scroll-film-strip/);
  assert.match(presentationCss, /\.scroll-film-track/);
  assert.match(presentationCss, /\.scroll-film-card\.active/);
});

test("WP-13 leaves the archived film strip out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.doesNotMatch(runtimeSource, /\.scroll-film-strip/);
  assert.doesNotMatch(runtimeSource, /\.scroll-film-card/);
  assert.doesNotMatch(runtimeSource, /--scroll-film-motion-x/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
});
