# XMind Viewer 源码资产

## 能力定位

该目录保存插件内置 XMind viewer 必需的本地化兼容资产，包括调试 iframe 入口、XMind 渲染 bundle、样式、动态 chunk、图片和动画。它是项目源码的一部分，不再作为下载镜像目录维护。正式插件构建会通过 `src/xmind-viewer/asset-loader.ts` 从本目录读取 XMind 专属资源并内联进 `main.js`，通用三方 JS 由 `package.json` 依赖提供。

## 目录结构

- `local/embed-viewer.html` 是调试入口，使用相对路径加载本地镜像资源，并通过 `/debug-runtime/xmind-viewer-runtime.js` 加载 package 依赖打出的三方 runtime。
- `mirror/assets.xmind.net/` 镜像 XMind CDN 资源。
- `mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts/` 是 Snowbrush webpack chunk 的源码层拆分目录，调试和构建时会拼回 `javascripts/73350.03dd088904.js`。

## 关键行为

- `local/embed-viewer.html` 设置 `window.__XMIND_ASSET_BASE__`，让动态 chunk 从本地镜像目录加载。
- `local/embed-viewer.html` 与正式源码生成的 iframe HTML 都会通过 `Object.defineProperty` 禁用 iframe 内 `globalThis`、`window`、`self`、`global` 上的 `MutationObserver` / `WebKitMutationObserver`，让旧 Snowbrush/Promise/Vue 调度代码走 Promise、MessageChannel 或定时器 fallback，避免本地调试和 Obsidian 中出现 `observe()` 跨上下文报错。
- `local/embed-viewer.html` 不再直接加载 jQuery、js-cookie、Popper、Bootstrap、Vue 或旧 polyfill 的本地静态文件。
- `src/xmind-viewer/embed-viewer.ts` 在正式插件中设置 `window.__XMIND_ASSET_MAP__`，让动态 chunk 从内联 Blob URL 加载。
- `styles/index-141fccded4.css` 不保留远程 `@font-face` 或旧官网背景图 URL；字体回退到系统字体，避免本地 viewer 向 `assets.xmind.net` 发起请求。
- `73350.03dd088904.parts/` 不改变运行时加载协议；`share-embed` 仍只看到一个 `javascripts/73350.03dd088904.js` chunk。
- `share-embed.2d8410315a.js` 保留原 MessageChannel 协议：`setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet`。
- 正式 Obsidian 视图和调试父页面都会先运行 `src/xmind-viewer/file-loader.ts` 的 `loadLocalXMindFile()`。本地 `share-embed` 的 `open-file` 分支只接收已经预处理好的 ArrayBuffer，不再保留中心主题颜色兼容逻辑。
- 未被调试入口或正式打包引用的旧站点脚本、下载 meta 和历史截图不保留在仓库中。

## 三方依赖口径

- `javascripts/*.js` 和 `73350.03dd088904.parts/**/*.js` 必须保持 Prettier 格式化，方便审查本地修复和三方依赖边界；`0000-prefix.js` 和 `9999-suffix.js` 以字符串 wrapper 保存 JSONP 外壳文本。
- `73350` Snowbrush chunk 中原先内置的完整 jQuery 已删除，运行时必须通过 package runtime 暴露的 `window.jQuery` 或 `window.$` 获取 jQuery。
- JSZip 已作为 `jszip@3.10.1` 引入，用于源码层 `.xmind` 预处理；`share-embed` 的 JSZip webpack module 也改为委托 `window.JSZip`，不得重新提交内嵌 JSZip 源码。
- localForage 已作为 `localforage@1.9.0` 引入，`share-embed` 的 localForage webpack module 改为委托 `window.localforage`，不得重新提交内嵌 localForage 源码。
- Lodash 已作为 `lodash@4.17.21` 引入，`share-embed` 的 Lodash webpack module 改为委托 `window._`，不得重新提交内嵌 Lodash 源码。
- anime.js 已作为 `animejs@3.2.1` 引入，`share-embed` 的动画 webpack module 改为委托 `window.anime`，不得重新提交内嵌 anime.js 源码。
- axios 已作为 `axios@0.18.1` 引入，`share-embed` 的旧请求 webpack module 改为委托 `window.axios`，不得重新提交内嵌 axios 源码。该版本只用于历史 bundle 兼容，后续源码重建时应替换为项目自有请求模块或经验证的新版依赖。
- vue-style-loader 已作为 `vue-style-loader@4.1.3` 引入，`share-embed` 的 Vue 组件样式注入 module `80950` 改为委托 `window.__xmindPackageVueStyleLoader`，不得重新提交内嵌 `addStylesClient`、`listToStyles`、`data-vue-ssr-id` 或 style tag 注入源码。该 bridge 仍是过渡层，后续还原 Vue 组件源码时应改为普通源码 import 或由构建器处理样式。
- `share-embed` 的 `14224` 模块不是 axios 业务逻辑，而是 `73350` Snowbrush chunk 会直接引用的 browser `process` 兼容层。该模块只保留项目维护的最小 shim：`platform`、`env`、`cwd()`、`nextTick()` 等字段，不恢复旧 bundle 中的完整第三方 polyfill。
- CommonMark 已作为 `commonmark@0.30.0` 引入，`73350` Snowbrush chunk 的 Markdown 解析公共入口改为委托 `window.__xmindPackageCommonmark`，不得重新提交内嵌 commonmark parser、renderer、Node、HTML/XML renderer 源码。该 bridge 保留旧入口 `Node`、`Parser`、`HtmlRenderer`、`XmlRenderer` 和 `Renderer`；旧内部 helper 只保留明确错误占位，后续还原 Markdown 渲染源码时应改为普通源码 import。
- entities 已作为 `entities@2.0.3` 引入，`73350` Snowbrush chunk 的 HTML/XML entity 编解码模块改为委托 `window.__xmindPackageEntities`，不得重新提交内嵌 HTML5 entity 表、legacy entity 表、XML entity 表、decode regex、code point 修正表或 `fromCodePoint` helper。`23199`、`36110`、`46413` 只保留旧 webpack module 形状的短 bridge，其余 entity 内部模块只保留明确错误占位；后续还原富文本/XML 解析源码时应改为正常 `import { decodeHTML, encodeXML } from 'entities'` 等源码 import。
- MathJax 已作为 `mathjax-full@3.1.2` 引入，`73350` Snowbrush chunk 的 nested module `166` 改为委托 `window.__xmindPackageMathJax`，不得重新提交内嵌 MathJax 3.1.2 browser bundle、TeX input、SVG output、HTML adaptor 或字体组件。该 bridge 只保留旧 `i(166)` 副作用入口；后续还原数学公式渲染源码时应移动到 `src/xmind-viewer/` 的公式渲染模块。
- process/browser 已作为 `process@0.11.10` 引入，`73350` Snowbrush chunk 的 nested module `45` 改为委托 `window.__xmindPackageProcess`，不得重新提交内嵌 browserify process shim 源码。运行时会同步设置 `window.process`，供旧模块读取 `process.nextTick`、`env`、`cwd()` 等 API。
- FileSaver.js 已作为 `file-saver@1.3.8` 引入，`73350` Snowbrush chunk 的 nested module `102` 改为委托 `window.__xmindPackageFileSaver`，不得重新提交内嵌 FileSaver.js 源码。该 bridge 仍是过渡层，后续还原导出或保存相关源码时应改为正常源码 import。
- util 和 inherits 已作为 `util@0.10.4` 与 `inherits@2.0.4` 引入，`73350` Snowbrush chunk 的 Node util、inherits 和 isBuffer module 改为委托 `window.__xmindPackageUtil` 与 `window.__xmindPackageInherits`，不得重新提交内嵌 util.inspect、debuglog、inherits 或 isBuffer 源码。`util/` bridge 仍是过渡层，后续还原依赖 util 的 Snowbrush 模块时应改为正常源码 import 或移除不再需要的 Node 兼容 API。
- path-browserify 已作为 `path-browserify@1.0.1` 引入，`73350` Snowbrush chunk 的 path module 改为委托 `window.__xmindPackagePath`，不得重新提交内嵌 browserify path 源码。当前运行时实际走 POSIX path 分支；后续还原依赖 path 的文件解析或资源路径源码时，应改为正常源码 import。
- points 已作为 `points@3.2.0` 引入，并显式引入其 arc 曲线转换依赖 `svg-arc-to-cubic-bezier@3.2.0`；`73350` Snowbrush chunk 的点集几何处理 module 改为委托 `window.__xmindPackagePoints`，不得重新提交内嵌点集插点、bbox、曲线转换、长度、位置、平移、反转、旋转或缩放源码。该 bridge 仍是过渡层，后续还原图形路径处理源码时应改为正常源码 import。
- points-on-path 已作为 `points-on-path@0.2.1` 引入，`73350` Snowbrush chunk 的 `80930` SVG path 采样 module 改为委托 `window.__xmindPackagePointsOnPath`，不得重新提交内嵌 path parser、曲线离散或路径简化源码。该包是 ESM，构建和调试 runtime 通过 Rollup 生成 iframe 可执行的 IIFE 全局；后续还原路径采样源码时应改为正常源码 import。
- svg-pathdata 已作为 `svg-pathdata@6.0.3` 引入，`73350` Snowbrush chunk 的 SVG path parser module 改为委托 `window.__xmindPackageSvgPathData`，不得重新提交内嵌 `SVGPathData`、parser、transformer 或 path encode 源码。该 bridge 仍是过渡层，后续还原主题边界、图形路径和 SVG path 边界计算源码时应改为正常源码 import。
- svg-points 已作为 `svg-points@6.0.1` 引入，`73350` Snowbrush chunk 的 SVG shape/path 点集转换 module 改为委托 `window.__xmindPackageSvgPoints`，不得重新提交内嵌 shape 转 points、points 转 path 或 shape 校验源码。该 bridge 仍是过渡层，后续还原图形路径处理源码时应改为正常源码 import。
- Buffer、base64-js 和 ieee754 已分别作为 `buffer@5.7.1`、`base64-js@1.5.1`、`ieee754@1.2.1` 引入，`73350` Snowbrush chunk 的 nested module `162`、`163`、`164` 改为委托 `window.__xmindPackageBuffer`、`window.__xmindPackageBase64Js` 和 `window.__xmindPackageIeee754`，不得重新提交内嵌源码。nested module `165` 只保留 `Array.isArray` 平台 shim，不再维护旧 isArray 兼容函数。
- Backbone 已作为 `backbone@1.4.1` 引入，`73350` Snowbrush chunk 的 Backbone module 改为委托 `window.Backbone`，不得重新提交内嵌 Backbone 源码。
- Underscore 已作为 `underscore@1.13.6` 引入，`73350` Snowbrush chunk 的 Underscore module 改为委托 `window.__xmindPackageUnderscore`，不得重新提交内嵌 Underscore 源码。该全局必须在 Lodash 覆盖 `window._` 前保存，避免影响 `share-embed` 的 Lodash 兼容桥接。`70251` bridge 必须导出 webpack ES module namespace 形状，包含 `__esModule`、`default` 和命名方法转发，不能裸导出 Underscore 函数；否则 `i.n()` 默认导入和 `Object(underscore.each)` 命名导入混用时会触发运行时错误。
- MobX 已作为 `mobx@6.13.7` 引入，`73350` Snowbrush chunk 的 MobX module 改为委托 `window.__xmindPackageMobX`，不得重新提交内嵌 MobX 源码。`22625` bridge 必须导出 webpack ES module namespace 形状，转发 `autorun`、`reaction`、`makeObservable`、`observable`、`action` 等命名 API，并跳过 package 对象自带的 `__esModule` 字段，避免重复定义。该 bridge 仍是过渡层，后续还原 Snowbrush view/model 源码时应改为正常 `import { ... } from 'mobx'`。
- CryptoJS 已作为 `crypto-js@4.2.0` 引入，`73350` Snowbrush chunk 的 CryptoJS 入口和子模块改为委托 `window.__xmindPackageCryptoJS`，不得重新提交内嵌 CryptoJS 源码。`4241` bridge 保留完整包入口，AES、PBKDF2、SHA、HMAC、DES、RC4、Rabbit、CTRGladman、padding 和 format 等 module id 保留兼容导出。该 bridge 仍是过渡层，后续还原 `.xmind` 加密文件解析源码时应改为正常源码 import。
- xmldom 已作为 `@xmldom/xmldom@0.8.10` 引入，`73350` Snowbrush chunk 的 DOMParser、XMLSerializer、DOMImplementation 和 SAX 相关 module 改为委托 `window.__xmindPackageXmldom`，不得重新提交内嵌 xmldom 源码。当前 `36697` bridge 导出 XMind 文件解析实际使用的 DOM API，`77439` 的 XMLReader 只保留明确错误的兼容占位，因为现有引用链只通过 DOMParser 入口访问 xmldom。该版本是为了兼容旧 bundle 使用的 `new DOMParser({ errorHandler })` 形态临时固定；后续还原 XML 解析源码后，应迁移到新版 `onError` API。
- Hammer.js 已作为 `hammerjs@2.0.7` 引入，运行时会先保存 package 提供的 `window.__xmindPackageHammer`；`73350` Snowbrush chunk 的 Hammer module 必须委托该稳定全局，不得重新提交内嵌 Hammer.js 源码。
- `snowbrush.js` 仍是历史快照兼容层，暂时不能替换为 npm 包。它内部保留的两个旧异步调度入口必须显式跳过 `MutationObserver` / `WebKitMutationObserver`，改走 Promise、MessageChannel 或定时器 fallback，避免跨上下文 `observe()` 报错。该文件仍包含历史快照里的 Hammer 兼容代码，可能改写 `window.Hammer`；依赖 `window.__xmindPackageHammer` 可避免 `73350` chunk 读到被覆盖后的全局对象。
- `share-embed` 和 `73350` 中仍保留的 core-js、i18next 和图形路径处理代码属于 XMind webpack 内部模块链或尚未完成依赖映射。没有源码级模块映射前，不从 bundle 中拆出，避免破坏 XMind 文件解析、主题处理和图形渲染。
- `73350` 的拆分是源码维护拆分，不是运行时多 script 拆分；不得改写 webpack JSONP loader 或 chunk id 完成语义。

## 中心主题兼容修复

XMind 26 / `layoutEngineVersion: 5` 文件可能把中心主题文字色写成 `fo:color: inherited`，同时中心主题是无填充样式。旧 embed renderer 会把该继承色解析成不可见色，导致中心主题看起来没有渲染。

本地修复由 `src/xmind-viewer/theme-loader.ts` 在源码层处理：读取 `content.json` 中的 `theme.centralTopic.properties` 和旧结构 `theme.topicThemeMap.centralTopic.properties`，当中心主题满足继承文字色且无可见填充时，将 `fo:color` 规范化为 `#000000`。`share-embed` 不得重新加入该业务规则。

## 限制和非目标

- 本目录是第三方渲染快照，不重写 XMind 渲染引擎。
- 修复目标是本地 `open-file` 的中心主题不可见问题，不保证完全复刻最新版 XMind App 的所有布局与主题细节。
- 更新远程快照时必须重新验证 `__XMIND_ASSET_BASE__`、`__XMIND_ASSET_MAP__` 和中心主题兼容修复是否仍然存在。
- 更新 `73350` 远程快照时，先用 `pnpm split:xmind-chunk` 重新生成 parts，再用 `pnpm check:xmind-chunk` 和 `pnpm check:local-viewer` 验证。
- 原始远程 HTML 与未被本地入口加载的 XMind 站点基础脚本不保留在仓库中，避免带入无关第三方公开应用标识。
