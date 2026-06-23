import {
  actionConfirmGate,
  ctaPlaceholder,
  humanReviewNode
} from "@/content/safety-prototype";

export function HumanReviewNode({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div className={`human-review-node ${compact ? "compact" : ""}`} data-node-id={humanReviewNode.id}>
      <strong>{humanReviewNode.label}</strong>
      <span>{humanReviewNode.status}</span>
    </div>
  );
}

export function ActionConfirmGate({ compact = false }: { readonly compact?: boolean }) {
  return (
    <div
      className={`action-confirm-gate ${compact ? "compact" : ""}`}
      data-execution-authorized={String(actionConfirmGate.executionAuthorized)}
      data-node-id={actionConfirmGate.id}
    >
      <strong>{actionConfirmGate.label}</strong>
      <span>动作 / 对象 / 范围 / 负责人</span>
    </div>
  );
}

export function CtaDock({ compact = false, expanded = false }: { readonly compact?: boolean; readonly expanded?: boolean }) {
  return (
    <div
      className={`qr-dock ${compact ? "compact" : ""} ${expanded ? "expanded" : ""}`}
      data-cta-id={ctaPlaceholder.id}
      data-cta-status={ctaPlaceholder.status}
    >
      <div className="qr-placeholder">CTA PLACEHOLDER</div>
      <strong>{ctaPlaceholder.label}</strong>
      <p>{ctaPlaceholder.action}</p>
      <span>{expanded ? ctaPlaceholder.secondary : ctaPlaceholder.shortLinkLabel}</span>
    </div>
  );
}
