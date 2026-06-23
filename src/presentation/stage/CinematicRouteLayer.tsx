import type { ResolvedBeatState } from "@/presentation/core/state-types";
import type { CSSProperties } from "react";

type CinematicRouteLayerProps = {
  readonly resolved: ResolvedBeatState;
};

type RouteSegment = {
  readonly id: "opening" | "product" | "safety" | "finale";
  readonly label: string;
  readonly beatStart: number;
  readonly beatEnd: number;
  readonly className: string;
  readonly frames: readonly string[];
};

const routeSegments: readonly RouteSegment[] = [
  {
    id: "opening",
    label: "判断与四本账",
    beatStart: 1,
    beatEnd: 45,
    className: "route-opening",
    frames: ["入口点", "接入环", "时间线", "四本账"]
  },
  {
    id: "product",
    label: "产品样板",
    beatStart: 46,
    beatEnd: 92,
    className: "route-product",
    frames: ["产品占位", "资料包", "参数孔径", "卖点母版"]
  },
  {
    id: "safety",
    label: "安全边界",
    beatStart: 93,
    beatEnd: 116,
    className: "route-safety",
    frames: ["输出冻结", "安全环", "人工审核", "授权门"]
  },
  {
    id: "finale",
    label: "行动收束",
    beatStart: 117,
    beatEnd: 144,
    className: "route-finale",
    frames: ["诊断雷达", "行动路线", "能力回路", "CTA 占位"]
  }
];

function segmentForBeat(order: number) {
  return routeSegments.find((segment) => order >= segment.beatStart && order <= segment.beatEnd) ?? routeSegments[0];
}

function segmentProgress(order: number, segment: RouteSegment) {
  const span = Math.max(segment.beatEnd - segment.beatStart, 1);
  return Math.min(Math.max((order - segment.beatStart) / span, 0), 1);
}

function routePointForSegment(segment: RouteSegment, progress: number) {
  const anchors: Record<RouteSegment["id"], { fromX: number; fromY: number; toX: number; toY: number }> = {
    opening: { fromX: 8, fromY: 78, toX: 38, toY: 47 },
    product: { fromX: 38, fromY: 47, toX: 66, toY: 61 },
    safety: { fromX: 66, fromY: 61, toX: 79, toY: 42 },
    finale: { fromX: 79, fromY: 42, toX: 93, toY: 28 }
  };
  const anchor = anchors[segment.id];
  return {
    x: anchor.fromX + (anchor.toX - anchor.fromX) * progress,
    y: anchor.fromY + (anchor.toY - anchor.fromY) * progress
  };
}

export function CinematicRouteLayer({ resolved }: CinematicRouteLayerProps) {
  const activeSegment = segmentForBeat(resolved.beat.order);
  const activeSegmentProgress = segmentProgress(resolved.beat.order, activeSegment);
  const routePoint = routePointForSegment(activeSegment, activeSegmentProgress);

  return (
    <div
      aria-hidden="true"
      className={`cinematic-route-layer ${activeSegment.className}`}
      data-active-route={activeSegment.id}
      style={
        {
          "--route-progress": activeSegmentProgress,
          "--route-progress-percent": `${Math.round(activeSegmentProgress * 100)}%`,
          "--route-orb-left": `${routePoint.x}%`,
          "--route-orb-top": `${routePoint.y}%`
        } as CSSProperties
      }
    >
      <svg className="cinematic-route-map" viewBox="0 0 1200 720" preserveAspectRatio="none">
        <path
          className="route-map-shadow"
          d="M92 565 C 210 390, 330 306, 476 338 S 725 548, 866 398 S 1012 170, 1112 198"
        />
        <path
          className="route-map-line"
          d="M92 565 C 210 390, 330 306, 476 338 S 725 548, 866 398 S 1012 170, 1112 198"
        />
        <path
          className="route-map-line route-map-line-active"
          d="M92 565 C 210 390, 330 306, 476 338 S 725 548, 866 398 S 1012 170, 1112 198"
        />
      </svg>

      <div className="route-cursor" />

      <div className="route-segment-rail">
        {routeSegments.map((segment) => (
          <div
            className={segment.id === activeSegment.id ? "route-segment active" : "route-segment"}
            data-route-id={segment.id}
            key={segment.id}
          >
            <span>{segment.label}</span>
            <b>
              {String(segment.beatStart).padStart(3, "0")}-
              {String(segment.beatEnd).padStart(3, "0")}
            </b>
          </div>
        ))}
      </div>

      <div className="route-frame-strip">
        {activeSegment.frames.map((frame, index) => (
          <span
            className="route-frame"
            key={frame}
            style={{ "--frame-index": index } as CSSProperties}
          >
            {frame}
          </span>
        ))}
      </div>

      <div className="route-caption">
        <span>{activeSegment.label}</span>
        <strong>{resolved.beat.label}</strong>
      </div>
    </div>
  );
}
