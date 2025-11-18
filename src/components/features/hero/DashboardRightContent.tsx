import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useCachedState } from "@/hooks/useCachedState";
import { quotes, Quote } from "@/lib/quotes";
import { AnimatePresence } from "framer-motion";
import {
  Book,
  Globe,
  CloudSun,
  CalendarClock,
  MapPin,
  RefreshCw,
  ExternalLink,
  Quote as QuoteIcon,
  AlertCircle,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { XIcon } from "@/components/icons/XIcon";

// 统一的卡片样式 - 适配新配色方案
const cardBase = "rounded-xl backdrop-blur-md transition-all duration-300";
const cardHover = "hover:shadow-xl hover:border-primary/40";
const cardPadding = "p-4 sm:p-6";

// 主卡片 - 高透明度玻璃效果
const primaryCard = `${cardBase} ${cardHover} ${cardPadding} bg-card/80 border border-border shadow-lg`;

// 特色卡片 - 渐变玻璃效果
const featuredCard = `${cardBase} ${cardHover} ${cardPadding} bg-gradient-to-br from-primary/10 via-card/70 to-secondary/10 border-primary/30 shadow-xl`;

// 次要卡片 - 中等透明度玻璃效果
const secondaryCard = `${cardBase} ${cardHover} ${cardPadding} bg-card/60 border border-border/50 shadow-md`;

// 加载骨架屏组件
const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

// 错误状态组件
const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-destructive text-sm flex items-center gap-2">
    <AlertCircle size={16} />
    {message}
  </div>
);

// 时间/日期组件 - 优化样式和加载状态
const TimeDisplay: React.FC = () => {
  const { i18n } = useTranslation();
  const [now, setNow] = React.useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    setIsLoading(false);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={primaryCard}>
        <Skeleton className="h-6 w-32" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={primaryCard}
    >
      <div className="flex items-center gap-2 text-lg font-semibold text-foreground sm:text-xl">
        <CalendarClock size={20} className="text-primary" />
        {now.toLocaleTimeString(i18n.language, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
        <span className="text-sm text-muted-foreground ml-2">
          {now.toLocaleDateString(i18n.language)}
        </span>
      </div>
    </motion.div>
  );
};

// 位置组件 - 优化错误处理和加载状态
const LocationDisplay: React.FC = () => {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [location, setLocation] = useCachedState(
    "cachedLocation",
    "正在获取位置...",
    3600 * 1000 // 1小时过期
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (geoError) {
      setError(geoError);
      setIsLoading(false);
      return;
    }

    if (latitude && longitude) {
      const fetchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=zh-CN`
          );
          if (!response.ok) throw new Error("API Error");
          const data = await response.json();
          const { country, city, town, village, county } = data.address;
          const displayCity = city || town || county || village || "未知地区";
          const newLocation = `${country} · ${displayCity}`;
          setLocation(newLocation);
          setError(null);
        } catch (err) {
          console.error(err);
          if (location === "正在获取位置...") {
            setError("无法解析位置");
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchLocation();
    } else {
      setIsLoading(false);
    }
  }, [latitude, longitude, geoError, setLocation, location]);

  if (isLoading) {
    return (
      <div className={secondaryCard}>
        <Skeleton className="h-5 w-24" />
      </div>
    );
  }

  if (error && location === "正在获取位置...") {
    return (
      <div className={secondaryCard}>
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className={secondaryCard}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
        <MapPin size={18} className="text-primary" />
        <span>{location}</span>
      </div>
    </motion.div>
  );
};

// 天气组件 - 优化加载状态和错误处理
const WeatherDisplay: React.FC = () => {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [weather, setWeather] = useCachedState(
    "cachedWeather",
    "正在获取天气...",
    15 * 60 * 1000 // 15分钟过期
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (geoError) {
      setError(geoError);
      setIsLoading(false);
      return;
    }

    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          if (!response.ok) throw new Error("API Error");
          const data = await response.json();
          const temp = data.current_weather.temperature;
          const newWeather = `当前 ${temp}°C`;
          setWeather(newWeather);
          setError(null);
        } catch (err) {
          console.error(err);
          if (weather === "正在获取天气...") {
            setError("无法获取天气");
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchWeather();
    } else {
      setIsLoading(false);
    }
  }, [latitude, longitude, geoError, setWeather, weather]);

  if (isLoading) {
    return (
      <div className={secondaryCard}>
        <Skeleton className="h-5 w-24" />
      </div>
    );
  }

  if (error && weather === "正在获取天气...") {
    return (
      <div className={secondaryCard}>
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className={secondaryCard}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
        <CloudSun size={18} className="text-primary" />
        <span>{weather}</span>
      </div>
    </motion.div>
  );
};

// 一言组件 - 优化触摸体验和加载状态
const Hitokoto: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomQuote = React.useCallback(() => {
    // 避免随机到同一条
    let newQuote;
    do {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      newQuote = quotes[randomIndex];
    } while (currentQuote && newQuote.content === currentQuote.content);
    return newQuote;
  }, [currentQuote]);

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []); // 仅在初始加载时设置

  const refresh = () => {
    setLoading(true);
    // 使用更短的延迟以匹配动画
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setLoading(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="w-full md:col-span-2"
    >
      <motion.div
        layout
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
          duration: 0.6
        }}
        className={`${featuredCard} relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/10 w-full`}
      >
        <QuoteIcon
          className="absolute -left-2 -top-2 h-16 w-16 text-primary/10"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote?.content}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.4
              }}
              className="flex-grow text-base font-medium text-foreground sm:text-lg"
            >
              {currentQuote?.content}
            </motion.p>
          </AnimatePresence>
          <div className="mt-4 flex items-end justify-between">
            <motion.span
              key={currentQuote?.source}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: 0.1,
                duration: 0.3
              }}
              className="text-xs italic text-muted-foreground sm:text-sm"
            >
              —— {currentQuote?.source}
            </motion.span>
            <motion.button
              onClick={refresh}
              disabled={loading}
              aria-label="刷新一言"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-full p-3 transition-colors duration-200 ease-in-out hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <RefreshCw
                size={20}
                className={`text-foreground transition-transform duration-500 ease-in-out group-hover:scale-110 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 社交链接 - 优化移动端触摸体验
const socialLinks = [
  {
    icon: <GithubIcon size={22} />,
    label: "GitHub",
    href: "https://github.com/publieople",
    preview: "https://github.com/publieople",
  },
  {
    icon: <XIcon size={22} />,
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

const SocialLinks: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className={`${secondaryCard} flex gap-4 flex-wrap justify-center w-full md:col-span-2`}>
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hover:text-primary transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onTouchStart={() => setActiveTooltip(item.label)}
          onTouchEnd={() => setTimeout(() => setActiveTooltip(null), 2000)}
        >
          {item.icon}
          {/* 移动端点击显示提示，桌面端悬停显示 */}
          <span className={`
            absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs rounded
            bg-background/90 text-foreground shadow opacity-0 pointer-events-none
            transition-all z-10 whitespace-nowrap
            group-hover:opacity-100
            ${activeTooltip === item.label ? "opacity-100" : ""}
          `}>
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

// 网格化布局的主内容组件
export const DashboardRightContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      {/* 时间和天气并排显示 */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TimeDisplay />
        <WeatherDisplay />
      </div>
      
      {/* 位置信息 */}
      <div className="md:col-span-2">
        <LocationDisplay />
      </div>
      
      {/* 一言占满宽度 */}
      <Hitokoto />
      
      {/* 社交链接占满宽度 */}
      <SocialLinks />
    </div>
  );
};
