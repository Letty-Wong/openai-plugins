import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ctaConfig } from "../src/content/cta";
import {
  actionConfirmGate,
  boundaryModules,
  ctaPlaceholder,
  outputCards,
  scenarioCandidates
} from "../src/content/safety-prototype";
import { getStaticFrameKind } from "../src/presentation/stage/static-frames";

test("WP-05C maps the safety, action, and CTA continuity beats", () => {
  assert.equal(getStaticFrameKind("15.8"), "output-freeze");
  assert.equal(getStaticFrameKind("16.1"), "safety");
  assert.equal(getStaticFrameKind("16.3"), "safety");
  assert.equal(getStaticFrameKind("18.7"), "approval-gate");
  assert.equal(getStaticFrameKind("18.8"), "boundary-loop");
  assert.equal(getStaticFrameKind("19.1"), "scenario-radar");
  assert.equal(getStaticFrameKind("19.7"), "scenario-radar");
  assert.equal(getStaticFrameKind("19.9"), "action-path");
  assert.equal(getStaticFrameKind("20.1"), "action-path");
  assert.equal(getStaticFrameKind("20.10"), "action-path");
  assert.equal(getStaticFrameKind("21.1"), "action-path");
  assert.equal(getStaticFrameKind("21.6"), "action-path");
  assert.equal(getStaticFrameKind("21.7"), "cta-dock");
  assert.equal(getStaticFrameKind("21.8"), "finale");
  assert.equal(getStaticFrameKind("21.9"), "finale");
});

test("WP-05C keeps content approval separate from execution authorization", () => {
  assert.equal(actionConfirmGate.id, "action-confirm-gate");
  assert.equal(actionConfirmGate.executionAuthorized, false);
  assert.equal(outputCards.some((card) => card.reviewStatus === "APPROVED"), true);
  assert.equal(outputCards.filter((card) => card.contentStatus === "APPROVED").length, 2);
  assert.equal(outputCards.some((card) => card.contentStatus === "DO_NOT_USE"), true);
  assert.equal(outputCards.some((card) => card.label === "未确认商业承诺" && card.reviewStatus === "BLOCKED"), true);
});

test("WP-05C keeps boundary modules and scenario candidates data-driven", () => {
  assert.deepEqual(boundaryModules.map((module) => module.id), ["data", "tool", "content", "permission"]);
  assert.equal(scenarioCandidates.length, 6);
  assert.equal(scenarioCandidates.every((candidate) => candidate.conditions.length > 0), true);
});

test("WP-05C preserves CTA placeholders and does not invent links", () => {
  assert.equal(ctaConfig.status, "PLACEHOLDER");
  assert.equal(ctaPlaceholder.status, "PLACEHOLDER");
  assert.match(ctaPlaceholder.shortLinkLabel, /待确认/);
  assert.equal("shortLink" in ctaPlaceholder, false);
});

test("WP-05C renders separate HumanReviewNode, ActionConfirmGate, and CTA dock structures", () => {
  const safetyActorSource = readFileSync("src/presentation/stage/SafetyActors.tsx", "utf8");
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");

  assert.match(safetyActorSource, /function HumanReviewNode/);
  assert.match(safetyActorSource, /function ActionConfirmGate/);
  assert.match(safetyActorSource, /data-execution-authorized=\{String\(actionConfirmGate\.executionAuthorized\)\}/);
  assert.match(safetyActorSource, /function CtaDock/);
  assert.match(safetyActorSource, /CTA PLACEHOLDER/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.human-review"/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.action-confirm-gate"/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.cta-dock"/);
});
