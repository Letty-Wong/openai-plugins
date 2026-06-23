# Material Placeholder Audit 命令

## 目标

`npm run audit:materials` 用来确认当前项目仍保持素材占位状态。

它不下载素材、不创建图片、不生成二维码、不补业务事实，只读取当前代码和本地素材目录。

## 使用方式

```sh
npm run audit:materials
```

当前预期结果是 `PASS`，含义是：

- 产品仍是 `shower-h1-placeholder`。
- 产品事实和卖点仍是 `PLACEHOLDER`。
- CTA 仍是 `PLACEHOLDER`。
- 产品暖光/红光素材动画 gate 仍是 `BLOCKED`。
- 业务输出样板动画 gate 仍是 `BLOCKED`。
- CTA/QR 动画 gate 仍是 `BLOCKED`.
- 本地没有真实产品、CTA 或二维码媒体文件。

## 重要边界

`PASS` 只表示“占位状态正确”，不表示真实素材已通过。

如果后续上传真实素材，必须先更新素材清单、来源、授权、状态和人工验收记录，不能只把图片放进目录。
