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

## 校验规则

脚本会在压缩前检查 Obsidian 标准三件套是否存在。缺少任一文件时应直接失败，避免发布不完整插件。

XMind viewer 资源已经内联进 `main.js`，发布 zip 不再包含额外 viewer 资产目录。

## 边界和限制

- 脚本依赖系统 `zip` 命令。
- 脚本只负责本地生成 zip，不负责上传 GitHub Release 或 Obsidian 社区插件发布。
