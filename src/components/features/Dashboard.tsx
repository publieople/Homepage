"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Github, Twitter, Mail, MapPin, Clock, Calendar } from "lucide-react";

interface DashboardProps {
  className?: string;
}

/**
 * 仪表盘组件
 * 显示个人信息、时间、社交链接等
 */
export function Dashboard({ className }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com",
      color: "hover:text-gray-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@example.com",
      color: "hover:text-red-400",
    },
  ];

  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6 h-full", className)}
    >
      {/* 左侧固定区域 */}
      <div className="space-y-6">
        {/* 个人信息卡片 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MagicCard className="p-6 text-center rounded-xl">
            <motion.div
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              P
            </motion.div>
            <TextAnimate
              animation="slideUp"
              className="text-xl font-semibold mb-2"
              delay={0.4}
            >
              Publieople
            </TextAnimate>
            <TextAnimate
              animation="slideUp"
              className="text-foreground/70 mb-4"
              delay={0.6}
            >
              全栈开发工程师 | 极简设计爱好者
            </TextAnimate>
            <motion.div
              className="flex items-center justify-center text-sm text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MapPin size={16} className="mr-1" />
              中国-上海
            </motion.div>
          </MagicCard>
        </motion.div>

        {/* 导航链接 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagicCard className="p-6 text-center rounded-xl">
            <h3 className="text-lg font-semibold mb-4">快速导航</h3>
            <div className="space-y-3">
              {[
                { name: "作品集", path: "/projects" },
                { name: "博客", path: "https://blog.for-people.cn" },
                { name: "关于我", path: "/about" },
                { name: "联系我", path: "/contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="block p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </MagicCard>
        </motion.div>
      </div>

      {/* 右侧动态内容区 */}
      <div className="space-y-6">
        {/* 时间日期卡片 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagicCard className="p-6 text-center rounded-xl">
            <div className="flex items-center mb-4">
              <Clock size={20} className="mr-2" />
              <h3 className="text-lg font-semibold">当前时间</h3>
            </div>
            <motion.div
              className="text-3xl font-mono font-bold mb-2"
              key={currentTime.getSeconds()}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {formatTime(currentTime)}
            </motion.div>
            <div className="flex items-center text-foreground/70">
              <Calendar size={16} className="mr-2" />
              {formatDate(currentTime)}
            </div>
          </MagicCard>
        </motion.div>

        {/* 社交媒体链接 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MagicCard className="p-6 text-center rounded-xl">
            <h3 className="text-lg font-semibold mb-4">社交媒体</h3>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors",
                      link.color
                    )}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-sm">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </MagicCard>
        </motion.div>

        {/* 快捷入口 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagicCard className="p-6 text-center rounded-xl">
            <h3 className="text-lg font-semibold mb-4">快捷入口</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "Notion",
                  url: "https://notion.so",
                  color: "bg-gray-100 hover:bg-gray-200",
                },
                {
                  name: "Bilibili",
                  url: "https://bilibili.com",
                  color: "bg-pink-100 hover:bg-pink-200",
                },
                {
                  name: "小红书",
                  url: "https://xiaohongshu.com",
                  color: "bg-red-100 hover:bg-red-200",
                },
                {
                  name: "微信",
                  url: "#",
                  color: "bg-green-100 hover:bg-green-200",
                },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-lg text-center text-sm font-medium transition-colors",
                    item.color
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </div>
  );
}
