/**
 * 通用类型定义
 */

import {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";

/**
 * 基础组件Props类型
 */
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

/**
 * 具有ID的组件Props类型
 */
export interface WithIdProps extends BaseProps {
  id?: string;
}

/**
 * 具有点击事件的组件Props类型
 */
export interface ClickableProps extends WithIdProps {
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * 按钮变体类型
 */
export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

/**
 * 按钮大小类型
 */
export type ButtonSize = "default" | "sm" | "lg" | "icon";

/**
 * 尺寸类型
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * 方向类型
 */
export type Direction = "horizontal" | "vertical";

/**
 * 对齐方式类型
 */
export type Alignment = "start" | "center" | "end";

/**
 * 主题色类型
 */
export type ThemeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "destructive"
  | "success"
  | "warning"
  | "info";

/**
 * 响应断点类型
 */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
