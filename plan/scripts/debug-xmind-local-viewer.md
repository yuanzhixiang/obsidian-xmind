# 本地 XMind 调试服务器

## 功能定位

`scripts/debug-xmind-local-viewer.mjs` 启动本地 HTTP 服务，用浏览器打开调试页面并加载指定 `.xmind` 文件，用于验证源码 viewer 的渲染、缩放、适配画布和控制条行为。

## 资源口径

- 调试页面从 `debug/xmind-local-viewer/` 提供。
- `/debug-runtime/xmind-viewer.js` 会把 `src/xmind-viewer/index.ts` 及其源码依赖打成浏览器可执行 IIFE。
- `/plugin-styles.css` 直接提供根目录 `styles.css`，确保调试页和正式插件使用同一套 viewer 样式。
- 调试服务器不提供 `src/xmind-viewer-assets/` 静态路由，也不拼接历史 `73350` chunk。

## 边界和限制

- 该服务只用于本地视觉回归，不参与 Obsidian 插件发布。
- 不访问远程 `xmind.app/embed-viewer`。
- 不提供 iframe、MessageChannel 或旧 package runtime 路由；调试主路径只验证直接源码 viewer。
