"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const subcategories: Record<string, { title: string; slug: string }[]> = {
  sexting: [
    { title: "💕 Лёгкий флирт", slug: "flirt" },
    { title: "👙 Дразнение (разденься детка)", slug: "teasing" },
    { title: "👄 Открываю ротик, хочу сосать!", slug: "playful" },
    { title: "💦 Мои трусики мокрые, хочу ласкать!", slug: "attention" },
    { title: "🍆 Киска-дилдо-крики-сказка", slug: "romance" },
    { title: "💬 Эмоции", slug: "emotion" },
    { title: "🎯 Прогрев", slug: "warming" },
    { title: "⚡ Провокация", slug: "provocation" },
    { title: "🔒 Связь", slug: "bonding" },
  ],
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const list = subcategories[slug] ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <Link href="/" className="text-zinc-400 hover:text-white">
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold my-6">
        Категория: {slug}
      </h1>

      <div className="grid gap-3">
        {list.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${slug}/${item.slug}`}
            className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </main>
  );
}