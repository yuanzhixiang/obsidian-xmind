# 渲染适配器

## 组件职责

`render-adapter.ts` 是本地 XMind viewer 的只读源码渲染门面。它接收 Obsidian 文件视图或 Markdown embed 提供的容器和 `.xmind` ArrayBuffer，解析文档、挂载 DOM、渲染 SVG、维护 sheet/zoom/搜索/大纲/展开折叠状态，并暴露稳定 viewer API。

## 输入输出

- 输入：挂载容器、预处理后的 `.xmind` ArrayBuffer、错误回调、状态变化回调和可选 locale。
- 输出：`destroy()`、`getState()`、`subscribeState()`、`getSheets()`、`getActiveSheetId()`、`getZoom()`、`fitMap()`、`zoom()`、`switchSheet()`。
- adapter 不接收 `onSave`，不导出编辑后的文件二进制，不访问 Obsidian vault，也不写回 `.xmind`。
- adapter 不暴露 topic、sheet、boundary、summary、callout、relationship、marker、task、label、note、link 或样式编辑 API。
- `locale` 只用于 UI 文案，不写入 `.xmind`。

## 只读状态

- 子节点展开状态和手动收起状态都是 viewer 会话内存态，按 sheet id 保存，不修改源 `.xmind`。重新打开文件时清空本次会话状态，切换 sheet 后再切回来时保留该 sheet 的展开/收起状态。
- 初始展开/折叠遵循 `.xmind` 文件内 `branch: "folded"`：`collapsedTopicIds` 优先收起，`expandedTopicIds` 优先展开，文件内 folded 默认收起，其它有子节点 topic 默认展开。
- topic 选中状态是 viewer 会话内存态，按 sheet id 保存，不写回 `.xmind`。点击或键盘选择画布 topic 后会更新 `selectedTopicIdBySheet`，并在重绘后的下一帧把 DOM 焦点同步到选中 topic。
- 搜索状态、大纲可见状态、当前搜索匹配、当前 zoom 和 pan 都只存在当前 viewer 会话中。

## 查看交互

- 画布维护 `zoomScale` 与 `panOffsetX/Y`。默认适配画布时平移归零；用户双指滑动、pinch、`Command + wheel`、右键拖拽、按钮缩放或展开/收起 topic 后进入手动视图。
- 展开/收起 topic 时允许重新计算节点布局，但不得重新执行适配缩放。渲染前记录当前画布中心对应的脑图坐标，渲染后用原 `zoomScale` 和新布局恢复该视口锚点，避免画面比例跳变。
- macOS 触摸板双指滑动产生普通 `wheel` 事件时，画布拦截默认滚动，把 `deltaX/deltaY` 转成 SVG group 平移，支持左右和上下移动脑图。
- macOS 触摸板 pinch 在 Chromium/Electron 中表现为 `ctrlKey + wheel`，画布按焦点位置缩放，使手势中心下的脑图内容尽量保持在原屏幕位置。
- macOS `Command + wheel` 也按焦点位置缩放，和 pinch 共用同一套 `setZoomAt()` 逻辑，避免触发外层页面缩放。
- 鼠标右键按住拖拽时，画布使用 pointer capture 记录指针位移并更新 `panOffsetX/Y`；拖拽期间阻止默认右键菜单，松开或取消 pointer 后结束拖拽。
- `deltaMode` 为 line 或 page 时会换算成像素，避免不同输入设备速度差距过大。
- 工具栏 `+/-` 调用 `zoom()`，缩放中心为画布中心；`适配` 调用 `fitMap()` 并重新居中。

## Sheet 与大纲

- 底部 sheet 区域渲染为可横向滚动的 tabs。每个 tab 使用 `.xmind-native-sheet-tab` 和 `data-sheet-id` 标记，点击后调用 `switchSheetSync()`，当前 tab 使用 `.is-active` 与 `aria-current="page"`。
- sheet tabs 点击切换时按 XMind 查看器语义重新适配当前 sheet；每个 sheet 的展开/收起内存态继续按 sheet id 保留。
- toolbar 提供「大纲」切换按钮，按钮使用 `aria-pressed` 表达当前状态。Outliner 是参考 XMind 的整页模式，不是弹窗或右侧侧栏；开启后 viewer 进入 `.has-outliner` 状态，SVG 画布隐藏，大纲占满主画布区域。
- 大纲顶部显示中心主题标题，下面从 root 的一级 topic 开始渲染树。大纲树包含 attached、detached、callout 和其它未知 children bucket。
- 大纲节点复用画布展开判断，并写入 `has-children`、`is-expanded`、`is-collapsed` 或 `is-leaf` class。展开 topic 显示向下 disclosure，收起 topic 显示向右 disclosure 和隐藏子节点数量，`> 999` 显示 `...`；叶子 topic 显示小方块 bullet。
- 点击大纲 disclosure 只改本次查看会话的内存态，不写回 `.xmind`；点击大纲条目会选中并定位对应 topic。如果目标在折叠子树内，会临时展开祖先路径；随后保持当前 zoom，只调整 pan，把目标 topic 带到画布中心附近。

## 搜索

- toolbar 提供「搜索」切换按钮，按钮使用 `aria-pressed` 表达当前状态。
- 搜索面板作为 `.xmind-native-search` 渲染在画布右上角，支持输入关键词、回车跳到下一个、`Shift+Enter` 跳到上一个，以及按钮式上一个/下一个。
- 搜索范围覆盖当前 sheet 内 topic 标题、label、note 和 href。
- 如果命中 topic 位于折叠子树内，adapter 会在本次会话内临时展开其祖先路径，让当前搜索结果真实可见。
- 搜索跳转必须保持当前 zoom，只调整 pan，把当前命中 topic 带到画布中心附近。搜索不会修改源文件里的 `branch` 字段。

## 组合关系

- `xmind-document.ts` 负责解析 `.xmind`。
- `renderer/svg-renderer.ts` 负责 SVG 绘制、topic 选择、展开控件和 transform。
- `viewer-state.ts` 负责事件到状态的投影。
- `file-loader.ts` 在进入本模块前完成 `.xmind` 内存副本预处理。
- 样式全部来自根目录 `styles.css`，本模块不创建 `<style>`，不写 `innerHTML`，不设置 `element.style`。

## 维护规则

- 不恢复 iframe、MessageChannel 或 Blob HTML。
- 不重新引入 topic/sheet 编辑、保存、撤销重做、剪贴板或 `.xmind` 写回 API。
- 新增用户可见 viewer 行为时，优先在本模块或更下层源码模块建立清晰职责，不新增无意义 wrapper。
- 错误态必须使用 DOM API 和文本节点渲染，避免官方扫描器报 unsafe DOM assignment。
- 展开或折叠 topic 后重新渲染当前 sheet，但保留用户当前缩放比例和视口锚点，不自动调用 `fitMapSync()`。
- 点击当前可见子主题的减号时，把 topic id 写入 `collapsedTopicIdsBySheet` 并从 `expandedTopicIdsBySheet` 移除；点击数字或省略号时执行相反操作。
- 点击或键盘 `Enter`/`Space` 选择 topic 时，把 topic id 写入 `selectedTopicIdBySheet`。选择态只用于当前 viewer UI，不代表源文件有任何选中字段变化。
- wheel 监听必须注册在 `.xmind-native-canvas`，使用 `{ passive: false }` 才能阻止外层页面滚动、页面缩放或系统横向导航抢走手势。
- pointer 和 contextmenu 监听必须注册在 `.xmind-native-canvas`，右键拖拽只改变 pan offset，不重新布局、不调用适配画布。
