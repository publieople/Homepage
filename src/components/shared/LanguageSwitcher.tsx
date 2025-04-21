import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  dockStyle?: boolean;
}

export function LanguageSwitcher({
  className,
  dockStyle = false,
}: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  if (dockStyle) {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "flex items-center justify-center bg-zinc-800/50 hover:bg-zinc-700/60 transition-colors rounded-lg h-12 w-12",
          className
        )}
        title={language === "zh" ? t("language.en") : t("language.zh")}
        aria-label={language === "zh" ? t("language.en") : t("language.zh")}
      >
        <Globe className="text-zinc-300" size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-zinc-200",
        className
      )}
      title={language === "zh" ? t("language.en") : t("language.zh")}
    >
      <Globe size={16} />
      <span>{language === "zh" ? "EN" : "中"}</span>
    </button>
  );
}
