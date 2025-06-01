import { HeroSection } from "@/components/features/hero/HeroSection";
import { DashboardSection } from "@/components/features/hero/DashboardSection";
import { ProjectsSkillsSection } from "@/components/features/hero/ProjectsSkillsSection";
import { PageIndicator } from "@/components/features/hero/PageIndicator";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

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
      setTimeout(() => (ticking = false), 800); // 节流，防止多次触发
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
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={sectionRefs[0]} className="h-screen w-full">
        <HeroSection />
      </div>
      <div ref={sectionRefs[1]} className="h-screen w-full">
        <DashboardSection />
      </div>
      <div ref={sectionRefs[2]} className="h-screen w-full">
        <ProjectsSkillsSection />
      </div>
      <PageIndicator current={current} onDotClick={scrollToSection} />
    </div>
  );
}
