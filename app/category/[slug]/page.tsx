"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

  const isSexting = slug === "sexting";

  const [list, setList] = useState<any[]>([]);
  const [ru, setRu] = useState("");
  const [en, setEn] = useState("");
  const [toast, setToast] = useState("");

  // 📥 загрузка (ТОЛЬКО НЕ SEXTING)
  useEffect(() => {
    if (isSexting) return;

    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("category", slug)
        .order("id", { ascending: false });

      setList(data || []);
    };

    if (slug) load();
  }, [slug]);

  // ➕ добавление (ТОЛЬКО НЕ SEXTING)
  const add = async () => {
    if (isSexting) return;
    if (!ru || !en) return;

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          category: slug,
          ru,
          en,
        },
      ])
      .select();

    if (!error && data) {
      setList((prev) => [...data, ...prev]);
    }

    setRu("");
    setEn("");

    setToast("Добавлено ✅");
    setTimeout(() => setToast(""), 1200);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast("Скопировано ✅");
    setTimeout(() => setToast(""), 1200);
  };

  // 🔥 SEXTING ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ
  if (isSexting) {
    const list = subcategories.sexting;

    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <Link href="/" className="text-zinc-400">
          ← Назад
        </Link>

        <h1 className="text-3xl font-bold my-6">
          Категория: sexting
        </h1>

        <div className="grid gap-3">
          {list.map((item) => (
            <Link
              key={item.slug}
              href={`/category/sexting/${item.slug}`}
              className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </main>
    );
  }

  // 🔥 ВСЕ ОСТАЛЬНЫЕ КАТЕГОРИИ
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <Link href="/" className="text-zinc-400">
        ← Назад
      </Link>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <h1 className="text-3xl font-bold my-6">
        Категория: {slug}
      </h1>

      {/* FORM */}
      <div className="bg-zinc-900 p-4 rounded-xl mb-6">
        <input
          value={ru}
          onChange={(e) => setRu(e.target.value)}
          placeholder="RU текст"
          className="w-full mb-2 p-2 bg-zinc-800 rounded"
        />

        <input
          value={en}
          onChange={(e) => setEn(e.target.value)}
          placeholder="EN текст"
          className="w-full mb-2 p-2 bg-zinc-800 rounded"
        />

        <button
          onClick={add}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Добавить
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        {list.length === 0 && (
          <p className="text-zinc-500">Пока нет сообщений</p>
        )}

        {list.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 p-4 rounded flex justify-between"
          >
            <div>
              <p>{item.ru}</p>
              <p className="text-zinc-500 text-sm">{item.en}</p>
            </div>

            <button
              onClick={() => copy(item.en)}
              className="text-xs bg-zinc-800 px-3 py-1 rounded"
            >
              copy
            </button>
          </div>
        ))}
      </div>

    </main>
  );
}