# Viewer 三方运行时清单

## 组件职责

`runtime.cjs` 声明本地 iframe 需要按顺序加载的通用三方浏览器脚本。Rollup 的 `?bundle` 处理会按该清单从 `package.json` 依赖中读取 UMD/dist 文件，拼成 iframe 可直接执行的 runtime 脚本。

## 依赖顺序

- `jquery/dist/jquery.min.js`
- `js-cookie/src/js.cookie.js`
- `jszip/dist/jszip.min.js`
- `localforage/dist/localforage.min.js`
- `underscore/underscore-min.js`
- `lodash/lodash.min.js`
- `animejs/lib/anime.min.js`
- `axios/dist/axios.min.js`
- `file-saver`
- `commonmark`
- `entities`
- `mathjax-full/es5/tex-svg.js`
- `process/browser`
- `inherits/inherits_browser.js`
- `util/`
- `path-browserify`
- `svg-arc-to-cubic-bezier`
- `points`
- `points-on-path`
- `svg-pathdata`
- `svg-points`
- `base64-js`
- `ieee754`
- `buffer/`
- `hammerjs/hammer.min.js`
- `backbone/backbone-min.js`
- `mobx/dist/mobx.umd.production.min.js`
- `crypto-js/crypto-js.js`
- `@xmldom/xmldom`
- `popper.js/dist/umd/popper.min.js`
- `bootstrap/dist/js/bootstrap.min.js`
- `vue/dist/vue.min.js`
- `vue-style-loader/lib/addStylesClient.js`

## 关键约束

- 这些三方库必须来自 package 依赖，不允许回到 `src/xmind-viewer-assets/` 里的历史静态 JS。
- 顺序不能随意调整，Underscore 必须先加载并保存为 `window.__xmindPackageUnderscore`，随后 Lodash 覆盖 `window._` 供 `share-embed` 使用；FileSaver.js 必须在 `73350` chunk 加载前保存为 `window.__xmindPackageFileSaver`；`commonmark` 必须在 `73350` chunk 加载前保存为 `window.__xmindPackageCommonmark`；`entities` 必须在 `73350` chunk 加载前保存为 `window.__xmindPackageEntities`；MathJax 必须在 `73350` chunk 入口 `i(166)` 执行前保存为 `window.__xmindPackageMathJax`；`process/browser` 必须先暴露为 `window.__xmindPackageProcess` 并同步到 `window.process`；`util/` 依赖 `inherits/inherits_browser.js` 先暴露到 `window.__xmindPackageInherits`；`points` 依赖 `svg-arc-to-cubic-bezier` 先暴露到 `window.__xmindPackageSvgArcToCubicBezier`；`points-on-path` 由 Rollup 打成 `window.__xmindPackagePointsOnPath`；`vue-style-loader/lib/addStylesClient.js` 由 Rollup 打成 `window.__xmindPackageVueStyleLoader`；`buffer/` 依赖 `base64-js` 和 `ieee754` 先暴露到全局；Backbone 依赖 Lodash 和 jQuery，Bootstrap 依赖 jQuery 和 Popper，历史 viewer bundle 依赖全局 `window.jQuery`、`window.$`、`window.Cookies`、`window.JSZip`、`window.localforage`、`window._`、`window.__xmindPackageUnderscore`、`window.anime`、`window.axios`、`window.__xmindPackageFileSaver`、`window.__xmindPackageCommonmark`、`window.__xmindPackageEntities`、`window.__xmindPackageMathJax`、`window.__xmindPackageProcess`、`window.__xmindPackageInherits`、`window.__xmindPackageUtil`、`window.__xmindPackagePath`、`window.__xmindPackageSvgArcToCubicBezier`、`window.__xmindPackagePoints`、`window.__xmindPackagePointsOnPath`、`window.__xmindPackageSvgPathData`、`window.__xmindPackageSvgPoints`、`window.__xmindPackageBase64Js`、`window.__xmindPackageIeee754`、`window.__xmindPackageBuffer`、`window.Hammer`、`window.Backbone`、`window.__xmindPackageMobX`、`window.__xmindPackageCryptoJS`、`window.__xmindPackageXmldom`、`window.Popper`、`window.Vue` 和 `window.__xmindPackageVueStyleLoader`。
- 运行时加载 `commonmark` 后必须保存 `window.__xmindPackageCommonmark`。`73350` chunk 的 CommonMark bridge 只允许读取该稳定全局，并保留 `Node`、`Parser`、`HtmlRenderer`、`XmlRenderer` 和 `Renderer` 的旧入口形态。内部 helper module 只保留明确错误的过渡占位，不能重新提交 commonmark parser/renderer 源码。
- `entities` 是 CommonJS 包，并且通过 JSON map 文件保存 HTML/XML entity 表。构建和调试链路的小型 package loader 必须支持 `.json` 相对 `require()`，并暴露 `window.__xmindPackageEntities`。`73350` chunk 的 entity bridge 只能读取该稳定全局，不能重新提交内嵌 entity map、decode regex、`fromCodePoint` 或 code point 修正表。
- 运行时加载 `mathjax-full/es5/tex-svg.js` 后必须保存 `window.__xmindPackageMathJax`。`73350` chunk 的 MathJax bridge 只允许校验该稳定全局，并保留 `window.MathJax.texReset()`、`window.MathJax.tex2svg()` 两个旧调用入口；不能重新提交 MathJax 3.1.2 browser bundle。
- MathJax component 的 startup 可能异步完成，`__xmindViewerRuntimeReady` 不能只同步计算一次；运行时必须在 `MathJax.startup.promise` 完成后重新刷新 ready 状态。
- `process/browser` 是 browserify process shim，构建和调试链路会通过小型 package loader 暴露为 `window.__xmindPackageProcess`，并同步设置 `window.process`。`73350` nested module `45` 只能读取该稳定全局，不能重新提交内嵌 process shim 源码。
- 运行时加载 `file-saver` 后必须保存 `window.__xmindPackageFileSaver`。`73350` nested module `102` 只能读取该稳定全局，并保持旧 `saveAs` 导出形状；不能重新提交内嵌 FileSaver.js 源码。
- `util/` 是 npm package 入口，不能改成 `util`。在 Node 构建环境里 `util` 会解析为内置模块，无法读取 package 源码；使用 `util/` 才能打包 `util@0.10.4` 的 browserify 实现。`73350` chunk 的 util、inherits 和 isBuffer bridge 只能读取 `window.__xmindPackageUtil` 和 `window.__xmindPackageInherits`。
- `path-browserify` 是 CommonJS 包，构建和调试链路会通过小型 package loader 暴露为 `window.__xmindPackagePath`。`73350` chunk 的 path bridge 只能读取该稳定全局。当前运行环境不是 win32，旧 bundle 实际使用 POSIX path 分支；如果后续发现依赖 `.win32`，需要用源码模块显式处理，而不是恢复内嵌 browserify path 源码。
- `svg-arc-to-cubic-bezier` 是 `points` 的 CommonJS 依赖，构建和调试链路会先暴露为 `window.__xmindPackageSvgArcToCubicBezier`。
- `points` 是 CommonJS 包，构建和调试链路会通过小型 package loader 暴露为 `window.__xmindPackagePoints`，并把非相对 `require('svg-arc-to-cubic-bezier')` 映射到 `window.__xmindPackageSvgArcToCubicBezier`。`73350` chunk 的点集几何处理 bridge 只能读取该稳定全局，并保持原 webpack module 的 `add`、`boundingBox`、`cubify`、`length`、`moveIndex`、`offset`、`position`、`remove`、`reverse`、`rotate` 和 `scale` 命名导出形状。
- `points-on-path` 是 ESM 包，构建和调试链路会用 Rollup 将其与 `path-data-parser`、`points-on-curve` 打成 IIFE，并暴露为 `window.__xmindPackagePointsOnPath`。`73350` chunk 的 `80930` bridge 只能读取该稳定全局，并保持原 webpack module 的 `pointsOnPath` 命名导出形状。
- `svg-pathdata` 是 CommonJS/UMD 包，构建和调试链路会通过小型 package loader 暴露为 `window.__xmindPackageSvgPathData`。`73350` chunk 的 SVG path parser bridge 只能读取该稳定全局，并保持原 webpack module 的命名导出形状。
- `svg-points` 是 CommonJS 包，构建和调试链路会通过小型 package loader 暴露为 `window.__xmindPackageSvgPoints`。`73350` chunk 的 SVG shape/path 点集转换 bridge 只能读取该稳定全局，并保持原 webpack module 的 `toPath`、`toPoints` 和 `valid` 命名导出形状。
- 构建和调试链路生成 CommonJS package loader 时，必须向包源码传入 `window` 作为 `global`，并提供最小 `process` shim，供 `util@0.10.4` 的 `deprecate`、`debuglog` 等历史 API 读取。`util/support/isBuffer.js` 必须映射到 `util/support/isBufferBrowser.js`，避免浏览器环境访问 Node `Buffer` 构造器。
- `buffer/` 是 npm package 入口，不能改成 `buffer`。在 Node 构建环境里 `buffer` 会解析为内置模块，无法读取 package 源码；使用 `buffer/` 才能打包 `buffer@5.7.1` 的浏览器实现。`73350` chunk 的 Buffer、base64-js、ieee754 bridge 只能读取 `window.__xmindPackageBuffer`、`window.__xmindPackageBase64Js` 和 `window.__xmindPackageIeee754`。
- 运行时加载 `underscore/underscore-min.js` 后必须立即保存 `window.__xmindPackageUnderscore`。`73350` chunk 的 Underscore 桥接只允许读取该稳定全局，不能读取后续被 Lodash 覆盖的 `window._`。桥接模块必须模拟原 webpack ES module namespace，保留 `default` 和命名方法两种访问形态。
- 运行时加载 `hammerjs/hammer.min.js` 后必须立即保存 `window.__xmindPackageHammer`。`snowbrush.js` 兼容快照可能改写 `window.Hammer`，`73350` chunk 的 Hammer 桥接只允许读取 `window.__xmindPackageHammer`。
- 运行时加载 `mobx/dist/mobx.umd.production.min.js` 后必须保存 `window.__xmindPackageMobX`。`73350` chunk 的 MobX 桥接只允许读取该稳定全局，并保持 webpack ES module namespace 形状以支持命名导入。
- 运行时加载 `crypto-js/crypto-js.js` 后必须保存 `window.__xmindPackageCryptoJS`。`73350` chunk 的 CryptoJS 桥接只允许读取该稳定全局，保留 `4241` 完整包入口以及 AES、PBKDF2、SHA、CTRGladman 等子模块 id 的兼容导出。
- `@xmldom/xmldom`、`entities`、`process/browser`、`path-browserify`、`svg-arc-to-cubic-bezier`、`points`、`svg-pathdata`、`svg-points`、`base64-js`、`ieee754` 和 `buffer/` 是 CommonJS 包，不是可直接拼接的 UMD 文件。构建和调试链路会在打包 iframe runtime 时读取 package 文件并生成一个小 CommonJS loader，把对应导出暴露到 `window.__xmindPackageXmldom`、`window.__xmindPackageEntities`、`window.__xmindPackageProcess`、`window.__xmindPackagePath`、`window.__xmindPackageSvgArcToCubicBezier`、`window.__xmindPackagePoints`、`window.__xmindPackageSvgPathData`、`window.__xmindPackageSvgPoints`、`window.__xmindPackageBase64Js`、`window.__xmindPackageIeee754` 和 `window.__xmindPackageBuffer`。该 loader 只读取 `node_modules` 中的依赖源码，不把第三方源码复制进仓库；其中 `entities` 的 `.json` map 必须按 JSON 模块处理，`points` 的非相对 `require('svg-arc-to-cubic-bezier')` 必须通过外部 package 全局映射解析，`buffer/` 的非相对 `require('base64-js')` 和 `require('ieee754')` 必须通过外部 package 全局映射解析。`points-on-path` 属于 ESM 包，不走该 CommonJS loader，而是通过 Rollup 生成 IIFE 全局。
- `axios@0.18.1` 是为匹配历史 `share-embed` bundle API 的临时兼容层。它不承载新的业务逻辑，后续重建请求逻辑时应替换为项目源码模块或经验证的现代依赖。
- `vue-style-loader/lib/addStylesClient.js` 是 `share-embed` 历史 Vue 组件样式注入 module `80950` 的三方 runtime。构建和调试链路必须通过 Rollup 打成 `window.__xmindPackageVueStyleLoader`，`share-embed` 只能保留短 bridge，不得重新提交内嵌 style-loader 源码。
- 新增或替换三方运行时依赖时，必须同步更新 `package.json`、`scripts/check-xmind-local-viewer-fix.mjs` 和本文件。
