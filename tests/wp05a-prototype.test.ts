import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getStaticFrameKind } from "../src/presentation/stage/static-frames";

test("WP-05A maps the high-risk prototype beats", () => {
  assert.equal(getStaticFrameKind("01.1"), "entry");
  assert.equal(getStaticFrameKind("01.2"), "hero");
  assert.equal(getStaticFrameKind("01.3"), "question");
  assert.equal(getStaticFrameKind("02.1"), "concept");
  assert.equal(getStaticFrameKind("02.4"), "concept");
  assert.equal(getStaticFrameKind("03.5"), "timeline-ai");
  assert.equal(getStaticFrameKind("04.7"), "path-dial");
  assert.equal(getStaticFrameKind("05.1"), "ledger");
});

test("WP-05A keeps ledger and path prototype code-generated", () => {
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const openingActorsSource = readFileSync("src/presentation/stage/OpeningActors.tsx", "utf8");

  assert.match(visualStageSource, /function BusinessPaths/);
  assert.match(visualStageSource, /TimelineTrack/);
  assert.match(openingActorsSource, /function LedgerDial/);
  assert.match(openingActorsSource, /function JudgementQuestion/);
});

test("WP-05A uses the same IntegrationRing component for roles", () => {
  const source = readFileSync("src/presentation/stage/IntegrationRing.tsx", "utf8");

  assert.match(source, /ledger/);
  assert.match(source, /timeline/);
  assert.match(source, /portal/);
  assert.match(source, /data-segment-id/);
});
