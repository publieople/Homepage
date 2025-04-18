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
        "flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800",
        "text-slate-700 dark:text-slate-200 shadow-md",
        "hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "transition-all duration-300 ease-in-out",
        className
      )}
      title={language === "zh" ? "Switch to English" : "切换到中文"}
      aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      <TranslateIcon className="size-5" />
    </button>
  );
}
