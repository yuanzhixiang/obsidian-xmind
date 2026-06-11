# Rollup 构建配置

## 功能定位

Rollup 负责把 Obsidian 插件源码打包成 CommonJS 插件入口，并把 `src/xmind-viewer-assets/` 中的本地 XMind viewer 运行时资源内联进 `main.js`。

## 构建口径

- 开发构建输出到 `test-vault/.obsidian/plugins/xmind-maps`。
- 生产构建输出到 `dist/`。
- `obsidian` 和 `electron` 保持 external，不打入插件 bundle。
- TypeScript、Node resolve、CommonJS、JSON 插件用于处理源码依赖。
- `inline-assets` 插件处理 `?raw`、`?dataurl`、`?bundle` 和 `?xmindchunk` 导入，把 viewer 资源转换为字符串模块。
- `?bundle` 用于按 `src/xmind-viewer/runtime.cjs` 清单读取 package UMD/dist 脚本，拼成 iframe 可直接加载的 runtime 脚本，并设置 `__xmindViewerRuntimeReady` 方便调试确认关键全局依赖存在。拼接 Underscore 后必须立即保存 `window.__xmindPackageUnderscore`，拼接 Hammer.js 后必须保存 `window.__xmindPackageHammer`，拼接 MobX 后必须保存 `window.__xmindPackageMobX`，拼接 CryptoJS 后必须保存 `window.__xmindPackageCryptoJS`，拼接 FileSaver.js 后必须保存 `window.__xmindPackageFileSaver`，拼接 CommonMark 后必须保存 `window.__xmindPackageCommonmark`，拼接 MathJax 后必须保存 `window.__xmindPackageMathJax`；对于 `@xmldom/xmldom`、`entities`、`process/browser`、`inherits/inherits_browser.js`、`util/`、`path-browserify`、`svg-arc-to-cubic-bezier`、`points`、`svg-pathdata`、`svg-points`、`base64-js`、`ieee754`、`buffer/` 这种 CommonJS 包，构建时生成小型 package loader 并保存对应 `window.__xmindPackage*` 全局。`process/browser` 必须额外同步为 `window.process`。CommonJS package loader 必须支持 `.json` 相对依赖，供 `entities` 读取 entity map；`util/` 的 package loader 必须通过外部全局映射解析 `require('inherits')`，并把 `util/support/isBuffer.js` 映射到浏览器实现；`points` 的 package loader 必须通过外部全局映射解析 `require('svg-arc-to-cubic-bezier')`；`buffer/` 的 package loader 必须通过外部全局映射解析 `require('base64-js')` 和 `require('ieee754')`。`points-on-path` 和 `vue-style-loader/lib/addStylesClient.js` 是 ESM 包，构建时通过 Rollup API 单独打成 IIFE，并分别保存为 `window.__xmindPackagePointsOnPath` 与 `window.__xmindPackageVueStyleLoader`，不走 CommonJS loader。
- package runtime bundle 必须在所有三方脚本前执行 `createDisableMutationObserverSchedulerScript()`，通过 `Object.defineProperty` 禁用 `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` / `WebKitMutationObserver`，避免旧 JSZip、Snowbrush、Vue 或 Promise 调度实现触发 `observe()` 跨上下文报错。
- `jszip/dist/jszip.min.js`、`localforage/dist/localforage.min.js` 和 `vue/dist/vue.min.js` 仍来自 package 依赖，但生成 iframe runtime 时必须通过 `disableLegacyMutationObserverScheduler()` 禁用它们内置的旧 `MutationObserver` 调度分支；这是构建期兼容补丁，不修改 `node_modules`，目的是让旧 UMD/dist 文件走 Promise、MessageChannel 或定时器 fallback。
- `?xmindchunk` 仅用于 `73350.03dd088904.parts/`，构建时把源码层拆分的 webpack chunk parts 拼回一个完整 JSONP chunk。
- 构建开始前必须清理输出目录，避免已删除的旧远程快照文件残留进 `dist/` 或开发插件目录。

## 本地资源交付

- 开发和生产构建只复制 `styles.css`、`manifest.json`，开发构建额外复制 `.hotreload`。
- `src/xmind-viewer-assets/` 只作为构建输入，不进入安装产物，避免 Obsidian 安装后依赖额外目录导致白屏。
- 如果新增 viewer 资源、动态 chunk 或 runtime 依赖，必须在 `src/xmind-viewer/asset-loader.ts`、`src/xmind-viewer/runtime.cjs` 或 chunk parts manifest 中显式维护。

## 发布约束

- 生产构建会压缩插件主 bundle。
- 发布资产必须保持 Obsidian 标准三件套可安装：`main.js`、`manifest.json`、`styles.css`。
- `bundle-analysis.html` 仅作为分析产物，不进入发布 zip。
