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
    <div className={cn("py-8", className)}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-12 text-center">
            {title && (
              <h1 className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-zinc-400">{subtitle}</p>
            )}
          </header>
        )}
        <div className={contentClassName}>{children}</div>
      </Container>
    </div>
  );
}
