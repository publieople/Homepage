import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HomeIcon, FolderIcon, ExternalLinkIcon, MailIcon } from "lucide-react";
import { DockContainer } from "@/components/ui/dock-container";

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
        "min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950",
        "transition-colors duration-300 ease-in-out",
        className
      )}
    >
      {/* 装饰背景元素 */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

      {/* 模糊导航条 */}
      <DockContainer autoHide={dockAutoHide} className="bottom-8">
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

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-16 pb-32">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          {children}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 py-6 shadow-inner">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} 我的个人主页. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
}
