# 本地 Viewer 检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是本地 viewer 的静态回归检查。当前检查重点已经从“旧 XMind bundle 修复是否存在”切换为“正式主路径是否只依赖源码版 viewer”。

## 检查内容

- `resource-manifest.ts` 必须只声明 `native-viewer-app.ts?appbundle`，不得重新引用旧 viewer assets。
- Rollup 必须支持 `?appbundle`，把源码 iframe app 打成 IIFE 字符串。
- TypeScript 资源声明和 Rollup 不得重新暴露旧 `?bundle` 或 `?xmindchunk` 查询。
- debug server 必须通过 `/debug-runtime/xmind-native-viewer.html` 和 `/debug-runtime/xmind-native-viewer.js` 使用同一份 `native-viewer-app.ts`。
- debug server 不得重新提供 `/debug-runtime/xmind-viewer-runtime.js` 或读取 `runtime.cjs`。
- 源码 iframe app 必须实现 `setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet` 和 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 协议。
- `.xmind` 解析必须由 `xmind-document.ts` 和 `jszip` 完成，中心主题兼容修复继续在 `theme-loader.ts`。
- `package.json` 的运行依赖只保留源码 viewer 实际使用的 `jszip@3.10.1`。
- SVG 布局和渲染必须由 `renderer/layout.ts`、`renderer/svg-renderer.ts` 承担。
- 布局层必须保留 right/clockwise 根结构识别、二级可见层级限制和隐藏子树数量计算。
- 渲染层必须保留二级主题数量徽标，避免再次把大文件的全部 274 个 topic 展开成挤压画面。
- Obsidian 视图必须只导入 `src/xmind-viewer/` 稳定入口，不得直接依赖 assets 目录。
- `src/xmind-viewer-assets/`、`scripts/xmind-webpack-chunk-parts.mjs` 和旧 chunk 维护命令必须保持删除状态。

## 限制

该脚本是静态检查，不替代浏览器视觉回归。涉及布局、缩放、sheet 切换和真实文件渲染时，仍需运行 `pnpm debug:xmind` 并在浏览器中确认事件和画面。
