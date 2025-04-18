import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface DockContainerProps {
  children: ReactNode;
  className?: string;
  autoHide?: boolean;
  threshold?: number;
}

export function DockContainer({
  children,
  className,
  autoHide = true,
  threshold = 10,
}: DockContainerProps) {
  const scrollDirection = useScrollDirection(threshold);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }

    if (scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  }, [scrollDirection, autoHide]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 mx-auto flex justify-center transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-24",
        className
      )}
    >
      {children}
    </div>
  );
}
