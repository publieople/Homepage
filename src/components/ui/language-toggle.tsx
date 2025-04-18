import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

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
        "flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md",
        "dark:bg-slate-800 dark:text-slate-200",
        "hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "transition-all duration-300 ease-in-out",
        className
      )}
      title={language === "zh" ? "Switch to English" : "切换到中文"}
      aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      <div className="relative flex items-center justify-center">
        <Globe className="size-5" />
        <span className="absolute text-[8px] font-bold">
          {language.toUpperCase()}
        </span>
      </div>
    </button>
  );
}
