# XMind Viewer 源码层

## 能力定位

`src/xmind-viewer/` 是本地 XMind viewer 的源码化入口。正式 Obsidian 视图直接调用这里的源码模块解析并渲染 `.xmind` 文件，不再生成 iframe、Blob HTML、动态 `<script>` 或运行时 `<style>`。

## 当前模块

- `index.ts`：对外导出稳定 API，供 `src/core/` 使用。
- `render-adapter.ts`：直接挂载 Obsidian 容器，解析文档、渲染 SVG、维护 sheet/zoom 状态和工具控件。
- `xmind-zip.ts`：封装 `.xmind` zip 读写，底层使用 `fflate`，隔离压缩库替换风险。
- `xmind-document.ts`：读取 `.xmind` zip 中的 `content.json`，提取 sheet 与 topic 树。
- `renderer/layout.ts`：把 topic 树转换为源码布局模型，包含 right/clockwise 根结构、XMind 保存的 `branch: "folded"` 状态和隐藏子树数量。
- `renderer/svg-renderer.ts`：把布局模型渲染成 SVG，并提供缩放/居中 transform。
- `viewer-events.ts`：集中维护 viewer event 类型。
- `viewer-state.ts`：把 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 等事件投影成源码层状态。
- `../i18n.ts`：维护用户界面英文/简体中文文案和 Obsidian 语言检测逻辑，本目录通过稳定入口复用，不在各模块散落硬编码 UI 文案。
- `theme-loader.ts`：维护 `content.json` 中 XMind theme 的源码级兼容规则。
- `workbook-model.ts`：从 `content.json` 提取轻量 workbook/sheet 元数据。
- `file-loader.ts`：读取 `.xmind` zip，组合 workbook 元数据提取与 theme 兼容修复。
- `errors.ts`：维护 viewer 错误类型和用户可见错误文案转换。

## 已删除边界

- `src/xmind-viewer-assets/` 已删除，旧 `share-embed`、`73350`、语言 chunk、`snowbrush.js` 不再是主运行路径。
- `asset-loader.ts`、`embed-viewer.ts`、`resource-manifest.ts`、`viewer-globals.ts`、`native-viewer-app.ts`、`iframe-bridge.ts`、`sheet-controller.ts`、`zoom-controller.ts` 已删除。
- 正式代码不得恢复动态脚本注入、运行时 style 注入、iframe MessageChannel 或旧 bundle 兼容层；这会触发 Obsidian 官方社区插件扫描错误。

## 迁移口径

- 三方通用依赖必须通过 `package.json` 和源码 import 引入，不从历史 viewer JS 文件复制维护。
- zip 读写必须通过 `xmind-zip.ts` 进入，不得直接在业务模块重新引入 JSZip 或其它会触发动态脚本/动态代码扫描的压缩库。
- 新增 XMind 语义时，优先扩展 `xmind-document.ts`、`renderer/layout.ts` 或 `renderer/svg-renderer.ts`。
- 新增用户可见状态时，先更新 `viewer-events.ts` 和 `viewer-state.ts`，再由 `render-adapter.ts` 发出事件。

## 验证要求

涉及本目录的改动至少运行 `pnpm check:local-viewer`、`pnpm lint`、`pnpm build`。涉及布局、缩放或真实文件渲染时，还要运行 `pnpm debug:xmind`，确认 `map-ready` 正常、中心主题可见、缩放、适配画布和 sheet 切换可用，浏览器 console 无错误。
