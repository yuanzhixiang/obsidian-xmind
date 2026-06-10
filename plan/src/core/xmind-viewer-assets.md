# XMind Viewer 内联资源

## 组件职责

该模块把运行本地 XMind viewer 必需的 CSS、JS、动态 chunk、图片和动画资源打包进插件 `main.js`，运行时生成 Blob/Data URL，并返回 iframe 可加载的本地 HTML Blob URL。

## 使用场景

- Obsidian 社区插件、BRAT 或手动安装通常只安装 `main.js`、`manifest.json`、`styles.css`。
- 视图层必须在安装目录只有 Obsidian 标准三件套时正常渲染 `.xmind` 文件。

## 资源输入

- CSS：Bootstrap 定制样式、Web UI Kit icon 样式、XMind 网站基础样式和 share embed 页面样式。
- JS：通过 `xmind-viewer-runtime.cjs?bundle` 打包的 jQuery、js-cookie、Popper、Bootstrap、Vue，以及 `src/xmind-viewer-assets/` 中的修复版 `share-embed`、Snowbrush。
- 动态 chunk：由 `73350.03dd088904.parts/` 在构建时拼回的 Snowbrush chunk，以及英文 `common/share/form/error` i18n chunk。
- 静态资源：XMind logo、分享图标、结构加载动画。

## 关键行为

- 文本资源通过 Blob URL 注入 iframe，二进制小资源通过 Data URL 注入。
- 通用三方 JS 不再从本地静态 JS 文件读取，必须由 `package.json` 依赖打包进 runtime script。
- iframe HTML 设置 `window.__XMIND_ASSET_MAP__`，让修复后的 `share-embed` 动态 chunk loader 从 Blob URL 加载 chunk。
- `73350` 在源码中拆成 parts 只是维护结构，运行时仍通过 `__XMIND_ASSET_MAP__` 暴露为 `javascripts/73350.03dd088904.js` 单个 Blob URL。
- `window.manifests` 中的 Snowbrush、图标和动画资源必须指向本地 Blob/Data URL。
- `getInlineXMindViewerUrl()` 缓存生成后的 HTML Blob URL，避免每个视图重复创建大资源。
- 插件卸载时调用 `revokeInlineXMindViewerAssets()` 回收 Blob URL。

## 边界和限制

- 本模块不改写 XMind 渲染逻辑，只改变资源交付方式。
- 新增 XMind chunk、资源或 runtime 依赖时，必须同步更新本模块、chunk parts manifest 和 `scripts/check-xmind-local-viewer-fix.mjs`。
- Blob URL 不允许追加 query，iframe cache busting 必须在 adapter 层按 URL 类型处理。
