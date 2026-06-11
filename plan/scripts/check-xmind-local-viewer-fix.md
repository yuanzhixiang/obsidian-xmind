# 本地 Viewer 修复检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是轻量回归检查，用于防止更新或格式化下载快照时误删本地 viewer 的关键兼容修复。

## 检查内容

- `share-embed` 必须读取 `window.__XMIND_ASSET_BASE__`。
- `share-embed` 必须支持 `window.__XMIND_ASSET_MAP__`，让内联 Blob chunk 能被动态加载。
- 本地 iframe 入口必须定义 `window.__XMIND_ASSET_BASE__`。
- 本地 iframe 入口和正式源码生成的 iframe HTML 必须通过 `Object.defineProperty` 禁用 `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` / `WebKitMutationObserver`，防止旧 Snowbrush/Promise/Vue 调度代码重新触发 `observe()` 跨上下文报错。
- `snowbrush.js` 兼容层的旧异步调度入口不得再直接读取 `MutationObserver` / `WebKitMutationObserver`，必须走 Promise、MessageChannel 或定时器 fallback。
- viewer CSS 不得保留 `https://assets.xmind.net` 或 `https://www.xmind.app` 远程资源 URL。
- 运行时必须通过 `getInlineXMindViewerUrl()` 使用打包在 `main.js` 中的本地 viewer 资源。
- `src/core/xmind-viewer-assets.ts`、`src/core/local-xmind-embed-viewer.ts` 和 `src/core/xmind-viewer-runtime.cjs` 不得重新出现。
- Obsidian core 调用方必须只导入 `src/xmind-viewer/` 稳定入口，不得绕过入口导入 `render-adapter.ts`、`iframe-bridge.ts`、`file-loader.ts` 或 `workbook-model.ts`。
- `iframe-bridge.ts` 必须承接 `MessageChannel` 握手、reply 超时和 `XMindViewerError`，不得重新恢复旧 `message-channel.ts` 门面。
- `viewer-events.ts` 必须解析 iframe runtime 的 `event` 消息，`viewer-state.ts` 必须承接 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 状态投影。
- `sheet-controller.ts` 必须承接 sheet 列表、当前 sheet 和 `switch-sheet` 行为；`zoom-controller.ts` 必须承接当前缩放值、`fit-map` 和 `zoom` 行为。
- `render-adapter.ts` 不得直接向 bridge 发送 `fit-map`、`zoom` 或 `switch-sheet`，只能组合对应 controller。
- `theme-loader.ts` 必须承接中心主题不可见的 theme 兼容规则；`file-loader.ts` 只负责 `.xmind` zip 读写、workbook 元数据提取和调用 theme loader，不得重新内嵌 `fo:color` 规则。
- `resource-manifest.ts` 必须承接 viewer 资源声明，`asset-loader.ts` 只负责 Blob/Data URL 创建与回收，不得重新内嵌 `?raw`、`?dataurl`、`?xmindchunk` import。
- `viewer-globals.ts` 必须承接 iframe 内的资源映射、manifest、host shim、分析空实现和旧调度保护；`embed-viewer.ts` 只组合 HTML 壳，不得重新内嵌这些全局兼容细节。
- XMind viewer 专属资产必须来自 `src/xmind-viewer-assets/`，不得重新引入旧下载镜像目录。
- 通用三方 JS 必须通过 `package.json` 依赖和 `runtime.cjs?bundle` 注入，不得重新引用已删除的本地三方 JS 文件。
- 正式 Rollup 构建和本地 debug server 的 package runtime bundle 都必须在三方脚本前执行 `createDisableMutationObserverSchedulerScript()`，用 `Object.defineProperty` 压住多个 global alias，避免旧 UMD 调度代码重新使用 `MutationObserver.observe()`。
- 正式 Rollup 构建和本地 debug server 都必须在生成 package runtime 时对 `jszip/dist/jszip.min.js`、`localforage/dist/localforage.min.js` 和 `vue/dist/vue.min.js` 应用 `disableLegacyMutationObserverScheduler()`，防止 package dist 文件重新启用旧 `MutationObserver` scheduler。
- `.xmind` zip 预处理必须通过源码层 `src/xmind-viewer/file-loader.ts` 和 `jszip` 依赖完成，sheet 元数据提取必须通过 `src/xmind-viewer/workbook-model.ts` 完成。
- 本地调试页必须加载 `/debug-runtime/xmind-file-loader.js`，并在发送 `open-file` 前调用源码 `loadLocalXMindFile()` 的浏览器打包产物完成预处理。
- `share-embed` 不得重新内嵌 JSZip 源码，必须委托 package runtime 提供的 `window.JSZip`。
- `share-embed` 不得重新内嵌 localForage 源码，必须委托 package runtime 提供的 `window.localforage`。
- `share-embed` 不得重新内嵌 Lodash 源码，必须委托 package runtime 提供的 `window._`。
- `share-embed` 不得重新内嵌 anime.js 源码，必须委托 package runtime 提供的 `window.anime`。
- `share-embed` 不得重新内嵌 axios 源码，必须委托 package runtime 提供的 `window.axios`。
- `share-embed` 不得重新内嵌 `vue-style-loader` 的浏览器样式注入源码，必须委托 package runtime 保存的 `window.__xmindPackageVueStyleLoader`。
- `share-embed` 的 `14224` 模块必须保留最小 browser `process` shim，供 `73350` Snowbrush chunk 的 path/util 模块使用，不得再误标成 axios 内部模块删除。
- `73350` Snowbrush chunk 不得重新内嵌 CommonMark 源码，必须委托 package runtime 保存的 `window.__xmindPackageCommonmark`；旧 commonmark 内部 helper 只能保留明确错误占位，防止误用未迁移的内部入口。
- `73350` Snowbrush chunk 不得重新内嵌 entities 源码或 entity map，必须委托 package runtime 保存的 `window.__xmindPackageEntities`；旧 entity map、decode code point 和 `fromCodePoint` helper 只能保留明确错误占位。
- `73350` Snowbrush chunk 不得重新内嵌 MathJax 3.1.2 browser bundle，必须委托 package runtime 保存的 `window.__xmindPackageMathJax`；旧 nested module `166` 只能保留明确的 package runtime 校验桥。
- `73350` Snowbrush chunk 不得重新内嵌 browserify process shim 源码，nested module `45` 必须委托 package runtime 保存的 `window.__xmindPackageProcess`。
- `73350` Snowbrush chunk 不得重新内嵌 FileSaver.js 源码，nested module `102` 必须委托 package runtime 保存的 `window.__xmindPackageFileSaver`。
- `73350` Snowbrush chunk 不得重新内嵌 util 或 inherits 源码，必须委托 package runtime 保存的 `window.__xmindPackageUtil` 和 `window.__xmindPackageInherits`；旧 isBuffer module 也只能转发 package util 的浏览器实现。
- `73350` Snowbrush chunk 不得重新内嵌 browserify path 源码，必须委托 package runtime 保存的 `window.__xmindPackagePath`。当前运行时只依赖 POSIX path API；如需 win32 语义，后续必须在源码层显式实现和测试。
- `73350` Snowbrush chunk 不得重新内嵌 points 源码，必须委托 package runtime 保存的 `window.__xmindPackagePoints`，并保持 `add`、`boundingBox`、`cubify`、`length`、`moveIndex`、`offset`、`position`、`remove`、`reverse`、`rotate` 和 `scale` 的命名导出形状。
- `73350` Snowbrush chunk 不得重新内嵌 points-on-path 的 path parser、曲线采样或路径简化源码，`80930` module 必须委托 package runtime 保存的 `window.__xmindPackagePointsOnPath`，并保持 `pointsOnPath` 命名导出形状。
- `73350` Snowbrush chunk 不得重新内嵌 svg-pathdata 源码，必须委托 package runtime 保存的 `window.__xmindPackageSvgPathData`，并保持 `SVGPathData`、`SVGPathDataParser`、`SVGPathDataTransformer`、`COMMAND_ARG_COUNTS` 和 `encodeSVGPath` 的命名导出形状。
- `73350` Snowbrush chunk 不得重新内嵌 svg-points 源码，必须委托 package runtime 保存的 `window.__xmindPackageSvgPoints`，并保持 `toPath`、`toPoints` 和 `valid` 的命名导出形状。
- `73350` Snowbrush chunk 不得重新内嵌 Buffer、base64-js 或 ieee754 源码，必须委托 package runtime 保存的 `window.__xmindPackageBuffer`、`window.__xmindPackageBase64Js` 和 `window.__xmindPackageIeee754`；旧 isArray shim 只能保留为 `Array.isArray` 平台转发。
- `73350` Snowbrush chunk 不得重新内嵌 Backbone 源码，必须委托 package runtime 提供的 `window.Backbone`。
- `73350` Snowbrush chunk 不得重新内嵌 Underscore 源码，必须委托 package runtime 保存的 `window.__xmindPackageUnderscore`，并保持 webpack ES module namespace 形状，兼容 `i.n()` 默认导入和命名方法导入。
- `73350` Snowbrush chunk 不得重新内嵌 MobX 源码，必须委托 package runtime 保存的 `window.__xmindPackageMobX`，并保持 webpack ES module namespace 形状，兼容命名方法导入。
- `73350` Snowbrush chunk 不得重新内嵌 CryptoJS 源码，必须委托 package runtime 保存的 `window.__xmindPackageCryptoJS`，并保留 `4241` 完整包入口和相关加密子模块 id 的兼容 bridge。
- `73350` Snowbrush chunk 不得重新内嵌 xmldom/SAX 源码，必须委托 package runtime 保存的 `window.__xmindPackageXmldom`，并保留 DOMParser/XMLSerializer/DOMImplementation 兼容 bridge。
- `73350` Snowbrush chunk 不得重新内嵌 Hammer.js 源码，必须委托 package runtime 保存的 `window.__xmindPackageHammer`。
- `73350` Snowbrush chunk 必须从 parts 拼接检查，不得重新提交单体 `73350.03dd088904.js`。
- `73350` Snowbrush chunk 不得重新内置完整 jQuery，必须委托给 package runtime 提供的 `window.jQuery` 或 `window.$`。
- Obsidian 视图不得继续依赖 `app.vault.adapter.getResourcePath()` 指向额外安装目录。
- 本地 `open-file` 分支不得再调用或定义 `xmindNormalizeLocalOpenFile`，只能接收已经预处理的 ArrayBuffer。
- 中心主题修复必须在源码 `theme-loader.ts` 中同时覆盖 `theme.centralTopic.properties` 和 `theme.topicThemeMap.centralTopic.properties`。
- 继承文字色不可见时必须由源码 normalizer 规范化为 `#000000`，不得重新塞回 `share-embed`。

## 限制

该脚本是静态代码检查，不替代浏览器视觉回归。涉及渲染布局、缩放和主题显示时，仍需通过 `pnpm debug:xmind` 打开实际 `.xmind` 文件确认。
