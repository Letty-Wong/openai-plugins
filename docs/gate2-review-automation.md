# WP-36R Gate 2 验收辅助命令

## 目标

本文件说明 `npm run review:gate2` 的用途。

它是人工验收辅助，不是自动验收结论。它不会打开浏览器、不会截图、不会录屏、不会修改页面，也不会替代人工判断画面是否真的有舞台感。

## 使用方式

先启动本地开发服务器：

```sh
npm run dev
```

再在另一个终端运行：

```sh
npm run review:gate2
```

命令会输出一份中文清单，包含：

- 三段 Gate 2 转场合同。
- `1366 x 768` 与 `1920 x 1080` 截图 URL。
- 四段无剪辑录屏脚本。
- 运行时检查项。
- 产品、CTA、业务事实的素材 gate。

人工截图、录屏和评审结果应记录到：

```text
docs/gate2-evidence-ledger.md
```

## 输出来源

三段转场合同直接读取 `src/presentation/stage/spatial-poses.ts` 中的 `spatialTransitionCues`：

| Beat | 转场类型 | 含义 |
| --- | --- | --- |
| `09.1` | `turn-horizontal-product` | Scene 08 到 09，从纵向经营路线转入横向产品段。 |
| `16.1` | `portal-forward-safety` | Scene 15 到 16，沿 Z 轴向前穿过接入环进入安全空间。 |
| `21.1` | `dolly-back-finale` | Scene 20 到 21，沿 Z 轴后拉揭示完整闭环。 |

## 本轮不做

- 不接真实产品素材。
- 不接真实二维码。
- 不补 MOQ、价格、认证、交期、质保、名额、日期等业务事实。
- 不恢复旧 page-chain 主舞台。
- 不进入最终视觉精修。

## 人工验收仍要判断

- 三段方向是否能被非工程读者看懂。
- 同一个演员是否连续在场，而不是重复入场。
- 前进、后退、快速输入后是否稳定。
- Reduced Motion 是否保留空间关系但减少运动。
- 主屏是否没有工程提示、假产品图、假二维码或未经确认业务事实。
