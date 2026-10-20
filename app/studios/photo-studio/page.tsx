"use client";
import { useState, useRef } from "react";

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
      } 
      else if (activeTool === "ai-bg") {
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
          bg.src = bgVal?.startsWith("#") ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=" : bgVal;
        });
        setAfterImage(canvas.toDataURL("image/png"));
      }
      else if (activeTool === "enhance") {
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
      }
      else if (activeTool === "shadow") {
        if (afterImage) {
          setAfterImage(afterImage.split("?")[0] + "?t=" + Date.now());
        } else if (uploadedFile) {
          const blob = await removeBackground(uploadedFile as File);
          setAfterImage(URL.createObjectURL(blob));
        }
      }
      else {
        alert(`${activeTool} Premium coming soon! Use Remove BG + AI Backgrounds + Shadow.`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    }
    setIsProcessing(false);
  };

  const handleGenerateClick = () => handleProcess();

  // CHIPS WORKING MAPPING
  const chips = [
    { chip: "Luxury gold studio", bg: "Luxury Marble • Gold", tool: "ai-bg" },
    { chip: "Minimal marble", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Dark moody", bg: "Studio Black", tool: "ai-bg" },
    { chip: "Outdoor sunlight", bg: "White Infinity", tool: "ai-bg" },
    { chip: "Neutral grey backdrop", bg: "Minimal Concrete", tool: "ai-bg" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header className="border-b border-[#D4A574]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="VISFORA Logo" className="h-24 w-24 object-contain" />
          <div className="flex flex-col">
            <span className="text-[36px] tracking-[0.32em] font-light text-white leading-none">VIS<span className="font-normal text-[#d6a85a]">FORA</span></span>
            <span className="text-sm text-[#D4A574]/70 mt-1 tracking-wide">Photo Studio • {AI_MODE === "free" ? "FREE MODE" : "FAL PREMIUM"} {isProcessing && "• Processing..."}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#E8DCC6]/70 hidden md:block">Mode: {AI_MODE}</span>
          <button onClick={() => fileInputRef.current?.click()} className="bg-[#D4A574] text-black px-5 py-2.5 rounded-xl font-medium flex items-center gap-2"><span className="text-xl">+</span> Upload New</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <aside className="w-full lg:w-[280px] border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-4 flex items-center gap-2"><span>⊞</span> Tools</h3>
          <div className="space-y-2.5">
            {tools.map((tool) => (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition ${activeTool === tool.id ? "bg-[#D4A574] text-black font-medium" : "bg-[#1F1F1F] text-[#E8DCC6]/80 hover:bg-[#2A2A2A] border border-[#D4A574]/10"}`}><span>{tool.icon}</span> {tool.label}</button>
            ))}
          </div>
          <button onClick={handleProcess} disabled={isProcessing} className="w-full mt-4 bg-white text-black py-3 rounded-xl font-medium disabled:opacity-50">{isProcessing ? "Processing..." : "✨ Run " + tools.find(t=>t.id===activeTool)?.label}</button>
          <p className="text-xs text-[#E8DCC6]/40 mt-3 text-center">Free mode: no key needed</p>
        </aside>

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
                <span className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded-full">BEFORE</span>
                {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover" alt="before" /> : <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80')] bg-cover opacity-60" />}
              </div>
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3] bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Checkerboard_pattern.png')] bg-repeat">
                <span className="absolute top-3 left-3 text-xs bg-[#D4A574] text-black px-2 py-1 rounded-full">AFTER</span>
                {isProcessing ? <div className="w-full h-full flex items-center justify-center text-[#D4A574] animate-pulse">Processing... first time 15s</div> : afterImage ? <img src={afterImage} className="w-full h-full object-contain" alt="after" style={{ filter: `drop-shadow(0 15px ${shadowIntensity/3}px rgba(0,0,0,0.6))` }} /> : uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover opacity-50" alt="after preview" /> : <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80')] bg-cover" />}
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
            {afterImage && <a href={afterImage} download={`visfora-${activeTool}.png`} target="_blank" className="mt-4 mx-auto bg-[#D4A574] text-black px-6 py-2 rounded-xl font-medium">⬇️ Download Result</a>}
          </div>
        </main>

        <aside className="w-full lg:w-[300px] border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-6 flex items-center justify-between">Properties <span>⚙️</span></h3>
          <div className="space-y-6">
            <div><label className="text-sm text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={(e) => setBgStyle(e.target.value)} className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div><label className="text-sm text-[#E8DCC6]/70">Shadow Intensity</label><div className="flex items-center gap-3 mt-2"><input type="range" min="0" max="100" value={shadowIntensity} onChange={(e) => setShadowIntensity(Number(e.target.value))} className="flex-1 accent-[#D4A574]" /><span className="bg-[#D4A574] text-black text-xs px-3 py-1 rounded-full">{shadowIntensity}%</span></div></div>
            <div><label className="text-sm text-[#E8DCC6]/70">Lighting Direction</label><button className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm text-left flex items-center gap-2">☀️ {lighting}</button></div>
          </div>
        </aside>
      </div>

      {/* BOTTOM WITH WORKING CHIPS */}
      <div className="border-t border-[#D4A574]/30 p-4 bg-[#141414] mx-4 mb-4 rounded-2xl">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-4 py-3"><span>✨</span><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your edit • e.g., Add golden luxury studio backdrop, soft dramatic shadow, photoreal" className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40" /></div>
          <button onClick={handleGenerateClick} disabled={isProcessing} className="bg-[#D4A574] text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#E8DCC6] transition disabled:opacity-50">{isProcessing ? "Working..." : "✨ Generate"}</button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {chips.map(({ chip, bg, tool }) => (
            <button
              key={chip}
              onClick={() => {
                setPrompt(chip);
                setBgStyle(bg);
                setActiveTool(tool);
              }}
              className="whitespace-nowrap px-4 py-2 rounded-xl text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#D4A574] hover:text-black transition"
            >
              ✨ {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}