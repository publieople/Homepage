import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HomeIcon, FolderIcon, ExternalLinkIcon, MailIcon } from "lucide-react";
import { DockContainer } from "@/components/ui/dock-container";
import { Particles } from "../magicui/particles";
import { ShineBorder } from "../magicui/shine-border";

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
  const navItems: NavItem[] = [
    { key: "home", label: "首页", icon: HomeIcon },
    { key: "projects", label: "项目", icon: FolderIcon },
    ...(externalBlogUrl
      ? [{ key: "blog", label: "博客", external: true, icon: ExternalLinkIcon }]
      : []),
    { key: "contact", label: "联系", icon: MailIcon },
  ];

  // 处理导航项点击，对于外部链接不同处理
  const handleItemClick = (item: NavItem) => {
    if (item.external && item.key === "blog" && externalBlogUrl) {
      // 如果是博客外部链接，直接打开
      window.open(externalBlogUrl, "_blank", "noopener,noreferrer");
    } else {
      // 其他情况，调用传入的点击处理函数
      onSectionChange(item.key);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col relative overflow-hidden",
        className
      )}
    >
      {/* 粒子背景效果 */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={300}
        staticity={30}
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

      {/* 主要内容区域 - 占满全屏 */}
      <div className="flex-1 flex flex-col relative z-10 m-4 sm:m-8 md:m-12">
        <div className="relative flex-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <ShineBorder
            borderWidth={3}
            duration={8}
            shineColor={[
              "rgba(56, 189, 248, 0.4)", // 浅蓝色
              "rgba(232, 121, 249, 0.4)", // 粉紫色
              "rgba(59, 130, 246, 0.4)", // 蓝色
            ]}
            className="rounded-3xl"
          />

          <main className="p-6 md:p-8 overflow-auto h-full">{children}</main>
        </div>
      </div>

      {/* 模糊导航条 */}
      <DockContainer autoHide={dockAutoHide} className="bottom-8 z-20">
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
            <ThemeToggle className="shadow-md hover:shadow-lg transition-shadow" />
          </DockIcon>
        </Dock>
      </DockContainer>

      {/* 页脚 - 移至固定位置在底部，但在内容框内 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 pb-20">
          <p className="pointer-events-auto">
            © {new Date().getFullYear()} 我的个人主页. 保留所有权利.
          </p>
        </div>
      </div>
    </div>
  );
}
