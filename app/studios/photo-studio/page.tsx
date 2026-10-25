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
  const [shadowIntensity, setShadowIntensity] = useState(73);
  const [bgStyle, setBgStyle] = useState("Luxury Marble • Gold");
  const [lighting, setLighting] = useState("Top-Right");
  const [activeTool, setActiveTool] = useState("custom-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<null | "notif" | "profile">(null);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Dashboard");
  const [hoveredHeaderTab, setHoveredHeaderTab] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [bgColor, setBgColor] = useState("#ff9900");
  const [bgColorInput, setBgColorInput] = useState("#ff9900");
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(153);
  const [blue, setBlue] = useState(0);
  const [bgMode, setBgMode] = useState<"solid" | "gradient">("solid");
  const [gradientColor1, setGradientColor1] = useState("#ff9900");
  const [gradientColor2, setGradientColor2] = useState("#000000");
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const HEADER_TABS: HeaderTab[] = [
    { name: "Dashboard", path: "#dashboard", items: [ { label: "Overview", desc: "Edits today & credits" }, { label: "Recent Projects", desc: "Last 10 files", tool: "custom-bg" }, { label: "Quick Upload", desc: "Start new edit" }, ] },
    { name: "Studio", path: "#studio", items: [ { label: "Custom Background", desc: "Remove & replace BG", tool: "custom-bg" }, { label: "Enhance", desc: "Auto enhance image", tool: "enhance" }, { label: "AI Backgrounds", desc: "Premium studio BG", tool: "ai-bg", bg: "Luxury Marble • Gold" }, ] },
    { name: "Backgrounds", path: "#backgrounds", items: [ { label: "Custom Background", desc: "Your main BG tool", tool: "custom-bg" }, { label: "Custom Upload BG", desc: "Upload your own BG", tool: "custom-upload" }, { label: "Luxury Marble • Gold", desc: "Best seller", tool: "ai-bg", bg: "Luxury Marble • Gold", prompt: "Luxury gold studio" }, ] },
    { name: "Enhance", path: "#enhance", items: [ { label: "Auto Enhance", desc: "One-click fix", tool: "enhance" }, ] },
    { name: "Batch", path: "#batch", items: [ { label: "Bulk Upload (100)", desc: "Process 10-100 images", badge: "PRO" }, ] },
    { name: "Export", path: "#export", items: [ { label: "Recent Exports", desc: "Last 20 files" }, ] },
  ];

  const ALL_TOOLS_MAP: Record<string, { id: string; label: string; icon: string }[]> = {
    Dashboard: [ { id: "custom-bg", label: "Custom Background", icon: "🎀" }, { id: "ai-bg", label: "AI Backgrounds", icon: "🏜️" }, { id: "enhance", label: "Enhance", icon: "✨" }, ],
    Studio: [ { id: "custom-bg", label: "Custom Background", icon: "🎀" }, { id: "enhance", label: "Enhance", icon: "✨" }, ],
    Backgrounds: [ { id: "custom-bg", label: "Custom Background", icon: "🖼️" }, { id: "preset-bg", label: "Preset Backgrounds", icon: "🏜️" }, ],
    Enhance: [ { id: "enhance", label: "Auto Enhance", icon: "✨" }, ],
    Batch: [ { id: "bulk-upload", label: "Bulk Upload", icon: "📦" }, ],
    Export: [ { id: "png-export", label: "PNG / JPG / WEBP", icon: "⬇️" }, ],
  };

  const dynamicTools = ALL_TOOLS_MAP[activeHeaderTab] || ALL_TOOLS_MAP["Dashboard"];
  const activeToolLabel = dynamicTools.find(t=>t.id===activeTool)?.label || activeTool;
  const toolStatus: Record<string, { after: string }> = {
    "custom-bg": { after: "Custom BG" }, "remove-bg": { after: "BG Removed" }, "enhance": { after: "Enhanced" },
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
    if(bgMode==="solid"){ ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvas.width,canvas.height); }
    else { const grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height); grad.addColorStop(0,gradientColor1); grad.addColorStop(1,gradientColor2); ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height); }
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); setAfterImage(url);
  }, [cutoutImage, bgColor, bgMode, gradientColor1, gradientColor2, exportFormat, exportQuality]);

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
  const handleExport = () => { const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click(); };

  const chips = [
    { chip: "Luxury gold studio" }, { chip: "Minimal marble" }, { chip: "Dark moody" },
  ];

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";
  const currentAfterText = toolStatus[activeTool]?.after || "Custom BG";

  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    return (
      <div className="space-y-3">
        {/* ③ AUTO ADJUST TABS LIKE SOLID/GRADIENT */}
        <div className="flex gap-2 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full p-1">
          <button onClick={()=>setBgMode("solid")} className={`flex-1 py-2 rounded-full text-xs font-medium transition ${bgMode==="solid" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/50 hover:text-white"}`}>Solid</button>
          <button onClick={()=>setBgMode("gradient")} className={`flex-1 py-2 rounded-full text-xs font-medium transition ${bgMode==="gradient" ? "bg-[#e69f50] text-black" : "text-[#E8DCC6]/50 hover:text-white"}`}>Gradient</button>
        </div>

        <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#E8DCC6]/60">Background Color</span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-white/20" style={{background: bgMode==="solid" ? bgColor : gradientColor1}} />
              <span className="text-[11px] font-mono text-[#e69f50]">{bgMode==="solid" ? bgColorInput : `${gradientColor1} → ${gradientColor2}`}</span>
            </div>
          </div>

          {bgMode==="solid" ? (
            <>
              <div className="h-[28px] rounded-full border border-[#D4A574]/20 overflow-hidden cursor-pointer" style={{background: "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}} onClick={(e)=>{const r=e.currentTarget.getBoundingClientRect(); const p=(e.clientX-r.left)/r.width; const h=Math.round(p*360); const c=document.createElement("canvas").getContext("2d")!; c.fillStyle=`hsl(${h},100%,50%)`; updateFromHex(c.fillStyle);}} />
              <div className="mt-3 h-[10px] rounded-full border border-[#D4A574]/20" style={{background: `linear-gradient(to right, #000, ${bgColor}, #fff)`}} />
              <input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer h-[4px]" />
            </>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl p-2 flex items-center gap-2"><input type="color" value={gradientColor1} onChange={e=>setGradientColor1(e.target.value)} className="w-6 h-6 bg-transparent border-0" /><span className="text-[11px] font-mono">{gradientColor1}</span></div>
                <div className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl p-2 flex items-center gap-2"><input type="color" value={gradientColor2} onChange={e=>setGradientColor2(e.target.value)} className="w-6 h-6 bg-transparent border-0" /><span className="text-[11px] font-mono">{gradientColor2}</span></div>
              </div>
              <div className="h-[32px] rounded-xl border border-[#D4A574]/20" style={{background: `linear-gradient(90deg, ${gradientColor1}, ${gradientColor2})`}} />
            </div>
          )}

          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs font-mono" placeholder="#ff9900" />
            <div className="flex gap-1.5">
              {["#ff9900","#ffffff","#000000","#59F7FF"].map(c=> <button key={c} onClick={()=>{updateFromHex(c); if(bgMode==="gradient") setGradientColor1(c);}} className="w-7 h-7 rounded-lg border border-white/10" style={{background:c}} />)}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="flex items-center gap-1"><input value={red} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setRed(v); setBgColor(`#${v.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">R</span></div>
            <div className="flex items-center gap-1"><input value={green} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setGreen(v); setBgColor(`#${red.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">G</span></div>
            <div className="flex items-center gap-1"><input value={blue} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setBlue(v); setBgColor(`#${red.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}`);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">B</span></div>
          </div>
        </div>

        <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
        <div className={baseCard}><span className="text-[#E8DCC6]/50">Mode</span><div className="mt-1 text-white">Custom Background • AI Remove</div></div>
        <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer" /></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/Logo-White.png" alt="VISFORA Logo" className="h-11 w-auto object-contain" />
            {/* ① RENAME Studio -> - Photo Studio */}
            <span className="text-[26px] tracking-[0.18em] font-light text-white leading-none">VIS<span className="font-semibold text-[#d6a85a]">FORA</span> <span className="font-light text-[#E8DCC6]/80">- Photo Studio</span></span>
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
                    <div className="absolute left-0 top-[44px] min-w-[240px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 p-2">
                      {tab.items.map((item) => (
                        <button key={item.label} onClick={() => handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1F1F1F] cursor-pointer">
                          <div className="text-[13px] text-white">{item.label}</div><div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-11 h-11 flex items-center justify-center text-[20px]">🔔</button>
          <button className="w-11 h-11 rounded-full bg-[#e69f50] text-black">U</button>
        </div>
      </header>

      <div className="border border-[#D4A574]/20 rounded-2xl bg-[#141414] p-3 flex items-center gap-3">
        <span className="text-sm text-[#E8DCC6]/70">Generation Mode:</span>
        <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-sm min-w-[200px]" value={prompt} onChange={e=>setPrompt(e.target.value)}>
          <option value="">Select chip...</option>
          {chips.map(c=><option key={c.chip} value={c.chip}>{c.chip}</option>)}
        </select>
        <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-2.5"><span>✨</span><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe your edit" className="flex-1 bg-transparent outline-none text-sm" /></div>
        <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-2.5 text-sm ${ctaClass}`}>Generate</button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-3 items-start">
        <div className="flex flex-col gap-3">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
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
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex flex-col">
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl p-6 text-center bg-[#0F0F0F]/50">
              <p className="text-sm mt-2">Drag & drop image here</p>
              <p className="text-xs text-[#E8DCC6]/50 mt-1">or click to browse • PNG, JPG</p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        {/* ② + ③ CANVA + AUTO ADJUST */}
        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-auto min-h-[640px]">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between">
            <h3 className="text-[#E8DCC6] font-medium">Canva</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1F1F1F] border border-[#D4A574]/30 rounded-full pl-3 pr-1 py-1">
                <span className="text-[10px] text-[#E8DCC6]/70">Background Removal</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A] border border-[#D4A574]/20"}`}>
                  <span className={`absolute text-[10px] font-bold ${isBgRemoved ? "left-2.5 text-black" : "right-2.5 text-[#E8DCC6]/50"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                  <div className={`w-5 h-5 rounded-full shadow-md transition-all z-10 ${isBgRemoved ? "translate-x-[36px] bg-black" : "translate-x-0 bg-[#E8DCC6]"}`} />
                </button>
              </div>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">Reset View</button>
              <button className="px-3 py-1 rounded-full text-xs bg-[#1F1F1F] border border-[#D4A574]/20">Fullscreen</button>
            </div>
          </div>
          <div className="flex-1 relative bg-[#0F0F0F] flex min-h-[560px]">
            <div className="flex-1 relative">
              <div className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">BEFORE</div>
              {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-cover absolute inset-0" alt="sneaker" />}
            </div>
            <div className="flex-1 relative border-l border-[#D4A574]/20">
              <div className="absolute top-3 right-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">AFTER</div>
              <canvas ref={canvasRef} hidden />
              <div className="absolute inset-0 bg-[#1A1A1A]" />
              {isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing...</div> : (compositeImage || afterImage) && isBgRemoved ? <img src={compositeImage || afterImage!} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12" alt="after" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-sm z-10">No preview yet</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white flex gap-1.5"><span className="truncate max-w-[100px]">{fileName}</span><span className="text-[#e69f50]">• {currentAfterText}</span></span>
              </div>
            </div>
          </div>
          <div className="p-2 text-center text-xs text-[#E8DCC6]/40 border-t border-[#D4A574]/20">Model: {fileName} • Canva Ready • Auto Adjusted</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">PROPERTIES</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">Custom Background • dynamic</span>
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