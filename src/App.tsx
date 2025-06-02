import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home/Home";
import { About } from "@/pages/about/About";
// 导入主题初始化工具
import "@/lib/theme-utils";

const ProjectsPage = () => (
  <div className="text-center text-4xl font-bold">作品集</div>
);

const BlogRedirect = () => {
  window.location.href = "https://blog.for-people.cn";
  return <div className="text-center text-xl">正在跳转到博客...</div>;
};

const ContactPage = () => (
  <div className="text-center text-4xl font-bold">联系</div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogRedirect />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
