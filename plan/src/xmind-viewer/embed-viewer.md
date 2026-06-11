# Viewer HTML 入口

## 组件职责

`embed-viewer.ts` 生成正式插件运行时使用的 iframe HTML。它把 `asset-loader.ts` 生成的源码 app Blob URL 写入 `<script>`，并通过 `viewer-globals.ts` 注入基础本地运行环境。

## 全局变量口径

- `window.__XMIND_ASSET_BASE__` 为空字符串，表示正式运行时不从远程或静态目录拼接资源。
- `window.__XMIND_ASSET_MAP__` 当前为空，仅保留为兼容字段。
- `window.manifests` 当前为空，仅保留为兼容字段。
- `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` 和 `WebKitMutationObserver` 在 viewer iframe 内通过 `Object.defineProperty` 显式置空，避免旧 Snowbrush/Promise/Vue 调度代码跨上下文调用 `observe()` 时抛错；旧代码会回退到 Promise、MessageChannel 或定时器调度。
- `window.gtag`、`window.mixpanel`、`window.uetq` 等分析对象必须是空实现，避免本地 viewer 尝试访问远程统计服务。
- `window.hosts` 仅满足历史 bundle 的读取需求，不代表允许访问远程 XMind 服务。

## 关键约束

生成的 HTML 必须完全本地可运行，不依赖 `https://www.xmind.app/embed-viewer`。HTML 只负责页面壳和源码 app 脚本顺序，不能在这里堆叠渲染逻辑；解析、布局、渲染和交互由 `native-viewer-app.ts` 与 `renderer/` 承担。
