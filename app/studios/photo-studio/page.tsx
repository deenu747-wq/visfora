"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

declare module "@imgly/background-removal";

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
  const [activeTool, setActiveTool] = useState("color-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(false);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Backgrounds");
  const [hoveredHeaderTab, setHoveredHeaderTab] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [red, setRed] = useState(230);
  const [green, setGreen] = useState(159);
  const [blue, setBlue] = useState(80);
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const [prevBgColor, setPrevBgColor] = useState("#e69f50");
  const [prevComposite, setPrevComposite] = useState<string | null>(null);
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);
  const [placement, setPlacement] = useState("Cover");
  const [position, setPosition] = useState("Center");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits", tool: "overview" }, { label: "Recent Projects", desc: "Last 10 files", tool: "recent" }, { label: "Quick Upload", desc: "Start new edit", tool: "quick-upload" }, ] },
    { name: "Create", path: "#create", items: [ { label: "Product Staging", desc: "Lifestyle + flat lay", tool: "product-staging", badge: "AI" }, { label: "Templates", desc: "Amazon, Shopify, Insta", tool: "templates" }, { label: "Custom Background", desc: "Color + upload own", tool: "color-bg" }, { label: "Virtual Model", desc: "Ghost mannequin AI", tool: "virtual-model", badge: "NEW" }, { label: "Product Video", desc: "Image to video", tool: "product-video", badge: "2026" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [ { label: "Remove Background", desc: "One-tap AI cutout", tool: "remove-bg", badge: "CORE" }, { label: "AI Backgrounds", desc: "Marble, Gold, Studio", tool: "ai-bgs", bg: "Luxury Marble • Gold" }, { label: "Color Background", desc: "Solid + Brand Kit", tool: "color-bg" }, { label: "Custom Upload", desc: "Upload your BG", tool: "custom-bg-upload" }, { label: "Relight", desc: "Virtual studio lighting", tool: "relight", badge: "MUST" }, ] },
    { name: "Retouch", path: "#retouch", items: [ { label: "Magic Eraser", desc: "Prompt-free remove", tool: "magic-eraser", badge: "AI" }, { label: "Generative Fill", desc: "Inpaint missing area", tool: "generative-fill", badge: "NEW" }, { label: "Object Removal", desc: "Clean clutter", tool: "object-removal" }, { label: "Ironing", desc: "Remove wrinkles", tool: "ironing", badge: "Fashion" }, { label: "Product Fixer", desc: "Preserve logo & texture", tool: "product-fixer", badge: "MUST" }, ] },
    { name: "Adjust", path: "#adjust", items: [ { label: "Auto Enhance", desc: "Exposure + WB fix", tool: "auto-enhance" }, { label: "Upscale 4K", desc: "HD up to 4x", tool: "upscale-4k", badge: "HD" }, { label: "Color Match", desc: "Match to reference", tool: "color-match", badge: "MUST" }, { label: "Recolor Variants", desc: "New product colors", tool: "recolor-variants" }, { label: "AI Expand", desc: "Uncrop / Outpaint", tool: "ai-expand", badge: "NEW" }, { label: "Color & Light", desc: "True color correction", tool: "color-light" }, ] },
    { name: "Shadows", path: "#shadows", items: [ { label: "AI Shadows", desc: "Soft / Hard / None", tool: "ai-shadows", badge: "CORE" }, { label: "Reflection", desc: "Floor reflection", tool: "reflection", badge: "NEW" }, { label: "Relight Studio", desc: "Dynamic relighting", tool: "relight-studio" }, ] },
    { name: "Batch", path: "#batch", items: [ { label: "Bulk Edit (100)", desc: "Process catalog", tool: "bulk-edit", badge: "PRO" }, { label: "Apply Same Settings", desc: "Same BG + Shadow", tool: "apply-same" }, { label: "Resize Marketplace", desc: "Amazon, Shopify, Insta", tool: "resize-market" }, { label: "Bulk Color Normalize", desc: "Batch WB fix", tool: "bulk-color" }, { label: "Bulk Export ZIP", desc: "Download all", tool: "bulk-zip" }, ] },
    { name: "Export", path: "#export", items: [ { label: "PNG / JPG / WEBP", desc: "Format + transparent", tool: "format" }, { label: "Quality & DPI", desc: "72-300 DPI + Size", tool: "quality-dpi" }, { label: "Brand Kit", desc: "Logo + Colors + Fonts", tool: "brand-kit" }, { label: "Text Overlay", desc: "Watermark + Info", tool: "text-overlay" }, { label: "Video Export", desc: "Product video out", tool: "video-export", badge: "2026" }, ] },
  ];

  const ALL_TOOLS_MAP: Record<string, { id: string; label: string; icon: string }[]> = {
    Dashboard: [ { id: "overview", label: "Overview", icon: "📊" }, { id: "recent", label: "Recent Projects", icon: "🕘" }, { id: "quick-upload", label: "Quick Upload", icon: "⚡" }, ],
    Create: [ { id: "product-staging", label: "Product Staging", icon: "🏔️" }, { id: "templates", label: "Templates", icon: "📐" }, { id: "color-bg", label: "Custom Background", icon: "🎀" }, { id: "virtual-model", label: "Virtual Model", icon: "👕" }, { id: "product-video", label: "Product Video", icon: "🎬" }, ],
    Backgrounds: [ { id: "remove-bg", label: "Remove Background", icon: "✂️" }, { id: "ai-bgs", label: "AI Backgrounds", icon: "✨" }, { id: "color-bg", label: "Color Background", icon: "🎨" }, { id: "custom-bg-upload", label: "Custom Upload", icon: "🖼️" }, { id: "relight", label: "Relight", icon: "💡" }, ],
    Retouch: [ { id: "magic-eraser", label: "Magic Eraser", icon: "🪶" }, { id: "generative-fill", label: "Generative Fill", icon: "🧩" }, { id: "object-removal", label: "Object Removal", icon: "🧹" }, { id: "ironing", label: "Ironing", icon: "👔" }, { id: "product-fixer", label: "Product Fixer", icon: "🔒" }, ],
    Adjust: [ { id: "auto-enhance", label: "Auto Enhance", icon: "⚡" }, { id: "upscale-4k", label: "Upscale 4K", icon: "🔍" }, { id: "color-match", label: "Color Match", icon: "🎯" }, { id: "recolor-variants", label: "Recolor Variants", icon: "🌈" }, { id: "ai-expand", label: "AI Expand", icon: "↔️" }, { id: "color-light", label: "Color & Light", icon: "☀️" }, ],
    Shadows: [ { id: "ai-shadows", label: "AI Shadows", icon: "☁️" }, { id: "reflection", label: "Reflection", icon: "💧" }, { id: "relight-studio", label: "Relight Studio", icon: "🔦" }, ],
    Batch: [ { id: "bulk-edit", label: "Bulk Edit (100)", icon: "📦" }, { id: "apply-same", label: "Apply Same Settings", icon: "🔄" }, { id: "resize-market", label: "Resize Marketplace", icon: "📏" }, { id: "bulk-color", label: "Bulk Color Normalize", icon: "🎨" }, { id: "bulk-zip", label: "Bulk Export ZIP", icon: "📁" }, ],
    Export: [ { id: "format", label: "PNG / JPG / WEBP", icon: "⬇️" }, { id: "quality-dpi", label: "Quality & DPI", icon: "⚙️" }, { id: "brand-kit", label: "Brand Kit", icon: "🏷️" }, { id: "text-overlay", label: "Text Overlay", icon: "🔤" }, { id: "video-export", label: "Video Export", icon: "🎞️" }, ],
  };

  const dynamicTools = ALL_TOOLS_MAP[activeHeaderTab] || ALL_TOOLS_MAP["Backgrounds"];
  const activeToolLabel = dynamicTools.find(t=>t.id===activeTool)?.label || activeTool;
  const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  const hexToRgb = (hex: string) => ({ r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) });
  const updateFromHex = (hex: string) => { if(!isValidHex(hex)) return; setBgColor(hex); setBgColorInput(hex); const {r,g,b}=hexToRgb(hex); setRed(r); setGreen(g); setBlue(b); };

  const updateComposite = useCallback(async () => {
    if (!canvasRef.current) return;
    const source = cutoutImage || uploadedImage || "/sneaker.png";
    const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = source;
    await new Promise<void>(r => { img.onload = () => r(); img.onerror = () => r(); });
    canvas.width = img.width || 800; canvas.height = img.height || 800;
    if (customBgUrl) {
      const bgImg = new Image(); bgImg.crossOrigin="anonymous"; bgImg.src=customBgUrl; await new Promise<void>(r => { bgImg.onload=()=>r(); bgImg.onerror=()=>r(); });
      if(placement==="Cover") ctx.drawImage(bgImg,0,0,canvas.width,canvas.height);
      else { ctx.fillStyle=bgColor; ctx.fillRect(0,0,canvas.width,canvas.height); const scale=Math.min(canvas.width/bgImg.width, canvas.height/bgImg.height); const w=bgImg.width*scale, h=bgImg.height*scale; ctx.drawImage(bgImg,(canvas.width-w)/2,(canvas.height-h)/2,w,h); }
    } else { 
      // FIX: If BG is OFF or tool is overview, show transparent checker logic
      if(!isBgRemoved && activeTool !== "color-bg" && !cutoutImage){
        // Keep original behavior for overview - will be overridden by image draw
        ctx.fillStyle = "#141414"; 
        ctx.fillRect(0,0,canvas.width,canvas.height);
      } else {
        ctx.fillStyle = bgColor; 
        ctx.fillRect(0,0,canvas.width,canvas.height); 
      }
    }
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); 
    // Only set afterImage if we are in color-bg or bg-removed state, otherwise keep original for overview logic
    if(activeTool === "color-bg" || cutoutImage || customBgUrl || isBgRemoved){
      setAfterImage(url);
    }
  }, [cutoutImage, bgColor, exportFormat, exportQuality, customBgUrl, placement, uploadedImage, isBgRemoved, activeTool]);

  useEffect(() => { updateComposite(); }, [updateComposite]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) { setHoveredHeaderTab(null); } };
    document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeaderItemClick = (tabName: string, item: TabAction) => { setActiveHeaderTab(tabName); setHoveredHeaderTab(null); if (item.tool) setActiveTool(item.tool); if (item.bg) setBgStyle(item.bg); if (item.prompt) setPrompt(item.prompt); };
  const handleUpload = (file: File) => { const url = URL.createObjectURL(file); setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(url); setCutoutImage(null); setCompositeImage(url); };
  const handleCustomBgUpload = (file: File) => { const url = URL.createObjectURL(file); setCustomBgUrl(url); setTimeout(()=>updateComposite(),100); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleUpload(file); };
  
  const handleProcess = async () => {
    setIsProcessing(true); setPrevBgColor(bgColor); setPrevComposite(compositeImage || afterImage);
    try {
      // @ts-ignore
      const mod: any = await import("@imgly/background-removal");
      let fileToProcess: File;
      if (uploadedFile) fileToProcess = uploadedFile;
      else {
        const src = uploadedImage || "/sneaker.png";
        const res = await fetch(src); const blob = await res.blob();
        fileToProcess = new File([blob], fileName, { type: blob.type });
      }
      const blob = await mod.removeBackground(fileToProcess);
      const cutoutUrl = URL.createObjectURL(blob);
      setCutoutImage(cutoutUrl); setIsBgRemoved(true); setTimeout(()=>updateComposite(),100);
    } catch (err) { console.log(err); await updateComposite(); }
    setIsProcessing(false);
  };
  const handleApply = async () => { setPrevBgColor(bgColor); setPrevComposite(compositeImage || afterImage); await updateComposite(); };
  
  // === FIXED RESET LOGIC ===
  const handleReset = () => { 
    const def="#e69f50"; 
    updateFromHex(def); 
    setBgStyle("Luxury Marble • Gold"); 
    setShadowIntensity(70); 
    setPlacement("Cover"); 
    setPosition("Center"); 
    setCustomBgUrl(null);
    // Full reset to BEFORE state
    setCutoutImage(null);
    setIsBgRemoved(false);
    const original = uploadedImage || "/sneaker.png";
    setAfterImage(original);
    setCompositeImage(original);
    setIsProcessing(false);
  };

  const handleCancel = () => { updateFromHex(prevBgColor); if(prevComposite){ setCompositeImage(prevComposite); setAfterImage(prevComposite); } };
  const handleExport = () => { const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage || "/sneaker.png"; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click(); };

  const chips = [ { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bgs" }, { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bgs" }, { chip: "Dark moody", bg: "Studio Black", tool: "ai-bgs" }, ];
  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    switch(activeTool) {
      case "remove-bg": return <div className="space-y-3"><div className={baseCard}>✂️ AI Cutout: One-tap remove. Works on default sneaker too.</div><button onClick={handleProcess} className={`w-full h-[44px] text-sm ${ctaClass}`}>{isProcessing?"Processing...":"Remove Background"}</button></div>;
      case "color-bg": return <div className="space-y-3"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3"><div className="flex items-center justify-between mb-2"><span className="text-[11px] text-[#E8DCC6]/60">Background Color</span><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full border border-white/20" style={{background: bgColor}} /><span className="text-[11px] font-mono">{bgColor}</span></div></div><div className="h-[28px] rounded-full border border-[#D4A574]/20 cursor-pointer" style={{background: "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}} onClick={(e)=>{ const rect = e.currentTarget.getBoundingClientRect(); const percent = (e.clientX - rect.left)/rect.width; const hues = ["#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"]; updateFromHex(hues[Math.floor(percent*7)] || "#e69f50"); }} /><div className="mt-3 grid grid-cols-2 gap-2"><input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs font-mono" /><div className="flex gap-1">{["#e69f50","#ffffff","#000000","#ff00ff"].map(c=> <button key={c} onClick={()=>{updateFromHex(c); setTimeout(()=>updateComposite(),10);}} className="flex-1 rounded-lg border border-white/10 cursor-pointer" style={{background:c}} />)}</div></div></div><div className="border-2 border-dashed border-[#D4A574]/30 rounded-xl p-3 text-center bg-[#0F0F0F]"><p className="text-[11px]">Upload Custom BG</p><button onClick={()=>customBgInputRef.current?.click()} className="mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full px-4 py-1.5 text-[11px] cursor-pointer">Choose File</button><input ref={customBgInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleCustomBgUpload(e.target.files[0])} /></div><div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D4A574]/10"><button onClick={handleCancel} className="h-[40px] rounded-xl border border-[#D4A574]/20 bg-[#1F1F1F] text-xs cursor-pointer">Cancel</button><button onClick={handleReset} className="h-[40px] rounded-xl border border-[#D4A574]/20 bg-[#1F1F1F] text-xs cursor-pointer">Reset</button><button onClick={handleApply} className={`h-[40px] rounded-xl text-xs ${ctaClass}`}>Apply</button></div></div>;
      default: return <div className="space-y-3"><div className={baseCard}>{activeToolLabel} — Active. All controls live.</div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Run {activeToolLabel}</button></div>;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      <header ref={headerRef} className="shrink-0 border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 cursor-pointer"><img src="/Logo-White.png" alt="VISFORA Logo" className="h-11 w-auto object-contain" /><span className="text-[26px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span></span></Link>
            <span className="text-[26px] font-light text-[#d6a85a] leading-none select-none mx-1">-</span>
            <span className="text-[26px] tracking-normal font-light text-white leading-none select-none cursor-default">Photo Studio</span>
          </div>
          <nav className="hidden lg:flex items-center gap-1 text-[15px]">
            {HEADER_TABS.map((tab) => {
              const isActive = activeHeaderTab === tab.name; const isHovered = hoveredHeaderTab === tab.name;
              return (
                <div key={tab.name} className="relative" onMouseEnter={() => setHoveredHeaderTab(tab.name)} onMouseLeave={() => setHoveredHeaderTab(null)}>
                  <button onClick={() => { setActiveHeaderTab(tab.name); const first = ALL_TOOLS_MAP[tab.name]?.[0]?.id; if(first) setActiveTool(first); }} className={`px-4 py-2 rounded-full transition cursor-pointer text-[14px] ${isActive ? "border border-[#e69f50] text-white font-medium bg-white/[0.06]" : "border border-transparent text-[#E8DCC6]/60 hover:text-white hover:bg-white/[0.04]"}`}>{tab.name}</button>
                  {isHovered && (
                    <div className="absolute left-0 top-[44px] w-auto min-w-[260px] max-w-[380px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-2">
                      {tab.items.map((item) => (
                        <button 
                          key={item.label} 
                          onClick={() => handleHeaderItemClick(tab.name, item)} 
                          className="group w-full text-left px-3 py-2.5 rounded-xl border border-transparent hover:bg-[#e69f50]/12 hover:border-[#e69f50]/30 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="text-[13px] text-white group-hover:text-[#e69f50] flex items-center gap-2 transition-colors">
                              {item.label}
                              {item.badge && <span className="text-[9px] bg-[#e69f50] text-black px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}
                            </div>
                            {/* FIXED: More visible sub-text + hover visible */}
                            <div className="text-[11px] text-[#E8DCC6]/70 group-hover:text-white transition-colors mt-[2px]">
                              {item.desc}
                            </div>
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
        <div className="flex items-center gap-1"><button className="w-11 h-11 flex items-center justify-center text-[20px] bg-transparent border-0 rounded-xl text-[#E8DCC6]/80">🔔</button><button className="w-11 h-11 rounded-full flex items-center justify-center font-medium border-2 bg-[#e69f50] border-[#e69f50]/50 text-black">U</button></div>
      </header>

      <div className="shrink-0 border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm cursor-pointer min-w-[200px]" value={prompt} onChange={e=>setPrompt(e.target.value)}><option value="">Select chip...</option>{chips.map(c=><option key={c.chip} value={c.chip}>{c.chip}</option>)}</select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><span>✨</span><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>Generate</button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-start">
        <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">{activeHeaderTab.toUpperCase()}</span>
            <div className="space-y-2 mt-4">
              {dynamicTools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}><span>{tool.icon}</span> {tool.label}</button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-4 flex items-center justify-center gap-2 h-[44px] text-[13px] ${ctaClass}`}>Run {activeToolLabel}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col shrink-0">
            <h4 className="text-[11px] font-bold tracking-wide text-[#e69f50] mb-3">UPLOAD • LOCKED</h4>
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl p-6 text-center bg-[#0F0F0F]/50 flex-1 flex flex-col justify-center cursor-pointer" onClick={()=>fileInputRef.current?.click()}><p className="text-sm mt-2">Drag & drop image here</p><p className="text-xs text-[#E8DCC6]/50 mt-1">or click to browse</p></div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        <div id="studio-canvas-wrapper" className="shrink-0 border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-[640px] min-h-[640px] max-h-[640px]">
          <div className="p-3 px-4 border-b border-[#D4A574]/20 flex items-center justify-between shrink-0 bg-[#0F0F0F]/50">
            <h3 className="text-[#E8DCC6] text-[12px] font-bold tracking-[0.15em] flex items-center gap-2"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span>STUDIO CANVAS • {activeToolLabel.toUpperCase()}</h3>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} title="Reset to Original" className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#1F1F1F] border border-[#D4A574]/30 hover:border-[#e69f50] hover:bg-[#e69f50]/10 text-[#E8DCC6]/60 hover:text-[#e69f50] cursor-pointer transition-all">↺</button>
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full pl-3 pr-1 py-1">
                <span className="text-[10px] font-bold tracking-wide">BG</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[56px] h-[24px] rounded-full p-[2px] cursor-pointer transition-all ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#0A0A0A]"}`}><div className={`w-[20px] h-[20px] rounded-full bg-white shadow transition-all ${isBgRemoved ? "translate-x-[32px]" : "translate-x-0"}`} /></button>
                <span className="text-[10px] font-bold pr-2">{isBgRemoved ? "ON" : "OFF"}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative bg-[#0A0A0A] flex min-h-0">
            <div className="flex-1 relative bg-[#141414]"><div className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest text-white bg-black/70 px-2.5 py-1 rounded-full border border-white/10">BEFORE</div>{uploadedImage ? <img src={uploadedImage} className="w-full h-full object-contain absolute inset-0 p-4" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-contain absolute inset-0 p-4" alt="sneaker" />}</div>
            <div className="flex-1 relative border-l border-[#D4A574]/20 bg-[#0F0F0F]">
              <div className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest text-[#e69f50] bg-black/70 px-2.5 py-1 rounded-full border border-[#e69f50]/20">AFTER • {activeToolLabel}</div>
              <canvas ref={canvasRef} hidden />
              {isProcessing ? <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#e69f50] z-10"><div className="w-8 h-8 border-2 border-[#e69f50] border-t-transparent rounded-full animate-spin" /><span className="text-xs animate-pulse">Processing {activeToolLabel}...</span></div> : afterImage ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10 p-4" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/30 text-xs z-10">Click Apply</div>}
            </div>
          </div>
          <div className="p-2.5 px-4 flex items-center justify-between bg-[#0F0F0F] border-t border-[#D4A574]/20 shrink-0">
            <span className="text-[11px] text-[#E8DCC6]/60 flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:bgColor}} />{fileName} • {bgColor}</span>
            <span className="text-[10px] text-[#E8DCC6]/30">{exportFormat} • 2048px • {activeHeaderTab}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">PROPERTIES</span><span className="text-[10px] ml-2 text-[#E8DCC6]/40">{activeToolLabel}</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            <div className="mt-2">{renderRightDynamicContent()}</div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col shrink-0">
            <h4 className="text-[11px] font-bold tracking-wide text-[#e69f50] mb-3">EXPORT • LOCKED</h4>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-2"><select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs h-[48px] flex flex-col justify-center"><span className="text-[#E8DCC6]/50">Size</span><div>2048 x 2048</div></div></div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50] cursor-pointer" /></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>

      <div className="shrink-0 border border-[#D4A574]/30 rounded-2xl bg-[#141414] p-3 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3"><span className="flex gap-1"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span></span><span>AI {isProcessing?"generating 62%":"Ready"}</span></div>
        <div className="flex items-center gap-6"><span>Completed today 14</span><span>Credits remaining 187</span></div>
      </div>
    </div>
  );
}