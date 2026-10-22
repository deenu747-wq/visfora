// @ts-nocheck
"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ProductContent() {
  const params = useSearchParams();
  const prompt = params.get("prompt") || "football goalkeeper side jump save";
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // THIS IS YOUR AI TOOL - generates from prompt, no folder
    const generatedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", studio product photography, 4k, ultra realistic, white background")}?width=1024&height=1024&nologo=1&model=flux&seed=${Date.now()}`;
    setImg(generatedUrl);
  }, [prompt]);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">Product Studio</h1>
        <p className="text-[13px] text-black/50 mt-1">Generating for: <b className="text-black">{prompt}</b></p>

        <div className="mt-6 rounded-[24px] bg-white border border-black/5 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          <div className="h-[560px] bg-[#FAF6EE] rounded-xl flex items-center justify-center overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
                <p className="text-xs text-black/40">AI Generating: {prompt}...</p>
              </div>
            )}
            {img && (
              <img 
                src={img} 
                alt={prompt}
                onLoad={() => setLoading(false)}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={() => setImg(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`)} className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium">Regenerate</button>
            <button onClick={() => window.open(img, '_blank')} className="px-6 py-3 rounded-full border border-black/10 text-sm">Download HD</button>
            <span className="ml-auto text-[11px] text-black/30 py-3">No folder needed • Prompt-based AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading AI studio...</div>}>
      <ProductContent />
    </Suspense>
  );
}