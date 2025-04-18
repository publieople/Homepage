import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface ContactFormProps {
  className?: string;
  isMobile?: boolean;
  onSubmit?: (formData: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void>;
}

export function ContactForm({
  className,
  isMobile = false,
  onSubmit,
}: ContactFormProps) {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: "error",
        message:
          language === "zh"
            ? "请填写所有必填字段"
            : "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // 模拟成功提交
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitStatus({
        type: "success",
        message:
          language === "zh"
            ? "表单提交成功！我会尽快回复您。"
            : "Form submitted successfully! I will reply to you as soon as possible.",
      });

      // 重置表单
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          language === "zh"
            ? "提交失败，请稍后再试。"
            : "Submission failed, please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6",
        className
      )}
    >
      {submitStatus.type === "success" && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs sm:text-sm">
          {submitStatus.message}
        </div>
      )}

      {submitStatus.type === "error" && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs sm:text-sm">
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            {language === "zh" ? "姓名" : "Name"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              language === "zh" ? "请输入您的姓名" : "Enter your name"
            }
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            {language === "zh" ? "邮箱" : "Email"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={
              language === "zh"
                ? "请输入您的邮箱地址"
                : "Enter your email address"
            }
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            {language === "zh" ? "留言" : "Message"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={
              language === "zh" ? "请输入您的留言内容" : "Enter your message"
            }
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-24 sm:min-h-32"
            required
          ></textarea>
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className={`w-full text-xs sm:text-sm py-1.5 sm:py-2 h-auto ${
            isMobile ? "" : "md:w-auto"
          }`}
        >
          {isSubmitting
            ? language === "zh"
              ? "提交中..."
              : "Submitting..."
            : language === "zh"
            ? "发送留言"
            : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
