import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HomeIcon, FolderIcon, ExternalLinkIcon, MailIcon } from "lucide-react";
import { DockContainer } from "@/components/ui/dock-container";

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
  const navItems = [
    { key: "home", label: "首页", icon: HomeIcon },
    { key: "projects", label: "项目", icon: FolderIcon },
    ...(externalBlogUrl
      ? [{ key: "blog", label: "博客", external: true, icon: ExternalLinkIcon }]
      : []),
    { key: "contact", label: "联系", icon: MailIcon },
  ];

  // 处理导航项点击，对于外部链接不同处理
  const handleItemClick = (item: any) => {
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
        "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        className
      )}
    >
      <DockContainer autoHide={dockAutoHide} className="bottom-8">
        <Dock>
          {navItems.map((item) => (
            <DockIcon key={item.key}>
              <button
                title={item.label}
                aria-label={item.label}
                className={`flex items-center justify-center size-9 rounded-full transition-colors ${
                  activeSection === item.key
                    ? "text-blue-600 dark:text-blue-400 bg-white/50 dark:bg-black/30"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                }`}
                onClick={() => handleItemClick(item)}
              >
                <item.icon className="size-5" />
              </button>
            </DockIcon>
          ))}
          <DockIcon>
            <ThemeToggle />
          </DockIcon>
        </Dock>
      </DockContainer>

      <main className="container mx-auto px-4 py-16 pb-32">{children}</main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} 我的个人主页. 保留所有权利.</p>
          {externalBlogUrl && (
            <p className="mt-2">
              <a
                href={externalBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                访问我的博客
              </a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
