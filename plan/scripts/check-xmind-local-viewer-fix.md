# 本地 Viewer 检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是本地 viewer 的静态回归检查。当前检查重点是“正式主路径是否只依赖直接源码 viewer、是否保持只读、是否防止官方社区插件扫描会拒绝的 iframe/动态脚本/运行时 style 口径回流”。

## 检查内容

- 正式 viewer 必须由 `render-adapter.ts` 直接解析和渲染 `.xmind`，不得重新依赖 iframe bridge。
- `asset-loader.ts`、`embed-viewer.ts`、`resource-manifest.ts`、`viewer-globals.ts`、`native-viewer-app.ts`、`iframe-bridge.ts`、`sheet-controller.ts`、`zoom-controller.ts` 必须保持删除状态。
- TypeScript 资源声明和 Rollup 不得重新暴露旧 `?bundle`、`?appbundle` 或 `?xmindchunk` 查询。
- 源码 viewer 必须保持只读：不得重新出现 `onSave`、`saveXMindFile()`、`saveEditedFile()`、`exportEditedFile()`、`createBinary()`、`modifyBinary()` 或 debug 保存产物记录。
- 源码 viewer 不得重新暴露 topic、sheet、boundary、summary、callout、relationship、marker、task、label、note、link 或样式编辑 API。
- SVG renderer 不得重新出现 `editingTopicId`、标题编辑 `foreignObject`、`.xmind-topic-title-editor`、`.is-editing`、`F2`/`Tab`/`Delete` 编辑快捷键回调。
- debug viewer 必须只保留只读控件：打开文件、重新加载、适配画布、缩放、sheet 切换和事件日志。不得恢复高级编辑抽屉或任何编辑按钮。
- `.xmind` 解析必须由 `xmind-document.ts` 和 `xmind-zip.ts` 完成，中心主题兼容修复继续在 `theme-loader.ts`；parser 必须保留 `content.json` 与历史 `content.xml` 的入口，不得退回只识别 JSON。
- `package.json` 的运行依赖只保留源码 viewer 实际使用的 `fflate@0.8.3`，不得恢复 JSZip。
- 布局层必须保留 right/clockwise 根结构识别、`branch: "folded"` 文件保存状态、会话内展开/收起覆盖状态和隐藏子树数量计算，不得恢复固定两级展开口径。
- 布局层必须消费 topic `customWidth`，不能把 XMind 中手动调宽的 topic 重新按默认最大宽度换行。
- 渲染层必须保留常驻数字展开控件、`> 999` 隐藏数量的 `...` 控件，以及 topic hover/focus 和连接线 hover 才显示的减号收起控件。
- 连接线 hover 必须通过透明命中区和父 topic id 定位对应减号，不能只依赖 `.xmind-topic:hover`。
- 渲染适配器必须保留画布手势：普通 wheel 用 `panOffsetX/Y` 平移，`ctrlKey + wheel` 和 `Command/metaKey + wheel` 用焦点缩放，右键拖拽用 `panOffsetX/Y` 平移，wheel 监听使用 `{ passive: false }`。
- 展开/收起 topic 必须保留当前 zoom 和视口锚点，不能重新调用适配缩放。
- viewer 必须保留 Outliner 基础路径，且 Outliner 必须是参考 XMind 的整页模式，不得退回弹窗或右侧侧栏。
- viewer 必须保留搜索基础路径，搜索命中折叠子树时必须临时展开祖先路径，让当前结果可见，但不得写回 `.xmind` 的 `branch` 字段。
- Obsidian 视图必须只导入 `src/xmind-viewer/` 稳定入口，不得直接依赖 assets 目录。
- XMind pane menu 必须提供复制路径入口，不得提供会把 `.xmind` 原文件交给 markdown view 的入口，必须隐藏 `Split right` / `Split down`，并在菜单打开时拦截 `Mod+W` 关闭菜单。
- debug viewer 必须复用同一份 `src/xmind-viewer/index.ts` 源码 API，并支持页面内选择其它本地 `.xmind` 文件测试。
- UI 文案必须通过 `src/i18n.ts` 支持英文和简体中文；正式 Obsidian 视图需要检测当前语言并传给 `XMindRenderAdapter`，adapter 需要继续把 locale 传给 SVG renderer 和 layout。
- Obsidian Markdown embed 必须支持 `![[*.xmind]]`：插件入口需要保留 `registerMarkdownPostProcessor()`、`MarkdownRenderChild` 生命周期管理、`metadataCache.getFirstLinkpathDest()` 链接解析、按 vault 内唯一 `.xmind` 文件名兜底匹配、阅读视图原始 `![[*.xmind]]` 段落识别、同一套 `loadLocalXMindFile()` / `XMindRenderAdapter` 渲染，以及 Live Preview 的 `registerEditorExtension()` / `Decoration.replace()` 路径。embed 也必须保持只读，不写回 vault。
- README 必须包含官方要求的安装和使用说明，并明确这是只读 XMind viewer。
- GitHub Release workflow 必须只上传 `main.js`、`manifest.json`、`styles.css`，并为三件套生成 artifact attestations。
- `pnpm inspect:xmind` 和 `plan/fixtures/xmind-parity/README.md` 必须保留，确保 Xmind parity fixture 建设和脱敏审计口径不被删除；根目录 `fixtures/` 不保存内容。
- `xmind-document.ts` 必须保留 Xmind parity 所需的对象模型字段，例如 `childrenByType`、relationships、boundaries、summaries、markerRefs、markerIds、labels、labelTexts、notes、noteText、image、theme、style 和 raw record，避免退回只够渲染标题树的轻量模型。
- `style-resolver.ts` 必须保留 Xmind theme/style 基础解析能力，layout 和 SVG renderer 必须继续消费 resolved style，不得退回 renderer 内部硬编码主题颜色、字号和背景。
- layout 和 SVG renderer 必须保留 floating topic、callout topic、relationship、boundary、summary、marker、numbering、task info、attachment、equation、audio、label、note、image 和常见 XMind topic shape 的基础只读显示路径。

## 限制

该脚本是静态检查，不替代浏览器视觉回归。涉及布局、缩放、sheet 切换和真实文件渲染时，仍需运行 `pnpm debug:xmind` 并在浏览器中确认事件和画面。
