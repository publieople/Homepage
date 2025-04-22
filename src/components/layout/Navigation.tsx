import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  HomeIcon,
  SquareChartGantt,
  Rss,
  CircleUserRound,
  Mail,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";

type NavItem = {
  icon: LucideIcon;
  path: string;
  labelKey: string;
  external?: boolean;
  externalUrl?: string;
};

const navItems: NavItem[] = [
  { icon: HomeIcon, path: "/", labelKey: "nav.home" },
  { icon: SquareChartGantt, path: "/projects", labelKey: "nav.projects" },
  {
    icon: Rss,
    path: "/blog",
    labelKey: "nav.blog",
    external: true,
    externalUrl: "https://blog.for-people.asia",
  },
  { icon: CircleUserRound, path: "/about", labelKey: "nav.about" },
  { icon: Mail, path: "/contact", labelKey: "nav.contact" },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { toggleLanguage, language } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 处理导航点击
  const handleNavigation = (item: NavItem) => {
    if (item.external && item.externalUrl) {
      // 对于外部链接，直接在新窗口打开
      window.open(item.externalUrl, "_blank");
    } else {
      // 对于内部链接，使用路由导航
      navigate(item.path);
    }
    // 如果菜单是打开的，关闭菜单
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // 移动端菜单
  const MobileMenu = () => (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 菜单面板 */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-zinc-900/95 border-t border-zinc-800 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-200">导航菜单</h2>
          <div className="flex items-center gap-4">
            {/* 移动端语言切换器 */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-zinc-200"
              title={language === "zh" ? t("language.en") : t("language.zh")}
            >
              <Languages size={16} />
              <span>{language === "zh" ? "EN" : "中"}</span>
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 text-zinc-400 hover:text-zinc-200"
              title="关闭菜单"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={cn(
                      "flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-zinc-400 transition-colors",
                      isActive
                        ? "bg-zinc-800/60 text-white"
                        : "hover:bg-zinc-800/40 hover:text-zinc-200"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{t(item.labelKey)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* 桌面端导航 */}
      <Dock className="hidden bg-zinc-900/80 border-zinc-800 backdrop-blur-sm lg:flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <DockIcon
              key={item.path}
              onClick={() => handleNavigation(item)}
              className={cn(
                "bg-zinc-800/50 hover:bg-zinc-700/60 transition-colors",
                isActive && "bg-zinc-700/70 text-white"
              )}
              title={t(item.labelKey)}
            >
              <item.icon
                className={cn("text-zinc-300", isActive && "text-white")}
              />
            </DockIcon>
          );
        })}

        {/* 分隔线 */}
        <div className="h-8 w-px bg-zinc-700/50 mx-1 self-center"></div>

        {/* 桌面端语言切换按钮 */}
        <DockIcon
          onClick={toggleLanguage}
          className="bg-zinc-800/50 hover:bg-zinc-700/60 transition-colors"
          title={language === "zh" ? t("language.en") : t("language.zh")}
        >
          <Languages className="text-zinc-300" />
        </DockIcon>
      </Dock>

      {/* 移动端汉堡菜单按钮 */}
      <button
        onClick={toggleMenu}
        className="flex lg:hidden items-center justify-center w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm text-zinc-400 hover:text-zinc-200 transition-colors z-50"
        title="打开菜单"
      >
        <Menu size={32} />
      </button>

      {/* 仅在菜单打开时渲染移动端菜单 */}
      {isMenuOpen && <MobileMenu />}
    </>
  );
}
