import { Container } from "@/components/layout";

export function Home() {
  return (
    <Container className="space-y-12">
      <section className="mt-16 flex flex-col items-center space-y-6 text-center">
        <h1 className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
          简约而不简单
        </h1>
        <p className="max-w-xl text-xl text-zinc-400">
          极简设计，高效开发，创造令人印象深刻的数字体验
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:bg-zinc-800/60"
          >
            <h3 className="mb-3 text-xl font-semibold text-zinc-200">
              项目展示 {i}
            </h3>
            <p className="text-zinc-400">
              这里是项目简短描述内容，点击查看更多详情。
            </p>
          </div>
        ))}
      </section>
    </Container>
  );
}
