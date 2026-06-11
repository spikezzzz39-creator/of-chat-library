"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    { name: "💕 Секстинг", slug: "sexting" },
    { name: "👋 Знакомство", slug: "intro" },
    { name: "💰 Продажи", slug: "sales" },
    { name: "🔥 Реактивация", slug: "reactivation" },
    { name: "⭐ VIP", slug: "vip" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <header className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-blue-400">
          ⚡
        </div>

        <h1 className="text-4xl font-bold">
          OnlyFans <span className="text-zinc-400">samuray</span>
        </h1>
      </header>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => router.push(`/category/${cat.slug}`)}
            className="bg-zinc-900 p-6 rounded-xl cursor-pointer hover:bg-zinc-800"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </main>
  );
}