# 本地 Viewer 检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是本地 viewer 的静态回归检查。当前检查重点已经从“旧 XMind bundle 修复是否存在”切换为“正式主路径是否只依赖源码版 viewer”。

## 检查内容

- `resource-manifest.ts` 必须只声明 `native-viewer-app.ts?appbundle`，不得重新引用 `src/xmind-viewer-assets/`。
- Rollup 必须支持 `?appbundle`，把源码 iframe app 打成 IIFE 字符串。
- debug server 必须通过 `/debug-runtime/xmind-native-viewer.html` 和 `/debug-runtime/xmind-native-viewer.js` 使用同一份 `native-viewer-app.ts`。
- 源码 iframe app 必须实现 `setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet` 和 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 协议。
- `.xmind` 解析必须由 `xmind-document.ts` 和 `jszip` 完成，中心主题兼容修复继续在 `theme-loader.ts`。
- SVG 布局和渲染必须由 `renderer/layout.ts`、`renderer/svg-renderer.ts` 承担。
- Obsidian 视图必须只导入 `src/xmind-viewer/` 稳定入口，不得直接依赖 assets 目录。
- `src/xmind-viewer-assets/` 中的旧 `share-embed`、`73350` parts、`snowbrush.js` 只允许作为兼容参考保留，不得重新接入正式主路径。

## 限制

该脚本是静态检查，不替代浏览器视觉回归。涉及布局、缩放、sheet 切换和真实文件渲染时，仍需运行 `pnpm debug:xmind` 并在浏览器中确认事件和画面。
