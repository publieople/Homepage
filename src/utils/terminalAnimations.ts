/**
 * 终端动画计算工具
 * 用于生成终端命令动画的时间参数
 */

export interface CommandStep {
  type: "typing" | "message"; // typing为打字动画，message为即时消息
  content: string; // 内容
  className?: string; // 样式类
  typingSpeed?: number; // 打字速度（毫秒/字符）
}

export interface AnimationStep {
  type: "typing" | "message";
  content: string;
  className?: string;
  delay: number; // 开始延迟（毫秒）
  duration?: number; // 总时长（毫秒，仅typing类型需要）
}

interface TerminalAnimationOptions {
  initialDelay?: number; // 初始延迟
  typingSpeed?: number; // 默认打字速度（毫秒/字符）
  stepDelay?: number; // 步骤间延迟
  messageDisplayTime?: number; // 消息显示后的停留时间
}

/**
 * 计算终端动画时序
 * @param steps 命令步骤数组
 * @param options 配置选项
 * @returns 包含delay参数的动画步骤数组
 */
export function calculateTerminalAnimation(
  steps: CommandStep[],
  options: TerminalAnimationOptions = {}
): AnimationStep[] {
  // 默认选项
  const opts = {
    initialDelay: 100,
    typingSpeed: 2, // 毫秒/字符
    stepDelay: 100, // 步骤间延迟
    messageDisplayTime: 200, // 消息显示的基础停留时间
    ...options,
  };

  let currentTime = opts.initialDelay;
  const result: AnimationStep[] = [];

  steps.forEach((step) => {
    // 计算当前步骤的delay
    const delay = currentTime;

    // 根据类型计算时长
    let duration = 0;

    if (step.type === "typing") {
      // 打字动画的时长 = 字符数 * 打字速度
      const speed = step.typingSpeed || opts.typingSpeed;
      duration = step.content.length * speed;
    } else {
      // 消息的时长 = 消息基础显示时间
      duration = opts.messageDisplayTime;
    }

    // 添加到结果数组
    result.push({
      ...step,
      delay,
      duration: step.type === "typing" ? duration : undefined,
    });

    // 更新时间计数器
    currentTime += duration + opts.stepDelay;
  });

  return result;
}

/**
 * 创建预设的终端动画序列
 * @param path 当前路径
 * @param loadingProgress 加载进度状态函数，返回当前进度（0-100）
 * @returns 终端动画步骤数组
 */
export function createRoutingTerminalAnimation(
  path: string,
  loadingProgress: () => number
): AnimationStep[] {
  // 路径映射到命令和文件
  const pathMap: Record<string, { cmd: string; file: string }> = {
    "/": { cmd: "cd ~/homepage", file: "Home.tsx" },
    "/about": { cmd: "cd ~/homepage/about", file: "About.tsx" },
    "/projects": { cmd: "cd ~/homepage/projects", file: "Projects.tsx" },
    "/blog": { cmd: "cd ~/homepage/blog", file: "Blog.tsx" },
    "/contact": { cmd: "cd ~/homepage/contact", file: "Contact.tsx" },
  };

  const currentCommand = pathMap[path]?.cmd || `cd ${path}`;
  const currentFile = pathMap[path]?.file || `${path.slice(1) || "index"}.tsx`;

  // 计算加载状态
  const progress = loadingProgress();
  const stage1Done = progress >= 30 ? "Done" : "";
  const stage2Done = progress >= 60 ? "Done" : "";
  const stage3Done = progress >= 90 ? "Done" : "";

  // 定义命令步骤
  const steps: CommandStep[] = [
    {
      type: "typing",
      content: `> ${currentCommand}`,
      className: "text-zinc-300",
      typingSpeed: 15,
    },
    {
      type: "message",
      content: `~/homepage/src/pages/${currentFile}`,
      className: "text-zinc-400",
    },
    {
      type: "typing",
      content: "$ yarn build",
      className: "text-green-500",
      typingSpeed: 15,
    },
    {
      type: "message",
      content: `Running tsc -b... ${stage1Done}`,
      className: "text-blue-500",
    },
    {
      type: "message",
      content: `Bundling with vite... ${stage2Done}`,
      className: "text-blue-500",
    },
    {
      type: "message",
      content: `Optimizing assets... ${stage3Done}`,
      className: "text-blue-500",
    },
    {
      type: "typing",
      content: "$ yarn preview",
      className: "text-green-500",
      typingSpeed: 15,
    },
    {
      type: "message",
      content: `✓ Local: http://localhost:4173${path}`,
      className: "text-zinc-300",
      typingSpeed: 12,
    },
  ];

  // 设置更快的动画时序以提高用户体验
  return calculateTerminalAnimation(steps, {
    initialDelay: 100,
    typingSpeed: 2,
    stepDelay: 100,
    messageDisplayTime: 150,
  });
}

/**
 * 创建Git相关命令的终端动画序列
 * @returns 终端动画步骤数组
 */
export function createGitTerminalAnimation(): AnimationStep[] {
  const steps: CommandStep[] = [
    { type: "typing", content: "> git status", className: "text-zinc-300" },
    { type: "message", content: "On branch main", className: "text-green-500" },
    {
      type: "message",
      content: "Your branch is up to date with 'origin/main'.",
      className: "text-green-500",
    },
    { type: "message", content: "", className: "text-green-500" },
    {
      type: "message",
      content: "Changes not staged for commit:",
      className: "text-yellow-500",
    },
    {
      type: "message",
      content: '  (use "git add <file>..." to update what will be committed)',
      className: "text-zinc-400",
    },
    {
      type: "message",
      content:
        '  (use "git restore <file>..." to discard changes in working directory)',
      className: "text-zinc-400",
    },
    {
      type: "message",
      content:
        "        modified:   src/components/layout/TerminalPageTransition.tsx",
      className: "text-red-400",
    },
    { type: "typing", content: "> git add .", className: "text-zinc-300" },
    {
      type: "typing",
      content: '> git commit -m "添加终端页面过渡动画"',
      className: "text-zinc-300",
    },
    {
      type: "message",
      content: "[main 3e4f982] 添加终端页面过渡动画",
      className: "text-green-500",
    },
    {
      type: "message",
      content: " 3 files changed, 218 insertions(+), 42 deletions(-)",
      className: "text-green-500",
    },
    { type: "typing", content: "> git push", className: "text-zinc-300" },
    {
      type: "message",
      content: "Enumerating objects: 14, done.",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "Counting objects: 100% (14/14), done.",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "Compressing objects: 100% (8/8), done.",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "Writing objects: 100% (8/8), 1.21 KiB | 621.00 KiB/s, done.",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "Total 8 (delta 5), reused 0 (delta 0), pack-reused 0",
      className: "text-blue-500",
    },
    {
      type: "message",
      content:
        "remote: Resolving deltas: 100% (5/5), completed with 5 local objects.",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "To github.com:username/homepage.git",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "   a1b2c3d..3e4f982  main -> main",
      className: "text-blue-500",
    },
  ];

  return calculateTerminalAnimation(steps, {
    initialDelay: 150,
    typingSpeed: 15,
    stepDelay: 120,
    messageDisplayTime: 150,
  });
}

/**
 * 创建NPM/Yarn相关命令的终端动画序列
 * @returns 终端动画步骤数组
 */
export function createNpmTerminalAnimation(): AnimationStep[] {
  const steps: CommandStep[] = [
    { type: "typing", content: "> yarn install", className: "text-zinc-300" },
    {
      type: "message",
      content: "yarn install v1.22.19",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "[1/4] 🔍  Resolving packages...",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "[2/4] 🚚  Fetching packages...",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "[3/4] 🔗  Linking dependencies...",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "[4/4] 🔨  Building fresh packages...",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "✨  Done in 3.64s.",
      className: "text-green-500",
    },
    { type: "typing", content: "> yarn dev", className: "text-zinc-300" },
    {
      type: "message",
      content: "vite v6.3.1 dev server running at:",
      className: "text-blue-500",
    },
    {
      type: "message",
      content: "  ➜  Local:   http://localhost:5173/",
      className: "text-green-500",
    },
    {
      type: "message",
      content: "  ➜  Network: http://192.168.1.100:5173/",
      className: "text-green-500",
    },
    { type: "message", content: "", className: "text-green-500" },
    {
      type: "message",
      content: "  ready in 634ms.",
      className: "text-green-500",
    },
    { type: "message", content: "", className: "text-green-500" },
    {
      type: "message",
      content: "  ➜  Page reloaded",
      className: "text-green-500",
    },
  ];

  return calculateTerminalAnimation(steps, {
    initialDelay: 150,
    typingSpeed: 15,
    stepDelay: 120,
    messageDisplayTime: 150,
  });
}

/**
 * 使用示例：
 *
 * // 1. 创建自定义动画
 * const steps: CommandStep[] = [
 *   { type: 'typing', content: '> git status', className: 'text-white' },
 *   { type: 'message', content: 'On branch main', className: 'text-green-500' },
 *   { type: 'message', content: 'Your branch is up to date with origin/main.', className: 'text-green-500' }
 * ];
 * const animationSteps = calculateTerminalAnimation(steps);
 *
 * // 2. 使用预设路由动画
 * const [progress, setProgress] = useState(0);
 * const animationSteps = createRoutingTerminalAnimation('/about', () => progress);
 *
 * // 3. 使用Git命令动画
 * const gitAnimationSteps = createGitTerminalAnimation();
 *
 * // 4. 使用NPM/Yarn命令动画
 * const npmAnimationSteps = createNpmTerminalAnimation();
 */
