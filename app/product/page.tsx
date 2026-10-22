// @ts-nocheck
"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ProductContent() {
  const params = useSearchParams();
  let raw = params.get("prompt") || "football player side jump";
  
  // Force clean - block git commands
  if (raw.includes("del ") || raw.includes("git ") || raw.includes("public") || raw.length > 100) {
    raw = "football player side jump goal";
  }
  
  const [prompt, setPrompt] = useState(raw);
  const [attempt, setAttempt] = useState(0);
  
  // 3 Sources - if 1 fails, 2nd works
  const sources = [
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " ultra realistic photo")}?width=1024&height=1024&nologo=true&seed=${attempt}`,
    `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1024/1024`,
    `https://loremflickr.com/1024/1024/${encodeURIComponent(prompt.split(" ")[0])}?lock=${attempt}`
  ];
  
  const [srcIndex, setSrcIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex gap-2 mb-4">
          <input 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border bg-white text-sm"
            placeholder="football player side jump"
          />
          <button onClick={() => { setAttempt(Date.now()); setSrcIndex(0); }} className="px-6 py-2 rounded-full bg-black text-white text-sm">Generate</button>
        </div>
        <p className="text-xs text-black/40 mb-2">Prompt: {prompt} • Source: {srcIndex + 1}/3</p>

        <div className="rounded-[24px] bg-white border p-4 shadow">
          <div className="h-[560px] bg-[#FAF6EE] rounded-xl overflow-hidden flex items-center justify-center">
            <img 
              src={sources[srcIndex]} 
              alt={prompt}
              className="w-full h-full object-contain"
              onError={() => {
                if (srcIndex < 2) setSrcIndex(srcIndex + 1);
              }}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => { setAttempt(Date.now()); setSrcIndex(0); }} className="px-6 py-3 rounded-full bg-black text-white text-sm">Regenerate (AI)</button>
            <button onClick={() => setSrcIndex((srcIndex + 1) % 3)} className="px-6 py-3 rounded-full border text-sm">Switch Source</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return <Suspense fallback={<div className="p-10">Loading...</div>}><ProductContent /></Suspense>;
}