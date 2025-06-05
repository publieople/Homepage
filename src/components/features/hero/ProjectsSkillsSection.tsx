import React from "react";
import { motion } from "framer-motion";

/**
 * 项目经历与技能区块（占位，后续可扩展为项目卡片、技能条等）
 */
export const ProjectsSkillsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="h-screen min-h-[100dvh] flex flex-col items-center justify-center px-2 sm:px-6 md:px-12"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center"
      >
        项目经历与技能区块
      </motion.div>
      {/* 这里后续可插入项目卡片、技能进度条等组件 */}
    </motion.section>
  );
};
