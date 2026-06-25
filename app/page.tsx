import { beatById } from "@/content/beats";
import type { BeatId } from "@/presentation/core/state-types";
import { PresentationStageV4 } from "@/presentation/spatial-lab/PresentationStageV4";
import type { SpatialLabMode } from "@/presentation/spatial-lab/PresentationStageV4";

type HomePageProps = {
  readonly searchParams?: Promise<{
    readonly beat?: string;
    readonly mode?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const beatId = toValidBeatId(params?.beat);
  const mode = toValidMode(params?.mode);

  return <PresentationStageV4 initialBeatId={beatId} initialMode={mode} />;
}

function toValidBeatId(value: string | undefined): BeatId | undefined {
  if (!value) return undefined;
  const candidate = value as BeatId;
  return beatById.has(candidate) ? candidate : undefined;
}

function toValidMode(value: string | undefined): SpatialLabMode | undefined {
  if (value === "review" || value === "debug") return value;
  return undefined;
}
