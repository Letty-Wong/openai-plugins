import type { BeatId } from "@/presentation/core/state-types";
import { PresentationStageClientV4 } from "@/presentation/spatial-lab/SpatialLabClientStage";
export { domTreeText, ownershipRows } from "@/presentation/spatial-lab/spatial-lab-contract";

const defaultBeatId = "01.1" satisfies BeatId;
export type SpatialLabMode = "review" | "debug";

export function PresentationStageV4({
  initialBeatId = defaultBeatId,
  initialMode = "review"
}: {
  readonly initialBeatId?: BeatId;
  readonly initialMode?: SpatialLabMode;
}) {
  return <PresentationStageClientV4 initialBeatId={initialBeatId} initialMode={initialMode} />;
}
