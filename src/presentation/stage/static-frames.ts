import type { BeatId } from "@/presentation/core/state-types";

export type StaticFrameKind =
  | "entry"
  | "hero"
  | "question"
  | "concept"
  | "timeline-ai"
  | "path-dial"
  | "ledger"
  | "product-slot"
  | "product"
  | "technical-facts"
  | "benefit-translation"
  | "output-freeze"
  | "safety"
  | "approval-gate"
  | "boundary-loop"
  | "scenario-radar"
  | "action-path"
  | "cta-dock"
  | "finale"
  | "default";

export function getStaticFrameKind(beatId: BeatId): StaticFrameKind {
  const [sceneToken, beatToken] = beatId.split(".");
  const sceneNumber = Number(sceneToken);
  const beatNumber = Number(beatToken);

  if (beatId === "01.1") return "entry";
  if (beatId === "01.2") return "hero";
  if (beatId === "01.3") return "question";
  if (beatId.startsWith("02.")) return "concept";
  if (beatId === "03.5") return "timeline-ai";
  if (beatId === "04.7") return "path-dial";
  if (beatId === "05.1") return "ledger";
  if (beatId === "08.7") return "product-slot";
  if (sceneNumber === 9) return "product";
  if (sceneNumber === 10) return "technical-facts";
  if (sceneNumber === 11) return "benefit-translation";
  if (beatId === "15.8") return "output-freeze";
  if (sceneNumber === 16) return "safety";
  if (beatId === "18.7") return "approval-gate";
  if (beatId === "18.8") return "boundary-loop";
  if (sceneNumber === 19 && beatNumber < 9) return "scenario-radar";
  if (sceneNumber === 19 && beatNumber === 9) return "action-path";
  if (sceneNumber === 20) return "action-path";
  if (sceneNumber === 21 && beatNumber <= 6) return "action-path";
  if (beatId === "21.7") return "cta-dock";
  if (sceneNumber === 21 && beatNumber >= 8) return "finale";

  return "default";
}
