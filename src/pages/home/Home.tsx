import { HeroSection } from "@/components/features/hero/HeroSection";
import { DashboardSection } from "@/components/features/hero/DashboardSection";
import { ProjectsSkillsSection } from "@/components/features/hero/ProjectsSkillsSection";
import { PageIndicator } from "@/components/features/hero/PageIndicator";
import { ScrollDownIndicator } from "@/components/magicui/scroll-down-indicator";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Home() {
  const sectionRef0 = useRef<HTMLDivElement>(null);
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRefs = useMemo(
    () => [sectionRef0, sectionRef1, sectionRef2],
    []
  );
  const [current, setCurrent] = useState(0);

  // 统一的滚动管理器
  const scrollToSection = useCallback(
    (idx: number) => {
      sectionRefs[idx].current?.scrollIntoView({
        behavior: "smooth",
        block: "center" // 滚动到视口中心，而不是顶部
      });
      setCurrent(idx);
    },
    [sectionRefs]
  );

  // 滚动节流控制
  const [isScrolling, setIsScrolling] = useState(false);

  // 统一的滚动事件处理器
  const handleNavigation = useCallback((direction: 'up' | 'down') => {
    if (isScrolling) return;

    setIsScrolling(true);

    if (direction === 'down' && current < 2) {
      scrollToSection(current + 1);
    } else if (direction === 'up' && current > 0) {
      scrollToSection(current - 1);
    }

    // 800ms 的滚动冷却时间，防止用户快速滚动略过多个页面
    setTimeout(() => setIsScrolling(false), 800);
  }, [current, scrollToSection, isScrolling]);

  // 监听滚轮事件
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 40) return; // 忽略小幅度滚动

      const direction = e.deltaY > 0 ? 'down' : 'up';
      handleNavigation(direction);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [handleNavigation]);

  // 键盘方向键支持
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        handleNavigation('down');
      } else if (e.key === "ArrowUp") {
        handleNavigation('up');
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNavigation]);

  // 触摸滑动支持（移动端）
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;

      if (Math.abs(deltaY) < 40) return; // 忽略小幅度滑动

      const direction = deltaY < 0 ? 'down' : 'up';
      handleNavigation(direction);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleNavigation]);

  // 监听滚动，自动高亮指示器
  useEffect(() => {
    const onScroll = () => {
      const offsets = sectionRefs.map(
        (ref) => ref.current?.getBoundingClientRect().top || 0
      );
      const idx = offsets.findIndex(
        (offset) => Math.abs(offset) < window.innerHeight / 2
      );
      if (idx !== -1 && idx !== current) setCurrent(idx);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [current, sectionRefs]);

  // 隐藏滚动条
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";
    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
    };
  }, []);
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {current === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            ref={sectionRefs[0]}
            className="h-screen w-full flex justify-center items-center px-2 sm:px-0"
          >
            <HeroSection />
          </motion.div>
        )}
        {current === 1 && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            ref={sectionRefs[1]}
            className="h-screen w-full flex items-center justify-center px-2 sm:px-0"
          >
            <DashboardSection />
          </motion.div>
        )}
        {current === 2 && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            ref={sectionRefs[2]}
            className="h-screen w-full flex items-center justify-center px-2 sm:px-0"
          >
            <ProjectsSkillsSection />
          </motion.div>
        )}
      </AnimatePresence>
      {/* PageIndicator 响应式隐藏/缩放 */}
      <div className="block sm:block md:block lg:block xl:block 2xl:block fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50">
        <PageIndicator
        totalPages={3}
        currentPage={current}
        onPageChange={scrollToSection}
      />{" "}
      </div>
      {/* 滑动提示，始终显示在底部中央，避免被裁剪 */}
      <AnimatePresence>
        {current === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 1.8 } }}
            exit={{ opacity: 0, y: 32, transition: { duration: 0.7, ease: "easeOut", delay: 0 } }}
            className="absolute left-1/2 bottom-[20vh] -translate-x-1/2 z-50 pointer-events-none"
          >
            <ScrollDownIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
