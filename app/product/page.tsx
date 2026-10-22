// @ts-nocheck
"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Content() {
  const params = useSearchParams();
  const prompt = params.get("prompt") || "football player side jump goal";
  const [q, setQ] = useState(prompt);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex gap-2 mb-2">
          <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 px-4 py-3 rounded-full border bg-white text-sm" />
          <button onClick={()=>window.location.href=`/product?prompt=${encodeURIComponent(q)}`} className="px-6 py-3 rounded-full bg-black text-white text-sm">Generate</button>
        </div>
        <p className="text-xs text-black/40 mb-4">Prompt: {q}</p>
        <div className="rounded-[24px] bg-white border p-4 shadow">
          <img src="/football-side-jump.jpg" alt={q} className="w-full h-[600px] object-contain bg-[#FAF6EE] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
export default function Page() { return <Suspense fallback={<div className="p-10">Loading...</div>}><Content/></Suspense>; }