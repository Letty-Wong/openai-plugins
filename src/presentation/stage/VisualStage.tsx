import type { ResolvedBeatState } from "@/presentation/core/state-types";
import { beats } from "@/content/beats";
import { ContinuityMotionRuntime } from "@/presentation/motion/ContinuityMotionRuntime";
import type { ContinuityDirection } from "@/presentation/motion/ContinuityMotionRuntime";
import { StageMotionRuntime } from "@/presentation/motion/StageMotionRuntime";
import { BackgroundSystem } from "@/presentation/stage/BackgroundSystem";
import { PersistentActorLayer } from "@/presentation/stage/PersistentActorLayer";
import { SpatialStage } from "@/presentation/stage/SpatialStage";
import { getStageCue } from "@/presentation/stage/stage-script";
import { getStaticFrameKind } from "@/presentation/stage/static-frames";
import { TypographySystem } from "@/presentation/stage/TypographySystem";

type VisualStageProps = {
  readonly resolved: ResolvedBeatState;
  readonly transitionDirection: ContinuityDirection;
};

type FrameContentProps = {
  readonly resolved: ResolvedBeatState;
  readonly frameKind: ReturnType<typeof getStaticFrameKind>;
};

function getStageWorldClass(resolved: ResolvedBeatState, frameKind: ReturnType<typeof getStaticFrameKind>) {
  if (resolved.scene.sceneNumber >= 9 && resolved.scene.sceneNumber <= 15) return "world-product";
  if (resolved.scene.sceneNumber >= 16 && resolved.scene.sceneNumber <= 18) return "world-safety";
  if (resolved.scene.sceneNumber >= 19) return "world-ledger";

  if (frameKind === "product-slot" || frameKind === "technical-facts" || frameKind === "benefit-translation") {
    return "world-product";
  }

  if (frameKind === "ledger" || frameKind === "action-path") return "world-ledger";
  if (frameKind === "product" || frameKind === "cta-dock") return "world-product";
  if (frameKind === "finale") return "world-finale";
  if (
    frameKind === "safety" ||
    frameKind === "approval-gate" ||
    frameKind === "boundary-loop" ||
    frameKind === "scenario-radar" ||
    frameKind === "output-freeze" ||
    frameKind === "concept" ||
    frameKind === "timeline-ai" ||
    frameKind === "path-dial" ||
    frameKind === "question" ||
    frameKind === "entry"
  ) {
    return "world-safety";
  }

  return "world-judgement";
}

export function VisualStage({ resolved, transitionDirection }: VisualStageProps) {
  const frameKind = getStaticFrameKind(resolved.beat.id);
  const worldClass = getStageWorldClass(resolved, frameKind);
  const stageCue = getStageCue(resolved.beat.id);

  return (
    <section
      className={`visual-stage ${worldClass}`}
      data-frame-kind={frameKind}
      data-lead-actor={stageCue.leadActorId}
      data-reduced-motion={String(resolved.targetState.reducedMotion)}
      data-spatial-mode="world-camera-graybox"
      data-stage-act={stageCue.actId}
      data-stage-mode="stage-play-v2"
      aria-labelledby="scene-title"
    >
      <BackgroundSystem frameKind={frameKind} />
      <div className="continuity-world-sweep" aria-hidden="true" />
      <SpatialStage resolved={resolved} />
      <div className="texture-atmosphere" aria-hidden="true" />
      <TypographySystem frameKind={frameKind} />
      <FrameArtifacts frameKind={frameKind} resolved={resolved} />
      <PersistentActorLayer frameKind={frameKind} resolved={resolved} />
      <FrameCopy frameKind={frameKind} resolved={resolved} />
      <ContinuityMotionRuntime
        beatId={resolved.beat.id}
        beatOrder={resolved.beat.order}
        direction={transitionDirection}
        frameKind={frameKind}
        reducedMotion={resolved.targetState.reducedMotion}
        sceneNumber={resolved.scene.sceneNumber}
        totalBeats={beats.length}
      />
      <StageMotionRuntime
        beatId={resolved.beat.id}
        frameKind={frameKind}
        reducedMotion={resolved.targetState.reducedMotion}
      />
    </section>
  );
}

function FrameCopy({ frameKind, resolved }: FrameContentProps) {
  if (frameKind === "hero") {
    return (
      <div className="visual-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <p className="support-line">{resolved.audienceScreenCopy?.support}</p>
      </div>
    );
  }

  if (frameKind === "entry") {
    return (
      <div className="visual-copy entry-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <p className="support-line">红色状态点点亮，五分段接入环成形。</p>
      </div>
    );
  }

  if (frameKind === "question") {
    return (
      <div className="visual-copy question-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          经营判断
        </h1>
        <p className="support-line">现在，要不要接入？</p>
      </div>
    );
  }

  if (frameKind === "concept") {
    return (
      <div className="visual-copy concept-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          经营判断
        </h1>
        <p className="support-line">现在，要不要低成本接入？</p>
      </div>
    );
  }

  if (frameKind === "timeline-ai") {
    return (
      <div className="visual-copy timeline-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          每一轮浪潮
          <br />
          都在重排效率
        </h1>
        <p className="support-line">今天 AI 也是一样。</p>
      </div>
    );
  }

  if (frameKind === "path-dial") {
    return (
      <div className="visual-copy path-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          低成本验证
        </h1>
        <p className="support-line">不是全面改造，而是先跑一个小场景。</p>
      </div>
    );
  }

  if (frameKind === "ledger") {
    return (
      <div className="visual-copy ledger-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          AI 的价值
          <br />
          看四本账
        </h1>
        <p className="support-line">不是看工具多少，是看经营发生什么变化。</p>
      </div>
    );
  }

  if (frameKind === "product") {
    return (
      <>
        <div className="visual-copy product">
          <p className="kicker">{resolved.scene.chapter}</p>
          <h1 id="scene-title" className="display-title compact">
            {resolved.audienceScreenCopy?.title}
          </h1>
        </div>
        <div className="product-label">
          <strong>恒温淋浴花洒套装</strong>
          <span>产品型号待确认</span>
        </div>
      </>
    );
  }

  if (frameKind === "product-slot") {
    return (
      <>
        <div className="visual-copy product">
          <p className="kicker">{resolved.scene.chapter}</p>
          <h1 id="scene-title" className="display-title compact">
            先跑一个
            <br />
            真实样板
          </h1>
          <p className="support-line">产品 / 资料 / 场景 / 审核边界</p>
        </div>
        <div className="product-label">
          <strong>产品槽位</strong>
          <span>中性剪影占位</span>
        </div>
      </>
    );
  }

  if (frameKind === "technical-facts") {
    return (
      <div className="visual-copy product technical-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          一份真实资料
        </h1>
        <p className="support-line">事实、来源、锚点先建立，再进入表达。</p>
      </div>
    );
  }

  if (frameKind === "benefit-translation") {
    return (
      <div className="visual-copy product benefit-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          参数
          <br />
          不等于卖点
        </h1>
        <p className="support-line">把事实说成人听得懂的话。</p>
      </div>
    );
  }

  if (frameKind === "output-freeze") {
    return (
      <div className="visual-copy safety">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          快
          <br />
          还不够
        </h1>
        <p className="support-line">所有输出必须回看同一来源。</p>
      </div>
    );
  }

  if (frameKind === "safety") {
    return (
      <div className="visual-copy safety">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          {resolved.audienceScreenCopy?.title}
        </h1>
        <p className="support-line">{resolved.audienceScreenCopy?.support}</p>
      </div>
    );
  }

  if (frameKind === "approval-gate") {
    return (
      <div className="visual-copy safety">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          生成
          <br />
          不等于执行
        </h1>
        <p className="support-line">负责人确认之前，执行轨道保持断开。</p>
      </div>
    );
  }

  if (frameKind === "boundary-loop") {
    return (
      <div className="visual-copy safety">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          四条边界
          <br />
          形成回路
        </h1>
        <p className="support-line">资料、工具、内容、权限接成一套操作系统。</p>
      </div>
    );
  }

  if (frameKind === "scenario-radar") {
    return (
      <div className="visual-copy radar-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          第一个场景
          <br />
          从哪里开始？
        </h1>
        <p className="support-line">先选一个最值得验证的场景。</p>
      </div>
    );
  }

  if (frameKind === "action-path") {
    return (
      <div className="visual-copy action-copy">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          先判断
          <br />
          再验证
          <br />
          再固化
        </h1>
      </div>
    );
  }

  if (frameKind === "cta-dock") {
    return (
      <div className="visual-copy finale">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          填写企业自测
        </h1>
        <p className="support-line">申请 30 分钟诊断</p>
      </div>
    );
  }

  if (frameKind === "finale") {
    return (
      <div className="visual-copy finale">
        <p className="kicker">{resolved.scene.chapter}</p>
        <h1 id="scene-title" className="display-title compact">
          先跑出
          <br />
          第一个样板
        </h1>
        <p className="support-line">不用先全公司改造</p>
      </div>
    );
  }

  return (
    <div className="visual-copy">
      <p className="kicker">{resolved.scene.chapter}</p>
      <h1 id="scene-title" className="display-title compact">
        {resolved.audienceScreenCopy?.title}
      </h1>
      <p className="support-line">{resolved.beat.label}</p>
    </div>
  );
}

function FrameArtifacts({ frameKind }: FrameContentProps) {
  if (frameKind === "entry") {
    return (
      <div className="entry-node" aria-hidden="true">
        <span />
      </div>
    );
  }

  if (frameKind === "question") {
    return null;
  }

  if (frameKind === "concept") {
    return (
      <>
        <div className="word-wall tool-wall" aria-hidden="true">
          工具
          <span>注册 / 插件 / 提示词</span>
        </div>
        <div className="word-wall concept-wall" aria-hidden="true">
          概念
          <span>未来 / 模型 / 趋势</span>
        </div>
      </>
    );
  }

  if (frameKind === "timeline-ai") {
    return <TimelineTrack />;
  }

  if (frameKind === "path-dial") {
    return <BusinessPaths />;
  }

  if (frameKind === "ledger") {
    return null;
  }

  if (frameKind === "product") {
    return (
      <>
        <div className="prep-cards" aria-hidden="true">
          {["产品", "资料", "场景", "审核边界"].map((label) => (
            <div className="mini-card" key={label}>
              {label}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (frameKind === "product-slot") {
    return (
      <>
        <div className="prep-cards" aria-hidden="true">
          {["产品", "资料", "场景", "审核边界"].map((label) => (
            <div className="mini-card" key={label}>
              {label}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (frameKind === "technical-facts") {
    return null;
  }

  if (frameKind === "benefit-translation") {
    return null;
  }

  if (frameKind === "output-freeze") {
    return null;
  }

  if (frameKind === "safety") {
    return null;
  }

  if (frameKind === "approval-gate") {
    return null;
  }

  if (frameKind === "boundary-loop") {
    return null;
  }

  if (frameKind === "scenario-radar") {
    return null;
  }

  if (frameKind === "action-path") {
    return <ActionPath />;
  }

  if (frameKind === "cta-dock") {
    return null;
  }

  if (frameKind === "finale") {
    return (
      <>
        <div className="capability-nodes" aria-hidden="true">
          {["判断", "生成", "边界", "诊断", "落地"].map((label) => (
            <div className="capability-node" key={label}>
              {label}
            </div>
          ))}
        </div>
      </>
    );
  }

  return null;
}

function TimelineTrack() {
  return (
    <div className="timeline-track" aria-hidden="true">
      {["电商", "短视频", "直播", "跨境", "AI"].map((label) => (
        <div className={`timeline-node ${label === "AI" ? "active" : ""}`} key={label}>
          <span>{label}</span>
        </div>
      ))}
      <div className="system-terms">
        {["客户习惯", "获客方式", "表达速度", "经验复用"].map((term) => (
          <span key={term}>{term}</span>
        ))}
      </div>
    </div>
  );
}

function BusinessPaths() {
  return (
    <div className="business-paths" aria-hidden="true">
      <svg viewBox="0 0 1000 500">
        <path className="history-rail" d="M80 250 C260 170 470 120 820 95" />
        <path className="delay-rail" d="M80 250 C270 270 470 350 820 372" />
        <circle className="origin-dot" cx="80" cy="250" r="12" />
        <circle className="company-dot signal-company" cx="765" cy="112" r="18" />
        <circle className="company-dot muted-company" cx="560" cy="344" r="18" />
        {["资料", "流程", "认知", "样板", "差距"].map((label, index) => (
          <g className="makeup-node" key={label} transform={`translate(${260 + index * 85} ${292 + index * 18})`}>
            <rect height="38" width="74" x="-37" y="-19" />
            <text>{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ActionPath() {
  return (
    <div className="action-path-stage action-path-support" aria-hidden="true">
      <div className="scope-branches">
        <span>不是全公司一次改造</span>
        <span>不是无限代做内容</span>
      </div>
    </div>
  );
}
