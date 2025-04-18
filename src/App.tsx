import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { SplashScreen } from "@/components/ui/splash-screen";

// 懒加载组件
const Layout = lazy(() =>
  import("@/components/layout/layout").then((mod) => ({ default: mod.Layout }))
);
const ProjectCard = lazy(() =>
  import("@/components/ui/project-card").then((mod) => ({
    default: mod.ProjectCard,
  }))
);
const BlogCard = lazy(() =>
  import("@/components/ui/blog-card").then((mod) => ({ default: mod.BlogCard }))
);
const ContactForm = lazy(() =>
  import("@/components/ui/contact-form").then((mod) => ({
    default: mod.ContactForm,
  }))
);

// 用户个人信息（请替换为您自己的信息）
const userInfo = {
  name: "Publieople", // 请替换为您的名字
  title: "在读大学生", // 请替换为您的职位
  description: "热爱各种技术，专注于提升自我、实现个人价值、造福人民", // 请用一句话描述自己
};

// 示例数据 - 放到懒加载组件之后
const projects = [
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

const blogPosts = [
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

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [mainContentLoaded, setMainContentLoaded] = useState(false);

  // 开发模式下控制是否跳过开屏动画的开关
  // 可通过控制台执行: localStorage.setItem('skipIntro', 'true') 来启用
  // 或执行: localStorage.setItem('skipIntro', 'false') 来禁用
  const skipIntro = localStorage.getItem("skipIntro") === "true";

  // 在开发环境显示调试信息
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(
        `%c开屏动画${skipIntro ? "已禁用" : "已启用"}`,
        "background: #222; color: #bada55; padding: 2px 4px; border-radius: 2px;"
      );
      console.log(
        '提示: 按下 Ctrl+Shift+S 可切换开屏动画，或在控制台执行 localStorage.setItem("skipIntro", "true/false")'
      );
    }
  }, [skipIntro]);

  // 添加键盘快捷键控制（仅开发模式下）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 按下Ctrl+Shift+S切换skipIntro的值
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        const currentValue = localStorage.getItem("skipIntro") === "true";
        localStorage.setItem("skipIntro", (!currentValue).toString());
        console.log(`开屏动画已${!currentValue ? "禁用" : "启用"}`);

        // 如果需要，可以在这里刷新页面使设置立即生效
        // window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 禁止滚动当显示开屏动画时
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  // 模拟资源加载
  useEffect(() => {
    if (!showSplash) {
      // 延迟一小段时间再渲染主内容，使其显得更自然
      const timer = setTimeout(() => {
        setMainContentLoaded(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <SplashScreen
          userInfo={userInfo}
          onComplete={handleSplashComplete}
          skipIntro={skipIntro} // 传入跳过动画的参数
        />
      )}

      {!showSplash && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center text-white">
              加载中...
            </div>
          }
        >
          <div
            className={`transition-opacity duration-700 ${
              mainContentLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Layout
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            >
              {/* 首页内容 */}
              {activeSection === "home" && (
                <section className="py-10">
                  <div className="max-w-4xl mx-auto text-center mb-10">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      欢迎来到我的个人主页
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                      我是一名前端开发工程师，专注于创建现代化、高性能的Web应用程序。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow">
                      <h2 className="text-2xl font-bold mb-4">我的技能</h2>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "JavaScript",
                          "TypeScript",
                          "React",
                          "Vue",
                          "Node.js",
                          "Next.js",
                          "Tailwind CSS",
                          "UI/UX设计",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow">
                      <h2 className="text-2xl font-bold mb-4">最近项目</h2>
                      <ul className="space-y-3">
                        {projects.slice(0, 3).map((project) => (
                          <li
                            key={project.id}
                            className="border-b border-slate-200 dark:border-slate-700 pb-2 last:border-0"
                          >
                            <a
                              href={project.link}
                              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                            >
                              {project.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setActiveSection("projects")}
                        className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                      >
                        查看所有项目 →
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* 关于页面 */}
              {activeSection === "about" && (
                <section className="py-10">
                  <h1 className="text-4xl font-bold mb-6">关于我</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="个人照片"
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold">张三</h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            前端开发工程师
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">个人简介</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          我是一名拥有5年经验的前端开发工程师，熟悉现代JavaScript框架和库，如React、Vue和Angular。我热衷于创建用户友好的界面和高性能的Web应用程序。
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          在过去的工作中，我参与了多个大型项目的开发，包括电子商务平台、内容管理系统和企业应用程序。我擅长将复杂的设计转化为可维护的代码，并确保应用程序在各种设备和浏览器上表现一致。
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                          除了编程，我还喜欢摄影、旅行和阅读。我相信终身学习的重要性，并不断学习新的技术和方法来提升自己的技能。
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 项目页面 */}
              {activeSection === "projects" && (
                <section className="py-10">
                  <h1 className="text-4xl font-bold mb-6">项目展示</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        imageUrl={project.imageUrl}
                        link={project.link}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 博客页面 */}
              {activeSection === "blog" && (
                <section className="py-10">
                  <h1 className="text-4xl font-bold mb-6">博客文章</h1>
                  <div className="space-y-8">
                    {blogPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        publishDate={post.publishDate}
                        imageUrl={post.imageUrl}
                        author={post.author}
                        tags={post.tags}
                        url={post.url}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 联系页面 */}
              {activeSection === "contact" && (
                <section className="py-10">
                  <h1 className="text-4xl font-bold mb-6">联系我</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">联系方式</h2>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <span className="mr-2">📧</span>
                            <span>email@example.com</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">📞</span>
                            <span>+86 123 4567 8910</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">📍</span>
                            <span>北京市海淀区</span>
                          </li>
                        </ul>
                        <h3 className="text-xl font-bold mt-6 mb-3">
                          社交媒体
                        </h3>
                        <div className="flex space-x-4">
                          <a
                            href="#"
                            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <span className="text-2xl">🐦</span>
                          </a>
                          <a
                            href="#"
                            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <span className="text-2xl">📸</span>
                          </a>
                          <a
                            href="#"
                            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <span className="text-2xl">👨‍💻</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <ContactForm />
                  </div>
                </section>
              )}
            </Layout>
          </div>
        </Suspense>
      )}
    </>
  );
}

export default App;
