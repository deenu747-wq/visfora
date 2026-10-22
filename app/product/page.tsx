"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Inside() {
  const q = useSearchParams().get("prompt") || "No prompt";
  return (
    <div style={{padding:40, background:'#FFFCF7', minHeight:'100vh'}}>
      <h1>Product Studio is Working!</h1>
      <p>Your prompt: {q}</p>
      <img style={{marginTop:20, borderRadius:20}} src={`https://picsum.photos/seed/${Date.now()}/800/600`} alt="" />
    </div>
  )
}
export default function Page(){
  return <Suspense fallback={<div>Loading...</div>}><Inside/></Suspense>
}