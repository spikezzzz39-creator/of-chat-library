"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const params = useParams();

  const slug = params?.slug as string;
  const subslug = params?.subslug as string | undefined;

  const isSubcategoryMode = Boolean(subslug);

  const [list, setList] = useState<any[]>([]);
  const [ru, setRu] = useState("");
  const [en, setEn] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // 📥 загрузка
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let query = supabase
        .from("messages")
        .select("*")
        .eq("category", slug);

      // 🔥 ВАЖНО: subcategory только если есть subslug
      if (isSubcategoryMode) {
        query = query.eq("subcategory", subslug);
      }

      const { data } = await query;

      setList(data || []);
      setLoading(false);
    };

    if (slug) load();
  }, [slug, subslug]);

  // ➕ добавление
  const add = async () => {
    if (!ru || !en) return;

    const payload: any = {
      category: slug,
      ru,
      en,
    };

    // 🔥 только sexting пишет subcategory
    if (isSubcategoryMode) {
      payload.subcategory = subslug;
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([payload])
      .select();

    if (!error && data) {
      setList((prev) => [...prev, ...data]);
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

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <Link href={`/category/${slug}`} className="text-zinc-400 hover:underline">
        ← Назад
      </Link>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 px-4 py-2 rounded-xl text-sm">
          {toast}
        </div>
      )}

      <h1 className="text-3xl font-bold my-6">
        {slug}{subslug ? ` / ${subslug}` : ""}
      </h1>

      {/* INPUT */}
      <div className="bg-zinc-900 p-4 rounded-xl mb-6">
        <input
          value={ru}
          onChange={(e) => setRu(e.target.value)}
          placeholder="RU текст"
          className="w-full mb-2 p-3 bg-zinc-800 rounded-lg"
        />

        <input
          value={en}
          onChange={(e) => setEn(e.target.value)}
          placeholder="EN текст"
          className="w-full mb-3 p-3 bg-zinc-800 rounded-lg"
        />

        <button
          onClick={add}
          className="bg-blue-600 px-6 py-2 rounded-lg"
        >
          Добавить
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        {loading && <p className="text-zinc-500">Загрузка...</p>}

        {!loading && list.length === 0 && (
          <p className="text-zinc-500">Пока нет сообщений</p>
        )}

        {list.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 p-4 rounded-xl flex justify-between"
          >
            <div>
              <p>{item.ru}</p>
              <p className="text-zinc-500 text-sm">{item.en}</p>
            </div>

            <button
              onClick={() => copy(item.en)}
              className="text-xs bg-zinc-800 px-3 py-1 rounded"
            >
              📋 copy
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}