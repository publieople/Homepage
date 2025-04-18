import { FC } from "react";
import { EXTERNAL_BLOG_URL } from "@/App";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useLanguage } from "@/lib/language-context";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const { t, language } = useLanguage();

  // 技能列表（支持不同语言）
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    language === "zh" ? "UI/UX设计" : "UI/UX Design",
  ];

  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ">
          <AuroraText speed={2}>
            {language === "zh"
              ? "欢迎来到我的个人主页"
              : "Welcome to My Homepage"}
          </AuroraText>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          {language === "zh"
            ? "我是一名前端开发工程师，专注于创建现代化、高性能的Web应用程序。"
            : "I am a front-end developer focusing on creating modern, high-performance web applications."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{t.home.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            {language === "zh" ? "关于我" : "About Me"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {language === "zh"
              ? "我热爱创建美观、用户友好且高性能的Web应用。当我不写代码时，我喜欢阅读、旅行和学习新技术。"
              : "I love creating beautiful, user-friendly, and high-performance web applications. When I'm not coding, I enjoy reading, traveling, and learning new technologies."}
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === "zh" ? "联系我" : "Contact Me"}
            </a>
            <a
              href={EXTERNAL_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg transition-colors"
            >
              {language === "zh" ? "访问我的博客" : "Visit My Blog"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Home };
export default Home;
