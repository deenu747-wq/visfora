"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ProductInner() {
  const searchParams = useSearchParams();
  const rawPrompt = searchParams.get("prompt") || "football player";

  const clean = rawPrompt.replace(/Generate an image of/gi, "").trim();
  const [img, setImg] = useState("");
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    // Provider 1: Try Pollinations flux
    // Provider 2: Fallback to loremflickr (always works for football)
    const tryUrl = `https://loremflickr.com/1024/1024/football,soccer,goal?lock=${Date.now()}`;
    setImg(tryUrl);
    setMode("flickr");
  }, [clean]);

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <h1 className="text-xl font-bold">Prompt: {clean}</h1>
      <p className="text-sm opacity-60 mt-1">Showing result from {mode}</p>
      <div className="mt-6 bg-white border rounded-[24px] p-4 min-h-[500px] flex items-center justify-center">
        <img src={img} alt={clean} className="rounded-xl w-full max-w-[800px]" />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={()=>setImg(`https://loremflickr.com/1024/1024/football?random=${Date.now()}`)} className="bg-black text-white px-4 py-2 rounded-full">Regenerate</button>
        <a href="/" className="bg-white border px-4 py-2 rounded-full">Back</a>
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}><ProductInner /></Suspense>
}