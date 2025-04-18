import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "../magicui/dock";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface LayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
  externalBlogUrl?: string;
}

export function Layout({
  children,
  activeSection,
  onSectionChange,
  className,
  externalBlogUrl,
}: LayoutProps) {
  const navItems = [
    { key: "home", label: "首页" },
    { key: "projects", label: "项目" },
    ...(externalBlogUrl
      ? [{ key: "blog", label: "博客", external: true }]
      : []),
    { key: "contact", label: "联系" },
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
      <div className="fixed bottom-8 left-0 right-0 z-50 mx-auto flex justify-center">
        <Dock>
          {navItems.map((item) => (
            <DockIcon key={item.key}>
              <button
                className={`text-sm font-medium transition-colors rounded-full p-2 ${
                  activeSection === item.key
                    ? "text-blue-600 dark:text-blue-400 bg-white/50 dark:bg-black/30"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                } ${item.external ? "flex items-center gap-1" : ""}`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
                {item.external && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                )}
              </button>
            </DockIcon>
          ))}
          <DockIcon>
            <ThemeToggle />
          </DockIcon>
        </Dock>
      </div>

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
