# 本地 XMind 调试服务器

## 功能定位

`scripts/debug-xmind-local-viewer.mjs` 启动本地 HTTP 服务，用浏览器打开调试页面并加载指定 `.xmind` 文件，用于验证内置 viewer 的渲染、缩放、适配画布和控制条行为。

## 资源口径

- 调试页面从 `debug/xmind-local-viewer/` 提供。
- 正式调试 iframe 从 `/debug-runtime/xmind-native-viewer.html` 提供，并加载同一份 `src/xmind-viewer/native-viewer-app.ts` 打出的源码 viewer。
- `/debug-runtime/xmind-file-loader.js` 会把 `src/xmind-viewer/file-loader.ts` 打成浏览器可执行的源码预处理 bundle，调试父页面在发送 `open-file` 前调用它处理 `.xmind` ArrayBuffer。
- `/debug-runtime/xmind-native-viewer.js` 会把 `src/xmind-viewer/native-viewer-app.ts` 及其源码依赖打成 IIFE，和正式构建的 `?appbundle` 语义保持一致。
- `/debug-runtime/xmind-native-viewer.html` 必须在加载源码 app 前执行 `createDisableMutationObserverSchedulerScript()`，让 iframe 内的 JSZip 等异步调度代码走 Promise、MessageChannel 或定时器 fallback，避免浏览器 console 出现 `MutationObserver.observe()` 报错。
- `/debug-runtime/xmind-native-viewer.html` 会在加载源码 app 前安装 error/unhandledrejection 转发，把 iframe 早期错误通过 `xmind-debug-error` 发给父页面日志。
- 调试服务器不再提供 `src/xmind-viewer-assets/` 静态路由，也不再拼接历史 `73350` chunk。

## 边界和限制

- 该服务只用于本地视觉回归，不参与 Obsidian 插件发布。
- 不访问远程 `xmind.app/embed-viewer`。
- 不提供旧 package runtime 路由；调试主路径只验证源码 viewer。
- 不改变外层 MessageChannel 协议；源码 iframe app 必须继续支持 `setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet`。
