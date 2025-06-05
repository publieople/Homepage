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
  // 滚动到指定section
  const scrollToSection = useCallback(
    (idx: number) => {
      sectionRefs[idx].current?.scrollIntoView({ behavior: "smooth" });
      setCurrent(idx);
    },
    [sectionRefs]
  );
  // 监听滚轮事件，实现全屏切换
  useEffect(() => {
    let ticking = false;
    const onWheel = (e: WheelEvent) => {
      if (ticking) return;
      ticking = true;
      setTimeout(() => (ticking = false), 1500); // 节流，防止多次触发
      if (e.deltaY > 40 && current < 2) {
        scrollToSection(current + 1);
      } else if (e.deltaY < -40 && current > 0) {
        scrollToSection(current - 1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, scrollToSection]);
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
  // 键盘方向键支持
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && current < 2) {
        scrollToSection(current + 1);
      } else if (e.key === "ArrowUp" && current > 0) {
        scrollToSection(current - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, scrollToSection]);

  // 触摸滑动支持（移动端）
  useEffect(() => {
    let startY = 0;
    let endY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;
      if (deltaY < -40 && current < 2) {
        scrollToSection(current + 1);
      } else if (deltaY > 40 && current > 0) {
        scrollToSection(current - 1);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [current, scrollToSection]);
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
            className="h-screen w-full flex justify-center items-center px-2 sm:px-0 relative"
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
        <PageIndicator current={current} onDotClick={scrollToSection} />
      </div>
      {/* 滑动提示，始终显示在底部中央，避免被裁剪 */}
      <AnimatePresence>
        {current === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 1.8 } }}
            exit={{ opacity: 0, y: 32, transition: { duration: 0.7, ease: "easeOut", delay: 0 } }}
            className="absolute left-1/2 bottom-40 -translate-x-1/2 z-50 pointer-events-none"
          >
            <ScrollDownIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
