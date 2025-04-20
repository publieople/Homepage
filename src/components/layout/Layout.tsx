import { ReactNode } from "react";
import { Particles } from "@/components/magicui/particles";
import { Navigation } from "./Navigation";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* 粒子背景 */}
      <div className="fixed inset-0 -z-10">
        <Particles
          className="absolute inset-0"
          quantity={300}
          staticity={50}
          ease={30}
        />
      </div>

      {/* 内容容器 */}
      <div className="mx-auto flex min-h-screen w-full flex-col">
        {/* 主要内容区域 */}
        <main className={cn("flex-1 px-4 py-12", className)}>
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>

        {/* 底部导航栏 */}
        <footer className="sticky bottom-6 flex justify-center py-4">
          <Navigation />
        </footer>
      </div>
    </div>
  );
}
