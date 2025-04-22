import { Container } from "@/components/layout";
import { useTranslation } from "react-i18next";
import { MagicCard } from "@/components/magicui/magic-card";

export function Home() {
  const { t } = useTranslation();

  return (
    <Container className="space-y-8 sm:space-y-12">
      <section className="mt-8 sm:mt-16 flex flex-col items-center space-y-4 sm:space-y-6 text-center">
        <h1 className="bg-gradient-to-r from-foreground/90 to-foreground/60 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent px-4 transition-colors">
          {t("home.title")}
        </h1>
        <p className="max-w-xl text-base sm:text-xl text-foreground/70 px-4 transition-colors">
          {t("home.subtitle")}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
        {[1, 2, 3].map((i) => (
          <MagicCard
            key={i}
            className="rounded-lg border-border p-4 sm:p-6 transition-all group"
          >
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
              {t("home.projects.title")} {i}
            </h3>
            <p className="text-sm sm:text-base text-foreground/70 group-hover:text-foreground/80 transition-colors">
              {t("home.projects.description")}
            </p>
          </MagicCard>
        ))}
      </section>
    </Container>
  );
}
