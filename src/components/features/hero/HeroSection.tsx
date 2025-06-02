import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import logo from "@/assets/react.svg"; // 可替换为你的Logo
import { ShineBorder } from "@/components/magicui/shine-border";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AuroraText } from "@/components/magicui/aurora-text";

/**
 * 首页Hero区：Logo+打字机文本
 * 支持i18n和亮暗色模式
 */
export const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          t("home.hero.typed1"),
          t("home.hero.typed2"),
          t("home.hero.typed3"),
          t("home.hero.typed4"),
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        loop: false,
        showCursor: true,
        smartBackspace: true,
      });
    }
    return () => {
      typed.current?.destroy();
    };
  }, [i18n.language, t]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative h-screen flex flex-col items-center justify-center select-none overflow-hidden px-4"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
        <div className="flex flex-col items-center gap-4 py-10 px-6 sm:px-12 bg-background/80 rounded-2xl">
          <div className="relative mb-4">
            <ShineBorder
              borderWidth={2}
              duration={10}
              shineColor={["#8B5CF6", "#FE8BBB"]}
              className="rounded-full size-28"
            />
            <img
              src={logo}
              alt="Logo"
              className="w-24 h-24 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
            />
          </div>
          <TextAnimate
            animation="slideUp"
            className="text-3xl sm:text-5xl font-bold text-foreground mb-2 text-center"
            as="h1"
          >
            For-people
          </TextAnimate>
          {/* 打字机文本，外层用 flex 居中，span 只保留必要样式 */}
          <div className="flex justify-center w-full">
            <span
              ref={el}
              className="text-xl sm:text-2xl text-foreground/80 whitespace-nowrap text-center"
            ></span>
          </div>
          {/* AuroraText 渐变下划线装饰 */}
          <div className="flex justify-center w-full mt-1">
            <AuroraText
              className="block text-2xl sm:text-3xl tracking-tight leading-none select-text"
              colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.5}
            >
              ────────
            </AuroraText>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
