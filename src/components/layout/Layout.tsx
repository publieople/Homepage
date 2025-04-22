import { ReactNode, useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";
import { Navigation } from "./Navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  // 根据设备性能和屏幕尺寸调整粒子数量
  const [particleCount, setParticleCount] = useState(300);
  const { isDark } = useTheme();

  // 根据主题设置粒子颜色
  const particleColor = isDark ? "#eeeeee" : "#333333";

  // 添加一个刷新触发器来强制Particles组件重新渲染
  const [refreshParticles, setRefreshParticles] = useState(false);

  // 监听主题变化，触发粒子刷新
  useEffect(() => {
    setRefreshParticles((prev) => !prev);
  }, [isDark]);

  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLowPerfDevice = navigator.hardwareConcurrency <= 4;

      if (isMobile || isLowPerfDevice) {
        setParticleCount(Math.min(100, Math.floor(width / 10)));
      } else {
        setParticleCount(Math.min(300, Math.floor(width / 6)));
      }
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors">
      {/* 粒子背景 */}
      <div className="fixed inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={particleCount}
          staticity={50}
          ease={30}
          size={window.innerWidth < 768 ? 0.2 : 0.4}
          color={particleColor} // 使用基于主题的颜色
          refresh={refreshParticles} // 添加refresh参数使粒子重新生成
        />
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col">
        {/* 主要内容区域 */}
        <main className={cn("flex-1 px-4 py-6 sm:py-8 lg:py-12", className)}>
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>

        {/* 底部导航栏 */}
        <footer className="sticky bottom-4 sm:bottom-6 flex justify-center py-2 sm:py-4">
          <Navigation />
        </footer>
      </div>
    </div>
  );
}
