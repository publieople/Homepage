import { Project } from "@/components/sections/projects";
import { BlogPost } from "@/components/sections/blog";

// 用户个人信息
export const userInfo = {
  name: "Publieople", // 请替换为您的名字
  title: "在读大学生", // 请替换为您的职位
  description: "热爱各种技术，专注于提升自我、实现个人价值、造福人民", // 请用一句话描述自己
};

// 示例项目数据
export const projects: Project[] = [
  {
    id: 1,
    title: "个人主页项目",
    description:
      "使用React和Vite构建的现代化个人主页，支持暗色模式和响应式设计。",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "https://github.com",
  },
  {
    id: 2,
    title: "任务管理应用",
    description:
      "一个功能齐全的任务管理应用，支持任务创建、编辑、分类和提醒功能。",
    tags: ["React", "Redux", "Firebase"],
    imageUrl:
      "https://images.unsplash.com/photo-1540349086396-43d6def0add5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "https://github.com",
  },
  {
    id: 3,
    title: "电子商务网站",
    description: "现代化电子商务网站，包含产品展示、购物车、支付集成等功能。",
    tags: ["Next.js", "Stripe", "MongoDB"],
    imageUrl:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "https://github.com",
  },
];

// 示例博客文章数据
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "React性能优化最佳实践",
    excerpt:
      "探索提升React应用性能的多种策略，从代码分割到组件优化的全面指南。",
    publishDate: "2023-10-15",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: {
      name: "张三",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    tags: ["React", "性能优化", "前端开发"],
    url: "/blog/1",
  },
  {
    id: 2,
    title: "TypeScript高级类型系统详解",
    excerpt:
      "深入理解TypeScript的类型系统，掌握泛型、条件类型和映射类型等高级特性。",
    publishDate: "2023-09-22",
    imageUrl:
      "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: {
      name: "李四",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    tags: ["TypeScript", "前端开发"],
    url: "/blog/2",
  },
  {
    id: 3,
    title: "现代CSS布局技术详解",
    excerpt:
      "探讨Flexbox、Grid和容器查询等现代CSS布局技术，以及如何创建复杂而灵活的页面布局。",
    publishDate: "2023-08-10",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: {
      name: "王五",
      avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    tags: ["CSS", "Web设计", "响应式设计"],
    url: "/blog/3",
  },
];
