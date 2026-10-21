"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Studio3D() {
  const [activeTab, setActiveTab] = useState("Studio");
  const [genOption, setGenOption] = useState("Text to 3D Prompt");
  const [genType, setGenType] = useState("Image to 3D");
  const [showDropdown, setShowDropdown] = useState(false);

  const toast = (m: string) => alert(m);

  return (
    <div className="min-h-screen bg-[#2a2a35] p-4 text-white">
      {/* HEADER WITH public/Logo.png */}
      <div className="flex items-center justify-between bg-[#1e1e28] rounded-xl px-6 py-3 mb-4 border border-white/5">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80">
            {/* USE YOUR LOGO FILE */}
            <Image 
              src="/Logo.png" 
              alt="VF Logo" 
              width={64} 
              height={64} 
              className="h-[44px] w-auto object-contain"
              priority
            />
            <span className="text-[20px] font-bold tracking-tight">
              <span className="text-[#ffbe0b]">3D</span>
              <span className="text-[#c7b5b5] ml-1.5">Studio</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-[14px] font-medium">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`pb-1 border-b-2 cursor-pointer transition-all ${activeTab===t ? "text-white border-[#7ee8ff]" : "text-white/60 border-transparent hover:text-white"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>toast("Profile")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20">U</button>
          <button onClick={()=>toast("Notifications")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">🔔</button>
          <button onClick={()=>toast("Settings")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">⚙️</button>
        </div>
      </div>

      {/* GENERATION BAR */}
      <div className="flex items-center gap-3 bg-[#1e1e28] rounded-xl px-4 py-3 mb-4 border border-white/5 relative">
        <span className="text-[13px] text-white/60">Generation Mode:</span>
        <div className="relative">
          <button onClick={()=>setShowDropdown(!showDropdown)} className="px-3 py-1.5 rounded-lg border border-[#7ee8ff] text-[#7ee8ff] text-[13px] cursor-pointer">{genOption} ▾</button>
          {showDropdown && (
            <div className="absolute top-9 left-0 bg-[#2a2a35] border border-white/10 rounded-lg z-10 w-[180px]">
              {["Text to 3D Prompt","Image to 3D Prompt","Multi-Image Prompt"].map(o=>(
                <button key={o} onClick={()=>{setGenOption(o); setShowDropdown(false);}} className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/10 cursor-pointer">{o}</button>
              ))}
            </div>
          )}
        </div>
        <input placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2 text-[13px] outline-none focus:border-[#7ee8ff]/50" />
        <button onClick={()=>toast("Generating...")} className="bg-[#7ee8ff] text-black px-5 py-2 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-[#6dd8ee] active:scale-95">⚡ Generate</button>
      </div>

      <div className="grid grid-cols-[220px_1fr_260px] gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">GENERATE</div>
            <div className="space-y-2">
              {[
                {id:"Image to 3D"}, {id:"Multi-Image"}, {id:"Text to 3D"}, {id:"Remesh"}, {id:"Rig"}, {id:"Animate"}
              ].map(item=>(
                <button key={item.id} onClick={()=>setGenType(item.id)} className={`w-full text-left rounded-lg px-3 py-2.5 text-[13px] cursor-pointer transition-all ${genType===item.id ? "bg-[#7ee8ff] text-black" : "bg-[#2a2a35] border border-white/10 text-white/70 hover:text-white"}`}>{item.id}</button>
              ))}
            </div>
          </div>
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">UPLOAD</div>
            <button onClick={()=>toast("Upload")} className="w-full border border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:border-[#7ee8ff]/50">
              <div className="text-[12px] font-medium">Drag & drop image here</div>
              <div className="text-[11px] text-white/40">PNG, JPG</div>
            </button>
            <button onClick={()=>toast("Uploaded")} className="mt-3 w-full border border-[#7ee8ff] rounded-lg py-1.5 text-[12px] cursor-pointer hover:bg-[#7ee8ff] hover:text-black">Upload Image</button>
          </div>
        </div>

        {/* CENTER */}
        <div className="bg-[#1e1e28] rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="font-bold text-[14px]">3D Model Viewer</span>
            <div className="flex gap-2 text-[11px]">
              <span className="text-[#7ee8ff]">Three.js • Orbit Controls</span>
              <button onClick={()=>toast("Reset")} className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer hover:bg-white/10">Reset View</button>
              <button onClick={()=>toast("Fullscreen")} className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer hover:bg-white/10">Fullscreen</button>
            </div>
          </div>
          <div className="h-[460px] bg-[#15151d] flex items-center justify-center">
            <div className="w-[220px] h-[220px] rounded-full border border-white/10 flex items-center justify-center opacity-50">◍</div>
          </div>
          <div className="text-center py-2 text-[11px] bg-black/30">Model: helmet_v02 • 12.4k polygons • 1 material • Ready • Loaded in 1.2s</div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
          <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">EXPORT & VIEW</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} onClick={()=>toast(`Download ${f}`)} className="bg-[#2a2a35] border border-white/10 rounded-lg px-3 py-2 text-[12px] cursor-pointer hover:border-[#7ee8ff]/50">↓ {f}</button>
            ))}
          </div>
          <button onClick={()=>toast("AR View")} className="w-full bg-[#7ee8ff] text-black rounded-lg py-2.5 text-[13px] font-bold cursor-pointer">Launch AR View</button>
          <div className="mt-4">
            <div className="text-[12px] font-bold mb-2">EXPORT OPTIONS</div>
            <div className="flex gap-2">
              <button onClick={()=>toast("Textures")} className="bg-[#7ee8ff] text-black text-[10px] px-2 py-1 rounded-full cursor-pointer">✓ Include Textures</button>
              <button onClick={()=>toast("Compressed")} className="border border-white/20 text-[10px] px-2 py-1 rounded-full cursor-pointer">Compressed</button>
            </div>
            <button onClick={()=>toast("Export All")} className="mt-3 w-full bg-[#2a2a35] border border-white/10 rounded-lg py-2 text-[12px] cursor-pointer">↓ Export All Formats</button>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR - WAS BLANK, NOW FILLED LIKE VECTOR STUDIO */}
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-4">
        {/* LEFT - GENERATING BAR + NEW EXTRAS */}
        <div className="bg-[#1e1e28] rounded-xl px-4 py-3 border border-white/5">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2 text-[12px]"><span className="w-2 h-2 bg-[#7ee8ff] rounded-full animate-pulse"></span> AI generating 62%</div>
            <div className="flex-1 h-2 bg-white/10 rounded-full"><div className="w-[62%] h-full bg-[#7ee8ff] rounded-full"></div></div>
            <span className="text-[11px] text-white/60">Estimated 18s remaining</span>
          </div>
          
          {/* NEW - SAME AS VECTOR STUDIO BOTTOM SECTION */}
          <div className="grid grid-cols-4 gap-3 pt-3 border-t border-white/5">
            <button onClick={()=>toast("Recent Projects")} className="bg-[#2a2a35] rounded-lg p-3 text-left cursor-pointer hover:bg-white/5">
              <div className="text-[11px] text-white/40">RECENT</div>
              <div className="text-[13px] font-bold mt-1">12 Models Today</div>
              <div className="text-[11px] text-[#7ee8ff] mt-1">View all →</div>
            </button>
            <button onClick={()=>toast("Queue")} className="bg-[#2a2a35] rounded-lg p-3 text-left cursor-pointer hover:bg-white/5">
              <div className="text-[11px] text-white/40">QUEUE</div>
              <div className="text-[13px] font-bold mt-1">3 in progress</div>
              <div className="text-[11px] text-white/60 mt-1">Avg 22s</div>
            </button>
            <button onClick={()=>toast("Credits")} className="bg-[#2a2a35] rounded-lg p-3 text-left cursor-pointer hover:bg-white/5">
              <div className="text-[11px] text-white/40">CREDITS</div>
              <div className="text-[13px] font-bold mt-1">187 remaining</div>
              <div className="text-[11px] text-[#ffbe0b] mt-1">Buy more →</div>
            </button>
            <button onClick={()=>toast("Tips")} className="bg-gradient-to-br from-[#7ee8ff]/20 to-[#ffbe0b]/20 rounded-lg p-3 text-left cursor-pointer border border-[#7ee8ff]/20 hover:from-[#7ee8ff]/30 hover:to-[#ffbe0b]/30">
              <div className="text-[11px] text-white/60">TIP</div>
              <div className="text-[12px] font-medium mt-1">Use PNG with transparent bg for better 3D</div>
            </button>
          </div>
        </div>

        {/* RIGHT - QUICK STATS */}
        <div className="bg-[#1e1e28] rounded-xl px-4 py-3 border border-white/5 flex items-center gap-6 text-[11px] text-white/60">
          <span>Completed today <b className="text-white">14</b></span>
          <span>Avg processing <b className="text-white">22s</b></span>
          <span>Credits remaining <b className="text-white">187</b></span>
          <button onClick={()=>toast("Upgrade")} className="bg-[#ffbe0b] text-black px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer hover:bg-[#ffcc33]">Upgrade</button>
        </div>
      </div>
    </div>
  );
}