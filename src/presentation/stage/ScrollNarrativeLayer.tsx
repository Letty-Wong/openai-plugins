import { beats, beatsBySceneId } from "@/content/beats";
import { scenes } from "@/content/scenes";
import type { ResolvedBeatState } from "@/presentation/core/state-types";
import type { CSSProperties } from "react";

type ScrollNarrativeLayerProps = {
  readonly resolved: ResolvedBeatState;
};

const worldBySceneNumber = (sceneNumber: number) => {
  if (sceneNumber <= 4) return "judgement";
  if (sceneNumber <= 8) return "ledger";
  if (sceneNumber <= 15) return "product";
  if (sceneNumber <= 18) return "safety";
  return "action";
};

function sceneState(sceneNumber: number, activeSceneNumber: number) {
  if (sceneNumber === activeSceneNumber) return "active";
  if (sceneNumber < activeSceneNumber) return "before";
  return "after";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function filmScenes(activeSceneNumber: number) {
  return [-2, -1, 0, 1, 2]
    .map((offset) => {
      const scene = scenes.find((candidate) => candidate.sceneNumber === activeSceneNumber + offset);
      return scene ? { scene, offset } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function viewportScenes(activeSceneNumber: number) {
  return [-1, 0, 1]
    .map((offset) => {
      const scene = scenes.find((candidate) => candidate.sceneNumber === activeSceneNumber + offset);
      return scene ? { scene, offset } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function corridorScenes(activeSceneNumber: number) {
  return [-3, -2, -1, 0, 1, 2, 3]
    .map((offset) => {
      const scene = scenes.find((candidate) => candidate.sceneNumber === activeSceneNumber + offset);
      return scene ? { scene, offset } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export function ScrollNarrativeLayer({ resolved }: ScrollNarrativeLayerProps) {
  const activeSceneNumber = resolved.scene.sceneNumber;
  const beatProgress = beats.length > 1 ? (resolved.beat.order - 1) / (beats.length - 1) : 0;
  const sceneProgress = scenes.length > 1 ? (activeSceneNumber - 1) / (scenes.length - 1) : 0;
  const trackX = clamp(34 - sceneProgress * 438, -404, 34);
  const trackY = clamp(13 + sceneProgress * 72, 13, 85);
  const ribbonX = clamp(sceneProgress * -64, -64, 0);
  const reverseRibbonX = Math.abs(ribbonX) * 0.62;
  const activeWorld = worldBySceneNumber(activeSceneNumber);
  const progressLabel = `${String(Math.round(beatProgress * 100)).padStart(2, "0")}%`;
  const reelScenes = filmScenes(activeSceneNumber);
  const stackScenes = viewportScenes(activeSceneNumber);
  const cinemaScenes = corridorScenes(activeSceneNumber);
  const momentumScenes = [...scenes, ...scenes.slice(0, 8)];
  const activeSceneBeats = beatsBySceneId.get(resolved.scene.id) ?? [];
  const activeBeatIndex = Math.max(
    0,
    activeSceneBeats.findIndex((beat) => beat.id === resolved.beat.id)
  );
  const activeSceneBeatProgress =
    activeSceneBeats.length > 1 ? activeBeatIndex / (activeSceneBeats.length - 1) : 0;

  return (
    <div
      aria-hidden="true"
      className={`scroll-narrative-layer scroll-world-${activeWorld}`}
      data-scroll-world={activeWorld}
      data-scroll-scene={String(activeSceneNumber).padStart(2, "0")}
      style={
        {
          "--scroll-progress": beatProgress,
          "--scroll-progress-percent": `${Math.round(beatProgress * 100)}%`,
          "--scroll-track-x": `${trackX}vw`,
          "--scroll-track-y": `${trackY}vh`,
          "--scroll-ribbon-x": `${ribbonX}vw`,
          "--scroll-ribbon-reverse-x": `${reverseRibbonX}vw`,
          "--scene-beat-progress": activeSceneBeatProgress,
          "--runway-base-x": `${20 - (activeSceneNumber - 1) * 84}vw`,
          "--runway-scene-drift-x": `${activeSceneBeatProgress * -12}vw`,
          "--continuum-index": activeSceneNumber - 1,
          "--continuum-y": `${42 - (activeSceneNumber - 1) * 110}vh`
        } as CSSProperties
      }
    >
      <div className="scroll-stage-focus-field" />

      <div className="scroll-curtain-field" data-curtain-world={activeWorld}>
        {viewportScenes(activeSceneNumber).map(({ scene, offset }) => {
          const world = worldBySceneNumber(scene.sceneNumber);

          return (
            <section
              className={offset === 0 ? "scroll-curtain-panel active" : "scroll-curtain-panel"}
              data-curtain-offset={offset}
              data-scene-state={sceneState(scene.sceneNumber, activeSceneNumber)}
              data-world={world}
              key={`curtain-${scene.id}`}
              style={
                {
                  "--curtain-offset": offset,
                  "--curtain-distance": Math.abs(offset)
                } as CSSProperties
              }
            >
              <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
              <div>
                <p>{scene.chapter}</p>
                <strong>{offset === 0 ? resolved.beat.label : scene.title}</strong>
              </div>
              <i>{world}</i>
            </section>
          );
        })}
      </div>

      <div className="scroll-flow-field" data-flow-world={activeWorld}>
        <div className="scroll-flow-spine" />
        {cinemaScenes.slice(1, 6).map(({ scene, offset }) => {
          const world = worldBySceneNumber(scene.sceneNumber);

          return (
            <section
              className={offset === 0 ? "scroll-flow-slice active" : "scroll-flow-slice"}
              data-flow-offset={offset}
              data-scene-state={sceneState(scene.sceneNumber, activeSceneNumber)}
              data-world={world}
              key={`flow-${scene.id}`}
              style={
                {
                  "--flow-offset": offset,
                  "--flow-distance": Math.abs(offset)
                } as CSSProperties
              }
            >
              <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
              <strong>{offset === 0 ? resolved.beat.label : scene.title}</strong>
              <i>{world}</i>
            </section>
          );
        })}
      </div>

      <div className="scroll-journey-stage" data-journey-world={activeWorld}>
        <svg className="scroll-journey-path" viewBox="0 0 1400 760">
          <path
            className="journey-path-shadow"
            d="M56 500 C232 404 328 580 500 430 S778 208 962 342 S1190 520 1340 252"
            pathLength="1"
          />
          <path
            className="journey-path-active"
            d="M56 500 C232 404 328 580 500 430 S778 208 962 342 S1190 520 1340 252"
            pathLength="1"
          />
        </svg>
        <div className="scroll-journey-object" data-journey-actor={activeWorld}>
          <span className="journey-object-shadow" />
          <span className="journey-object-body" />
          <span className="journey-object-core" />
          <span className="journey-object-node node-a" />
          <span className="journey-object-node node-b" />
          <span className="journey-object-node node-c" />
        </div>
        <div className="scroll-journey-copy">
          <span>{resolved.scene.chapter}</span>
          <strong>{resolved.beat.label}</strong>
          <p>{resolved.scene.screenCopy.finalLine}</p>
        </div>
        <div className="scroll-journey-gates">
          {scenes.map((scene) => (
            <i
              className={scene.sceneNumber === activeSceneNumber ? "active" : undefined}
              data-scene-state={sceneState(scene.sceneNumber, activeSceneNumber)}
              data-world={worldBySceneNumber(scene.sceneNumber)}
              key={`journey-${scene.id}`}
            >
              <b>{String(scene.sceneNumber).padStart(2, "0")}</b>
            </i>
          ))}
        </div>
      </div>

      <div className="scroll-world-runway" data-runway-world={activeWorld}>
        <div className="scroll-world-runway-track">
          {scenes.map((scene) => {
            const world = worldBySceneNumber(scene.sceneNumber);
            const state = sceneState(scene.sceneNumber, activeSceneNumber);

            return (
              <section
                className="scroll-world-runway-scene"
                data-scene-state={state}
                data-world={world}
                key={`runway-${scene.id}`}
              >
                <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
                <b />
                <i />
                <small>{scene.title}</small>
                <em>{state === "active" ? resolved.beat.label : scene.chapter}</em>
                <strong>{world}</strong>
              </section>
            );
          })}
        </div>
      </div>

      <div className="scroll-theater-shell" data-theater-world={activeWorld}>
        <div className="scroll-scene-brief">
          <span>{resolved.scene.chapter}</span>
          <h2>{resolved.scene.title}</h2>
          <strong>{resolved.beat.label}</strong>
          <p>{resolved.scene.screenCopy.finalLine}</p>
        </div>

        <div className="scroll-theater-depth depth-one">
          {scenes.map((scene) => (
            <span key={`depth-one-${scene.id}`}>{scene.chapter}</span>
          ))}
        </div>
        <div className="scroll-theater-depth depth-two">
          {scenes.map((scene) => (
            <span key={`depth-two-${scene.id}`}>{String(scene.sceneNumber).padStart(2, "0")}</span>
          ))}
        </div>
        <div className="scroll-theater-route">
          <span className="route-thread" />
          <span className="route-progress" />
          {scenes.map((scene) => (
            <i
              className={scene.sceneNumber === activeSceneNumber ? "active" : undefined}
              data-world={worldBySceneNumber(scene.sceneNumber)}
              key={`route-${scene.id}`}
            />
          ))}
        </div>
        <div className="scroll-theater-actor-deck" data-active-actor={activeWorld}>
          <div className="scroll-theater-actor actor-judgement" data-theater-actor="judgement">
            <span className="judgement-ring" />
            <span className="judgement-orbit orbit-one" />
            <span className="judgement-orbit orbit-two" />
            <span className="judgement-node node-one" />
            <span className="judgement-node node-two" />
            <span className="judgement-question">要不要接入</span>
          </div>
          <div className="scroll-theater-actor actor-ledger" data-theater-actor="ledger">
            <span className="ledger-disc" />
            <span className="ledger-axis vertical" />
            <span className="ledger-axis horizontal" />
            <span className="ledger-chip chip-one">开源</span>
            <span className="ledger-chip chip-two">节流</span>
            <span className="ledger-chip chip-three">提效</span>
            <span className="ledger-chip chip-four">沉淀</span>
          </div>
          <div className="scroll-theater-actor scroll-theater-product actor-product" data-theater-actor="product">
            <span className="world-marker-label">PRODUCT STAGE</span>
            <span className="world-marker-axis axis-one" />
            <span className="world-marker-axis axis-two" />
            <span className="world-marker-node node-one" />
            <span className="world-marker-node node-two" />
          </div>
          <div className="scroll-theater-actor actor-safety" data-theater-actor="safety">
            <span className="safety-frame outer" />
            <span className="safety-frame inner" />
            <span className="safety-gate gate-one">资料</span>
            <span className="safety-gate gate-two">工具</span>
            <span className="safety-gate gate-three">内容</span>
            <span className="safety-gate gate-four">权限</span>
          </div>
          <div className="scroll-theater-actor actor-action" data-theater-actor="action">
            <span className="world-marker-label">ACTION STAGE</span>
            <span className="world-marker-axis axis-one" />
            <span className="world-marker-axis axis-two" />
            <span className="world-marker-node node-one" />
            <span className="world-marker-node node-two" />
          </div>
        </div>
        <div className="scroll-theater-rail">
          {scenes.map((scene) => (
            <article
              className={scene.sceneNumber === activeSceneNumber ? "active" : undefined}
              data-world={worldBySceneNumber(scene.sceneNumber)}
              key={`theater-${scene.id}`}
            >
              <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
              <strong>{scene.sceneNumber === activeSceneNumber ? resolved.beat.label : scene.title}</strong>
              <small>{scene.screenCopy.support}</small>
            </article>
          ))}
        </div>
        <div className="scroll-theater-readout">
          <span>SCROLL</span>
          <strong>{String(resolved.beat.order).padStart(3, "0")}</strong>
          <i>{progressLabel}</i>
        </div>
        <div
          className="scroll-beat-constellation"
          style={{ "--scene-beat-count": activeSceneBeats.length } as CSSProperties}
        >
          <span className="beat-progress-thread" />
          <span className="beat-progress-fill" />
          {activeSceneBeats.map((beat, index) => {
            const state =
              index === activeBeatIndex ? "active" : index < activeBeatIndex ? "past" : "future";

            return (
              <i
                data-beat-state={state}
                key={beat.id}
                style={{ "--beat-index": index } as CSSProperties}
              >
                <b>{String(index + 1).padStart(2, "0")}</b>
                <em>{beat.label}</em>
              </i>
            );
          })}
        </div>
      </div>

      <div className="scroll-continuum-shell">
        <div className="scroll-continuum" data-continuum-world={activeWorld}>
          {scenes.map((scene) => {
            const state = sceneState(scene.sceneNumber, activeSceneNumber);
            const world = worldBySceneNumber(scene.sceneNumber);
            const isActive = state === "active";
            const offset = scene.sceneNumber - activeSceneNumber;

            return (
              <section
                className={isActive ? "scroll-continuum-panel active" : "scroll-continuum-panel"}
                data-continuum-offset={offset}
                data-continuum-near={String(Math.abs(offset) <= 1)}
                data-scene-state={state}
                data-world={world}
                key={scene.id}
                style={{ "--continuum-offset": offset } as CSSProperties}
              >
                <div className="scroll-continuum-index">
                  <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
                  <i>{world}</i>
                </div>
                <div className="scroll-continuum-copy">
                  <p>{scene.chapter}</p>
                  <strong>{isActive ? resolved.beat.label : scene.title}</strong>
                  <small>{isActive ? resolved.audienceScreenCopy?.support : scene.screenCopy.support}</small>
                </div>
                <div className="scroll-continuum-beats">
                  {scene.beatIds.map((beatId) => (
                    <span className={beatId === resolved.beat.id ? "active" : undefined} key={beatId} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="scroll-momentum-band top">
        {momentumScenes.map((scene, index) => (
          <span key={`${scene.id}-top-${index}`}>{String(scene.sceneNumber).padStart(2, "0")} / {scene.title}</span>
        ))}
      </div>

      <div className="scroll-momentum-band bottom">
        {momentumScenes.map((scene, index) => (
          <span key={`${scene.id}-bottom-${index}`}>{scene.chapter}</span>
        ))}
      </div>

      <div className="scroll-cinema-corridor" data-cinema-world={activeWorld}>
        {cinemaScenes.map(({ scene, offset }) => (
          <article
            className={offset === 0 ? "scroll-cinema-card active" : "scroll-cinema-card"}
            data-cinema-offset={offset}
            key={scene.id}
            style={
              {
                "--cinema-offset": offset,
                "--cinema-distance": Math.abs(offset)
              } as CSSProperties
            }
          >
            <div className="scroll-cinema-meta">
              <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
              <i>{scene.chapter}</i>
            </div>
            <strong>{offset === 0 ? resolved.beat.label : scene.title}</strong>
            <p className="scroll-cinema-support">
              {offset === 0 ? resolved.audienceScreenCopy?.support : scene.screenCopy.support}
            </p>
            <small className="scroll-cinema-status">
              {offset === 0 ? `BEAT ${resolved.beat.id}` : scene.screenCopy.finalLine}
            </small>
          </article>
        ))}
      </div>

      <div className="scroll-story-window">
        <span>{resolved.scene.chapter}</span>
        <strong>{resolved.beat.label}</strong>
      </div>

      <div className="scroll-lens-frame">
        <span className="scroll-lens-corner top-left" />
        <span className="scroll-lens-corner top-right" />
        <span className="scroll-lens-corner bottom-left" />
        <span className="scroll-lens-corner bottom-right" />
        <div className="scroll-lens-readout">
          <b>{String(activeSceneNumber).padStart(2, "0")}</b>
          <span>SCENE / {progressLabel}</span>
        </div>
      </div>

      <div className="scroll-depth-stack">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} style={{ "--depth-index": index } as CSSProperties} />
        ))}
      </div>

      <div className="scroll-viewport-stack">
        {stackScenes.map(({ scene, offset }) => (
          <article
            className={offset === 0 ? "scroll-viewport-card active" : "scroll-viewport-card"}
            data-stack-offset={offset}
            key={scene.id}
            style={
              {
                "--stack-y": `${offset * 53}vh`,
                "--stack-x": `${Math.abs(offset) * 3}vw`,
                "--stack-scale": offset === 0 ? 1 : 0.82,
                "--stack-opacity": offset === 0 ? 0.82 : 0.36
              } as CSSProperties
            }
          >
            <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
            <strong>{scene.title}</strong>
            <i>{scene.chapter}</i>
          </article>
        ))}
      </div>

      <div className="scroll-stack-rail">
        {scenes.map((scene) => (
          <span
            className={scene.sceneNumber === activeSceneNumber ? "active" : undefined}
            data-scene-state={sceneState(scene.sceneNumber, activeSceneNumber)}
            key={scene.id}
          />
        ))}
      </div>

      <div className="scroll-film-strip">
        <div className="scroll-film-label">
          <span>SCROLL REEL</span>
          <b>{String(resolved.beat.order).padStart(3, "0")} / {String(beats.length).padStart(3, "0")}</b>
        </div>
        <div className="scroll-film-track">
          {reelScenes.map(({ scene, offset }) => (
            <article
              className={offset === 0 ? "scroll-film-card active" : "scroll-film-card"}
              data-film-offset={offset}
              key={scene.id}
              style={
                {
                  "--film-offset": offset,
                  "--film-distance": Math.abs(offset)
                } as CSSProperties
              }
            >
              <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
              <strong>{scene.title}</strong>
              <i>{worldBySceneNumber(scene.sceneNumber)}</i>
            </article>
          ))}
        </div>
      </div>

      <div className="scroll-panel-track">
        {scenes.map((scene, index) => (
          <section
            className="scroll-panel"
            data-scene-state={sceneState(scene.sceneNumber, activeSceneNumber)}
            data-world={worldBySceneNumber(scene.sceneNumber)}
            key={scene.id}
            style={
              {
                "--panel-index": index,
                "--panel-distance": Math.abs(scene.sceneNumber - activeSceneNumber)
              } as CSSProperties
            }
          >
            <span>{String(scene.sceneNumber).padStart(2, "0")}</span>
            <strong>{scene.title}</strong>
            <i>{scene.chapter}</i>
          </section>
        ))}
      </div>

      <div className="scroll-ribbon-track">
        <div className="scroll-ribbon-row">
          {scenes.slice(0, 11).map((scene) => (
            <span key={scene.id}>{String(scene.sceneNumber).padStart(2, "0")} {scene.title}</span>
          ))}
        </div>
        <div className="scroll-ribbon-row reverse">
          {scenes.slice(10).map((scene) => (
            <span key={scene.id}>{String(scene.sceneNumber).padStart(2, "0")} {scene.title}</span>
          ))}
        </div>
      </div>

      <div className="scroll-progress-slit" />
    </div>
  );
}
