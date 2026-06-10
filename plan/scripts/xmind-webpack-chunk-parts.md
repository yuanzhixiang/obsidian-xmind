# XMind Webpack Chunk Parts 脚本

## 功能定位

`scripts/xmind-webpack-chunk-parts.mjs` 负责维护 `73350` Snowbrush webpack chunk 的源码层拆分。它把单体 `73350.03dd088904.js` 拆成 parts，并在构建、调试和检查时拼回同一个 JSONP chunk。

## 命令口径

- `pnpm split:xmind-chunk <source>`：读取新的单体 `73350.03dd088904.js`，重新生成 `73350.03dd088904.parts/`；如果单体临时放回默认源码路径，也可以不传 `<source>`。
- `pnpm check:xmind-chunk`：拼接 parts 并检查 chunk wrapper、模块数量、关键模块、jQuery 委托和中心主题修复信号。
- `node scripts/xmind-webpack-chunk-parts.mjs assemble`：把 parts 拼到 stdout，供临时排查使用。

## 关键规则

- 拆分只改变源码维护形态，不改变运行时加载形态。
- 运行时仍必须暴露为 `javascripts/73350.03dd088904.js` 单个 webpack JSONP chunk。
- 不允许把 `73350` 运行时拆成多个 script，也不允许改写 webpack JSONP loader。
- `73350` 顶层模块和内部 Snowbrush bundle 模块顺序必须由 `manifest.json` 固定。
- 更新 XMind 快照后，必须重新运行拆分和检查，确认单体源码文件不再提交。
