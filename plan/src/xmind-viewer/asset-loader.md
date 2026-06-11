# Viewer 资产加载器

## 组件职责

`asset-loader.ts` 负责把 `resource-manifest.ts` 声明的本地 viewer 资源转换成 iframe 可访问的 Blob URL 或 Data URL，并提供统一回收能力。

## 资源输入

- 资源清单来自 `resource-manifest.ts`。
- `asset-loader.ts` 不直接维护 `?raw`、`?dataurl`、`?xmindchunk` import，避免资源声明和 URL 生命周期混在一起。

## 关键行为

- `createViewerAssetUrls()` 每次创建一组新的 URL，调用方负责缓存。
- 当前正式 viewer 的 `chunks` 和 `manifests` 允许为空，因为源码版 iframe app 不再依赖旧 webpack chunk loader。
- 如果后续为了兼容层临时恢复 chunk，key 必须保持原始请求路径；但正式主路径不得重新依赖 `share-embed`/`73350`。
- `revokeViewerAssetUrls()` 必须回收文本 Blob URL，避免 Obsidian 长时间运行时泄露大对象。
- `revokeViewerAssetUrls()` 只回收 `blob:` URL，避免误处理 Data URL 或普通 URL。

## 限制

该模块只负责资源交付，不解析 `.xmind`，不实现 MessageChannel，也不修改渲染逻辑。新增资源时必须同步更新 `scripts/check-xmind-local-viewer-fix.mjs`。
