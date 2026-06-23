import type { StaticFrameKind } from "@/presentation/stage/static-frames";

type BackgroundSystemProps = {
  readonly frameKind: StaticFrameKind;
};

export function BackgroundSystem({ frameKind }: BackgroundSystemProps) {
  return (
    <div className="background-system" aria-hidden="true">
      {frameKind === "product" ? <div className="background-plane red" /> : null}
      {frameKind === "finale" ? <div className="background-plane split" /> : null}
    </div>
  );
}
