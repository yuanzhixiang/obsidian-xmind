# Rollup 构建配置

## 功能定位

Rollup 负责把 Obsidian 插件源码打包成 CommonJS 插件入口，并复制插件运行所需的样式、manifest 和本地 XMind viewer 快照。

## 构建口径

- 开发构建输出到 `test-vault/.obsidian/plugins/xmind-viewer`。
- 生产构建输出到 `dist/`。
- `obsidian` 和 `electron` 保持 external，不打入插件 bundle。
- TypeScript、Node resolve、CommonJS、JSON 插件用于处理源码依赖。

## 本地资源复制

- 开发和生产构建都必须复制 `vendor/xmind-embed-viewer-remote`。
- 复制后的路径必须保持为 `xmind-embed-viewer-remote/local/embed-viewer.html`，与视图层生成的 iframe URL 对齐。
- 如果新增 viewer 资源或动态 chunk，必须保证该目录整体被复制。

## 发布约束

- 生产构建会压缩插件主 bundle。
- `bundle-analysis.html` 仅作为分析产物，不进入发布 zip。
