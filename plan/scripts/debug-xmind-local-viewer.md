# 本地 XMind 调试服务器

## 功能定位

`scripts/debug-xmind-local-viewer.mjs` 启动本地 HTTP 服务，用浏览器打开调试页面并加载指定 `.xmind` 文件，用于验证内置 viewer 的渲染、缩放、适配画布和控制条行为。

## 资源口径

- 调试页面从 `debug/xmind-local-viewer/` 提供。
- viewer 静态资源从 `src/xmind-viewer-assets/` 提供。
- 通用三方 runtime 通过 `/debug-runtime/xmind-viewer-runtime.js` 按 `src/core/xmind-viewer-runtime.cjs` 打包。
- `javascripts/73350.03dd088904.js` 请求必须由 `73350.03dd088904.parts/` 拼接返回，保持与正式构建相同的 Snowbrush chunk 来源。

## 边界和限制

- 该服务只用于本地视觉回归，不参与 Obsidian 插件发布。
- 不访问远程 `xmind.app/embed-viewer`。
- 不改变 XMind viewer 的 MessageChannel 协议。
