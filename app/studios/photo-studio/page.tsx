"use client";
import { useState, useRef } from "react";

export default function PhotoStudio() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [shadowIntensity, setShadowIntensity] = useState(70);
  const [bgStyle, setBgStyle] = useState("Luxury Marble • Gold");
  const [lighting, setLighting] = useState("Top-Right");
  const [activeTool, setActiveTool] = useState("remove-bg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: "remove-bg", label: "Remove Background", icon: "✂️", active: true },
    { id: "enhance", label: "Enhance", icon: "✨" },
    { id: "ai-bg", label: "AI Backgrounds", icon: "🏔️" },
    { id: "eraser", label: "Magic Eraser", icon: "🧹" },
    { id: "recolor", label: "Recolor", icon: "🎨" },
    { id: "shadow", label: "Shadow Studio", icon: "☁️" },
  ];

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8DCC6] flex flex-col">
      {/* HEADER - Using public/Logo.png */}
      <header className="border-b border-[#D4A574]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img 
              src="/Logo.png" 
              alt="VISFORA Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-[36px] tracking-[0.32em] font-light text-White">
       VIS<span className="font-normal text-[#d6a85a]">FORA</span>
          </div>
          <span className="text-sm text-[#D4A574]/70 mt-1 tracking-wide">Photo Studio • AI Editing</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#E8DCC6]/70 hidden md:block">
            Drag & drop image here to start<br />— or click Upload New
          </span>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#D4A574] text-black px-5 py-2.5 rounded-xl font-medium hover:bg-[#E8DCC6] transition flex items-center gap-2"
          >
            <span className="text-xl">+</span> Upload New
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* LEFT - TOOLS */}
        <aside className="w-full lg:w-[280px] border border-[#D4A574]/30 rounded-2xl p-4 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-4 flex items-center gap-2">
            <span>⊞</span> Tools
          </h3>
          <div className="space-y-2.5">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition ${
                  activeTool === tool.id
                    ? "bg-[#D4A574] text-black font-medium"
                    : "bg-[#1F1F1F] text-[#E8DCC6]/80 hover:bg-[#2A2A2A] border border-[#D4A574]/10"
                }`}
              >
                <span>{tool.icon}</span> {tool.label}
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER - CANVAS */}
        <main className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="text-[#E8DCC6] font-medium text-lg">Canvas</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#1F1F1F]">BEFORE</button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#D4A574] text-black">AFTER</button>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex-1 border border-dashed border-[#D4A574]/50 rounded-2xl p-4 bg-[#0F0F0F] relative min-h-[480px] flex flex-col"
          >
            <p className="text-center text-sm text-[#E8DCC6]/60 mb-4">
              Drag & drop to upload an image<br />or click Upload to add
            </p>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BEFORE */}
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]">
                <span className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded-full">BEFORE</span>
                {uploadedImage ? (
                  <img src={uploadedImage} className="w-full h-full object-cover" alt="before" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80')] bg-cover opacity-60" />
                )}
              </div>
              {/* AFTER */}
              <div className="relative rounded-xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]">
                <span className="absolute top-3 left-3 text-xs bg-[#D4A574] text-black px-2 py-1 rounded-full">AFTER</span>
                {uploadedImage ? (
                  <img src={uploadedImage} className="w-full h-full object-cover" alt="after" style={{ filter: `drop-shadow(0 10px ${shadowIntensity/5}px rgba(0,0,0,0.5))` }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80')] bg-cover" />
                )}
              </div>
            </div>

            <div className="mt-4 mx-auto border border-dashed border-[#D4A574]/30 rounded-xl p-3 px-6 text-center bg-[#141414]">
              <p className="text-sm">Drag & drop your image here</p>
              <p className="text-xs text-[#E8DCC6]/50">PNG, JPG up to 25MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
            />
          </div>
        </main>

        {/* RIGHT - PROPERTIES */}
        <aside className="w-full lg:w-[300px] border border-[#D4A574]/30 rounded-2xl p-5 bg-[#141414] h-fit">
          <h3 className="text-[#E8DCC6] font-medium mb-6 flex items-center justify-between">
            Properties <span>⚙️</span>
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-[#E8DCC6]/70">Background Style</label>
              <select
                value={bgStyle}
                onChange={(e) => setBgStyle(e.target.value)}
                className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm"
              >
                <option>Luxury Marble • Gold</option>
                <option>White Infinity</option>
                <option>Minimal Concrete</option>
                <option>Studio Black</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#E8DCC6]/70">Shadow Intensity</label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowIntensity}
                  onChange={(e) => setShadowIntensity(Number(e.target.value))}
                  className="flex-1 accent-[#D4A574]"
                />
                <span className="bg-[#D4A574] text-black text-xs px-3 py-1 rounded-full">{shadowIntensity}%</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#E8DCC6]/70">Lighting Direction</label>
              <button className="w-full mt-2 bg-[#1F1F1F] border border-[#D4A574]/20 rounded-xl px-3 py-2.5 text-sm text-left flex items-center gap-2">
                ☀️ {lighting}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-[#D4A574] rounded-full p-1">
                <div className="w-4 h-4 bg-black rounded-full ml-auto" />
              </div>
              <span className="text-sm">Soft Shadow</span>
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM - PROMPT BAR */}
      <div className="border-t border-[#D4A574]/30 p-4 bg-[#141414] mx-4 mb-4 rounded-2xl">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-[#0F0F0F] border border-[#D4A574]/20 rounded-xl px-4 py-3">
            <span>✨</span>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your edit • e.g., Add golden luxury studio backdrop, soft dramatic shadow, photoreal"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#E8DCC6]/40"
            />
          </div>
          <button className="bg-[#D4A574] text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#E8DCC6] transition">
            ✨ Generate
          </button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          {["Luxury gold studio", "Minimal marble", "Dark moody", "Outdoor sunlight", "Neutral grey backdrop"].map((chip) => (
            <button
              key={chip}
              onClick={() => setPrompt(chip)}
              className="whitespace-nowrap px-4 py-2 rounded-xl text-xs border border-[#D4A574]/30 bg-[#1F1F1F] hover:bg-[#2A2A2A]"
            >
              ✨ {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}