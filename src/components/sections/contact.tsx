import { FC, lazy, Suspense, useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

// 懒加载联系表单组件
const ContactForm = lazy(() =>
  import("@/components/ui/contact-form").then((mod) => ({
    default: mod.ContactForm,
  }))
);

interface ContactProps {
  className?: string;
}

const Contact: FC<ContactProps> = ({ className }) => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section className={className} id="contact">
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-12">
        <h2
          className={`${
            isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
          } font-bold mb-3 sm:mb-4`}
        >
          {t.contact.title}
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-foreground/80 px-2 sm:px-0">
          {language === "zh"
            ? "如果您有项目想法或合作机会，请随时与我联系。"
            : "If you have a project idea or opportunity for collaboration, feel free to contact me."}
        </p>
      </div>

      <div className="w-full max-w-sm sm:max-w-md mx-auto">
        <Suspense
          fallback={
            <div className="text-center py-6 sm:py-12">
              {language === "zh"
                ? "加载联系表单..."
                : "Loading contact form..."}
            </div>
          }
        >
          <ContactForm isMobile={isMobile} />
        </Suspense>
      </div>
    </section>
  );
};

export { Contact };
export default Contact;
