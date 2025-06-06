import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
    <div className="relative flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-8 select-none overflow-hidden">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center w-full max-w-xl z-10 h-full"
      >
        <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
          <div className="flex flex-col items-center gap-4 py-6 px-3 sm:py-8 sm:px-6 md:px-8 bg-background/80 rounded-2xl w-full max-w-md sm:max-w-xl">
            <div className="relative mb-4 w-full flex items-end justify-center">
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-0">
                <ShineBorder
                  borderWidth={2}
                  duration={10}
                  shineColor={["#8B5CF6AA", "#FE8BBBAA"]}
                  className="rounded-full size-20 sm:size-28 opacity-60"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center w-full">
                <TextAnimate
                  animation="slideUp"
                  className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 text-center"
                  as="h1"
                >
                  For the people
                </TextAnimate>
                <div className="flex justify-center w-full">
                  <span
                    ref={el}
                    className="text-base sm:text-xl md:text-2xl text-foreground/80 whitespace-nowrap text-center"
                  ></span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full mt-1">
              <AuroraText
                className="block text-lg sm:text-2xl md:text-3xl tracking-tight leading-none select-text"
                colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
                speed={1.5}
              >
                ────────
              </AuroraText>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
