"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ProductInner() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  const [imageUrl, setImageUrl] = useState("");
  
  useEffect(() => {
    if (prompt) {
      // This generates REAL image from your prompt
      const encoded = encodeURIComponent(prompt);
      setImageUrl(`https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&nologo=true&seed=${Date.now()}`);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-10">
      <h1 className="text-2xl font-bold">Generated: {prompt}</h1>
      <div className="mt-6 bg-white p-4 rounded-[24px] border min-h-[500px] flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={prompt} className="rounded-xl max-w-full" />
        ) : (
          <div>Waiting for prompt...</div>
        )}
      </div>
      <a href="/" className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-full">Back</a>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductInner />
    </Suspense>
  );
}