import { useState } from "react";
import { SunMoon, Languages, Menu } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  SquareChartGantt,
  Rss,
  CircleUserRound,
  Mail,
} from "lucide-react";
import { createPortal } from "react-dom";

export function MobileBottomBar() {
  const { toggleTheme, isDark } = useTheme();
  const { toggleLanguage, language } = useLanguage();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-t border-zinc-800 backdrop-blur-md">
      {/* 左侧品牌（中英文切换） */}
      <div className="font-bold text-lg text-zinc-100 tracking-wide select-none">
        {language === "zh" ? "人民公仆" : "Publieople"}
      </div>
      {/* 右侧按钮组 */}
      <div className="flex items-center gap-2">
        {/* 亮暗色切换 */}
        <motion.button
          whileTap={{ scale: 0.85, rotate: 20 }}
          onClick={toggleTheme}
          className="rounded-full p-2 bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-200 transition-colors"
          title={t("theme.toggle")}
        >
          <SunMoon
            size={22}
            className={isDark ? "text-yellow-300" : "text-zinc-400"}
          />
        </motion.button>
        {/* 中英文切换 */}
        <motion.button
          whileTap={{ scale: 0.85, rotate: -20 }}
          onClick={toggleLanguage}
          className="rounded-full p-2 bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-200 transition-colors"
          title={language === "zh" ? t("language.en") : t("language.zh")}
        >
          <Languages size={22} className="text-zinc-400" />
        </motion.button>
        {/* 导航菜单按钮 */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setMenuOpen(true)}
          className="rounded-full p-2 bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-200 transition-colors"
          title={t("nav.menu")}
        >
          <Menu size={22} className="text-zinc-400" />
        </motion.button>
      </div>
      {/* 底部弹出菜单 */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 bottom-0 w-full z-[9999]"
              >
                {/* 遮罩 */}
                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                  onClick={() => setMenuOpen(false)}
                />
                {/* 菜单内容 */}
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 80 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative z-50 bg-zinc-900/95 border-t border-zinc-800 rounded-t-2xl shadow-xl p-6"
                >
                  {/* 菜单内容可自定义，这里仅作示例 */}
                  <div className="flex flex-col gap-4">
                    <div className="text-center text-lg font-semibold text-zinc-100 mb-2">
                      {t("nav.menu")}
                    </div>
                    {/* 菜单内容：导航项 */}
                    <div className="flex flex-col gap-3">
                      <button
                        className="w-full flex items-center gap-3 py-3 rounded-lg bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80 transition-colors text-base font-medium"
                        onClick={() => {
                          window.location.href = "/";
                          setMenuOpen(false);
                        }}
                      >
                        <HomeIcon size={20} className="text-zinc-400" />
                        {t("nav.home")}
                      </button>
                      <button
                        className="w-full flex items-center gap-3 py-3 rounded-lg bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80 transition-colors text-base font-medium"
                        onClick={() => {
                          window.location.href = "/projects";
                          setMenuOpen(false);
                        }}
                      >
                        <SquareChartGantt size={20} className="text-zinc-400" />
                        {t("nav.projects")}
                      </button>
                      <button
                        className="w-full flex items-center gap-3 py-3 rounded-lg bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80 transition-colors text-base font-medium"
                        onClick={() => {
                          window.open("https://blog.for-people.cn", "_blank");
                          setMenuOpen(false);
                        }}
                      >
                        <Rss size={20} className="text-zinc-400" />
                        {t("nav.blog")}
                      </button>
                      <button
                        className="w-full flex items-center gap-3 py-3 rounded-lg bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80 transition-colors text-base font-medium"
                        onClick={() => {
                          window.location.href = "/about";
                          setMenuOpen(false);
                        }}
                      >
                        <CircleUserRound size={20} className="text-zinc-400" />
                        {t("nav.about")}
                      </button>
                      <button
                        className="w-full flex items-center gap-3 py-3 rounded-lg bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80 transition-colors text-base font-medium"
                        onClick={() => {
                          window.location.href = "/contact";
                          setMenuOpen(false);
                        }}
                      >
                        <Mail size={20} className="text-zinc-400" />
                        {t("nav.contact")}
                      </button>
                      <button
                        className="w-full py-3 rounded-lg bg-zinc-700/80 text-zinc-100 hover:bg-zinc-800/60 transition-colors text-base font-medium mt-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        {t("nav.close")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.getElementById("menu-portal")!
        )}
    </div>
  );
}
