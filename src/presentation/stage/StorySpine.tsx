import { beats } from "@/content/beats";
import { scenes } from "@/content/scenes";
import type { ResolvedBeatState } from "@/presentation/core/state-types";
import type { CSSProperties } from "react";

type StorySpineProps = {
  readonly resolved: ResolvedBeatState;
};

const worldBySceneNumber = (sceneNumber: number) => {
  if (sceneNumber <= 4) return "judgement";
  if (sceneNumber <= 8) return "ledger";
  if (sceneNumber <= 15) return "product";
  if (sceneNumber <= 18) return "safety";
  return "action";
};

export function StorySpine({ resolved }: StorySpineProps) {
  const activeBeatIndex = resolved.beat.order - 1;
  const totalBeats = beats.length;
  const progress = totalBeats > 1 ? activeBeatIndex / (totalBeats - 1) : 0;
  const activeSceneNumber = resolved.scene.sceneNumber;
  const activeWorld = worldBySceneNumber(activeSceneNumber);

  return (
    <aside
      aria-label="Presentation story route"
      className="story-spine"
      data-active-world={activeWorld}
      style={
        {
          "--story-progress": progress,
          "--story-progress-percent": `${Math.round(progress * 100)}%`
        } as CSSProperties
      }
    >
      <div className="story-spine-header">
        <span className="story-spine-kicker">CONTINUOUS ROUTE</span>
        <strong>{resolved.scene.chapter}</strong>
        <span>
          {String(activeSceneNumber).padStart(2, "0")} / 21
          <b>{resolved.beat.id}</b>
        </span>
      </div>

      <div className="story-spine-track" aria-hidden="true">
        <div className="story-spine-rail" />
        <div className="story-spine-fill" />
        <div className="story-spine-current" />
        {scenes.map((scene) => {
          const sceneStartOrder = beats.find((beat) => beat.sceneId === scene.id)?.order ?? 1;
          const sceneProgress = totalBeats > 1 ? (sceneStartOrder - 1) / (totalBeats - 1) : 0;
          const isActive = scene.id === resolved.scene.id;

          return (
            <span
              className={isActive ? "story-spine-node active" : "story-spine-node"}
              data-scene-number={String(scene.sceneNumber).padStart(2, "0")}
              key={scene.id}
              style={{ "--node-left": `${sceneProgress * 100}%` } as CSSProperties}
            />
          );
        })}
      </div>

      <div className="story-spine-worlds" aria-hidden="true">
        <span className={activeWorld === "judgement" ? "active" : ""}>判断</span>
        <span className={activeWorld === "ledger" ? "active" : ""}>四本账</span>
        <span className={activeWorld === "product" ? "active" : ""}>产品样板</span>
        <span className={activeWorld === "safety" ? "active" : ""}>安全边界</span>
        <span className={activeWorld === "action" ? "active" : ""}>行动路径</span>
      </div>
    </aside>
  );
}
