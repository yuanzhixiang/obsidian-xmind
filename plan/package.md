# Package 配置

## 功能定位

`package.json` 定义项目的 pnpm 包管理、开发命令、构建命令、发布命令、作者信息、描述文案和依赖清单。

## 元数据口径

- `author` 使用 `yuanzhixiang`，与 `manifest.json` 的插件展示作者保持一致。
- `name` 使用 `xmind-maps`，与官方提交使用的 `manifest.json` 插件 id 对齐。
- `description` 使用英文短句 `View local XMind files.`，与 `manifest.json` 保持一致。
- 版本号必须与 `manifest.json` 保持一致，由 `pnpm deploy:prod` 自动递增 patch 版本。

## 命令口径

- `pnpm dev`：启动 Rollup watch 和 Obsidian 测试 vault。
- `pnpm build`：生成生产 `dist/`。
- `pnpm lint`：检查 `src/` TypeScript 源码。
- `pnpm format:viewer-assets`：格式化本地 XMind viewer 的全部 `javascripts/*.js`、`73350` 模块 parts、Snowbrush、iframe 入口、调试入口和 viewer 检查脚本。
- `pnpm split:xmind-chunk <source>`：把新的 `73350.03dd088904.js` 单体源码拆成 parts，用于更新本地 viewer 快照；如果单体临时放回默认源码路径，可以省略 `<source>`。
- `pnpm check:xmind-chunk`：拼接并检查 `73350` parts，确认运行时 chunk 语义、模块数量、jQuery 委托和中心主题修复信号仍然存在。
- `pnpm check:local-viewer`：检查本地 viewer 快照中关键资源路径和中心主题修复是否存在。
- `pnpm debug:xmind`：启动本地 XMind 调试查看器。
- `pnpm package`：构建并生成发布 zip。
- `pnpm release`：当前等同于 `pnpm package`。
- `pnpm deploy:prod`：生产发布命令，要求工作区干净，然后依次运行本地 viewer 回归检查、源码 lint、patch 版本号递增、发布 zip 打包、提交版本变更、创建同名 tag，并推送分支与 tag。

## 依赖约束

- 项目使用 pnpm，不再维护 yarn 配置或 yarn lock。
- 插件运行时不依赖 `xmind-embed-viewer` npm 包，viewer 源码入口来自 `src/xmind-viewer/`，XMind 兼容资产来自 `src/xmind-viewer-assets/`，并在构建时内联进 `main.js`。
- `73350` Snowbrush chunk 的 xmldom 兼容桥接使用 `@xmldom/xmldom@0.8.10`，用于保留旧 XMind 文件 XML 解析链路需要的 `DOMParser`、`XMLSerializer` 和 `DOMImplementation` API，同时避免继续维护 chunk 内嵌 xmldom/SAX 源码。该版本保留旧 bundle 仍在使用的 `new DOMParser({ errorHandler })` 参数形态；后续还原 XML manifest/content 解析源码时，应迁移到新版 `onError` API，并把该 bridge 替换为普通源码 import。
- 本地 viewer 的通用三方 JS 通过 `dependencies` 安装并打包：`jquery@3.2.1`、`js-cookie@2.2.0`、`popper.js@1.12.9`、`bootstrap@4.0.0-beta.2`、`vue@2.7.14`。
- `.xmind` zip 预处理和 `share-embed` JSZip 兼容桥接使用 `jszip@3.10.1`，用于在源码层读取和重写 `content.json` 的内存副本，并避免继续维护 bundle 内嵌 JSZip 源码。
- `share-embed` 的 localForage 兼容桥接使用 `localforage@1.9.0`，用于保留历史共享文件缓存 API，同时避免继续维护 bundle 内嵌 localForage 源码。
- `share-embed` 的 Lodash 兼容桥接使用 `lodash@4.17.21`，用于保留历史工具函数 API，同时避免继续维护 bundle 内嵌 Lodash 源码。
- `share-embed` 的 anime.js 兼容桥接使用 `animejs@3.2.1`，用于保留历史动画 API，同时避免继续维护 bundle 内嵌 anime.js 源码。
- `share-embed` 的 axios 兼容桥接使用 `axios@0.18.1`，用于匹配历史 bundle 的旧 API 形态并避免继续维护 bundle 内嵌 axios 源码。该版本上游已废弃，仅作为本地 iframe 兼容层存在；后续源码重建时应替换为项目自有的小型请求层或经验证的新版请求依赖。
- `share-embed` 的 Vue 样式注入兼容桥接使用 `vue-style-loader@4.1.3` 的 `lib/addStylesClient.js`，用于保留历史 Vue 组件运行时注入 scoped CSS 的 `addStylesClient(parentId, list, isProduction, options)` API，同时避免继续维护 bundle 内嵌 vue-style-loader 源码。构建和调试 runtime 会保存 `window.__xmindPackageVueStyleLoader`。
- `73350` Snowbrush chunk 的 CommonMark 兼容桥接使用 `commonmark@0.30.0`，用于保留旧 Markdown 备注/富文本解析链路需要的 `Parser`、`HtmlRenderer`、`XmlRenderer` 和 `Node` API，同时避免继续维护 chunk 内嵌 commonmark 源码。该版本保留旧 renderer 依赖的 `safe` 选项行为；后续还原 Markdown 渲染源码时，应把 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 HTML/XML entity 兼容桥接使用 `entities@2.0.3`，用于保留旧 HTML decode、strict decode、XML decode、HTML/XML encode 和 escape 行为，同时避免继续维护 chunk 内嵌 HTML5 entity 表、legacy entity 表、XML entity 表、decode 正则和 `fromCodePoint` helper。该 package 使用 JSON map 文件，构建和调试 runtime loader 必须支持 `.json` 相对依赖；后续还原富文本/XML 解析源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 MathJax 兼容桥接使用 `mathjax-full@3.1.2` 的 `es5/tex-svg.js`，用于保留旧数学公式 TeX 转 SVG 所需的 `window.MathJax.texReset()` 和 `window.MathJax.tex2svg()` API，同时避免继续维护 chunk 内嵌 MathJax 3.1.2 browser bundle。该 bridge 只做运行时存在性校验；后续还原数学公式渲染源码时，应改为显式调用源码层公式渲染模块。
- `73350` Snowbrush nested module `45` 的 process 兼容桥接使用 `process@0.11.10` 的 `process/browser` 入口，用于保留旧 browserify `process.nextTick`、`env`、`cwd()`、`chdir()` 和事件空方法 API，同时避免继续维护 chunk 内嵌 process shim 源码。运行时会保存 `window.__xmindPackageProcess` 并同步设置 `window.process`。
- `73350` Snowbrush nested module `102` 的 FileSaver 兼容桥接使用 `file-saver@1.3.8`，用于保留旧导出/下载链路对 `saveAs(blob, filename)` 的依赖，同时避免继续维护 chunk 内嵌 FileSaver.js 源码。运行时会保存 `window.__xmindPackageFileSaver`；后续还原导出功能源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 util/inherits 兼容桥接使用 `util@0.10.4` 和 `inherits@2.0.4`，用于保留历史 browserify Node util API 与继承 helper，同时避免继续维护 chunk 内嵌 util.inspect、debuglog、inherits 和 isBuffer 源码。`runtime.cjs` 必须使用 `util/` 指向 npm 包入口，不能写成 `util`，否则 Node 构建环境会解析到内置模块。
- `73350` Snowbrush chunk 的 path 兼容桥接使用 `path-browserify@1.0.1`，用于保留旧 renderer 对 POSIX path `resolve`、`normalize`、`join`、`relative`、`dirname`、`basename`、`extname`、`format` 和 `parse` API 的依赖，同时避免继续维护 chunk 内嵌 browserify path 源码。当前 iframe 的 `process.platform` 是 `browser`，实际运行分支为 POSIX path；后续还原依赖 path 的文件解析/资源路径源码时，应替换为普通源码 import。
- `73350` Snowbrush chunk 的点集几何处理兼容桥接使用 `points@3.2.0`，并显式引入其 arc 曲线转换依赖 `svg-arc-to-cubic-bezier@3.2.0`，用于保留图形点集的 `add`、`boundingBox`、`cubify`、`length`、`moveIndex`、`offset`、`position`、`remove`、`reverse`、`rotate` 和 `scale` API，同时避免继续维护 chunk 内嵌 points 源码。后续还原图形路径处理源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 SVG path 采样兼容桥接使用 `points-on-path@0.2.1`，用于保留旧 renderer 对 `pointsOnPath(path, tolerance, distance)` 的依赖，同时避免继续维护 chunk 内嵌 path parser、曲线离散和路径简化源码。该包入口是 ESM，构建和调试 runtime 必须用 Rollup 打成 iframe 可执行的 IIFE 全局 `window.__xmindPackagePointsOnPath`。
- `73350` Snowbrush chunk 的 SVG path 解析兼容桥接使用 `svg-pathdata@6.0.3`，用于保留主题边界、图形路径和 SVG path 边界计算依赖的 `SVGPathData`、`SVGPathDataParser`、`SVGPathDataTransformer`、`COMMAND_ARG_COUNTS` 和 `encodeSVGPath` API，同时避免继续维护 chunk 内嵌 SVG path parser 源码。后续还原路径处理源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 SVG shape/path 点集转换兼容桥接使用 `svg-points@6.0.1`，用于保留 SVG `circle`、`ellipse`、`line`、`path`、`polygon`、`polyline`、`rect` 和 `g` 与点集/path 字符串之间的转换，以及 `valid()` 校验 API，同时避免继续维护 chunk 内嵌 svg-points 源码。后续还原图形路径处理源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 Buffer 兼容桥接使用 `buffer@5.7.1`、`base64-js@1.5.1` 和 `ieee754@1.2.1`，用于保留二进制 plist、MathJax 和 XMind 文件解析链路里的浏览器 Buffer API，同时避免继续维护 chunk 内嵌 Buffer/base64/IEEE754 源码。运行时清单必须使用 `buffer/` 指向 npm 包入口，不能写成 `buffer`，否则 Node 解析会命中内置模块而不是 package 依赖。
- `73350` Snowbrush chunk 的 Backbone 兼容桥接使用 `backbone@1.4.1`，用于保留 Snowbrush 对 Backbone Events/View/Model 的依赖，同时避免继续维护 chunk 内嵌 Backbone 源码。
- `73350` Snowbrush chunk 的 Underscore 兼容桥接使用 `underscore@1.13.6`，用于保留 Snowbrush 对 Underscore 工具函数的依赖，同时避免继续维护 chunk 内嵌 Underscore 源码。运行时会先保存 `window.__xmindPackageUnderscore`，随后 Lodash 仍覆盖 `window._` 供 `share-embed` 使用。`70251` bridge 必须保持 webpack ES module namespace 形状，兼容默认导入和命名方法导入。
- `73350` Snowbrush chunk 的 MobX 兼容桥接使用 `mobx@6.13.7`，用于保留 Snowbrush view/model 层的 observable、reaction 和 makeObservable API，同时避免继续维护 chunk 内嵌 MobX 源码。运行时会保存 `window.__xmindPackageMobX`，`22625` bridge 必须保持 webpack ES module namespace 形状。后续还原 Snowbrush view/model 源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 CryptoJS 兼容桥接使用 `crypto-js@4.2.0`，用于保留 `.xmind` 加密文件解析需要的 AES、PBKDF2、SHA512、CTRGladman、WordArray 等 API，同时避免继续维护 chunk 内嵌 CryptoJS 源码。运行时会保存 `window.__xmindPackageCryptoJS`，`4241` 和相关 CryptoJS 子 module id 只保留短 bridge。后续还原加密解析源码时，应把该 bridge 替换为普通源码 import。
- `73350` Snowbrush chunk 的 Hammer.js 兼容桥接使用 `hammerjs@2.0.7`，用于保留触摸/手势事件识别 API，同时避免继续维护 chunk 内嵌 Hammer.js 源码。运行时会保存 `window.__xmindPackageHammer`，`73350` 只读取该稳定全局，避免被 `snowbrush.js` 的历史兼容代码覆盖。
- `share-embed`、动态 chunk、`snowbrush.js`、图片、动画和 XMind 样式仍来自本地快照，因为这些属于 XMind 渲染资产或本地修复代码，不能替换为官方 `xmind-embed-viewer` wrapper。
- Obsidian 安装产物必须只依赖 `main.js`、`manifest.json`、`styles.css` 三个标准文件。

## 发布约束

发布前至少运行 `pnpm deploy:prod`。该命令会覆盖本地 viewer 回归检查、源码 lint、patch 版本号递增、生产构建、zip 打包、版本提交和 tag 推送。zip 产物写入 `release/`，不提交到源码仓库。GitHub Release 由远端 tag push 触发的 workflow 创建。

## README 维护口径

- `README.md` 是英文主 README。
- `README.zh-CN.md` 是中文 README。
- 两份 README 使用 `XMind Maps` 作为项目展示名称。
- 两份 README 的功能说明使用简洁单句：在 Obsidian vault 中直接打开 `.xmind` 文件，以只读模式查看脑图，支持缩放、适配画布和查看控件。
- 两份 README 不维护安装、限制、使用、开发和发布章节。
