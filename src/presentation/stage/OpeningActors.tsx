import type { StaticFrameKind } from "@/presentation/stage/static-frames";

type JudgementQuestionProps = {
  readonly frameKind: StaticFrameKind;
};

export function JudgementQuestion({ frameKind }: JudgementQuestionProps) {
  const state = getJudgementState(frameKind);

  return (
    <div className="judgement-question-stage" data-judgement-state={state}>
      <div className="judgement-question">
        <span>{state === "entry" ? "AI" : "现在"}</span>
        <strong>{state === "entry" ? "接入点亮" : "要不要接入？"}</strong>
      </div>
      <div className="decision-branch branch-now">
        <b>现在开始</b>
        <span>低成本验证</span>
      </div>
      <div className="decision-branch branch-delay">
        <b>继续观望</b>
        <span>差距继续累积</span>
      </div>
      <div className="judgement-anchors">
        <span>为什么是现在</span>
        <span>从哪里开始</span>
      </div>
    </div>
  );
}

export function LedgerDial({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`ledger-dial ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="dial-quadrant q1">
        <span>开源</span>
      </div>
      <div className="dial-quadrant q2">
        <span>沉淀</span>
      </div>
      <div className="dial-quadrant q3">
        <span>节流</span>
      </div>
      <div className="dial-quadrant q4">
        <span>提效</span>
      </div>
      <div className="business-seed">Seed</div>
    </div>
  );
}

function getJudgementState(frameKind: StaticFrameKind) {
  if (frameKind === "entry" || frameKind === "hero") return "entry";
  if (frameKind === "timeline-ai") return "timeline";
  if (frameKind === "path-dial") return "handoff";
  return "question";
}
