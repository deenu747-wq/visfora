"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function PhotoStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("sneaker.png");
  const [prompt, setPrompt] = useState("");
  const [shadowIntensity, setShadowIntensity] = useState(70);
  const [bgStyle, setBgStyle] = useState("Luxury Marble • Gold");
  const [lighting, setLighting] = useState("Top-Right");
  const [activeTool, setActiveTool] = useState("remove-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<null | "notif" | "settings" | "profile">(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: "remove-bg", label: "Add / Change Background", icon: "🎀" },
    { id: "enhance", label: "Enhance", icon: "✨" },
    { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" },
    { id: "eraser", label: "Magic Eraser", icon: "🪶" },
    { id: "recolor", label: "Recolor", icon: "🎨" },
    { id: "shadow", label: "Shadow Studio", icon: "☁️" },
  ];
  const toolStatus: Record<string, { after: string }> = {
    "remove-bg": { after: "BG Removed" }, "enhance": { after: "Enhanced" },
    "ai-bg": { after: "New BG" }, "eraser": { after: "Erased" },
    "recolor": { after: "Recolored" }, "shadow": { after: "Shadow Added" },
  };

  useEffect(() => {
    const h = (e: MouseEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) setActiveDropdown(null); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file); setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(null);
  };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      const pkg = "@imgly" + "/background-removal"; // @ts-ignore
      const { removeBackground } = await import(pkg);
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File); setAfterImage(URL.createObjectURL(blob)); setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => { const a = document.createElement("a"); a.href = afterImage || uploadedImage!; a.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; a.click(); };

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] cursor-pointer transition font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2 transition cursor-pointer text-[12px] h-[38px]";
  const currentAfterText = isBgRemoved ? toolStatus[activeTool]?.after || "BG Removed" : "Original";

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col overflow-hidden p-2 gap-2">
      {/* HEADER - reduced height */}
      <header ref={headerRef} className="h-[52px] shrink-0 border border-[#D4A574]/30 rounded-xl px-4 flex items-center justify-between bg-[#141414]">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2"><span className="text-[18px] tracking-[0.18em] font-light text-white">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> Studio</span></Link>
          <nav className="hidden lg:flex gap-5 text-[12px]">{["Project","Studio","Assets","Scene","Render","Settings"].map(t=><button key={t} className={`pb-0.5 border-b-2 cursor-pointer ${t==="Studio"?"border-[#e69f50] text-white":"border-transparent text-[#E8DCC6]/60"}`}>{t}</button>)}</nav>
        </div>
        <div className="flex gap-2">
          <div className="relative"><button onClick={()=>setActiveDropdown(activeDropdown==="notif"?null:"notif")} className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${activeDropdown==="notif"?"bg-[#e69f50] text-black":"bg-[#1F1F1F] border-[#D4A574]/20"}`}>🔔</button>
            {activeDropdown==="notif" && (<div className="absolute right-0 top-10 w-[320px] bg-[#141414] border border-[#D4A574]/30 rounded-xl z-50 p-3"><div className="flex justify-between"><h4 className="text-white text-sm">Notifications</h4><span className="text-[10px] bg-[#e69f50] text-black px-2 rounded-full">3 new</span></div><div className="mt-3 space-y-2 text-xs"><div className="p-2 bg-[#1F1F1F] rounded-lg">{fileName} • Background removed</div><div className="p-2 bg-[#1F1F1F] rounded-lg">Credits running low</div><div className="p-2 bg-[#1F1F1F] rounded-lg">Export WEBP ready</div></div></div>)}
          </div>
          <div className="relative"><button onClick={()=>setActiveDropdown(activeDropdown==="settings"?null:"settings")} className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${activeDropdown==="settings"?"bg-[#e69f50] text-black":"bg-[#1F1F1F] border-[#D4A574]/20"}`}>⚙️</button>
            {activeDropdown==="settings" && (<div className="absolute right-0 top-10 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-xl z-50 p-4 text-xs"><h4 className="text-white mb-2">Settings</h4><div className="space-y-2"><div className="flex justify-between">High Quality Export<div className="w-8 h-4 bg-[#e69f50] rounded-full"><div className="w-3 h-3 bg-black rounded-full ml-auto m-0.5"></div></div></div><select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg px-2 py-1"><option>PNG</option><option>JPG</option><option>WEBP</option></select><div className="flex gap-2 mt-2"><button className="flex-1 bg-[#1F1F1F] border py-1 rounded-full">Reset</button><button onClick={()=>setActiveDropdown(null)} className={`flex-1 py-1 ${ctaClass}`}>Save</button></div></div></div>)}
          </div>
          <div className="relative"><button onClick={()=>setActiveDropdown(activeDropdown==="profile"?null:"profile")} className="w-8 h-8 rounded-full bg-[#e69f50] text-black flex items-center justify-center font-bold cursor-pointer">U</button>
            {activeDropdown==="profile" && (<div className="absolute right-0 top-10 w-[260px] bg-[#141414] border border-[#D4A574]/30 rounded-xl z-50 overflow-hidden"><div className="p-3 border-b border-[#D4A574]/20 flex gap-2"><div className="w-10 h-10 rounded-full bg-[#e69f50] flex items-center justify-center text-black font-bold">AK</div><div className="text-xs"><p className="text-white">Ankit Kumar</p><p className="text-[10px] text-[#E8DCC6]/50">ankit@visfora.com</p></div></div><div className="p-2 text-xs space-y-1"><button className="w-full text-left px-2 py-2 hover:bg-[#1F1F1F] rounded-lg">👤 My Profile</button><button className="w-full text-left px-2 py-2 hover:bg-[#1F1F1F] rounded-lg">💳 Billing • 112 left</button><button className="w-full text-left px-2 py-2 hover:bg-[#1F1F1F] rounded-lg">📁 My Projects</button><button className="w-full text-left px-2 py-2 hover:bg-red-500/10 text-red-400 rounded-lg">🚪 Logout</button></div></div>)}
          </div>
        </div>
      </header>

      {/* MAIN GRID - flex-1 no scroll */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-2 overflow-hidden">
        {/* LEFT */}
        <div className="flex flex-col gap-2 min-h-0 overflow-hidden">
          <div className="border border-[#D4A574]/30 rounded-xl p-3 bg-[#141414] shrink-0">
            <span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold">GENERATE</span>
            <div className="space-y-1.5 mt-3">{tools.map(t=><button key={t.id} onClick={()=>setActiveTool(t.id)} className={`${toolBtnClass} border ${activeTool===t.id?"bg-[#e69f50] text-black border-[#e69f50]":"bg-[#1F1F1F] border-[#D4A574]/10 text-[#E8DCC6]/80"}`}><span>{t.icon}</span>{t.label}</button>)}</div>
            <button onClick={handleProcess} className={`w-full mt-3 h-[36px] text-[12px] ${ctaClass}`}>✨ Run {tools.find(t=>t.id===activeTool)?.label}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-xl p-3 bg-[#141414] flex-1 min-h-0 flex flex-col">
            <span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold">UPLOAD</span>
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="mt-3 border border-dashed border-[#e69f50]/40 rounded-lg p-4 text-center flex-1 flex flex-col justify-center"><div className="text-lg">☁️</div><p className="text-[11px] mt-1">Drag & drop image here</p><p className="text-[10px] text-[#E8DCC6]/40">or click to browse • PNG, JPG</p></div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-3 h-[36px] text-[12px] ${ctaClass}`}>⬆️ Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* CENTER - reduced height, no scroll */}
        <div className="border border-[#D4A574]/30 rounded-xl bg-[#141414] flex flex-col min-h-0 overflow-hidden">
          <div className="h-[40px] shrink-0 px-3 border-b border-[#D4A574]/20 flex items-center justify-between">
            <span className="text-[13px] font-medium">3D Model Viewer</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#E8DCC6]/40">Three.js • Orbit Controls</span>
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-2 pr-1 py-0.5">
                <span className="text-[9px]">Background Removal</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 flex items-center cursor-pointer ${isBgRemoved?"bg-[#e69f50]":"bg-[#2A2A2A] border border-[#D4A574]/20"}`}><span className={`absolute text-[10px] font-bold ${isBgRemoved?"left-2 text-black":"right-2 text-[#E8DCC6]/50"}`}>{isBgRemoved?"ON":"OFF"}</span><div className={`w-5 h-5 rounded-full shadow z-10 transition-all ${isBgRemoved?"translate-x-[36px] bg-black":"bg-[#E8DCC6]"}`} /></button>
              </div>
              <button className="text-[10px] px-2 py-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full">↻ Reset View</button>
              <button className="text-[10px] px-2 py-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full">Fullscreen</button>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex">
            <div className="flex-1 relative border-r border-[#D4A574]/10"><span className="absolute top-2 left-2 z-10 text-[10px] bg-black/60 px-2 py-0.5 rounded-full text-[#e69f50] font-bold">BEFORE</span>{uploadedImage ? <img src={uploadedImage} className="absolute inset-0 w-full h-full object-cover" alt="before" /> : <img src="/sneaker.png" className="absolute inset-0 w-full h-full object-cover" alt="sneaker" />}</div>
            <div className="flex-1 relative"><span className="absolute top-2 right-2 z-10 text-[10px] bg-black/60 px-2 py-0.5 rounded-full text-[#e69f50] font-bold">AFTER</span><div className={`absolute inset-0 ${isBgRemoved ? "bg-[length:18px_18px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')] bg-[#1A1A1A]" : "bg-[#1A1A1A]"}`} />{isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] text-xs animate-pulse z-10">Processing...</div> : afterImage && isBgRemoved ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain p-3 pb-10 z-10" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-xs z-10">No preview yet</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2 flex justify-between bg-gradient-to-t from-black/80 to-transparent"><span className="text-[9px] bg-black/80 px-2 py-1 rounded-full border border-[#e69f50]/30 flex gap-1"><span className="truncate max-w-[80px]">{fileName}</span><span className="text-[#e69f50]">• {currentAfterText}</span></span><span className="text-[8px] bg-black/80 px-2 py-1 rounded-full border border-white/10">{exportFormat} • 2048x2048</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT - compact */}
        <div className="border border-[#D4A574]/30 rounded-xl bg-[#141414] p-3 flex flex-col min-h-0 overflow-hidden">
          <span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold w-fit">EXPORT & VIEW</span>
          <p className="text-[11px] font-medium mt-2">DOWNLOAD FORMATS</p>
          <div className="grid grid-cols-2 gap-1.5 mt-2">{["GLB","GLB","GLB","GLB","GLB","GLB"].map((f,i)=><button key={i} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg py-1.5 text-[10px] flex justify-center gap-1">⬇️ {f}</button>))}<button className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg py-1.5 text-[10px]">⬇️ PNG</button><button className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg py-1.5 text-[10px]">⬇️ JPG</button><button className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg py-1.5 text-[10px] col-span-2">⬇️ WEBP</button></div>
          <div className="border-t border-[#D4A574]/10 mt-3 pt-2"><span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold">AR VIEW</span><button className="w-full mt-2 bg-[#e69f50] text-black rounded-lg py-2 text-[11px] font-medium">🚀 Launch AR View</button></div>
          <div className="border-t border-[#D4A574]/10 mt-3 pt-2 flex-1 overflow-hidden"><p className="text-[11px] font-medium">EXPORT OPTIONS</p>
            <div className="mt-2 space-y-2 text-[10px]"><div><label className="text-[#E8DCC6]/60">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg px-2 py-1 text-[11px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Studio Black</option></select></div><div><div className="flex justify-between"><span>Shadow Intensity</span><span>{shadowIntensity}%</span></div><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><div><label>Lighting Direction</label><button className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg px-2 py-1 text-left">☀️ {lighting}</button></div><div><div className="flex justify-between"><span>Quality — {exportQuality}%</span></div><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><div className="grid grid-cols-2 gap-1.5"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg px-2 py-1"><span className="text-[#E8DCC6]/40">Size</span><div>2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-lg px-2 py-1"><span className="text-[#E8DCC6]/40">DPI</span><div>300 DPI</div></div></div><button onClick={handleExport} className={`w-full mt-2 py-2 text-[11px] ${ctaClass}`}>⬇️ Export All Formats</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}