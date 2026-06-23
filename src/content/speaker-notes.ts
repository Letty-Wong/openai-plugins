import { beats } from "@/content/beats";

export const speakerNotesByBeatId = new Map(
  beats.map((beat) => [
    beat.id,
    {
      beatId: beat.id,
      note: `讲师备注占位：${beat.label}`,
      status: "PLACEHOLDER" as const
    }
  ])
);
