import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { getStaticFrameKind } from "../src/presentation/stage/static-frames";

test("WP-04 maps the four static keyframes", () => {
  assert.equal(getStaticFrameKind("01.2"), "hero");
  assert.equal(getStaticFrameKind("09.2"), "product");
  assert.equal(getStaticFrameKind("16.3"), "safety");
  assert.equal(getStaticFrameKind("21.8"), "finale");
  assert.equal(getStaticFrameKind("03.4"), "default");
});

test("WP-04 style contracts exist", () => {
  for (const file of [
    "src/styles/tokens.css",
    "src/styles/typography.css",
    "src/styles/presentation.css",
    "src/styles/reduced-motion.css"
  ]) {
    assert.equal(existsSync(file), true, `${file} should exist`);
  }
});

test("WP-04 keeps one five-segment IntegrationRing identity", () => {
  const source = readFileSync("src/presentation/stage/IntegrationRing.tsx", "utf8");
  const segmentMatches = source.match(/integration-ring-segment-/g) ?? [];

  assert.equal(source.includes("data-ring-role"), true);
  assert.equal(segmentMatches.length, 1);
  assert.match(source, /segmentPaths = \[/);
});
