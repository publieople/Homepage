"use client";

import { useState, useEffect } from "react";
import { Terminal } from "@/components/magicui/terminal";
import { TerminalCommand } from "@/components/ui/terminal-command";
import { cn } from "@/lib/utils";
import { PROCESSED_COMMANDS, ANIMATION_CONFIG } from "@/lib/animation-config";
import { useLanguage } from "@/lib/language-context";

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
  const { language } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  // 是否可以跳过动画
  const canSkip = skipIntro || allowSkipAnytime || progressComplete;

  // 创建命令替换内容
  const replacements = {
    name: userInfo.name,
    title: userInfo.title,
    description: userInfo.description,
    skip_message: canSkip
      ? language === "zh"
        ? "按任意键或点击继续..."
        : "Press any key or click to continue..."
      : language === "zh"
      ? "初始化中... 请稍候..."
      : "Initializing... Please wait...",
  };

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
    }, ANIMATION_CONFIG.TOTAL_DURATION);

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
          {/* 渲染所有命令 */}
          {PROCESSED_COMMANDS.map((command) => (
            <TerminalCommand
              key={command.id}
              command={command}
              replacements={replacements}
            />
          ))}
        </Terminal>
      </div>
    </div>
  );
}
