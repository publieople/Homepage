"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, Gauge, Folder } from "lucide-react";

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
  // 图标与提示映射
  const icons = [Home, Gauge, Folder];
  const tooltips = ["首页", "仪表盘", "项目与技能"];
  return (
    <div
      className={cn(
        "fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-4 md:space-y-3",
        className
      )}
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index === currentPage;
        const Icon = icons[index] || Folder;
        return (
          <motion.button
            key={index}
            onClick={() => onPageChange(index)}
            className={cn(
              "relative flex items-center justify-center w-9 h-9 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 group focus:outline-none",
              isActive
                ? "bg-primary border-primary shadow-lg" // 激活时主色
                : "bg-zinc-900/80 dark:bg-zinc-100/80 border-muted-foreground/60 hover:border-muted-foreground dark:border-muted-foreground/50 dark:hover:border-muted-foreground/80" // 亮色黑/暗色亮灰（暗色更亮）
            )}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.92 }}
            initial={false}
            animate={{ scale: isActive ? 1.15 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            aria-label={tooltips[index]}
          >
            <motion.span
              className={cn(
                "transition-colors duration-300 absolute inset-0 flex items-center justify-center",
                isActive
                  ? "text-white/95" // 激活时更亮的白色
                  : "text-white/60" // 非激活时较暗的白色
              )}
              animate={{ scale: isActive ? 1.18 : 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon size={22} />
            </motion.span>
            {/* 悬停时平滑变为文字 */}
            <motion.span
              className={cn(
                "transition-all duration-300 absolute inset-0 flex items-center justify-center text-xs font-medium px-2 py-1 rounded select-none backdrop-blur-sm",
                isActive
                  ? "text-primary-foreground bg-primary/20"
                  : "text-muted-foreground bg-muted/50 dark:bg-muted/30"
              )}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              whileHover={{ opacity: 1, scale: 1.08, y: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{ pointerEvents: 'none' }}
            >
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
