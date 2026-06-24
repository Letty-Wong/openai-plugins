import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-54 React seeds pose variables from the initial target only", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /const initialTargetRef = useRef\(target\)/);
  assert.match(labSource, /style=\{initialViewportStyle\(initialTargetRef\.current\)\}/);
  assert.match(labSource, /style=\{initialCameraStyle\(initialTarget\)\}/);
  assert.match(labSource, /style=\{initialActorStyle\(initialActor\)\}/);
  assert.match(labSource, /style=\{initialArtifactStyle\(initialArtifact\)\}/);
  assert.doesNotMatch(labSource, /style=\{initialCameraStyle\(target\)\}/);
  assert.doesNotMatch(labSource, /style=\{initialActorStyle\(actor\)\}/);
  assert.doesNotMatch(labSource, /style=\{initialArtifactStyle\(artifact\)\}/);
});

test("WP-54 PoseTransitionRuntime does not revert on target update cleanup", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const unmountCleanupCount = runtimeSource.match(/context\.revert\(\)/g)?.length ?? 0;

  assert.equal(unmountCleanupCount, 1);
  assert.match(runtimeSource, /useLayoutEffect\(\(\) => \{[\s\S]*runtimeRef\.current = \{ context, root \}/);
  assert.match(runtimeSource, /return \(\) => \{[\s\S]*context\.revert\(\);[\s\S]*runtimeRef\.current = null;/);
  assert.equal(runtimeSource.includes("  }, []);"), true);
  assert.match(runtimeSource, /useLayoutEffect\(\(\) => \{[\s\S]*gsap\.killTweensOf\(poseNodes\);[\s\S]*viewportVars\(target\)/);
  assert.doesNotMatch(runtimeSource, /\}, \[reducedMotion, target\]\);[\s\S]*context\.revert\(\)/);
});

test("WP-54 Runtime writes perspective to ScreenViewport, not WorldCamera", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /root\.querySelector<HTMLElement>\("\.spatial-lab-viewport"\)/);
  assert.match(runtimeSource, /function viewportVars\(target: StageTarget\)/);
  assert.match(runtimeSource, /"--lab-camera-perspective": `\$\{target\.camera\.perspective\}px`/);
  assert.doesNotMatch(runtimeSource, /function cameraVars\(target: StageTarget\): Record<string, string \| number> \{\s*return \{\s*"--lab-camera-perspective"/);
});

test("WP-54 Lab product opacity and ring tone have single temporary owners", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const styleSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(labSource, /tone="paper"/);
  assert.doesNotMatch(labSource, /sceneNumber >= 8 \? "ink" : "paper"/);
  assert.match(styleSource, /\.spatial-lab-product-geometry \.product-stage-shell \{[\s\S]*opacity: 1;/);
});

test("WP-54 Spatial Lab uses stable actor keys and discrete presenter input", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /key=\{actorId\}/);
  assert.match(labSource, /data-stage-actor-id=\{actor\.actorId\}/);
  assert.match(labSource, /reduceKeyboardShortcut\(state, event\)/);
  assert.match(labSource, /addEventListener\("wheel", handleWheel, \{ passive: false \}\)/);
  assert.match(labSource, /deltaY > 0 \? nextBeat\(current\) : previousBeat\(current\)/);
  assert.doesNotMatch(labSource, /scrollY/);
});

test("WP-54 ownership contract separates variable storage from the writer", () => {
  const contractSource = readFileSync("src/presentation/spatial-lab/spatial-lab-contract.ts", "utf8");

  assert.match(contractSource, /perspective CSS variable storage/);
  assert.match(contractSource, /camera transform CSS variable storage/);
  assert.match(contractSource, /actor pose CSS variable storage/);
  assert.match(contractSource, /artifact pose CSS variable storage/);
  assert.match(contractSource, /only post-seed writes to perspective, camera, actor, and artifact pose CSS variables/);
  assert.doesNotMatch(contractSource, /double-writing/);
  assert.doesNotMatch(contractSource, /FIX-A2 must resolve/);
});
