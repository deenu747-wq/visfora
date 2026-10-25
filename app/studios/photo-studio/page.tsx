"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const AI_MODE = process.env.NEXT_PUBLIC_AI_MODE || "free";

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
    "remove-bg": { after: "BG Removed" },
    "enhance": { after: "Enhanced" },
    "ai-bg": { after: "New BG" },
    "eraser": { after: "Erased" },
    "recolor": { after: "Recolored" },
    "shadow": { after: "Shadow Added" },
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setUploadedFile(file);
    setFileName(file.name);
    setAfterImage(null);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      const pkg = "@imgly" + "/background-removal";
      // @ts-ignore
      const { removeBackground } = await import(pkg);
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File);
      setAfterImage(URL.createObjectURL(blob));
      setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => {
    const link = document.createElement("a");
    link.href = afterImage || uploadedImage!;
    link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`;
    link.click();
  };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Dark moody", bg: "Studio Black", tool: "ai-bg" },
    { chip: "Outdoor sunlight", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Neutral grey backdrop", bg: "Minimal Concrete", tool: "ai-bg" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";
  const currentAfterText = isBgRemoved ? toolStatus[activeTool]?.after || "BG Removed" : "Original";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      {/* TOP BAR - CORRECTED SEQUENCE: U -> Bell -> Settings, same size w-9 h-9 */}
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-6 py-3 flex items-center justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/Logo-White.png" alt="VISFORA Logo" className="h-10 w-auto object-contain" />
            <span className="text-[22px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> Studio</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(tab => (
              <button key={tab} className={`pb-1 border-b-2 transition cursor-pointer ${tab==="Studio" ? "border-[#e69f50] text-white font-medium" : "border-transparent text-[#E8DCC6]/60 hover:text-white"}`}>{tab}</button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 relative">
          {/* 1 - PROFILE - Now first as per screenshot */}
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")} className={`w-9 h-9 rounded-full flex items-center justify-center font-medium cursor-pointer border-2 transition ${activeDropdown === "profile" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#e69f50] border-[#e69f50]/50 text-black"}`}>U</button>
            {activeDropdown === "profile" && (
              <div className="absolute right-0 top-12 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-[#e69f50] flex items-center justify-center text-black font-bold">AK</div><div><p className="text-sm font-medium text-white">Ankit Kumar</p><p className="text-xs text-[#E8DCC6]/50">ankit@visfora.com</p><span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full mt-1 inline-block">PRO PLAN</span></div></div>
                <div className="p-2"><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer"><span>👤</span> My Profile</button><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer"><span>💳</span> Billing & Credits <span className="ml-auto text-xs bg-[#1F1F1F] px-2 py-0.5 rounded-full">112 left</span></button><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer"><span>📁</span> My Projects</button><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer"><span>❓</span> Help & Support</button><div className="border-t border-[#D4A574]/10 mt-2 pt-2"><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-red-500/10 hover:text-red-400 flex items-center gap-3 cursor-pointer"><span>🚪</span> Logout</button></div></div>
              </div>
            )}
          </div>
          {/* 2 - NOTIFICATION */}
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "notif" ? null : "notif")} className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${activeDropdown === "notif" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#1F1F1F] border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>🔔</button>
            {activeDropdown === "notif" && (
              <div className="absolute right-0 top-12 w-[340px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex items-center justify-between"><h4 className="font-medium text-white">Notifications</h4><span className="text-xs bg-[#e69f50] text-black px-2 py-0.5 rounded-full">3 new</span></div>
                <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10 hover:bg-[#2A2A2A] cursor-pointer"><div className="flex gap-3"><span className="text-[#e69f50]">✨</span><div><p className="text-sm text-white">Background removed successfully</p><p className="text-xs text-[#E8DCC6]/50 mt-1">{fileName} • 2 min ago</p></div></div></div>
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10 hover:bg-[#2A2A2A] cursor-pointer"><div className="flex gap-3"><span className="text-yellow-400">⚠️</span><div><p className="text-sm text-white">Credits running low</p><p className="text-xs text-[#E8DCC6]/50 mt-1">12 credits left • 1 hour ago</p></div></div></div>
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10 hover:bg-[#2A2A2A] cursor-pointer"><div className="flex gap-3"><span className="text-green-400">✅</span><div><p className="text-sm text-white">Export WEBP ready</p><p className="text-xs text-[#E8DCC6]/50 mt-1">2048x2048 • 3 hours ago</p></div></div></div>
                </div>
                <div className="p-3 border-t border-[#D4A574]/20"><button className="w-full text-center text-xs text-[#e69f50] hover:underline cursor-pointer">View all notifications</button></div>
              </div>
            )}
          </div>
          {/* 3 - SETTINGS */}
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "settings" ? null : "settings")} className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${activeDropdown === "settings" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#1F1F1F] border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>⚙️</button>
            {activeDropdown === "settings" && (
              <div className="absolute right-0 top-12 w-[300px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-4">
                <h4 className="font-medium text-white mb-4">Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between"><span className="text-sm text-[#E8DCC6]/70">High Quality Export</span><div className="w-10 h-5 bg-[#e69f50] rounded-full p-0.5 cursor-pointer"><div className="w-4 h-4 bg-black rounded-full ml-auto"></div></div></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-[#E8DCC6]/70">Auto-save results</span><div className="w-10 h-5 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full p-0.5 cursor-pointer"><div className="w-4 h-4 bg-[#E8DCC6]/50 rounded-full"></div></div></div>
                  <div><label className="text-xs text-[#E8DCC6]/50">Default Format</label><select value={exportFormat} onChange={(e)=>setExportFormat(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm cursor-pointer"><option>WEBP</option><option>PNG</option><option>JPG</option></select></div>
                  <div><label className="text-xs text-[#E8DCC6]/50">Language</label><select className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm cursor-pointer"><option>English</option><option>Hindi</option></select></div>
                  <div className="pt-2 border-t border-[#D4A574]/10 flex gap-2"><button className="flex-1 bg-[#1F1F1F] border border-[#D4A574]/20 py-2 rounded-full text-xs hover:bg-[#2A2A2A] cursor-pointer">Reset</button><button onClick={() => setActiveDropdown(null)} className={`flex-1 py-2 rounded-full text-xs ${ctaClass}`}>Save</button></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SECOND ROW - GENERATION MODE */}
      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm cursor-pointer"><option>Edit / Retouch</option><option>Text to 3D Prompt</option></select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><span>✨</span><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>⚡ Generate</button>
      </div>

      {/* MAIN 3-COLUMN */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-start">
        {/* LEFT: GENERATE + UPLOAD */}
        <div className="flex flex-col gap-3">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">GENERATE</span>
            <div className="space-y-2 mt-4">
              {tools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50] text-black border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}>
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-4 flex items-center justify-center gap-2 h-[44px] text-[13px] ${ctaClass}`}>✨ Run {tools.find(t=>t.id===activeTool)?.label}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">UPLOAD</span>
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="mt-4 border border-dashed border-[#e69f50]/40 rounded-xl p-6 text-center">
              <div className="text-[#e69f50] text-2xl">☁️</div>
              <p className="text-sm mt-2">Drag & drop image here</p>
              <p className="text-xs text-[#E8DCC6]/50 mt-1">or click to browse • PNG, JPG</p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>⬆️ Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* CENTER: CANVAS - CORRECTED: Reduced height, equal 4 sides */}
        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden aspect-square max-h-[500px]">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between">
            <h3 className="text-[#E8DCC6] font-medium">3D Model Viewer</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#E8DCC6]/50 flex items-center gap-1">🧊 Three.js • Orbit Controls</span>
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1 ml-2">
                <span className="text-[10px] text-[#E8DCC6]/70">Background Removal</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 transition-all cursor-pointer flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A] border border-[#D4A574]/20"}`}>
                  <span className={`absolute text-[10px] font-bold ${isBgRemoved ? "left-2.5 text-black" : "right-2.5 text-[#E8DCC6]/50"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                  <div className={`w-5 h-5 rounded-full shadow-md transition-all z-10 ${isBgRemoved ? "translate-x-[36px] bg-black" : "translate-x-0 bg-[#E8DCC6]"}`} />
                </button>
              </div>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">↻ Reset View</button>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">Fullscreen</button>
            </div>
          </div>
          <div className="flex-1 relative bg-[#0F0F0F] flex min-h-0">
            <div className="flex-1 relative">
              <div className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">BEFORE</div>
              {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-cover absolute inset-0" alt="sneaker" />}
            </div>
            <div className="flex-1 relative border-l border-[#D4A574]/20">
              <div className="absolute top-3 right-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">AFTER</div>
              <div className={`absolute inset-0 ${isBgRemoved ? "bg-[length:20px_20px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')] bg-[#1A1A1A]" : "bg-[#1A1A1A]"}`} />
              {isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing...</div> : afterImage && isBgRemoved ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-sm z-10">No preview yet</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white flex gap-1.5"><span className="truncate max-w-[100px]">{fileName}</span><span className="text-[#e69f50]">• {currentAfterText}</span></span>
                <div className="flex gap-1.5"><span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-white/10 text-white/70">{exportFormat}</span><span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-[#e69f50]/30 text-[#e69f50]">2048x2048</span></div>
              </div>
            </div>
          </div>
          <div className="p-2 text-center text-xs text-[#E8DCC6]/40 border-t border-[#D4A574]/20">Model: {fileName} • 12.4k polygons • 1 material • Ready • Loaded in 1.2s</div>
        </div>

        {/* RIGHT: EXPORT & VIEW - CORRECTED: Formats in dropdowns */}
        <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex flex-col gap-5">
          <div><span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">EXPORT & VIEW</span><h4 className="text-sm font-medium mt-3 mb-3">DOWNLOAD FORMATS</h4>
            <div className="grid grid-cols-2 gap-2">
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ PNG</option><option>⬇️ JPG</option><option>⬇️ WEBP</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ PNG</option><option>⬇️ JPG</option><option>⬇️ WEBP</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ PNG</option><option>⬇️ JPG</option><option>⬇️ TIFF</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ PNG</option><option>⬇️ JPG</option><option>⬇️ WEBP</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer bg-[#e69f50]/10 border-[#e69f50]/30"><option>⬇️ PNG</option><option>⬇️ JPG</option><option>⬇️ WEBP</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ JPG</option><option>⬇️ PNG</option><option>⬇️ WEBP</option></select>
              <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>⬇️ WEBP</option><option>⬇️ PNG</option><option>⬇️ AVIF</option></select>
              <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
            </div>
          </div>
          <div className="border-t border-[#D4A574]/20 pt-4"><span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">AR VIEW</span><button className="w-full mt-3 bg-[#e69f50] text-black rounded-xl py-2.5 text-sm font-medium">👓 Launch AR View</button><p className="text-[11px] text-[#E8DCC6]/40 mt-2">View in augmented reality on mobile</p></div>
          <div className="border-t border-[#D4A574]/20 pt-4">
            <h4 className="text-sm font-medium mb-3">EXPORT OPTIONS</h4>
            <div className="space-y-4">
              <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs cursor-pointer"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50] cursor-pointer" /></div>
              <div><label className="text-xs text-[#E8DCC6]/70">Lighting Direction</label><button className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs text-left cursor-pointer">☀️ {lighting}</button></div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50] cursor-pointer" /></div>
              <div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2"><span className="text-[#E8DCC6]/50">Size</span><div>2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2"><span className="text-[#E8DCC6]/50">DPI</span><div>300 DPI</div></div></div>
              <div className="flex gap-2 text-[11px]"><span className="bg-[#e69f50] text-black px-2 py-1 rounded-full">☑ Include Textures</span><span className="bg-[#1F1F1F] border border-[#D4A574]/20 px-2 py-1 rounded-full">Compressed</span></div>
              <button onClick={handleExport} className={`w-full py-3 text-sm ${ctaClass}`}>⬇️ Export All Formats</button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] p-3 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3"><span className="flex gap-1"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span><span className="w-2 h-2 bg-[#e69f50]/50 rounded-full"></span></span><span>AI generating {isProcessing?"62%":"Ready"}</span><div className="w-32 h-2 bg-[#1F1F1F] rounded-full"><div className={`h-2 bg-[#e69f50] rounded-full ${isProcessing?"w-[62%]":"w-full"}`}></div></div><span>Estimated {isProcessing?"18s remaining":"0s"}</span></div>
        <div className="flex items-center gap-6"><span>Completed today 14</span><span>Avg processing 22s</span><span className="flex items-center gap-2">💳 Credits remaining 187</span></div>
      </div>

      <div className="border border-[#D4A574]/30 p-3 bg-[#141414] rounded-2xl flex gap-2 overflow-x-auto">
        {chips.map(({chip,bg,tool}) => (<button key={chip} onClick={()=>{setPrompt(chip);setBgStyle(bg);setActiveTool(tool);}} className="whitespace-nowrap px-4 py-2 rounded-full text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#e69f50] hover:text-black transition cursor-pointer">✨ {chip}</button>))}
      </div>
    </div>
  );
}