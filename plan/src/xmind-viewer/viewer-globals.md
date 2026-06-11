# Viewer 全局变量 Bootstrap

## 组件职责

`viewer-globals.ts` 负责生成 iframe 内 XMind 历史 viewer 运行所需的全局变量脚本。它是 `embed-viewer.ts` 的 bootstrap 细节拆分层，让 HTML 壳不再直接维护分析空实现、host shim、资源映射和旧调度保护。

## 输入输出

- 输入：`ViewerAssetUrls`，包含已经由 `asset-loader.ts` 生成的 CSS、脚本、manifest 和动态 chunk Blob/Data URL。
- 输出：一个 `<script>` 字符串，写入 iframe HTML 后设置本地 viewer 所需的 `window.__XMIND_ASSET_BASE__`、`window.__XMIND_ASSET_MAP__`、`window.manifests`、`window.hosts` 以及分析服务空实现。

## 主要规则

- `window.__XMIND_ASSET_BASE__` 固定为空字符串，正式插件不得回退到远程或安装目录拼接资源。
- `window.__XMIND_ASSET_MAP__` 必须保存动态 chunk 到 Blob URL 的映射，供 `share-embed` 的本地 chunk loader 使用。
- `window.manifests` 必须保存 `snowbrush.js`、加载动画、分享图标和 XMind logo 等资源 URL。
- `window.dataLayer`、`window.gtag`、`window.mixpanel`、`window.uetq` 和 `window.__readSavedConsent` 只能是本地空实现，不允许触发远程统计服务。
- `window.hosts` 仅用于满足历史 bundle 读取，不代表允许访问远程 XMind 服务。
- `MutationObserver` / `WebKitMutationObserver` 旧调度保护必须覆盖 `globalThis`、`window`、`self`、`global`，并通过 `Object.defineProperty` 压住构造器读取，让旧 UMD/dist 代码走 Promise、MessageChannel 或定时器 fallback。

## 迁移约束

该模块仍然服务于历史兼容 bundle。后续每当 `share-embed`、`snowbrush.js` 或动态 chunk 中的对应依赖被源码化，就应该删除不再需要的全局 shim。不得把新的业务逻辑继续塞进全局脚本；新的源码行为应落到 `file-loader.ts`、`viewer-state.ts`、`sheet-controller.ts`、`zoom-controller.ts` 或未来的 renderer 源码模块。

## 验证方式

修改本模块后至少运行 `pnpm check:local-viewer`、`pnpm check:xmind-chunk` 和 `pnpm build`。涉及调度保护、资源映射或 manifest 时，还需要运行 `pnpm debug:xmind`，确认 `map-ready`、`sheets-load`、缩放、适配画布、中心主题显示和浏览器 console 都正常。
