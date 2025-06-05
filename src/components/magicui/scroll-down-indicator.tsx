import React from "react";
import { useTranslation } from "react-i18next";

/**
 * 向下滑动提示组件，支持i18n、亮暗色和响应式
 */
export const ScrollDownIndicator: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className = "", ...props }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col items-center absolute left-1/2 z-20 select-none
        bottom-16 sm:bottom-12 md:bottom-10 pb-[env(safe-area-inset-bottom)]
        pointer-events-none
        ${className}`}
      style={{
        // 兼容性处理，防止被底部 dock 遮挡
        width: 'max-content',
      }}
      {...props}
    >
      <div className="animate-bounce mb-1">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto text-foreground/70 dark:text-foreground/60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xs sm:text-sm text-foreground/60 dark:text-foreground/50 tracking-wide">
        {t("home.hero.scrollDown")}
      </span>
    </div>
  );
};

export default ScrollDownIndicator;
