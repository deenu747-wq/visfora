"use client";
import { useState } from "react";

export default function VectorStudio() {
  return (
    <div className="min-h-screen bg-[#080c13] text-white font-sans">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 md:px-10 h-[72px] border-b border-white/[0.08] bg-[#0a0f18]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5de1ff] flex items-center justify-center">
            <div className="w-7 h-7 bg-[#0a0f18] rounded-md" style={{clipPath:'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}}></div>
          </div>
          <div className="leading-none">
            <div className="font-bold text-[22px] -mb-1">Vector</div>
            <div className="font-bold text-[22px]">Studio</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-[15px] text-white/60">
          <span>Dashboard</span>
          <span>Projects</span>
          <span className="text-[#5de1ff] border-b-2 border-[#5de1ff] pb-1">Batch</span>
          <span>Settings</span>
        </nav>
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 rounded-full border border-white/20" />
          <div className="w-6 h-6 rounded-full bg-white/10" />
          <div className="w-8 h-8 rounded-full border border-[#5de1ff] flex items-center justify-center text-[#5de1ff] text-sm font-bold">VS</div>
        </div>
      </header>

      {/* HERO TEXT */}
      <div className="text-center pt-12 pb-10 px-4">
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight">
          Turn any image into a clean <span className="text-white drop-shadow-[0_0_12px_rgba(93,225,255,0.8)]">scalable vector</span> in seconds
        </h1>
        <p className="text-white/60 mt-3 text-[14px] md:text-[16px]">
          Upload, preview, and export production-ready SVGs with batch processing — fast, accurate, and scalable.
        </p>
      </div>

      {/* 3 CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 md:px-10 pb-16 max-w-[1400px] mx-auto">
        
        {/* CARD 1 - UPLOAD */}
        <div className="rounded-[16px] border border-white/[0.08] bg-[#111722]/80 p-5 backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#5de1ff]">☁️</div>
            <div>
              <div className="font-bold text-[18px]">Upload JPG PNG</div>
              <div className="text-[#5de1ff] text-[13px]">drag & drop</div>
            </div>
          </div>

          <div className="rounded-[16px] border-2 border-dashed border-[#5de1ff]/60 p-8 text-center">
            <div className="text-[#5de1ff] text-4xl mb-4">☁️↑</div>
            <div className="font-semibold">Drag & drop your image here</div>
            <div className="mt-2 text-sm">or <span className="text-[#5de1ff] border-b border-[#5de1ff]">browse files</span></div>
            <div className="mt-6 text-[12px] text-white/50">Supports JPG, PNG · Max 50MB</div>
          </div>

          <button className="mt-6 w-full h-[48px] rounded-lg bg-[#5de1ff] text-black font-bold text-[16px]">Choose File</button>
          <div className="mt-3 text-[12px] text-white/60 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#5de1ff] flex items-center justify-center text-black text-[10px]">✓</span>
            Secure · Processed locally · No data stored
          </div>
        </div>

        {/* CARD 2 - PREVIEW */}
        <div className="rounded-[16px] border border-white/[0.08] bg-[#111722]/80 p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#5de1ff]">◧</div>
            <div>
              <div className="font-bold text-[18px]">Preview SVG Vector</div>
              <div className="text-[#5de1ff] text-[13px]">wolf wireframe</div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-black/40 rounded-lg px-3 py-2 text-[11px] mb-3">
            <span className="bg-white/10 px-2 py-1 rounded">Wireframe</span>
            <span className="text-white/50">Layers: Outline · Details · Background removed</span>
            <span className="w-8 h-4 bg-[#5de1ff] rounded-full"></span>
          </div>

          <div className="h-[300px] rounded-xl bg-[#0d121c] flex items-center justify-center">
            <img src="/studios/vector-studio-hero.png" alt="wolf" className="w-[80%] h-auto opacity-90" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 bg-white/[0.05] px-3 py-2 rounded-lg text-sm">
              <span>—</span> Zoom 120% <span>+</span>
            </div>
            <button className="border border-[#5de1ff] text-[#5de1ff] px-4 py-2 rounded-lg text-sm">Download SVG ↓</button>
          </div>
        </div>

        {/* CARD 3 - OUTPUT */}
        <div className="rounded-[16px] border border-white/[0.08] bg-[#111722]/80 p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#5de1ff]">⚙️</div>
            <div>
              <div className="font-bold text-[18px]">Output Settings</div>
              <div className="text-[#5de1ff] text-[13px]">batch 100x queue active</div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center"><span>Scale:</span><span className="border border-[#5de1ff]/50 px-4 py-1.5 rounded-md w-[120px]">2x</span></div>
            <div className="flex justify-between items-center"><span>Detail:</span><span className="border border-[#5de1ff]/50 px-4 py-1.5 rounded-md w-[120px]">High</span></div>
            <div className="flex justify-between items-center"><span>Background:</span><span className="border border-[#5de1ff]/50 px-4 py-1.5 rounded-md w-[120px]">Transparent</span></div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div className="font-bold text-[18px]">Batch Queue</div>
              <div className="bg-[#5de1ff] text-black text-[12px] px-3 py-1 rounded-md font-bold">100 items active</div>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-[68%] bg-[#5de1ff] rounded-full"></div>
            </div>
            <div className="flex justify-between text-[13px] mt-3">
              <span>Processing...</span><span>68/100</span>
            </div>
            <div className="text-[12px] text-white/50 mt-1">Est. 1m 23s remaining · 32 completed</div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="border border-[#5de1ff] text-[#5de1ff] h-[40px] rounded-lg text-sm">Pause Queue</button>
              <button className="bg-white/10 text-white/30 h-[40px] rounded-lg text-sm">Export All</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="border-t border-white/[0.06] bg-[#0a0f18] py-4 flex justify-center gap-10 md:gap-20 text-sm">
        <div className="flex items-center gap-2"><span className="text-[#5de1ff]">✓</span> Completed today: <b className="text-[18px]">312</b></div>
        <div className="flex items-center gap-2"><span className="text-[#5de1ff]">⚡</span> Avg processing: <b className="text-[18px]">1.2s</b></div>
        <div className="flex items-center gap-2"><span className="text-[#5de1ff]">$</span> Credits remaining: <b className="text-[18px]">2,450</b></div>
      </div>
    </div>
  );
}