import React from "react";
import { motion } from "framer-motion";

/**
 * 项目经历与技能区块
 */
export const ProjectsSkillsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center w-full max-w-4xl z-10"
    >
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl w-full p-8 sm:p-12">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-center"
        >
          Projects & Skills
        </motion.div>
        <div className="text-center text-foreground/70">
          <p>
            (Content for projects and skills will be added here.)
          </p>
        </div>
      </div>
    </motion.section>
  );
};
