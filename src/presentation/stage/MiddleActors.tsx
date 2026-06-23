import {
  boundaryModules,
  outputCards,
  scenarioCandidates
} from "@/content/safety-prototype";

export type OutputCardsMode = "frozen" | "review" | "approved";
export type SafetyBoundaryMode = "plain" | "freeze" | "gate" | "loop" | "background";

type CompactActorProps = {
  readonly compact?: boolean;
};

type OutputCardsActorProps = {
  readonly mode: OutputCardsMode;
};

type SafetyBoundaryActorProps = {
  readonly mode: SafetyBoundaryMode;
};

export function SourcePacketActor({ compact = false }: CompactActorProps) {
  if (compact) {
    return <SourcePacketMini />;
  }

  return (
    <div className="source-packet" data-source-packet-id="source-packet-placeholder">
      <strong>SourcePacket</strong>
      {["功能", "材质", "场景", "客户问题"].map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  );
}

export function FactBenefitActor({ compact = false }: CompactActorProps) {
  return (
    <div className={`translation-stage ${compact ? "compact" : ""}`} data-translation-id="fact-benefit-placeholder">
      <svg className="fact-lines" viewBox="0 0 1000 640" aria-hidden="true">
        <line x1="330" x2="602" y1="230" y2="330" />
        <line x1="330" x2="602" y1="300" y2="420" />
        <line x1="330" x2="570" y1="370" y2="170" />
        <text x="350" y="220">F-01 恒温出水</text>
        <text x="350" y="290">F-02 防烫设计</text>
        <text x="350" y="360">F-03 硅胶出水嘴</text>
      </svg>
      <div className="fact-card" data-card-id="fact-thermostatic-water" data-source-id="F-01">
        <span>F-01</span>
        <strong>恒温出水</strong>
        <small>PLACEHOLDER</small>
      </div>
      <div className="conversion-ring-label">转译</div>
      <div className="benefit-master" data-source-id="F-01">
        <span>BenefitMaster</span>
        {["减少水温忽冷忽热", "使用更安心", "日常清洁更方便", "材质表达待确认"].map((benefit) => (
          <strong key={benefit}>{benefit}</strong>
        ))}
      </div>
    </div>
  );
}

export function OutputCardsActor({ mode }: OutputCardsActorProps) {
  return <OutputCardStack mode={mode} />;
}

export function SafetyBoundaryActor({ mode }: SafetyBoundaryActorProps) {
  return (
    <div className={`safety-system safety-boundary-actor ${mode}`} data-safety-boundary-mode={mode}>
      <div className="safety-boundary" />
      {mode === "plain" || mode === "background" ? (
        <div className="safety-entries">
          {["资料", "工具", "内容", "权限"].map((label) => (
            <div className="safety-entry" key={label}>
              {label}
            </div>
          ))}
        </div>
      ) : null}
      {mode === "freeze" ? (
        <>
          <div className="boundary-veil" />
          <div className="freeze-label">所有输出回看同一来源</div>
        </>
      ) : null}
      {mode === "gate" ? (
        <svg className="execution-track" viewBox="0 0 1000 420">
          <path className="draft-track" d="M185 210 C330 168 455 168 575 210" />
          <path className="blocked-track" d="M610 210 C715 230 790 230 900 210" />
          <line className="track-break" x1="624" x2="676" y1="178" y2="242" />
          <text x="690" y="172">生成 ≠ 执行</text>
        </svg>
      ) : null}
      {mode === "loop" ? (
        <div className="boundary-modules">
          {boundaryModules.map((module) => (
            <div className={`boundary-module ${module.id}`} data-boundary-id={module.id} key={module.id}>
              <strong>{module.label}</strong>
              <span>{module.rule}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ScenarioRadarActor({ compact = false }: CompactActorProps) {
  return (
    <div className={`scenario-radar-stage ${compact ? "compact" : ""}`}>
      <div className="radar-core" data-radar-core-id="scenario-radar-core">
        <strong>场景入口</strong>
        <span>候选 / 筛选 / 锁定</span>
      </div>
      <svg className="radar-grid" viewBox="0 0 1000 640">
        <circle cx="500" cy="320" r="238" />
        <circle cx="500" cy="320" r="140" />
        <line x1="500" x2="500" y1="70" y2="570" />
        <line x1="250" x2="750" y1="320" y2="320" />
        <text x="500" y="52">重复最多</text>
        <text x="772" y="326">30 天可验证</text>
        <text x="500" y="610">资料最散</text>
        <text x="130" y="326">最缺模板</text>
      </svg>
      <div className="scenario-tokens">
        {scenarioCandidates.map((candidate) => (
          <div className="scenario-token" data-candidate-id={candidate.id} key={candidate.id}>
            <strong>{candidate.label}</strong>
            <span>{candidate.conditions.slice(0, 2).join(" / ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourcePacketMini() {
  return (
    <div className="source-packet-mini" data-source-packet-id="source-packet-placeholder">
      <strong>SourcePacket</strong>
      <span>事实 / 来源 / 边界</span>
    </div>
  );
}

function OutputCardStack({ mode }: OutputCardsActorProps) {
  return (
    <div className={`output-card-stack ${mode}`} data-output-mode={mode}>
      {outputCards.map((card) => (
        <div
          className={`output-card ${card.reviewStatus.toLowerCase()}`}
          data-content-status={card.contentStatus}
          data-output-id={card.id}
          data-source-id={card.sourceId}
          key={card.id}
        >
          <strong>{card.label}</strong>
          <span>{card.reviewStatus}</span>
        </div>
      ))}
    </div>
  );
}
