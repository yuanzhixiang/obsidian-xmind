# XMind 样式解析器

## 组件职责

`style-resolver.ts` 把 `content.json` 中的 sheet theme、topic style 和 color theme 字段转换成布局层与 SVG 渲染层可直接使用的 resolved style。

它是 Xmind 像素级一致目标的基础模块：layout 需要用它计算字号、行高和节点尺寸，renderer 需要用它绘制背景、填充、边框、文本和连接线。

## 输入输出

- 输入：`XMindDocumentSheet`、当前 topic、topic depth、branch index，以及 topic role。
- 输出：`XMindResolvedMapStyle` 和 `XMindResolvedTopicStyle`。

当前 resolved 字段包括：

- `backgroundFill`
- `branchColors`
- `branchColor`
- `branchLightColor`
- `fill`
- `borderColor`
- `borderWidth`
- `branchLineColor`
- `branchLineWidth`
- `branchLineDashArray`
- `textFill`
- `fontSize`
- `lineHeight`
- `fontWeight`
- `fontStyle`
- `fontFamily`
- `textAlign`
- `shapeClass`

relationship、boundary、summary 额外解析：

- `lineColor`
- `lineWidth`
- `lineDashArray`
- `arrowBeginClass`
- `arrowEndClass`
- `shapeClass`

## 解析口径

- `theme.map.properties.color-list` 优先作为分支颜色来源。
- 如果没有 `color-list`，使用 `multi-line-colors`。
- 如果文件没有颜色列表，回退到源码 viewer 的默认分支色。
- topic depth 映射到 Xmind theme key：
  - depth 0：`centralTopic`
  - depth 1：`mainTopic`
  - depth 2：`subTopic`
  - depth 3 及以后：`level3`
- topic role 优先于普通 depth 映射：
  - `floatingTopic`：读取 `theme.floatingTopic`
  - `calloutTopic`：读取 `theme.calloutTopic`
  - `topic`：继续按 depth 映射到中心主题、主主题、子主题和更深层主题
- topic 自身 `style.properties` 优先级高于 theme properties。
- `inherited`、空字符串、`null` 和 `undefined` 都视为未指定，由当前层级 fallback 处理。
- `pt` 字号和线宽按 `96 / 72` 转成 CSS 像素。
- `fill-pattern: none` 的 central topic 渲染为无填充；普通分支在 inherited fill 时使用分支色或浅分支色。
- `line-pattern: dash` 转成 SVG `stroke-dasharray`。
- relationship、boundary、summary 的对象自身 `style.properties` 优先级高于对应 theme 对象。
- relationship 读取 `theme.relationship`，boundary 读取 `theme.boundary`，summary 读取 `theme.summary`。

## 当前限制

- 该模块只做基础 theme/style 和对象线条解析，不实现全部 Xmind shape 几何。
- `shapeClass` 已供 SVG renderer 使用；当前已覆盖部分常见 topic shape，剩余 shape 继续按 fixture 增量补齐。
- 未解析官方 app 内全部样式常量；后续应继续使用 `/Applications/Xmind.app` 和 fixture 做对齐。
