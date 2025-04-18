import { FC } from "react";

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <section className={className}>
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
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "UI/UX设计",
            ].map((skill) => (
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
          <h2 className="text-2xl font-bold mb-4">关于我</h2>
          <p className="text-slate-600 dark:text-slate-300">
            我热爱创建美观、用户友好且高性能的Web应用。
            当我不写代码时，我喜欢阅读、旅行和学习新技术。
          </p>
          <div className="mt-4">
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              联系我
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Home };
export default Home;
