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
}

export function SplashScreen({
  onComplete,
  className,
  userInfo,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [commandIndex, setCommandIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const commands = [
    { text: "$ 正在建立连接...", delay: 300, duration: 70 },
    { text: "$ 连接成功！正在加载个人资料...", delay: 800, duration: 60 },
    { text: `$ 姓名: ${userInfo.name}`, delay: 600, duration: 50 },
    { text: `$ 职位: ${userInfo.title}`, delay: 400, duration: 50 },
    { text: `$ 简介: ${userInfo.description}`, delay: 400, duration: 40 },
    { text: "$ 正在初始化个人主页...", delay: 800, duration: 50 },
    { text: "$ 初始化完成！", delay: 600, duration: 60 },
    { text: "$ 欢迎访问我的个人主页！", delay: 400, duration: 40 },
  ];

  useEffect(() => {
    const handleKeyDown = () => {
      if (commandIndex >= commands.length) {
        setCompleted(true);
      } else {
        setSkipAnimation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [commandIndex, commands.length]);

  useEffect(() => {
    if (skipAnimation) {
      setCommandIndex(commands.length);
      setSkipAnimation(false);
      return;
    }

    if (commandIndex < commands.length) {
      const timer = setTimeout(() => {
        setCommandIndex((prev) => prev + 1);
      }, commands[commandIndex].delay + commands[commandIndex].text.length * commands[commandIndex].duration);

      return () => clearTimeout(timer);
    } else if (!completed) {
      setCompleted(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        if (onComplete) onComplete();
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [commandIndex, commands, completed, onComplete, skipAnimation]);

  if (!showSplash) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-opacity duration-700",
        { "opacity-0": completed },
        className
      )}
      onClick={() => {
        if (commandIndex >= commands.length) {
          setCompleted(true);
        } else {
          setSkipAnimation(true);
        }
      }}
    >
      <div className="w-full max-w-2xl p-6">
        <Terminal className="max-h-[500px] w-full">
          {commands.slice(0, commandIndex).map((command, index) => (
            <AnimatedSpan key={index} delay={index * 100}>
              {command.text.includes("欢迎访问") ? (
                <div className="text-green-500 font-bold">{command.text}</div>
              ) : command.text.includes("初始化完成") ? (
                <div className="text-green-400">{command.text}</div>
              ) : command.text.includes("正在初始化") ? (
                <div className="text-yellow-500">{command.text}</div>
              ) : command.text.includes("连接成功") ? (
                <div className="text-blue-400">{command.text}</div>
              ) : command.text.includes("正在建立连接") ? (
                <div className="text-blue-500">{command.text}</div>
              ) : command.text.includes("姓名:") ? (
                <div className="text-purple-400 font-medium">
                  {command.text}
                </div>
              ) : command.text.includes("职位:") ? (
                <div className="text-purple-400 font-medium">
                  {command.text}
                </div>
              ) : command.text.includes("简介:") ? (
                <div className="text-purple-400 font-medium">
                  {command.text}
                </div>
              ) : (
                <div>{command.text}</div>
              )}
            </AnimatedSpan>
          ))}

          {commandIndex < commands.length && (
            <TypingAnimation
              duration={commands[commandIndex].duration}
              delay={0}
              className={cn(
                commands[commandIndex].text.includes("欢迎访问") &&
                  "text-green-500 font-bold",
                commands[commandIndex].text.includes("初始化完成") &&
                  "text-green-400",
                commands[commandIndex].text.includes("正在初始化") &&
                  "text-yellow-500",
                commands[commandIndex].text.includes("连接成功") &&
                  "text-blue-400",
                commands[commandIndex].text.includes("正在建立连接") &&
                  "text-blue-500",
                (commands[commandIndex].text.includes("姓名:") ||
                  commands[commandIndex].text.includes("职位:") ||
                  commands[commandIndex].text.includes("简介:")) &&
                  "text-purple-400 font-medium"
              )}
            >
              {commands[commandIndex].text}
            </TypingAnimation>
          )}

          {commandIndex === commands.length && (
            <AnimatedSpan delay={500}>
              <div className="text-slate-500 mt-4">按任意键继续...</div>
            </AnimatedSpan>
          )}
        </Terminal>
      </div>
    </div>
  );
}
