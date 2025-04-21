import { Container } from "@/components/layout";

export function Home() {
  return (
    <Container className="space-y-8 sm:space-y-12">
      <section className="mt-8 sm:mt-16 flex flex-col items-center space-y-4 sm:space-y-6 text-center">
        <h1 className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent px-4">
          简约而不简单
        </h1>
        <p className="max-w-xl text-base sm:text-xl text-zinc-400 px-4">
          极简设计，高效开发，创造令人印象深刻的数字体验
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-zinc-800/60 group"
          >
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors">
              项目展示 {i}
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 group-hover:text-zinc-300 transition-colors">
              这里是项目简短描述内容，点击查看更多详情。
            </p>
          </div>
        ))}
      </section>
    </Container>
  );
}
