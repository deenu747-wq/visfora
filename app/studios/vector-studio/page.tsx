"use client"
import { useState } from "react"
import Image from "next/image"

export default function VectorStudioFinal() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="min-h-screen bg-[#050a12] text-white p-3 md:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto bg-[#080c13] rounded-2xl border border-[#1a2a3a] p-4 md:p-6 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="text-[#5de1ff] text-2xl">🪄</div>
            <h1 className="text-[28px] font-bold tracking-tight">Text to Vector Prompt</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg bg-[#0f1a29] border border-[#5de1ff]/30 flex items-center justify-center text-[#5de1ff]">⚙️</button>
            <button className="w-10 h-10 rounded-lg bg-[#0f1a29] border border-[#5de1ff]/30 flex items-center justify-center text-[#5de1ff]">⚖️</button>
            <button className="w-10 h-10 rounded-lg bg-[#0f1a29] border border-[#5de1ff]/30 flex items-center justify-center text-[#5de1ff]">✨</button>
            <div className="flex gap-2 ml-4">
              <span className="text-xl opacity-60">🔔</span>
              <span className="text-xl opacity-60">🔔</span>
            </div>
          </div>
        </div>

        {/* PROMPT BAR - WHERE PROMPT IS INSERTED */}
        <div className="relative mb-6">
          <div className="flex items-center bg-[#0a121e] border border-[#5de1ff]/60 rounded-xl px-5 py-4 shadow-[0_0_20px_rgba(93,225,255,0.15),inset_0_0_20px_rgba(93,225,255,0.05)]">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vector... e.g. minimal geometric wolf head, neon cyan wireframe, clean lines"
              className="flex-1 bg-transparent outline-none text-[16px] text-white placeholder:text-[#5de1ff] placeholder:font-semibold"
            />
            <span className="text-[#8a9bb0] text-[16px] ml-2 hidden md:inline"> e.g. minimal geometric wolf head, neon cyan wireframe, clean lines</span>
            <button className="ml-4 bg-[#5de1ff] hover:bg-[#7de8ff] text-black font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(93,225,255,0.6)] transition-all">
              <span>✨</span> Generate
            </button>
          </div>
        </div>

        {/* 3 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          
          {/* Card 1 - Upload */}
          <div className="bg-[#0c141f] border border-[#5de1ff]/20 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[#0a121e] border border-[#5de1ff]/50 flex items-center justify-center">
                <span className="text-[#5de1ff] text-xl">📤</span>
              </div>
              <h3 className="font-bold text-[18px]">Upload JPG PNG</h3>
            </div>
            <p className="text-[#8a9bb0] text-[14px] mb-4">Drag & drop your files here</p>
            <div className="border border-dashed border-[#5de1ff]/60 rounded-lg flex-1 flex flex-col items-center justify-center py-10 mb-4 bg-[#080f1a]">
              <div className="flex items-center gap-3 text-[#8a9bb0]">
                <div className="w-8 h-10 border rounded flex items-center justify-center text-[10px]">JPG</div>
                <div className="text-left text-[14px] leading-tight">
                  JPG, PNG<br/>up to 50MB
                </div>
              </div>
            </div>
            <button className="w-full border border-[#5de1ff] text-[#5de1ff] py-2.5 rounded-lg font-medium hover:bg-[#5de1ff]/10">Browse Files</button>
          </div>

          {/* Card 2 - Preview - USING YOUR wolf.jpg */}
          <div className="bg-[#0c141f] border border-[#5de1ff]/20 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-[#0a121e] border border-[#5de1ff]/50 flex items-center justify-center">
                <span className="text-[#5de1ff] text-xl">〰️</span>
              </div>
              <h3 className="font-bold text-[18px]">Preview SVG Vector</h3>
            </div>
            <div className="bg-[#080f1a] rounded-lg border border-[#1a2a3a] p-2 flex-1 flex items-center justify-center">
              <Image
                src="/studios/vector-studio/wolf.jpg"
                alt="wolf wireframe"
                width={600}
                height={400}
                className="w-full h-auto object-contain rounded"
                priority
              />
            </div>
            <p className="text-center text-[#5de1ff] text-[14px] font-medium mt-3">wolf_wireframe_final.svg</p>
            <div className="flex justify-center mt-2">
              <span className="bg-[#1a2a3a] text-[#8a9bb0] text-[13px] px-3 py-1 rounded-lg">SVG • 24.6 KB • 1200x1200</span>
            </div>
            <div className="flex gap-3 mt-4 justify-center">
              <span className="flex items-center gap-1 bg-[#0a121e] border border-[#2a3a4a] px-3 py-1.5 rounded-lg text-[13px]"><span className="text-[#5de1ff]">›</span> Zoom: 100%</span>
              <span className="flex items-center gap-1 bg-[#0a121e] border border-[#2a3a4a] px-3 py-1.5 rounded-lg text-[13px]"><span className="text-[#5de1ff]">⊞</span> Toggle Grid</span>
            </div>
          </div>

          {/* Card 3 - Output */}
          <div className="bg-[#0c141f] border border-[#5de1ff]/20 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[#0a121e] border border-[#5de1ff]/50 flex items-center justify-center">
                <span className="text-[#5de1ff] text-xl">⚙️</span>
              </div>
              <h3 className="font-bold text-[18px]">Output Settings</h3>
            </div>
            <h4 className="font-bold text-[17px] mb-4">Batch Queue</h4>
            <div className="space-y-3 text-[14px] mb-3">
              <div className="flex justify-between"><span className="text-[#8a9bb0]">Format:</span><span className="font-medium">SVG Vector <span className="text-[#5de1ff] ml-6">⌄</span></span></div>
              <div className="flex justify-between"><span className="text-[#8a9bb0]">Quality:</span><span className="font-medium">High (Precision) <span className="text-[#5de1ff] ml-2">✓</span></span></div>
              <div className="flex justify-between items-center"><span className="text-[#8a9bb0]">Scale:</span><span className="font-bold">2x Resize</span><div className="w-10 h-5 bg-[#5de1ff] rounded-full relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white/30 rounded-full"></div></div></div>
              <div className="flex justify-between"><span className="text-[#8a9bb0]">Queue:</span><span className="text-[#8a9bb0]">12 files pending</span></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="bg-[#0a121e] rounded px-3 py-2 flex justify-between text-[13px] text-[#8a9bb0]"><span>≡ batch_07.png — Queued</span><span>🕒</span></div>
              <div className="bg-[#0a121e] rounded px-3 py-2 flex justify-between text-[13px] text-[#8a9bb0]"><span>≡ batch_08.jpg — Queued</span><span>🕒</span></div>
            </div>
            <button className="w-full bg-[#5de1ff] hover:bg-[#7de8ff] text-black font-bold py-3 rounded-lg mt-auto">Run Batch Export</button>
          </div>
        </div>

        {/* AI GENERATING BAR */}
        <div className="bg-[#0c141f] border border-[#5de1ff]/40 rounded-xl px-4 py-3.5 flex flex-col md:flex-row items-center gap-4 mb-6 shadow-[0_0_20px_rgba(93,225,255,0.1)]">
          <div className="flex items-center gap-4 flex-1 w-full">
            <div className="w-14 h-14 rounded-xl bg-[#0a121e] border border-[#5de1ff]/50 flex items-center justify-center text-[#5de1ff] text-2xl shadow-[0_0_15px_rgba(93,225,255,0.3)]">🧠</div>
            <div className="flex-1">
              <p className="text-[#5de1ff] font-bold text-[18px]">AI is generating vectors... 68%</p>
              <p className="text-[#8a9bb0] text-[13px] mt-1">— Cleaning edges — Removing background — Optimizing paths</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-[55%]">
            <div className="flex-1 h-4 bg-[#050a12] rounded-full border border-[#1a2a3a] p-1">
              <div className="h-full bg-gradient-to-r from-[#0a3a4a] to-[#5de1ff] rounded-full shadow-[0_0_15px_#5de1ff]" style={{width: '68%'}}></div>
            </div>
            <div className="text-right">
              <p className="text-[#5de1ff]/80 text-[13px]">68/100 processing</p>
              <span className="text-[#5de1ff] text-lg">↻</span>
            </div>
          </div>
        </div>

        {/* STATS FOOTER */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1a2a3a]/50">
          <div className="px-4 text-center py-2">
            <p className="text-[#c0cbd8] text-[14px] font-medium">Files Processed</p>
            <p className="text-[#5de1ff] text-[32px] font-bold leading-none mt-2">1,247</p>
            <span className="inline-flex items-center gap-1 bg-[#1a2a3a] text-[12px] px-2.5 py-1 rounded-lg mt-2 text-[#8a9bb0]"><span className="text-[#4ade80]">↗ +84</span> today</span>
          </div>
          <div className="px-4 text-center py-2">
            <p className="text-[#c0cbd8] text-[14px] font-medium">Time Saved</p>
            <p className="text-[#5de1ff] text-[32px] font-bold leading-none mt-2">14.2h</p>
            <span className="inline-flex bg-[#1a2a3a] text-[12px] px-2.5 py-1 rounded-lg mt-2 text-[#8a9bb0]">≈ 3.5h this week</span>
          </div>
          <div className="px-4 text-center py-2">
            <p className="text-[#c0cbd8] text-[14px] font-medium">Accuracy</p>
            <p className="text-[#5de1ff] text-[32px] font-bold leading-none mt-2">98.7%</p>
            <span className="inline-flex bg-[#1a2a3a] text-[12px] px-2.5 py-1 rounded-lg mt-2 text-[#8a9bb0]">Vector precision</span>
          </div>
          <div className="px-4 text-center py-2">
            <p className="text-[#c0cbd8] text-[14px] font-medium">Storage Used</p>
            <p className="text-[#5de1ff] text-[26px] font-bold leading-none mt-2">2.4GB / 10GB</p>
            <span className="inline-flex items-center gap-2 bg-[#1a2a3a] text-[12px] px-2.5 py-1 rounded-lg mt-2 text-[#8a9bb0]"><span className="text-[#5de1ff]">▮▮▮</span> 24%</span>
          </div>
        </div>

      </div>
    </div>
  )
}