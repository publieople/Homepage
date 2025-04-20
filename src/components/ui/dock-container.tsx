import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DockContainerProps {
  children: ReactNode;
  className?: string;
}

export function DockContainer({ children, className }: DockContainerProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] mx-auto flex justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
