import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Github,
  Twitter,
  Book,
  Globe,
  CloudSun,
  MapPin,
  RefreshCw,
  ExternalLink,
  Link2,
} from "lucide-react";

// 时间/日期组件
const TimeDisplay: React.FC = () => {
  const { i18n } = useTranslation();
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-2 text-xl font-semibold text-foreground"
    >
      <CloudSun size={20} className="text-primary" />
      {now.toLocaleTimeString(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
      <span className="text-sm text-muted-foreground ml-2">
        {now.toLocaleDateString(i18n.language)}
      </span>
    </motion.div>
  );
};

// 位置组件（占位）
const LocationDisplay: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    className="flex items-center gap-2 text-base text-muted-foreground"
  >
    <MapPin size={18} className="text-primary" />
    <span>中国 · 北京</span>
  </motion.div>
);

// 天气组件（API占位，可扩展）
const WeatherDisplay: React.FC = () => {
  // 预留API集成，现为静态占位
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="flex items-center gap-2 text-base text-muted-foreground"
    >
      <CloudSun size={18} className="text-primary animate-spin-slow" />
      <span>晴 25°C</span>
      <span className="text-xs text-muted-foreground ml-2">(API占位)</span>
    </motion.div>
  );
};

// 一言组件（支持刷新、动画，预留增删改查）
const Hitokoto: React.FC = () => {
  const { t } = useTranslation();
  const [quote, setQuote] = useState("生活不止眼前的苟且，还有诗和远方。");
  const [loading, setLoading] = useState(false);
  // 刷新一言（模拟API）
  const refresh = async () => {
    setLoading(true);
    setTimeout(() => {
      setQuote("世界很大，梦想更大。"); // 可替换为真实API
      setLoading(false);
    }, 800);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="relative text-lg font-medium text-foreground px-4 py-2 rounded-xl bg-background/70 shadow border border-border/20 mt-2 flex items-center"
    >
      <span className="magicui-typing-animation">
        “{t("dashboard.hitokoto", quote)}”
      </span>
      <button
        className="ml-2 p-1 rounded hover:bg-primary/10 transition-colors"
        onClick={refresh}
        aria-label="刷新一言"
        disabled={loading}
      >
        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
      </button>
    </motion.div>
  );
};

// 社交/外链（含悬停提示/预览）
const socialLinks = [
  {
    icon: <Github size={22} />,
    label: "GitHub",
    href: "https://github.com/publieople",
    preview: "https://github.com/publieople",
  },
  {
    icon: <Twitter size={22} />,
    label: "Twitter",
    href: "https://x.com/publieople",
    preview: "https://x.com/publieople",
  },
  {
    icon: <Book size={22} />,
    label: "Blog",
    href: "https://blog.for-people.cn",
    preview: "https://blog.for-people.cn",
  },
  { icon: <Globe size={22} />, label: "主页", href: "#", preview: "#" },
  {
    icon: <ExternalLink size={22} />,
    label: "Notion",
    href: "https://notion.so/",
    preview: "https://notion.so/",
  },
];
const SocialLinks: React.FC = () => (
  <div className="flex gap-4 mt-4 flex-wrap justify-center">
    {socialLinks.map((item) => (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={item.label}
        className="group relative hover:text-primary transition-colors"
      >
        {item.icon}
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs rounded bg-background/90 text-foreground shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-10 whitespace-nowrap">
          {item.label}
        </span>
      </a>
    ))}
  </div>
);

// 快捷入口（如博客/GitHub等，带动画）
const QuickLinks: React.FC = () => (
  <div className="flex gap-3 mt-2 flex-wrap justify-center">
    <a
      href="https://github.com/publieople"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all"
    >
      <Github size={16} /> GitHub <ExternalLink size={14} />
    </a>
    <a
      href="https://blog.for-people.cn"
      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all"
    >
      <Book size={16} /> Blog <ExternalLink size={14} />
    </a>
    <a
      href="https://notion.so/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all"
    >
      <Link2 size={16} /> Notion <ExternalLink size={14} />
    </a>
  </div>
);

export const DashboardRightContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
      <TimeDisplay />
      <LocationDisplay />
      <WeatherDisplay />
      <Hitokoto />
      <SocialLinks />
      <QuickLinks />
    </div>
  );
};
