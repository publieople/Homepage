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
    }, 14000); // 设置为比最后一个动画的延迟稍长

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
          <TypingAnimation duration={10} className="text-green-400">
            [system] $ bash startup.sh
          </TypingAnimation>

          {/* 连接服务器 */}
          <AnimatedSpan delay={1000} className="text-blue-400">
            <span>[system] $ connect --server=portfolio.server --port=443</span>
          </AnimatedSpan>

          <AnimatedSpan delay={1600} className="text-yellow-400">
            <span>Connecting to portfolio.server...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2200} className="text-green-500">
            <span>Connection established. Handshake completed.</span>
          </AnimatedSpan>

          {/* 认证过程 */}
          <TypingAnimation delay={3000} duration={40} className="text-blue-400">
            [system] $ auth --token=visitor_session
          </TypingAnimation>

          <AnimatedSpan delay={3800} className="text-green-500">
            <span>Authentication successful. Welcome, visitor.</span>
          </AnimatedSpan>

          {/* 加载用户资料 */}
          <TypingAnimation delay={4500} duration={40} className="text-blue-400">
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
            <span className="text-yellow-300">"{userInfo.description}"</span>
          </AnimatedSpan>

          <AnimatedSpan delay={7100} className="text-white">
            <span>{`}`}</span>
          </AnimatedSpan>

          <AnimatedSpan delay={7400} className="text-green-400">
            <span>Profile loaded successfully.</span>
          </AnimatedSpan>

          {/* 初始化应用 */}
          <TypingAnimation delay={8000} duration={40} className="text-blue-400">
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
              [<span className="text-green-500">✓</span>] Initializing events
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
