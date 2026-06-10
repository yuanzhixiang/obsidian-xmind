# 本地 Viewer 修复检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是轻量回归检查，用于防止更新或格式化下载快照时误删本地 viewer 的关键兼容修复。

## 检查内容

- `share-embed` 必须读取 `window.__XMIND_ASSET_BASE__`。
- `share-embed` 必须支持 `window.__XMIND_ASSET_MAP__`，让内联 Blob chunk 能被动态加载。
- 本地 iframe 入口必须定义 `window.__XMIND_ASSET_BASE__`。
- 运行时必须通过 `getInlineXMindViewerUrl()` 使用打包在 `main.js` 中的本地 viewer 资源。
- XMind viewer 专属资产必须来自 `src/xmind-viewer-assets/`，不得重新引入旧下载镜像目录。
- 通用三方 JS 必须通过 `package.json` 依赖和 `xmind-viewer-runtime.cjs?bundle` 注入，不得重新引用已删除的本地三方 JS 文件。
- `73350` Snowbrush chunk 不得重新内置完整 jQuery，必须委托给 package runtime 提供的 `window.jQuery` 或 `window.$`。
- Obsidian 视图不得继续依赖 `app.vault.adapter.getResourcePath()` 指向额外安装目录。
- 本地 `open-file` 分支必须调用 `xmindNormalizeLocalOpenFile`。
- 中心主题修复必须同时覆盖 `theme.centralTopic.properties` 和 `theme.topicThemeMap.centralTopic.properties`。
- 继承文字色不可见时必须规范化为 `#000000`。

## 限制

该脚本是静态代码检查，不替代浏览器视觉回归。涉及渲染布局、缩放和主题显示时，仍需通过 `pnpm debug:xmind` 打开实际 `.xmind` 文件确认。
