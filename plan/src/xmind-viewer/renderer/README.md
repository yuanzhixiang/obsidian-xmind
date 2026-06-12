# 源码渲染器

## 能力定位

`src/xmind-viewer/renderer/` 保存源码版 XMind viewer 的布局、样式解析和 SVG 渲染逻辑。它替代旧 Snowbrush bundle 的主渲染入口，目标是逐步达到与 Xmind Desktop 本地文件查看体验的像素级一致。

## 当前模块

- `layout.ts`：把 topic 树转换成左右分布的节点坐标、尺寸、文本换行和整体边界。
- `style-resolver.ts`：把 Xmind sheet theme、topic style 和 color theme 字段转换成布局与渲染共用的 resolved style。
- `svg-renderer.ts`：根据布局生成 SVG 节点、连接线和文本，并提供 `setTransform()` 供缩放、平移和适配画布使用。

## 当前渲染口径

- 根主题居中显示。
- 一级主题左右分栏，子主题沿父方向展开。
- 节点宽高按文本和 resolved font size 估算，中文和英文使用不同字符宽度近似值。
- 背景、分支色、节点填充、边框、文字和连接线读取 `.xmind` 文件里的基础 theme/style 属性。
- relationship、boundary、summary 已有基础 SVG 渲染路径，使用 Xmind 文件里的对象 style 和 theme style；relationship 会读取控制点与基础 shape，boundary 会读取基础 shape。
- marker、numbering、task info、attachment、equation、audio 和 label 已有基础 SVG 渲染路径，并在布局层预留节点内部空间。
- image topic 已有基础资源读取、布局预留和 SVG `<image>` 渲染路径。
- topic 选中状态已有基础 SVG 外框和键盘 focus 路径，仅用于只读查看 UI、搜索和大纲定位。
- 不提供 topic 标题编辑、结构编辑或写回快捷键。
- floating topic 已从 `children.detached` 独立成画布上的自由主题，不再混入根主题分支树。
- callout topic 已从 `children.callout` 挂到父 topic，并渲染基础 callout 连接线。
- 常见 topic shape 已有基础几何渲染：roundedRect、rect、ellipserect、circle/ellipse、diamond、hexagon、underline、doubleunderline。
- 连线使用三次贝塞尔曲线。
- 缩放、触摸板平移和适配画布通过 SVG group transform 完成。

## 限制

- 暂不支持全部 31 种 topic shape、floating/callout 的精确避让算法、全部 relationship 形状、全部 boundary 形状、boundary 精确范围、summary 精确 range、手绘结构、鱼骨图、矩阵图、时间线、组织结构图、官方 marker/sticker 图标细节、贴纸、图片裁剪/圆角、附件预览或公式渲染。
- 后续补齐能力时，应先扩展文档模型，再扩展布局和渲染，不直接复制旧编译后 bundle。
