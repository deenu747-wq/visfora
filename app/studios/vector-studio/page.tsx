"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function VectorStudioSame() {
  const [prompt, setPrompt] = useState("")
  const [progress, setProgress] = useState(68)
  const [isGenerating, setIsGenerating] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [scale2x, setScale2x] = useState(true)
  const [format, setFormat] = useState("SVG Vector")
  const [quality, setQuality] = useState("High (Precision)")
  const [queue, setQueue] = useState([
    { id: 1, name: "batch_07.png", status: "Queued" },
    { id: 2, name: "batch_08.jpg", status: "Queued" },
  ])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AI generating animation
  useEffect(() => {
    if (!isGenerating) return
    const id = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 1)
    }, 120)
    return () => clearInterval(id)
  }, [isGenerating])

  const handleGenerate = () => {
    if (!prompt.trim()) { alert("Enter prompt first! e.g. minimal geometric wolf head"); return }
    setIsGenerating(true)
    setProgress(0)
  }

  const handleBrowse = () => fileInputRef.current?.click()
  
  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files)
    setUploadedFiles(arr)
    setQueue(prev => [...prev, ...arr.map((f,i) => ({id: Date.now()+i, name: f.name, status: "Queued"}))])
    alert(`${arr.length} files added to queue`)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const handleExport = () => {
    setIsGenerating(true)
    alert("Batch Export Started! 12 files exporting to SVG...")
  }

  return (
    <div className="min-h-screen bg-[#05070d] p-2 md:p-4 flex justify-center">
      <div className="w-full max-w-[1580px] bg-[#0a0e18] border border-[#1e2f44] rounded-[18px] p-4 md:p-5 shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(93,225,255,0.1)]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="flex items-center gap-2 text-[20px] font-bold text-white">
            <span className="text-[18px]">🪄</span> Text to Vector Prompt
          </h1>
          <div className="flex items-center gap-2">
            <button onClick={() => alert("Settings opened")} className="w-9 h-9 rounded-[10px] bg-[#111a28] border border-[#2a3d55] flex items-center justify-center hover:border-[#5de1ff] transition">⚙️</button>
            <button onClick={() => alert("Scale settings")} className="w-9 h-9 rounded-[10px] bg-[#111a28] border border-[#2a3d55] flex items-center justify-center hover:border-[#5de1ff] transition">⚖️</button>
            <button onClick={() => alert("AI Tools")} className="w-9 h-9 rounded-[10px] bg-[#111a28] border border-[#2a3d55] flex items-center justify-center hover:border-[#5de1ff] transition">✨</button>
            <div className="flex gap-1 ml-2">
              <button onClick={() => alert("Notifications")} className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100">🔔</button>
              <button onClick={() => alert("Notifications")} className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100">🔔</button>
            </div>
          </div>
        </div>

        {/* PROMPT BAR */}
        <div className="bg-[#0d1420] border border-[#5de1ff]/70 rounded-[12px] px-4 py-3 flex items-center gap-3 mb-4 shadow-[0_0_18px_rgba(93,225,255,0.18),inset_0_1px_0_rgba(93,225,255,0.15)]">
          <div className="flex-1 flex items-center gap-4 min-w-0">
            <span className="text-[#5de1ff] font-bold text-[13px] whitespace-nowrap hidden lg:block">Describe your vector... e.g. minimal geometric wolf head, neon cyan wireframe, clean lines</span>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. minimal geometric wolf head, neon cyan wireframe, clean lines"
              className="flex-1 bg-transparent outline-none text-white/90 text-[13px] placeholder:text-[#6b7d93] min-w-0"
            />
          </div>
          <button onClick={handleGenerate} className="shrink-0 bg-[#6fe2ff] hover:bg-[#8ce8ff] text-black font-bold text-[13px] px-5 py-2 rounded-[9px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(111,226,255,0.6)] transition">
            ✨ Generate
          </button>
        </div>

        {/* 3 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          
          {/* Upload */}
          <div className="bg-[#101725] border border-[#1e334d]/80 rounded-[12px] p-4 flex flex-col min-h-[420px]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#0d1525] border border-[#2a4566] flex items-center justify-center">📤</div>
              <h3 className="font-bold text-[14px] text-white">Upload JPG PNG</h3>
            </div>
            <p className="text-[11px] text-[#7a8da3] mb-3">Drag & drop your files here</p>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={handleBrowse}
              className="flex-1 border border-dashed border-[#3a5a7a] rounded-[10px] bg-[#0a1220] flex flex-col items-center justify-center py-16 cursor-pointer hover:border-[#5de1ff]/60 transition"
            >
              <div className="flex items-center gap-2 text-[#7a8da3]">
                <div className="w-8 h-8 border border-[#4a6585] rounded-[4px] flex items-center justify-center text-[8px]">JPG</div>
                <div className="text-[11px] leading-[1.2] text-left">JPG, PNG<br/>up to 50MB</div>
              </div>
            </div>
            <input ref={fileInputRef} type="file" multiple accept=".jpg,.png,.jpeg" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <button onClick={handleBrowse} className="mt-4 w-full border border-[#4a7a9a] text-[#5de1ff] text-[13px] font-medium py-2.5 rounded-[8px] hover:bg-[#5de1ff]/10 transition">Browse Files</button>
          </div>

          {/* Preview */}
          <div className="bg-[#101725] border border-[#1e334d]/80 rounded-[12px] p-4 flex flex-col min-h-[420px]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[8px] bg-[#0d1525] border border-[#2a4566] flex items-center justify-center">〰️</div>
              <h3 className="font-bold text-[14px] text-white">Preview SVG Vector</h3>
            </div>
            <div className={`relative bg-[#080e1a] rounded-[10px] border border-[#1a2d45] overflow-hidden flex-1 flex items-center justify-center p-2 ${showGrid ? 'bg-[linear-gradient(#1a2d45_1px,transparent_1px),linear-gradient(90deg,#1a2d45_1px,transparent_1px)] bg-[size:20px_20px]' : ''}`}>
              <div style={{ transform: `scale(${zoom/100})` }} className="transition-transform duration-200">
                <Image
                  src="/studios/vector-studio/wolf.jpg"
                  alt="wolf wireframe"
                  width={500}
                  height={350}
                  className="max-w-full h-auto object-contain"
                  priority
                  onError={() => console.log("wolf.jpg not found, checking /public/wolf.png")}
                />
              </div>
            </div>
            <p className="text-center text-[#5de1ff] text-[11px] font-semibold mt-3">wolf_wireframe_final.svg</p>
            <div className="flex justify-center mt-2">
              <span className="bg-[#1a2638] text-[#7a8da3] text-[10px] px-2.5 py-1 rounded-[6px]">SVG • 24.6 KB • 1200x1200</span>
            </div>
            <div className="flex gap-2 mt-3 justify-center">
              <button onClick={() => setZoom(z => z === 100 ? 150 : z === 150 ? 75 : 100)} className="bg-[#0d1525] border border-[#2a3d55] px-2.5 py-1 rounded-[6px] text-[11px] text-[#a0b3c7] hover:border-[#5de1ff]">› Zoom: {zoom}%</button>
              <button onClick={() => setShowGrid(!showGrid)} className={`border px-2.5 py-1 rounded-[6px] text-[11px] transition ${showGrid ? 'bg-[#5de1ff]/20 border-[#5de1ff] text-[#5de1ff]' : 'bg-[#0d1525] border-[#2a3d55] text-[#a0b3c7] hover:border-[#5de1ff]'}`}>⊞ Toggle Grid</button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-[#101725] border border-[#1e334d]/80 rounded-[12px] p-4 flex flex-col min-h-[420px]">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-[8px] bg-[#0d1525] border border-[#2a4566] flex items-center justify-center">⚙️</div>
              <h3 className="font-bold text-[14px] text-white">Output Settings</h3>
            </div>
            <h4 className="font-bold text-[13px] mb-4 text-white">Batch Queue</h4>
            <div className="space-y-3 text-[11px] mb-4">
              <div className="flex justify-between items-center"><span className="text-[#7a8da3]">Format:</span><button onClick={() => setFormat(f => f === "SVG Vector" ? "PNG" : "SVG Vector")} className="text-white font-medium flex items-center gap-1 hover:text-[#5de1ff]">{format} <span className="text-[#5de1ff] text-[10px]">⌄</span></button></div>
              <div className="flex justify-between items-center"><span className="text-[#7a8da3]">Quality:</span><button onClick={() => setQuality(q => q === "High (Precision)" ? "Standard" : "High (Precision)")} className="text-white font-medium flex items-center gap-1 hover:text-[#5de1ff]">{quality} <span className="text-[#5de1ff] text-[10px]">✓</span></button></div>
              <div className="flex justify-between items-center"><span className="text-[#7a8da3]">Scale:</span><span className="text-white font-bold">2x Resize</span><button onClick={() => setScale2x(!scale2x)} className={`w-9 h-5 rounded-full p-0.5 transition ${scale2x ? 'bg-[#5de1ff]' : 'bg-[#2a3d55]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${scale2x ? 'translate-x-4' : ''}`}></div></button></div>
              <div className="flex justify-between"><span className="text-[#7a8da3]">Queue:</span><span className="text-[#7a8da3]">{queue.length} files pending</span></div>
            </div>
            <div className="space-y-2 mb-4">
              {queue.slice(0,2).map(f => (
                <div key={f.id} className="bg-[#0a1220] rounded-[6px] px-2.5 py-2 flex justify-between items-center text-[10px] text-[#7a8da3]">
                  <span>≡ {f.name} — {f.status}</span><button onClick={() => setQueue(q => q.filter(x => x.id !== f.id))} className="hover:text-white">◉</button>
                </div>
              ))}
            </div>
            <button onClick={handleExport} className="mt-auto w-full bg-[#6fe2ff] hover:bg-[#8ce8ff] text-black font-bold text-[13px] py-3 rounded-[9px] shadow-[0_0_15px_rgba(111,226,255,0.4)] transition">Run Batch Export</button>
          </div>
        </div>

        {/* AI BAR */}
        <div className="bg-[#101725] border border-[#1e334d]/80 rounded-[12px] px-3 py-3 flex flex-col md:flex-row items-center gap-3 mb-5">
          <div className="flex items-center gap-3 flex-1 w-full">
            <div className="w-10 h-10 rounded-[10px] bg-[#0d1525] border border-[#2a4566] flex items-center justify-center text-[16px]">🧠</div>
            <div>
              <p className="text-[#5de1ff] font-bold text-[13px]">AI is generating vectors... {progress}%</p>
              <p className="text-[#6b7d93] text-[10px] mt-0.5">— Cleaning edges — Removing background — Optimizing paths</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-[60%]">
            <div className="flex-1 h-[14px] bg-[#080e1a] rounded-full border border-[#1a2d45] p-1">
              <div className="h-full bg-[#5de1ff] rounded-full shadow-[0_0_10px_#5de1ff] transition-all duration-100" style={{width: `${progress}%`}}></div>
            </div>
            <div className="text-right leading-none">
              <p className="text-[#5de1ff]/70 text-[10px]">68/100 processing</p>
              <button onClick={() => setIsGenerating(!isGenerating)} className="text-[#5de1ff] text-[14px] hover:rotate-180 transition-transform">↻</button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1e334d]/40">
          {[
            { label: "Files Processed", value: "1,247", sub: "+84 today", color: "text-[#4ade80]" },
            { label: "Time Saved", value: "14.2h", sub: "≈ 3.5h this week" },
            { label: "Accuracy", value: "98.7%", sub: "Vector precision" },
            { label: "Storage Used", value: "2.4GB / 10GB", sub: "24%" },
          ].map((s,i) => (
            <div key={i} className="px-2 py-2 text-center">
              <p className="text-[#8a9bb0] text-[11px] font-medium">{s.label}</p>
              <p className="text-[#5de1ff] text-[26px] font-bold leading-none mt-2">{s.value}</p>
              <div className="mt-2 flex justify-center">
                <span className="bg-[#1a2638] text-[10px] px-2 py-1 rounded-[6px] text-[#7a8da3] flex items-center gap-1">
                  {s.label === "Files Processed" && <span className={s.color}>↗ {s.sub}</span>}
                  {s.label !== "Files Processed" && s.sub}
                  {s.label === "Storage Used" && <span className="ml-1 text-[#5de1ff]">▮▮▮</span>}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}