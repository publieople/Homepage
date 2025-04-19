import { FC, useEffect, useState } from "react";
import { EXTERNAL_BLOG_URL } from "@/App";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useLanguage } from "@/lib/language-context";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-10">
        <h1
          className={`${
            isMobile ? "text-3xl" : "text-4xl sm:text-5xl"
          } font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r`}
        >
          <AuroraText speed={2}>
            {language === "zh"
              ? "欢迎来到我的个人主页"
              : "Welcome to My Homepage"}
          </AuroraText>
        </h1>
        <p className="text-base sm:text-xl text-foreground/80 px-2">
          {language === "zh"
            ? "我是一名前端开发工程师，专注于创建现代化、高性能的Web应用程序。"
            : "I am a front-end developer focusing on creating modern, high-performance web applications."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-12">
        <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {t.home.skills}
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg shadow">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {language === "zh" ? "关于我" : "About Me"}
          </h2>
          <p className="text-sm sm:text-base text-foreground/80">
            {language === "zh"
              ? "我热爱创建美观、用户友好且高性能的Web应用。当我不写代码时，我喜欢阅读、旅行和学习新技术。"
              : "I love creating beautiful, user-friendly, and high-performance web applications. When I'm not coding, I enjoy reading, traveling, and learning new technologies."}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              {language === "zh" ? "联系我" : "Contact Me"}
            </a>
            <a
              href={EXTERNAL_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg transition-colors text-sm sm:text-base"
            >
              {language === "zh" ? "访问我的博客" : "Visit My Blog"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-3.5 sm:h-3.5"
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
