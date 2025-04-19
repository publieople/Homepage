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
            ? "#aaaaaa"
            : "#333333"
        }
        size={0.8}
      />

      {/* 渐变背景 */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#fafafa]/50 via-[#f5f5f5]/50 to-[#f0f0f0]/50 dark:from-[#121212]/60 dark:via-[#161616]/60 dark:to-[#1a1a1a]/60"></div>

      {/* 装饰背景元素 */}
      <div className="fixed inset-0 -z-30 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] dark:bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

      {/* 移动设备菜单按钮 */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-background/70 dark:bg-card/70 backdrop-blur-sm rounded-lg shadow-md"
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6 text-foreground" />
          ) : (
            <MenuIcon className="w-6 h-6 text-foreground" />
          )}
        </button>
      )}

      {/* 移动设备导航菜单 */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/50 dark:bg-card/50 backdrop-blur-sm flex justify-end items-start">
          <div className="w-64 h-full bg-card text-card-foreground p-6 shadow-xl animate-in slide-in-from-right">
            <div className="space-y-6 pt-10">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                    activeSection === item.key
                      ? "bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground"
                      : "hover:bg-muted dark:hover:bg-muted hover:text-muted-foreground dark:hover:text-muted-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* 移动菜单中的语言和主题切换 */}
              <div className="flex flex-col items-start gap-4 pt-4 border-t border-border">
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
        <div className="relative flex-1 bg-background/40 dark:bg-card/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-border/50 overflow-hidden">
          <ShineBorder
            borderWidth={3}
            duration={8}
            shineColor={[
              "rgba(150, 150, 150, 0.4)", // 浅灰色
              "rgba(100, 100, 100, 0.4)", // 中灰色
              "rgba(50, 50, 50, 0.4)", // 深灰色
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
          <Dock className="border-border/30 shadow-lg backdrop-blur-xl">
            {navItems.map((item) => (
              <DockIcon key={item.key}>
                <button
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center justify-center size-9 rounded-full transition-all duration-300 ${
                    activeSection === item.key
                      ? "text-primary-foreground bg-primary shadow-md"
                      : "text-foreground/80 hover:text-primary dark:text-foreground/80 dark:hover:text-primary hover:bg-muted dark:hover:bg-muted"
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
        <div className="container mx-auto px-4 text-center text-muted-foreground pb-16 sm:pb-20">
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
