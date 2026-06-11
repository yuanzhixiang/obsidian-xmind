# XMind Webpack Chunk Parts 脚本

## 功能定位

`scripts/xmind-webpack-chunk-parts.mjs` 负责维护 `73350` Snowbrush webpack chunk 的源码层拆分。它把单体 `73350.03dd088904.js` 拆成 parts，并在构建、调试和检查时拼回同一个 JSONP chunk。

## 命令口径

- `pnpm split:xmind-chunk <source>`：读取新的单体 `73350.03dd088904.js`，重新生成 `73350.03dd088904.parts/`；如果单体临时放回默认源码路径，也可以不传 `<source>`。
- `pnpm check:xmind-chunk`：拼接 parts 并检查 chunk wrapper、模块数量、关键模块、jQuery/Backbone/Underscore/MobX/CryptoJS/xmldom/CommonMark/entities/MathJax/process/FileSaver.js/util/inherits/path-browserify/points/points-on-path/svg-pathdata/svg-points/Buffer/Hammer.js/anime.js/axios/vue-style-loader 委托、`14224` browser process shim，以及中心主题修复已迁到源码 `theme-loader.ts`；Underscore 必须委托 `window.__xmindPackageUnderscore` 并保持 webpack ES module namespace 形状，MobX 必须委托 `window.__xmindPackageMobX` 并保持 webpack ES module namespace 形状，CryptoJS 必须委托 `window.__xmindPackageCryptoJS` 并保留加密子模块 id 的兼容 bridge，xmldom 必须委托 `window.__xmindPackageXmldom` 并保留 DOMParser/XMLSerializer/DOMImplementation 兼容 bridge，CommonMark 必须委托 `window.__xmindPackageCommonmark` 并保留 Markdown 公共入口 bridge，entities 必须委托 `window.__xmindPackageEntities` 并移除旧 entity map 与 code point helper，MathJax 必须委托 `window.__xmindPackageMathJax` 并移除旧 TeX/SVG browser bundle，process shim 必须委托 `window.__xmindPackageProcess` 并移除旧 nested module `45` 源码，FileSaver.js 必须委托 `window.__xmindPackageFileSaver` 并移除旧 nested module `102` 源码，util/inherits 必须委托 `window.__xmindPackageUtil` 和 `window.__xmindPackageInherits`，path-browserify 必须委托 `window.__xmindPackagePath`，points 必须委托 `window.__xmindPackagePoints` 并保持点集几何命名导出形状，points-on-path 必须委托 `window.__xmindPackagePointsOnPath` 并保持 `pointsOnPath` 命名导出形状，svg-pathdata 必须委托 `window.__xmindPackageSvgPathData` 并保持命名导出形状，svg-points 必须委托 `window.__xmindPackageSvgPoints` 并保持 `toPath`、`toPoints`、`valid` 命名导出形状，Buffer stack 必须委托 `window.__xmindPackageBuffer`、`window.__xmindPackageBase64Js`、`window.__xmindPackageIeee754`，Hammer.js 必须委托 `window.__xmindPackageHammer`，vue-style-loader 必须委托 `window.__xmindPackageVueStyleLoader`，避免被后续全局覆盖影响。
- `node scripts/xmind-webpack-chunk-parts.mjs assemble`：把 parts 拼到 stdout，供临时排查使用。

## 关键规则

- 拆分只改变源码维护形态，不改变运行时加载形态。
- 运行时仍必须暴露为 `javascripts/73350.03dd088904.js` 单个 webpack JSONP chunk。
- 不允许把 `73350` 运行时拆成多个 script，也不允许改写 webpack JSONP loader。
- `73350` 顶层模块和内部 Snowbrush bundle 模块顺序必须由 `manifest.json` 固定。
- 更新 XMind 快照后，必须重新运行拆分和检查，确认单体源码文件不再提交。
