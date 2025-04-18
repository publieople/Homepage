import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { HomeIcon } from "@/components/ui/icons/home-icon";
import { FolderIcon } from "@/components/ui/icons/folder-icon";
import { ExternalLinkIcon } from "@/components/ui/icons/external-link-icon";
import { MailIcon } from "@/components/ui/icons/mail-icon";
import { MenuIcon } from "@/components/ui/icons/menu-icon";
import { XIcon } from "@/components/ui/icons/x-icon";
import { DockContainer } from "@/components/ui/dock-container";
import { Particles } from "../magicui/particles";
import { ShineBorder } from "../magicui/shine-border";
import { useLanguage } from "@/lib/language-context";

// 定义导航项类型
interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  external?: boolean;
}

interface LayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
  externalBlogUrl?: string;
  dockAutoHide?: boolean;
}

export function Layout({
  children,
  activeSection,
  onSectionChange,
  className,
  externalBlogUrl,
  dockAutoHide = true,
}: LayoutProps) {
  const { t, language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸变化
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 初始检查
    checkScreenSize();

    // 监听窗口尺寸变化
    window.addEventListener("resize", checkScreenSize);

    // 清理监听器
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 关闭移动菜单当窗口变大时
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const navItems: NavItem[] = [
    { key: "home", label: t.navigation.home, icon: HomeIcon },
    { key: "projects", label: t.navigation.projects, icon: FolderIcon },
    ...(externalBlogUrl
      ? [
          {
            key: "blog",
            label: t.navigation.blog,
            external: true,
            icon: ExternalLinkIcon,
          },
        ]
      : []),
    { key: "contact", label: t.navigation.contact, icon: MailIcon },
  ];

  // 处理导航项点击
  const handleItemClick = (item: NavItem) => {
    if (item.external && item.key === "blog" && externalBlogUrl) {
      // 如果是博客外部链接，直接打开
      window.open(externalBlogUrl, "_blank", "noopener,noreferrer");
    } else {
      // 其他情况，调用传入的点击处理函数
      onSectionChange(item.key);
    }

    // 如果移动菜单是打开的，点击后关闭它
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col relative overflow-hidden",
        className
      )}
    >
      {/* 粒子背景效果 - 在移动设备上减少数量 */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={isMobile ? 150 : 300}
        staticity={isMobile ? 50 : 30}
        color={
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "#4B73FF"
            : "#0040FF"
        }
        size={0.8}
      />

      {/* 渐变背景 */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-blue-50/50 via-slate-50/50 to-purple-50/50 dark:from-slate-950/60 dark:via-slate-900/60 dark:to-blue-950/60"></div>

      {/* 装饰背景元素 */}
      <div className="fixed inset-0 -z-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

      {/* 移动设备菜单按钮 */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-md"
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          ) : (
            <MenuIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          )}
        </button>
      )}

      {/* 移动设备导航菜单 */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex justify-end items-start">
          <div className="w-64 h-full bg-white dark:bg-slate-800 p-6 shadow-xl animate-in slide-in-from-right">
            <div className="space-y-6 pt-10">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                    activeSection === item.key
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* 移动菜单中的语言和主题切换 */}
              <div className="flex flex-col items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <LanguageToggle className="shadow-md hover:shadow-lg transition-shadow" />
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-sm">
                    {language === "zh" ? "切换主题" : "Toggle Theme"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主要内容区域 - 调整移动端边距 */}
      <div className="flex-1 flex flex-col relative z-10 m-2 sm:m-4 md:m-8 lg:m-12">
        <div className="relative flex-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <ShineBorder
            borderWidth={3}
            duration={8}
            shineColor={[
              "rgba(56, 189, 248, 0.4)", // 浅蓝色
              "rgba(232, 121, 249, 0.4)", // 粉紫色
              "rgba(59, 130, 246, 0.4)", // 蓝色
            ]}
            className="rounded-2xl sm:rounded-3xl"
          />

          <main className="p-4 sm:p-6 md:p-8 overflow-auto h-full">
            {children}
          </main>
        </div>
      </div>

      {/* 桌面端底部导航栏 */}
      {!isMobile && (
        <DockContainer
          autoHide={dockAutoHide}
          className="bottom-4 sm:bottom-8 z-20"
        >
          <Dock className="border-slate-200/30 dark:border-slate-700/30 shadow-lg backdrop-blur-xl">
            {navItems.map((item) => (
              <DockIcon key={item.key}>
                <button
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center justify-center size-9 rounded-full transition-all duration-300 ${
                    activeSection === item.key
                      ? "text-blue-600 dark:text-blue-400 bg-white/70 dark:bg-black/50 shadow-md"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-black/20"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <item.icon className="size-5" />
                </button>
              </DockIcon>
            ))}
            <DockIcon>
              <LanguageToggle className="shadow-md hover:shadow-lg transition-shadow" />
            </DockIcon>
            <DockIcon>
              <ThemeToggle className="shadow-md hover:shadow-lg transition-shadow" />
            </DockIcon>
          </Dock>
        </DockContainer>
      )}

      {/* 页脚 - 调整底部间距，适应移动设备 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 pb-16 sm:pb-20">
          <p className="pointer-events-auto text-xs sm:text-sm">
            {t.footer.copyright.replace(
              "{year}",
              new Date().getFullYear().toString()
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
