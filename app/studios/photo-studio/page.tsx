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
  const [activeTool, setActiveTool] = useState("change-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("PNG");
  const [exportQuality, setExportQuality] = useState(90);
  const [isBgRemoved, setIsBgRemoved] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<null | "notif" | "settings" | "profile">(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: "change-bg", label: "Add / Change Background", icon: "🎀" },
    { id: "enhance", label: "Enhance", icon: "✨" },
    { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" },
    { id: "eraser", label: "Magic Eraser", icon: "🪶" },
    { id: "recolor", label: "Recolor", icon: "🎨" },
    { id: "shadow", label: "Shadow Studio", icon: "☁️" },
  ];

  const toolStatus: Record<string, { before: string; after: string }> = {
    "change-bg": { before: "Original", after: "BG Removed" },
    "enhance": { before: "Original", after: "Enhanced" },
    "ai-bg": { before: "Original", after: "New BG" },
    "eraser": { before: "Original", after: "Erased" },
    "recolor": { before: "Original", after: "Recolored" },
    "shadow": { before: "Original", after: "Shadow Added" },
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
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
    if (!uploadedFile && !uploadedImage) { alert("Upload first"); return; }
    setIsProcessing(true);
    try {
      const pkg = "@imgly" + "/background-removal";
      // @ts-ignore
      const { removeBackground } = await import(pkg);
      const src = uploadedFile || (await fetch(uploadedImage!).then(r => r.blob()).then(b => new File([b], fileName)));
      const blob = await removeBackground(src as File);
      setAfterImage(URL.createObjectURL(blob));
      setIsBgRemoved(true);
    } catch (e: any) { alert(e.message); }
    setIsProcessing(false);
  };
  const handleExport = () => {
    const link = document.createElement("a");
    link.href = afterImage || uploadedImage!;
    link.download = `visfora-${activeTool}.${exportFormat.toLowerCase()}`;
    link.click();
  };

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium rounded-full";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";
  const currentStatus = toolStatus[activeTool] || toolStatus["change-bg"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header ref={headerRef} className="border-b border-[#D4A574]/30 px-6 py-3 flex items-center justify-between bg-[#0A0A0A] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/Logo-White.png" alt="VISFORA Logo" className="h-14 w-auto object-contain" />
          <span className="text-[32px] tracking-[0.18em] font-light text-white leading-none flex items-center h-14">VIS<span className="font-semibold text-[#d6a85a]">FORA</span></span>
        </Link>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "notif" ? null : "notif")} className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${activeDropdown === "notif" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#1F1F1F] border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>🔔</button>
            {activeDropdown === "notif" && (<div className="absolute right-0 top-12 w-[340px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-xl z-50 p-2"><div className="p-3 rounded-xl bg-[#1F1F1F]"><p className="text-sm text-white">Background removed</p><p className="text-xs text-[#E8DCC6]/50 mt-1">{fileName} • just now</p></div></div>)}
          </div>
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "settings" ? null : "settings")} className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer ${activeDropdown === "settings" ? "bg-[#e69f50] border-[#e69f50] text-black" : "bg-[#1F1F1F] border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>⚙️</button>
            {activeDropdown === "settings" && (<div className="absolute right-0 top-12 w-[300px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-xl z-50 p-4"><h4 className="text-white mb-3">Settings</h4><div className="text-sm text-[#E8DCC6]/60">High Quality Export ON</div></div>)}
          </div>
          <div className="relative">
            <button onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")} className="w-9 h-9 rounded-full bg-[#e69f50] border-2 border-[#e69f50] text-black flex items-center justify-center font-medium cursor-pointer">👤</button>
            {activeDropdown === "profile" && (<div className="absolute right-0 top-12 w-[280px] bg-[#141414] border border-[#D4A574]/30 rounded-2xl shadow-xl z-50 p-4"><p className="text-white text-sm">Ankit Kumar</p><p className="text-xs text-[#E8DCC6]/50">ankit@visfora.com</p></div>)}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-[280px] flex flex-col gap-3">
          <aside className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-4 flex items-center gap-2">⊞ Tools</h3>
            <div className="space-y-2.5">
              {tools.map((tool) => (
                <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`${toolBtnClass} border-2 ${activeTool === tool.id ? "bg-[#e69f50] text-black border-[#e69f50] font-semibold shadow-[0_0_15px_rgba(230,159,80,0.35)]" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A]"}`}>
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
          </aside>
          <div className="flex flex-col gap-3">
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full flex items-center justify-center gap-2 h-[48px] text-[13px] disabled:opacity-50 ${ctaClass}`}>✨ {isProcessing ? "Processing..." : `Run ${tools.find(t=>t.id===activeTool)?.label}`}</button>
            <button onClick={() => fileInputRef.current?.click()} className={`w-full flex items-center justify-center gap-2 h-[48px] text-[13px] ${ctaClass}`}><span className="text-lg">+</span> Upload New</button>
          </div>
        </div>

        <main className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="text-[#E8DCC6] font-medium text-lg">Canvas</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#E8DCC6]/70 tracking-wide">Background Removal</span>
              <button onClick={() => setIsBgRemoved(!isBgRemoved)} className={`relative w-[64px] h-[28px] rounded-full p-1 transition-all duration-300 cursor-pointer flex items-center ${isBgRemoved ? "bg-[#e69f50]" : "bg-[#2A2A2A] border border-[#D4A574]/20"}`}>
                <span className={`absolute text-[10px] font-bold transition-all ${isBgRemoved ? "left-2.5 text-black" : "right-2.5 text-[#E8DCC6]/50"}`}>{isBgRemoved ? "ON" : "OFF"}</span>
                <div className={`w-5 h-5 rounded-full shadow-md transition-all duration-300 z-10 ${isBgRemoved ? "translate-x-[36px] bg-black" : "translate-x-0 bg-[#E8DCC6]"}`} />
              </button>
            </div>
          </div>

          <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="flex-1 border border-dashed border-[#D4A574]/50 rounded-2xl p-4 bg-[#0F0F0F] relative min-h-[580px] flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#e69f50]">BEFORE</span>
              <p className="text-center text-[12px] text-[#E8DCC6]/50">Drag & drop to upload<br/>or click Upload</p>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#e69f50]">AFTER</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden bg-[#111] min-h-[480px]">
                {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover absolute inset-0" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-cover absolute inset-0" alt="sneaker" />}
              </div>

              <div className="relative rounded-xl overflow-hidden bg-[#111] min-h-[480px]">
                <div className={`absolute inset-0 ${isBgRemoved ? "bg-[length:20px_20px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')] bg-[#1A1A1A]" : "bg-[#1A1A1A]"}`} />
                {isProcessing ? (
                  <div className="absolute inset-0 flex items-center justify-center text-[#e69f50] animate-pulse text-sm z-10">Processing... removing background</div>
                ) : afterImage && isBgRemoved ? (
                  <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10" alt="after removed" />
                ) : uploadedImage && !isBgRemoved ? (
                  <img src={uploadedImage} className="absolute inset-0 w-full h-full object-cover z-10" alt="after with bg" />
                ) : afterImage ? (
                  <img src={afterImage} className="absolute inset-0 w-full h-full object-contain z-10" alt="after" />
                ) : uploadedImage ? (
                  <img src={uploadedImage} className="absolute inset-0 w-full h-full object-contain opacity-50 z-10" alt="preview" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10"><p className="text-[#E8DCC6]/30 text-sm">Preview</p><p className="text-[#E8DCC6]/20 text-xs mt-1">No preview yet</p></div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-20 p-2.5 flex justify-between items-center">
                  <span className="text-[10px] bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#e69f50]/30 text-white flex items-center gap-1.5">
                    <span className="truncate max-w-[80px] text-white/70">{fileName}</span>
                    <span className="text-[#e69f50]">• {currentStatus.after}</span>
                  </span>
                  <div className="flex gap-1.5">
                    <span className="text-[9px] bg-black/80 backdrop-blur px-2.5 py-1.5 rounded-full border border-white/10 text-white/70">{exportFormat}</span>
                    <span className="text-[9px] bg-black/80 backdrop-blur px-2.5 py-1.5 rounded-full border border-[#e69f50]/30 text-[#e69f50]">2048x2048</span>
                  </div>
                </div>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
          </div>
        </main>

        <aside className="w-full lg:w-[320px] flex flex-col gap-4">
          <div className="border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-6 flex items-center justify-between">Properties <span>⚙️</span></h3>
            <div className="space-y-6">
              <div><label className="text-sm text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={(e) => setBgStyle(e.target.value)} className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm cursor-pointer"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Shadow Intensity</label><div className="flex items-center gap-3 mt-2"><input type="range" min="0" max="100" value={shadowIntensity} onChange={(e) => setShadowIntensity(Number(e.target.value))} className="flex-1 accent-[#e69f50] cursor-pointer" /><span className="bg-[#e69f50] text-black text-xs px-3 py-1 rounded-full">{shadowIntensity}%</span></div></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Lighting Direction</label><button className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm text-left flex items-center gap-2 cursor-pointer">☀️ {lighting}</button></div>
            </div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-5 flex items-center justify-between">Output / Export <span>📤</span></h3>
            <div className="space-y-4">
              <div><label className="text-sm text-[#E8DCC6]/70">Format</label><div className="grid grid-cols-3 gap-2 mt-2">{["PNG","JPG","WEBP"].map(f => (<button key={f} onClick={() => setExportFormat(f)} className={`py-2 rounded-full text-xs font-medium border transition cursor-pointer ${exportFormat===f ? "bg-[#e69f50] text-black border-[#e69f50]" : "bg-[#1F1F1F] text-[#E8DCC6]/70 border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>{f}</button>))}</div></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={(e) => setExportQuality(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer" /></div>
              <div className="grid grid-cols-2 gap-2"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">Size</span><div className="text-[#E8DCC6] mt-1">2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">DPI</span><div className="text-[#E8DCC6] mt-1">300 DPI</div></div></div>
              <button onClick={handleExport} disabled={!afterImage && !uploadedImage} className={`w-full py-3 text-sm disabled:opacity-30 ${ctaClass}`}>⬇️ Export {exportFormat}</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="border-t border-[#D4A574]/30 p-4 bg-[#141414] mx-4 mb-4 rounded-2xl">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-full px-5 py-3"><span>✨</span><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your edit • e.g., Add golden luxury studio backdrop, soft dramatic shadow, photoreal" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
          <button onClick={handleProcess} disabled={isProcessing} className={`px-8 py-3 text-sm disabled:opacity-50 ${ctaClass}`}>{isProcessing ? "Working..." : "Generate"}</button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto justify-center">{["Luxury gold studio","Minimal marble","Dark moody","Outdoor sunlight","Neutral grey backdrop"].map(chip => (<button key={chip} className="whitespace-nowrap px-4 py-2 rounded-full text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#e69f50] hover:text-black transition cursor-pointer">✨ {chip}</button>))}</div>
      </div>
    </div>
  );
}