import React from "react";

/**
 * 侧边三点式页面指示器
 * @param current 当前激活页索引
 * @param onDotClick 点击切换页面
 */
export const PageIndicator: React.FC<{
  current: number;
  onDotClick: (idx: number) => void;
}> = ({ current, onDotClick }) => {
  return (
    <div className="hidden xs:flex sm:flex md:flex fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 sm:gap-4 select-none">
      {[0, 1, 2].map((idx) => (
        <button
          key={idx}
          aria-label={`Go to page ${idx + 1}`}
          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300
            ${
              current === idx
                ? "bg-primary border-primary scale-110 sm:scale-125 shadow-lg"
                : "bg-background/60 border-border"
            }
            hover:scale-105 sm:hover:scale-110 focus:outline-none`}
          onClick={() => onDotClick(idx)}
        />
      ))}
    </div>
  );
};
