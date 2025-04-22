import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // 从本地存储获取主题设置，如果没有则默认为暗色
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      return savedTheme;
    }

    // 检查系统偏好
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return "dark";
  });

  // 应用主题
  useEffect(() => {
    // 更新HTML元素的类
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 保存到本地存储
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 使用View Transitions API处理主题切换
  const toggleTheme = useCallback((event?: React.MouseEvent) => {
    if (!event) {
      // 如果没有事件，直接切换主题
      setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
      return;
    }

    // 获取点击位置
    const x = event.clientX;
    const y = event.clientY;

    // 计算动画扩散的最大半径
    // 使用屏幕与点击位置的最大距离
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 设置CSS变量
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--r', `${endRadius}px`);

    // 检查浏览器是否支持View Transitions API
    if ('startViewTransition' in document) {
      // @ts-ignore - TS可能不认识startViewTransition API
      document.startViewTransition(() => {
        // 切换主题
        setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
      });
    } else {
      // 如果不支持，直接切换主题
      setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
    }
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light"
  };
}