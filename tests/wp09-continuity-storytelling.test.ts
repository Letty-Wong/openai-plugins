import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-09 keeps the archived story spine source but no longer mounts it in the main stage", () => {
  const storySpineSource = readFileSync("src/presentation/stage/StorySpine.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(storySpineSource, /className="story-spine"/);
  assert.match(storySpineSource, /Presentation story route/);
  assert.match(storySpineSource, /--story-progress-percent/);
  assert.match(storySpineSource, /worldBySceneNumber/);
  assert.doesNotMatch(visualStageSource, /import \{ StorySpine \}/);
  assert.doesNotMatch(visualStageSource, /<StorySpine resolved=\{resolved\} \/>/);
  assert.doesNotMatch(visualStageSource, /<ScrollNarrativeLayer resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /<SpatialStage resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /<PersistentActorLayer frameKind=\{frameKind\} resolved=\{resolved\} \/>/);
  assert.match(presentationCss, /\.story-spine/);
  assert.match(presentationCss, /\.story-spine-worlds/);
  assert.match(presentationCss, /\.story-spine-current/);
});

test("WP-09 drives continuity from beat navigation rather than browser scroll", () => {
  const shellSource = readFileSync("src/presentation/core/PresentationShell.tsx", "utf8");
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");

  assert.match(shellSource, /previousBeatOrderRef/);
  assert.match(shellSource, /transitionDirection/);
  assert.match(visualStageSource, /direction=\{transitionDirection\}/);
  assert.match(runtimeSource, /"use client"/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.match(runtimeSource, /data-continuity-direction/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
});

test("WP-09 keeps continuity motion scoped to transform-safe stage layers", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  for (const selector of [
    ".background-system",
    ".spatial-stage",
    ".typography-back",
    ".artifact-layer",
    ".product-stage",
    ".integration-geometry",
    ".visual-copy",
    ".persistent-actor-layer"
  ]) {
    assert.match(runtimeSource, new RegExp(selector.replace(".", "\\.")));
  }

  assert.doesNotMatch(runtimeSource, /\btop:/);
  assert.doesNotMatch(runtimeSource, /\bleft:/);
  assert.doesNotMatch(runtimeSource, /\bwidth:/);
  assert.doesNotMatch(runtimeSource, /\bheight:/);
  assert.match(presentationCss, /\.continuity-world-sweep/);
  assert.match(presentationCss, /--beat-progress/);
  assert.match(presentationCss, /\.visual-stage::before/);
});
