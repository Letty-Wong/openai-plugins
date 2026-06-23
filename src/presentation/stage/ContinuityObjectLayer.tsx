import { productClaims, productFacts, productPrototype } from "@/content/product-prototype";
import { actionMilestones, ctaPlaceholder, selectedScenario } from "@/content/safety-prototype";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";

type ContinuityObjectLayerProps = {
  readonly frameKind: StaticFrameKind;
  readonly sceneNumber: number;
};

const productFrameSteps: Partial<Record<StaticFrameKind, number>> = {
  "product-slot": 0,
  product: 1,
  "technical-facts": 2,
  "benefit-translation": 3
};

const actionFrameSteps: Partial<Record<StaticFrameKind, number>> = {
  "scenario-radar": 0,
  "action-path": 1,
  "cta-dock": 2,
  finale: 3
};

export function ContinuityObjectLayer({ frameKind, sceneNumber }: ContinuityObjectLayerProps) {
  if (frameKind in productFrameSteps) {
    return <ProductContinuityObject step={productFrameSteps[frameKind] ?? 0} />;
  }

  if (sceneNumber >= 12 && sceneNumber <= 18) {
    return <ProductContinuityObject step={3} />;
  }

  if (frameKind in actionFrameSteps) {
    return <ActionContinuityObject step={actionFrameSteps[frameKind] ?? 0} />;
  }

  return null;
}

function ProductContinuityObject({ step }: { readonly step: number }) {
  const activeFact = productFacts[Math.min(step, productFacts.length - 1)];
  const activeClaim = productClaims.find((claim) => claim.factId === activeFact.id) ?? productClaims[0];

  return (
    <div
      aria-hidden="true"
      className="continuity-object-layer continuity-object-product"
      data-continuity-object="product"
      data-continuity-step={step}
      data-product-id={productPrototype.id}
    >
      <div className="director-focus-plane" data-director-focus="product" />
      <div className="director-focus-frame product-focus-frame">
        <span>PRODUCT CONTINUITY</span>
      </div>
      <div className="product-object-aura product-annotation-aura" />
      <div className="product-object-shell product-annotation-shell">
        <div className="object-rail top" />
        <div className="object-rail bottom" />
        <div className="object-source-track">
          <span>PRODUCT</span>
          <strong>{productPrototype.modelStatus}</strong>
        </div>
        <div className="object-fact-track" data-active-fact-id={activeFact.id}>
          <span>{activeFact.sourceId}</span>
          <strong>{activeFact.label}</strong>
          <i>{activeFact.status}</i>
        </div>
        <div className="object-benefit-track" data-active-claim-id={activeClaim.id}>
          <span>BenefitMaster</span>
          <strong>{activeClaim.benefit}</strong>
          <i>{activeClaim.status}</i>
        </div>
      </div>
      <div className="object-step-rail">
        {["槽位", "身份", "资料", "卖点"].map((label, index) => (
          <span className={index <= step ? "active" : undefined} key={label}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActionContinuityObject({ step }: { readonly step: number }) {
  return (
    <div
      aria-hidden="true"
      className="continuity-object-layer continuity-object-action"
      data-continuity-object="action"
      data-continuity-step={step}
      data-scenario-id={selectedScenario.id}
    >
      <div className="director-focus-plane" data-director-focus="action" />
      <div className="director-focus-frame action-focus-frame">
        <span>ACTION CONTINUITY</span>
      </div>
      <div className="action-object-aura action-annotation-aura" />
      <div className="action-object-card">
        <span>{selectedScenario.status}</span>
        <strong>{selectedScenario.label}</strong>
      </div>
      <div className="action-object-milestones">
        {actionMilestones.map((milestone, index) => (
          <span className={index <= step ? "active" : undefined} data-milestone-id={milestone.id} key={milestone.id}>
            <b>{milestone.label}</b>
            <i>{milestone.result}</i>
          </span>
        ))}
      </div>
      <div className="action-object-cta" data-cta-status={ctaPlaceholder.status}>
        <span>CTA</span>
        <strong>{ctaPlaceholder.status}</strong>
      </div>
    </div>
  );
}
