import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import logo from "@/assets/react.svg"; // 可替换为你的Logo

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
      className="h-screen flex flex-col items-center justify-center select-none"
    >
      <img src={logo} alt="Logo" className="w-24 h-24 mb-8 drop-shadow-lg" />
      <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 transition-colors">
        For-people
      </h1>
      <span
        ref={el}
        className="text-xl sm:text-2xl text-foreground/80 min-h-[2.5em] block"
      />
    </motion.section>
  );
};
