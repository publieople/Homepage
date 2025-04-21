import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export type Language = "zh" | "en";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>(() => {
    // 从localStorage获取用户语言偏好
    const savedLanguage = localStorage.getItem("language") as Language;
    // 如果有保存的语言设置，使用保存的设置
    if (savedLanguage && ["zh", "en"].includes(savedLanguage)) {
      return savedLanguage;
    }
    // 如果没有保存的设置，使用系统语言或默认为中文
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  useEffect(() => {
    // 更新i18n语言设置
    i18n.changeLanguage(language);
    // 保存用户语言偏好到localStorage
    localStorage.setItem("language", language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "zh" ? "en" : "zh"));
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return {
    language,
    toggleLanguage,
    changeLanguage,
    isZh: language === "zh",
    isEn: language === "en",
  };
}
