import { useEffect } from "react";
import { CommandConfig, ANIMATION_CONFIG } from "@/lib/animation-config";
import { AnimatedSpan, TypingAnimation } from "@/components/magicui/terminal";
import { cn } from "@/lib/utils";

interface TerminalCommandProps {
  command: CommandConfig;
  replacements?: Record<string, string>;
  onComplete?: () => void;
}

export function TerminalCommand({
  command,
  replacements = {},
  onComplete,
}: TerminalCommandProps) {
  // 替换动态内容
  const processContent = (content: string): string => {
    let result = content;

    // 处理动态替换
    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(`$${key}`, value);
    });

    return result;
  };

  // 命令完成后触发回调
  useEffect(() => {
    if (command.useTyping) {
      const typingDuration =
        command.typingDuration || ANIMATION_CONFIG.DEFAULT_TYPING_DURATION;
      const commandDuration =
        processContent(command.content).length * typingDuration;

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, commandDuration + 100); // 添加一点缓冲时间

      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [command, onComplete]);

  // 渲染命令提示符和命令
  if (command.type === "command" && command.showPrompt) {
    return (
      <div className="flex items-start">
        <AnimatedSpan
          delay={command.delay - 300}
          className={cn("mr-2", command.className)}
        >
          {ANIMATION_CONFIG.PROMPT}
        </AnimatedSpan>
        <TypingAnimation
          delay={command.delay}
          duration={
            command.typingDuration || ANIMATION_CONFIG.DEFAULT_TYPING_DURATION
          }
          className={command.className}
        >
          {processContent(command.content)}
        </TypingAnimation>
      </div>
    );
  }

  // 状态消息的特殊处理 (如 [✓] Loading components)
  if (command.type === "status") {
    const content = processContent(command.content);

    // 检查是否包含状态标记 [✓] 或 [ ]
    if (content.startsWith("[") && content.includes("]")) {
      const bracketClosePos = content.indexOf("]");
      const prefix = content.substring(0, bracketClosePos + 1);
      const rest = content.substring(bracketClosePos + 1);

      // 检查是否包含成功标记 ✓
      const isSuccess = prefix.includes("✓");

      return (
        <AnimatedSpan delay={command.delay} className={command.className}>
          <span>
            {isSuccess ? (
              <>
                [<span className="text-green-500">✓</span>]{rest}
              </>
            ) : (
              <>
                {prefix}
                {rest}
              </>
            )}
          </span>
        </AnimatedSpan>
      );
    }
  }

  // 渲染状态和响应
  if (command.type === "response" || command.type === "status") {
    if (command.useTyping) {
      return (
        <TypingAnimation
          delay={command.delay}
          duration={
            command.typingDuration || ANIMATION_CONFIG.RESPONSE_TYPING_DURATION
          }
          className={command.className}
        >
          {processContent(command.content)}
        </TypingAnimation>
      );
    }

    return (
      <AnimatedSpan delay={command.delay} className={command.className}>
        <span>{processContent(command.content)}</span>
      </AnimatedSpan>
    );
  }

  // 渲染JSON
  if (command.type === "json") {
    const jsonContent = processContent(command.content);

    // 高亮JSON属性名和值
    if (jsonContent.includes('"') && jsonContent.includes(":")) {
      const parts = jsonContent.split(":");
      if (parts.length >= 2) {
        const propName = parts[0];
        const propValue = parts.slice(1).join(":");

        return (
          <AnimatedSpan delay={command.delay} className={command.className}>
            <span>
              <span className="text-purple-400">{propName}:</span>{" "}
              <span className="text-yellow-300">{propValue}</span>
            </span>
          </AnimatedSpan>
        );
      }
    }

    return (
      <AnimatedSpan delay={command.delay} className={command.className}>
        <span>{jsonContent}</span>
      </AnimatedSpan>
    );
  }

  // 默认渲染
  return (
    <AnimatedSpan delay={command.delay} className={command.className}>
      <span>{processContent(command.content)}</span>
    </AnimatedSpan>
  );
}
