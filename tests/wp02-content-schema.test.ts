import assert from "node:assert/strict";
import test from "node:test";
import { beats, beatsBySceneId } from "../src/content/beats";
import { ctaConfig } from "../src/content/cta";
import { qaItems } from "../src/content/qa";
import { scenes } from "../src/content/scenes";
import {
  getAudienceScreenCopy,
  getNextBeatId,
  getPreviousBeatId,
  resolveBeatState,
  resolveInitialState
} from "../src/presentation/core/state-resolver";
import type { ScreenCopy } from "../src/presentation/core/state-types";

test("WP-02 locks 21 scenes and 144 beats", () => {
  assert.equal(scenes.length, 21);
  assert.equal(beats.length, 144);
  assert.deepEqual(
    scenes.map((scene) => scene.id),
    Array.from({ length: 21 }, (_, index) =>
      `scene-${String(index + 1).padStart(2, "0")}`
    )
  );
});

test("beat ids are unique and attached to their scene", () => {
  const ids = new Set(beats.map((beat) => beat.id));
  assert.equal(ids.size, beats.length);

  for (const scene of scenes) {
    const sceneBeats = beatsBySceneId.get(scene.id);
    assert.equal(sceneBeats?.length, scene.beatIds.length);
    assert.deepEqual(
      sceneBeats?.map((beat) => beat.id),
      scene.beatIds
    );
  }
});

test("each beat has deterministic target and reduced-motion states", () => {
  for (const beat of beats) {
    const normal = resolveBeatState(beat.id);
    const reduced = resolveBeatState(beat.id, { reducedMotion: true });

    assert.equal(normal.targetState.id, beat.targetStateId);
    assert.equal(normal.targetState.beatId, beat.id);
    assert.equal(normal.targetState.sceneId, beat.sceneId);
    assert.equal(normal.targetState.reducedMotion, false);

    assert.equal(reduced.targetState.id, beat.reducedMotionStateId);
    assert.equal(reduced.targetState.reducedMotion, true);
  }
});

test("navigation helpers resolve adjacent beats without replay history", () => {
  assert.equal(resolveInitialState().beat.id, "01.1");
  assert.equal(getPreviousBeatId("01.1"), null);
  assert.equal(getNextBeatId("01.1"), "01.2");
  assert.equal(getNextBeatId("01.3"), "02.1");
  assert.equal(getPreviousBeatId("02.1"), "01.3");
  assert.equal(getNextBeatId("21.9"), null);
});

test("DO_NOT_USE copy is blocked before audience output", () => {
  const unsafeCopy: ScreenCopy = {
    title: "Do not show",
    status: "DO_NOT_USE"
  };

  assert.equal(getAudienceScreenCopy(unsafeCopy), null);
});

test("Q&A remains a six-item scene-21 submode and CTA is placeholder", () => {
  assert.equal(qaItems.length, 6);
  assert.ok(qaItems.every((item) => item.id.startsWith("qa-")));
  assert.ok(qaItems.every((item) => item.relatedSceneIds.length > 0));
  assert.equal(ctaConfig.status, "PLACEHOLDER");
  assert.equal(ctaConfig.qrAssetPath, undefined);
});
