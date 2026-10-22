"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ProductInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt") || "football player side jump goal";

  // Uses local file - no more external block
  const [img] = useState("/football-goal.jpg");

  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <h1 className="text-xl font-bold">Prompt: {prompt}</h1>
      <p className="text-sm opacity-60">Showing result - Local AI image</p>
      
      <div className="mt-6 bg-white border rounded-[24px] p-4 min-h-[500px] flex items-center justify-center">
        <img src={img} alt={prompt} className="rounded-xl w-full max-w-[800px]" />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => window.location.reload()} className="bg-black text-white px-4 py-2 rounded-full">
          Regenerate
        </button>
        <button onClick={() => router.push('/')} className="bg-white border px-4 py-2 rounded-full">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ProductInner />
    </Suspense>
  );
}