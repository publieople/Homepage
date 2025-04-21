import { PageTemplate } from "@/components/layout";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("about.title")} subtitle={t("about.intro")}>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-0">
        <MagicCard className="rounded-lg">
          <section className="p-4 sm:p-6">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold text-zinc-200">
              {t("about.skills")}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              极简设计不仅仅是视觉上的简洁，更是对用户体验的深度思考。
              我相信，真正优秀的设计应该是无形的，让用户专注于内容本身。
            </p>
          </section>
        </MagicCard>

        <MagicCard className="overflow-hidden rounded-lg">
          <section className="p-4 sm:p-6">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold text-zinc-200">
              {t("about.experience")}
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm sm:text-base text-zinc-400">
              <li>以用户为中心的设计思维</li>
              <li>不断探索技术与创意的边界</li>
              <li>追求卓越与完美的工匠精神</li>
              <li>开放协作与知识共享</li>
            </ul>
          </section>
        </MagicCard>
      </div>
    </PageTemplate>
  );
}
