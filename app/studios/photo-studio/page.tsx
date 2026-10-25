"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const AI_MODE = process.env.NEXT_PUBLIC_AI_MODE || "free";

type TabAction = { label: string; desc: string; tool?: string; bg?: string; prompt?: string; badge?: string; };
type HeaderTab = { name: string; path: string; items: TabAction[]; };

export default function PhotoStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("sneaker.png");
  const [prompt, setPrompt] = useState("");
  const [shadowIntensity, setShadowIntensity] = useState(70);
  const [bgStyle, setBgStyle] = useState("Luxury Marble • Gold");
  const [lighting, setLighting] = useState("Top-Right");
  const [activeTool, setActiveTool] = useState("custom-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<null | "notif" | "profile">(null);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Backgrounds");
  const [hoveredHeaderTab, setHoveredHeaderTab] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits" }, { label: "Recent Projects", desc: "Last 10 files", tool: "custom-bg" }, { label: "Quick Upload", desc: "Start new edit" }, ] },
    { name: "Studio", path: "#studio", items: [ { label: "Custom Background", desc: "Remove & replace BG - Color + Upload", tool: "custom-bg" }, { label: "Enhance", desc: "Auto enhance image", tool: "enhance" }, { label: "AI Backgrounds", desc: "Premium studio BG", tool: "ai-bg", bg: "Luxury Marble • Gold" }, { label: "Magic Eraser", desc: "Remove unwanted object", tool: "eraser" }, { label: "Recolor", desc: "Change product color", tool: "recolor" }, { label: "Shadow Studio", desc: "Add realistic shadow", tool: "shadow" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [ { label: "Custom Background", desc: "Color + Upload merged", tool: "custom-bg" }, { label: "Luxury Marble • Gold", desc: "Best seller", tool: "ai-bg", bg: "Luxury Marble • Gold", prompt: "Luxury gold studio" }, { label: "White Infinity", desc: "E-com clean", tool: "ai-bg", bg: "White Infinity", prompt: "Minimal marble" }, { label: "Studio Black", desc: "Premium dark", tool: "ai-bg", bg: "Studio Black", prompt: "Dark moody" }, { label: "Minimal Concrete", desc: "Trending", tool: "ai-bg", bg: "Minimal Concrete", prompt: "Neutral grey backdrop" }, ] },
    { name: "Enhance", path: "#enhance", items: [ { label: "Auto Enhance", desc: "One-click fix", tool: "enhance" }, { label: "Upscale 2x / 4x", desc: "HD quality", tool: "enhance" }, { label: "Color Correction", desc: "True colors", tool: "recolor" }, ] },
    { name: "Batch", path: "#batch", items: [ { label: "Bulk Upload (100)", desc: "Process 10-100 images", badge: "PRO" }, { label: "Apply Same BG to All", desc: "Save time", bg: "Luxury Marble • Gold", tool: "ai-bg" }, ] },
    { name: "Export", path: "#export", items: [ { label: "Recent Exports", desc: "Last 20 files" }, { label: "PNG / JPG / WEBP", desc: "Choose format" }, ] },
  ];

  // MERGED: Custom Background includes Upload
  const ALL_TOOLS_MAP: Record<string, { id: string; label: string; icon: string }[]> = {
    Dashboard: [ { id: "custom-bg", label: "Custom Background", icon: "🖼️" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "enhance", label: "Enhance", icon: "✨" }, ],
    Studio: [ { id: "custom-bg", label: "Custom Background", icon: "🖼️" }, { id: "enhance", label: "Enhance", icon: "✨" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "eraser", label: "Magic Eraser", icon: "🪶" }, { id: "recolor", label: "Recolor", icon: "🎨" }, { id: "shadow", label: "Shadow Studio", icon: "☁️" }, ],
    Backgrounds: [ { id: "custom-bg", label: "Custom Background", icon: "🖼️" }, { id: "preset-bg", label: "Preset Backgrounds", icon: "🏜️" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "luxury-gold", label: "Luxury Marble • Gold", icon: "✨" }, ],
    Enhance: [ { id: "enhance", label: "Auto Enhance", icon: "✨" }, { id: "upscale", label: "Upscale 2x/4x", icon: "🔍" }, { id: "recolor", label: "Color Correction", icon: "🎨" }, { id: "shadow", label: "Lighting Fix", icon: "💡" }, ],
    Batch: [ { id: "bulk-upload", label: "Bulk Upload", icon: "📦" }, { id: "apply-all", label: "Apply Same BG to All", icon: "🔄" }, { id: "bulk-export", label: "Bulk Export ZIP", icon: "📁" }, ],
    Export: [ { id: "png-export", label: "PNG / JPG / WEBP", icon: "⬇️" }, { id: "quality-dpi", label: "Quality & DPI", icon: "⚙️" }, ],
  };

  const dynamicTools = ALL_TOOLS_MAP[activeHeaderTab] || ALL_TOOLS_MAP["Studio"];
  const activeToolLabel = dynamicTools.find(t=>t.id===activeTool)?.label || activeTool;
  const toolStatus: Record<string, { after: string }> = {
    "custom-bg": { after: "Custom BG" }, "enhance": { after: "Enhanced" }, "ai-bg": { after: "New BG" }, "eraser": { after: "Erased" }, "recolor": { after: "Recolored" }, "shadow": { after: "Shadow Added" }, "preset-bg": { after: "Preset BG" },
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) { setActiveDropdown(null); setHoveredHeaderTab(null); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeaderItemClick = (tabName: string, item: TabAction) => {
    setActiveHeaderTab(tabName); setHoveredHeaderTab(null);
    if (item.tool) setActiveTool(item.tool);
    if (item.bg) setBgStyle(item.bg);
    if (item.prompt) setPrompt(item.prompt);
    if (item.label === "Quick Upload" || item.label.includes("Bulk Upload")) { fileInputRef.current?.click(); }
  };
  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(null);
  };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleUpload(file); };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      // @ts-ignore
      const { removeBackground } = await import("@imgly/background-removal");
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File);
      setAfterImage(URL.createObjectURL(blob)); setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => {
    const link = document.createElement("a"); link.href = afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click();
  };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Dark moody", bg: "Studio Black", tool: "ai-bg" },
    { chip: "Outdoor sunlight", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Neutral grey backdrop", bg: "Minimal Concrete", tool: "ai-bg" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[44px]";
  const currentAfterText = isBgRemoved ? toolStatus[activeTool]?.after || "BG Removed" : "Original";

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    switch(activeTool) {
      case "custom-bg":
        return (
          <div className="space-y-3">
            <div className={baseCard}>
              <span className="text-[#E8DCC6]/50">Mode - Custom Background (Merged)</span>
              <div className="mt-1 text-white">Color + Upload Custom BG in one tool</div>
              <button onClick={()=>fileInputRef.current?.click()} className="mt-2 bg-[#0F0F0F] border border-[#D4A574]/30 rounded-full px-3 py-1 text-[11px]">Upload Custom BG Image</button>
            </div>
            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs cursor-pointer h-[44px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer" /></div>
          </div>
        );
      case "ai-bg":
      case "luxury-gold":
      case "preset-bg":
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70">AI Background</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs cursor-pointer h-[44px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div className="grid grid-cols-2 gap-2">{["Gold", "Marble", "Black", "Concrete"].map(p=> <button key={p} onClick={()=>setBgStyle(p)} className={`h-[44px] rounded-xl border text-xs ${bgStyle.includes(p) ? "bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]" : "bg-[#1F1F1F] border-[#D4A574]/10"}`}>{p}</button>)}</div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Lighting Direction <span>{lighting}</span></label><select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[44px]"><option>Top-Right</option><option>Top-Left</option><option>Center</option><option>Soft Box</option></select></div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs cursor-pointer h-[44px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option></select></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-2 gap-2">
      <header ref={headerRef} className="h-[64px] shrink-0 border border-[#D4A574]/30 rounded-2xl px-5 flex items-center bg-[#141414] z-50">
        <div className="flex items-center justify-between w-full gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <img src="/Logo-White.png" alt="VISFORA Logo" className="h-9 w-auto object-contain" />
              <span className="text-[22px] tracking-[0.18em] font-light text-white leading-none flex items-baseline">VIS<span className="font-semibold text-[#d6a85a]">FORA</span></span>
            </Link>
            <span className="text-[22px] tracking-[0.18em] font-light text-white/70 leading-none flex items-center">
              <span className="mx-2 text-[16px] opacity-60 -translate-y-[1px]">–</span>
              <span className="text-[16px]">Photo Studio</span>
            </span>
          </div>
          <nav className="flex-1 flex justify-center">
            <div className="flex items-center gap-1">
              {HEADER_TABS.map((tab) => {
                const isActive = activeHeaderTab === tab.name;
                return (
                  <div key={tab.name} className="relative" onMouseEnter={() => setHoveredHeaderTab(tab.name)} onMouseLeave={() => setHoveredHeaderTab(null)}>
                    <button onClick={() => setActiveHeaderTab(tab.name)} className={`px-4 py-1.5 rounded-full transition cursor-pointer text-[13px] ${isActive ? "border border-[#e69f50] text-white font-medium bg-white/[0.06]" : "border border-transparent text-[#E8DCC6]/60 hover:text-white hover:bg-white/[0.04]"}`}>{tab.name}</button>
                    {hoveredHeaderTab === tab.name && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-[42px] w-[260px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-2">
                        {tab.items.map((item) => (
                          <button key={item.label} onClick={() => handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#1F1F1F] cursor-pointer">
                            <div className="text-[13px] text-white flex items-center gap-2">{item.label}{item.badge && <span className="text-[9px] bg-[#e69f50] text-black px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}</div>
                            <div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setActiveDropdown(activeDropdown === "notif" ? null : "notif")} className="w-9 h-9 flex items-center justify-center text-[18px] bg-transparent border-0 rounded-xl hover:bg-white/10 cursor-pointer">🔔</button>
            <button className="w-9 h-9 rounded-full bg-[#e69f50] border-2 border-[#e69f50] text-black flex items-center justify-center text-[13px]">U</button>
          </div>
        </div>
      </header>

      <div className="h-[48px] shrink-0 border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-2 flex items-center gap-3">
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs cursor-pointer min-w-[180px]" value={prompt} onChange={e=>{setPrompt(e.target.value); const c=chips.find(x=>x.chip===e.target.value); if(c){setBgStyle(c.bg); setActiveTool(c.tool);}}}><option value="">Select chip...</option>{chips.map(c=><option key={c.chip} value={c.chip}>{c.chip}</option>)}</select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-4 py-2"><span>✨</span><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox" className="flex-1 bg-transparent outline-none text-xs placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-5 py-2 text-xs ${ctaClass}`}>Generate</button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[260px_1fr_300px] gap-2 overflow-hidden">
        <div className="flex flex-col gap-2 min-h-0">
          <div className="border border-[#D4A574]/30 rounded-2xl p-3 bg-[#141414] flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 shrink-0"><span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold">{activeHeaderTab.toUpperCase()}</span><span className="text-[9px] text-[#E8DCC6]/30">dynamic</span></div>
            <div className="space-y-1.5 mt-3 overflow-y-auto"><>{dynamicTools.map(tool => (<button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}><span>{tool.icon}</span> {tool.label}</button>))}</></div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-3 h-[36px] text-[12px] shrink-0 ${ctaClass}`}>Run {activeToolLabel}</button>
          </div>
          <div className="h-[150px] shrink-0 border border-[#D4A574]/30 rounded-2xl p-3 bg-[#141414] flex flex-col">
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/60 rounded-xl flex-1 flex flex-col justify-center items-center text-center bg-[#0F0F0F]/50"><p className="text-xs">Drag & drop image here</p><p className="text-[10px] text-[#E8DCC6]/40">PNG, JPG</p></div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-2 h-[32px] text-[11px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col min-h-0 overflow-hidden">
          <div className="h-[40px] shrink-0 p-2 border-b border-[#D4A574]/20 flex items-center justify-between">
            <h3 className="text-sm">3D Model Viewer</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-2 pr-1 py-0.5"><span className="text-[9px] text-[#E8DCC6]/60">BG Removal</span><button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[48px] h-[22px] rounded-full p-0.5 transition-all cursor-pointer flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A]"}`}><span className={`absolute text-[8px] font-bold ${isBgRemoved ? "left-1.5 text-black" : "right-1.5 text-white/40"}`}>{isBgRemoved ? "ON" : "OFF"}</span><div className={`w-4 h-4 rounded-full shadow-md transition-all z-10 ${isBgRemoved ? "translate-x-[28px] bg-black" : "translate-x-0 bg-white"}`} /></button></div>
              <button className="px-2 py-1 rounded-full text-[10px] bg-[#1F1F1F] border border-[#D4A574]/20">Reset</button>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex">
            <div className="flex-1 relative bg-[#0F0F0F]"><div className="absolute top-2 left-2 z-10 text-[9px] font-bold tracking-widest text-[#e69f50] bg-black/60 px-2 py-0.5 rounded-full">BEFORE</div>{uploadedImage ? <img src={uploadedImage} className="w-full h-full object-contain absolute inset-0 p-2" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-contain absolute inset-0 p-2" alt="sneaker" />}</div>
            <div className="flex-1 relative border-l border-[#D4A574]/20 bg-[#0F0F0F]"><div className="absolute top-2 right-2 z-10 text-[9px] font-bold tracking-widest text-[#e69f50] bg-black/60 px-2 py-0.5 rounded-full">AFTER</div>{isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-xs z-10">Processing...</div> : afterImage && isBgRemoved ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10 p-2 pb-8" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-xs z-10">No preview yet</div>}<div className="absolute bottom-0 left-0 right-0 z-20 p-2 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent"><span className="text-[9px] bg-black/80 px-2 py-1 rounded-full border border-[#e69f50]/30 text-white">{fileName} • {currentAfterText}</span><span className="text-[8px] bg-black/80 px-2 py-1 rounded-full border border-white/10 text-white/60">{exportFormat}</span></div></div>
          </div>
          <div className="h-[24px] shrink-0 px-2 flex items-center justify-center text-[10px] text-[#E8DCC6]/30 border-t border-[#D4A574]/20">Model: {fileName} • Ready</div>
        </div>

        <div className="flex flex-col gap-2 min-h-0">
          <div className="border border-[#D4A574]/30 rounded-2xl p-3 bg-[#141414] flex-1 min-h-0 overflow-y-auto"><div className="flex items-center gap-2"><span className="text-[10px] bg-[#e69f50]/20 text-[#e69f50] px-2 py-0.5 rounded-full font-bold">PROPERTIES</span><span className="text-[9px] text-[#E8DCC6]/30">{activeToolLabel} • dynamic</span></div><h4 className="text-xs font-medium mt-2 mb-2">TOOLS / PROPERTIES</h4>{renderRightDynamicContent()}</div>
          <div className="h-[180px] shrink-0 border border-[#D4A574]/30 rounded-2xl p-3 bg-[#141414] flex flex-col"><h4 className="text-xs font-medium mb-2">EXPORT & VIEW</h4><div className="space-y-2 flex-1"><div className="grid grid-cols-2 gap-2"><select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-[11px] h-[34px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select><select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-[11px] h-[34px]"><option>PNG</option></select></div><div><label className="text-[10px] text-[#E8DCC6]/60 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50] h-[4px]" /></div></div><button onClick={handleExport} className={`w-full h-[34px] text-[11px] mt-2 ${ctaClass}`}>Export All Formats</button></div>
        </div>
      </div>

      <div className="h-[32px] shrink-0 border border-[#D4A574]/30 rounded-2xl bg-[#141414] px-3 flex items-center justify-between text-[10px]"><div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span><span>AI {isProcessing?"62%":"Ready"}</span><div className="w-20 h-1.5 bg-[#1F1F1F] rounded-full"><div className={`h-1.5 bg-[#e69f50] rounded-full ${isProcessing?"w-[62%]":"w-full"}`}></div></div></div><div className="flex items-center gap-4"><span>Today 14</span><span>Avg 22s</span><span>Credits 187</span></div></div>
    </div>
  );
}