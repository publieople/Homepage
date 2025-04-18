import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

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

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        className
      )}
    >
      <Navbar
        items={navItems}
        activeItem={activeSection}
        onItemClick={onSectionChange}
        externalBlogUrl={externalBlogUrl}
      />

      <main className="container mx-auto px-4 pt-24 pb-16">{children}</main>

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
