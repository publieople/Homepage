/**
 * 调试工具库
 * 用于开发环境中的各种调试功能
 */

// 创建调试功能开关类型
export type DebugFlag = {
  key: string; // localStorage中的键名
  defaultValue: boolean; // 默认值
  description: string; // 功能描述
  shortcut?: string; // 键盘快捷键
};

// 定义可用的调试功能
export const DEBUG_FLAGS = {
  SKIP_INTRO: {
    key: "debug_skipIntro",
    defaultValue: false,
    description: "跳过开屏动画",
    shortcut: "Ctrl+Shift+S",
  },
  ALLOW_SKIP_ANYTIME: {
    key: "debug_allowSkipAnytime",
    defaultValue: false,
    description: "允许随时跳过开屏动画",
    shortcut: "Ctrl+Shift+A",
  },
  // 可以在此添加更多调试开关
} as const;

/**
 * 获取调试开关的值
 * @param flag 调试开关
 * @returns 开关状态
 */
export function getDebugFlag(flag: DebugFlag): boolean {
  // 只在开发环境启用
  if (!import.meta.env.DEV) return false;

  try {
    const value = localStorage.getItem(flag.key);
    return value === "true" || (value === null && flag.defaultValue);
  } catch (e) {
    return flag.defaultValue;
  }
}

/**
 * 设置调试开关的值
 * @param flag 调试开关
 * @param value 开关值
 */
export function setDebugFlag(flag: DebugFlag, value: boolean): void {
  // 只在开发环境启用
  if (!import.meta.env.DEV) return;

  try {
    localStorage.setItem(flag.key, value.toString());
    console.log(
      `%c${flag.description}${value ? "已启用" : "已禁用"}`,
      "background: #222; color: #bada55; padding: 2px 4px; border-radius: 2px;"
    );
  } catch (e) {
    console.warn("无法设置调试标志:", e);
  }
}

/**
 * 切换调试开关的值
 * @param flag 调试开关
 * @returns 新的开关状态
 */
export function toggleDebugFlag(flag: DebugFlag): boolean {
  const currentValue = getDebugFlag(flag);
  const newValue = !currentValue;
  setDebugFlag(flag, newValue);
  return newValue;
}

/**
 * 初始化调试工具，包括快捷键和控制台消息
 */
export function initDebugTools(): void {
  // 只在开发环境启用
  if (!import.meta.env.DEV) return;

  // 为所有带快捷键的调试标志添加快捷键
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey) {
      if (e.key === "S") {
        toggleDebugFlag(DEBUG_FLAGS.SKIP_INTRO);
      } else if (e.key === "A") {
        toggleDebugFlag(DEBUG_FLAGS.ALLOW_SKIP_ANYTIME);
      }
      // 可以添加更多快捷键
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // 在控制台输出当前调试状态
  console.group("%c调试工具已启用", "color: #4CAF50; font-weight: bold;");
  Object.values(DEBUG_FLAGS).forEach((flag) => {
    const status = getDebugFlag(flag);
    console.log(
      `%c${flag.description}: ${status ? "启用" : "禁用"} ${
        flag.shortcut ? `[快捷键: ${flag.shortcut}]` : ""
      }`,
      `color: ${status ? "#4CAF50" : "#F44336"}; font-weight: ${
        status ? "bold" : "normal"
      };`
    );
  });
  console.log("提示: 可以在控制台使用以下命令控制调试功能:");
  console.log('window.debugTools.toggleFlag("SKIP_INTRO")');
  console.groupEnd();

  // 暴露给全局使用
  (window as any).debugTools = {
    getFlag: (flagName: keyof typeof DEBUG_FLAGS) =>
      getDebugFlag(DEBUG_FLAGS[flagName]),
    setFlag: (flagName: keyof typeof DEBUG_FLAGS, value: boolean) =>
      setDebugFlag(DEBUG_FLAGS[flagName], value),
    toggleFlag: (flagName: keyof typeof DEBUG_FLAGS) =>
      toggleDebugFlag(DEBUG_FLAGS[flagName]),
    flags: DEBUG_FLAGS,
  };
}
