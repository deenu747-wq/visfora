"use client";
import { useState } from "react";

export default function Studio3D() {
  const [generating] = useState(62);

  return (
    <div className="min-h-screen bg-[#2a2a35] text-white p-4 font-sans">
      {/* TOP NAV */}
      <div className="flex items-center justify-between bg-[#1e1e28] rounded-xl px-6 py-3 mb-4 border border-white/5">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-400/20 border border-cyan-400 rounded flex items-center justify-center">⬢</div>
            <span className="text-xl font-bold"><span className="text-cyan-400">3D</span> Studio</span>
          </div>
          <div className="flex gap-6 text-sm">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} className={`pb-1 ${t==="Studio" ? "text-white border-b-2 border-cyan-400 text-cyan-300" : "text-white/60 hover:text-white"} cursor-pointer`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center cursor-pointer">U</button>
          <button className="cursor-pointer">🔔</button>
          <button className="cursor-pointer">⚙️</button>
        </div>
      </div>

      {/* PROMPT BAR */}
      <div className="flex items-center gap-3 bg-[#1e1e28] rounded-xl px-4 py-3 mb-4 border border-white/5">
        <span className="text-sm text-white/60 whitespace-nowrap">Generation Mode:</span>
        <button className="bg-[#2a2a35] border border-cyan-400 text-cyan-300 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 cursor-pointer">
          Text to 3D Prompt ▼
        </button>
        <input
          className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2 text-sm placeholder-white/40 outline-none focus:border-cyan-400"
          placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe"
        />
        <button className="bg-[#7dd8ff] hover:bg-[#6bc8ef] text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
          ⚡ Generate
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold tracking-wider">GENERATE</div>
            {[
              {l:"Image to 3D",a:true, i:"🖼️"},
              {l:"Multi-Image", i:"🗂️"},
              {l:"Text to 3D", i:"〒"},
              {l:"Remesh", i:"⬢"},
              {l:"Rig", i:"🧍"},
              {l:"Animate", i:"🏃"},
            ].map(b=>(
              <button key={b.l} className={`w-full text-left px-3 py-2.5 rounded-lg mb-2 text-sm border flex items-center gap-2 cursor-pointer ${b.a ? "bg-[#7dd8ff] text-black border-cyan-300 font-semibold" : "bg-[#15151e] border-white/10 hover:bg-white/5 text-white/80"}`}>
                <span>{b.i}</span> {b.l}
              </button>
            ))}
          </div>
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold tracking-wider">UPLOAD</div>
            <div className="border border-dashed border-white/30 rounded-xl p-4 text-center">
              <div className="text-cyan-300 text-2xl mb-2">☁️</div>
              <div className="text-sm font-medium">Drag & drop image here</div>
              <div className="text-[11px] text-white/50 mt-1">or click to browse • PNG, JPG</div>
            </div>
            <button className="mt-3 w-[110px] mx-auto block border border-cyan-400/50 rounded-lg py-1.5 text-xs hover:bg-white/5 cursor-pointer">Upload Image</button>
          </div>
        </div>

        {/* CENTER */}
        <div className="col-span-7 bg-[#12121a] rounded-xl border border-white/5 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <h2 className="font-bold">3D Model Viewer</h2>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-cyan-300 flex items-center gap-1">⬢ Three.js • Orbit Controls</span>
              <button className="border border-white/10 rounded-lg px-2 py-1 hover:bg-white/5 cursor-pointer">↻ Reset View</button>
              <button className="border border-white/10 rounded-lg px-2 py-1 hover:bg-white/5 cursor-pointer">Fullscreen</button>
              <button className="border border-white/10 rounded-lg px-2 py-1 cursor-pointer">[ ]</button>
            </div>
          </div>
          <div className="flex-1 relative min-h-[520px] bg-gradient-to-b from-[#1a1a28] to-[#12121a] flex items-center justify-center">
            {/* Grid floor */}
            <div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize:"40px 40px"}}></div>
            <img src="https://i.imgur.com/8Km9tLL.png" alt="helmet wireframe" className="w-[340px] opacity-90 relative z-10 mix-blend-screen invert" />
            {/* Orbit icon */}
            <div className="absolute bottom-24 right-24 w-20 h-20 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-white/60 z-10">
              ↻<br/>Orbit
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-[11px] z-10">
              Model: helmet_v02 • 12.4k polygons • 1 material
            </div>
          </div>
          <div className="px-4 py-2 text-center text-xs text-green-300 border-t border-white/5">
            • Ready • Loaded in 1.2s
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-3 bg-[#1e1e28] rounded-xl p-4 border border-white/5 flex flex-col gap-5">
          <div>
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold tracking-wider">EXPORT & VIEW</div>
            <div className="text-xs font-bold mb-3 tracking-wider">DOWNLOAD FORMATS</div>
            <div className="grid grid-cols-2 gap-2">
              {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
                <button key={f} className="border border-white/20 rounded-lg py-2.5 text-xs flex items-center justify-center gap-1 hover:bg-white/5 cursor-pointer">
                  <span className="text-cyan-300">⬇</span> {f}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="text-[11px] bg-white/10 rounded px-2 py-1 w-fit mb-3 font-bold tracking-wider">AR VIEW</div>
            <button className="w-full bg-[#7dd8ff] text-black font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer">
              👓 Launch AR View
            </button>
            <div className="text-[11px] text-white/50 mt-2">View in augmented reality on mobile</div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="text-xs font-bold mb-3">EXPORT OPTIONS</div>
            <div className="flex gap-2">
              <button className="bg-[#7dd8ff]/20 border border-cyan-400/30 text-cyan-200 text-[11px] px-2 py-1 rounded-full cursor-pointer">☑ Include Textures</button>
              <button className="border border-white/10 text-[11px] px-2 py-1 rounded-full hover:bg-white/5 cursor-pointer">Compressed</button>
            </div>
            <button className="w-full mt-4 border border-white/20 rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-white/5 cursor-pointer">
              ⬇ Export All Formats
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM AI NAV BAR */}
      <div className="mt-4 bg-[#1e1e28] rounded-xl px-4 py-3 flex items-center justify-between border border-white/5">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-cyan-300">● ● AI generating 62%</span>
          <div className="w-[240px] h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400" style={{width:`${generating}%`}}></div>
          </div>
          <span className="text-sm text-white/70 ml-2">Estimated 18s remaining</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/60 border-l border-white/10 pl-6">
          <div>Completed today <span className="text-white font-bold">14</span></div>
          <div className="border-l border-white/10 pl-6">Avg processing <span className="text-white font-bold">22s</span></div>
          <div className="border-l border-white/10 pl-6 flex items-center gap-1">💳 Credits remaining <span className="text-white font-bold">187</span></div>
        </div>
      </div>
    </div>
  );
}