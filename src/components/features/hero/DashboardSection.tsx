import React from "react";
import { motion } from "framer-motion";

/**
 * 仪表盘区块（占位，后续可扩展为时间、天气、外链等）
 */
export const DashboardSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-2xl sm:text-4xl font-semibold text-foreground mb-4"
      >
        仪表盘区块
      </motion.div>
      {/* 这里后续可插入时间、天气、外链等仪表盘组件 */}
    </motion.section>
  );
};
