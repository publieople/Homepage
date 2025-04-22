/**
 * 主题工具函数
 */

/**
 * 设置初始主题
 */
export function setInitialTheme(): void {
  // 获取保存的主题设置
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 如果有保存的主题设置，使用保存的设置
  if (savedTheme) {
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else if (systemPrefersDark) {
    // 如果没有保存的设置但系统偏好暗色，则使用暗色
    document.documentElement.classList.add("dark");
  }
}

/**
 * 检查并处理View Transitions API支持
 */
export function checkViewTransitionSupport(): void {
  // 如果浏览器不支持View Transitions API
  if (!('startViewTransition' in document)) {
    console.info('此浏览器不支持View Transitions API，将使用CSS过渡动画替代');

    // 为不支持的浏览器添加.no-view-transition类
    document.documentElement.classList.add('no-view-transition');
  }
}

/**
 * 初始化主题相关设置
 */
export function initializeTheme(): void {
  // 设置初始主题
  setInitialTheme();
  // 检查并处理View Transitions API支持
  checkViewTransitionSupport();
}

// 自动初始化
initializeTheme();