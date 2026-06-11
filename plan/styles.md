# 插件样式

## 功能定位

`styles.css` 是 Obsidian 官方安装器加载的插件样式文件，负责文件视图容器、源码 viewer、SVG 画布、工具控件、sheet 标签和错误态样式。

## 样式口径

- `.xmind-viewer-content` 定义 Obsidian 文件视图容器的 flex、宽高和 overflow。
- `.xmind-native-viewer` 是源码 viewer 根容器。
- `.xmind-native-canvas` 和 `.xmind-native-svg` 承载 SVG 脑图；画布需要阻止外层滚动链和浏览器默认触摸行为，保证双指滑动、pinch、`Command + wheel` 和右键拖拽交给 viewer 处理。
- `.xmind-native-canvas.is-right-dragging` 显示右键拖拽中的抓取光标，视觉状态只由 class 控制。
- `.xmind-native-toolbar` 提供缩放和适配画布按钮。
- `.xmind-native-sheet` 显示当前 sheet。
- `.xmind-native-error` 显示解析或渲染失败信息。

## 约束

- viewer 样式必须放在 `styles.css`，不得在运行时创建 `<style>`。
- TypeScript 源码不得直接写 `element.style`，需要新增视觉状态时优先增加 CSS class。
- 样式应优先使用 Obsidian CSS 变量，避免破坏主题兼容。
