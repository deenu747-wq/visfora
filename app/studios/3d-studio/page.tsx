"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Studio3D() {
  return (
    <div className="min-h-screen bg-[#2a2a35] p-4">
      {/* TOP NAV - VISFORA LOGO DOUBLE SIZE + LINKED */}
      <div className="flex items-center justify-between bg-[#1e1e28] rounded-xl px-6 py-3 mb-4 border border-white/5">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/Logo.png" alt="VISFORA" width={280} height={64} className="h-16 w-auto object-contain" priority />
          </Link>
          <div className="flex gap-6 text-sm">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} className={`pb-1 ${t==="Studio"?"text-white border-b-2 border-cyan-400 text-cyan-300":"text-white/60 hover:text-white"} cursor-pointer`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-white/60">
          <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center cursor-pointer">U</button>
          <button className="cursor-pointer">🔔</button>
          <button className="cursor-pointer">⚙️</button>
        </div>
      </div>

      {/* GENERATION MODE BAR */}
      <div className="flex items-center gap-3 bg-[#1e1e28] rounded-xl px-4 py-3 mb-4 border border-white/5">
        <span className="text-sm text-white/60">Generation Mode:</span>
        <button className="bg-[#2a2a35] border border-cyan-400 text-cyan-300 px-3 py-1.5 rounded-lg text-sm cursor-pointer">Text to 3D Prompt ▼</button>
        <input className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-cyan-400" placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" />
        <button className="bg-[#7dd8ff] hover:bg-[#6bc8ef] text-black font-bold px-5 py-2 rounded-lg cursor-pointer">⚡ Generate</button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold text-white/70">GENERATE</div>
            {[
              {l:"Image to 3D",a:true},{l:"Multi-Image"},{l:"Text to 3D"},{l:"Remesh"},{l:"Rig"},{l:"Animate"}
            ].map(b=>(
              <button key={b.l} className={`w-full text-left px-3 py-2.5 rounded-lg mb-2 text-sm border cursor-pointer ${b.a?"bg-[#7dd8ff] text-black border-cyan-300 font-semibold":"bg-[#15151e] border-white/10 text-white/80 hover:bg-white/5"}`}>
                {b.l}
              </button>
            ))}
          </div>
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold text-white/70">UPLOAD</div>
            <div className="border border-dashed border-white/30 rounded-xl p-4 text-center text-white">
              <div className="text-cyan-300 text-2xl">☁️</div>
              <div className="text-sm mt-1">Drag & drop image here</div>
              <div className="text-[11px] text-white/50">or click to browse • PNG, JPG</div>
            </div>
            <button className="mt-3 w-[110px] mx-auto block border border-cyan-400/50 rounded-lg py-1.5 text-xs text-white hover:bg-white/5 cursor-pointer">Upload Image</button>
          </div>
        </div>

        <div className="col-span-7 bg-[#12121a] rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 text-white">
            <h2 className="font-bold">3D Model Viewer</h2>
            <div className="flex gap-2 text-[11px] items-center">
              <span className="text-cyan-300">⬢ Three.js • Orbit Controls</span>
              <button className="border border-white/10 rounded-lg px-2 py-1 hover:bg-white/5 cursor-pointer">↻ Reset View</button>
              <button className="border border-white/10 rounded-lg px-2 py-1 hover:bg-white/5 cursor-pointer">Fullscreen</button>
            </div>
          </div>
          <div className="relative w-[400px] h-[400px] aspect-square flex items-center justify-center bg-[#12121a] shrink-0 overflow-hidden rounded-xl">
            <Image src="/helmet.png" alt="helmet" width={800} height={800} className="w-[320px] h-[320px] object-contain relative z-10" priority />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-[11px] text-white z-20">Model: helmet_v02 • 12.4k polygons • 1 material</div>
          </div>
          <div className="px-4 py-2 text-center text-xs text-green-300 border-t border-white/5">• Ready • Loaded in 1.2s</div>
        </div>

        <div className="col-span-3 bg-[#1e1e28] rounded-xl p-4 border border-white/5 text-white">
          <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold">EXPORT & VIEW</div>
          <div className="text-xs font-bold mb-3">DOWNLOAD FORMATS</div>
          <div className="grid grid-cols-2 gap-2">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} className="border border-white/20 rounded-lg py-2.5 text-xs hover:bg-white/5 cursor-pointer">⬇ {f}</button>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold">AR VIEW</div>
            <button className="w-full bg-[#7dd8ff] text-black font-semibold py-2.5 rounded-lg text-sm cursor-pointer">Launch AR View</button>
          </div>
          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="text-xs font-bold mb-3">EXPORT OPTIONS</div>
            <button className="w-full border border-white/20 rounded-lg py-2.5 text-sm mt-3 cursor-pointer">⬇ Export All Formats</button>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-[#1e1e28] rounded-xl px-4 py-3 flex items-center justify-between border border-white/5 text-white">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-cyan-300">● ● AI generating 62%</span>
          <div className="w-[240px] h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 w-[62%]"></div></div>
          <span className="text-sm text-white/70 ml-2">Estimated 18s remaining</span>
        </div>
        <div className="flex gap-6 text-xs text-white/60">
          <div>Completed today <span className="text-white font-bold">14</span></div>
          <div>Avg processing <span className="text-white font-bold">22s</span></div>
          <div>Credits remaining <span className="text-white font-bold">187</span></div>
        </div>
      </div>
    </div>
  );
}


