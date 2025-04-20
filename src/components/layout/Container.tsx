import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  maxWidth = "xl",
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4", maxWidthMap[maxWidth], className)}
    >
      {children}
    </div>
  );
}
