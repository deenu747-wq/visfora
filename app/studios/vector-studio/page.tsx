"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function VectorStudioRectified() {
  const [prompt, setPrompt] = useState("")
  const [progress, setProgress] = useState(0)
  const [batchProgress, setBatchProgress] = useState(0)
  const [isGen, setIsGen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [zoom, setZoom] = useState(120)
  const [wireframe, setWireframe] = useState(true)
  const [detail, setDetail] = useState(80)
  const [colorCount, setColorCount] = useState(16)
  const [smoothing, setSmoothing] = useState(0.75)
  const [lineArt, setLineArt] = useState(true)
  const [logoMode, setLogoMode] = useState(true)
  const [formats, setFormats] = useState({ SVG:true, EPS:true, AI:true, PDF:false, CDR:false, PNG:false })
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(!isGen || isPaused) return
    const t = setInterval(()=> {
      setProgress(p=> {
        if(p>=100){ setIsGen(false); return 100 }
        return p+1
      })
      setBatchProgress(p=> p>=100?100:p+0.5)
    }, 80)
    return ()=> clearInterval(t)
  }, [isGen, isPaused])

  const handleGenerate = () => {
    if(!prompt.trim()){ alert('Enter prompt'); return }
    setIsGen(true); setIsPaused(false); setProgress(0); setBatchProgress(0)
  }
  const handleFiles = (files: FileList | null) => {
    if(!files || files.length===0) return
    setIsGen(true); setIsPaused(false); setProgress(0); setBatchProgress(0)
    alert(`${files.length} file(s) selected`)
  }

  return (
    <div className="min-h-screen bg-[#070d18] text-white">
      {/* HEADER WITH VISFORA LOGO - SAME AS PHOTO STUDIO PAGE SIZE */}
      <header className="flex justify-between items-center px-6 py-3 border-b border-[#1a2a3f] bg-[#070d18] sticky top-0 z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>alert('Visfora Home')}>
          {/* Visfora logo same as photo studio - 24px bold */}
          <span className="font-black text-[24px] tracking-tight">Visfora</span>
          <span className="text-[#5de1ff] text-[22px] ml-3">✦◭</span>
          <span className="font-bold text-[18px]">Vector Studio</span>
        </div>
        <nav className="hidden md:flex gap-2">
          <button className="px-5 py-2 text-white border-b-2 border-[#5de1ff] text-[14px]">Dashboard</button>
          <button onClick={()=>alert('Projects')} className="px-5 py-2 rounded-lg bg-[#2a3548] text-[#9ab0c7] text-[14px]">Projects</button>
          <button onClick={()=>alert('Batch')} className="px-5 py-2 rounded-lg bg-[#2a3548] text-[#9ab0c7] text-[14px]">Batch</button>
          <button onClick={()=>alert('Settings')} className="px-5 py-2 rounded-lg bg-[#2a3548] text-[#9ab0c7] text-[14px]">Settings</button>
        </nav>
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#1a2536] border border-[#5de1ff] text-[#5de1ff] flex items-center justify-center font-bold text-[12px]">JD</span>
        </div>
      </header>

      {/* TITLE */}
      <div className="text-center pt-5">
        <h1 className="text-[30px] md:text-[34px] font-bold">Turn any image into a clean scalable vector in seconds</h1>
        <p className="text-[#7a8faa] text-[14px] mt-1">Upload • preview • export</p>
      </div>

      {/* PROMPT BAR */}
      <div className="max-w-[1500px] mx-auto px-6 mt-4">
        <div className="bg-[#0e1626] border border-[#5de1ff]/70 rounded-[14px] px-4 py-3 flex gap-3 items-center">
          <span className="text-[#5de1ff] font-bold text-[14px] shrink-0">✦ Text to Vector Prompt</span>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your vector • e.g. minimal geometric wolf head, neon cyan wireframe" className="flex-1 bg-[#1a2335] border border-[#2a3a52] rounded-lg px-4 py-2.5 text-[13px] outline-none focus:border-[#5de1ff]" />
          <button onClick={handleGenerate} className="bg-[#5de1ff] text-black font-bold px-8 py-2.5 rounded-xl text-[14px]">✦ Generate</button>
        </div>
      </div>

      {/* MAIN 3 COL LAYOUT: LEFT TOOLS | MIDDLE 2 FRAMES | RIGHT OUTPUT */}
      <div className="max-w-[1500px] mx-auto px-6 mt-4 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] gap-5">

        {/* 1. LEFT - TOOLS / CTAs */}
        <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-4 h-fit">
          <h3 className="font-bold text-[16px]">Tools & Actions</h3>
          <div className="mt-4 space-y-2">
            <button onClick={()=>alert('Remove BG')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg text-[13px]">✂️ Remove Background</button>
            <button onClick={()=>alert('Clean Edges')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg text-[13px]">✓ Clean Edges</button>
            <button onClick={()=>alert('Optimize Paths')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg text-[13px]">◈ Optimize Paths</button>
            <button onClick={()=>alert('Batch Upload')} className="w-full text-left bg-[#0d2a35] border border-[#5de1ff] text-[#5de1ff] px-3 py-2.5 rounded-lg text-[13px]">📦 Batch 100x Queue</button>
          </div>
          <div className="mt-6">
            <p className="text-[13px] font-bold">Vector Quality</p>
            <div className="mt-3 space-y-3 text-[11px]">
              <div className="flex justify-between">Detail Level <input type="range" value={detail} onChange={e=>setDetail(Number(e.target.value))} className="accent-[#5de1ff] w-24" /></div>
              <div className="flex justify-between">Color Count <span className="bg-[#1a2a40] px-2 rounded">{colorCount}</span></div>
              <input type="range" min={1} max={64} value={colorCount} onChange={e=>setColorCount(Number(e.target.value))} className="w-full accent-[#5de1ff]" />
              <div className="flex justify-between">Path Smoothing <span>{smoothing}</span></div>
              <input type="range" min={0} max={1} step={0.01} value={smoothing} onChange={e=>setSmoothing(Number(e.target.value))} className="w-full accent-[#5de1ff]" />
              <div className="flex justify-between items-center mt-2"><span>Line Art</span><button onClick={()=>setLineArt(!lineArt)} className={`w-9 h-5 rounded-full ${lineArt?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${lineArt?'translate-x-4':''}`}></div></button></div>
              <div className="flex justify-between items-center"><span>Logo Mode</span><button onClick={()=>setLogoMode(!logoMode)} className={`w-9 h-5 rounded-full ${logoMode?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${logoMode?'translate-x-4':''}`}></div></button></div>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE - TWO FRAMES: UPLOAD + PREVIEW */}
        <div className="space-y-5">
          {/* Upload Frame */}
          <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-5">
            <p className="font-bold flex items-center gap-2">📤 Upload JPG / PNG</p>
            <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault(); handleFiles(e.dataTransfer.files)}} onClick={()=>fileRef.current?.click()} className="mt-4 border border-dashed border-[#5de1ff]/60 rounded-[16px] bg-[#0a1322] p-10 flex flex-col items-center text-center cursor-pointer hover:border-[#5de1ff]">
              <div className="text-[40px] text-[#5de1ff]">☁️</div>
              <p className="mt-3 text-[14px]">Drag & drop your image here or browse files</p>
              <p className="text-[12px] text-[#7a8faa] mt-2">Supports JPG • PNG • Max 50MB</p>
              <button className="mt-4 border border-[#5de1ff] px-5 py-2 rounded-lg text-[13px]">Choose File</button>
            </div>
            <input ref={fileRef} type="file" hidden onChange={e=>handleFiles(e.target.files)} />
          </div>

          {/* Preview Frame */}
          <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-5">
            <div className="flex justify-between items-center">
              <p className="font-bold">👁️ Preview • SVG Vector</p>
              <div className="flex items-center gap-2 text-[11px]"><span>Wireframe</span><button onClick={()=>setWireframe(!wireframe)} className={`w-9 h-5 rounded-full ${wireframe?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${wireframe?'translate-x-4':''}`}></div></button></div>
            </div>
            <div className="bg-[#090f1c] rounded-xl mt-3 p-6 flex items-center justify-center min-h-[340px]">
              <div style={{transform:`scale(${zoom/100})`}} className="transition-transform">
                <Image src="/studios/vector-studio/wolf.jpg" alt="wolf" width={340} height={340} className="w-[320px]" style={{filter: wireframe ? 'invert(1) hue-rotate(180deg) brightness(1.2) sepia(1) hue-rotate(150deg) saturate(4)' : 'none'}} />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[13px]">Zoom {zoom}%</span>
              <button onClick={()=>alert('SVG Downloaded')} className="bg-[#5de1ff] text-black font-bold px-5 py-2 rounded-lg text-[13px]">⬇ Download SVG</button>
            </div>
          </div>
        </div>

        {/* 3. RIGHT - OUTPUT & SETTINGS */}
        <div className="bg-[#0f1828] border border-[#1e2f45] rounded-[16px] p-4 h-fit">
          <h3 className="font-bold text-[16px] flex justify-between">Output & Settings <span className="text-[#5de1ff]">✦</span></h3>
          <p className="font-bold text-[13px] mt-4">Output Formats</p>
          <div className="mt-2 space-y-2 text-[12px]">
            {Object.entries(formats).map(([k,v])=>(
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={v as boolean} onChange={()=>setFormats(f=>({...f,[k]:!f[k as keyof typeof formats]}))} className="accent-[#5de1ff]" />
                {k}
              </label>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-bold text-[13px]">Batch 100x Queue</p>
            <div className="mt-2 h-1.5 bg-[#0a1322] rounded-full overflow-hidden"><div className="h-full bg-[#5de1ff] transition-all" style={{width:`${batchProgress}%`}}></div></div>
            <p className="text-[11px] text-[#7a8faa] mt-1">{batchProgress}% Completed: {Math.round(batchProgress)} • Failed: 0</p>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={()=>{setIsPaused(!isPaused); alert(isPaused?'Resumed':'Paused')}} className="flex-1 bg-[#5de1ff] text-black font-bold py-2.5 rounded-lg text-[13px]">{isPaused?'Resume':'Export All'}</button>
            <button onClick={()=>alert('ZIP Downloaded')} className="flex-1 border border-[#2a3a52] py-2.5 rounded-lg text-[13px]">Download ZIP</button>
          </div>
        </div>

      </div>

      {/* AI BAR - ONLY SHOW WHEN GENERATING */}
      {isGen && (
        <div className="max-w-[1500px] mx-auto px-6 mt-5">
          <div className="bg-[#111a2a] border border-[#5de1ff]/60 rounded-[14px] px-4 py-3 flex gap-4 items-center">
            <span className="text-[#5de1ff] font-bold text-[13px]">AI✦ AI is generating vectors — {progress}%</span>
            <div className="flex-1 h-1.5 bg-[#0a1322] rounded-full overflow-hidden"><div className="h-full bg-[#5de1ff] transition-all" style={{width:`${progress}%`}}></div></div>
            <span className="text-[11px] text-[#7a8faa]">{progress}/100</span>
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-[#1a2a3f] bg-[#0e1623] py-3 flex justify-center gap-12 md:gap-32 text-[12px]">
        <span>Completed today: 312</span><span>Avg processing: 1.2s</span><span>Credits: 2450</span>
      </div>
    </div>
  )
}