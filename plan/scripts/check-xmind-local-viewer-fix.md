# 本地 Viewer 修复检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是轻量回归检查，用于防止更新或格式化下载快照时误删本地 viewer 的关键兼容修复。

## 检查内容

- `share-embed` 必须读取 `window.__XMIND_ASSET_BASE__`。
- 本地 iframe 入口必须定义 `window.__XMIND_ASSET_BASE__`。
- 本地 `open-file` 分支必须调用 `xmindNormalizeLocalOpenFile`。
- 中心主题修复必须同时覆盖 `theme.centralTopic.properties` 和 `theme.topicThemeMap.centralTopic.properties`。
- 继承文字色不可见时必须规范化为 `#000000`。

## 限制

该脚本是静态代码检查，不替代浏览器视觉回归。涉及渲染布局、缩放和主题显示时，仍需通过 `pnpm debug:xmind` 打开实际 `.xmind` 文件确认。
