"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 初始化主题
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center transition-colors",
        className
      )}
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      <span className="text-lg">{isDark ? "🌞" : "🌙"}</span>
    </button>
  );
};

export { ThemeToggle };
