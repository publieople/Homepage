import { Project } from "@/components/sections/projects";

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
