import React from "react";
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

// 仪表盘整体布局
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="w-full h-full flex flex-col sm:flex-row items-stretch justify-center gap-6">
      <DashboardSidebar />
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        {children}
      </div>
    </section>
  );
};
