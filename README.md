# Publieople's 个人主页项目

![Homepage](https://socialify.git.ci/publieople/Homepage/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Circuit+Board&stargazers=1&theme=Auto)

![License](https://img.shields.io/github/license/publieople/Homepage)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.1-green)

这是一个使用现代技术栈构建的个人主页项目，采用 Feature-based 架构，结合 React 19、TypeScript 和 Shadcn UI 组件库，打造美观、响应式的个人展示网站。

---

## 🚦 项目进度

- 当前阶段：阶段二（2024-05-16 ~ 2024-05-29），已完成约 80%
- 近期重点：
  - 首页 Hero 区域与项目卡片
  - 路由/组件懒加载与构建优化
  - 作品集页面基础功能
  - 性能与体验提升

详见 [TODO.md](./TODO.md) 获取详细进度与规划。

---

## 🌟 已实现特性

- 🚀 Vite 极速开发体验
- 🎨 Shadcn UI + TailwindCSS 主题自定义
- 📱 响应式设计，适配多端
- 🌓 亮/暗色主题切换，支持系统偏好
- 🌏 中英文多语言切换（i18next）
- 🧩 Magic UI 动效组件（Particles、MagicCard、Dock、Globe、IconCloud、ShineBorder）
- 💻 终端风格页面过渡动画
- 🗂️ Feature-based 目录结构，类型系统完善
- 🛠️ TypeScript 类型安全
- 🧹 ESLint + TypeScript-ESLint 代码规范
- 🔗 路由采用 React Router v7

---

## 📚 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **语言**: TypeScript
- **样式**: TailwindCSS 4 + CSS 变量
- **UI 组件**: Shadcn UI (基于 Tailwind)
- **包管理**: Yarn
- **代码规范**: ESLint + TypeScript-ESLint
- **多语言**: i18next + react-i18next
- **动画/动效**: motion, cobe, Magic UI
- **路由**: React Router v7
- **状态管理**: （计划集成 Zustand）
- **API 集成**: （计划中）

---

## 🚀 快速开始

### 前置条件

- Node.js >= 18.0.0
- Yarn >= 3.0.0

### 安装

1. 克隆仓库

```bash
git clone https://github.com/publieople/Homepage.git
cd homepage
```

2. 安装依赖

```bash
yarn install
```

3. 启动开发服务器

```bash
yarn dev
```

4. 打开浏览器访问 [http://localhost:5173](http://localhost:5173)

### 构建

```bash
yarn build
```

构建产物将生成在 `dist` 目录中。

### 预览构建结果

```bash
yarn preview
```

---

## 📁 项目结构

```
src/
├── assets/        # 静态资源(图片、字体等)
├── components/    # 全局UI组件
│   ├── ui/        # 基础UI组件(shadcn)
│   ├── layout/    # 布局相关组件
│   └── shared/    # 共享组件
├── features/      # 功能模块
│   ├── home/      # 首页相关功能
│   ├── about/     # 关于页功能
│   ├── portfolio/ # 作品集功能
│   └── contact/   # 联系表单功能
├── hooks/         # 自定义React钩子
├── lib/           # 工具函数和库
├── pages/         # 页面组件
│   ├── home/      # 首页
│   ├── about/     # 关于页
│   ├── portfolio/ # 作品集页面
│   └── contact/   # 联系页面
├── types/         # 类型定义
├── App.tsx        # 应用入口组件
└── main.tsx       # 应用挂载点
```

---

## 🧩 主要模块

- **首页**: 个人介绍和主要导航
- **作品集**: 项目展示和详情
- **关于**: 个人经历和技能
- **联系**: 联系表单和社交媒体链接

---

## 🔧 自定义

### 主题定制

主题色和设计令牌定义在 `src/index.css` 文件中，使用 CSS 变量实现。您可以根据需要修改这些变量。

```css
:root {
  --primary: oklch(0.21 0.034 264.665);
  --secondary: oklch(0.967 0.003 264.542);
  /* 更多变量... */
}
```

---

## 📝 开发指南

### 命名约定

- 文件名: 使用 kebab-case (例如: `page-title.tsx`)
- 组件名: 使用 PascalCase (例如: `PageTitle`)
- 函数/变量: 使用 camelCase (例如: `getUserData`)

### 组件创建

组件应包含:

- TypeScript 类型定义
- 清晰的注释
- 适当的测试

例如:

```tsx
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

---

## 📄 许可证

MIT © Publieople

---

## 🤝 贡献

欢迎贡献！请先 fork 仓库，创建 feature 分支，然后提交 PR。

---

## 🙏 致谢与计划

- 本项目持续开发中，欢迎提出建议和 issue。
- 近期将重点完善首页、作品集与性能体验，敬请关注。
