# 渲染适配器

## 组件职责

`render-adapter.ts` 是本地 XMind viewer 的直接源码渲染门面。它接收 Obsidian 文件视图提供的容器和 `.xmind` ArrayBuffer，解析文档、挂载 DOM、渲染 SVG、维护 sheet/zoom 状态，并暴露稳定 viewer API。

## 输入输出

- 输入：挂载容器、预处理后的 `.xmind` ArrayBuffer、错误回调和状态变化回调。
- 输出：`destroy()`、`getState()`、`subscribeState()`、`getSheets()`、`getActiveSheetId()`、`getZoom()`、`fitMap()`、`zoom()`、`switchSheet()`。
- 子节点展开状态和手动收起状态都是 viewer 会话内存态，按 sheet id 保存，不暴露为写文件 API，不修改源 `.xmind`。重新打开文件时清空本次会话状态，切换 sheet 后再切回来时保留该 sheet 的展开/收起状态。
- 画布维护 `zoomScale` 与 `panOffsetX/Y`。默认适配画布时平移归零；用户双指滑动、pinch、`Command + wheel`、右键拖拽、按钮缩放或展开/收起 topic 后进入手动视图。
- 展开/收起 topic 时允许重新计算节点布局，但不得重新执行适配缩放。渲染前记录当前画布中心对应的脑图坐标，渲染后用原 `zoomScale` 和新布局恢复该视口锚点，避免画面比例跳变。

## 手势交互

- macOS 触摸板双指滑动产生普通 `wheel` 事件时，画布拦截默认滚动，把 `deltaX/deltaY` 转成 SVG group 平移，支持左右和上下移动脑图。
- macOS 触摸板 pinch 在 Chromium/Electron 中表现为 `ctrlKey + wheel`，画布按焦点位置缩放，使手势中心下的脑图内容尽量保持在原屏幕位置。缩放灵敏度偏轻，避免双指放大缩小时阻力过大。
- macOS `Command + wheel` 也按焦点位置缩放，和 pinch 共用同一套 `setZoomAt()` 逻辑，避免触发外层页面缩放。
- 鼠标右键按住拖拽时，画布使用 pointer capture 记录指针位移并更新 `panOffsetX/Y`；拖拽期间阻止默认右键菜单，松开或取消 pointer 后结束拖拽。
- `deltaMode` 为 line 或 page 时会换算成像素，避免不同输入设备速度差距过大。
- 工具栏 `+/-` 继续调用 `zoom()`，缩放中心为画布中心；`适配` 调用 `fitMap()` 并重新居中。

## 组合关系

- `xmind-document.ts` 负责解析 `.xmind`。
- `renderer/svg-renderer.ts` 负责 SVG 绘制和 transform。
- `viewer-state.ts` 负责事件到状态的投影。
- `file-loader.ts` 在进入本模块前完成 `.xmind` 内存副本预处理。
- 样式全部来自根目录 `styles.css`，本模块不创建 `<style>`，不写 `innerHTML`，不设置 `element.style`。

## 维护规则

- 不恢复 iframe、MessageChannel 或 Blob HTML。
- 新增用户可见 viewer 行为时，优先在本模块或更下层源码模块建立清晰职责，不新增无意义 wrapper。
- 错误态必须使用 DOM API 和文本节点渲染，避免官方扫描器报 unsafe DOM assignment。
- 展开或折叠 topic 后重新渲染当前 sheet，但保留用户当前缩放比例和视口锚点，不自动调用 `fitMapSync()`。
- 点击当前可见子主题的减号时，把 topic id 写入 `collapsedTopicIdsBySheet` 并从 `expandedTopicIdsBySheet` 移除；点击数字或省略号时执行相反操作。
- wheel 监听必须注册在 `.xmind-native-canvas`，使用 `{ passive: false }` 才能阻止外层页面滚动、页面缩放或系统横向导航抢走手势。
- pointer 和 contextmenu 监听必须注册在 `.xmind-native-canvas`，右键拖拽只改变 pan offset，不重新布局、不调用适配画布。
