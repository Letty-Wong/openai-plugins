import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-16 keeps archived continuity object source while product and action bodies live in persistent actors", () => {
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const objectLayerSource = readFileSync("src/presentation/stage/ContinuityObjectLayer.tsx", "utf8");
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.doesNotMatch(visualStageSource, /import \{ ContinuityObjectLayer \}/);
  assert.doesNotMatch(visualStageSource, /<ContinuityObjectLayer frameKind=\{frameKind\} sceneNumber=\{resolved\.scene\.sceneNumber\}/);
  assert.match(visualStageSource, /<PersistentActorLayer frameKind=\{frameKind\} resolved=\{resolved\} \/>/);
  assert.match(objectLayerSource, /data-continuity-object="product"/);
  assert.match(objectLayerSource, /data-continuity-object="action"/);
  assert.match(objectLayerSource, /sceneNumber >= 12 && sceneNumber <= 18/);
  assert.match(objectLayerSource, /data-product-id=\{productPrototype\.id\}/);
  assert.match(objectLayerSource, /data-active-fact-id=\{activeFact\.id\}/);
  assert.match(objectLayerSource, /data-active-claim-id=\{activeClaim\.id\}/);
  assert.match(objectLayerSource, /data-cta-status=\{ctaPlaceholder\.status\}/);
  assert.match(persistentLayerSource, /<ProductStage renderState=\{productState\.renderState\} variant=\{productState\.variant\} \/>/);
  assert.match(persistentLayerSource, /className="action-path-line"/);
  assert.match(presentationCss, /\.continuity-object-layer\s*\{[^}]*z-index:\s*10/s);
  assert.match(presentationCss, /\.product-object-shell/);
  assert.doesNotMatch(objectLayerSource, /className="object-product-form"/);
  assert.doesNotMatch(objectLayerSource, /className="action-object-path"/);
  assert.match(presentationCss, /\.action-object-path\s*\{[\s\S]*display:\s*none/s);
  assert.match(presentationCss, /\.visual-copy \.display-title\.compact\s*\{[^}]*1\.7vw/s);
});

test("WP-16 keeps archived continuity object motion out of the WP-31 runtime", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");
  const packageSource = readFileSync("package.json", "utf8");

  assert.match(runtimeSource, /\.persistent-actor-layer/);
  assert.doesNotMatch(runtimeSource, /\.continuity-object-layer/);
  assert.doesNotMatch(runtimeSource, /\.object-step-rail span/);
  assert.doesNotMatch(runtimeSource, /\.action-object-milestones span/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
  assert.doesNotMatch(runtimeSource, /ScrollTrigger/);
  assert.doesNotMatch(runtimeSource, /Lenis/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
  assert.doesNotMatch(packageSource, /framer-motion/);
  assert.doesNotMatch(packageSource, /three/);
});
