"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const AI_MODE = process.env.NEXT_PUBLIC_AI_MODE || "free";

export default function PhotoStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [shadowIntensity, setShadowIntensity] = useState(70);
  const [bgStyle, setBgStyle] = useState("Luxury Marble • Gold");
  const [lighting, setLighting] = useState("Top-Right");
  const [activeTool, setActiveTool] = useState("remove-bg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState("WEBP");
  const [exportQuality, setExportQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: "remove-bg", label: "Remove Background", icon: "✂️" },
    { id: "enhance", label: "Enhance", icon: "✨" },
    { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" },
    { id: "eraser", label: "Magic Eraser", icon: "🧹" },
    { id: "recolor", label: "Recolor", icon: "🎨" },
    { id: "shadow", label: "Shadow Studio", icon: "☁️" },
  ];

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setUploadedFile(file);
    setAfterImage(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleProcess = async () => {
    if (!uploadedFile && !uploadedImage) {
      alert("Please upload image first!");
      return;
    }
    setIsProcessing(true);
    try {
      const pkg = "@imgly" + "/background-removal";
      // @ts-ignore
      const { removeBackground } = await import(pkg);
      const blob = await removeBackground(uploadedFile as File);
      setAfterImage(URL.createObjectURL(blob));
    } catch (err: any) {
      alert("Error: " + err.message);
    }
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

  const ctaClass = "bg-[#e69f50] text-black hover:bg-[#d48e40] hover:shadow-[0_0_20px_rgba(230,159,80,0.5)] cursor-pointer transition-all duration-200 font-medium";
  const toolBtnClass = "w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition cursor-pointer text-[13px] h-[48px]";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header className="border-b border-[#D4A574]/30 px-6 py-3 flex items-center justify-between bg-[#0A0A0A] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/Logo-White.png" alt="VISFORA Logo" className="h-14 w-auto object-contain" />
          <span className="text-[24px] tracking-[0.32em] font-light text-white leading-none">VIS<span className="font-normal text-[#d6a85a]">FORA</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-[#1F1F1F] border border-[#D4A574]/20 flex items-center justify-center hover:bg-[#2A2A2A] transition cursor-pointer">🔔</button>
          <button className="w-9 h-9 rounded-full bg-[#1F1F1F] border border-[#D4A574]/20 flex items-center justify-center hover:bg-[#2A2A2A] transition cursor-pointer">⚙️</button>
          <button className="w-9 h-9 rounded-full bg-[#D4A574] text-black flex items-center justify-center font-medium cursor-pointer">👤</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* LEFT TOOLS - SAME SIZE + BORDER HIGHLIGHT */}
        <div className="w-full lg:w-[280px] flex flex-col gap-3">
          <aside className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-4 flex items-center gap-2"><span>⊞</span> Tools</h3>
            <div className="space-y-2.5">
              {tools.map((tool) => (
                <button 
                  key={tool.id} 
                  onClick={() => setActiveTool(tool.id)} 
                  className={`${toolBtnClass} border-2 ${
                    activeTool === tool.id 
                      ? "bg-[#e69f50] text-black border-[#e69f50] font-semibold shadow-[0_0_15px_rgba(230,159,80,0.35)]" 
                      : "bg-[#1F1F1F] text-[#E8DCC6]/80 border-[#D4A574]/10 hover:bg-[#2A2A2A] hover:border-[#D4A574]/30"
                  }`}
                >
                  <span>{tool.icon}</span> {tool.label}
                </button>
              ))}
            </div>
          </aside>
          <div className="flex flex-col gap-3">
            <button onClick={handleProcess} disabled={isProcessing} className={`w-full rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 h-[48px] text-[13px] ${ctaClass}`}>
              <span>✨</span> {isProcessing ? "Processing..." : `Run ${tools.find(t=>t.id===activeTool)?.label}`}
            </button>
            <button onClick={() => fileInputRef.current?.click()} className={`w-full rounded-xl flex items-center justify-center gap-2 h-[48px] text-[13px] ${ctaClass}`}>
              <span className="text-lg leading-none">+</span> Upload New
            </button>
          </div>
        </div>

        <main className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="text-[#E8DCC6] font-medium text-lg">Canvas</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#1F1F1F] cursor-pointer">BEFORE</button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#e69f50] text-black cursor-pointer">AFTER</button>
            </div>
          </div>

          <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="flex-1 border border-dashed border-[#D4A574]/50 rounded-2xl p-4 bg-[#0F0F0F] relative min-h-[580px] flex flex-col">
            
            {/* 1-B ALIGNED IN ONE LINE + 1-A INCREASED SIZE */}
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-sm bg-[#1F1F1F] border border-[#D4A574]/30 px-5 py-2 rounded-full text-[#E8DCC6] font-medium tracking-wide">BEFORE</span>
              <p className="text-center text-sm text-[#E8DCC6]/60">Drag & drop to upload<br/>or click Upload</p>
              <span className="text-sm bg-[#e69f50] text-black px-5 py-2 rounded-full font-semibold tracking-wide">AFTER</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] flex-1 min-h-[400px] p-4 flex items-center justify-center">
                {uploadedImage ? (
                  <img src={uploadedImage} className="w-full h-full object-contain" alt="before" />
                ) : (
                  <img src="/sneaker.png" className="w-full h-full object-contain" alt="sneaker" />
                )}
              </div>
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] flex-1 min-h-[400px] p-4 flex items-center justify-center bg-[length:20px_20px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')]">
                {isProcessing ? (
                  <div className="w-full h-full flex items-center justify-center text-[#e69f50] animate-pulse">Processing... first time 15s</div>
                ) : afterImage ? (
                  <img src={afterImage} className="w-full h-full object-contain" alt="after" style={{ filter: `drop-shadow(0 15px ${shadowIntensity / 3}px rgba(0,0,0,0.6))` }} />
                ) : uploadedImage ? (
                  <img src={uploadedImage} className="w-full h-full object-contain opacity-80" alt="after preview" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#E8DCC6]/30 text-sm">No preview yet</div>
                )}
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
              <div><label className="text-sm text-[#E8DCC6]/70">Format</label><div className="grid grid-cols-3 gap-2 mt-2">{["PNG","JPG","WEBP"].map(f => (<button key={f} onClick={() => setExportFormat(f)} className={`py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${exportFormat===f ? "bg-[#e69f50] text-black border-[#e69f50] shadow-[0_0_10px_rgba(230,159,80,0.3)]" : "bg-[#1F1F1F] text-[#E8DCC6]/70 border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>{f}</button>))}</div></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={(e) => setExportQuality(Number(e.target.value))} className="w-full mt-2 accent-[#e69f50] cursor-pointer" /></div>
              <div className="grid grid-cols-2 gap-2"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">Size</span><div className="text-[#E8DCC6] mt-1">2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">DPI</span><div className="text-[#E8DCC6] mt-1">300 DPI</div></div></div>
              <button onClick={handleExport} disabled={!afterImage && !uploadedImage} className={`w-full py-3 rounded-xl text-sm disabled:opacity-30 ${ctaClass}`}>⬇️ Export {exportFormat}</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="border-t border-[#D4A574]/30 p-4 bg-[#141414] mx-4 mb-4 rounded-2xl">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-4 py-3"><span>✨</span><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your edit • e.g., Add golden luxury studio backdrop, soft dramatic shadow, photoreal" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
          <button onClick={handleProcess} disabled={isProcessing} className={`px-6 py-3 rounded-xl text-sm disabled:opacity-50 ${ctaClass}`}>{isProcessing ? "Working..." : "Generate"}</button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto justify-center">
          {chips.map(({ chip, bg, tool }) => (
            <button key={chip} onClick={() => { setPrompt(chip); setBgStyle(bg); setActiveTool(tool); }} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#e69f50] hover:text-black transition cursor-pointer">✨ {chip}</button>
          ))}
        </div>
      </div>
    </div>
  );
}