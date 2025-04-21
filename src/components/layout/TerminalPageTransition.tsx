import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";

interface TerminalPageTransitionProps {
  children: ReactNode;
  className?: string;
  location: string;
}

export function TerminalPageTransition({
  children,
  location,
  className,
}: TerminalPageTransitionProps) {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPath, setCurrentPath] = useState(location);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 页面路径映射到终端命令和文件名
  const pathToCommand: Record<string, { cmd: string; file: string }> = {
    "/": { cmd: "cd ~/home", file: "index.jsx" },
    "/about": { cmd: "cd ~/about", file: "about.jsx" },
    "/projects": { cmd: "cd ~/projects", file: "projects.jsx" },
    "/blog": { cmd: "cd ~/blog", file: "blog.jsx" },
    "/contact": { cmd: "cd ~/contact", file: "contact.jsx" },
  };

  // 模拟加载进度
  useEffect(() => {
    if (showTerminal && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = Math.floor(Math.random() * 15) + 5;
          const nextValue = Math.min(prev + increment, 100);
          return nextValue;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [showTerminal, loadingProgress]);

  // 处理页面切换
  useEffect(() => {
    // 当路径变化时
    if (location !== currentPath) {
      setShowContent(false);
      setLoadingProgress(0);

      // 短暂延迟后显示终端
      const timer1 = setTimeout(() => {
        setShowTerminal(true);
        setCurrentPath(location);
      }, 300);

      // 终端动画结束后隐藏终端，显示页面内容
      const timer2 = setTimeout(() => {
        setShowTerminal(false);
        setShowContent(true);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (!showContent) {
      // 首次加载
      const timer = setTimeout(() => {
        setShowTerminal(false);
        setShowContent(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location, currentPath, showContent]);

  // 获取当前路径的命令和文件
  const currentCommand = pathToCommand[currentPath]?.cmd || `cd ${currentPath}`;
  const currentFile =
    pathToCommand[currentPath]?.file ||
    `${currentPath.slice(1) || "index"}.jsx`;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm"
          >
            <Terminal className="w-[90%] max-w-2xl">
              <TypingAnimation>{`> ${currentCommand}`}</TypingAnimation>

              <AnimatedSpan delay={600} className="text-zinc-400">
                <span>~/projects/{currentFile}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={1000} className="text-green-500">
                <span>$ npm run build</span>
              </AnimatedSpan>

              <AnimatedSpan delay={1400} className="text-blue-500">
                <span>
                  Building component tree...{" "}
                  {loadingProgress >= 30 ? "Done" : ""}
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={1800} className="text-blue-500">
                <span>
                  Loading assets... {loadingProgress >= 60 ? "Done" : ""}
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={2200} className="text-blue-500">
                <span>
                  Hydrating DOM... {loadingProgress >= 90 ? "Done" : ""}
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={2600} className="text-green-500">
                <span>$ npm run start -- --port 3000</span>
              </AnimatedSpan>

              <TypingAnimation delay={2800} className="text-zinc-300">
                {`Ready on http://localhost:3000${currentPath}`}
              </TypingAnimation>
            </Terminal>
          </motion.div>
        )}

        {showContent && (
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
