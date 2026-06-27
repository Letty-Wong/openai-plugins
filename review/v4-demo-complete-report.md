# V4 客户观感版交付报告

## 当前目标

本轮交付目标不是正式上线版，而是让客户预览时看到一个接近完整演示的 V4 舞台版本：`/` 直接进入新 V4 舞台，`/legacy` 继续保留旧实现备份；所有真实产品参数、价格、MOQ、认证、二维码、报名链接和业务事实仍然保持占位，不做编造。

## 已完成范围

- FT-03：补齐 `16.1 -> 20.10` 安全到行动段。
  - `16/17`：安全边界与资料包可见，保留 `资料 / 工具 / 内容 / 权限` 四个入口。
  - `18`：人工审核与负责人确认拆分为两个可见演员。
  - `19`：场景诊断雷达成为主构图。
  - `20`：行动路径成为主构图，并保留 ProductStage 与 IntegrationRing。
- FT-04：补齐 `20.10 -> 21.1` 后拉闭环。
  - 同一个 `IntegrationRing` 收束为最终闭环。
  - 同一个 `ProductStage` 保留为业务证据锚点。
  - 同一个 `ActionPath` 与 `CtaDock` 进入终幕。
  - CTA 仅为占位，明确显示“真实二维码待确认”。
- VP-01：客户观感视觉统一。
  - ProductStage 增加高级占位背板、光晕与基线，但仍复用原 ProductStage DOM Actor。
  - 资料包、人工审核、负责人确认、场景雷达、CTA dock 使用统一占位视觉语言。
  - 新增屏幕层场景上下文与 21 幕进度条。
- VP-02：21 幕讲述补齐。
  - 每个 Scene 保留明确章节/场景上下文。
  - 非关键 Beat 继续以稳定观察和轻量强调为主，不为 144 个 Beat 单独做进场动画。

## 仍为占位的内容

- 产品仍为高级占位视觉，不是真实产品照片或最终 2.5D 素材。
- 产品参数、价格、MOQ、认证、质保、交期等事实未补齐，也未在页面中编造。
- CTA 与二维码仍为占位，不包含真实报名链接或二维码。
- 当前录屏是客户观感版证据，不代表最终上线性能验收。

## 证据文件

截图和录屏从 `next start` production server 采集，避免开发服务器指示器进入客户观感证据。

### 截图

- `review/spatial-lab/screenshots/v4-demo/08-7-1366x768.png`
- `review/spatial-lab/screenshots/v4-demo/15-8-1366x768.png`
- `review/spatial-lab/screenshots/v4-demo/16-1-1366x768.png`
- `review/spatial-lab/screenshots/v4-demo/20-10-1366x768.png`
- `review/spatial-lab/screenshots/v4-demo/21-1-1366x768.png`
- `review/spatial-lab/screenshots/v4-demo/08-7-1920x1080.png`
- `review/spatial-lab/screenshots/v4-demo/15-8-1920x1080.png`
- `review/spatial-lab/screenshots/v4-demo/16-1-1920x1080.png`
- `review/spatial-lab/screenshots/v4-demo/20-10-1920x1080.png`
- `review/spatial-lab/screenshots/v4-demo/21-1-1920x1080.png`

### 录屏

- `review/spatial-lab/recordings/v4-demo/product-journey-08-7-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/v4-demo/safety-tunnel-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/v4-demo/finale-pullback-20-10-to-21-1-1366x768.webm`
- `review/spatial-lab/recordings/v4-demo/reduced-safety-tunnel-15-8-to-16-1-1366x768.webm`

## 验证结果

- `npm run lint`：通过。
- `npm run typecheck`：通过。第一次与 `npm run build` 并行运行时因为 `.next/types` 正在重建出现读写竞争，串行重跑后通过。
- `npm run test`：通过，202 项通过。
- `npm run build`：通过。

## 本轮代码实现提交

- `df2e962`：Complete V4 safety action and finale path
- `eac151c`：Polish V4 customer demo shell

## 下一步建议

- 优先人工预览 `/` 的客户观感版，重点看 `08.7 -> 15.8`、`15.8 -> 16.1`、`20.10 -> 21.1` 三段是否已经摆脱 PPT 翻页感。
- 如果客户观感方向通过，再进入真实产品素材、正式 CTA、业务事实补齐和最终视觉精修。
