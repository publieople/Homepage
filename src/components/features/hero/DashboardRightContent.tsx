import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useCachedState } from "@/hooks/useCachedState";
import { quotes, Quote } from "@/lib/quotes";
import { AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Book,
  Globe,
  CloudSun,
  CalendarClock,
  MapPin,
  RefreshCw,
  ExternalLink,
  Link2,
  Quote as QuoteIcon,
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
      <CalendarClock size={20} className="text-primary" />
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

// 位置组件
const LocationDisplay: React.FC = () => {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [location, setLocation] = useCachedState(
    "cachedLocation",
    "正在获取位置...",
    3600 * 1000 // 1小时过期
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (geoError) {
      setError(geoError);
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
          setError(null); // 清除旧的错误
        } catch (err) {
          console.error(err);
          // 仅在没有缓存时显示错误
          if (location === "正在获取位置...") {
            setError("无法解析位置。");
          }
        }
      };
      fetchLocation();
    }
  }, [latitude, longitude, geoError, setLocation, location]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="flex items-center gap-2 text-base text-muted-foreground"
    >
      <MapPin size={18} className="text-primary" />
      <span>{error && location === "正在获取位置..." ? error : location}</span>
    </motion.div>
  );
};

// 天气组件
const WeatherDisplay: React.FC = () => {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [weather, setWeather] = useCachedState(
    "cachedWeather",
    "正在获取天气...",
    15 * 60 * 1000 // 15分钟过期
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (geoError) {
      setError(geoError);
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
            setError("无法获取天气。");
          }
        }
      };
      fetchWeather();
    }
  }, [latitude, longitude, geoError, setWeather, weather]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      className="flex items-center gap-2 text-base text-muted-foreground"
    >
      <CloudSun size={18} className="text-primary" />
      <span>{error && weather === "正在获取天气..." ? error : weather}</span>
    </motion.div>
  );
};

// 一言组件
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
      className="w-full max-w-xl"
    >
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-background/50 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-primary/10">
        <QuoteIcon
          className="absolute -left-2 -top-2 h-16 w-16 text-primary/10"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full min-h-[6rem] flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote?.content}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-grow text-base font-medium text-foreground sm:text-lg"
            >
              {currentQuote?.content}
            </motion.p>
          </AnimatePresence>
          <div className="mt-4 flex items-end justify-between">
            <motion.span
              key={currentQuote?.source}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-xs italic text-muted-foreground sm:text-sm"
            >
              —— {currentQuote?.source}
            </motion.span>
            <button
              onClick={refresh}
              disabled={loading}
              aria-label="刷新一言"
              className="group rounded-full p-2 transition-colors duration-200 ease-in-out hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <RefreshCw
                size={18}
                className={`text-white transition-transform duration-500 ease-in-out group-hover:scale-110 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
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
