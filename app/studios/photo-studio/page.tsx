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
    "Minimal Concrete": "#E8E8E8",
    "Studio Black": "#0A0A0A",
  };

  const handleUpload = (file: File) => {
    setUploadedImage(URL.createObjectURL(file));
    setUploadedFile(file);
    setAfterImage(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
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
        const blob = await removeBackground(uploadedFile as File);
        setAfterImage(URL.createObjectURL(blob));
      } 
      else if (activeTool === "ai-bg") {
        // Step 1: Ensure cutout
        let cutoutUrl = afterImage;
        if (!cutoutUrl && uploadedFile) {
          const blob = await removeBackground(uploadedFile as File);
          cutoutUrl = URL.createObjectURL(blob);
          setAfterImage(cutoutUrl);
        }
        if (!cutoutUrl) throw new Error("No cutout");

        // Step 2: Create luxury canvas
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 1200;
        const ctx = canvas.getContext("2d")!;

        // Background
        const bgVal = bgPresets[bgStyle];
        if (bgVal.startsWith("#")) {
          ctx.fillStyle = bgVal;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          // Add subtle vignette for luxury feel
          const grad = ctx.createRadialGradient(600, 600, 0, 600, 600, 800);
          grad.addColorStop(0, "rgba(0,0,0,0)");
          grad.addColorStop(1, "rgba(0,0,0,0.15)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          const bgImg = await loadImage(bgVal);
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }

        // Foreground product with shadow
        const fgImg = await loadImage(cutoutUrl);
        const scale = Math.min(canvas.width / fgImg.width, canvas.height / fgImg.height) * 0.65;
        const w = fgImg.width * scale;
        const h = fgImg.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2 + 20;

        // Shadow
        ctx.shadowColor = "rgba(0,0,0,0.35)";
        ctx.shadowBlur = shadowIntensity;
        ctx.shadowOffsetY = 25;
        ctx.drawImage(fgImg, x, y, w, h);
        
        // Reset shadow and draw again sharp
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(fgImg, x, y, w, h);

        setAfterImage(canvas.toDataURL("image/png", 1.0));
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
        // Just re-apply current cutout with new shadowIntensity via re-render in AI BG
        if (afterImage) {
          setActiveTool("ai-bg");
          setTimeout(() => handleProcess(), 50);
          return;
        } else if (uploadedFile) {
          const blob = await removeBackground(uploadedFile as File);
          setAfterImage(URL.createObjectURL(blob));
        }
      }
      else {
        alert(`${activeTool} coming in Fal Premium. For now Remove BG + AI BG + Shadow works 100% free.`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      <header className="border-b border-[#D4A574]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="VISFORA Logo" className="h-24 w-24 object-contain" />
          <div className="flex flex-col">
            <span className="text-[36px] tracking-[0.32em] font-light text-white leading-none">VIS<span className="font-normal text-[#d6a85a]">FORA</span></span>
            <span className="text-sm text-[#D4A574]/70 mt-1 tracking-wide">Photo Studio • FREE MODE {isProcessing && "• Processing..."}</span>
          </div>
        </div>
        <button onClick={() => fileInputRef.current?.click()} className="bg-[#D4A574] text-black px-5 py-2.5 rounded-xl font-medium">+ Upload New</button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <aside className="w-full lg:w-[280px] border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-4">⊞ Tools</h3>
          <div className="space-y-2.5">
            {tools.map((tool) => (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${activeTool === tool.id ? "bg-[#D4A574] text-black font-medium" : "bg-[#1F1F1F] text-[#E8DCC6]/80 border border-[#D4A574]/10"}`}><span>{tool.icon}</span> {tool.label}</button>
            ))}
          </div>
          <button onClick={handleProcess} disabled={isProcessing} className="w-full mt-4 bg-white text-black py-3 rounded-xl font-medium disabled:opacity-50">{isProcessing ? "Processing..." : "✨ Run " + tools.find(t=>t.id===activeTool)?.label}</button>
        </aside>

        <main className="flex-1 flex flex-col">
          <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="flex-1 border border-dashed border-[#D4A574]/50 rounded-2xl p-4 bg-[#0F0F0F] min-h-[480px] flex flex-col">
            <p className="text-center text-sm text-[#E8DCC6]/60 mb-4">Drag & drop or click Upload</p>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]">
                <span className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded-full">BEFORE</span>
                {uploadedImage ? <img src={uploadedImage} className="w-full h-full object-cover" alt="before" /> : <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80')] bg-cover opacity-60" />}
              </div>
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]">
                <span className="absolute top-3 left-3 text-xs bg-[#D4A574] text-black px-2 py-1 rounded-full">AFTER</span>
                {isProcessing ? <div className="w-full h-full flex items-center justify-center text-[#D4A574] animate-pulse">Processing...</div> : afterImage ? <img src={afterImage} className="w-full h-full object-contain" alt="after" /> : <div className="w-full h-full flex items-center justify-center text-[#E8DCC6]/30">Result will show here</div>}
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
            {afterImage && <a href={afterImage} download={`visfora-${activeTool}.png`} target="_blank" className="mt-4 mx-auto bg-[#D4A574] text-black px-6 py-2 rounded-xl font-medium">⬇️ Download Result</a>}
          </div>
        </main>

        <aside className="w-full lg:w-[300px] border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-6 flex items-center justify-between">Properties ⚙️</h3>
          <div className="space-y-6">
            <div><label className="text-sm text-[#E8DCC6]/70">Background Style</label><select value={bgStyle} onChange={(e) => setBgStyle(e.target.value)} className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm"><option>Luxury Marble • Gold</option><option>White Infinity</option><option>Minimal Concrete</option><option>Studio Black</option></select></div>
            <div><label className="text-sm text-[#E8DCC6]/70">Shadow Intensity</label><div className="flex items-center gap-3 mt-2"><input type="range" min="0" max="100" value={shadowIntensity} onChange={(e) => setShadowIntensity(Number(e.target.value))} className="flex-1 accent-[#D4A574]" /><span className="bg-[#D4A574] text-black text-xs px-3 py-1 rounded-full">{shadowIntensity}%</span></div></div>
          </div>
        </aside>
      </div>
    </div>
  );
}