import type { StaticFrameKind } from "@/presentation/stage/static-frames";

type TypographySystemProps = {
  readonly frameKind: StaticFrameKind;
};

export function TypographySystem({ frameKind }: TypographySystemProps) {
  if (frameKind === "hero") {
    return (
      <>
        <div className="hero-ai">AI</div>
        <div className="typography-back">
          <div className="hero-word-back">效率</div>
        </div>
        <div className="typography-front">
          <div className="hero-word-front">红利</div>
        </div>
      </>
    );
  }

  if (frameKind === "product") {
    return (
      <div className="typography-back">
        <div className="product-back-word">真实产品</div>
      </div>
    );
  }

  if (frameKind === "finale") {
    return (
      <>
        <div className="typography-back">
          <div className="finale-back-word">第一个样板</div>
        </div>
        <div className="typography-front">
          <div className="front-slice">样板</div>
        </div>
      </>
    );
  }

  if (frameKind === "concept") {
    return null;
  }

  if (frameKind === "timeline-ai") {
    return (
      <div className="typography-back">
        <div className="timeline-back-word">效率重排</div>
      </div>
    );
  }

  if (frameKind === "path-dial") {
    return (
      <div className="typography-back">
        <div className="path-back-word">红利 / 补课</div>
      </div>
    );
  }

  if (frameKind === "ledger") {
    return (
      <div className="typography-back">
        <div className="ledger-back-word">四本账</div>
      </div>
    );
  }

  if (frameKind === "entry" || frameKind === "question") {
    return null;
  }

  return null;
}
