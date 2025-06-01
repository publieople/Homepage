import { HeroSection } from "@/components/features/hero/HeroSection";
import { DashboardSection } from "@/components/features/hero/DashboardSection";
import { ProjectsSkillsSection } from "@/components/features/hero/ProjectsSkillsSection";
import { PageIndicator } from "@/components/features/hero/PageIndicator";
import React, { useRef, useState, useEffect } from "react";

export function Home() {
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [current, setCurrent] = useState(0);
  // 滚动到指定section
  const scrollToSection = (idx: number) => {
    sectionRefs[idx].current?.scrollIntoView({ behavior: "smooth" });
    setCurrent(idx);
  };
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
  }, [current]);
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
  }, [current]);
  // 隐藏滚动条
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";
    document.body.style.msOverflowStyle = "none";
    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
      document.body.style.msOverflowStyle = "";
    };
  }, []);
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
