# Rollup 构建配置

## 功能定位

Rollup 负责把 Obsidian 插件源码打包成 CommonJS 插件入口，并把本地 XMind viewer 快照中的运行时资源内联进 `main.js`。

## 构建口径

- 开发构建输出到 `test-vault/.obsidian/plugins/xmind-maps`。
- 生产构建输出到 `dist/`。
- `obsidian` 和 `electron` 保持 external，不打入插件 bundle。
- TypeScript、Node resolve、CommonJS、JSON 插件用于处理源码依赖。
- `inline-assets` 插件处理 `?raw` 和 `?dataurl` 导入，把 viewer 资源转换为字符串模块。
- 构建开始前必须清理输出目录，避免已删除的旧远程快照文件残留进 `dist/` 或开发插件目录。

## 本地资源交付

- 开发和生产构建只复制 `styles.css`、`manifest.json`，开发构建额外复制 `.hotreload`。
- `vendor/xmind-embed-viewer-remote` 不进入安装产物，避免 Obsidian 安装后缺少额外目录导致白屏。
- 如果新增 viewer 资源或动态 chunk，必须在 `src/core/xmind-viewer-assets.ts` 中显式导入。

## 发布约束

- 生产构建会压缩插件主 bundle。
- 发布资产必须保持 Obsidian 标准三件套可安装：`main.js`、`manifest.json`、`styles.css`。
- `bundle-analysis.html` 仅作为分析产物，不进入发布 zip。
