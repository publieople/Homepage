/**
 * 开屏动画时序配置
 * 用于统一管理和控制终端命令的显示时序和动画效果
 */

// 命令类型定义
export type CommandType =
  | "command" // 终端命令
  | "response" // 命令响应
  | "json" // JSON数据
  | "status"; // 状态信息

// 命令项配置
export interface CommandConfig {
  id: string; // 命令唯一ID
  type: CommandType; // 命令类型
  content: string; // 命令内容
  delay: number; // 延迟显示时间(ms)
  showPrompt?: boolean; // 是否显示命令提示符 [system] $
  useTyping?: boolean; // 是否使用打字机效果
  typingDuration?: number; // 打字机打一个字符的时间(ms)
  className?: string; // 自定义CSS类
  children?: CommandConfig[]; // 子命令（例如JSON内部项）
}

// 是否显示调试信息
export const DEBUG_MODE = false;

// 动画基础配置
export const ANIMATION_CONFIG = {
  // 基础时间单位(ms)
  BASE_TIME_UNIT: 300,

  // 命令提示符
  PROMPT: "[system] $",

  // 默认打字机速度(ms/字符)
  DEFAULT_TYPING_DURATION: 10,

  // 响应命令的打字机速度(更快)
  RESPONSE_TYPING_DURATION: 5,

  // 默认命令延迟
  DEFAULT_COMMAND_DELAY: 300,

  // 打字机完成后到下一个命令的间隔
  COMMAND_INTERVAL: 200,

  // 总动画时长(ms) - 会根据命令配置自动计算
  TOTAL_DURATION: 0,
};

// 通过命令生成时间线
export function generateTimeline(commands: CommandConfig[]): CommandConfig[] {
  let currentTime = 0;
  const timeline: CommandConfig[] = [];

  const processCommand = (cmd: CommandConfig, depth = 0): CommandConfig => {
    // 计算实际延迟时间
    const actualDelay = cmd.delay || currentTime;

    // 计算打字时间 (如果启用打字机效果)
    const contentLength = cmd.content.length;
    const typingDuration = cmd.useTyping
      ? cmd.typingDuration || ANIMATION_CONFIG.DEFAULT_TYPING_DURATION
      : 0;

    // 计算此命令的总持续时间
    const commandDuration = cmd.useTyping ? contentLength * typingDuration : 0;

    // 更新当前时间
    currentTime = Math.max(
      currentTime,
      actualDelay + commandDuration + ANIMATION_CONFIG.COMMAND_INTERVAL
    );

    // 创建带有实际延迟的命令
    const processedCommand: CommandConfig = {
      ...cmd,
      delay: actualDelay,
    };

    // 递归处理子命令
    if (cmd.children && cmd.children.length > 0) {
      processedCommand.children = cmd.children.map((child) =>
        processCommand(child, depth + 1)
      );
    }

    if (DEBUG_MODE) {
      console.log(
        `命令[${cmd.id}]: 延迟=${actualDelay}ms, 持续=${commandDuration}ms, 结束=${currentTime}ms`
      );
    }

    return processedCommand;
  };

  // 处理所有命令
  commands.forEach((cmd) => {
    timeline.push(processCommand(cmd));
  });

  // 更新总动画时长
  ANIMATION_CONFIG.TOTAL_DURATION = currentTime + 500; // 添加缓冲

  if (DEBUG_MODE) {
    console.log(`总动画时长: ${ANIMATION_CONFIG.TOTAL_DURATION}ms`);
  }

  return timeline;
}

// 终端命令配置
export const TERMINAL_COMMANDS: CommandConfig[] = [
  // 系统启动
  {
    id: "startup",
    type: "command",
    content: "zsh startup.sh",
    delay: 0,
    showPrompt: true,
    useTyping: true,
    typingDuration: 10,
    className: "text-green-400",
  },

  // 连接服务器
  {
    id: "connect",
    type: "command",
    content: "connect --server=portfolio.server --port=443",
    delay: 1000,
    showPrompt: true,
    useTyping: true,
    typingDuration: 10,
    className: "text-blue-400",
  },

  // 连接中
  {
    id: "connecting",
    type: "response",
    content: "Connecting to portfolio.server...",
    delay: 1800,
    useTyping: false,
    className: "text-yellow-400",
  },

  // 连接成功
  {
    id: "connected",
    type: "response",
    content: "Connection established. Handshake completed.",
    delay: 2000,
    useTyping: false,
    className: "text-green-500",
  },

  // 认证
  {
    id: "auth",
    type: "command",
    content: "auth --token=visitor_session",
    delay: 2300,
    showPrompt: true,
    useTyping: true,
    typingDuration: 15,
    className: "text-blue-400",
  },

  // 认证成功
  {
    id: "auth-success",
    type: "response",
    content: "Authentication successful. Welcome, visitor.",
    delay: 2700,
    useTyping: false,
    className: "text-green-500",
  },

  // 加载配置
  {
    id: "load-profile",
    type: "command",
    content: "load-profile --target=author",
    delay: 3000,
    showPrompt: true,
    useTyping: true,
    typingDuration: 15,
    className: "text-blue-400",
  },

  // 获取数据
  {
    id: "fetching",
    type: "response",
    content: "Fetching profile data...",
    delay: 3400,
    useTyping: false,
    className: "text-cyan-400",
  },

  // JSON数据开始
  {
    id: "json-start",
    type: "json",
    content: "{",
    delay: 3700,
    useTyping: false,
    className: "text-white",
  },

  // 用户名
  {
    id: "json-name",
    type: "json",
    content: '"name": "$name",',
    delay: 3800,
    useTyping: false,
    className: "text-white pl-4",
  },

  // 职位
  {
    id: "json-position",
    type: "json",
    content: '"position": "$title",',
    delay: 3900,
    useTyping: false,
    className: "text-white pl-4",
  },

  // 简介
  {
    id: "json-bio",
    type: "json",
    content: '"bio": "$description"',
    delay: 4000,
    useTyping: false,
    className: "text-white pl-4",
  },

  // JSON结束
  {
    id: "json-end",
    type: "json",
    content: "}",
    delay: 4100,
    useTyping: false,
    className: "text-white",
  },

  // 加载成功
  {
    id: "profile-loaded",
    type: "response",
    content: "Profile loaded successfully.",
    delay: 4400,
    useTyping: false,
    className: "text-green-400",
  },

  // 初始化应用
  {
    id: "init-app",
    type: "command",
    content: "init-app --target=portfolio",
    delay: 4800,
    showPrompt: true,
    useTyping: true,
    typingDuration: 10,
    className: "text-blue-400",
  },

  // 初始化中
  {
    id: "initializing",
    type: "response",
    content: "Initializing application...",
    delay: 5200,
    useTyping: false,
    className: "text-yellow-300",
  },

  // 加载组件中
  {
    id: "loading-components",
    type: "status",
    content: "[ ] Loading components",
    delay: 5500,
    useTyping: false,
    className: "text-white",
  },

  // 加载组件完成
  {
    id: "loading-components-done",
    type: "status",
    content: "[{{✓|text-green-500}}] Loading components",
    delay: 5800,
    useTyping: false,
    className: "text-white",
  },

  // 编译样式中
  {
    id: "compiling-styles",
    type: "status",
    content: "[ ] Compiling styles",
    delay: 6000,
    useTyping: false,
    className: "text-white",
  },

  // 编译样式完成
  {
    id: "compiling-styles-done",
    type: "status",
    content: "[{{✓|text-green-500}}] Compiling styles",
    delay: 6300,
    useTyping: false,
    className: "text-white",
  },

  // 初始化事件中
  {
    id: "init-events",
    type: "status",
    content: "[ ] Initializing events",
    delay: 6500,
    useTyping: false,
    className: "text-white",
  },

  // 初始化事件完成
  {
    id: "init-events-done",
    type: "status",
    content: "[{{✓|text-green-500}}] Initializing events",
    delay: 6800,
    useTyping: false,
    className: "text-white",
  },

  // 初始化完成
  {
    id: "init-done",
    type: "response",
    content: "Application initialized successfully!",
    delay: 7100,
    useTyping: false,
    className: "text-green-500",
  },

  // 启动
  {
    id: "launch",
    type: "command",
    content: "launch",
    delay: 7400,
    showPrompt: true,
    useTyping: true,
    typingDuration: 10,
    className: "text-blue-400",
  },

  // 欢迎
  {
    id: "welcome",
    type: "response",
    content: "Welcome to $name's portfolio!",
    delay: 7800,
    useTyping: false,
    className: "text-green-500 font-bold",
  },

  // 系统版本信息
  {
    id: "system-info",
    type: "response",
    content: "System: Portfolio OS v1.0 [Ready]",
    delay: 8000,
    useTyping: false,
    className: "text-gray-400 text-sm",
  },

  // 提示按键继续
  {
    id: "press-key",
    type: "response",
    content: "$skip_message",
    delay: 8200,
    useTyping: false,
    className: "text-gray-400 mt-2",
  },
];

// 预处理命令时间线
export const PROCESSED_COMMANDS = generateTimeline(TERMINAL_COMMANDS);
