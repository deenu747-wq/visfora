"use client";
import Link from "next/link";
import { useState } from "react";

export default function Studio3D() {
  const [activeTab, setActiveTab] = useState("Studio");
  const [genOption, setGenOption] = useState("Text to 3D Prompt");
  const [genType, setGenType] = useState("Image to 3D");
  const [isGenerating, setIsGenerating] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAction = (msg: string) => {
    console.log(msg);
    // replace with toast if you have
    alert(msg);
  };

  return (
    <div className="min-h-screen bg-[#2a2a35] p-4 text-white select-none">
      {/* TOP NAV - VF LOGO BIGGER */}
      <div className="flex items-center justify-between bg-[#1e1e28] rounded-xl px-6 py-3 mb-4 border border-white/5">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-[#ffbe0b] font-black text-[32px] leading-none">VF</span>
            <span className="text-[20px] font-bold"><span className="text-[#ffbe0b]">3D</span><span className="text-[#c7b5b5] ml-1.5">Studio</span></span>
          </Link>
          <div className="flex items-center gap-6 text-[14px] font-medium">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab===t ? "text-white border-[#7ee8ff]" : "text-white/60 border-transparent hover:text-white"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>handleAction("Profile clicked")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20">U</button>
          <button onClick={()=>handleAction("Notifications")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">🔔</button>
          <button onClick={()=>handleAction("Settings clicked")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">⚙️</button>
        </div>
      </div>

      {/* GENERATION MODE */}
      <div className="flex items-center gap-3 bg-[#1e1e28] rounded-xl px-4 py-3 mb-4 border border-white/5 relative">
        <span className="text-[13px] text-white/60">Generation Mode:</span>
        <div className="relative">
          <button onClick={()=>setShowDropdown(!showDropdown)} className="px-3 py-1.5 rounded-lg border border-[#7ee8ff] text-[#7ee8ff] text-[13px] cursor-pointer">{genOption} ▾</button>
          {showDropdown && (
            <div className="absolute top-9 left-0 bg-[#2a2a35] border border-white/10 rounded-lg z-10 w-[180px] overflow-hidden">
              {["Text to 3D Prompt","Image to 3D Prompt","Multi-Image Prompt"].map(o=>(
                <button key={o} onClick={()=>{setGenOption(o); setShowDropdown(false);}} className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/10 cursor-pointer">{o}</button>
              ))}
            </div>
          )}
        </div>
        <input placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white/70 outline-none focus:border-[#7ee8ff]/50" />
        <button onClick={()=>{setIsGenerating(true); handleAction("Generating 3D Model...");}} className="bg-[#7ee8ff] text-black px-5 py-2 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-[#6dd8ee] active:scale-95 transition-all">⚡ Generate</button>
      </div>

      <div className="grid grid-cols-[220px_1fr_260px] gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">GENERATE</div>
            <div className="space-y-2">
              {[
                {id:"Image to 3D", icon:"🖼️"},
                {id:"Multi-Image", icon:"📚"},
                {id:"Text to 3D", icon:"✒️"},
                {id:"Remesh", icon:"🧊"},
                {id:"Rig", icon:"🦴"},
                {id:"Animate", icon:"🏃"},
              ].map(item=>(
                <button key={item.id} onClick={()=>setGenType(item.id)} className={`w-full text-left rounded-lg px-3 py-2.5 text-[13px] font-medium flex items-center gap-2 cursor-pointer transition-all ${genType===item.id ? "bg-[#7ee8ff] text-black" : "bg-[#2a2a35] border border-white/10 text-white/70 hover:border-white/20 hover:text-white"}`}>
                  {item.icon} {item.id}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">UPLOAD</div>
            <button onClick={()=>handleAction("Upload dialog opened")} className="w-full border border-dashed border-white/20 rounded-xl p-4 text-center cursor-pointer hover:border-[#7ee8ff]/50 transition-colors group">
              <div className="text-[12px] text-white font-medium group-hover:text-[#7ee8ff]">Drag & drop image here</div>
              <div className="text-[11px] text-white/40">or click to browse • PNG, JPG</div>
            </button>
            <button onClick={()=>handleAction("Image Uploaded!")} className="mt-3 w-full border border-[#7ee8ff] text-white rounded-lg py-1.5 text-[12px] cursor-pointer hover:bg-[#7ee8ff] hover:text-black transition-all active:scale-95">Upload Image</button>
          </div>
        </div>

        {/* CENTER VIEWER */}
        <div className="bg-[#1e1e28] rounded-xl border border-white/5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="font-bold text-[14px]">3D Model Viewer</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#7ee8ff]">Three.js • Orbit Controls</span>
              <button onClick={()=>handleAction("View Reset")} className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer hover:bg-white/10">↻ Reset View</button>
              <button onClick={()=>handleAction("Fullscreen Mode")} className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer hover:bg-white/10">Fullscreen</button>
              <button onClick={()=>handleAction("Expand Viewer")} className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer">⛶</button>
            </div>
          </div>
          <div className="h-[520px] bg-[#15151d] flex flex-col items-center justify-center relative group">
            <div className="w-[260px] h-[260px] rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent cursor-grab active:cursor-grabbing" onClick={()=>handleAction("Orbit: Drag to rotate model")}>
              <span className="text-[100px] opacity-30">◍</span>
            </div>
            <div className="absolute bottom-10 text-[11px] bg-black/50 px-3 py-1 rounded-full">Model: helmet_v02 • 12.4k polygons • 1 material</div>
            <div className="absolute bottom-3 text-[12px] text-green-300">• Ready • Loaded in 1.2s</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
          <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">EXPORT & VIEW</div>
          <div className="text-[12px] font-bold mb-2">DOWNLOAD FORMATS</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} onClick={()=>handleAction(`Downloading ${f}`)} className="bg-[#2a2a35] border border-white/10 rounded-lg px-3 py-2 text-[12px] text-left cursor-pointer hover:border-[#7ee8ff]/50 hover:text-[#7ee8ff] active:scale-95 transition-all">↓ {f}</button>
            ))}
          </div>
          <div className="text-[11px] font-bold text-white/50 px-2 py-1 bg-white/10 rounded w-fit mb-3">AR VIEW</div>
          <button onClick={()=>handleAction("Launching AR View on mobile")} className="w-full bg-[#7ee8ff] text-black rounded-lg px-3 py-2.5 text-[13px] font-bold mb-1 cursor-pointer hover:bg-[#6dd8ee] active:scale-95 transition-all">👓 Launch AR View</button>
          <div className="text-[10px] text-white/40 mb-4">View in augmented reality on mobile</div>
          <div className="text-[12px] font-bold mb-2">EXPORT OPTIONS</div>
          <div className="flex gap-2 mb-3">
            <button onClick={()=>handleAction("Include Textures toggled")} className="bg-[#7ee8ff] text-black text-[10px] px-2 py-1 rounded-full cursor-pointer">✓ Include Textures</button>
            <button onClick={()=>handleAction("Compressed toggled")} className="border border-white/20 text-[10px] px-2 py-1 rounded-full cursor-pointer hover:border-white/40">Compressed</button>
          </div>
          <button onClick={()=>handleAction("Exporting All Formats")} className="w-full bg-[#2a2a35] border border-white/10 rounded-lg px-3 py-2 text-[12px] text-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all">↓ Export All Formats</button>
        </div>
      </div>

      {/* BOTTOM STATUS */}
      <div className="mt-4 flex items-center gap-4 bg-[#1e1e28] rounded-xl px-4 py-2.5 border border-white/5 text-[12px]">
        <button onClick={()=>setIsGenerating(!isGenerating)} className="flex items-center gap-2 cursor-pointer hover:text-[#7ee8ff]">
          <span className={`w-2 h-2 rounded-full ${isGenerating ? "bg-[#7ee8ff] animate-pulse" : "bg-green-400"}`}></span> AI generating {isGenerating ? "62%" : "100%"}
        </button>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer"><div className="w-[62%] h-full bg-[#7ee8ff] rounded-full"></div></div>
        <span>Estimated 18s remaining</span>
        <span className="ml-auto text-white/60">Completed today 14 | Avg processing 22s | Credits remaining 187</span>
      </div>
    </div>
  );
}