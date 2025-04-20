/**
 * 功能模块组件类型定义
 */

import { ReactNode } from "react";
import { BaseProps } from "./common";

/**
 * 项目卡片Props接口
 */
export interface ProjectCardProps extends BaseProps {
  /**
   * 项目标题
   */
  title: string;
  /**
   * 项目描述
   */
  description: string;
  /**
   * 项目图片URL
   */
  imageUrl?: string;
  /**
   * 技术标签
   */
  tags?: string[];
  /**
   * 是否特色项目
   */
  featured?: boolean;
}

/**
 * 技能卡片Props接口
 */
export interface SkillCardProps extends BaseProps {
  /**
   * 技能名称
   */
  name: string;
  /**
   * 技能图标
   */
  icon?: ReactNode;
  /**
   * 技能级别 (1-5)
   */
  level?: number;
  /**
   * 技能描述
   */
  description?: string;
}
