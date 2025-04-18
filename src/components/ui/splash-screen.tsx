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
  allowSkipAnytime?: boolean;
}

export function SplashScreen({
  onComplete,
  className,
  userInfo,
  skipIntro = false,
  allowSkipAnytime = false,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  // 是否可以跳过动画
  const canSkip = skipIntro || allowSkipAnytime || progressComplete;

  // 渐进式载入效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 如果启用了skipIntro调试标志，则立即跳过动画
  useEffect(() => {
    if (skipIntro) {
      const timer = setTimeout(() => {
        setCompleted(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [skipIntro]);

  // 监听键盘事件，根据当前设置决定是否允许跳过
  useEffect(() => {
    const handleKeyDown = () => {
      if (canSkip) {
        setCompleted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canSkip]);

  // 当所有动画完成后，标记进度完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressComplete(true);
    }, 13000); // 调整为新的最后动画延迟时间加上一些缓冲

    return () => clearTimeout(timer);
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
      onClick={() => canSkip && setCompleted(true)}
    >
      <div className="w-full h-auto max-w-4xl mt-4 sm:mt-8 md:mt-16">
        <Terminal className="font-mono text-xs sm:text-sm min-h-[50vh] sm:min-h-[60vh] max-h-[80vh] w-full border-slate-700 bg-slate-950 shadow-2xl">
          {/* 系统启动 */}
          <div className="flex items-start">
            <span className="text-green-400 mr-2">[system] $</span>
            <TypingAnimation duration={10} className="text-green-400">
              zsh startup.sh
            </TypingAnimation>
          </div>

          {/* 连接服务器 */}
          <div className="flex items-start">
            <AnimatedSpan delay={1000} className="text-blue-400 mr-2">
              [system] $
            </AnimatedSpan>
            <TypingAnimation
              delay={1500}
              duration={10}
              className="text-blue-400"
            >
              connect --server=portfolio.server --port=443
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={1800} className="text-yellow-400">
            <span>Connecting to portfolio.server...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500">
            <span>Connection established. Handshake completed.</span>
          </AnimatedSpan>

          {/* 认证过程 */}
          <div className="flex items-start">
            <AnimatedSpan delay={2100} className="text-blue-400 mr-2">
              [system] $
            </AnimatedSpan>
            <TypingAnimation
              delay={2130}
              duration={20}
              className="text-blue-400"
            >
              auth --token=visitor_session
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={2300} className="text-green-500">
            <span>Authentication successful. Welcome, visitor.</span>
          </AnimatedSpan>

          {/* 加载用户资料 */}
          <div className="flex items-start">
            <AnimatedSpan delay={4000} className="text-blue-400 mr-2">
              [system] $
            </AnimatedSpan>
            <TypingAnimation
              delay={4030}
              duration={20}
              className="text-blue-400"
            >
              load-profile --target=author
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={5000} className="text-cyan-400">
            <span>Fetching profile data...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5100} className="text-white">
            <span>{`{`}</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5200} className="text-white pl-4">
            <span className="text-purple-400">"name":</span>{" "}
            <span className="text-yellow-300">"{userInfo.name}",</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5300} className="text-white pl-4">
            <span className="text-purple-400">"position":</span>{" "}
            <span className="text-yellow-300">"{userInfo.title}",</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5400} className="text-white pl-4">
            <span className="text-purple-400">"bio":</span>{" "}
            <span className="text-yellow-300">"{userInfo.description}"</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5500} className="text-white">
            <span>{`}`}</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5700} className="text-green-400">
            <span>Profile loaded successfully.</span>
          </AnimatedSpan>

          {/* 初始化应用 */}
          <div className="flex items-start">
            <AnimatedSpan delay={8000} className="text-blue-400 mr-2">
              [system] $
            </AnimatedSpan>
            <TypingAnimation
              delay={8030}
              duration={10}
              className="text-blue-400"
            >
              init-app --target=portfolio
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={8500} className="text-yellow-300">
            <span>Initializing application...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={9000} className="text-white">
            <span>[ ] Loading components</span>
          </AnimatedSpan>

          <AnimatedSpan delay={9300} className="text-white">
            <span>
              [<span className="text-green-500">✓</span>] Loading components
            </span>
          </AnimatedSpan>

          <AnimatedSpan delay={9400} className="text-white">
            <span>[ ] Compiling styles</span>
          </AnimatedSpan>

          <AnimatedSpan delay={9700} className="text-white">
            <span>
              [<span className="text-green-500">✓</span>] Compiling styles
            </span>
          </AnimatedSpan>

          <AnimatedSpan delay={9800} className="text-white">
            <span>[ ] Initializing events</span>
          </AnimatedSpan>

          <AnimatedSpan delay={10100} className="text-white">
            <span>
              [<span className="text-green-500">✓</span>] Initializing events
            </span>
          </AnimatedSpan>

          <AnimatedSpan delay={10200} className="text-green-500">
            <span>Application initialized successfully!</span>
          </AnimatedSpan>

          {/* 最终启动 */}
          <div className="flex items-start">
            <AnimatedSpan delay={11200} className="text-blue-400 mr-2">
              [system] $
            </AnimatedSpan>
            <TypingAnimation
              delay={11230}
              duration={10}
              className="text-blue-400"
            >
              launch
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={12000} className="text-green-500 font-bold">
            <span>Welcome to {userInfo.name}'s portfolio!</span>
          </AnimatedSpan>

          {/* 提示按任意键继续 */}
          <AnimatedSpan delay={12500} className="text-gray-400 mt-2">
            <span>
              {canSkip
                ? "Press any key or click to continue..."
                : "Initializing... Please wait..."}
            </span>
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}
