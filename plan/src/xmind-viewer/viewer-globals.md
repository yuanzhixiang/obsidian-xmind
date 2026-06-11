# Viewer 全局变量 Bootstrap

## 组件职责

`viewer-globals.ts` 负责生成 iframe 内的基础本地运行环境。当前源码版 viewer 不再依赖旧 XMind bundle 的资源映射，但该模块仍统一维护旧调度保护、分析空实现和兼容字段，避免这些 bootstrap 细节散落在 HTML 壳里。

## 输入输出

- 输入：`ViewerAssetUrls`，包含已经由 `asset-loader.ts` 生成的 CSS、脚本、manifest 和动态 chunk Blob/Data URL。
- 输出：一个 `<script>` 字符串，写入 iframe HTML 后设置本地 viewer 的兼容字段、旧调度保护和分析服务空实现。

## 主要规则

- `window.__XMIND_ASSET_BASE__` 固定为空字符串，正式插件不得回退到远程或安装目录拼接资源。
- `window.__XMIND_ASSET_MAP__` 当前为空，仅保留为兼容字段。
- `window.manifests` 当前为空，仅保留为兼容字段。
- `window.dataLayer`、`window.gtag`、`window.mixpanel`、`window.uetq` 和 `window.__readSavedConsent` 只能是本地空实现，不允许触发远程统计服务。
- `window.hosts` 仅用于满足历史 bundle 读取，不代表允许访问远程 XMind 服务。
- `MutationObserver` / `WebKitMutationObserver` 旧调度保护必须覆盖 `globalThis`、`window`、`self`、`global`，并通过 `Object.defineProperty` 压住构造器读取，让旧 UMD/dist 代码走 Promise、MessageChannel 或定时器 fallback。

## 迁移约束

该模块不得承载新的业务逻辑。新的源码行为应落到 `file-loader.ts`、`xmind-document.ts`、`native-viewer-app.ts`、`viewer-state.ts`、`sheet-controller.ts`、`zoom-controller.ts` 或 `renderer/`。当旧兼容字段确认不再需要时，可以逐步删除。

## 验证方式

修改本模块后至少运行 `pnpm check:local-viewer` 和 `pnpm build`。涉及调度保护、资源映射或 manifest 时，还需要运行 `pnpm debug:xmind`，确认 `map-ready`、`sheets-load`、缩放、适配画布、中心主题显示和浏览器 console 都正常。
