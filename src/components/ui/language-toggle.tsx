import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { TranslateIcon } from "./icons/translate-icon";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  // 切换语言
  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center transition-colors",
        className
      )}
      title={language === "zh" ? "Switch to English" : "切换到中文"}
      aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      <TranslateIcon className="size-5 text-slate-700 dark:text-slate-200" />
    </button>
  );
}
