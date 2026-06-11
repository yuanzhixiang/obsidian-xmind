# 静态资源类型声明

## 功能定位

`src/typing/assets.d.ts` 为 Rollup 自定义资源查询提供 TypeScript 模块声明，让源码可以直接导入 viewer 静态资源内容。

## 查询类型

- `?raw`：把文本资源作为字符串导入。
- `?dataurl`：把二进制或小图片资源作为 Data URL 字符串导入。
- `?bundle`：把 package runtime 清单打成 iframe 可执行脚本字符串。
- `?appbundle`：把源码版 iframe app 入口打成 iframe 可执行脚本字符串。
- `?xmindchunk`：把 `73350` webpack chunk parts 拼接成完整 JSONP chunk 字符串。

## 约束

- 新增 Rollup 资源查询时必须同步更新本文件。
- 类型声明只描述构建输入形态，不改变运行时资源加载协议。
