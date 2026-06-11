# SVG 渲染器

## 组件职责

`svg-renderer.ts` 将 `layout.ts` 生成的布局模型渲染成 SVG。它负责节点、文本、连接线和整体 transform，不直接解析 `.xmind` 文件。

## 渲染行为

- 每个 topic 渲染为圆角矩形和居中文本。
- 根主题使用白底蓝色描边。
- 一级主题使用分支强调色填充，二级主题使用同色系浅色胶囊。
- 主题存在默认紧凑隐藏子树时，在节点右侧绘制常驻数字圆圈，数值来自布局层的 `hiddenDescendantCount`。
- 数字圆圈使用 `0-999` 直接显示数字；超过三位数时显示 `...`，但 `aria-label` 仍保留真实隐藏数量。
- 已展开 topic 的减号圆圈默认隐藏，只在该 topic group hover、对应父子连接线 hover、focus-within 或控件自身 focus 时显示；点击或键盘 `Enter`/`Space` 会触发 `onToggleTopic()` 收起。
- 父子连接线额外绘制透明宽 stroke 命中区，只用于 hover 命中，不改变可见线条样式；命中区通过父 topic id 显示对应父节点的减号，避免 hover 到其它分支时误触发。事件同时监听 pointer 和 mouse 进入/离开，兼容不同浏览器的 SVG hover 触发路径。
- 手动收起后的 topic 右侧继续按隐藏数量显示常驻控件；`0-999` 显示数字，`> 999` 显示 `...`。点击或键盘触发后重新展开。
- 展开/收起控件贴在节点横向外侧，并用短连接线与节点边缘相连。右向分支显示在右侧，左向分支显示在左侧。
- 父子连接线使用三次贝塞尔曲线，并根据左右方向调整控制点。
- `setTransform()` 根据缩放比例、viewport 尺寸和 render adapter 传入的 `panOffsetX/Y` 显示脑图。适配画布时 offset 为零；触摸板平移或焦点缩放后由 adapter 维护 offset。
- `destroy()` 移除 SVG，供 sheet 切换和视图销毁使用。

## 可访问性

- 展开折叠控件使用 `role="button"`、`tabindex="0"` 和 `aria-label`。
- 控件点击区域只覆盖数量/减号徽标，不把整个 topic 节点变成点击目标，避免误触。
- 减号控件虽然默认透明，但仍可通过键盘 Tab 聚焦；聚焦时控件显示并可用 `Enter`/`Space` 触发。

## 后续扩展

主题样式、图标、边界、关系线和其它 XMind 结构应先在文档模型和布局层建立语义，再由本模块渲染，不从旧 bundle 粘贴不明语义代码。
