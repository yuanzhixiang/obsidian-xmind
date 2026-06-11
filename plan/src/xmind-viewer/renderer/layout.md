# 脑图布局

## 组件职责

`layout.ts` 将 `XMindDocumentSheet` 的 topic 树转换为源码渲染器使用的 `MindMapLayout`。它负责节点尺寸估算、文本换行、根结构识别、分支分配、可见层级控制、隐藏子树数量计算和整体边界计算。

## 布局规则

- 根主题固定在原点。
- 当根主题结构为 `org.xmind.ui.map.clockwise` 或 `org.xmind.ui.logic.right` 时，一级主题统一排在根主题右侧，并按原始顺序纵向分布。
- 其它结构暂按数量拆分到左侧和右侧。
- 子主题沿父节点方向继续展开。
- 默认紧凑视图显示到二级主题；二级以下子树先折叠为数量控件，由 `hiddenDescendantCount` 给渲染层显示隐藏数量。
- `layoutMindMap()` 接收 `expandedTopicIds` 和 `collapsedTopicIds`。命中 `expandedTopicIds` 的 topic 会显示直接子主题；命中 `collapsedTopicIds` 的 topic 会隐藏直接子主题，但控件显示仍按隐藏数量决定。
- `isExpanded` 表示该 topic 当前直接子主题可见，包括默认紧凑深度内自然可见的分支，不只表示用户显式展开过。
- `hasHiddenChildren`、`toggleControlX`、`toggleControlY` 和 `toggleControlKind` 是给 SVG 渲染器使用的稳定 UI 字段。`toggleControlKind` 可为 `count`、`ellipsis` 或 `collapse`，分别对应数字展开、超过三位数的省略号展开和 hover/focus 减号收起。
- 节点尺寸由标题文本估算，超出最大宽度时按字符换行。
- 子树高度用于避免同层节点重叠。

## 已知修复

- `202606101441 搞到钱再说.xmind` 使用 `org.xmind.ui.map.clockwise` 结构。此前布局层忽略该字段，并把两个一级主题左右均分，导致中心主题与「产品日记」「思维方式」相对位置明显偏离 XMind。当前按右向 clockwise 结构处理，并默认折叠二级以下子树。
- 子节点展开能力参考旧 viewer 的 collapse/extend 口径，但只在源码 viewer 内维护内存态，不写回 `.xmind` 的 `branch` 字段。手动收起的 topic 与默认紧凑隐藏的 topic 都按同一数量规则显示：`0-999` 显示数字，`> 999` 显示 `...`。

## 非目标

该模块不解析 XMind 文件、不读取 DOM、不处理缩放，也不实现 XMind 全部结构算法。结构差异后续按具体文件逐步补齐，不能为了局部截图直接写死坐标。
