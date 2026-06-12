# SVG 渲染器

## 组件职责

`svg-renderer.ts` 将 `layout.ts` 生成的布局模型渲染成 SVG。它负责节点、文本、连接线、背景和整体 transform，不直接解析 `.xmind` zip 文件。

## 渲染行为

- topic 填充、边框、文字、字号、字重、字体和连接线来自布局 topic 上的 resolved style。
- 常见 Xmind topic shape 已按 SVG 几何输出：`roundedRect`、`rect`、`ellipserect`、`circle`/`ellipse`、`diamond`、`hexagon`、`underline`、`doubleunderline`。
- 未覆盖的 Xmind topic shape 暂时使用圆角矩形兜底，后续按 fixture 和官方 app 样本继续补齐。
- SVG 背景使用 `style-resolver.ts` 从 Xmind `theme.map.properties.svg:fill` 读取。
- 分支颜色优先读取 Xmind `theme.map.properties.color-list` / `multi-line-colors`，不再只使用 renderer 内硬编码颜色。
- 根主题、一级主题、二级主题和更深层主题分别读取 `centralTopic`、`mainTopic`、`subTopic`、`level3` 的基础样式。
- floating topic 作为独立 topic group 渲染，不从根主题画主分支连接线；它自身的 attached 子树继续渲染普通父子连接线。
- callout topic 作为父 topic 的附属 group 渲染，并通过 `.xmind-callout-connector` 连接父 topic 与 callout topic。callout 自身如果有 attached 子主题，继续走普通子分支连接线。
- renderer 会为当前可见 topic 建立 id 索引，索引范围包含主树、floating topic 和 callout topic。relationship 只在两个端点都可见时渲染；端点处于折叠隐藏子树内时先跳过，避免画到不可见对象。
- renderer 接收 `searchMatchTopicIds` 和 `currentSearchTopicId`，只负责给对应 topic group 增加 `.is-search-match` 和 `.is-current-search-match` class。搜索文本、匹配顺序和跳转状态由 adapter 维护。
- relationship 优先读取文件里的 `controlPoints` 并按控制点绘制；一个控制点使用二次贝塞尔，两个控制点使用三次贝塞尔，更多控制点先保留为首段贝塞尔加折线的保守路径。缺失控制点时继续使用自动三次贝塞尔连接两个 topic 边缘。
- relationship 没有 `controlPoints` 时读取 `shapeClass` 做基础路径分派：`straight`/`line` 使用直线，`angle`/`elbow`/`fold`/`polyline`/`orthogonal` 使用折线，其它默认使用曲线。后续发现 Xmind 内部更精确的 shape class 名称时继续扩展映射。
- relationship 读取对象或 theme 的 `line-color`、`line-width`、`line-pattern` 和箭头字段。非 `none` 的箭头字段会生成 SVG marker。
- relationship 读取 `relationship.title` 并在关系线中点附近绘制白底、关系线颜色描边的小标题标签。标题标签不接收点击，当前阶段 relationship 对象本身还没有独立选中态。
- boundary 当前按对应 topic 的可见子树外接范围绘制，读取对象或 theme 的填充、线色、线宽、虚线和 `shapeClass` 字段。基础几何已覆盖直角/圆角矩形、圆形/椭圆、菱形、六边形和云形；未知 boundary shape 暂时回落到圆角矩形。
- summary 按对象 `range` 覆盖的可见子节点外侧绘制括号线，读取对象或 theme 的线色、线宽和虚线字段。括号线几何参考 `/Users/yuanzhixiang/Desktop/xmind-viewer-assets` 原版 `SUMMARYCONNECTION.CURLY`：使用 `startPos` / `middlePos` / `endPos` 三点模型、`TOSUMMARY = 10`、`PADDING = 20` 和 `0.3` 的 edge offset，通过二次贝塞尔 `Q` 与短 `L` 闭合段生成 path；不得退回手写的三次贝塞尔 `C` 大括号。summary 的标题优先读取对象自身 `title`；如果对象只有 `topicId`，renderer 会在当前 topic 的 `children.summary` 子树中查找对应 summary topic 标题，并在括号中点外侧绘制白底圆角标题胶囊，视觉上对齐 XMind 的 Summary 标签。
- topic marker 使用 `markerIds` 渲染为节点内部的小型 SVG 标记。当前覆盖 priority、task/progress 和通用 marker 的基础可见形态，不复制 Xmind 官方图标资源。
- topic `numberingText` 渲染为节点内部的小型编号胶囊，并与 marker、链接、备注共用顶部元数据行。编号来自解析层规范化后的只读展示字段，后续只补齐只读展示规则。
- topic `taskInfo` 渲染为节点内部的小型任务胶囊，显示进度、优先级、负责人或日期的紧凑文本；`title` 保留完整文本。当前是只读展示，不修改 `.xmind` 文件中的任务字段。
- topic 附件、公式和音频备注分别渲染为节点内部的小型图标，并通过 `data-attachment-count`、`data-equation`、`data-audio` 和 SVG `<title>` 暴露摘要信息。当前不打开附件预览、公式编辑器或音频播放器。
- topic label 使用 `labelTexts` 渲染为节点内部浅色 pill，并跟随布局层预留的 label 行显示。
- topic `href` 渲染为节点内部链接图标。安全链接使用 SVG `<a>` 并在点击时由浏览器/Obsidian 打开；`javascript:`、`data:`、`vbscript:` 等不安全 scheme 只显示禁用图标，不生成可点击链接。
- topic `noteText` 渲染为节点内部备注图标，并用 SVG `<title>` 暴露备注文本。当前不打开完整 note 查看器。
- topic image 使用布局层的 `image` 字段渲染为 SVG `<image>`。图片 data URL 来自 `.xmind` zip 内资源，不发起网络请求；当前只做基础等比显示，裁剪和圆角后续按只读展示补齐。
- topic 选中状态由 `renderNativeMindMap()` 的 `selectedTopicId` 输入决定。选中 topic 会带 `.is-selected`、`aria-pressed="true"` 和 `.xmind-topic-selection` 外框；普通 topic 带 `role="button"`、`tabindex="0"`，点击或键盘 `Enter`/`Space` 触发 `onSelectTopic()`。renderer 只发出选择事件，不修改 topic 树。
- renderer 接收 `locale` 并传给 layout。topic 选择和展开/折叠控件的 `aria-label` 必须使用 `src/i18n.ts`，确保读屏文案跟随 Obsidian/Debug 当前语言。
- renderer 不提供标题编辑、结构编辑、删除、移动或写回快捷键；`Tab` 保持浏览器/Obsidian 默认焦点导航，不创建新 topic。
- 主题存在隐藏子树时，在节点右侧绘制常驻数字圆圈，数值来自布局层的 `hiddenDescendantCount`；隐藏子树可能来自文件保存的 `branch: "folded"`，也可能来自用户本次会话手动收起。
- 数字圆圈使用 `0-999` 直接显示数字；超过三位数时显示 `...`，但 `aria-label` 仍保留真实隐藏数量。
- 已展开 topic 的减号圆圈默认隐藏，只在该 topic group hover、对应父子连接线 hover、focus-within 或控件自身 focus 时显示；点击或键盘 `Enter`/`Space` 会触发 `onToggleTopic()` 收起。
- 父子连接线额外绘制透明宽 stroke 命中区，只用于 hover 命中，不改变可见线条样式；命中区通过父 topic id 显示对应父节点的减号，避免 hover 到其它分支时误触发。事件同时监听 pointer 和 mouse 进入/离开，兼容不同浏览器的 SVG hover 触发路径。
- 手动收起后的 topic 右侧继续按隐藏数量显示常驻控件；`0-999` 显示数字，`> 999` 显示 `...`。点击或键盘触发后重新展开。
- 展开/收起控件贴在节点横向外侧，并用短连接线与节点边缘相连。右向分支显示在右侧，左向分支显示在左侧。
- 父子连接线使用三次贝塞尔曲线，并根据左右方向调整控制点。
- `setTransform()` 根据缩放比例、viewport 尺寸和 render adapter 传入的 `panOffsetX/Y` 显示脑图。适配画布时 offset 为零；触摸板平移或焦点缩放后由 adapter 维护 offset。
- `NativeMindMapView.getTopicBounds(topicId)` 返回当前可见 topic 的节点边界，供 adapter 在搜索跳转、后续定位选中 topic 时按当前 zoom 计算 pan。renderer 只暴露布局坐标，不直接修改视口状态。
- `destroy()` 移除 SVG，供 sheet 切换和视图销毁使用。

## 可访问性

- 展开折叠控件使用 `role="button"`、`tabindex="0"` 和 `aria-label`。
- topic 自身也可键盘聚焦和选择，选择态仅用于当前 viewer UI。
- 控件点击区域只覆盖数量/减号徽标，不把整个 topic 节点变成点击目标，避免误触。
- 减号控件虽然默认透明，但仍可通过键盘 Tab 聚焦；聚焦时控件显示并可用 `Enter`/`Space` 触发。

## 后续扩展

剩余 topic shape、relationship 控制点、boundary 范围、图标和其它 XMind 结构应先在文档模型和布局层建立语义，再由本模块渲染，不从旧 bundle 粘贴不明语义代码。
