import { FC, lazy, Suspense } from "react";
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

  return (
    <section className={className} id="contact">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t.contact.title}</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          {language === "zh"
            ? "如果您有项目想法或合作机会，请随时与我联系。"
            : "If you have a project idea or opportunity for collaboration, feel free to contact me."}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Suspense
          fallback={
            <div className="text-center py-12">
              {language === "zh"
                ? "加载联系表单..."
                : "Loading contact form..."}
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
};

export { Contact };
export default Contact;
