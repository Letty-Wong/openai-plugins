# WP-38 启动守门命令

## 目标

`npm run guard:wp38` 用来防止在 Gate 2 未通过时误启动 WP-38。

它只读取当前 Gate 状态，不修改文件、不启动开发服务器、不创建页面、不接真实素材。

## 使用方式

```sh
npm run guard:wp38
```

当前预期结果：

```text
Allowed: false
Gate 2 decision: PENDING_HUMAN_REVIEW
```

因为当前 Gate 2 还没有人工 `PASS`，所以这个命令当前会以非零状态退出。这是预期行为，不是工程失败。

## 什么时候会允许

只有当以下文件被人工验收后明确填写：

```text
docs/gate2-review-decision-record.md
Decision: PASS
```

`guard:wp38` 才会允许继续规划 WP-38。

## 仍然不会开放的内容

即使 `guard:wp38` 允许，以下内容仍然不会自动开放：

- 真实产品素材。
- 真实二维码或正式 CTA。
- MOQ、价格、认证、交期、质保、名额、日期。
- 最终字体、纹理、光效精修。
- 全 21 Scene 视觉生产。

WP-38 仍只能在 `WP-38R-A` 与 `WP-38R-B` 中二选一，并继续保持灰盒边界。
