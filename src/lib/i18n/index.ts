import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 导入翻译文件
import zhTranslation from "./locales/zh.json";
import enTranslation from "./locales/en.json";

// 配置i18next
i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: zhTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: "zh", // 默认语言
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false, // React 已经安全地处理了转义
  },
});

export default i18n;
