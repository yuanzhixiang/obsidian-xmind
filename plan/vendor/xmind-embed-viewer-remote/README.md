# XMind Embed Viewer 本地快照

## 能力定位

该目录保存从 `https://www.xmind.app/embed-viewer` 下载并本地化的 iframe 页面、渲染 bundle、样式、动态 chunk 和静态资源。正式插件构建会从本目录读取资源并内联进 `main.js`，运行时不依赖安装目录中存在本目录。

## 目录结构

- `local/embed-viewer.html` 是调试入口，使用相对路径加载本地镜像资源。
- `mirror/assets.xmind.net/` 镜像 XMind CDN 资源。
- `meta/` 保存资源清单、Webpack chunk 映射和下载记录。

## 关键行为

- `local/embed-viewer.html` 设置 `window.__XMIND_ASSET_BASE__`，让动态 chunk 从本地镜像目录加载。
- `src/core/xmind-viewer-assets.ts` 在正式插件中设置 `window.__XMIND_ASSET_MAP__`，让动态 chunk 从内联 Blob URL 加载。
- `share-embed.2d8410315a.js` 保留原 MessageChannel 协议：`setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet`。
- 本地 `open-file` 分支会先运行 `xmindNormalizeLocalOpenFile`，再把 `.xmind` 二进制交给原渲染器。

## 中心主题兼容修复

XMind 26 / `layoutEngineVersion: 5` 文件可能把中心主题文字色写成 `fo:color: inherited`，同时中心主题是无填充样式。旧 embed renderer 会把该继承色解析成不可见色，导致中心主题看起来没有渲染。

本地修复在 `content.json` 中识别 `theme.centralTopic.properties` 和旧结构 `theme.topicThemeMap.centralTopic.properties`，当中心主题满足继承文字色且无可见填充时，将 `fo:color` 规范化为 `#000000`。

## 限制和非目标

- 本目录是第三方渲染快照，不重写 XMind 渲染引擎。
- 修复目标是本地 `open-file` 的中心主题不可见问题，不保证完全复刻最新版 XMind App 的所有布局与主题细节。
- 更新远程快照时必须重新验证 `__XMIND_ASSET_BASE__`、`__XMIND_ASSET_MAP__` 和中心主题兼容修复是否仍然存在。
- 原始远程 HTML 与未被本地入口加载的 XMind 站点基础脚本不保留在仓库中，避免带入无关第三方公开应用标识。
