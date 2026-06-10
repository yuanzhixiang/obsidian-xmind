# DEBUG REPORT：XMind 本地 viewer 中心主题不可见

## Symptom

使用下载的 `https://www.xmind.app/embed-viewer` 本地快照打开 `/Users/yuanzhixiang/Desktop/202606101441 搞到钱再说.xmind` 时，侧边主题可见，但中心主题“搞到钱再说”不可见。

## Root cause

该 XMind 26 文件的中心主题样式位于 `content.json` 的 `theme.centralTopic.properties`，其中 `fo:color` 为 `inherited`，且 `fill-pattern` 为 `none`。旧 embed viewer 的本地 `open-file` 渲染路径没有走新版布局兼容分支，会把中心主题继承文字色解析成不可见色。

第一次修复只读取了旧结构 `theme.topicThemeMap.centralTopic.properties`，没有覆盖该文件实际使用的 `theme.centralTopic.properties`，因此刷新后仍不可见。

## Fix

- 在本地下载的 `share-embed.2d8410315a.js` 中新增 `xmindNormalizeLocalOpenFile`。
- 本地 `open-file` 前使用 bundle 内置 JSZip 读取 `content.json`。
- 同时识别 `theme.centralTopic.properties` 和 `theme.topicThemeMap.centralTopic.properties`。
- 当中心主题文字色为 `inherited` 且无可见填充时，将 `fo:color` 规范化为 `#000000`。
- 将动态 chunk public path 改为读取 `window.__XMIND_ASSET_BASE__`，由本地 iframe 入口指向镜像目录。

## Evidence

- `pnpm lint` 通过。
- `pnpm package` 通过，并生成 `release/xmind-viewer-0.1.0.zip`。
- 本地调试页 `http://127.0.0.1:4173/` 使用同一 XMind 文件触发 `map-ready true`。
- 修复后截图可见中心主题“搞到钱再说”。

## Regression test

新增 `pnpm check:local-viewer` 静态检查，防止本地资源路径和中心主题修复代码被误删。视觉回归仍由本地调试页覆盖：`pnpm debug:xmind` 打开目标 XMind 文件，确认事件日志出现 `map-ready true` 且截图中中心主题可见。后续如果引入自动浏览器测试，应断言该文件渲染截图中中心主题文本可见。

## Related

正式插件已从 `xmind-embed-viewer` npm 包的远程 iframe 方案切换为本地 iframe adapter，构建时复制 `vendor/xmind-embed-viewer-remote`。

## Status

DONE
