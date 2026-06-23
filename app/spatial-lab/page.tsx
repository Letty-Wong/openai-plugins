import { beatById } from "@/content/beats";
import { SpatialLabStage } from "@/presentation/spatial-lab/SpatialLabStage";
import type { BeatId } from "@/presentation/core/state-types";

type SpatialLabPageProps = {
  readonly searchParams?: Promise<{
    readonly beat?: string;
  }>;
};

export default async function SpatialLabPage({
  searchParams
}: SpatialLabPageProps) {
  const params = await searchParams;
  const beatId = toValidBeatId(params?.beat);

  return <SpatialLabStage initialBeatId={beatId} />;
}

function toValidBeatId(value: string | undefined): BeatId | undefined {
  if (!value) return undefined;
  const candidate = value as BeatId;
  return beatById.has(candidate) ? candidate : undefined;
}
