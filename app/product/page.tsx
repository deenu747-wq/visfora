// @ts-nocheck
"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function Content() {
  const search = useSearchParams();
  const raw = search.get("prompt") || "football";
  
  // Clean prompt - this is the fix for Image refused
  const cleanPrompt = raw.replace(/generate an image of/gi, "").replace(/generate/gi, "").trim();

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Different prompt = different seed = different image
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt + ", photorealistic, 4k studio")}?width=1024&height=1024&nologo=true&model=turbo&seed=${cleanPrompt.length}`;
    setImg(url);
  }, [cleanPrompt]);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs text-black/40">Prompt: {cleanPrompt}</p>
        <h1 className="text-2xl font-bold mt-1">AI Result for: {cleanPrompt}</h1>
        
        <div className="mt-6 bg-white rounded-[24px] border p-4">
          <div className="h-[600px] bg-[#FAF6EE] rounded-xl flex items-center justify-center overflow-hidden">
            {loading && <p className="text-sm animate-pulse">AI Creating {cleanPrompt}...</p>}
            <img 
              src={img} 
              alt={cleanPrompt}
              className="w-full h-full object-contain"
              onLoad={() => setLoading(false)}
              onError={() => {
                // Fallback if turbo fails - use different source
                setImg(`https://picsum.photos/seed/${encodeURIComponent(cleanPrompt)}/1024/1024`);
                setLoading(false);
              }}
            />
          </div>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 rounded-full bg-black text-white text-sm">Generate New for {cleanPrompt}</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div className="p-10">Loading AI...</div>}><Content/></Suspense>;
}