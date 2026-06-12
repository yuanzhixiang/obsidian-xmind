# 脑图布局

## 组件职责

`layout.ts` 将 `XMindDocumentSheet` 的 topic 树转换为源码渲染器使用的 `MindMapLayout`。它负责节点尺寸估算、文本换行、根结构识别、分支分配、按文件保存状态计算可见子树、隐藏子树数量计算和整体边界计算。

布局层会通过 `style-resolver.ts` 读取 Xmind theme/style 的基础字号、行高和分支色，避免渲染层按主题绘制但布局仍使用旧硬编码字号。

## 布局规则

- 根主题固定在原点。
- 当根主题结构为 `org.xmind.ui.map.clockwise` 或 `org.xmind.ui.logic.right` 时，一级主题统一排在根主题右侧，并按原始顺序纵向分布。
- 其它结构暂按数量拆分到左侧和右侧。
- 子主题沿父节点方向继续展开。
- `children.attached` 是主分支树的数据来源；`children.detached` 会生成 `floatingTopics`，按 topic 的 `position` 在画布上独立布局，不参与根主题左右分配。
- `children.callout` 会生成父 topic 的 `callouts`，按相对父 topic 的 `position` 放置；缺失 position 时放在父节点外侧的兜底位置。
- 初始展开状态尊重 XMind 文件保存的 `branch` 字段：`branch: "folded"` 的 topic 默认收起，没有该字段的非叶子 topic 默认展开。
- `layoutMindMap()` 接收 `expandedTopicIds` 和 `collapsedTopicIds` 作为本次查看会话的覆盖状态。命中 `collapsedTopicIds` 的 topic 优先收起；命中 `expandedTopicIds` 的 topic 会展开，即使文件里保存为 `branch: "folded"`。
- `layoutMindMap()` 接收可选 `locale`，只用于空标题 topic 的本地化 fallback 文案。布局层不自行检测 Obsidian 语言，语言来源由 adapter/renderer 传入。
- `isExpanded` 表示该 topic 当前直接子主题可见，包括文件默认展开和用户本次会话显式展开。
- `hasHiddenChildren`、`toggleControlX`、`toggleControlY` 和 `toggleControlKind` 是给 SVG 渲染器使用的稳定 UI 字段。`toggleControlKind` 可为 `count`、`ellipsis` 或 `collapse`，分别对应数字展开、超过三位数的省略号展开和 hover/focus 减号收起。
- 节点尺寸由标题文本和 resolved `fontSize` 估算，超出最大宽度时按字符换行。
- 标题换行宽度仍受 `MAX_NODE_WIDTH` 约束；marker、numbering、task、label 和 image 等元数据行如果更宽，会拉宽节点本身，不能被标题最大宽度截断导致内容溢出。
- topic 保存了 `customWidth` 时，布局层使用文件宽度作为节点宽度，并按该宽度重新计算文本可用宽度，避免手动调宽的主题在 viewer 中重新换行。
- topic 带有 `markerIds`、`numberingText`、`taskInfo`、附件、公式、音频、`href`、`noteText` 或 `labelTexts` 时，布局层会为 marker/numbering/task/attachment/equation/audio/link/note 行和 label 行预留高度；编号胶囊、任务胶囊、label 宽度也会参与节点宽度估算，避免标记、编号、任务、附件、公式、音频、链接、备注、标签和标题互相覆盖。
- topic 带有可解析 `image.dataUrl` 时，布局层会在标题下方、标签上方预留图片区域。图片按文件保存的宽高或默认尺寸显示，并限制在节点内部可用宽度内。
- topic 带有 summary 对象时，整体 bounds 会在 summary 所在方向额外预留标题胶囊空间，避免初始适配画布或点击 `适配画布` 时把 Summary 标签贴到视口外。summary 的具体括号 range 和标题绘制仍由 SVG renderer 根据对象字段完成。
- 每个 `MindMapLayoutTopic` 携带 `role` 和 resolved `style`，供 SVG 渲染器区分普通 topic、floating topic 和 callout topic，并复用同一套主题解释。
- floating topic 使用 `theme.floatingTopic`，callout topic 使用 `theme.calloutTopic`。两者的 attached 子节点仍可继续按普通分支树展开。
- 子树高度用于避免同层节点重叠。

## 已知修复

- `202606101441 搞到钱再说.xmind` 使用 `org.xmind.ui.map.clockwise` 结构。此前布局层忽略该字段，并把两个一级主题左右均分，导致中心主题与「产品日记」「思维方式」相对位置明显偏离 XMind。当前按右向 clockwise 结构处理。
- 子节点展开能力参考旧 viewer 的 collapse/extend 口径，但只在源码 viewer 内维护内存态，不写回 `.xmind` 的 `branch` 字段。手动收起的 topic 与文件保存为 `branch: "folded"` 的 topic 都按同一数量规则显示：`0-999` 显示数字，`> 999` 显示 `...`。
- `袁锐钦出海工具站思维导图.xmind` 中多个一级 topic 保存了 `branch: "folded"`。此前布局层固定只显示到二级，导致原版展开/收起状态不一致；当前改为优先读取文件保存状态。
- detached topic 曾经如果混入 `children`，会被当作普通分支节点渲染，位置和主题样式都与 Xmind 不一致。当前 layout 明确输出 `floatingTopics`，并把 callout 作为父 topic 的附属对象输出。

## 非目标

该模块不解析 XMind 文件、不读取 DOM、不处理缩放，也不实现 XMind 全部结构算法。结构差异后续按具体文件逐步补齐，不能为了局部截图直接写死坐标。
