import { FC, lazy, Suspense } from "react";

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
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">我的项目</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          这些是我最近完成的一些项目。每个项目都展示了我的技能和专业知识。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense
          fallback={
            <div className="col-span-full text-center py-12">加载项目...</div>
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Suspense>
      </div>
    </section>
  );
};

export { Projects };
export default Projects;
