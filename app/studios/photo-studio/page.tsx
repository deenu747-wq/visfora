"use client";
import { useState, useRef, useEffect, useCallback } from "react";
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

  // CUSTOM BG COLOR STATES
  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [red, setRed] = useState(230);
  const [green, setGreen] = useState(159);
  const [blue, setBlue] = useState(80);
  const [bgMode, setBgMode] = useState<"solid" | "gradient">("solid");
  const [gradientColor1, setGradientColor1] = useState("#e69f50");
  const [gradientColor2, setGradientColor2] = useState("#1a1a1a");
  const [gradientDir, setGradientDir] = useState("135deg");
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits" }, { label: "Recent Projects", desc: "Last 10 files", tool: "custom-bg" }, { label: "Quick Upload", desc: "Start new edit" }, ] },
    { name: "Studio", path: "#studio", items: [ { label: "Custom Background", desc: "Remove & replace BG", tool: "custom-bg" }, { label: "Enhance", desc: "Auto enhance image", tool: "enhance" }, { label: "AI Backgrounds", desc: "Premium studio BG", tool: "ai-bg", bg: "Luxury Marble • Gold" }, { label: "Magic Eraser", desc: "Remove unwanted object", tool: "eraser" }, { label: "Recolor", desc: "Change product color", tool: "recolor" }, { label: "Shadow Studio", desc: "Add realistic shadow", tool: "shadow" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [ { label: "Custom Background", desc: "Your main BG tool", tool: "custom-bg" }, { label: "Custom Upload BG", desc: "Upload your own BG", tool: "custom-upload" }, { label: "Luxury Marble • Gold", desc: "Best seller", tool: "ai-bg", bg: "Luxury Marble • Gold", prompt: "Luxury gold studio" }, { label: "White Infinity", desc: "E-com clean", tool: "ai-bg", bg: "White Infinity", prompt: "Minimal marble" }, { label: "Studio Black", desc: "Premium dark", tool: "ai-bg", bg: "Studio Black", prompt: "Dark moody" }, { label: "Minimal Concrete", desc: "Trending", tool: "ai-bg", bg: "Minimal Concrete", prompt: "Neutral grey backdrop" }, { label: "Outdoor Sunlight", desc: "Natural light", tool: "ai-bg", bg: "White Infinity", prompt: "Outdoor sunlight" }, ] },
    { name: "Enhance", path: "#enhance", items: [ { label: "Auto Enhance", desc: "One-click fix", tool: "enhance" }, { label: "Upscale 2x / 4x", desc: "HD quality", tool: "enhance" }, { label: "Color Correction", desc: "True colors", tool: "recolor" }, { label: "Lighting Fix", desc: "Studio lights fix", tool: "enhance" }, { label: "Sharpen & Denoise", desc: "Crisp details", tool: "enhance" }, ] },
    { name: "Batch", path: "#batch", items: [ { label: "Bulk Upload (100)", desc: "Process 10-100 images", badge: "PRO" }, { label: "Apply Same BG to All", desc: "Save time", bg: "Luxury Marble • Gold", tool: "ai-bg" }, { label: "Bulk Export ZIP", desc: "Download all at once" }, ] },
    { name: "Export", path: "#export", items: [ { label: "Recent Exports", desc: "Last 20 files" }, { label: "PNG / JPG / WEBP", desc: "Choose format" }, { label: "Quality & DPI", desc: "2048x2048 - 300 DPI" }, { label: "Share Link", desc: "Client preview" }, ] },
  ];

  const ALL_TOOLS_MAP: Record<string, { id: string; label: string; icon: string }[]> = {
    Dashboard: [ { id: "custom-bg", label: "Custom Background", icon: "🎀" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "enhance", label: "Enhance", icon: "✨" }, ],
    Studio: [ { id: "custom-bg", label: "Custom Background", icon: "🎀" }, { id: "enhance", label: "Enhance", icon: "✨" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "eraser", label: "Magic Eraser", icon: "🪶" }, { id: "recolor", label: "Recolor", icon: "🎨" }, { id: "shadow", label: "Shadow Studio", icon: "☁️" }, ],
    Backgrounds: [ { id: "custom-bg", label: "Custom Background", icon: "🖼️" }, { id: "preset-bg", label: "Preset Backgrounds", icon: "🏜️" }, { id: "custom-upload", label: "Custom Upload BG", icon: "⬆️" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "luxury-gold", label: "Luxury Marble • Gold", icon: "✨" }, ],
    Enhance: [ { id: "enhance", label: "Auto Enhance", icon: "✨" }, { id: "upscale", label: "Upscale 2x/4x", icon: "🔍" }, { id: "recolor", label: "Color Correction", icon: "🎨" }, { id: "shadow", label: "Lighting Fix", icon: "💡" }, ],
    Batch: [ { id: "bulk-upload", label: "Bulk Upload", icon: "📦" }, { id: "apply-all", label: "Apply Same BG to All", icon: "🔄" }, { id: "bulk-export", label: "Bulk Export ZIP", icon: "📁" }, ],
    Export: [ { id: "png-export", label: "PNG / JPG / WEBP", icon: "⬇️" }, { id: "quality-dpi", label: "Quality & DPI", icon: "⚙️" }, { id: "share-link", label: "Share Link", icon: "🔗" }, ],
  };

  const dynamicTools = ALL_TOOLS_MAP[activeHeaderTab] || ALL_TOOLS_MAP["Studio"];
  const activeToolLabel = dynamicTools.find(t=>t.id===activeTool)?.label || activeTool;
  const toolStatus: Record<string, { after: string }> = {
    "custom-bg": { after: "Custom BG" }, "remove-bg": { after: "BG Removed" }, "enhance": { after: "Enhanced" }, "ai-bg": { after: "New BG" }, "eraser": { after: "Erased" }, "recolor": { after: "Recolored" }, "shadow": { after: "Shadow Added" }, "custom-upload": { after: "Custom BG" }, "preset-bg": { after: "Preset BG" },
  };

  const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  const hexToRgb = (hex: string) => ({ r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) });
  const updateFromHex = (hex: string) => {
    if(!isValidHex(hex)) return;
    setBgColor(hex); setBgColorInput(hex);
    const {r,g,b}=hexToRgb(hex); setRed(r); setGreen(g); setBlue(b);
  };

  const updateComposite = useCallback(async () => {
    if (!cutoutImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = cutoutImage;
    await new Promise(r => img.onload = r);
    canvas.width = img.width; canvas.height = img.height;
    if (activeTool === "custom-bg") {
      if (bgMode === "solid") { ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvas.width,canvas.height); }
      else { const grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height); grad.addColorStop(0, gradientColor1); grad.addColorStop(1, gradientColor2); ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height); }
    } else { ctx.fillStyle = "#1A1A1A"; ctx.fillRect(0,0,canvas.width,canvas.height); }
    ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = shadowIntensity/3; ctx.shadowOffsetY = shadowIntensity/5;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); setAfterImage(url);
  }, [cutoutImage, bgColor, bgMode, gradientColor1, gradientColor2, activeTool, shadowIntensity, exportFormat, exportQuality]);

  useEffect(() => { if(cutoutImage) updateComposite(); }, [updateComposite, cutoutImage]);

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
    if (item.label === "Quick Upload" || item.label.includes("Bulk Upload") || item.label.includes("Custom Upload")) { fileInputRef.current?.click(); }
  };

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(null); setCutoutImage(null); setCompositeImage(null);
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
      setCutoutImage(URL.createObjectURL(blob));
      setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => { const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click(); };

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

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    switch(activeTool) {
      case "custom-bg":
        return (
          <div className="space-y-3">
            <div className="flex gap-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full p-1">
              <button onClick={()=>setBgMode("solid")} className={`flex-1 py-2 rounded-full text-xs font-medium ${bgMode==="solid" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/60"}`}>Solid</button>
              <button onClick={()=>setBgMode("gradient")} className={`flex-1 py-2 rounded-full text-xs font-medium ${bgMode==="gradient" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/60"}`}>Gradient</button>
            </div>

            {/* === FIXED: NO WHITE BACKGROUND, HORIZONTAL STRIPE PICKER === */}
            <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-2xl p-3">
              {/* 1. Horizontal Rainbow Stripe - replaces box */}
              <div className="relative">
                <label className="text-[10px] text-[#E8DCC6]/50 mb-1 block">Color Spectrum</label>
                <div className="relative h-[28px] rounded-full overflow-hidden border border-[#D4A574]/20 cursor-pointer"
                  style={{background: "linear-gradient(to right, #ff0000 0%, #ff9900 15%, #ffff00 30%, #00ff00 45%, #00ffff 60%, #0000ff 75%, #ff00ff 90%, #ff0000 100%)"}}
                  onClick={(e)=>{
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percent = x / rect.width;
                    const hue = Math.round(percent * 360);
                    const newColor = `hsl(${hue}, 100%, 50%)`;
                    // quick hex approx - use canvas to convert
                    const c = document.createElement("canvas").getContext("2d")!;
                    c.fillStyle = newColor; 
                    const hex = c.fillStyle;
                    updateFromHex(hex);
                  }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-black rounded-full shadow pointer-events-none" style={{left: `calc(${(red/255)*100}% - 10px)`}} />
                </div>
              </div>

              {/* 2. Horizontal Shade/Saturation Stripe */}
              <div className="relative mt-3">
                <label className="text-[10px] text-[#E8DCC6]/50 mb-1 block">Brightness</label>
                <div className="relative h-[12px] rounded-full overflow-hidden border border-[#D4A574]/20" style={{background: `linear-gradient(to right, #000000, ${bgColor}, #ffffff)`}}>
                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full shadow" style={{left: "70%"}} />
                </div>
              </div>

              {/* 3. Sliding bar for color selection - hue slider */}
              <div className="relative mt-3">
                <label className="text-[10px] text-[#E8DCC6]/50 mb-1 block">Intensity • {bgColor}</label>
                <input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50] h-[6px] cursor-pointer" />
              </div>

              {/* 4. HEX + RGB - dark theme */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <select className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[40px] text-white"><option>RGB</option></select>
                <input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs font-mono text-white" placeholder="#e69f50" />
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2"><input value={red} onChange={e=>{ const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setRed(v); const hex=`#${v.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`; setBgColor(hex); setBgColorInput(hex); }} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs text-white" /><span className="w-10 text-[11px] text-[#E8DCC6]/50">Red</span></div>
                <div className="flex items-center gap-2"><input value={green} onChange={e=>{ const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setGreen(v); const hex=`#${red.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`; setBgColor(hex); setBgColorInput(hex); }} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs text-white" /><span className="w-10 text-[11px] text-[#E8DCC6]/50">Green</span></div>
                <div className="flex items-center gap-2"><input value={blue} onChange={e=>{ const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setBlue(v); const hex=`#${red.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}`; setBgColor(hex); setBgColorInput(hex); }} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs text-white" /><span className="w-10 text-[11px] text-[#E8DCC6]/50">Blue</span></div>
              </div>
            </div>

            {bgMode === "gradient" && (
              <div className={baseCard}>
                <span className="text-[11px] text-[#E8DCC6]/70">GRADIENT</span>
                <div className="flex gap-2 mt-2">
                  <div className="flex-1"><div className="flex gap-1"><input type="color" value={gradientColor1} onChange={e=>setGradientColor1(e.target.value)} className="w-8 h-8 rounded-lg p-1 bg-transparent border border-[#D4A574]/20" /><input value={gradientColor1} onChange={e=>setGradientColor1(e.target.value)} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-2 py-2 text-xs text-white" /></div></div>
                  <div className="flex-1"><div className="flex gap-1"><input type="color" value={gradientColor2} onChange={e=>setGradientColor2(e.target.value)} className="w-8 h-8 rounded-lg p-1 bg-transparent border border-[#D4A574]/20" /><input value={gradientColor2} onChange={e=>setGradientColor2(e.target.value)} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-2 py-2 text-xs text-white" /></div></div>
                </div>
                <div className="mt-3 h-[32px] rounded-xl border border-[#D4A574]/20" style={{background: `linear-gradient(${gradientDir}, ${gradientColor1}, ${gradientColor2})`}} />
              </div>
            )}

            <div className={baseCard}>
              <span className="text-[#E8DCC6]/50 text-[10px]">QUICK PRESETS • {bgColor}</span>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {["#ffffff","#000000","#59F7FF","#e69f50","#34c759","#007aff","#ffcc00","#af52de","#ff3b30","#1a1a1a","#00d1b2","#ff6b00"].map(c=>(
                  <button key={c} onClick={()=>updateFromHex(c)} style={{background:c}} className={`h-[28px] rounded-lg border-2 ${bgColor===c ? "border-[#e69f50] scale-110" : "border-white/10"}`} />
                ))}
              </div>
            </div>

            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[40px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">Tool Active</span><div className="mt-1 text-white">{activeToolLabel}</div></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/Logo-White.png" alt="VISFORA Logo" className="h-11 w-auto object-contain" />
            <span className="text-[26px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> Studio</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 text-[15px]">
            {HEADER_TABS.map((tab) => {
              const isActive = activeHeaderTab === tab.name;
              const isHovered = hoveredHeaderTab === tab.name;
              return (
                <div key={tab.name} className="relative" onMouseEnter={() => setHoveredHeaderTab(tab.name)} onMouseLeave={() => setHoveredHeaderTab(null)}>
                  <button onClick={() => setActiveHeaderTab(tab.name)} className={`px-4 py-2 rounded-full transition cursor-pointer text-[14px] ${isActive ? "border border-[#e69f50] text-white font-medium bg-white/[0.06]" : "border border-transparent text-[#E8DCC6]/60 hover:text-white hover:bg-white/[0.04]"}`}>
                    {tab.name}
                  </button>
                  {isHovered && (
                    <div className="absolute left-0 top-[44px] w-auto min-w-[240px] max-w-[360px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-2">
                      {tab.items.map((item) => (
                        <button key={item.label} onClick={() => handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1F1F1F] cursor-pointer">
                          <div>
                            <div className="text-[13px] text-white flex items-center gap-2">{item.label}{item.badge && <span className="text-[9px] bg-[#e69f50] text-black px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}</div>
                            <div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1 relative">
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "notif" ? null : "notif")} className={`w-11 h-11 flex items-center justify-center text-[20px] transition-all cursor-pointer bg-transparent border-0 rounded-xl ${activeDropdown === "notif" ? "bg-white/10 shadow-[0_2px_12px_rgba(255,255,255,0.15)] text-white" : "text-[#E8DCC6]/80 hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:text-white"}`}>🔔</button>
            {activeDropdown === "notif" && (
              <div className="absolute right-0 top-12 w-[340px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex items-center justify-between"><h4 className="font-medium text-white">Notifications</h4><span className="text-xs bg-[#e69f50] text-black px-2 py-0.5 rounded-full">3 new</span></div>
                <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10"><div className="flex gap-3"><span className="text-[#e69f50]">✨</span><div><p className="text-sm text-white">Background removed successfully</p><p className="text-xs text-[#E8DCC6]/50 mt-1">{fileName} • 2 min ago</p></div></div></div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")} className={`w-11 h-11 rounded-full flex items-center justify-center font-medium cursor-pointer border-2 transition text-[15px] ${activeDropdown === "profile" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#e69f50] border-[#e69f50]/50 text-black hover:border-[#e69f50]"}`}>U</button>
            {activeDropdown === "profile" && (
              <div className="absolute right-0 top-12 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-[#e69f50] flex items-center justify-center text-black font-bold">AK</div><div><p className="text-sm font-medium text-white">Ankit Kumar</p><p className="text-xs text-[#E8DCC6]/50">ankit@visfora.com</p></div></div>
                <div className="p-2"><button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer">My Profile</button></div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm cursor-pointer min-w-[200px]" value={prompt} onChange={e=>{setPrompt(e.target.value); const c=chips.find(x=>x.chip===e.target.value); if(c){setBgStyle(c.bg); setActiveTool(c.tool);}}}>
          <option value="">Select chip...</option>
          {chips.map(c=><option key={c.chip} value={c.chip}>{c.chip}</option>)}
        </select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><span>✨</span><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>Generate</button>
      </div>

      {/* FIXED IMAGE AREA - DOES NOT EXPAND */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-3 items-start">
        <div className="flex flex-col gap-3 h-[760px]">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">{activeHeaderTab.toUpperCase()}</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">dynamic change</span>
            <div className="space-y-2 mt-4">
              {dynamicTools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}>
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-4 flex items-center justify-center gap-2 h-[44px] text-[13px] ${ctaClass}`}>Run {activeToolLabel}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col">
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl p-6 text-center bg-[#0F0F0F]/50 flex-1 flex flex-col justify-center">
              <p className="text-sm mt-2">Drag & drop image here</p>
              <p className="text-xs text-[#E8DCC6]/50 mt-1">or click to browse • PNG, JPG</p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* FIXED HEIGHT CENTER - 760px - WILL NOT EXPAND */}
        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-[760px]">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between">
            <h3 className="text-[#E8DCC6] font-medium">3D Model Viewer</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1 ml-2">
                <span className="text-[10px] text-[#E8DCC6]/70">Background Removal</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 transition-all cursor-pointer flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A] border border-[#D4A574]/20"}`}>
                  <span className={`absolute text-[10px] font-bold ${isBgRemoved ? "left-2.5 text-black" : "right-2.5 text-[#E8DCC6]/50"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                  <div className={`w-5 h-5 rounded-full shadow-md transition-all z-10 ${isBgRemoved ? "translate-x-[36px] bg-black" : "translate-x-0 bg-[#E8DCC6]"}`} />
                </button>
              </div>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">Reset View</button>
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
              <canvas ref={canvasRef} hidden />
              <div className={`absolute inset-0 ${isBgRemoved ? "bg-[length:20px_20px] bg-[#1A1A1A]" : "bg-[#1A1A1A]"}`} />
              {isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing...</div> : compositeImage || afterImage ? <img src={compositeImage || afterImage!} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-sm z-10">No preview yet</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white flex gap-1.5"><span className="truncate max-w-[100px]">{fileName}</span><span className="text-[#e69f50]">• {currentAfterText} • {bgColor}</span></span>
              </div>
            </div>
          </div>
          <div className="p-2 text-center text-xs text-[#E8DCC6]/40 border-t border-[#D4A574]/20">Model: {fileName} • Fixed 760px • Ready</div>
        </div>

        <div className="flex flex-col gap-3 h-[760px]">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 overflow-y-auto">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">PROPERTIES</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">{activeToolLabel} • dynamic</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            <div className="mt-2">{renderRightDynamicContent()}</div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <h4 className="text-sm font-medium mb-3">EXPORT & VIEW</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs h-[48px]"><option>PNG</option><option>JPG</option></select>
              </div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>
    </div>
  );
}