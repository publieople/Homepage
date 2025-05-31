"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Typed from "typed.js";
import { Dashboard } from "@/components/features/Dashboard";
import { ProjectsAndSkills } from "@/components/features/ProjectsAndSkills";
import { PageIndicator } from "@/components/shared/PageIndicator";

interface Section {
  id: string;
  component: React.ReactNode;
}

export function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  const typingTexts = [
    "Hi，我是人民公仆",
    "Hi，我是一个大学生",
    "Hi，我是一个效率控",
    "欢迎来到我的个人主页🎉",
  ];

  useEffect(() => {
    if (typedRef.current) {
      // 初始化 Typed 实例
      typed.current = new Typed(typedRef.current, {
        strings: typingTexts,
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
      });
    }

    // 清理函数
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  },);

  const sections: Section[] = [
    {
      id: "hero",
      component: (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-bold text-white">P</span>
            </div>
          </motion.div>

          {/* 打字机效果文本 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-100 left-1/2 transform -translate-x-1/2"
          >
            <span
              ref={typedRef}
              className="text-2xl md:text-3xl font-medium text-center"
            />
          </motion.div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-foreground/30 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      ),
    },
    {
      id: "dashboard",
      component: (
        <div className="min-h-screen flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl"
          >
            <Dashboard />
          </motion.div>
        </div>
      ),
    },
    {
      id: "projects",
      component: (
        <div className="min-h-screen flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl"
          >
            <ProjectsAndSkills />
          </motion.div>
        </div>
      ),
    },
  ];

  // 滚动到指定section
  const scrollToSection = (index: number) => {
    if (isScrolling || index === currentSection) return;

    setIsScrolling(true);
    setCurrentSection(index);

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // 处理滚轮事件
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime.current < 1000 || isScrolling) return;

    lastScrollTime.current = now;

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  };

  // 处理触摸事件
  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (diff < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isScrolling) return;

    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        e.preventDefault();
        if (currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        }
        break;
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
        break;
      case "Home":
        e.preventDefault();
        scrollToSection(0);
        break;
      case "End":
        e.preventDefault();
        scrollToSection(sections.length - 1);
        break;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 添加事件监听器
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, isScrolling]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>

      {/* 页面指示器 */}
      <PageIndicator
        totalPages={sections.length}
        currentPage={currentSection}
        onPageChange={scrollToSection}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      />
    </div>
  );
}
