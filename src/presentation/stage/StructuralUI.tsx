import type { ResolvedBeatState } from "@/presentation/core/state-types";

type StructuralUIProps = {
  readonly resolved: ResolvedBeatState;
};

export function StructuralUI({ resolved }: StructuralUIProps) {
  return (
    <div className="structural-ui" aria-hidden="true">
      <div className="stage-marker">
        <strong>{String(resolved.scene.sceneNumber).padStart(2, "0")}</strong>
        <span>/ 21</span>
        <span>{resolved.beat.id}</span>
      </div>
      <div className="stage-footer">144-beat continuous stage</div>
    </div>
  );
}
