# 本地 XMind 调试服务器

## 功能定位

`scripts/debug-xmind-local-viewer.mjs` 启动本地 HTTP 服务，用浏览器打开调试页面并加载指定 `.xmind` 文件，用于验证内置 viewer 的渲染、缩放、适配画布和控制条行为。

## 资源口径

- 调试页面从 `debug/xmind-local-viewer/` 提供。
- 正式调试 iframe 从 `/debug-runtime/xmind-native-viewer.html` 提供，并加载同一份 `src/xmind-viewer/native-viewer-app.ts` 打出的源码 viewer。
- `src/xmind-viewer-assets/` 仍可作为历史兼容资产的静态服务目录，用于对照旧 bundle 或检查 `73350` parts，但不再是调试主路径。
- `/debug-runtime/xmind-file-loader.js` 会把 `src/xmind-viewer/file-loader.ts` 打成浏览器可执行的源码预处理 bundle，调试父页面在发送 `open-file` 前调用它处理 `.xmind` ArrayBuffer。
- `/debug-runtime/xmind-native-viewer.js` 会把 `src/xmind-viewer/native-viewer-app.ts` 及其源码依赖打成 IIFE，和正式构建的 `?appbundle` 语义保持一致。
- `/debug-runtime/xmind-native-viewer.html` 必须在加载源码 app 前执行 `createDisableMutationObserverSchedulerScript()`，让 iframe 内的 JSZip 等历史兼容调度代码走 Promise、MessageChannel 或定时器 fallback，避免浏览器 console 出现 `MutationObserver.observe()` 报错。
- `/debug-runtime/xmind-native-viewer.html` 会在加载源码 app 前安装 error/unhandledrejection 转发，把 iframe 早期错误通过 `xmind-debug-error` 发给父页面日志。
- 通用三方 runtime 通过 `/debug-runtime/xmind-viewer-runtime.js` 按 `src/xmind-viewer/runtime.cjs` 打包；UMD/dist 文件直接拼接，FileSaver.js 会保存为 `window.__xmindPackageFileSaver`，CommonMark 会保存为 `window.__xmindPackageCommonmark`，MathJax 会保存为 `window.__xmindPackageMathJax`，`@xmldom/xmldom`、`entities`、`process/browser`、`inherits/inherits_browser.js`、`util/`、`path-browserify`、`svg-arc-to-cubic-bezier`、`points`、`svg-pathdata`、`svg-points`、`base64-js`、`ieee754`、`buffer/` 这类 CommonJS 包通过同构的小型 package loader 暴露到 iframe 全局。`process/browser` 必须额外同步为 `window.process`。该 loader 必须支持 `.json` 相对依赖，供 `entities` 读取 entity map；`util/` 的非相对依赖必须解析到先前保存的 `window.__xmindPackageInherits`，并使用浏览器版 isBuffer；`points` 的非相对依赖必须解析到先前保存的 `window.__xmindPackageSvgArcToCubicBezier`；`buffer/` 的非相对依赖必须解析到先前保存的 `window.__xmindPackageBase64Js` 和 `window.__xmindPackageIeee754`。`points-on-path` 和 `vue-style-loader/lib/addStylesClient.js` 是 ESM 包，调试服务通过 Rollup API 打成 IIFE，并分别保存为 `window.__xmindPackagePointsOnPath` 与 `window.__xmindPackageVueStyleLoader`。
- `/debug-runtime/xmind-viewer-runtime.js` 必须在所有三方脚本前执行 `createDisableMutationObserverSchedulerScript()`，与正式构建一致地通过 `Object.defineProperty` 禁用 `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` / `WebKitMutationObserver`，避免旧调度代码在调试页产生 `observe()` 报错。
- `/debug-runtime/xmind-viewer-runtime.js` 与正式 Rollup 构建一致，在拼接 `jszip/dist/jszip.min.js`、`localforage/dist/localforage.min.js` 和 `vue/dist/vue.min.js` 时通过 `disableLegacyMutationObserverScheduler()` 禁用 package dist 内置的旧 `MutationObserver` 调度分支，不修改 `node_modules`。
- `javascripts/73350.03dd088904.js` 请求必须由 `73350.03dd088904.parts/` 拼接返回，保持与正式构建相同的 Snowbrush chunk 来源。

## 边界和限制

- 该服务只用于本地视觉回归，不参与 Obsidian 插件发布。
- 不访问远程 `xmind.app/embed-viewer`。
- 不改变外层 MessageChannel 协议；源码 iframe app 必须继续支持 `setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet`。
