import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createInitialPresentationState } from "../src/presentation/core/PresentationController";
import { reduceKeyboardShortcut } from "../src/presentation/core/keyboard";

test("WP-18 keeps presenter navigation discrete with wheel cue fallback", () => {
  const shellSource = readFileSync("src/presentation/core/PresentationShell.tsx", "utf8");
  const start = createInitialPresentationState("01.1");

  assert.equal(
    reduceKeyboardShortcut(start, { key: "ArrowDown", shiftKey: false }).currentBeatId,
    "01.2"
  );
  assert.equal(
    reduceKeyboardShortcut(start, { key: "PageDown", shiftKey: false }).currentBeatId,
    "01.2"
  );
  assert.equal(
    reduceKeyboardShortcut(createInitialPresentationState("01.2"), { key: "ArrowUp", shiftKey: false }).currentBeatId,
    "01.1"
  );
  assert.match(shellSource, /data-navigation-mode="presenter-cue-and-wheel"/);
  assert.match(shellSource, /data-current-beat-id=\{state\.currentBeatId\}/);
  assert.match(shellSource, /data-hydrated=\{String\(hydrated\)\}/);
  assert.match(shellSource, /wheelCueRef/);
  assert.match(shellSource, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.match(shellSource, /event\.preventDefault\(\)/);
  assert.match(shellSource, /const threshold = 86/);
  assert.match(shellSource, /const cooldownMs = 340/);
  assert.match(shellSource, /deltaY > 0 \? nextBeat\(current\) : previousBeat\(current\)/);
  assert.match(shellSource, /externalHashNavigationRef/);
  assert.match(shellSource, /beatIdFromHash\(window\.location\.hash\)/);
  assert.match(shellSource, /hashBeatId && hashBeatId !== state\.currentBeatId\) return/);
  assert.match(shellSource, /--free-scroll-offset/);
  assert.match(shellSource, /--free-scroll-runway-x/);
  assert.match(shellSource, /--native-scroll-progress/);
  assert.match(shellSource, /--native-scroll-rail-x/);
  assert.match(shellSource, /--native-scroll-panorama-x/);
  assert.match(shellSource, /--native-scroll-runway-y/);
  assert.match(shellSource, /--native-scroll-stage-tilt/);
  assert.match(shellSource, /--native-scroll-stage-scale/);
  assert.match(shellSource, /--native-scroll-product-rotate/);
  assert.doesNotMatch(shellSource, /addEventListener\("scroll"/);
  assert.doesNotMatch(shellSource, /handleScroll/);
  assert.doesNotMatch(shellSource, /window\.scrollY/);
  assert.doesNotMatch(shellSource, /window\.scrollTo/);
  assert.doesNotMatch(shellSource, /jumpToBeat\(current, targetBeat\.id\)/);
  assert.doesNotMatch(shellSource, /rawIndex/);
  assert.doesNotMatch(shellSource, /targetBeat/);
  assert.doesNotMatch(shellSource, /native-scroll-driver/);
  assert.doesNotMatch(shellSource, /native-scroll-beat/);
  assert.doesNotMatch(shellSource, /ScrollTrigger/);
  assert.doesNotMatch(shellSource, /Lenis/);
});

test("WP-18 makes one full-screen continuous scroll stage dominate the visual stage", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const stageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const railArticleBlock =
    presentationCss.match(/\.scroll-theater-rail article\s*\{(?<block>[^}]*)\}/)?.groups?.block ?? "";

  assert.match(layerSource, /scroll-continuum-shell/);
  assert.match(layerSource, /scroll-theater-shell/);
  assert.match(layerSource, /scroll-world-runway/);
  assert.match(layerSource, /scroll-world-runway-track/);
  assert.match(layerSource, /scroll-world-runway-scene/);
  assert.match(layerSource, /scroll-journey-stage/);
  assert.match(layerSource, /scroll-journey-path/);
  assert.match(layerSource, /journey-path-active/);
  assert.match(layerSource, /scroll-journey-object/);
  assert.match(layerSource, /scroll-journey-gates/);
  assert.match(layerSource, /data-journey-world=\{activeWorld\}/);
  assert.match(layerSource, /<b \/>/);
  assert.match(layerSource, /scroll-scene-brief/);
  assert.match(layerSource, /scroll-beat-constellation/);
  assert.match(layerSource, /beatsBySceneId/);
  assert.match(layerSource, /activeSceneBeatProgress/);
  assert.match(layerSource, /--runway-base-x/);
  assert.match(layerSource, /--runway-scene-drift-x/);
  assert.match(layerSource, /scroll-theater-actor-deck/);
  assert.match(layerSource, /actor-judgement/);
  assert.match(layerSource, /actor-ledger/);
  assert.match(layerSource, /scroll-theater-product/);
  assert.match(layerSource, /actor-safety/);
  assert.match(layerSource, /actor-action/);
  assert.match(layerSource, /world-marker-label/);
  assert.doesNotMatch(layerSource, /product-ghost-body/);
  assert.doesNotMatch(layerSource, /action-route-ghost/);
  assert.doesNotMatch(layerSource, /action-mile/);
  assert.match(layerSource, /scroll-theater-rail/);
  assert.match(layerSource, /scroll-theater-route/);
  assert.match(layerSource, /scroll-continuum-panel active/);
  assert.match(layerSource, /data-continuum-near=\{String\(Math\.abs\(offset\) <= 1\)\}/);
  assert.match(layerSource, /"--continuum-offset": offset/);
  assert.match(layerSource, /scenes\.map\(\(scene\) =>/);
  assert.match(layerSource, /--continuum-y/);
  assert.match(layerSource, /scroll-cinema-corridor/);
  assert.match(layerSource, /scroll-cinema-card active/);
  assert.match(layerSource, /resolved\.beat\.label/);
  assert.match(layerSource, /scroll-cinema-support/);
  assert.match(layerSource, /BEAT \$\{resolved\.beat\.id\}/);
  assert.match(layerSource, /scroll-momentum-band top/);
  assert.match(layerSource, /corridorScenes/);
  assert.match(stageSource, /data-reduced-motion=\{String\(resolved\.targetState\.reducedMotion\)\}/);
  assert.match(stageSource, /resolved\.scene\.sceneNumber >= 9 && resolved\.scene\.sceneNumber <= 15/);
  assert.match(stageSource, /resolved\.scene\.sceneNumber >= 16 && resolved\.scene\.sceneNumber <= 18/);
  assert.match(stageSource, /resolved\.scene\.sceneNumber >= 19/);
  assert.match(presentationCss, /\.scroll-narrative-layer\s*\{[\s\S]*z-index:\s*18/s);
  assert.match(presentationCss, /\.sticky-stage\s*\{[\s\S]*position:\s*sticky/s);
  assert.doesNotMatch(presentationCss, /\.native-scroll-driver/);
  assert.doesNotMatch(presentationCss, /\.native-scroll-beat/);
  assert.match(presentationCss, /\.scroll-theater-shell\s*\{[\s\S]*z-index:\s*15/s);
  assert.match(presentationCss, /\.scroll-journey-stage\s*\{[\s\S]*z-index:\s*24/s);
  assert.match(presentationCss, /\.scroll-journey-path\s*\{/);
  assert.match(presentationCss, /\.journey-path-active\s*\{[\s\S]*stroke-dashoffset:\s*calc\(\(1 - var\(--native-scroll-progress, 0\)\) \* 1\)/s);
  assert.match(presentationCss, /\.scroll-journey-object\s*\{[\s\S]*var\(--native-scroll-product-rotate, -16deg\)/s);
  assert.match(presentationCss, /\.scroll-journey-gates\s*\{[\s\S]*grid-template-columns:\s*repeat\(21, minmax\(0, 1fr\)\)/s);
  assert.match(presentationCss, /\.scroll-world-runway\s*\{[\s\S]*z-index:\s*14/s);
  assert.match(presentationCss, /\.scroll-world-runway-track\s*\{[\s\S]*var\(--runway-base-x, 20vw\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-track\s*\{[\s\S]*var\(--runway-scene-drift-x, 0vw\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-track\s*\{[\s\S]*var\(--free-scroll-runway-x, 0vw\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-track\s*\{[\s\S]*rotateX\(var\(--native-scroll-stage-tilt, -4deg\)\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-track\s*\{[\s\S]*scale\(var\(--native-scroll-stage-scale, 1\)\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-scene\s*\{[\s\S]*flex:\s*0 0 78vw/s);
  assert.match(presentationCss, /\.scroll-world-runway-scene\[data-scene-state="active"\]\s*\{[\s\S]*translate3d\(0, -3vh, 260px\)/s);
  assert.match(presentationCss, /\.scroll-world-runway-scene b\s*\{/);
  assert.match(presentationCss, /\.cinematic-route-layer,[\s\S]*\.integration-geometry\s*\{[\s\S]*opacity:\s*0\.06 !important/s);
  assert.match(presentationCss, /\.story-spine\s*\{[\s\S]*opacity:\s*0\.18 !important/s);
  assert.match(presentationCss, /\.scroll-scene-brief\s*\{[\s\S]*z-index:\s*12/s);
  assert.match(presentationCss, /\.scroll-beat-constellation\s*\{[\s\S]*grid-template-columns:\s*repeat\(var\(--scene-beat-count\), minmax\(0, 1fr\)\)/s);
  assert.match(presentationCss, /\.beat-progress-fill\s*\{[\s\S]*scaleX\(var\(--scene-beat-progress, 0\)\)/s);
  assert.match(presentationCss, /\.scroll-theater-rail\s*\{[\s\S]*var\(--native-scroll-rail-x, 0vw\)/s);
  assert.match(presentationCss, /\.scroll-theater-actor-deck\s*\{[\s\S]*var\(--native-scroll-product-rotate, -10deg\)/s);
  assert.match(presentationCss, /data-theater-world="judgement"[\s\S]*\.actor-judgement/);
  assert.match(presentationCss, /data-theater-world="ledger"[\s\S]*\.actor-ledger/);
  assert.match(presentationCss, /data-theater-world="product"[\s\S]*\.actor-product/);
  assert.match(presentationCss, /data-theater-world="safety"[\s\S]*\.actor-safety/);
  assert.match(presentationCss, /data-theater-world="action"[\s\S]*\.actor-action/);
  assert.match(presentationCss, /\.scroll-theater-route \.route-progress\s*\{[\s\S]*scaleX\(var\(--native-scroll-progress, 0\)\)/s);
  assert.match(presentationCss, /\.scroll-continuum-shell\s*\{[\s\S]*z-index:\s*5/s);
  assert.match(presentationCss, /\.scroll-continuum\s*\{[\s\S]*grid-auto-rows:\s*64vh/s);
  assert.match(presentationCss, /\.scroll-continuum-panel\.active\s*\{[\s\S]*opacity:\s*0\.96/s);
  assert.match(presentationCss, /\.scroll-theater-rail article\s*\{[\s\S]*min-height:\s*78px/s);
  assert.match(presentationCss, /\.scroll-theater-rail strong\s*\{[\s\S]*font-size:\s*clamp\(14px, 1\.25vw, 20px\)/s);
  assert.doesNotMatch(railArticleBlock, /height:\s*72vh/);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-shell\s*\{[\s\S]*visibility:\s*visible/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-shell\s*\{[\s\S]*opacity:\s*0\.74 !important/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum\s*\{[\s\S]*display:\s*block/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-panel\s*\{[\s\S]*position:\s*absolute/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-continuum-panel\s*\{[\s\S]*height:\s*74vh/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*data-continuum-near="true"[\s\S]*opacity:\s*0\.42/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-cinema-corridor\s*\{[\s\S]*z-index:\s*5/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.scroll-cinema-card\.active\s*\{[\s\S]*opacity:\s*0\.42/s);
  assert.match(presentationCss, /\.scroll-cinema-support\s*\{/);
  assert.match(presentationCss, /\.scroll-viewport-stack\s*\{[\s\S]*z-index:\s*5/s);
  assert.match(presentationCss, /\.scroll-story-window\s*\{[\s\S]*opacity:\s*0\.12/s);
  assert.match(presentationCss, /data-stage-mode="stage-play-v2"[\s\S]*\.visual-copy\s*\{[\s\S]*opacity:\s*0\.08/s);
  assert.match(
    presentationCss,
    /data-frame-kind="product-slot"[\s\S]*data-frame-kind="finale"[\s\S]*\.visual-copy\s*\{[\s\S]*opacity:\s*0\.24/s,
  );
  assert.match(presentationCss, /data-reduced-motion="true"[\s\S]*\.scroll-momentum-band[\s\S]*opacity:\s*0\.035/);
  assert.match(runtimeSource, /\.spatial-stage/);
  assert.match(runtimeSource, /\.persistent-actor-layer/);
  assert.doesNotMatch(runtimeSource, /--scroll-cinema-motion-x/);
  assert.doesNotMatch(runtimeSource, /\.scroll-cinema-card\.active/);
  assert.doesNotMatch(runtimeSource, /\.scroll-continuum-shell/);
  assert.doesNotMatch(runtimeSource, /scroll-momentum-band/);
  assert.match(runtimeSource, /reducedMotion \|\| direction === "hold"[\s\S]*"\.visual-copy"\), \{ opacity: 0\.08 \}/);
  assert.doesNotMatch(runtimeSource, /--free-scroll-offset", "0px"/);
  assert.doesNotMatch(runtimeSource, /--free-scroll-progress", "0"/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
});
