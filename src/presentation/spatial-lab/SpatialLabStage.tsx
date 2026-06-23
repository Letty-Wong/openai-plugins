import type { BeatId } from "@/presentation/core/state-types";
import { SpatialLabClientStage } from "@/presentation/spatial-lab/SpatialLabClientStage";
export { domTreeText, ownershipRows } from "@/presentation/spatial-lab/spatial-lab-contract";

const labBeatId = "16.1" satisfies BeatId;
export type SpatialLabMode = "review" | "debug";

export function SpatialLabStage({
  initialBeatId = labBeatId,
  initialMode = "debug"
}: {
  readonly initialBeatId?: BeatId;
  readonly initialMode?: SpatialLabMode;
}) {
  return <SpatialLabClientStage initialBeatId={initialBeatId} initialMode={initialMode} />;
}
