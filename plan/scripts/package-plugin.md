# 插件发布打包脚本

## 功能定位

`scripts/package-plugin.mjs` 用于把 `dist/` 中的生产构建结果打成 Obsidian 插件可分发 zip。

## 输入和输出

- 输入目录：`dist/`。
- 输出目录：`release/`。
- 输出文件名：`{manifest.id}-{manifest.version}.zip`。

## 打包内容

- `main.js`
- `manifest.json`
- `styles.css`
- `xmind-embed-viewer-remote/`

## 校验规则

脚本会在压缩前检查核心文件是否存在，特别是本地 iframe 入口和修复后的 `share-embed` bundle。缺少任一文件时应直接失败，避免发布不完整插件。

## 边界和限制

- 脚本依赖系统 `zip` 命令。
- 脚本只负责本地生成 zip，不负责上传 GitHub Release 或 Obsidian 社区插件发布。
