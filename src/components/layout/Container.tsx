import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 mx-auto space-y-6 sm:space-y-8",
        "bg-background/70 rounded-lg backdrop-blur-md transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}
