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
  const [downloadFormat1, setDownloadFormat1] = useState("PNG");
  const [downloadFormat2, setDownloadFormat2] = useState("JPG");
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

  const handleUpload = (file: File) => { const url = URL.createObjectURL(file); setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(null); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      const pkg = "@imgly" + "/background-removal";
      // @ts-ignore
      const { removeBackground } = await import(pkg);
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File); setAfterImage(URL.createObjectURL(blob)); setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => { const a = document.createElement("a"); a.href = afterImage || uploadedImage!; a.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; a.click(); };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Dark moody", bg: "Studio Black", tool: "ai-bg" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] cursor-pointer transition font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[42px]";
  const currentAfterText = isBgRemoved ? toolStatus[activeTool]?.after || "BG Removed" : "Original";
  const formatOptions = ["PNG","JPG","WEBP","TIFF","PSD","AVIF"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header ref={headerRef} className="border-b border-[#D4A574]/30 px-6 py-3 flex items-center justify-between bg-[#0A0A0A] sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/Logo-White.png" alt="VISFORA Logo" className="h-10 w-auto object-contain" />
            <span className="text-[22px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> Studio</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(tab => (
              <button key={tab} className={`pb-1 border-b-2 cursor-pointer ${tab==="Studio" ? "border-[#e69f50] text-white font-medium" : "border-transparent text-[#E8DCC6]/60 hover:text-white"}`}>{tab}</button>
            ))}
          </nav>
        </div>
        {/* CORRECTED: U -> Bell -> Gear, same size like screenshot */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button onClick={()=>setActiveDropdown(activeDropdown==="profile"?null:"profile")} className="w-8 h-8 rounded-full bg-transparent border border-[#D4A574]/30 text-white flex items-center justify-center text-[13px] font-medium cursor-pointer hover:border-[#e69f50]">U</button>
            {activeDropdown==="profile" && (
              <div className="absolute right-0 top-10 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl z-50 overflow-hidden"><div className="p-4 border-b border-[#D4A574]/20 flex gap-3"><div className="w-10 h-10 rounded-full bg-[#e69f50] flex items-center justify-center text-black font-bold">AK</div><div><p className="text-sm text-white">Ankit Kumar</p><p className="text-xs text-[#E8DCC6]/50">ankit@visfora.com</p></div></div><div className="p-2 text-sm"><button className="w-full text-left px-3 py-2 hover:bg-[#1F1F1F] rounded-xl">My Profile</button><button className="w-full text-left px-3 py-2 hover:bg-[#1F1F1F] rounded-xl">Billing</button><button className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-xl">Logout</button></div></div>
            )}
          </div>
          <div className="relative">
            <button onClick={()=>setActiveDropdown(activeDropdown==="notif"?null:"notif")} className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer text-[14px] ${activeDropdown==="notif"?"bg-[#e69f50] border-[#e69f50] text-black":"bg-transparent border-[#D4A574]/30 text-white/70 hover:text-white"}`}>🔔</button>
            {activeDropdown==="notif" && (
              <div className="absolute right-0 top-10 w-[340px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex justify-between"><h4 className="text-white">Notifications</h4><span className="text-xs bg-[#e69f50] text-black px-2 py-0.5 rounded-full">3 new</span></div>
                <div className="p-2 space-y-1"><div className="p-3 rounded-xl bg-[#1F1F1F] text-sm">{fileName} • Background removed</div><div className="p-3 rounded-xl bg-[#1F1F1F] text-sm">Credits running low</div><div className="p-3 rounded-xl bg-[#1F1F1F] text-sm">Export WEBP ready</div></div>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={()=>setActiveDropdown(activeDropdown==="settings"?null:"settings")} className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer text-[14px] ${activeDropdown==="settings"?"bg-[#e69f50] border-[#e69f50] text-black":"bg-transparent border-[#D4A574]/30 text-white/70 hover:text-white"}`}>⚙️</button>
            {activeDropdown==="settings" && (
              <div className="absolute right-0 top-10 w-[300px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl z-50 p-4">
                <h4 className="text-white mb-4">Settings</h4>
                <div className="space-y-3 text-sm"><div className="flex justify-between">High Quality Export<div className="w-10 h-5 bg-[#e69f50] rounded-full"><div className="w-4 h-4 bg-black rounded-full ml-auto m-0.5"></div></div></div><select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2"><option>PNG</option><option>JPG</option><option>WEBP</option></select><div className="flex gap-2"><button className="flex-1 bg-[#1F1F1F] border py-2 rounded-full">Reset</button><button onClick={()=>setActiveDropdown(null)} className={`flex-1 py-2 ${ctaClass}`}>Save</button></div></div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3 mx-4 mt-3">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm"><option>Edit / Retouch</option></select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your edit" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} className={`px-6 py-2.5 text-sm ${ctaClass}`}>Generate</button>
      </div>

      <div className="flex-1 flex gap-3 p-3 items-start">
        <div className="w-[260px] flex flex-col gap-3">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">GENERATE</span>
            <div className="space-y-2 mt-4">{tools.map(t=><button key={t.id} onClick={()=>setActiveTool(t.id)} className={`${toolBtnClass} border-2 ${activeTool===t.id?"bg-[#e69f50] text-black border-[#e69f50]":"bg-[#1F1F1F] border-[#D4A574]/10"}`}><span>{t.icon}</span>{t.label}</button>)}</div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">UPLOAD</span>
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="mt-4 border border-dashed border-[#e69f50]/40 rounded-xl p-6 text-center"><p className="text-sm">Drag & drop image here</p></div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* CORRECTED: Reduced height - perfect 1:1 square, not crossing green line */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[560px] border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden aspect-square max-h-[560px]">
            <div className="h-[44px] px-3 border-b border-[#D4A574]/20 flex items-center justify-between">
              <span className="text-[13px]">3D Model Viewer</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1">
                  <span className="text-[10px]">Background Removal</span>
                  <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 flex items-center cursor-pointer ${isBgRemoved?"bg-[#e69f50]":"bg-[#2A2A2A]"}`}>
                    <span className={`absolute text-[10px] font-bold ${isBgRemoved?"left-2.5 text-black":"right-2.5 text-white/50"}`}>{isBgRemoved?"ON":"OFF"}</span>
                    <div className={`w-5 h-5 rounded-full z-10 transition-all ${isBgRemoved?"translate-x-[36px] bg-black":"bg-white"}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 flex min-h-0">
              <div className="flex-1 relative border-r border-[#D4A574]/10"><span className="absolute top-2 left-2 z-10 text-[10px] bg-black/60 px-2 py-0.5 rounded-full text-[#e69f50]">BEFORE</span>{uploadedImage ? <img src={uploadedImage} className="absolute inset-0 w-full h-full object-cover" alt="before" /> : <img src="/sneaker.png" className="absolute inset-0 w-full h-full object-cover" alt="sneaker" />}</div>
              <div className="flex-1 relative"><span className="absolute top-2 right-2 z-10 text-[10px] bg-black/60 px-2 py-0.5 rounded-full text-[#e69f50]">AFTER</span><div className="absolute inset-0 bg-[#1A1A1A]" />{afterImage && isBgRemoved ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain p-4 pb-12 z-10" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm z-10">No preview yet</div>}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-2 flex justify-between bg-gradient-to-t from-black/80 to-transparent"><span className="text-[10px] bg-black/80 px-3 py-1.5 rounded-full border border-[#e69f50]/30 flex gap-1"><span>{fileName}</span><span className="text-[#e69f50]">• {currentAfterText}</span></span><span className="text-[9px] bg-black/80 px-2 py-1 rounded-full">{exportFormat}</span></div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[560px] mt-2 text-[11px] text-[#E8DCC6]/50 text-center">Model: {fileName} • 12.4k polygons • 1 material • Ready • Loaded in 1.2s</div>
        </div>

        <div className="w-[300px] flex flex-col gap-3">
          {/* CORRECTED: Show formats in dropdowns */}
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">EXPORT & VIEW</span>
            <h4 className="text-xs mt-3 mb-2 text-[#E8DCC6]/80">DOWNLOAD FORMATS</h4>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <select value={downloadFormat1} onChange={e=>setDownloadFormat1(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs">
                  {formatOptions.map(f=><option key={f} value={f}>⬇️ .{f}</option>)}
                </select>
                <select value={downloadFormat2} onChange={e=>setDownloadFormat2(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs">
                  {formatOptions.map(f=><option key={f} value={f}>⬇️ .{f}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><option>⬇️ .FBX</option><option>⬇️ .GLB</option><option>⬇️ .OBJ</option></select>
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><option>⬇️ .STL</option><option>⬇️ .GLB</option><option>⬇️ .OBJ</option></select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><option>⬇️ .PNG</option><option>⬇️ .JPG</option><option>⬇️ .WEBP</option></select>
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><option>⬇️ .JPG</option><option>⬇️ .PNG</option><option>⬇️ .WEBP</option></select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><option>⬇️ .WEBP</option><option>⬇️ .PNG</option><option>⬇️ .AVIF</option></select>
                <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#e69f50]/30 rounded-xl px-3 py-2.5 text-xs"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
              </div>
            </div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <h4 className="text-sm mb-3">EXPORT OPTIONS</h4>
            <div className="space-y-3 text-xs">
              <select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2"><option>Luxury Marble • Gold</option><option>White Infinity</option></select>
              <div><div className="flex justify-between"><span>Shadow</span><span>{shadowIntensity}%</span></div><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div>
              <select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2"><option>Top-Right</option><option>Top-Left</option><option>Soft Studio</option></select>
              <div><div className="flex justify-between"><span>Quality — {exportQuality}%</span></div><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div>
              <button onClick={handleExport} className={`w-full py-3 ${ctaClass}`}>⬇️ Export All Formats</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] p-3 flex justify-between text-xs mx-4"><span>AI generating {isProcessing?"62%":"Ready"}</span><span>Credits remaining 187</span></div>
      <div className="border border-[#D4A574]/30 p-3 bg-[#141414] rounded-2xl flex gap-2 overflow-x-auto mx-4 mb-4">{chips.map(c=><button key={c.chip} onClick={()=>{setPrompt(c.chip);setBgStyle(c.bg);}} className="whitespace-nowrap px-4 py-2 rounded-full text-xs border border-[#D4A574]/30 bg-[#1F1F1F]">✨ {c.chip}</button>)}</div>
    </div>
  );
}