![Homepage](https://socialify.git.ci/publieople/Homepage/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Circuit+Board&stargazers=1&theme=Auto)

# 个人主页项目

![License](https://img.shields.io/github/license/publieople/Homepage)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.1-green)

这是一个使用现代技术栈构建的个人主页项目，采用Feature-based架构，结合了React 19、TypeScript和Shadcn UI组件库，创建一个美观、响应式的个人展示网站。

## 🌟 特性

- 🚀 使用Vite构建，提供极速开发体验
- 🎨 集成Shadcn UI和TailwindCSS，支持主题自定义
- 📱 完全响应式设计，适配各种屏幕尺寸
- 🌓 内置亮色/暗色模式支持
- 📦 Feature-based架构，良好的代码组织
- 🛠️ TypeScript类型系统，提供类型安全
- 🧩 模块化组件设计，易于维护和扩展

## 📚 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **语言**: TypeScript
- **样式**: TailwindCSS 4 + CSS变量
- **UI组件**: Shadcn UI (基于Tailwind)
- **包管理**: Yarn
- **代码规范**: ESLint + TypeScript-ESLint
- **API集成**: (计划中)
- **状态管理**: (计划使用Zustand)
- **路由**: (计划使用React Router)

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

4. 打开浏览器访问 <http://localhost:5173>

### 构建

```bash
yarn build
```

构建产物将生成在 `dist` 目录中。

### 预览构建结果

```bash
yarn preview
```

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

## 🧩 特性模块

- **首页**: 个人介绍和主要导航
- **作品集**: 项目展示和详情
- **关于**: 个人经历和技能
- **联系**: 联系表单和社交媒体链接

## 🔧 自定义

### 主题定制

主题色和设计令牌定义在 `src/index.css` 文件中，使用CSS变量实现。您可以根据需要修改这些变量。

```css
:root {
  --primary: oklch(0.21 0.034 264.665);
  --secondary: oklch(0.967 0.003 264.542);
  /* 更多变量... */
}
```

## 📝 开发指南

### 命名约定

- 文件名: 使用kebab-case (例如: `page-title.tsx`)
- 组件名: 使用PascalCase (例如: `PageTitle`)
- 函数/变量: 使用camelCase (例如: `getUserData`)

### 组件创建

组件应包含:

- TypeScript类型定义
- 清晰的注释
- 适当的测试

例如:

```tsx
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## 📄 许可证

MIT © [Your Name]

## 🤝 贡献

欢迎贡献! 请先fork仓库，创建feature分支，然后提交PR。
