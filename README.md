# Ferry Launcher · 产品介绍页

Ferry Launcher 的官方产品介绍单页 —— 一个给 Minecraft Java 版用的轻量启动器。

- 线上地址：<https://17695432859.github.io/Ferry-Launcher-Web/>
- 启动器仓库：<https://github.com/17695432859/Ferry-Launcher>

## 特点

- 纯静态：HTML + CSS + 原生 JS，无构建步骤、无依赖
- 深色毛玻璃风格，与启动器界面一致
- 顶部灵动岛状态组件，可展开查看版本与规格
- 响应式：桌面 / 平板 / 手机
- 滚动淡入、截图标签切换、无 JS 兜底

## 本地预览

直接双击 `index.html`，或起一个静态服务器：

```bash
python -m http.server 8080
# 打开 http://127.0.0.1:8080
```

## 目录

```
index.html    页面结构
styles.css    样式
script.js     交互（导航、滚动动画、截图切换、灵动岛）
assets/       界面截图
```

## 部署

推送到 `main` 分支后由 GitHub Pages 自动构建发布。
