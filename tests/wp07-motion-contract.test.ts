import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { motionAssetGates } from "../src/presentation/motion/asset-gates";
import { motionContracts, getMotionContract } from "../src/presentation/motion/motion-registry";
import { motionRuntimePolicy } from "../src/presentation/motion/motion-types";

test("WP-09 keeps only the approved GSAP runtime enabled", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const dependencyNames = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {})
  ]);

  assert.equal(motionRuntimePolicy.status, "WP09_CONTINUITY_ENABLED");
  assert.equal(motionRuntimePolicy.runtimeInstalled, true);
  assert.equal(motionRuntimePolicy.approvedRuntime, "GSAP");
  assert.equal(motionRuntimePolicy.canRunTimeline, true);
  assert.equal(motionRuntimePolicy.scrollDriven, false);
  assert.equal(dependencyNames.has("gsap"), true);
  assert.equal(dependencyNames.has("framer-motion"), false);
  assert.equal(dependencyNames.has("three"), false);
});

test("WP-07 registers key motion contracts with stable gates", () => {
  const expectedBeats = ["01.1", "03.5", "05.1", "08.7", "09.2", "15.8", "16.3", "18.7", "19.7", "20.10", "21.8"];
  const registeredBeats = motionContracts.map((contract) => contract.beatId);
  const gateIds = new Set(motionAssetGates.map((gate) => gate.id));

  assert.deepEqual(registeredBeats, expectedBeats);
  for (const contract of motionContracts) {
    assert.equal(gateIds.has(contract.gateId), true, `${contract.beatId} must use a known asset gate`);
  }
});

test("WP-07 enforces one primary, optional secondary, and optional ambient channel per beat", () => {
  for (const contract of motionContracts) {
    assert.equal(Boolean(contract.primary), true, `${contract.beatId} needs one primary motion`);
    assert.equal(contract.primary.transformOnly, true, `${contract.beatId} primary must use transform/opacity-safe motion`);
    assert.equal(contract.secondary?.transformOnly ?? true, true, `${contract.beatId} secondary must be transform-safe`);
    assert.equal(contract.ambient?.transformOnly ?? true, true, `${contract.beatId} ambient must be transform-safe`);
    assert.equal(contract.durationMs <= 1800, true, `${contract.beatId} duration exceeds spec ceiling`);
  }
});

test("WP-07 preserves reduced motion logic for every motion contract", () => {
  for (const contract of motionContracts) {
    assert.equal(contract.reducedMotion.preservesLogic, true);
    assert.equal(contract.reducedMotion.maxDurationMs <= 250, true);
  }
});

test("WP-07 blocks asset-dependent runtime motion until business materials are ready", () => {
  const blockedGates = motionAssetGates.filter((gate) => gate.blocksRuntime);
  const blockedContracts = motionContracts.filter((contract) => contract.readiness === "BLOCKED_BY_ASSET");

  assert.equal(blockedGates.length >= 3, true);
  assert.deepEqual(
    blockedContracts.map((contract) => contract.beatId),
    ["09.2", "16.3", "21.8"]
  );
  assert.equal(getMotionContract("16.3")?.gateId, "product-warm-red-registered");
  assert.equal(getMotionContract("21.8")?.gateId, "cta-configured");
});

test("WP-08A enables runtime only for the approved code-generated beat whitelist", () => {
  const runtimeReadyContracts = motionContracts.filter((contract) => contract.readiness === "READY_FOR_RUNTIME");

  assert.deepEqual(
    runtimeReadyContracts.map((contract) => contract.beatId),
    ["01.1", "03.5", "05.1", "18.7", "20.10"]
  );

  for (const contract of runtimeReadyContracts) {
    assert.equal(contract.gateId, "code-generated-ok");
  }
});

test("WP-08A keeps StageMotionRuntime scoped, client-only, and interruptible", () => {
  const runtimeSource = readFileSync("src/presentation/motion/StageMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /"use client"/);
  assert.match(runtimeSource, /new Set<BeatId>\(\["01\.1", "03\.5", "05\.1", "18\.7", "20\.10"\]\)/);
  assert.match(runtimeSource, /gsap\.context/);
  assert.match(runtimeSource, /context\.revert\(\)/);
  assert.match(runtimeSource, /data-motion-enabled/);
  assert.doesNotMatch(runtimeSource, /framer-motion/);
  assert.doesNotMatch(runtimeSource, /addEventListener\(["']scroll/);
});
