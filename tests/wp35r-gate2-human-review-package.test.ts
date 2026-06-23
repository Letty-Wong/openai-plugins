import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-35R documents the Gate 2 human review package", () => {
  const reviewPackage = readFileSync("docs/gate2-human-review-package.md", "utf8");

  assert.match(reviewPackage, /无剪辑录屏脚本/);
  assert.match(reviewPackage, /Scene 08 到 09 横向产品转弯/);
  assert.match(reviewPackage, /Scene 15 到 16 Z 轴向前穿越/);
  assert.match(reviewPackage, /Scene 20 到 21 Z 轴后拉揭示/);
  assert.match(reviewPackage, /Reduced Motion/);
  assert.match(reviewPackage, /截图清单/);
  assert.match(reviewPackage, /通过标准/);
  assert.match(reviewPackage, /不通过标准/);
  assert.match(reviewPackage, /验收后决策/);
});

test("WP-35R keeps material gates explicit in the human review package", () => {
  const reviewPackage = readFileSync("docs/gate2-human-review-package.md", "utf8");

  assert.match(reviewPackage, /产品仍是 `shower-h1-placeholder`/);
  assert.match(reviewPackage, /CTA 在可见时仍是 placeholder/);
  assert.match(reviewPackage, /真实二维码/);
  assert.match(reviewPackage, /假产品素材/);
  assert.match(reviewPackage, /假 MOQ \/ 价格 \/ 认证 \/ 交期 \/ 名额 \/ 日期/);
  assert.match(reviewPackage, /旧 page-chain 视觉没有重新挂回主舞台/);
  assert.match(reviewPackage, /正式花洒产品素材/);
});
