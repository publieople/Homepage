import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout, PageTransition } from "@/components/layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";

// 页面导入（稍后会实现）
const ProjectsPage = () => (
  <div className="text-center text-4xl font-bold">作品集</div>
);
const BlogPage = () => (
  <div className="text-center text-4xl font-bold">博客</div>
);
const ContactPage = () => (
  <div className="text-center text-4xl font-bold">联系</div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <Layout>
      <PageTransition location={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageTransition>
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
