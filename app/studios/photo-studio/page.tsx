"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

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

  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [red, setRed] = useState(230);
  const [green, setGreen] = useState(159);
  const [blue, setBlue] = useState(80);
  const [bgMode, setBgMode] = useState<"solid" | "gradient">("solid");
  const [gradientColor1, setGradientColor1] = useState("#e69f50");
  const [gradientColor2, setGradientColor2] = useState("#1a1a1a");
  const [customBgFile, setCustomBgFile] = useState<string | null>(null);
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);

  // ✅ 1. MERGED - ONE ENTRY
  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits" }, { label: "Recent Projects", desc: "Last 10 files", tool: "custom-bg" }, { label: "Quick Upload", desc: "Start new edit" }, ] },
    { name: "Studio", path: "#studio", items: [ { label: "Custom Backgrounds", desc: "Color + Upload BG merged", tool: "custom-bg" }, { label: "Enhance", desc: "Auto enhance image", tool: "enhance" }, { label: "AI Backgrounds", desc: "Premium studio BG", tool: "ai-bg", bg: "Luxury Marble • Gold" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [
      { label: "Custom Backgrounds", desc: "Color Background + Upload background", tool: "custom-bg" },
      { label: "Luxury Marble • Gold", desc: "Best seller", tool: "ai-bg", bg: "Luxury Marble • Gold", prompt: "Luxury gold studio" },
      { label: "White Infinity", desc: "E-com clean", tool: "ai-bg", bg: "White Infinity" },
      { label: "Studio Black", desc: "Premium dark", tool: "ai-bg", bg: "Studio Black" },
      { label: "Minimal Concrete", desc: "Trending", tool: "ai-bg", bg: "Minimal Concrete" },
      { label: "Outdoor Sunlight", desc: "Natural light", tool: "ai-bg", bg: "White Infinity" },
    ]},
    { name: "Enhance", path: "#enhance", items: [ { label: "Auto Enhance", desc: "One-click fix", tool: "enhance" }, { label: "Upscale 2x / 4x", desc: "HD quality", tool: "enhance" }, { label: "Color Correction", desc: "True colors", tool: "recolor" }, { label: "Lighting Fix", desc: "Studio lights fix", tool: "enhance" }, { label: "Sharpen & Denoise", desc: "Crisp details", tool: "enhance" }, ] },
    { name: "Batch", path: "#batch", items: [ { label: "Bulk Upload (100)", desc: "Process 10-100 images", badge: "PRO" }, { label: "Apply Same BG to All", desc: "Save time", bg: "Luxury Marble • Gold", tool: "ai-bg" }, { label: "Bulk Export ZIP", desc: "Download all at once" }, ] },
    { name: "Export", path: "#export", items: [ { label: "Recent Exports", desc: "Last 20 files" }, { label: "PNG / JPG / WEBP", desc: "Choose format" }, { label: "Quality & DPI", desc: "2048x2048 - 300 DPI" }, { label: "Share Link", desc: "Client preview" }, ] },
  ];

  // ✅ MERGED MAP - ONE CARD
  const ALL_TOOLS_MAP: Record<string, { id: string; label: string; icon: string }[]> = {
    Dashboard: [ { id: "custom-bg", label: "Custom Backgrounds", icon: "🖼️" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, ],
    Studio: [ { id: "custom-bg", label: "Custom Backgrounds", icon: "🖼️" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" }, { id: "enhance", label: "Enhance", icon: "✨" }, ],
    Backgrounds: [
      { id: "custom-bg", label: "Custom Backgrounds", icon: "🖼️" },
      { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" },
      { id: "luxury-gold", label: "Luxury Marble • Gold", icon: "✨" },
    ],
    Enhance: [ { id: "enhance", label: "Auto Enhance", icon: "✨" }, ],
    Batch: [ { id: "bulk-upload", label: "Bulk Upload", icon: "📦" }, ],
    Export: [ { id: "png-export", label: "PNG / JPG / WEBP", icon: "⬇️" }, ],
  };

  const dynamicTools = ALL_TOOLS_MAP[activeHeaderTab] || ALL_TOOLS_MAP["Studio"];
  const activeToolLabel = dynamicTools.find(t=>t.id===activeTool)?.label || "Custom Backgrounds";

  const toolStatus: Record<string, { after: string }> = {
    "custom-bg": { after: "Custom BG" }, "ai-bg": { after: "New BG" }, "enhance": { after: "Enhanced" },
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
    if (bgMode==="solid") ctx.fillStyle = bgColor;
    else { const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height); g.addColorStop(0,gradientColor1); g.addColorStop(1,gradientColor2); ctx.fillStyle = g; }
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if (customBgFile) { const bgImg = new Image(); bgImg.src = customBgFile; await new Promise(r => bgImg.onload = r); ctx.drawImage(bgImg,0,0,canvas.width,canvas.height); }
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); setAfterImage(url);
  }, [cutoutImage, bgColor, bgMode, gradientColor1, gradientColor2, customBgFile, exportFormat, exportQuality]);

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
  };
  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(null); setCutoutImage(null); setCompositeImage(null);
  };
  const handleCustomBgUpload = (file: File) => setCustomBgFile(URL.createObjectURL(file));
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleUpload(file); };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true);
    try {
      // @ts-ignore
      const { removeBackground } = await import("@imgly/background-removal");
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File);
      const cutoutUrl = URL.createObjectURL(blob);
      setCutoutImage(cutoutUrl); setAfterImage(cutoutUrl); setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => {
    const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click();
  };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";
  const currentAfterText = isBgRemoved ? toolStatus[activeTool]?.after || "BG Removed" : "Original";

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    return (
      <div className="space-y-3">
        <div className="flex gap-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full p-1">
          <button onClick={()=>setBgMode("solid")} className={`flex-1 py-2 rounded-full text-xs font-bold ${bgMode==="solid" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/50"}`}>Solid</button>
          <button onClick={()=>setBgMode("gradient")} className={`flex-1 py-2 rounded-full text-xs font-bold ${bgMode==="gradient" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/50"}`}>Gradient</button>
        </div>

        <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3">
          {bgMode==="solid" ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#E8DCC6]/60">Background Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/20" style={{background: bgColor}} />
                  <span className="text-[11px] font-mono">{bgColor}</span>
                </div>
              </div>
              <div className="h-[28px] rounded-full border border-[#D4A574]/20" style={{background: "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}} onClick={(e)=>{const rect=e.currentTarget.getBoundingClientRect(); const p=(e.clientX-rect.left)/rect.width; const hues=["#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"]; updateFromHex(hues[Math.floor(p*6)]||"#e69f50");}} />
              <div className="mt-3">
                <div className="h-[10px] rounded-full border border-[#D4A574]/20" style={{background: `linear-gradient(to right, #000, ${bgColor}, #fff)`}} />
                <input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] h-[4px]" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs font-mono" />
                <div className="flex gap-1">{["#e69f50","#ffffff","#000000","#59F7FF"].map(c=> <button key={c} onClick={()=>updateFromHex(c)} className="flex-1 rounded-lg border border-white/10" style={{background:c}} />)}</div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="flex gap-1 items-center"><input value={red} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setRed(v); setBgColor(`#${v.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">R</span></div>
                <div className="flex gap-1 items-center"><input value={green} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setGreen(v); setBgColor(`#${red.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">G</span></div>
                <div className="flex gap-1 items-center"><input value={blue} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setBlue(v); setBgColor(`#${red.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">B</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2"><span className="text-[11px] text-[#E8DCC6]/60">Gradient Background</span><div className="flex gap-1"><div className="w-5 h-5 rounded-full border border-white/20" style={{background: gradientColor1}} /><div className="w-5 h-5 rounded-full border border-white/20" style={{background: gradientColor2}} /></div></div>
              <div className="h-[28px] rounded-full border border-[#D4A574]/20" style={{background: `linear-gradient(90deg, ${gradientColor1}, ${gradientColor2})`}} />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-2 py-2"><input type="color" value={gradientColor1} onChange={e=>setGradientColor1(e.target.value)} className="w-6 h-6 bg-transparent" /><span className="text-[10px] font-mono">{gradientColor1}</span></div>
                <div className="flex items-center gap-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-2 py-2"><input type="color" value={gradientColor2} onChange={e=>setGradientColor2(e.target.value)} className="w-6 h-6 bg-transparent" /><span className="text-[10px] font-mono">{gradientColor2}</span></div>
              </div>
            </>
          )}
        </div>

        <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2"><span className="text-[11px] text-[#E8DCC6]/60">Upload Background</span>{customBgFile && <span className="text-[10px] text-[#e69f50]">Loaded</span>}</div>
          <div onClick={()=>customBgInputRef.current?.click()} className="border-2 border-dashed border-[#D4A574]/30 rounded-xl p-3 text-center bg-[#0F0F0F] cursor-pointer h-[70px] flex items-center justify-center">
            {customBgFile ? <img src={customBgFile} className="w-full h-[50px] object-cover rounded-lg" alt="custom bg" /> : <p className="text-[11px] text-[#E8DCC6]/50">Click to upload custom BG</p>}
          </div>
          <input ref={customBgInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleCustomBgUpload(e.target.files[0])} />
          {customBgFile && <button onClick={()=>setCustomBgFile(null)} className="w-full mt-2 text-[11px] bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full py-1.5">Clear BG</button>}
        </div>

        <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option><option>Custom Backgrounds</option></select></div>
        <div className={baseCard}><span className="text-[#E8DCC6]/50">Mode</span><div className="mt-1 text-white">Custom Backgrounds • {bgMode} • AI Remove</div></div>
        <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50]" /></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3 overflow-hidden">
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <img src="/Logo-White.png" alt="VISFORA Logo" className="h-11 w-auto object-contain" />
            <span className="text-[26px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> - Photo Studio</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {HEADER_TABS.map((tab) => (
              <div key={tab.name} className="relative" onMouseEnter={() => setHoveredHeaderTab(tab.name)} onMouseLeave={() => setHoveredHeaderTab(null)}>
                <button onClick={() => setActiveHeaderTab(tab.name)} className={`px-4 py-2 rounded-full text-[14px] cursor-pointer ${activeHeaderTab===tab.name ? "border border-[#e69f50] text-white bg-white/[0.06]" : "border border-transparent text-[#E8DCC6]/60 hover:text-white"}`}>{tab.name}</button>
                {hoveredHeaderTab===tab.name && (
                  <div className="absolute left-0 top-[44px] w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl z-50 p-2">
                    {tab.items.map((item) => (
                      <button key={item.label} onClick={() => handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1F1F1F] cursor-pointer"><div className="text-[13px] text-white">{item.label}</div><div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div></button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2"><button className="w-11 h-11 flex items-center justify-center text-[20px] rounded-xl hover:bg-white/10">🔔</button><button className="w-11 h-11 rounded-full bg-[#e69f50] text-black font-medium">U</button></div>
      </header>

      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3 shrink-0">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm min-w-[200px]" value={prompt} onChange={e=>{setPrompt(e.target.value); const c=chips.find(x=>x.chip===e.target.value); if(c){setBgStyle(c.bg); setActiveTool(c.tool);}}}>
          <option value="">Select chip...</option>
          {chips.map(c=><option key={c.chip} value={c.chip}>{c.chip}</option>)}
        </select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><span>✨</span><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your edit e.g. minimal low poly fox" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>Generate</button>
      </div>

      {/* ✅ GRID LOCKED - EXPANDED TO FOOTER */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-stretch min-h-0">
        <div className="flex flex-col gap-3 h-full min-h-0">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">{activeHeaderTab.toUpperCase()}</span>
            <div className="space-y-2 mt-4">
              {dynamicTools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50]" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10"}`}>
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
            <button onClick={handleProcess} className={`w-full mt-4 h-[44px] text-[13px] ${ctaClass}`}>Run {activeToolLabel}</button>
          </div>
          {/* ✅ LEFT REDUCED & LOCKED */}
          <div className="border border-[#D4A574]/30 rounded-2xl p-3 bg-[#141414] flex flex-col h-[304px] min-h-[304px] max-h-[304px] shrink-0 overflow-hidden">
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} onClick={()=>fileInputRef.current?.click()} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl text-center bg-[#0F0F0F]/50 flex flex-col items-center justify-center h-[220px] min-h-[220px] max-h-[220px] w-full shrink-0 cursor-pointer">
              <p className="text-[13px] font-medium">Drag & drop image here</p>
              <p className="text-[11px] text-[#E8DCC6]/50 mt-1">or click to browse • PNG, JPG</p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-3 h-[44px] min-h-[44px] max-h-[44px] text-[13px] shrink-0 ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* ✅ CENTER EXPANDED TO FOOTER EDGE - LOCKED */}
        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-[calc(100vh-188px)] min-h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] self-stretch">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between shrink-0">
            <h3 className="text-[#E8DCC6] font-medium">3D Model Viewer</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1">
                <span className="text-[10px] text-[#E8DCC6]/70">Background Removal</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 cursor-pointer flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A]"}`}>
                  <span className={`absolute text-[10px] font-bold ${isBgRemoved ? "left-2.5 text-black" : "right-2.5 text-[#E8DCC6]/50"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                  <div className={`w-5 h-5 rounded-full shadow-md transition-all z-10 ${isBgRemoved ? "translate-x-[36px] bg-black" : "translate-x-0 bg-[#E8DCC6]"}`} />
                </button>
              </div>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">Reset View</button>
            </div>
          </div>
          <div className="flex-1 relative bg-[#0F0F0F] flex min-h-0 overflow-hidden">
            <div className="flex-1 relative">
              <div className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">BEFORE</div>
              {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-cover absolute inset-0" alt="sneaker" />}
            </div>
            <div className="flex-1 relative border-l border-[#D4A574]/20">
              <div className="absolute top-3 right-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">AFTER</div>
              <canvas ref={canvasRef} hidden />
              <div className="absolute inset-0 bg-[#1A1A1A]" style={isBgRemoved ? {backgroundImage: `linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)`, backgroundSize: '20px 20px'} : {}} />
              {isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing...</div> : afterImage && isBgRemoved ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-sm z-10">No preview yet</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white">{fileName} • {currentAfterText}</span>
                <span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-[#e69f50]/30 text-[#e69f50]">2048x2048</span>
              </div>
            </div>
          </div>
          <div className="p-2 text-center text-xs text-[#E8DCC6]/40 border-t border-[#D4A574]/20 shrink-0">Model: {fileName} • {bgMode} • Ready</div>
        </div>

        <div className="flex flex-col gap-3 h-full min-h-0">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">PROPERTIES</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            <div className="mt-2">{renderRightDynamicContent()}</div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col min-h-0">
            <h4 className="text-sm font-medium mb-3">EXPORT & VIEW</h4>
            <div className="space-y-4 flex-1">
              <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
              <div><label className="text-xs text-[#E8DCC6]/70">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
              <div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">Size</span><div>2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">DPI</span><div>300 DPI</div></div></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>

      <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] p-3 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0 mt-0">
        <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span><span>AI generating {isProcessing?"62%":"Ready"}</span><div className="w-32 h-2 bg-[#1F1F1F] rounded-full"><div className={`h-2 bg-[#e69f50] rounded-full ${isProcessing?"w-[62%]":"w-full"}`}></div></div></div>
        <div className="flex items-center gap-6"><span>Completed today 14</span><span>Credits remaining 187</span></div>
      </div>
    </div>
  );
}