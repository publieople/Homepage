import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center justify-center w-full max-w-2xl z-10"
      >
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-6 py-10 px-6 sm:px-10 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl w-full">
            
            <div className="relative z-10 flex flex-col items-center w-full space-y-4">
              <TextAnimate
                animation="blurInUp"
                by="character"
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
                as="h1"
                once={false}
                startOnView={false}
              >
                For the people
              </TextAnimate>
              
              <div className="flex justify-center w-full h-8 sm:h-10">
                <span
                  ref={el}
                  className="text-lg sm:text-2xl md:text-3xl font-medium text-foreground/80 whitespace-nowrap text-center"
                ></span>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-2" />

            <div className="flex justify-center w-full">
              <AuroraText
                className="text-xl sm:text-3xl font-light tracking-[0.2em] opacity-80"
                colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
                speed={1.5}
              >
                DESIGN & CODE
              </AuroraText>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
