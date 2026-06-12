# 插件样式

## 功能定位

`styles.css` 是 Obsidian 官方安装器加载的插件样式文件，负责文件视图容器、源码 viewer、SVG 画布、工具控件、sheet 标签和错误态样式。

## 样式口径

- `.xmind-viewer-content` 定义 Obsidian 文件视图容器的 flex、宽高和 overflow。
- `.xmind-markdown-embed-host` 是 Markdown 阅读视图和实时预览中 `![[*.xmind]]` 的内嵌 viewer 宿主。它必须有稳定高度、边框、圆角和 overflow 截断，不能继承文件视图的 `height: 100%`，避免把整篇笔记撑坏或在阅读模式中高度为 0。
- `.xmind-live-preview-embed-host` 是 CodeMirror Live Preview widget 的额外标记类，用于保证编辑态 embed 在编辑器内容宽度内稳定布局。
- `.xmind-markdown-embed-loading` 和 `.xmind-markdown-embed-error` 提供 embed 内加载态与错误态，文案由 TypeScript 通过 i18n 写入，样式只负责居中、颜色和间距。
- `.xmind-native-viewer` 是源码 viewer 根容器。
- `.xmind-native-canvas` 和 `.xmind-native-svg` 承载 SVG 脑图；画布需要阻止外层滚动链和浏览器默认触摸行为，保证双指滑动、pinch、`Command + wheel` 和右键拖拽交给 viewer 处理。
- `.xmind-native-canvas:focus-visible` 提供键盘焦点可见状态。画布本身可聚焦，用于点击空白脑图后接收 `Command+F` / `Ctrl+F` 搜索快捷键。
- `.xmind-native-canvas.is-right-dragging` 显示右键拖拽中的抓取光标，视觉状态只由 class 控制。
- `.xmind-topic`、`.xmind-topic-selection` 和 `.xmind-topic.is-selected` 提供 topic 点击选择与键盘 focus 的基础交互视觉；选中框不吃 pointer 事件，避免影响 topic 内部控件。选择态只服务 viewer UI，不代表文件编辑。
- `.xmind-topic.is-search-match` 和 `.xmind-topic.is-current-search-match` 提供搜索匹配和当前匹配的 SVG topic 高亮。
- 样式文件不得再包含 topic 标题编辑输入框样式；当前插件只做只读查看。
- `.xmind-relationship-title` 只控制 relationship 标题标签不接收 pointer 事件、不进入文本选中；标题标签的几何、颜色和文本内容由 SVG renderer 计算。
- `.xmind-native-toolbar` 提供缩放、适配画布、刷新、搜索和大纲按钮。刷新按钮执行期间使用 disabled 状态表达暂不可重复点击。
- `.xmind-native-search` 是 viewer 内置搜索面板，包含搜索输入、上一个/下一个按钮和结果计数；面板只由 `hidden` 控制显隐。
- `.xmind-native-sheet-tabs` 是底部 sheet 标签容器，支持横向滚动；`.xmind-native-sheet-tab` 是单个 sheet tab，当前 tab 使用 `.is-active` 高亮。
- `.xmind-native-outliner` 是 viewer 内置整页大纲模式，参考 XMind Outliner 页面，不是弹窗或右侧侧栏。`.xmind-native-viewer.has-outliner` 会隐藏 SVG 画布并让大纲占满主画布区域；`.xmind-native-outliner-title` 显示中心主题标题，`.xmind-native-outliner-row` 承载每行 disclosure 与 topic 按钮，`.xmind-native-outliner-disclosure` 显示展开/收起箭头，`.xmind-native-outliner-count` 显示折叠节点隐藏数量，`.xmind-native-outliner-topic` 是大纲条目按钮，选中态使用 `.is-selected`。嵌套 `.xmind-native-outliner-list` 使用伪元素绘制每层独立的竖向虚线，形成 XMind Outliner 的层级 guide line；节点状态由 `.xmind-native-outliner-item.has-children`、`.is-expanded`、`.is-collapsed` 和 `.is-leaf` 控制。toolbar 按钮的 `aria-pressed="true"` 用于显示当前模式开启状态。
- `.xmind-native-error` 显示解析或渲染失败信息。

## 约束

- viewer 样式必须放在 `styles.css`，不得在运行时创建 `<style>`。
- TypeScript 源码不得直接写 `element.style`，需要新增视觉状态时优先增加 CSS class。
- 样式应优先使用 Obsidian CSS 变量，避免破坏主题兼容。
