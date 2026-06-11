# Viewer 资源清单

## 组件职责

`resource-manifest.ts` 集中声明正式插件 iframe 需要打进 `main.js` 的 viewer 资源。当前正式主路径只声明源码版 `native-viewer-app.ts?appbundle`，不再从 `src/xmind-viewer-assets/` 引入历史 `share-embed`、`73350`、语言 chunk、CSS 或图片。

## 资源分类

- `css`：当前为空，源码版 viewer 的基础样式由 `native-viewer-app.ts` 注入。
- `scripts`：只包含 `native-viewer-app.ts?appbundle` 生成的源码 iframe app。
- `manifests`：当前为空，源码版 viewer 不依赖旧 `window.manifests` 资源。
- `chunks`：当前为空，源码版 viewer 不依赖 webpack JSONP 动态 chunk。

## 维护规则

- 新增、删除或替换本地 viewer 资产时，优先修改本文件。
- `asset-loader.ts` 不直接 import `?raw`、`?dataurl` 或 `?xmindchunk` 资源。
- 三方通用 JS 不放进本文件的历史静态资源路径；源码版 viewer 需要的依赖通过 TypeScript import 和 package 依赖进入 app bundle。
- 历史 XMind 专属兼容资产暂时保留在 `src/xmind-viewer-assets/`，但不得再出现在本文件的正式资源清单中。
