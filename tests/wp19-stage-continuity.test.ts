import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-19 keeps presenter controls folded out of the stage by default", () => {
  const shellSource = readFileSync("src/presentation/core/PresentationShell.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(shellSource, /const \[hudCollapsed, setHudCollapsed\] = useState\(true\)/);
  assert.match(shellSource, /data-hud-collapsed=\{String\(hudCollapsed\)\}/);
  assert.match(shellSource, /aria-controls="presenter-hud"/);
  assert.match(shellSource, /event\.key === "h" \|\| event\.key === "H"/);
  assert.match(presentationCss, /\.presentation-shell\s*\{[\s\S]*display:\s*block/s);
  assert.match(presentationCss, /\.presentation-shell\s*\{[\s\S]*overflow:\s*visible/s);
  assert.match(presentationCss, /\.sticky-stage\s*\{[\s\S]*position:\s*sticky/s);
  assert.match(presentationCss, /\.hud-toggle\s*\{[\s\S]*right:\s*0;[\s\S]*opacity:\s*0\.045[\s\S]*transform:\s*translate3d\(29px, 0, 0\)/);
  assert.match(presentationCss, /\.hud-toggle:hover,[\s\S]*\.hud-toggle:focus-visible\s*\{[\s\S]*opacity:\s*0\.92/s);
  assert.match(presentationCss, /\.presenter-hud\s*\{[\s\S]*position:\s*fixed[\s\S]*transform:\s*translate3d\(calc\(100% \+ 40px\), 0, 0\)/);
  assert.match(presentationCss, /\.presentation-shell\[data-hud-collapsed="false"\] \.presenter-hud\s*\{[\s\S]*transform:\s*translate3d\(0, 0, 0\)/);
  assert.match(presentationCss, /\.qa-panel\s*\{[\s\S]*inset:\s*0;/);
});

test("WP-19 treats visual elements as stage actors instead of repeated slide entrances", () => {
  const stageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(stageSource, /frameKind=\{frameKind\}/);
  assert.match(runtimeSource, /function getStageActor\(frameKind: StaticFrameKind, sceneNumber: number\): StageActor/);
  assert.match(runtimeSource, /sceneNumber >= 9 && sceneNumber <= 18\) return "product"/);
  assert.match(runtimeSource, /sceneNumber >= 19\) return "action"/);
  assert.match(runtimeSource, /frameKind === "product-slot"[\s\S]*return "product"/);
  assert.match(runtimeSource, /frameKind === "scenario-radar"[\s\S]*frameKind === "finale"[\s\S]*return "action"/);
  assert.match(runtimeSource, /data-continuity-actor=\{currentActor\}/);
  assert.match(runtimeSource, /const actorTravel = options\.actorChanged \? 1 : 0\.32/);
  assert.match(runtimeSource, /const actorOpacity = options\.actorChanged \? 0\.2 : 0\.92/);
  assert.match(runtimeSource, /\.spatial-stage/);
  assert.match(runtimeSource, /\.persistent-actor-layer/);
  assert.doesNotMatch(runtimeSource, /\.continuity-object-layer/);
  assert.doesNotMatch(runtimeSource, /\.scroll-continuum-shell/);
  assert.doesNotMatch(runtimeSource, /\.scroll-cinema-card/);
  assert.doesNotMatch(runtimeSource, /clearProps:\s*"transform,opacity,filter"/);
  assert.match(presentationCss, /--free-scroll-offset/);
  assert.match(presentationCss, /\.scroll-continuum\s*\{[\s\S]*var\(--continuum-y, 42vh\)/);
  assert.match(presentationCss, /\.scroll-continuum\s*\{[\s\S]*var\(--free-scroll-progress, 0\)/);
  assert.match(presentationCss, /calc\(var\(--scroll-cinema-motion-y, 0px\) - var\(--free-scroll-offset, 0px\)\)/);
});
