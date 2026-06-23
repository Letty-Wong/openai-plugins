import { productPrototype } from "@/content/product-prototype";
import type { ProductRenderState } from "@/content/product-prototype";

type ProductStageProps = {
  readonly variant?: "product" | "technical" | "safety" | "route-anchor" | "finale";
  readonly renderState?: ProductRenderState;
};

export function ProductStage({
  variant = "product",
  renderState = "silhouette"
}: ProductStageProps) {
  return (
    <div
      aria-label={`${productPrototype.label} placeholder`}
      className={`product-stage-shell ${variant}`}
      data-product-id={productPrototype.id}
      data-render-state={renderState}
    >
      <div className="product-shadow" />
      <div className="product-anchor product-center" data-anchor-id="productCenter" />
      <div className="product-anchor valve-core" data-anchor-id="valveCore" />
      <div className="product-anchor rail-mid" data-anchor-id="railMid" />
      <div className="product-anchor nozzle-detail" data-anchor-id="nozzleDetail" />
      <div className="shower-line" />
      <div className="shower-head" />
      <div className="shower-valve" />
      <div className="shower-hand" />
    </div>
  );
}
