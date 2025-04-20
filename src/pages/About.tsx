import { PageTemplate } from "@/components/layout";

export function About() {
  return (
    <PageTemplate title="关于我们" subtitle="了解我们的团队、理念和使命">
      <div className="space-y-8">
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-200">
            我们的理念
          </h2>
          <p className="text-zinc-400">
            极简设计不仅仅是视觉上的简洁，更是对用户体验的深度思考。
            我们相信，真正优秀的设计应该是无形的，让用户专注于内容本身。
          </p>
        </section>

        <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-200">
            核心价值
          </h2>
          <ul className="list-inside list-disc space-y-2 text-zinc-400">
            <li>以用户为中心的设计思维</li>
            <li>不断探索技术与创意的边界</li>
            <li>追求卓越与完美的工匠精神</li>
            <li>开放协作与知识共享</li>
          </ul>
        </section>
      </div>
    </PageTemplate>
  );
}
