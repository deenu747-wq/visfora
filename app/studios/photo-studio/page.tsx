"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

type TabAction = { label: string; desc: string; tool?: string; bg?: string; prompt?: string; badge?: string; };
type HeaderTab = { name: string; path: string; items: TabAction[]; };

export default function PhotoStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
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
  const [activeHeaderTab, setActiveHeaderTab] = useState("Backgrounds");
  const [hoveredHeaderTab, setHoveredHeaderTab] = useState<string | null>(null);
  // BG COLOR INSIDE CUSTOM BG
  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [customBgFile, setCustomBgFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits" }, { label: "Recent Projects", desc: "Last 10 files", tool: "custom-bg" }, { label: "Quick Upload", desc: "Start new edit" }, ] },
    { name: "Studio", path: "#studio", items: [ { label: "Custom Background", desc: "Remove & replace BG + Color", tool: "custom-bg" }, { label: "Enhance", desc: "Auto enhance image", tool: "enhance" }, { label: "AI Backgrounds", desc: "Premium studio BG", tool: "ai-bg", bg: "Luxury Marble • Gold" }, { label: "Magic Eraser", desc: "Remove unwanted object", tool: "eraser" }, { label: "Recolor", desc: "Change product color", tool: "recolor" }, { label: "Shadow Studio", desc: "Add realistic shadow", tool: "shadow" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [ { label: "Custom Background", desc: "BG Remove + Color Picker", tool: "custom-bg" }, { label: "Custom Upload BG", desc: "Upload your own BG", tool: "custom-upload" }, { label: "Luxury Marble • Gold", desc: "Best seller", tool: "ai-bg", bg: "Luxury Marble • Gold", prompt: "Luxury gold studio" }, { label: "White Infinity", desc: "E-com clean", tool: "ai-bg", bg: "White Infinity", prompt: "Minimal marble" }, { label: "Studio Black", desc: "Premium dark", tool: "ai-bg", bg: "Studio Black", prompt: "Dark moody" }, { label: "Minimal Concrete", desc: "Trending", tool: "ai-bg", bg: "Minimal Concrete", prompt: "Neutral grey backdrop" }, { label: "Outdoor Sunlight", desc: "Natural light", tool: "ai-bg", bg: "White Infinity", prompt: "Outdoor sunlight" }, ] },
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
  const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  const updateComposite = useCallback(async () => {
    if (!cutoutImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = cutoutImage;
    await new Promise(r => img.onload = r);
    canvas.width = img.width;
    canvas.height = img.height;

    if ((activeTool === "custom-bg") || activeTool === "bg-color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (activeTool === "custom-upload" && customBgFile) {
      const bgImg = new Image();
      bgImg.crossOrigin = "anonymous";
      bgImg.src = customBgFile;
      await new Promise(r => bgImg.onload = r);
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = bgStyle.includes("Gold") ? "#f5e6c8" : bgStyle.includes("Black") ? "#0f0f0f" : bgStyle.includes("Concrete") ? "#d1d1d1" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (shadowIntensity > 0) {
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = shadowIntensity / 3;
      ctx.shadowOffsetY = shadowIntensity / 5;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "transparent";
    
    const dataUrl = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality / 100);
    setCompositeImage(dataUrl);
    setAfterImage(dataUrl);
  }, [cutoutImage, bgColor, customBgFile, activeTool, bgStyle, shadowIntensity, exportFormat, exportQuality]);

  useEffect(() => { updateComposite(); }, [updateComposite]);

  const handleHeaderItemClick = (tabName: string, item: TabAction) => {
    setActiveHeaderTab(tabName); setHoveredHeaderTab(null);
    if (item.tool) setActiveTool(item.tool);
    if (item.bg) setBgStyle(item.bg);
    if (item.prompt) setPrompt(item.prompt);
  };

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url); setUploadedFile(file); setFileName(file.name);
    setCutoutImage(null); setAfterImage(null); setCompositeImage(null);
  };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleUpload(file); };

  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File);
      const cutoutUrl = URL.createObjectURL(blob);
      setCutoutImage(cutoutUrl);
      setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };

  const handleExport = () => {
    const link = document.createElement("a");
    link.href = compositeImage || afterImage || uploadedImage!;
    link.download = `visfora-${activeTool}-${bgColor.replace("#","")}.${exportFormat.toLowerCase()}`;
    link.click();
  };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-3 text-xs";
    switch(activeTool) {
      case "custom-bg":
        return (
          <div className="space-y-4">
            <div className={baseCard}>
              <span className="text-[11px] text-[#e69f50] font-bold">CUSTOM BACKGROUND ENGINE</span>
              <div className="mt-2 flex justify-between text-[11px]"><span className="text-[#E8DCC6]/50">Status</span><span className="text-white">{cutoutImage ? "BG Removed ✓" : "Upload & Run"}</span></div>
            </div>
            {/* ADDED INSIDE CUSTOM BG - NOT REPLACING ANYTHING */}
            <div className={baseCard}>
              <span className="text-[#E8DCC6]/70 text-[11px] tracking-wide">BACKGROUND COLOR CHANGE</span>
              <div className="flex gap-3 mt-3 items-center">
                <input type="color" value={bgColor} onChange={e=>{setBgColor(e.target.value); setBgColorInput(e.target.value);}} className="w-[56px] h-[48px] rounded-xl cursor-pointer bg-transparent border-2 border-[#D4A574]/20 p-1" />
                <div className="flex-1">
                  <label className="text-[11px] text-[#E8DCC6]/50">HEX CODE</label>
                  <div className="flex gap-2 mt-1">
                    <input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>{ if(isValidHex(bgColorInput)) setBgColor(bgColorInput); }} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#e69f50]" />
                    <button onClick={()=>{ if(isValidHex(bgColorInput)) setBgColor(bgColorInput); }} className="px-3 py-2 rounded-xl bg-[#e69f50] text-black text-xs font-bold">Apply</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2 mt-4">
                {["#ffffff","#000000","#e69f50","#ff3b30","#34c759","#007aff","#ffcc00","#af52de","#f5e6c8","#1a1a1a","#00d1b2","#ff6b00"].map(c=>(
                  <button key={c} onClick={()=>{setBgColor(c); setBgColorInput(c);}} style={{background:c}} className={`h-[36px] rounded-xl border-2 ${bgColor===c ? "border-[#e69f50] scale-110" : "border-white/10"}`} />
                ))}
              </div>
              <div className="mt-3 h-[48px] rounded-xl border border-[#D4A574]/20" style={{background:bgColor}} />
            </div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50]" /></div>
            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option><option>Custom Upload BG</option></select></div>
          </div>
        );
      case "custom-upload":
        return (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-[#D4A574]/30 rounded-xl p-6 text-center bg-[#0F0F0F]"><p className="text-sm">Upload Custom BG</p>{customBgFile && <img src={customBgFile} className="w-full h-24 object-cover mt-3 rounded-xl" />}<button onClick={()=>customBgInputRef.current?.click()} className="mt-3 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full px-4 py-2 text-xs">Choose File</button><input ref={customBgInputRef} type="file" accept="image/*" hidden onChange={e=>{ if(e.target.files){ setCustomBgFile(URL.createObjectURL(e.target.files[0])); }}} /></div>
            <div className={baseCard}>Placement<select className="w-full mt-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-xs"><option>Cover</option><option>Contain</option></select></div>
          </div>
        );
      case "ai-bg":
      case "luxury-gold":
      case "preset-bg":
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70">AI Background</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div className="grid grid-cols-2 gap-2">{["Gold","Marble","Black","Concrete"].map(p=><button key={p} onClick={()=>setBgStyle(p)} className={`h-[48px] rounded-xl border text-xs ${bgStyle.includes(p) ? "bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]" : "bg-[#1F1F1F] border-[#D4A574]/10"}`}>{p}</button>)}</div>
            <div><label className="text-xs text-[#E8DCC6]/70">Lighting</label><select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Top-Right</option><option>Top-Left</option><option>Center</option></select></div>
            <div><label className="text-xs flex justify-between">Shadow <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div>
          </div>
        );
      case "enhance":
      case "upscale":
        return <div className="space-y-3"><div className={baseCard}>Auto Enhance • Brightness, Contrast, Sharpness auto</div><div className="grid grid-cols-2 gap-2"><div className={baseCard}>Upscale: 2x/4x</div><div className={baseCard}>Denoise: ON</div></div><div><label className="text-xs flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div></div>;
      case "recolor":
        return <div className="space-y-3"><div className={baseCard}>Pick Product Color<input type="color" className="w-full h-[40px] mt-2 rounded-xl cursor-pointer bg-transparent" /></div></div>;
      case "shadow":
        return <div className="space-y-3"><div><label className="text-xs flex justify-between">Shadow <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><div><label className="text-xs">Direction</label><select className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Bottom</option><option>Floating</option></select></div></div>;
      default:
        return <div className={baseCard}><span className="text-[#E8DCC6]/50">Tool Active</span><div className="mt-1 text-white">{activeTool} • Working</div><div><label className="text-xs flex justify-between mt-3">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div></div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3"><img src="/Logo-White.png" alt="Logo" className="h-11 w-auto object-contain" /><span className="text-[26px] tracking-[0.18em] font-light text-white">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> Studio</span></Link>
          <nav className="hidden lg:flex items-center gap-1">{HEADER_TABS.map(tab=>(<div key={tab.name} className="relative" onMouseEnter={()=>setHoveredHeaderTab(tab.name)} onMouseLeave={()=>setHoveredHeaderTab(null)}><button onClick={()=>setActiveHeaderTab(tab.name)} className={`px-4 py-2 rounded-full text-[14px] ${activeHeaderTab===tab.name ? "border border-[#e69f50] text-white bg-white/[0.06]" : "text-[#E8DCC6]/60 hover:text-white"}`}>{tab.name}</button>{hoveredHeaderTab===tab.name && (<div className="absolute left-0 top-[44px] min-w-[240px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl p-2 z-50">{tab.items.map(item=>(<button key={item.label} onClick={()=>handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1F1F1F]"><div className="text-[13px] text-white">{item.label}</div><div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div></button>))}</div>)}</div>))}</nav>
        </div>
        <div className="flex items-center gap-2"><span className="text-xs bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full">Credits 187</span></div>
      </header>

      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>{isProcessing ? "Processing..." : "Generate"}</button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-stretch">
        <div className="flex flex-col gap-3 h-full">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">{activeHeaderTab.toUpperCase()}</span>
            <div className="space-y-2 mt-4">{dynamicTools.map(tool=>(<button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}><span>{tool.icon}</span> {tool.label}</button>))}</div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-4 h-[44px] text-[13px] ${ctaClass}`}>Run {dynamicTools.find(t=>t.id===activeTool)?.label}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col">
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl p-6 text-center bg-[#0F0F0F]/50 flex-1 flex flex-col justify-center"><p className="text-sm">Drag & drop image here</p><p className="text-xs text-[#E8DCC6]/50 mt-1">PNG, JPG</p></div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden min-h-[640px]">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between"><h3 className="font-medium">Viewer • {activeTool} • {bgColor}</h3><div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1"><span className="text-[10px]">BG Removal</span><button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A]"}`}><div className={`w-5 h-5 rounded-full bg-black transition-all ${isBgRemoved ? "translate-x-[36px]" : "translate-x-0 bg-white"}`} /></button></div></div>
          <div className="flex-1 relative bg-[#0F0F0F] flex min-h-0">
            <div className="flex-1 relative"><div className="absolute top-3 left-3 z-10 text-[11px] bg-black/60 px-3 py-1 rounded-full">BEFORE</div>{uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" /> : <img src="/sneaker.png" className="w-full h-full object-cover absolute inset-0" />}</div>
            <div className="flex-1 relative border-l border-[#D4A574]/20"><canvas ref={canvasRef} hidden />{isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse">Processing...</div> : compositeImage || afterImage ? <img src={compositeImage || afterImage!} className="absolute inset-0 w-full h-full object-contain p-4" /> : <div className="absolute inset-0 flex items-center justify-center text-white/20">No preview yet</div>}<div className="absolute bottom-0 left-0 right-0 p-2.5 flex justify-between bg-gradient-to-t from-black/90 to-transparent"><span className="text-[10px] bg-black/80 px-3 py-1.5 rounded-full border border-[#e69f50]/30">{fileName}</span><span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-[#e69f50]/30 text-[#e69f50]">{bgColor} • 2048x2048</span></div></div>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">PROPERTIES</span><span className="text-[10px] ml-2 text-[#E8DCC6]/40">dynamic by left</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            {renderRightDynamicContent()}
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col">
            <h4 className="text-sm font-medium mb-3">EXPORT & VIEW</h4>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-2"><select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select><select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs h-[48px]"><option>PNG</option><option>JPG</option></select></div>
              <div><label className="text-xs flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div>
              <div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">Current BG</span><div className="flex items-center gap-2 mt-1"><div className="w-5 h-5 rounded-full border" style={{background:bgColor}} />{bgColor}</div></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>
    </div>
  );
}