// 定义支持的语言类型
export type Language = "zh" | "en";

// 定义翻译数据结构
export interface Translations {
  navigation: {
    home: string;
    projects: string;
    blog: string;
    contact: string;
  };
  footer: {
    copyright: string;
  };
  home: {
    greeting: string;
    intro: string;
    skills: string;
  };
  projects: {
    title: string;
    viewMore: string;
  };
  contact: {
    title: string;
    message: string;
    email: string;
  };
  common: {
    loading: string;
  };
}

// 中文翻译
export const zhTranslations: Translations = {
  navigation: {
    home: "首页",
    projects: "项目",
    blog: "博客",
    contact: "联系",
  },
  footer: {
    copyright: "© {year} 我的个人主页. 保留所有权利.",
  },
  home: {
    greeting: "你好，我是",
    intro: "个人介绍内容",
    skills: "技能",
  },
  projects: {
    title: "我的项目",
    viewMore: "查看更多",
  },
  contact: {
    title: "联系我",
    message: "给我发消息",
    email: "电子邮件",
  },
  common: {
    loading: "加载中...",
  },
};

// 英文翻译
export const enTranslations: Translations = {
  navigation: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },
  footer: {
    copyright: "© {year} My Homepage. All rights reserved.",
  },
  home: {
    greeting: "Hi, I'm",
    intro: "Personal introduction",
    skills: "Skills",
  },
  projects: {
    title: "My Projects",
    viewMore: "View More",
  },
  contact: {
    title: "Contact Me",
    message: "Send me a message",
    email: "Email",
  },
  common: {
    loading: "Loading...",
  },
};

// 根据语言代码获取翻译
export function getTranslations(lang: Language): Translations {
  return lang === "zh" ? zhTranslations : enTranslations;
}
