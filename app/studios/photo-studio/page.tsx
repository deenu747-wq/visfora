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

  // --- ADDED ONLY FOR COLOR - NO OLD CODE REMOVED ---
  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [red, setRed] = useState(230);
  const [green, setGreen] = useState(159);
  const [blue, setBlue] = useState(80);
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
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); setAfterImage(url);
  }, [cutoutImage, bgColor, exportFormat, exportQuality]);

  useEffect(() => { if(cutoutImage) updateComposite(); }, [updateComposite, cutoutImage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) { setActiveDropdown(null); setHoveredHeaderTab(null); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeaderItemClick = (tabName: string, item: TabAction) => {
    setActiveHeaderTab(tabName);
    setHoveredHeaderTab(null);
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
      const cutoutUrl = URL.createObjectURL(blob);
      setCutoutImage(cutoutUrl);
      setAfterImage(cutoutUrl);
      setIsBgRemoved(true);
    } catch (err: any) { alert("Error: " + err.message); }
    setIsProcessing(false);
  };
  const handleExport = () => {
    const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click();
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

  // RIGHT DYNAMIC RENDERER - RESTORED + ADDED COLOR WITHOUT WHITE BG
  const renderRightDynamicContent = () => {
    const baseCard = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    switch(activeTool) {
      case "custom-bg":
        return (
          <div className="space-y-3">
            {/* --- COLOR TOOL - NO WHITE BG, HORIZONTAL STRIPE --- */}
            <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#E8DCC6]/60">Background Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/20" style={{background: bgColor}} />
                  <span className="text-[11px] font-mono">{bgColor}</span>
                </div>
              </div>
              {/* Horizontal Rainbow Stripe */}
              <div className="h-[28px] rounded-full border border-[#D4A574]/20 relative cursor-pointer overflow-hidden" 
                style={{background: "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}} 
                onClick={(e)=>{
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left)/rect.width;
                  const hues = ["#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"];
                  const idx = Math.floor(percent*7);
                  updateFromHex(hues[idx] || "#e69f50");
                }}
              />
              {/* Horizontal Brightness Stripe + Slider */}
              <div className="mt-3">
                <div className="h-[10px] rounded-full border border-[#D4A574]/20" style={{background: `linear-gradient(to right, #000, ${bgColor}, #fff)`}} />
                <input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer h-[4px]" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs font-mono" placeholder="#e69f50" />
                <div className="flex gap-1">
                  {["#e69f50","#ffffff","#000000","#59F7FF"].map(c=> <button key={c} onClick={()=>updateFromHex(c)} className="flex-1 rounded-lg border border-white/10" style={{background:c}} />)}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="flex gap-1 items-center"><input value={red} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setRed(v); const hex=`#${v.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`; setBgColor(hex);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">R</span></div>
                <div className="flex gap-1 items-center"><input value={green} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setGreen(v); const hex=`#${red.toString(16).padStart(2,"0")}${v.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`; setBgColor(hex);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">G</span></div>
                <div className="flex gap-1 items-center"><input value={blue} onChange={e=>{const v=Math.min(255,Math.max(0,Number(e.target.value)||0)); setBlue(v); const hex=`#${red.toString(16).padStart(2,"0")}${green.toString(16).padStart(2,"0")}${blue.toString(16).padStart(2,"0")}`; setBgColor(hex);}} className="w-full bg-[#0F0F0F] border border-[#D4A574]/20 rounded-lg px-2 py-1.5 text-xs" /><span className="text-[9px] text-[#E8DCC6]/40">B</span></div>
              </div>
            </div>

            {/* OLD CODE RESTORED BELOW */}
            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs cursor-pointer h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option><option>Custom Upload BG</option></select></div>
            <div className={baseCard}><span className="text-[#E8DCC6]/50">Mode</span><div className="mt-1 text-white">Custom Background • AI Remove</div></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer" /></div>
          </div>
        );
      case "custom-upload":
        return (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-[#D4A574]/30 rounded-xl p-6 text-center bg-[#0F0F0F]"><p className="text-sm">Upload Custom BG</p><p className="text-[11px] text-[#E8DCC6]/40 mt-1">PNG, JPG up to 10MB</p><button onClick={()=>fileInputRef.current?.click()} className="mt-3 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full px-4 py-1.5 text-xs">Choose File</button></div>
            <div className={baseCard}><span className="text-[#E8DCC6]/50">Placement</span><div className="flex gap-2 mt-2"><select className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-xs"><option>Cover</option><option>Contain</option></select><select className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-xs"><option>Center</option><option>Top</option></select></div></div>
          </div>
        );
      case "ai-bg":
      case "luxury-gold":
      case "preset-bg":
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70">AI Background</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs cursor-pointer h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div className="grid grid-cols-2 gap-2">{["Gold", "Marble", "Black", "Concrete"].map(p=> <button key={p} onClick={()=>setBgStyle(p)} className={`h-[48px] rounded-xl border text-xs ${bgStyle.includes(p) ? "bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]" : "bg-[#1F1F1F] border-[#D4A574]/10"}`}>{p}</button>)}</div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Lighting Direction <span>{lighting}</span></label><select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Top-Right</option><option>Top-Left</option><option>Center</option><option>Soft Box</option></select></div>
          </div>
        );
      case "enhance":
      case "upscale":
        return (
          <div className="space-y-3">
            <div className={baseCard}><span className="text-[#E8DCC6]/50">Auto Enhance</span><div className="mt-1">Brightness, Contrast, Sharpness auto</div></div>
            <div className="grid grid-cols-2 gap-2"><div className={baseCard}>Upscale: 2x / 4x</div><div className={baseCard}>Denoise: ON</div></div>
          </div>
        );
      case "recolor":
        return (
          <div className="space-y-3">
            <div className={baseCard}>Pick Product Color<input type="color" className="w-full h-[40px] mt-2 rounded-xl cursor-pointer bg-transparent" /></div>
            <div className={baseCard}>Preserve Shadows: ON</div>
          </div>
        );
      case "shadow":
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50]" /></div>
            <div><label className="text-xs text-[#E8DCC6]/70">Direction</label><select className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Bottom</option><option>Bottom Right</option><option>Floating</option></select></div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <div><label className="text-xs text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={e=>setBgStyle(e.target.value)} className="w-full mt-1 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs cursor-pointer h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option></select></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Shadow Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
            <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50]" /></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col p-3 gap-3">
      <header ref={headerRef} className="border border-[#D4A574]/30 rounded-2xl px-7 py-4 flex items-center justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
  {/* Logo ONLY - homepage link */}
  <Link href="/" className="flex items-center cursor-pointer">
    <img src="/Logo-White.png" alt="VISFORA Logo" className="h-11 w-auto object-contain" />
  </Link>

  {/* Text - NOT linked */}
  <span className="text-[26px] tracking-[0.18em] font-light text-white leading-none select-none">
    VIS<span className="font-semibold text-[#d6a85a]">FORA</span> -Photo Studio
  </span>
</div>
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
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10"><div className="flex gap-3"><span className="text-yellow-400">⚠️</span><div><p className="text-sm text-white">Credits running low</p><p className="text-xs text-[#E8DCC6]/50 mt-1">12 credits left • 1 hour ago</p></div></div></div>
                  <div className="p-3 rounded-xl bg-[#1F1F1F] border border-[#D4A574]/10"><div className="flex gap-3"><span className="text-green-400">✅</span><div><p className="text-sm text-white">Export WEBP ready</p><p className="text-xs text-[#E8DCC6]/50 mt-1">2048x2048 • 3 hours ago</p></div></div></div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")} className={`w-11 h-11 rounded-full flex items-center justify-center font-medium cursor-pointer border-2 transition text-[15px] ${activeDropdown === "profile" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#e69f50] border-[#e69f50]/50 text-black hover:border-[#e69f50]"}`}>U</button>
            {activeDropdown === "profile" && (
              <div className="absolute right-0 top-12 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                <div className="p-4 border-b border-[#D4A574]/20 flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-[#e69f50] flex items-center justify-center text-black font-bold">AK</div><div><p className="text-sm font-medium text-white">Ankit Kumar</p><p className="text-xs text-[#E8DCC6]/50">ankit@visfora.com</p></div></div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer">My Profile</button>
                  <button className="w-full text-left px-3 py-2.5 rounded-xl text-sm hover:bg-[#1F1F1F] flex items-center gap-3 cursor-pointer">Billing & Credits</button>
                </div>
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

      {/* FIXED GRID - IMAGE AREA FIXED 640px */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-start">
        <div className="flex flex-col gap-3 h-full">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">{activeHeaderTab.toUpperCase()}</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">dynamic change</span>
            <div className="space-y-2 mt-4">
              {dynamicTools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold backdrop-blur-[2px]" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}>
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

        {/* CENTER - FIXED SIZE */}
        <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-[640px] min-h-[640px] max-h-[640px]">
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

        <div className="flex flex-col gap-3 h-full">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414]">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold tracking-wide">PROPERTIES</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">{activeToolLabel} • dynamic</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            <div className="mt-2">
              {renderRightDynamicContent()}
            </div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col">
            <h4 className="text-sm font-medium mb-3">EXPORT & VIEW</h4>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
                <select className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
              </div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full mt-1 accent-[#e69f50] cursor-pointer" /></div>
              <div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">Size</span><div>2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">DPI</span><div>300 DPI</div></div></div>
              <div className="flex gap-2 text-[11px]"><span className="bg-[#e69f50] text-black px-2 py-1 rounded-full">Include Textures</span><span className="bg-[#1F1F1F] border border-[#D4A574]/20 px-2 py-1 rounded-full">Compressed</span></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>

      <div className="border border-[#D4A574]/30 rounded-2xl bg-[#141414] p-3 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3"><span className="flex gap-1"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span><span className="w-2 h-2 bg-[#e69f50]/50 rounded-full"></span></span><span>AI generating {isProcessing?"62%":"Ready"}</span><div className="w-32 h-2 bg-[#1F1F1F] rounded-full"><div className={`h-2 bg-[#e69f50] rounded-full ${isProcessing?"w-[62%]":"w-full"}`}></div></div><span>Estimated {isProcessing?"18s remaining":"0s"}</span></div>
        <div className="flex items-center gap-6"><span>Completed today 14</span><span>Avg processing 22s</span><span className="flex items-center gap-2">Credits remaining 187</span></div>
      </div>
    </div>
  );
}