import type { BeatId } from "@/presentation/core/state-types";
import { SpatialLabClientStage } from "@/presentation/spatial-lab/SpatialLabClientStage";
export { domTreeText, ownershipRows } from "@/presentation/spatial-lab/spatial-lab-contract";

const labBeatId = "16.1" satisfies BeatId;

export function SpatialLabStage({
  initialBeatId = labBeatId
}: {
  readonly initialBeatId?: BeatId;
}) {
  return <SpatialLabClientStage initialBeatId={initialBeatId} />;
}
