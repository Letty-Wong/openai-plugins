import assert from "node:assert/strict";
import test from "node:test";

import { beats } from "../src/content/beats";
import { speakerNotesByBeatId } from "../src/content/speaker-notes";

test("WP-65 replaces placeholder speaker notes with approved lecture cues", () => {
  assert.equal(speakerNotesByBeatId.size, beats.length);

  for (const beat of beats) {
    const note = speakerNotesByBeatId.get(beat.id);

    assert.ok(note, `${beat.id} must have a speaker note`);
    assert.equal(note.status, "APPROVED");
    assert.doesNotMatch(note.note, /讲师备注占位/);
    assert.match(note.note, new RegExp(beat.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("WP-65 keeps commercial fields under human confirmation in speaker notes", () => {
  const productJourneyNote = speakerNotesByBeatId.get("14.3");
  const finaleNote = speakerNotesByBeatId.get("21.7");

  assert.match(productJourneyNote?.note ?? "", /MOQ、价格、质保、交期必须待人工确认/);
  assert.match(finaleNote?.note ?? "", /二维码、价格、MOQ、质保和交期仍需人工确认/);
});
