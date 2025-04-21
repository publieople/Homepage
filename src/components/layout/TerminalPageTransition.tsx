import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useState, useCallback, useMemo } from "react";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import {
  createRoutingTerminalAnimation,
  AnimationStep,
} from "@/utils/terminalAnimations";

interface TerminalPageTransitionProps {
  children: ReactNode;
  className?: string;
  location: string;
}

export function TerminalPageTransition({
  children,
  location,
  className,
}: TerminalPageTransitionProps) {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPath, setCurrentPath] = useState(location);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);

  // 模拟加载进度
  useEffect(() => {
    if (showTerminal && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = Math.floor(Math.random() * 15) + 5;
          const nextValue = Math.min(prev + increment, 100);
          return nextValue;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [showTerminal, loadingProgress]);

  // 计算动画总时长
  const calculateTotalAnimationDuration = useCallback(
    (steps: AnimationStep[]) => {
      if (!steps.length) return 0;

      // 找到最后一个步骤
      const lastStep = steps[steps.length - 1];

      // 最后一步的延迟 + 持续时间(如果有) + 额外300ms缓冲
      return lastStep.delay + (lastStep.duration || 500) + 300;
    },
    []
  );

  // 生成动画步骤并计算总时长
  const { steps, totalDuration } = useMemo(() => {
    const newSteps = createRoutingTerminalAnimation(
      currentPath,
      () => loadingProgress
    );
    const duration = calculateTotalAnimationDuration(newSteps);
    return { steps: newSteps, totalDuration: duration };
  }, [currentPath, loadingProgress, calculateTotalAnimationDuration]);

  // 更新动画步骤
  useEffect(() => {
    setAnimationSteps(steps);
  }, [steps]);

  // 处理页面切换
  useEffect(() => {
    // 当路径变化时
    if (location !== currentPath) {
      setShowContent(false);
      setLoadingProgress(0);

      // 短暂延迟后显示终端
      const timer1 = setTimeout(() => {
        setShowTerminal(true);
        setCurrentPath(location);
      }, 100);

      // 终端动画结束后隐藏终端，显示页面内容
      // 使用计算出的动画总时长
      const timer2 = setTimeout(() => {
        setShowTerminal(false);
        setShowContent(true);
      }, totalDuration);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (!showContent) {
      // 首次加载
      const timer = setTimeout(() => {
        setShowTerminal(false);
        setShowContent(true);
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [location, currentPath, showContent, totalDuration]);

  // 渲染动画步骤
  const renderAnimationStep = (step: AnimationStep, index: number) => {
    if (step.type === "typing") {
      return (
        <TypingAnimation
          key={`typing-${index}`}
          delay={step.delay}
          className={step.className}
          duration={
            step.duration
              ? Math.max(20, step.duration / step.content.length)
              : undefined
          }
        >
          {step.content}
        </TypingAnimation>
      );
    } else {
      return (
        <AnimatedSpan
          key={`message-${index}`}
          delay={step.delay}
          className={step.className}
        >
          <span>{step.content}</span>
        </AnimatedSpan>
      );
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm"
          >
            <Terminal className="w-[90%] max-w-2xl">
              {animationSteps.map((step, index) =>
                renderAnimationStep(step, index)
              )}
            </Terminal>
          </motion.div>
        )}

        {showContent && (
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
