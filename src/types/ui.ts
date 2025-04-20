/**
 * UI组件类型定义
 */

import { BaseProps, ButtonSize, ButtonVariant, ClickableProps } from "./common";

/**
 * 按钮组件Props接口
 */
export interface ButtonProps extends ClickableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * 卡片组件Props接口
 */
export interface CardProps extends BaseProps {
  border?: boolean;
  shadow?: boolean;
}

/**
 * 输入框组件Props接口
 */
export interface InputProps extends BaseProps {
  label?: string;
  error?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}
