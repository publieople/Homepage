import { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface PageTemplateProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
}

export function PageTemplate({
  children,
  title,
  subtitle,
  className,
  contentClassName,
}: PageTemplateProps) {
  return (
    <div className={cn("py-4 sm:py-6 lg:py-8", className)}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-8 sm:mb-10 lg:mb-12 text-center">
            {title && (
              <h1 className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent transition-colors">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-foreground/70 max-w-[42rem] mx-auto transition-colors">
                {subtitle}
              </p>
            )}
          </header>
        )}
        <div className={contentClassName}>{children}</div>
      </Container>
    </div>
  );
}
