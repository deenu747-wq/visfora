"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ProductInner() {
  const searchParams = useSearchParams();
  const rawPrompt = searchParams.get("prompt") || "";
  
  // Clean the prompt - remove "Generate an image of"
  const cleanPrompt = rawPrompt
    .replace(/Generate an image of/gi, "")
    .replace(/Generate an image/gi, "")
    .trim() || "football player";

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cleanPrompt) {
      setLoading(true);
      // Use flux model - much better and not blocked
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?model=flux&width=1024&height=1024&seed=${Date.now()}&nologo=true`;
      setImg(url);
      setLoading(false);
    }
  }, [cleanPrompt]);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-8">
      <p className="text-sm opacity-60">Raw: {rawPrompt}</p>
      <p className="font-bold mt-2">Clean: {cleanPrompt}</p>
      <div className="mt-6 bg-white border rounded-[24px] p-4 min-h-[500px] flex items-center justify-center">
        {loading ? "Generating..." : <img src={img} alt={cleanPrompt} className="rounded-xl" onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/football/1024/1024` }} />}
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}><ProductInner /></Suspense>
}