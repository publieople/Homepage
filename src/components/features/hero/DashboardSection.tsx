import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DashboardLayout, DashboardMain } from "./DashboardLayout";
import { DashboardRightContent } from "./DashboardRightContent";

/**
 * 仪表盘区块（占位，后续可扩展为时间、天气、外链等）
 */
export const DashboardSection: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  // 监听滚动，生成视差动画参数
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <DashboardLayout>
      <DashboardMain>
        <motion.section
          ref={parallaxRef}
          style={{ y, scale, opacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-screen min-h-[100dvh] flex flex-col items-center justify-center px-2 sm:px-6 md:px-12"
        >
          <DashboardRightContent />
        </motion.section>
      </DashboardMain>
    </DashboardLayout>
  );
};
