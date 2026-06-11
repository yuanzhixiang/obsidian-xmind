# Viewer HTML 入口

## 组件职责

`embed-viewer.ts` 生成正式插件运行时使用的 iframe HTML。它把 `asset-loader.ts` 生成的本地 URL 写入 `<link>` 和 `<script>`，并通过 `viewer-globals.ts` 注入 XMind viewer 期待的全局变量。

## 全局变量口径

- `window.__XMIND_ASSET_BASE__` 为空字符串，表示正式运行时不从远程或静态目录拼接资源。
- `window.__XMIND_ASSET_MAP__` 保存动态 chunk 到 Blob URL 的映射。
- `window.manifests` 保存 Snowbrush、图标、动画等本地资源 URL。
- `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` 和 `WebKitMutationObserver` 在 viewer iframe 内通过 `Object.defineProperty` 显式置空，避免旧 Snowbrush/Promise/Vue 调度代码跨上下文调用 `observe()` 时抛错；旧代码会回退到 Promise、MessageChannel 或定时器调度。
- `window.gtag`、`window.mixpanel`、`window.uetq` 等分析对象必须是空实现，避免本地 viewer 尝试访问远程统计服务。
- `window.hosts` 仅满足历史 bundle 的读取需求，不代表允许访问远程 XMind 服务。

## 关键约束

生成的 HTML 必须完全本地可运行，不依赖 `https://www.xmind.app/embed-viewer`。HTML 只负责页面壳和资源顺序，不能在这里堆叠全局兼容细节或业务逻辑；全局 bootstrap 口径放在 `viewer-globals.ts`，新的本地文件兼容处理放在 `file-loader.ts`。
