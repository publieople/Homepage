"use client";

import { useState, useEffect } from "react";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete?: () => void;
  className?: string;
  userInfo: {
    name: string;
    title: string;
    description: string;
  };
  skipIntro?: boolean;
}

export function SplashScreen({
  onComplete,
  className,
  userInfo,
  skipIntro = false,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // 渐进式载入效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (skipIntro) {
      const timer = setTimeout(() => {
        setCompleted(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [skipIntro]);

  useEffect(() => {
    const handleKeyDown = () => {
      setCompleted(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        if (onComplete) onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [completed, onComplete]);

  if (!showSplash) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center bg-slate-950 transition-opacity duration-700 p-2 sm:p-4 md:p-6",
        fadeIn ? "opacity-100" : "opacity-0",
        { "opacity-0": completed },
        className
      )}
      onClick={() => setCompleted(true)}
    >
      <div className="w-full h-auto max-w-4xl mt-4 sm:mt-8 md:mt-16">
        <div className="bg-slate-950 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
          {/* 终端顶部栏 */}
          <div className="bg-slate-800 px-4 py-1.5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="absolute left-0 right-0 mx-auto text-center text-slate-400 text-xs font-mono">
              portfolio@terminal ~{" "}
            </div>
            <div className="text-slate-400 text-xs font-mono hidden sm:block">
              bash - 80x24
            </div>
          </div>

          <div className="bg-slate-950 overflow-auto">
            <Terminal className="min-h-[50vh] sm:min-h-[60vh] max-h-[80vh] w-full bg-slate-950 text-left px-2 sm:px-4 py-3 font-mono text-xs sm:text-sm">
              {/* 系统启动 */}
              <TypingAnimation duration={50} className="text-green-400">
                [system] $ bash startup.sh
              </TypingAnimation>

              {/* 连接服务器 */}
              <AnimatedSpan delay={800} className="text-blue-400">
                <span>
                  [system] $ connect --server=portfolio.server --port=443
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={1600} className="text-yellow-400">
                <span>Connecting to portfolio.server...</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2200} className="text-green-500">
                <span>Connection established. Handshake completed.</span>
              </AnimatedSpan>

              {/* 认证过程 */}
              <TypingAnimation
                delay={3000}
                duration={40}
                className="text-blue-400"
              >
                [system] $ auth --token=visitor_session
              </TypingAnimation>

              <AnimatedSpan delay={3800} className="text-green-500">
                <span>Authentication successful. Welcome, visitor.</span>
              </AnimatedSpan>

              {/* 加载用户资料 */}
              <TypingAnimation
                delay={4500}
                duration={40}
                className="text-blue-400"
              >
                [system] $ load-profile --target=author
              </TypingAnimation>

              <AnimatedSpan delay={5300} className="text-cyan-400">
                <span>Fetching profile data...</span>
              </AnimatedSpan>

              <AnimatedSpan delay={6000} className="text-white">
                <span>{`{`}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={6200} className="text-white pl-4">
                <span className="text-purple-400">"name":</span>{" "}
                <span className="text-yellow-300">"{userInfo.name}",</span>
              </AnimatedSpan>

              <AnimatedSpan delay={6500} className="text-white pl-4">
                <span className="text-purple-400">"position":</span>{" "}
                <span className="text-yellow-300">"{userInfo.title}",</span>
              </AnimatedSpan>

              <AnimatedSpan delay={6800} className="text-white pl-4">
                <span className="text-purple-400">"bio":</span>{" "}
                <span className="text-yellow-300">
                  "{userInfo.description}"
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={7100} className="text-white">
                <span>{`}`}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={7400} className="text-green-400">
                <span>Profile loaded successfully.</span>
              </AnimatedSpan>

              {/* 初始化应用 */}
              <TypingAnimation
                delay={8000}
                duration={40}
                className="text-blue-400"
              >
                [system] $ init-app --target=portfolio
              </TypingAnimation>

              <AnimatedSpan delay={8800} className="text-yellow-300">
                <span>Initializing application...</span>
              </AnimatedSpan>

              <AnimatedSpan delay={9200} className="text-white">
                <span>[ ] Loading components</span>
              </AnimatedSpan>

              <AnimatedSpan delay={9700} className="text-white">
                <span>
                  [<span className="text-green-500">✓</span>] Loading components
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={10000} className="text-white">
                <span>[ ] Compiling styles</span>
              </AnimatedSpan>

              <AnimatedSpan delay={10500} className="text-white">
                <span>
                  [<span className="text-green-500">✓</span>] Compiling styles
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={10800} className="text-white">
                <span>[ ] Initializing events</span>
              </AnimatedSpan>

              <AnimatedSpan delay={11300} className="text-white">
                <span>
                  [<span className="text-green-500">✓</span>] Initializing
                  events
                </span>
              </AnimatedSpan>

              <AnimatedSpan delay={11800} className="text-green-500">
                <span>Application initialized successfully!</span>
              </AnimatedSpan>

              {/* 最终启动 */}
              <TypingAnimation
                delay={12300}
                duration={50}
                className="text-blue-400"
              >
                [system] $ launch
              </TypingAnimation>

              <AnimatedSpan delay={13000} className="text-green-500 font-bold">
                <span>Welcome to {userInfo.name}'s portfolio!</span>
              </AnimatedSpan>

              {/* 提示按任意键继续 */}
              <AnimatedSpan delay={13800} className="text-gray-400 mt-2">
                <span>Press any key to continue...</span>
              </AnimatedSpan>
            </Terminal>
          </div>
        </div>
      </div>
    </div>
  );
}
