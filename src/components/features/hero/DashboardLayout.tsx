import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardMain: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// 仪表盘整体布局 - 响应式重构
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className={`
        w-full h-full flex flex-col
        ${isMobile ? "gap-4" : "sm:flex-row sm:items-start sm:justify-center sm:gap-8"}
      `}
    >
      <DashboardSidebar />
      <div className={`
        flex-1 flex items-center justify-center
        ${isMobile ? "min-h-[400px]" : "sm:min-h-[600px]"}
        ${!isMobile ? "sm:ml-4" : ""} // 桌面端添加左边距
      `}>
        {children}
      </div>
    </section>
  );
};
