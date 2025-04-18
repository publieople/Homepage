import { FC, lazy, Suspense } from "react";

// 懒加载博客卡片组件
const BlogCard = lazy(() =>
  import("@/components/ui/blog-card").then((mod) => ({ default: mod.BlogCard }))
);

// 博客文章类型定义
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  publishDate: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  url: string;
}

interface BlogProps {
  className?: string;
  posts: BlogPost[];
}

const Blog: FC<BlogProps> = ({ className, posts }) => {
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">我的博客</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          分享我对前端开发、UI设计和技术趋势的见解和经验。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense
          fallback={
            <div className="col-span-full text-center py-12">
              加载博客文章...
            </div>
          }
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Suspense>
      </div>
    </section>
  );
};

export { Blog };
export default Blog;
