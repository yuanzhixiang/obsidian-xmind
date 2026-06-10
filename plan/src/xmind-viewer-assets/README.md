# XMind Viewer 源码资产

## 能力定位

该目录保存插件内置 XMind viewer 必需的本地化资产，包括 iframe 入口、修复版 XMind 渲染 bundle、样式、动态 chunk、图片和动画。它是项目源码的一部分，不再作为下载镜像目录维护。正式插件构建会从本目录读取 XMind 专属资源并内联进 `main.js`，通用三方 JS 由 `package.json` 依赖提供。

## 目录结构

- `local/embed-viewer.html` 是调试入口，使用相对路径加载本地镜像资源，并通过 `/debug-runtime/xmind-viewer-runtime.js` 加载 package 依赖打出的三方 runtime。
- `mirror/assets.xmind.net/` 镜像 XMind CDN 资源。
- `mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts/` 是 Snowbrush webpack chunk 的源码层拆分目录，调试和构建时会拼回 `javascripts/73350.03dd088904.js`。

## 关键行为

- `local/embed-viewer.html` 设置 `window.__XMIND_ASSET_BASE__`，让动态 chunk 从本地镜像目录加载。
- `local/embed-viewer.html` 不再直接加载 jQuery、js-cookie、Popper、Bootstrap、Vue 或旧 polyfill 的本地静态文件。
- `src/core/xmind-viewer-assets.ts` 在正式插件中设置 `window.__XMIND_ASSET_MAP__`，让动态 chunk 从内联 Blob URL 加载。
- `73350.03dd088904.parts/` 不改变运行时加载协议；`share-embed` 仍只看到一个 `javascripts/73350.03dd088904.js` chunk。
- `share-embed.2d8410315a.js` 保留原 MessageChannel 协议：`setup-channel`、`open-file`、`fit-map`、`zoom`、`switch-sheet`。
- 本地 `open-file` 分支会先运行 `xmindNormalizeLocalOpenFile`，再把 `.xmind` 二进制交给原渲染器。
- 未被调试入口或正式打包引用的旧站点脚本、下载 meta 和历史截图不保留在仓库中。

## 三方依赖口径

- `javascripts/*.js` 和 `73350.03dd088904.parts/**/*.js` 必须保持 Prettier 格式化，方便审查本地修复和三方依赖边界；`0000-prefix.js` 和 `9999-suffix.js` 以字符串 wrapper 保存 JSONP 外壳文本。
- `73350` Snowbrush chunk 中原先内置的完整 jQuery 已删除，运行时必须通过 package runtime 暴露的 `window.jQuery` 或 `window.$` 获取 jQuery。
- `share-embed` 和 `73350` 中仍保留的 JSZip、pako、core-js、lodash、axios、Backbone 和图形路径处理代码属于 XMind webpack 内部模块链。没有源码级模块映射前，不从 bundle 中拆出，避免破坏 XMind 文件解析、zip 读写、主题处理和图形渲染。
- `73350` 的拆分是源码维护拆分，不是运行时多 script 拆分；不得改写 webpack JSONP loader 或 chunk id 完成语义。

## 中心主题兼容修复

XMind 26 / `layoutEngineVersion: 5` 文件可能把中心主题文字色写成 `fo:color: inherited`，同时中心主题是无填充样式。旧 embed renderer 会把该继承色解析成不可见色，导致中心主题看起来没有渲染。

本地修复在 `content.json` 中识别 `theme.centralTopic.properties` 和旧结构 `theme.topicThemeMap.centralTopic.properties`，当中心主题满足继承文字色且无可见填充时，将 `fo:color` 规范化为 `#000000`。

## 限制和非目标

- 本目录是第三方渲染快照，不重写 XMind 渲染引擎。
- 修复目标是本地 `open-file` 的中心主题不可见问题，不保证完全复刻最新版 XMind App 的所有布局与主题细节。
- 更新远程快照时必须重新验证 `__XMIND_ASSET_BASE__`、`__XMIND_ASSET_MAP__` 和中心主题兼容修复是否仍然存在。
- 更新 `73350` 远程快照时，先用 `pnpm split:xmind-chunk` 重新生成 parts，再用 `pnpm check:xmind-chunk` 和 `pnpm check:local-viewer` 验证。
- 原始远程 HTML 与未被本地入口加载的 XMind 站点基础脚本不保留在仓库中，避免带入无关第三方公开应用标识。
