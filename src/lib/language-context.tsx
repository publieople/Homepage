import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Language, Translations, getTranslations } from "@/data/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// 本地存储键
const STORAGE_KEY = "app-language";

// 获取默认语言：先从本地存储读取，如果没有则使用浏览器语言或默认中文
function getDefaultLanguage(): Language {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
    if (
      storedLanguage &&
      (storedLanguage === "zh" || storedLanguage === "en")
    ) {
      return storedLanguage;
    }

    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("zh")) {
      return "zh";
    }
  }
  return "zh"; // 默认使用中文
}

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh"); // 默认中文，实际会在useEffect中更新
  const [translations, setTranslations] = useState<Translations>(
    getTranslations("zh")
  );

  // 初始化语言设置
  useEffect(() => {
    const defaultLang = getDefaultLanguage();
    setLanguageState(defaultLang);
    setTranslations(getTranslations(defaultLang));
  }, []);

  // 切换语言
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setTranslations(getTranslations(newLanguage));

    // 保存到本地存储
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLanguage);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言的Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
