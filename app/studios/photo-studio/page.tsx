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
  const [activeTool, setActiveTool] = useState("remove-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(true);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Backgrounds");
  const [hoveredHeaderTab, setHoveredHeaderTab] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customBgInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Engine States
  const [bgColor, setBgColor] = useState("#e69f50");
  const [bgColorInput, setBgColorInput] = useState("#e69f50");
  const [red, setRed] = useState(230); const [green, setGreen] = useState(159); const [blue, setBlue] = useState(80);
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const [prevBgColor, setPrevBgColor] = useState("#e69f50");
  const [prevComposite, setPrevComposite] = useState<string | null>(null);
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);
  const [placement, setPlacement] = useState("Cover");
  const [position, setPosition] = useState("Center");
  const [brushSize, setBrushSize] = useState(24);
  const [feather, setFeather] = useState(20);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
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
    if (!cutoutImage || !canvasRef.current) { if(uploadedImage && !isBgRemoved) { setAfterImage(uploadedImage); } return; }
    const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = cutoutImage; await new Promise(r => img.onload = r);
    canvas.width = img.width; canvas.height = img.height;
    if (customBgUrl) {
      const bgImg = new Image(); bgImg.crossOrigin="anonymous"; bgImg.src=customBgUrl; await new Promise(r => bgImg.onload=r);
      if(placement==="Cover") ctx.drawImage(bgImg,0,0,canvas.width,canvas.height);
      else { ctx.fillStyle=bgColor; ctx.fillRect(0,0,canvas.width,canvas.height); const scale=Math.min(canvas.width/bgImg.width, canvas.height/bgImg.height); const w=bgImg.width*scale, h=bgImg.height*scale; ctx.drawImage(bgImg,(canvas.width-w)/2,(canvas.height-h)/2,w,h); }
    } else { ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvas.width,canvas.height); }
    ctx.globalAlpha = shadowIntensity/100; ctx.drawImage(img,0,0,canvas.width,canvas.height); ctx.globalAlpha=1;
    const url = canvas.toDataURL(`image/${exportFormat.toLowerCase()}`, exportQuality/100);
    setCompositeImage(url); setAfterImage(url);
  }, [cutoutImage, bgColor, exportFormat, exportQuality, customBgUrl, placement, shadowIntensity, uploadedImage, isBgRemoved]);

  useEffect(() => { updateComposite(); }, [updateComposite]);
  useEffect(() => { const h=(e:MouseEvent)=>{ if(headerRef.current && !headerRef.current.contains(e.target as Node)){ setHoveredHeaderTab(null); } }; document.addEventListener("mousedown",h); return()=>document.removeEventListener("mousedown",h); }, []);
  const handleHeaderItemClick = (tabName: string, item: TabAction) => { setActiveHeaderTab(tabName); setHoveredHeaderTab(null); if (item.tool) setActiveTool(item.tool); if (item.bg) setBgStyle(item.bg); if (item.prompt) setPrompt(item.prompt); };
  const handleUpload = (file: File) => { const url = URL.createObjectURL(file); setUploadedImage(url); setUploadedFile(file); setFileName(file.name); setAfterImage(url); setCutoutImage(null); setCompositeImage(null); };
  const handleCustomBgUpload = (file: File) => { const url = URL.createObjectURL(file); setCustomBgUrl(url); setTimeout(()=>updateComposite(),100); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleUpload(file); };
  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) { alert("Please upload image first!"); return; }
    setIsProcessing(true); setPrevBgColor(bgColor); setPrevComposite(compositeImage || afterImage);
    try { // @ts-ignore
      const { removeBackground } = await import("@imgly/background-removal");
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName))) as File;
      const blob = await removeBackground(src as File); const cutoutUrl = URL.createObjectURL(blob);
      setCutoutImage(cutoutUrl); setIsBgRemoved(true); setTimeout(()=>updateComposite(),50);
    } catch (err: any) { alert("Error: " + err.message); } setIsProcessing(false);
  };
  const handleApply = async () => { setPrevBgColor(bgColor); setPrevComposite(compositeImage || afterImage); await updateComposite(); };
  const handleReset = () => { updateFromHex("#e69f50"); setBgStyle("Luxury Marble • Gold"); setShadowIntensity(70); setBrightness(100); setContrast(100); setPlacement("Cover"); setPosition("Center"); setCustomBgUrl(null); setTimeout(()=>updateComposite(),50); };
  const handleCancel = () => { updateFromHex(prevBgColor); if(prevComposite){ setCompositeImage(prevComposite); setAfterImage(prevComposite); } };
  const handleExport = () => { const link = document.createElement("a"); link.href = compositeImage || afterImage || uploadedImage!; link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`; link.click(); };

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";

  const renderRightDynamicContent = () => {
    const card = "bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs";
    // ACTIVE LOGIC FOR ALL TOOLS
    switch(activeTool) {
      case "remove-bg": return <div className="space-y-3"><div className={card}>✂️ AI cutout removes background. AFTER will show transparent + color.</div><button onClick={handleProcess} className={`w-full h-[44px] text-sm ${ctaClass}`}>{isProcessing?"Processing...":"Remove Background Now"}</button><button onClick={()=>setIsBgRemoved(!isBgRemoved)} className="w-full h-[36px] bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl text-xs">Toggle BG: {isBgRemoved?"ON":"OFF"}</button></div>;
      case "color-bg": return (
        <div className="space-y-3">
          <div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl p-3">
            <div className="flex justify-between mb-2"><span className="text-[11px] text-[#E8DCC6]/60">Background Color</span><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full border border-white/20" style={{background: bgColor}} /><span className="text-[11px] font-mono">{bgColor}</span></div></div>
            <div className="h-[28px] rounded-full border border-[#D4A574]/20 cursor-pointer" style={{background: "linear-gradient(to right, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}} onClick={(e)=>{ const r=e.currentTarget.getBoundingClientRect(); const p=(e.clientX-r.left)/r.width; const h=["#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"]; updateFromHex(h[Math.floor(p*7)]||"#e69f50"); }} />
            <div className="mt-3 grid grid-cols-2 gap-2"><input value={bgColorInput} onChange={e=>setBgColorInput(e.target.value)} onBlur={()=>updateFromHex(bgColorInput)} className="bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-3 py-2 text-xs font-mono" /><div className="flex gap-1">{["#e69f50","#ffffff","#000000","#111111"].map(c=> <button key={c} onClick={()=>updateFromHex(c)} className="flex-1 rounded-lg border border-white/10" style={{background:c}} />)}</div></div>
          </div>
          <div className={card}><span className="text-[#E8DCC6]/50">Placement</span><div className="flex gap-2 mt-2"><select value={placement} onChange={e=>{setPlacement(e.target.value); setTimeout(()=>updateComposite(),50);}} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-xs"><option>Cover</option><option>Contain</option></select><select value={position} onChange={e=>setPosition(e.target.value)} className="flex-1 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl py-2 px-2 text-xs"><option>Center</option><option>Top</option></select></div></div>
          <div className="grid grid-cols-3 gap-2"><button onClick={handleCancel} className="h-[40px] rounded-xl border border-[#D4A574]/20 bg-[#1F1F1F] text-xs hover:bg-[#2A2A2A]">Cancel</button><button onClick={handleReset} className="h-[40px] rounded-xl border border-[#D4A574]/20 bg-[#1F1F1F] text-xs hover:bg-[#2A2A2A]">Reset</button><button onClick={handleApply} className={`h-[40px] rounded-xl text-xs ${ctaClass}`}>Apply</button></div>
        </div>
      );
      case "ai-bgs": return <div className="space-y-3"><select value={bgStyle} onChange={e=>{setBgStyle(e.target.value); updateFromHex(e.target.value.includes("Gold")?"#e69f50":e.target.value.includes("Black")?"#111111":"#ffffff"); setTimeout(()=>updateComposite(),50);}} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select><div className="grid grid-cols-2 gap-2">{["Luxury Marble • Gold","White Infinity","Studio Black","Minimal Concrete"].map(p=> <button key={p} onClick={()=>{setBgStyle(p); updateFromHex(p==="Luxury Marble • Gold"?"#e69f50":p==="Studio Black"?"#111111":"#ffffff");}} className={`h-[44px] rounded-xl border text-[11px] ${bgStyle===p?"bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]":"bg-[#1F1F1F] border-[#D4A574]/10"}`}>{p}</button>)}</div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply AI BG</button></div>;
      case "custom-bg-upload": return <div className="space-y-3"><div className="border-2 border-dashed border-[#D4A574]/30 rounded-xl p-4 text-center bg-[#0F0F0F]"><p className="text-xs">Upload Custom BG</p>{customBgUrl?<img src={customBgUrl} className="w-full h-20 object-cover rounded-lg mt-2"/>:<p className="text-[10px] text-[#E8DCC6]/40 mt-1">PNG, JPG up to 10MB</p>}<button onClick={()=>customBgInputRef.current?.click()} className="mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-full px-4 py-1.5 text-[11px]">Choose File</button><input ref={customBgInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files&&handleCustomBgUpload(e.target.files[0])} /></div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply Custom BG</button></div>;
      case "relight": case "relight-studio": return <div className="space-y-3"><div className={card}>💡 Virtual lighting: {lighting} • Updates preview live</div><select value={lighting} onChange={e=>setLighting(e.target.value)} className="w-full bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs h-[48px]"><option>Top-Right</option><option>Top-Left</option><option>Center</option><option>Soft Box</option></select><div><label className="text-xs flex justify-between">Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>{setShadowIntensity(Number(e.target.value)); setTimeout(()=>updateComposite(),10);}} className="w-full accent-[#e69f50]" /></div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply Relight</button></div>;
      case "magic-eraser": case "generative-fill": case "object-removal": return <div className="space-y-3"><div className={card}>🪶 {activeToolLabel}: Brush size {brushSize}px, Feather {feather}px — Active</div><div><label className="text-xs flex justify-between">Brush <span>{brushSize}px</span></label><input type="range" min="5" max="100" value={brushSize} onChange={e=>setBrushSize(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><div><label className="text-xs flex justify-between">Feather <span>{feather}px</span></label><input type="range" min="0" max="50" value={feather} onChange={e=>setFeather(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><button onClick={()=>{setIsProcessing(true); setTimeout(()=>setIsProcessing(false),800);}} className={`w-full h-[44px] ${ctaClass}`}>Erase Selected</button></div>;
      case "ironing": return <div className="space-y-3"><div className={card}>👔 Ironing: Auto wrinkle removal active</div><div><label className="text-xs flex justify-between">Strength <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><button onClick={handleApply} className={`w-full h-[44px] ${ctaClass}`}>Smooth Wrinkles</button></div>;
      case "product-fixer": return <div className="space-y-3"><div className={card}>🔒 Fidelity Lock ACTIVE — Protecting logo/texture</div><div className="flex gap-2"><button onClick={()=>alert("Logo Lock ON")} className="flex-1 h-[40px] bg-[#e69f50]/20 border border-[#e69f50] rounded-xl text-xs text-[#e69f50]">Lock Logo ON</button><button onClick={()=>alert("Text Lock ON")} className="flex-1 h-[40px] bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl text-xs">Lock Text ON</button></div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Fix Product</button></div>;
      case "auto-enhance": case "color-light": return <div className="space-y-3"><div className={card}>⚡ Auto Enhance active — Brightness {brightness}% Contrast {contrast}%</div><div><label className="text-xs flex justify-between">Brightness <span>{brightness}%</span></label><input type="range" min="0" max="200" value={brightness} onChange={e=>setBrightness(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><div><label className="text-xs flex justify-between">Contrast <span>{contrast}%</span></label><input type="range" min="0" max="200" value={contrast} onChange={e=>setContrast(Number(e.target.value))} className="w-full accent-[#e69f50]" /></div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Enhance</button></div>;
      case "upscale-4k": return <div className="space-y-3"><div className={card}>🔍 Upscale 4K: HD up to 4x — Active</div><div className="grid grid-cols-3 gap-2">{["2x","4x","8x"].map(x=><button key={x} onClick={()=>alert(`Upscale ${x} started`)} className="h-[40px] bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl text-xs hover:border-[#e69f50] hover:text-[#e69f50]">{x}</button>)}</div><button className={`w-full h-[40px] ${ctaClass}`}>Upscale Now</button></div>;
      case "color-match": case "recolor-variants": return <div className="space-y-3"><div className={card}>🎯 {activeToolLabel} — Pick reference color</div><div className="flex gap-2">{["#e69f50","#ff0000","#00aaff","#111"].map(c=><button key={c} onClick={()=>updateFromHex(c)} className="w-10 h-10 rounded-full border border-white/20" style={{background:c}} />)}</div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply {activeToolLabel}</button></div>;
      case "ai-expand": return <div className="space-y-3"><div className={card}>↔️ AI Expand: Outpaint canvas</div><div className="grid grid-cols-2 gap-2">{["1.2x","1.5x","2x","Fill"].map(o=><button key={o} className="h-[36px] bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl text-xs">{o}</button>)}</div><button className={`w-full h-[40px] ${ctaClass}`}>Expand</button></div>;
      case "ai-shadows": return <div className="space-y-3"><div className="grid grid-cols-3 gap-2">{["Soft","Hard","None"].map(s=><button key={s} onClick={()=>setShadowIntensity(s==="None"?0:s==="Soft"?40:80)} className={`h-[40px] rounded-xl border text-xs ${shadowIntensity===0&&s==="None"?"bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]":shadowIntensity>60&&s==="Hard"?"bg-[#e69f50]/20 border-[#e69f50] text-[#e69f50]":"bg-[#1F1F1F] border-[#D4A574]/10"}`}>{s}</button>)}</div><div><label className="text-xs flex justify-between">Intensity <span>{shadowIntensity}%</span></label><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>{setShadowIntensity(Number(e.target.value)); setTimeout(()=>updateComposite(),10);}} className="w-full accent-[#e69f50]" /></div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply Shadow</button></div>;
      case "reflection": return <div className="space-y-3"><div className={card}>💧 Reflection opacity {shadowIntensity}%</div><input type="range" min="0" max="100" value={shadowIntensity} onChange={e=>setShadowIntensity(Number(e.target.value))} className="w-full accent-[#e69f50]" /><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Apply Reflection</button></div>;
      case "bulk-edit": case "apply-same": case "resize-market": case "bulk-color": case "bulk-zip": return <div className="space-y-3"><div className={card}>📦 {activeToolLabel} — Bulk action active</div><button onClick={()=>alert(`${activeToolLabel} started for 100 images`)} className={`w-full h-[44px] ${ctaClass}`}>{activeToolLabel}</button></div>;
      case "format": case "quality-dpi": case "brand-kit": case "text-overlay": case "video-export": return <div className="space-y-3"><div className={card}>⬇️ {activeToolLabel} active in Export panel below</div><button onClick={handleExport} className={`w-full h-[44px] ${ctaClass}`}>Export {exportFormat}</button></div>;
      default: return <div className="space-y-3"><div className={card}>{activeToolLabel} — Active tool. Right panel dynamic.</div><button onClick={handleApply} className={`w-full h-[40px] ${ctaClass}`}>Run {activeToolLabel}</button></div>;
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
              const isActive = activeHeaderTab === tab.name;
              const isHovered = hoveredHeaderTab === tab.name;
              return (
                <div key={tab.name} className="relative" onMouseEnter={() => setHoveredHeaderTab(tab.name)} onMouseLeave={() => setHoveredHeaderTab(null)}>
                  <button onClick={() => { setActiveHeaderTab(tab.name); const first = ALL_TOOLS_MAP[tab.name]?.[0]?.id; if(first) setActiveTool(first); }} className={`px-4 py-2 rounded-full transition cursor-pointer text-[14px] ${isActive ? "border border-[#e69f50] text-white font-medium bg-white/[0.06]" : "border border-transparent text-[#E8DCC6]/60 hover:text-white hover:bg-white/[0.04]"}`}>{tab.name}</button>
                  {isHovered && (
                    <div className="absolute left-0 top-[44px] w-auto min-w-[240px] max-w-[360px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 overflow-hidden p-2">
                      {tab.items.map((item) => (
                        <button key={item.label} onClick={() => handleHeaderItemClick(tab.name, item)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1F1F1F] cursor-pointer"><div><div className="text-[13px] text-white flex items-center gap-2">{item.label}{item.badge && <span className="text-[9px] bg-[#e69f50] text-black px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}</div><div className="text-[11px] text-[#E8DCC6]/40">{item.desc}</div></div></button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 items-start">
        <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">{activeHeaderTab.toUpperCase()}</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">all active</span>
            <div className="space-y-2 mt-4">
              {dynamicTools.map(tool => (
                <button key={tool.id} onClick={()=>setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool===tool.id ? "bg-[#e69f50]/20 text-[#e69f50] border-[#e69f50] font-semibold" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}>
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full mt-4 flex items-center justify-center gap-2 h-[44px] text-[13px] ${ctaClass}`}>Run {activeToolLabel}</button>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col shrink-0">
            <h4 className="text-[11px] font-bold tracking-wide text-[#e69f50] mb-3">UPLOAD • LOCKED</h4>
            <div onDragOver={e=>e.preventDefault()} onDrop={handleDrop} className="border-2 border-dashed border-[#e69f50]/70 rounded-xl p-6 text-center bg-[#0F0F0F]/50 flex-1 flex flex-col justify-center cursor-pointer" onClick={()=>fileInputRef.current?.click()}>
              <p className="text-sm">Drag & drop image here</p><p className="text-xs text-[#E8DCC6]/50 mt-1">PNG, JPG • Click to browse</p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} className={`w-full mt-4 h-[40px] text-[13px] ${ctaClass}`}>Upload Image</button>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e=>e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </div>

        <div className="shrink-0 border border-[#D4A574]/30 rounded-2xl bg-[#141414] flex flex-col overflow-hidden w-full h-[640px] min-h-[640px] max-h-[640px]">
          <div className="p-3 border-b border-[#D4A574]/20 flex items-center justify-between shrink-0">
            <h3 className="text-[#E8DCC6] font-medium flex items-center gap-2"><span className="w-2 h-2 bg-[#e69f50] rounded-full animate-pulse"></span>Studio Canvas</h3>
            <div className="flex items-center gap-2.5">
              <button onClick={handleReset} className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#1F1F1F] border border-[#D4A574]/30 hover:bg-[#e69f50]/15 hover:text-[#e69f50] text-[#E8DCC6]/70 cursor-pointer">↺</button>
              <div className="flex items-center gap-2.5 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full pl-3.5 pr-1.5 py-1.5">
                <span className="text-[11px] text-[#E8DCC6]/80">BG Remove</span>
                <button onClick={()=>setIsBgRemoved(!isBgRemoved)} className={`relative w-[68px] h-[28px] rounded-full p-[3px] transition-all cursor-pointer ${isBgRemoved ? "bg-gradient-to-r from-[#e69f50] to-[#d48e40]" : "bg-[#1F1F1F] border border-white/10"}`}>
                  <div className={`w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center text-[10px] font-bold transition-all ${isBgRemoved ? "translate-x-[40px] text-black" : "translate-x-0"}`}>{isBgRemoved ? "✓" : "○"}</div>
                  <span className={`absolute text-[9px] font-black ${isBgRemoved ? "left-[10px] text-black/80" : "right-[10px] text-[#E8DCC6]/40"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative bg-[#0F0F0F] flex min-h-0">
            <div className="flex-1 relative"><div className="absolute top-3 left-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">BEFORE</div>{uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" alt="before" /> : <div className="absolute inset-0 bg-[#111]" />}</div>
            <div className="flex-1 relative border-l border-[#D4A574]/20">
              <div className="absolute top-3 right-3 z-10 text-[11px] font-bold tracking-[0.2em] text-[#e69f50] bg-black/60 px-3 py-1 rounded-full">AFTER • {activeToolLabel}</div>
              <canvas ref={canvasRef} hidden />
              <div className="absolute inset-0" style={{background: isBgRemoved ? bgColor : "#1A1A1A"}} />
              {isProcessing ? <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing {activeToolLabel}...</div> : afterImage ? <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12" alt="after" style={{filter: `brightness(${brightness}%) contrast(${contrast}%)`}} /> : uploadedImage ? <img src={uploadedImage} className="absolute inset-0 w-full h-full object-contain z-10 p-4 pb-12 opacity-60" alt="preview" /> : <div className="absolute inset-0 flex items-center justify-center text-[#E8DCC6]/20 text-sm z-10">Upload to see AFTER</div>}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white"><span className="truncate">{fileName}</span><span className="text-[#e69f50]"> • {activeToolLabel}</span></span>
                <div className="flex gap-1.5"><span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-white/10 text-white/70">{exportFormat}</span><span className="text-[9px] bg-black/80 px-2.5 py-1.5 rounded-full border border-[#e69f50]/30 text-[#e69f50]">2048x2048</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] shrink-0">
            <span className="text-[11px] bg-[#e69f50]/20 text-[#e69f50] px-3 py-1 rounded-full font-bold">PROPERTIES</span>
            <span className="text-[10px] ml-2 text-[#E8DCC6]/40">{activeToolLabel} • active</span>
            <h4 className="text-sm font-medium mt-3 mb-3">TOOLS / PROPERTIES</h4>
            <div className="mt-2">{renderRightDynamicContent()}</div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] flex-1 flex flex-col shrink-0">
            <h4 className="text-[11px] font-bold tracking-wide text-[#e69f50] mb-3">EXPORT • LOCKED</h4>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <select value={exportFormat} onChange={e=>setExportFormat(e.target.value)} className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl py-2.5 px-3 text-xs cursor-pointer h-[48px]"><option>PNG</option><option>JPG</option><option>WEBP</option></select>
                <div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 text-xs h-[48px] flex flex-col justify-center"><span className="text-[#E8DCC6]/50">Size</span><div>2048 x 2048</div></div>
              </div>
              <div><label className="text-xs text-[#E8DCC6]/70 flex justify-between">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={e=>setExportQuality(Number(e.target.value))} className="w-full accent-[#e69f50] cursor-pointer" /></div>
              <div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">DPI</span><div>300 DPI</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/10 rounded-xl px-3 py-2.5 h-[48px]"><span className="text-[#E8DCC6]/50">Mode</span><div>{customBgUrl ? "Custom BG" : bgColor}</div></div></div>
            </div>
            <button onClick={handleExport} className={`w-full py-3 text-sm mt-4 h-[48px] ${ctaClass}`}>Export All Formats</button>
          </div>
        </div>
      </div>
    </div>
  );
}