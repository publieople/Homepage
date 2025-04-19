import { FC, lazy, Suspense, useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

// 懒加载项目卡片组件
const ProjectCard = lazy(() =>
  import("@/components/ui/project-card").then((mod) => ({
    default: mod.ProjectCard,
  }))
);

// 项目类型定义
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

interface ProjectsProps {
  className?: string;
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ className, projects }) => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-12">
        <h2
          className={`${
            isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
          } font-bold mb-3 sm:mb-4`}
        >
          {t.projects.title}
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-foreground/80 px-1 sm:px-0">
          {language === "zh"
            ? "这些是我最近完成的一些项目。每个项目都展示了我的技能和专业知识。"
            : "These are some of my recent projects. Each project showcases my skills and expertise."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <Suspense
          fallback={
            <div className="col-span-full text-center py-8 sm:py-12">
              {language === "zh" ? "加载项目..." : "Loading projects..."}
            </div>
          }
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isMobile={isMobile}
            />
          ))}
        </Suspense>
      </div>
    </section>
  );
};

export { Projects };
export default Projects;
