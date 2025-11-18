import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Book, Home, User } from "lucide-react"; // 可替换为 Magic UI 图标
import { GithubIcon } from "@/components/icons/GithubIcon";
import { XIcon } from "@/components/icons/XIcon";
import clsx from "clsx";

// 侧边栏：头像、简介、导航
export const DashboardSidebar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={clsx(
        "flex flex-col items-center gap-6 p-6 bg-background/80 rounded-2xl shadow-lg",
        "backdrop-blur-md border border-border/30 w-full sm:w-64 max-w-xs"
      )}
    >
      {/* 头像 - 添加渐变边框效果 */}
      <div className={clsx(
        "w-24 h-24 rounded-full overflow-hidden shadow-lg p-1",
        "bg-gradient-to-br from-primary/20 to-secondary/20",
        "dark:from-primary/30 dark:to-secondary/30"
      )}>
        <img
          src="/avatar.png"
          alt="avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      {/* 简介 */}
      <div className="text-center">
        <div className="font-bold text-lg text-foreground">
          {t("dashboard.name", "人民公仆")}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {t("dashboard.bio", "在校大学生")}
        </div>
      </div>
      {/* 导航链接 */}
      <nav className="flex flex-col gap-3 w-full mt-2">
        <SidebarNavLink
          icon={<Home size={18} />}
          label={t("nav.home", "首页")}
          href="#home"
        />
        <SidebarNavLink
          icon={<User size={18} />}
          label={t("nav.about", "关于")}
          href="#about"
        />
        <SidebarNavLink
          icon={<Book size={18} />}
          label={t("nav.blog", "博客")}
          href="https://blog.for-people.cn"
        />
        <SidebarNavLink
          icon={<GithubIcon size={18} />}
          label="GitHub"
          href="https://github.com/publieople"
          external
        />
        <SidebarNavLink
          icon={<XIcon size={18} />}
          label="Twitter"
          href="https://twitter.com/publieople"
          external
        />
      </nav>
    </motion.aside>
  );
};

interface SidebarNavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  icon,
  label,
  href,
  external,
}) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={clsx(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
      "hover:bg-primary/15 hover:text-primary text-foreground",
      "min-h-[48px]", // 增大触摸目标
      "bg-card/40 hover:bg-primary/20",
      "dark:bg-card/30 dark:hover:bg-primary/25"
    )}
  >
    <span className="transition-transform group-hover:scale-110">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </a>
);
