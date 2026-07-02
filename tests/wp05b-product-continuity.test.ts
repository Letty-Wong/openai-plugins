import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  productClaims,
  productDemoMaterials,
  productFacts,
  productPrototype
} from "../src/content/product-prototype";
import { getStaticFrameKind } from "../src/presentation/stage/static-frames";

test("WP-05B maps product continuity beats", () => {
  assert.equal(getStaticFrameKind("08.7"), "product-slot");
  assert.equal(getStaticFrameKind("09.1"), "product");
  assert.equal(getStaticFrameKind("09.2"), "product");
  assert.equal(getStaticFrameKind("09.5"), "product");
  assert.equal(getStaticFrameKind("10.1"), "technical-facts");
  assert.equal(getStaticFrameKind("10.4"), "technical-facts");
  assert.equal(getStaticFrameKind("10.6"), "technical-facts");
  assert.equal(getStaticFrameKind("11.1"), "benefit-translation");
  assert.equal(getStaticFrameKind("11.6"), "benefit-translation");
});

test("WP-05B keeps one placeholder product body with approved fictional demo facts", () => {
  assert.equal(productPrototype.id, "shower-h1-placeholder");
  assert.equal(productPrototype.modelStatus, "PLACEHOLDER");
  assert.equal(productPrototype.demoContentStatus, "APPROVED");
  assert.equal(productFacts.every((fact) => fact.status === "APPROVED"), true);
  assert.equal(productClaims.every((claim) => claim.status === "APPROVED"), true);

  const factIds = new Set(productFacts.map((fact) => fact.id));
  for (const claim of productClaims) {
    assert.equal(factIds.has(claim.factId), true, `${claim.id} must link to a known fact`);
  }
});

test("WP-05B maps the lecture demo into reusable product outputs", () => {
  assert.match(productDemoMaterials.poster.hero ?? "", /稳定水温，让每一次淋浴更安心/);
  assert.deepEqual(productDemoMaterials["department-output"].departmentSlots, [
    "市场 海报",
    "销售 话术",
    "视频 分镜",
    "外贸 邮件",
    "客服 FAQ"
  ]);
  assert.equal(productDemoMaterials.storyboard.storyboard?.length, 5);
  assert.match(productDemoMaterials["email-faq"].mailLines?.join(" ") ?? "", /MOQ \/ 价格：待业务确认/);
  assert.match(productDemoMaterials["email-faq"].mailLines?.join(" ") ?? "", /质保 \/ 交期：待业务确认/);
});

test("WP-05B keeps one registered product shell with stable anchors", () => {
  const source = readFileSync("src/presentation/stage/ProductStage.tsx", "utf8");

  assert.match(source, /data-product-id=\{productPrototype\.id\}/);
  assert.match(source, /data-render-state=\{renderState\}/);
  for (const anchorId of ["productCenter", "valveCore", "railMid", "nozzleDetail"]) {
    assert.match(source, new RegExp(`data-anchor-id="${anchorId}"`));
  }
});

test("WP-05B preserves source lineage through fact to benefit translation", () => {
  const source = readFileSync("src/presentation/stage/MiddleActors.tsx", "utf8");
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");

  assert.match(source, /SourcePacket/);
  assert.match(source, /data-card-id="fact-thermostatic-water"/);
  assert.match(source, /data-source-id="F-01"/);
  assert.match(source, /BenefitMaster/);
  assert.match(source, /PLACEHOLDER/);
  assert.match(persistentLayerSource, /<SourcePacketActor compact=/);
  assert.match(persistentLayerSource, /<FactBenefitActor compact=/);
});
