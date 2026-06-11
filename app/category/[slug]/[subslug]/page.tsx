"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const category = params.slug;
  const subcategory = params.subslug;

  const [messages, setMessages] = useState<any[]>([]);
  const [textRu, setTextRu] = useState("");
  const [textEn, setTextEn] = useState("");

  // 📥 загрузка
  const load = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("category", category)
      .eq("subcategory", subcategory)
      .order("id", { ascending: false });

    setMessages(data || []);
  };

  useEffect(() => {
    load();
  }, [category, subcategory]);

  // ➕ добавление
  const add = async () => {
    if (!textRu || !textEn) return;

    await supabase.from("messages").insert({
      category,
      subcategory,
      text_ru: textRu,
      text_en: textEn,
    });

    setTextRu("");
    setTextEn("");
    load();
  };

  // 📋 копирование EN
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <h1 className="text-2xl font-bold mb-2">
        {category} / {subcategory}
      </h1>

      {/* INPUT */}
      <div className="mb-6 space-y-2">
        <input
          className="w-full p-2 bg-zinc-800 rounded"
          placeholder="Русский текст"
          value={textRu}
          onChange={(e) => setTextRu(e.target.value)}
        />

        <input
          className="w-full p-2 bg-zinc-800 rounded"
          placeholder="English text"
          value={textEn}
          onChange={(e) => setTextEn(e.target.value)}
        />

        <button
          onClick={add}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Добавить
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {messages.length === 0 && (
          <p className="text-gray-400">Пока нет сообщений</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="bg-zinc-900 p-4 rounded flex justify-between">

            <div>
              <p>{msg.text_ru}</p>
              <p className="text-gray-400">{msg.text_en}</p>
            </div>

            <button
              onClick={() => copy(msg.text_en)}
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