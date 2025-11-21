import React from "react";
import { motion } from "framer-motion";
import { DashboardRightContent } from "./DashboardRightContent";

/**
 * 仪表盘区块
 */
export const DashboardSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center w-full max-w-6xl z-10"
    >
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl w-full p-4 sm:p-6">
        <DashboardRightContent />
      </div>
    </motion.section>
  );
};
