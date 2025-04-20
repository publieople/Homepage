/**
 * 布局组件类型定义
 */

import { ReactNode } from "react";
import { BaseProps, WithIdProps } from "./common";

/**
 * 主布局组件Props接口
 */
export interface LayoutProps extends BaseProps {
  /**
   * 是否显示页脚
   */
  showFooter?: boolean;
  /**
   * 是否显示头部
   */
  showHeader?: boolean;
}

/**
 * 页头组件Props接口
 */
export interface HeaderProps extends BaseProps {
  /**
   * 是否固定在顶部
   */
  sticky?: boolean;
  /**
   * 是否透明背景
   */
  transparent?: boolean;
  /**
   * 徽标/标题内容
   */
  logo?: ReactNode;
}

/**
 * 页脚组件Props接口
 */
export interface FooterProps extends BaseProps {
  /**
   * 版权信息
   */
  copyright?: string;
  /**
   * 社交媒体链接
   */
  socialLinks?: Array<{
    name: string;
    url: string;
    icon?: ReactNode;
  }>;
}

/**
 * 导航组件Props接口
 */
export interface NavbarProps extends BaseProps {
  /**
   * 导航项列表
   */
  items: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
    isActive?: boolean;
    icon?: ReactNode;
  }>;
  /**
   * 是否显示移动端汉堡菜单
   */
  showMobileMenu?: boolean;
  /**
   * 品牌/徽标区域内容
   */
  brand?: ReactNode;
}

/**
 * 容器组件Props接口
 */
export interface ContainerProps extends WithIdProps {
  /**
   * 容器最大宽度
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  /**
   * 是否居中显示
   */
  centered?: boolean;
  /**
   * 内边距大小
   */
  padding?: string | number;
}

/**
 * 分栏布局Props接口
 */
export interface GridProps extends BaseProps {
  /**
   * 列数
   */
  columns?: number | { [key: string]: number };
  /**
   * 间隙大小
   */
  gap?: string | number;
  /**
   * 行间距
   */
  rowGap?: string | number;
  /**
   * 列间距
   */
  columnGap?: string | number;
}

/**
 * Hero区域Props接口
 */
export interface HeroProps extends BaseProps {
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 副标题
   */
  subtitle?: ReactNode;
  /**
   * 行动按钮内容
   */
  cta?: ReactNode;
  /**
   * 背景图片URL
   */
  backgroundImage?: string;
  /**
   * 高度设置
   */
  fullHeight?: boolean;
  /**
   * 图片区域内容
   */
  image?: ReactNode;
}

/**
 * 分段组件Props接口
 */
export interface SectionProps extends WithIdProps {
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 内边距
   */
  padding?: string | number;
  /**
   * 是否全宽展示
   */
  fullWidth?: boolean;
}
