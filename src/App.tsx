import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { SplashScreen } from "@/components/ui/splash-screen";
import { DEBUG_FLAGS, getDebugFlag, initDebugTools } from "@/lib/debug-tools";
import { userInfo, projects } from "@/data/mock-data";
import { LanguageProvider } from "@/lib/language-context";
import { useLanguage } from "@/lib/language-context";

// 懒加载组件
const Layout = lazy(() =>
  import("@/components/layout/layout").then((mod) => ({ default: mod.Layout }))
);

// 懒加载页面部分组件
const Home = lazy(() =>
  import("@/components/sections/home").then((mod) => ({ default: mod.Home }))
);
const Projects = lazy(() =>
  import("@/components/sections/projects").then((mod) => ({
    default: mod.Projects,
  }))
);
const Contact = lazy(() =>
  import("@/components/sections/contact").then((mod) => ({
    default: mod.Contact,
  }))
);

// 外部博客地址
export const EXTERNAL_BLOG_URL = "https://blog.for-people.asia";

// 应用配置
export const APP_CONFIG = {
  // 如果有其他配置项可以保留
};

// 应用内容组件，包含在LanguageProvider内部
function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [mainContentLoaded, setMainContentLoaded] = useState(false);
  const { t } = useLanguage();

  // 使用调试工具库获取调试标志
  const skipIntro = getDebugFlag(DEBUG_FLAGS.SKIP_INTRO);
  const allowSkipAnytime = getDebugFlag(DEBUG_FLAGS.ALLOW_SKIP_ANYTIME);

  // 初始化调试工具
  useEffect(() => {
    initDebugTools();
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
      }, 100);
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
          skipIntro={skipIntro}
          allowSkipAnytime={allowSkipAnytime}
        />
      )}

      {!showSplash && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center text-white">
              {t.common.loading}
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
              externalBlogUrl={EXTERNAL_BLOG_URL}
            >
              {/* 根据活动部分渲染不同内容 */}
              {activeSection === "home" && <Home className="py-10" />}
              {activeSection === "projects" && (
                <Projects className="py-10" projects={projects} />
              )}
              {activeSection === "contact" && <Contact className="py-10" />}
            </Layout>
          </div>
        </Suspense>
      )}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
