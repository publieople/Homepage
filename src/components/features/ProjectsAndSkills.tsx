"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { MagicCard } from "@/components/magicui/magic-card";
import { TextAnimate } from "@/components/magicui/text-animate";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar } from "lucide-react";

interface ProjectsAndSkillsProps {
  className?: string;
}

/**
 * 项目与技能展示组件
 * 展示个人项目经历和技术技能
 */
export function ProjectsAndSkills({ className }: ProjectsAndSkillsProps) {
  const projects = [
    {
      title: "个人主页项目",
      description:
        "使用 React 19 + TypeScript + Tailwind CSS 构建的现代化个人主页，采用 Feature-based 架构设计。",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
      githubUrl: "https://github.com/publieople/Homepage",
      liveUrl: "https://homepage.example.com",
      date: "2024-12",
      status: "进行中",
    },
    {
      title: "博客系统",
      description:
        "基于现代技术栈的个人博客系统，支持 Markdown 编写和主题切换。",
      technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/example/blog",
      liveUrl: "https://blog.example.com",
      date: "2024-11",
      status: "已完成",
    },
    {
      title: "任务管理应用",
      description: "一个功能完整的任务管理应用，支持团队协作和项目管理。",
      technologies: ["Vue 3", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/example/task-manager",
      liveUrl: "https://tasks.example.com",
      date: "2024-10",
      status: "已完成",
    },
  ];

  const skills = {
    frontend: [
      "React",
      "Vue",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Sass",
      "Webpack",
      "Vite",
      "Next.js",
      "Nuxt.js",
    ],
    backend: [
      "Node.js",
      "Express",
      "Koa",
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Nginx",
    ],
    tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "Photoshop",
      "Postman",
      "Linux",
      "AWS",
      "Vercel",
      "Netlify",
    ],
  };

  const iconSlugs = [
    "typescript",
    "javascript",
    "react",
    "vue",
    "nodejs",
    "python",
    "docker",
    "git",
    "github",
    "figma",
    "tailwindcss",
    "nextdotjs",
    "postgresql",
    "mongodb",
    "redis",
    "nginx",
    "linux",
    "aws",
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* 项目展示区域 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextAnimate
          animation="slideUp"
          className="text-3xl font-bold mb-8 text-center"
          as="h2"
        >
          项目经历
        </TextAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <MagicCard className="p-6 h-full flex flex-col rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge
                    variant={
                      project.status === "已完成" ? "default" : "secondary"
                    }
                    className="ml-2"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-foreground/70 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center text-sm text-foreground/60 mb-4">
                  <Calendar size={14} className="mr-1" />
                  {project.date}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    源码
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    预览
                  </motion.a>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 技能展示区域 */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TextAnimate
          animation="slideUp"
          className="text-3xl font-bold mb-8 text-center"
          as="h2"
          delay={0.4}
        >
          技术技能
        </TextAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 技能列表 */}
          <div className="space-y-6">
            {Object.entries(skills).map(
              ([category, skillList], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + categoryIndex * 0.2,
                  }}
                >
                  <MagicCard className="p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 capitalize">
                      {category === "frontend" && "前端技术"}
                      {category === "backend" && "后端技术"}
                      {category === "tools" && "工具与平台"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay:
                              0.8 + categoryIndex * 0.2 + skillIndex * 0.05,
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </MagicCard>
                </motion.div>
              )
            )}
          </div>

          {/* 技能图标云 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagicCard className="p-6 h-full flex items-center justify-center rounded-xl">
              <div className="w-full max-w-md">
                <IconCloud iconSlugs={iconSlugs} />
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
