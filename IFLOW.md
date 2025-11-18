# IFLOW.md - 项目分析与开发指南

## 项目概述

这是一个使用现代化技术栈构建的个人主页项目，采用 Feature-based 架构，结合 React 19、TypeScript 和 Shadcn UI 组件库，打造美观、响应式的个人展示网站。

### 项目基本信息

- **项目名称**: Homepage
- **技术栈**: React 19, TypeScript, Vite, TailwindCSS, Framer Motion
- **UI 库**: Shadcn UI, Magic UI
- **多语言**: i18next
- **路由**: React Router v7
- **包管理**: Yarn

### 项目结构

```fileTree
src/
├── assets/        # 静态资源(图片、字体等)
├── components/    # 全局UI组件
│   ├── ui/        # 基础UI组件(shadcn)
│   ├── layout/    # 布局相关组件
│   ├── shared/    # 共享组件
│   ├── features/  # 功能模块组件
│   └── magicui/   # 动效组件
├── hooks/         # 自定义React钩子
├── lib/           # 工具函数和库
├── pages/         # 页面组件
├── providers/     # React上下文提供者
├── types/         # 类型定义
├── App.tsx        # 应用入口组件
└── main.tsx       # 应用挂载点
```

### 主要功能模块

1. **首页 (Home)**: 包含 Hero 区域、仪表盘区域和项目技能区域
2. **关于 (About)**: 个人介绍页面
3. **作品集 (Projects)**: 项目展示（占位）
4. **博客 (Blog)**: 重定向到外部博客
5. **联系 (Contact)**: 联系页面（占位）

## 构建与运行

### 环境要求

- Node.js >= 18.0.0
- Yarn >= 3.0.0

### 安装与启动

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn dev

# 构建项目
yarn build

# 预览构建结果
yarn preview

# 代码检查
yarn lint
```

### 开发脚本

- `dev`: 启动 Vite 开发服务器
- `build`: 使用 TypeScript 编译器和 Vite 进行构建
- `lint`: 使用 ESLint 检查代码
- `preview`: 预览构建后的应用

## 开发约定

### 命名约定

- **文件名**: 使用 kebab-case (例如: `page-title.tsx`)
- **组件名**: 使用 PascalCase (例如: `PageTitle`)
- **函数/变量**: 使用 camelCase (例如: `getUserData`)

### 组件开发

- 所有组件应包含 TypeScript 类型定义
- 使用 TailwindCSS 进行样式设计
- 遵循响应式设计原则
- 使用 Framer Motion 实现动画效果

### 国际化

- 支持中英文切换
- 国际化配置文件位于 `src/lib/i18n/locales/`
- 使用 `react-i18next` 进行国际化处理

### 主题系统

- 支持亮/暗色主题切换
- 支持根据系统偏好自动切换
- 主题配置在 `src/lib/theme-utils.ts` 中处理
- 使用 CSS 变量定义主题色

## 核心特性

### 动画效果

- 使用 Framer Motion 实现页面过渡动画
- 使用 Typed.js 实现打字机效果
- Magic UI 组件库提供丰富的动效组件

### 响应式设计

- 使用 TailwindCSS 实现响应式布局
- 适配多种屏幕尺寸
- 移动端优化的交互体验

### 用户体验

- 单页滚动导航
- 平滑滚动效果
- 视差滚动动画
- 页面指示器

## 开发进度

### 已完成

- 项目初始化、依赖与架构搭建
- Feature-based 目录结构
- 类型系统与样式系统
- 主题切换（亮/暗）、持久化、系统检测
- 多语言支持（中英文切换）
- 布局系统、导航栏、移动端菜单
- 路由配置与页面过渡动画
- Magic UI 基础特效组件

### 进行中

- 首页 Hero 区域（主视觉）
- 项目预览卡片设计
- 仪表盘功能
- 页面懒加载与性能优化

### 未来规划

- 作品集模块
- 联系表单功能
- 状态管理（Zustand）
- 测试集成（Vitest, Playwright）
- CI/CD 自动化部署

## 项目配置

### 核心依赖

- React 19: 前端框架
- TypeScript: 类型安全
- Vite: 构建工具
- TailwindCSS: 样式框架
- Framer Motion: 动画库
- i18next: 国际化
- React Router: 路由管理

### 开发工具

- ESLint: 代码质量检查
- TypeScript-ESLint: TypeScript 代码规范
- Yarn: 包管理器

## 贡献指南

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

遵循项目命名约定和代码风格，确保代码质量和类型安全。
