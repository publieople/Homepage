import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  key: string;
  external?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  activeItem: string;
  onItemClick: (key: string) => void;
  className?: string;
  externalBlogUrl?: string;
}

export function Navbar({
  items,
  activeItem,
  onItemClick,
  className,
  externalBlogUrl,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 处理导航项点击，对于外部链接不同处理
  const handleItemClick = (item: NavItem) => {
    if (item.external && item.key === "blog" && externalBlogUrl) {
      // 如果是博客外部链接，直接打开
      window.open(externalBlogUrl, "_blank", "noopener,noreferrer");
    } else {
      // 其他情况，调用传入的点击处理函数
      onItemClick(item.key);
    }

    // 在移动设备上点击后自动关闭菜单
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800",
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold">我的主页</span>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex space-x-6">
          {items.map((item) => (
            <button
              key={item.key}
              className={`text-sm font-medium transition-colors ${
                activeItem === item.key
                  ? "text-blue-600 dark:text-blue-400"
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
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              {items.map((item) => (
                <button
                  key={item.key}
                  className={`text-sm font-medium transition-colors text-left ${
                    activeItem === item.key
                      ? "text-blue-600 dark:text-blue-400"
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
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
