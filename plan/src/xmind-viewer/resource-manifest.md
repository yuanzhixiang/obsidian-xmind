# Viewer 资源清单

## 组件职责

`resource-manifest.ts` 集中声明本地 XMind viewer 当前仍需打进插件的资源：CSS、三方 runtime bundle、兼容 JS、动态 chunk、语言 chunk、图片和动画。它只描述资源清单，不负责创建 Blob URL。

## 资源分类

- `css`：Bootstrap 定制样式、Web UI Kit 图标、XMind 页面样式和 share embed 样式。
- `scripts`：package runtime bundle 和修复版 `share-embed`。
- `manifests`：`snowbrush.js`、结构加载动画、分享图标和 XMind logo，对应 iframe 内的 `window.manifests`。
- `chunks`：`73350` Snowbrush JSONP chunk 和英文语言 chunk，key 必须保持 XMind 原始请求路径。

## 维护规则

- 新增、删除或替换本地 viewer 资产时，优先修改本文件。
- `asset-loader.ts` 不直接 import `?raw`、`?dataurl` 或 `?xmindchunk` 资源。
- 三方通用 JS 不放进本文件的历史静态资源路径，必须从 `runtime.cjs?bundle` 和 `package.json` 依赖进入。
- XMind 专属兼容资产暂时仍从 `src/xmind-viewer-assets/` 读取；每迁出一个 bundle 后，应删除对应资源并更新本清单。
