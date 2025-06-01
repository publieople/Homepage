"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PageIndicatorProps {
  /**
   * 总页面数
   */
  totalPages: number;
  /**
   * 当前页面索引（从0开始）
   */
  currentPage: number;
  /**
   * 点击页面指示器的回调
   */
  onPageChange: (pageIndex: number) => void;
  /**
   * 样式类名
   */
  className?: string;
}

/**
 * 页面指示器组件
 * 显示三点式页面导航，支持点击切换页面
 */
export function PageIndicator({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PageIndicatorProps) {
  return (
    <div
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-3",
        className
      )}
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index === currentPage;
        return (
          <motion.button
            key={index}
            onClick={() => onPageChange(index)}
            className={cn(
              "relative w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125",
              isActive
                ? "bg-foreground border-foreground"
                : "bg-transparent border-foreground/40 hover:border-foreground/70"
            )}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            initial={false}
            animate={{
              scale: isActive ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {/* 活跃状态的内部圆点 */}
            {isActive && (
              <motion.div
                className="absolute inset-1 bg-background rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
            )}

            {/* 悬停提示 */}
            <motion.div
              className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {index === 0 && "首页"}
              {index === 1 && "仪表盘"}
              {index === 2 && "项目与技能"}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
