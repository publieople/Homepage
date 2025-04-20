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
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* 粒子背景 */}
      <div className="fixed inset-0 -z-10">
        <Particles
          className="absolute inset-0"
          quantity={100}
          staticity={30}
          ease={30}
          color="#ffffff"
        />
      </div>

      {/* 主内容区 */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* 内容区 */}
        <main className={cn("flex-1 py-12", className)}>{children}</main>

        {/* 底部导航栏 */}
        <footer className="sticky bottom-6 flex justify-center py-4">
          <Navigation />
        </footer>
      </div>
    </div>
  );
}
