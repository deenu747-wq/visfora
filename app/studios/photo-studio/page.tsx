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
  const [exportFormat, setExportFormat] = useState("PNG");
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

  const bgPresets: any = {
    "Luxury Marble • Gold": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000",
    "White Infinity": "#FFFFFF",
    "Minimal Concrete": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000",
    "Studio Black": "#111111",
  };

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
      if (activeTool === "remove-bg") {
        if (AI_MODE === "free") {
          const blob = await removeBackground(uploadedFile as File);
          setAfterImage(URL.createObjectURL(blob));
        } else {
          const reader = new FileReader();
          const base64 = await new Promise<string>((res) => {
            reader.onload = () => res(reader.result as string);
            reader.readAsDataURL(uploadedFile!);
          });
          const r = await fetch("/api/photo/remove-bg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });
          const data = await r.json();
          const resultUrl = data.image?.url || data.image_url || data.url;
          if (resultUrl) setAfterImage(resultUrl);
          else alert("Fal error: " + JSON.stringify(data).slice(0,300));
        }
      } else if (activeTool === "ai-bg") {
        let cutoutUrl = afterImage;
        if (!cutoutUrl && uploadedFile) {
          const blob = await removeBackground(uploadedFile as File);
          cutoutUrl = URL.createObjectURL(blob);
          setAfterImage(cutoutUrl);
        }
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const bg = new Image();
        const fg = new Image();
        bg.crossOrigin = "anonymous";
        fg.crossOrigin = "anonymous";
        await new Promise<void>((resolve) => {
          bg.onload = () => {
            canvas.width = 1000;
            canvas.height = 1000;
            const bgVal = bgPresets[bgStyle];
            if (bgVal?.startsWith("#")) {
              ctx.fillStyle = bgVal;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
              ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            }
            fg.onload = () => {
              const scale = Math.min(canvas.width / fg.width, canvas.height / fg.height) * 0.7;
              const w = fg.width * scale;
              const h = fg.height * scale;
              const x = (canvas.width - w) / 2;
              const y = (canvas.height - h) / 2;
              ctx.shadowColor = "rgba(0,0,0,0.5)";
              ctx.shadowBlur = shadowIntensity;
              ctx.drawImage(fg, x, y, w, h);
              resolve();
            };
            fg.src = cutoutUrl!;
          };
          const bgVal = bgPresets[bgStyle];
          bg.src = bgVal?.startsWith("#") ? "data:image/png;base64,[STRIPPED]" : bgVal;
        });
        setAfterImage(canvas.toDataURL("image/png"));
      } else if (activeTool === "enhance") {
        const img = new Image();
        img.src = (afterImage || uploadedImage)!;
        await new Promise(r => img.onload = r as any);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setAfterImage(canvas.toDataURL("image/png"));
      } else if (activeTool === "shadow") {
        if (afterImage) {
          setAfterImage(afterImage.split("?")[0] + "?t=" + Date.now());
        } else if (uploadedFile) {
          const blob = await removeBackground(uploadedFile as File);
          setAfterImage(URL.createObjectURL(blob));
        }
      } else {
        alert(`${activeTool} Premium coming soon!`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    }
    setIsProcessing(false);
  };

  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Dark moody", bg: "Studio Black", tool: "ai-bg" },
    { chip: "Outdoor sunlight", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Neutral grey backdrop", bg: "Minimal Concrete", tool: "ai-bg" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header className="border-b border-[#D4A574]/30 px-6 py-3 flex items-center justify-between bg-[#0A0A0A] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/Logo-White.png" alt="VISFORA Logo" className="h-14 w-auto object-contain" />
          <span className="text-[24px] tracking-[0.32em] font-light text-white leading-none">VIS<span className="font-normal text-[#d6a85a]">FORA</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-[#1F1F1F] border border-[#D4A574]/20 flex items-center justify-center hover:bg-[#2A2A2A] transition">🔔</button>
          <button className="w-9 h-9 rounded-full bg-[#1F1F1F] border border-[#D4A574]/20 flex items-center justify-center hover:bg-[#2A2A2A] transition">⚙️</button>
          <button className="w-9 h-9 rounded-full bg-[#D4A574] text-black flex items-center justify-center font-medium">👤</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* LEFT - TOOLS BOX + UPLOAD OUTSIDE */}
        <div className="w-full lg:w-[280px] flex flex-col gap-3">
          <aside className="border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-4 flex items-center gap-2"><span>⊞</span> Tools</h3>
            <div className="space-y-2.5">
              {tools.map((tool) => (
                <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition ${activeTool === tool.id ? "bg-[#D4A574] text-black font-medium" : "bg-[#1F1F1F] text-[#E8DCC6]/80 hover:bg-[#2A2A2A] border border-[#D4A574]/10"}`}><span>{tool.icon}</span> {tool.label}</button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className="w-full mt-4 bg-white text-black py-3 rounded-xl font-medium disabled:opacity-50">{isProcessing ? "Processing..." : "✨ Run " + tools.find(t=>t.id===activeTool)?.label}</button>
          </aside>
          {/* 2. UPLOAD NEW OUTSIDE BOX - GREEN LINE POSITION */}
          <button onClick={() => fileInputRef.current?.click()} className="w-full bg-[#D4A574] text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-sm hover:bg-[#E8DCC6] transition border border-[#D4A574]">
            <span className="text-lg leading-none">+</span> Upload New
          </button>
        </div>

        <main className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="text-[#E8DCC6] font-medium text-lg">Canvas</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#1F1F1F]">BEFORE</button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#D4A574] text-black">AFTER</button>
            </div>
          </div>

          <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="flex-1 border border-dashed border-[#D4A574]/50 rounded-2xl p-4 bg-[#0F0F0F] relative min-h-[480px] flex flex-col">
            <p className="text-center text-sm text-[#E8DCC6]/60 mb-4">Drag & drop to upload<br />or click Upload</p>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]">
                <span className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded-full z-10">BEFORE</span>
                {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover" alt="before" /> : <img src="/sneaker.png" className="w-full h-full object-contain p-6 opacity-70" alt="sneaker" />}
              </div>
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')] bg-repeat">
                <span className="absolute top-3 left-3 text-xs bg-[#D4A574] text-black px-2 py-1 rounded-full z-10">AFTER</span>
                {isProcessing ? <div className="w-full h-full flex items-center justify-center text-[#D4A574] animate-pulse">Processing... first time 15s</div> : afterImage ? <img src={afterImage} className="w-full h-full object-contain" alt="after" style={{ filter: `drop-shadow(0 15px ${shadowIntensity / 3}px rgba(0,0,0,0.6))` }} /> : uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover opacity-50" alt="after preview" /> : <img src="/sneaker.png" className="w-full h-full object-contain p-6" alt="sneaker" />}
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
            {afterImage && <div className="flex justify-center mt-4"><a href={afterImage} download={`visfora-${activeTool}.png`} target="_blank" className="bg-white text-black px-6 py-2.5 rounded-xl font-medium text-sm">⬇️ Download Result</a></div>}
          </div>
        </main>

        <aside className="w-full lg:w-[320px] flex flex-col gap-4">
          <div className="border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-6 flex items-center justify-between">Properties <span>⚙️</span></h3>
            <div className="space-y-6">
              <div><label className="text-sm text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={(e) => setBgStyle(e.target.value)} className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Shadow Intensity</label><div className="flex items-center gap-3 mt-2"><input type="range" min="0" max="100" value={shadowIntensity} onChange={(e) => setShadowIntensity(Number(e.target.value))} className="flex-1 accent-[#D4A574]" /><span className="bg-[#D4A574] text-black text-xs px-3 py-1 rounded-full">{shadowIntensity}%</span></div></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Lighting Direction</label><button className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm text-left flex items-center gap-2">☀️ {lighting}</button></div>
            </div>
          </div>
          <div className="border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
            <h3 className="text-[#E8DCC6] font-medium mb-5 flex items-center justify-between">Output / Export <span>📤</span></h3>
            <div className="space-y-4">
              <div><label className="text-sm text-[#E8DCC6]/70">Format</label><div className="grid grid-cols-3 gap-2 mt-2">{["PNG","JPG","WEBP"].map(f => (<button key={f} onClick={() => setExportFormat(f)} className={`py-2 rounded-xl text-xs font-medium border transition ${exportFormat===f ? "bg-[#D4A574] text-black border-[#D4A574]" : "bg-[#1F1F1F] text-[#E8DCC6]/70 border-[#D4A574]/20 hover:bg-[#2A2A2A]"}`}>{f}</button>))}</div></div>
              <div><label className="text-sm text-[#E8DCC6]/70">Quality — {exportQuality}%</label><input type="range" min="10" max="100" value={exportQuality} onChange={(e) => setExportQuality(Number(e.target.value))} className="w-full mt-2 accent-[#D4A574]" /></div>
              <div className="grid grid-cols-2 gap-2"><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">Size</span><div className="text-[#E8DCC6] mt-1">2048 x 2048</div></div><div className="bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-xs"><span className="text-[#E8DCC6]/50">DPI</span><div className="text-[#E8DCC6] mt-1">300 DPI</div></div></div>
              <button onClick={() => afterImage && window.open(afterImage, '_blank')} disabled={!afterImage} className="w-full bg-white text-black py-2.5 rounded-xl font-medium text-sm disabled:opacity-30">⬇️ Export {exportFormat}</button>
            </div>
          </div>
        </aside>
      </div>

      {/* 3 & 4 - PROMPT AREA REDUCED + LEFT ALIGNED + CHIPS LEFT */}
      <div className="border-t border-[#D4A574]/30 p-4 bg-[#141414] mx-4 mb-4 rounded-2xl">
        <div className="flex gap-3 items-start">
          <div className="w-full max-w-[520px] flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-4 py-3"><span>✨</span><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your edit • e.g., Add golden luxury studio backdrop" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
          <button onClick={handleProcess} disabled={isProcessing} className="bg-[#D4A574] text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#E8DCC6] transition disabled:opacity-50">{isProcessing ? "Working..." : "✨ Generate"}</button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto justify-start">
          {chips.map(({ chip, bg, tool }) => (
            <button key={chip} onClick={() => { setPrompt(chip); setBgStyle(bg); setActiveTool(tool); }} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#D4A574] hover:text-black transition">✨ {chip}</button>
          ))}
        </div>
      </div>
    </div>
  );
}