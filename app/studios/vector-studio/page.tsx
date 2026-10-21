"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function VectorStudioFinalWorking() {
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

  const handleBrowse = () => fileRef.current?.click()
  const handleDownload = (type: string) => alert(`${type} downloading... wolf_wireframe_final.svg`)
  const handleExportAll = () => alert('Exporting All 100 items as ZIP... Batch 100x queue active')
  const handleGenerate = () => {
    if(!prompt.trim()){ alert('Enter prompt: e.g. minimal geometric wolf head, neon cyan wireframe'); return }
    setIsGen(true); setIsPaused(false); setProgress(0); setBatchProgress(0); 
  }
  const handleFiles = (files: FileList | null) => {
    if(!files || !files.length) return
    setIsGen(true); setIsPaused(false); setProgress(0); setBatchProgress(0);
    alert(`${files.length} files selected`)
  }
  const toggleFormat = (key: keyof typeof formats) => setFormats(f=>({...f, [key]:!f[key]}))

  return (
    <div className="min-h-screen bg-[#070d18] text-white selection:bg-[#5de1ff]/30">
      {/* HEADER - Point 1: DOUBLE SIZE */}
      <header className="flex justify-between items-center px-6 py-2 border-b border-[#1a2a3f]/80 sticky top-0 bg-[#070d18]/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo.png" alt="VISFORA" width={560} height={120} className="h-[84px] w-auto object-contain cursor-pointer" priority unoptimized />
            <span className="font-bold text-[32px]">Vector Studio</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-2">
          {['Dashboard','Projects','Batch','Settings'].map(n=>(
            <button key={n} onClick={()=>alert(`${n} clicked`)} className={`px-5 py-2 rounded-lg text-[15px] font-medium transition ${n==='Dashboard'?'bg-transparent text-white border-b-2 border-[#5de1ff] rounded-none pb-1':'bg-[#2a3548] text-[#9ab0c7] hover:text-white'}`}>{n}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={()=>alert('Notifications')} className="text-[20px] text-[#7a8faa] hover:text-white">🔔</button>
          <button onClick={()=>alert('Profile JD')} className="w-8 h-8 rounded-full bg-[#1a2536] border border-[#5de1ff] text-[#5de1ff] font-bold text-[13px]">JD</button>
        </div>
      </header>

      <div className="text-center px-4 pt-6">
        <h1 className="text-[30px] md:text-[36px] font-bold leading-tight">Turn any image into a clean scalable vector in seconds</h1>
        <p className="text-[#7a8faa] text-[15px] mt-2">Upload • preview • export</p>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 mt-4">
        <div className="bg-[#0e1626] border border-[#5de1ff]/70 rounded-[16px] px-4 py-3 flex flex-col md:flex-row gap-3 items-center shadow-[0_0_25px_rgba(93,225,255,0.15)]">
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-[#1a2d40] text-[#5de1ff] text-[11px] px-2 py-1 rounded-md">Prompt Method</span>
            <span className="text-[#5de1ff] font-bold text-[16px]">✦ Text to Vector Prompt</span>
          </div>
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your vector • e.g. minimal geometric wolf head, neon cyan wireframe, clean lines" className="flex-1 bg-[#1a2335] border border-[#2a3a52] rounded-lg px-4 py-2.5 text-[13px] w-full outline-none focus:border-[#5de1ff] text-white placeholder:text-[#6a8099]" />
          <button onClick={handleGenerate} className="bg-[#5de1ff] hover:bg-[#7ae8ff] text-black font-bold px-8 py-2.5 rounded-xl text-[15px] shadow-[0_0_12px_#5de1ff]">✦ Generate</button>
        </div>
      </div>

      {/* MAIN LAYOUT - Point 2: Expand Output & Settings to bottom, align with left tools */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 mt-4 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] gap-5 items-stretch">
        
        {/* LEFT - h-full for alignment */}
        <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-4 flex flex-col h-full self-stretch">
          <h3 className="font-bold text-[16px]">Tools & CTAs</h3>
          <div className="mt-4 space-y-2 text-[13px]">
            <button onClick={()=>alert('Remove Background toggled')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg">✂️ Remove Background</button>
            <button onClick={()=>alert('Cleaning edges')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg">✓ Cleaning edges</button>
            <button onClick={()=>alert('Optimizing paths')} className="w-full text-left bg-[#1a2335] hover:bg-[#1f2e48] px-3 py-2.5 rounded-lg">◈ Optimizing paths</button>
            <button onClick={()=>alert('Batch 100x Queue')} className="w-full text-left bg-[#0d2a35] border border-[#5de1ff] text-[#5de1ff] px-3 py-2.5 rounded-lg">📦 Batch 100x Queue • Active</button>
          </div>

          <div className="mt-6">
            <p className="font-bold text-[14px]">Vector Quality Settings</p>
            <div className="mt-3 space-y-4 text-[12px]">
              <div className="flex items-center gap-3"><span className="w-28">Detail Level:</span><span className="w-12">High</span><input type="range" min={0} max={100} value={detail} onChange={e=>setDetail(Number(e.target.value))} className="flex-1 accent-[#5de1ff]" /></div>
              <div className="flex items-center gap-3"><span className="w-28">Color Count:</span><span className="w-12">{colorCount}</span><input type="range" min={1} max={64} value={colorCount} onChange={e=>setColorCount(Number(e.target.value))} className="flex-1 accent-[#5de1ff]" /><span className="text-[10px] border border-[#2a3a52] px-2 py-0.5 rounded">16 colors</span></div>
              <div className="flex items-center gap-3"><span className="w-28">Path Smoothing:</span><span className="w-12">{smoothing}</span><input type="range" min={0} max={1} step={0.01} value={smoothing} onChange={e=>setSmoothing(Number(e.target.value))} className="flex-1 accent-[#5de1ff]" /></div>
              <div className="flex justify-between items-center"><div><p>Line Art Mode</p><p className="text-[10px] text-[#7a8faa]">Clean monochrome line art output</p></div><button onClick={()=>setLineArt(!lineArt)} className={`w-10 h-5 rounded-full p-0.5 ${lineArt?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${lineArt?'translate-x-5':''}`}></div></button></div>
              <div className="flex justify-between items-center"><div><p>Logo Vectorizer Mode</p><p className="text-[10px] text-[#7a8faa]">Optimized for logos • sharp edges</p></div><button onClick={()=>setLogoMode(!logoMode)} className={`w-10 h-5 rounded-full p-0.5 ${logoMode?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${logoMode?'translate-x-5':''}`}></div></button></div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/* CENTER - Point 4: Same frame style + Upload CTA moved down */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full self-stretch">
          {/* Upload Frame */}
          <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-5 flex flex-col min-h-[600px] h-full">
            <div className="flex items-center gap-2 text-[18px] font-bold"><span className="text-[#5de1ff]">📤</span> Upload JPG / PNG</div>
            {/* SAME FRAME as preview: bg-[#090f1c] rounded-xl */}
            <div className="mt-5 flex-1 bg-[#090f1c] rounded-xl p-6 flex flex-col items-center justify-center min-h-[460px] border border-[#1e2f45]">
              <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault(); handleFiles(e.dataTransfer.files)}} onClick={handleBrowse} className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer w-full">
                <div className="text-[#5de1ff] text-[60px]">☁️</div>
                <p className="font-medium mt-4 text-[16px]">Drag & drop your image here<br/>or browse files</p>
                <p className="text-[13px] text-[#7a8faa] mt-4">Supports JPG • PNG • Max 50MB</p>
              </div>
              {/* CTA MOVED DOWN as per your green mark */}
              <button onClick={(e)=>{e.stopPropagation(); handleBrowse()}} className="mt-auto border border-[#5de1ff]/60 text-white px-10 py-2.5 rounded-lg text-[14px] hover:bg-[#5de1ff]/10">Upload</button>
            </div>
            <input ref={fileRef} type="file" hidden multiple onChange={e=>handleFiles(e.target.files)} />
          </div>

          {/* Preview Frame - Point 3: Image fix */}
          <div className="bg-[#111a2a] border border-[#1e2f45] rounded-[16px] p-5 flex flex-col min-h-[600px] h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[18px] font-bold"><span className="text-[#5de1ff]">👁️</span> Preview • SVG Vector</div>
              <div className="flex items-center gap-2 text-[12px]"><span>Wireframe</span><button onClick={()=>setWireframe(!wireframe)} className={`w-10 h-5 rounded-full p-0.5 transition ${wireframe?'bg-[#5de1ff]':'bg-[#2a3a52]'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${wireframe?'translate-x-5':''}`}></div></button></div>
            </div>
            <div className="flex gap-2 mt-3 text-[11px] flex-wrap">
              <span className="bg-[#1a283e] px-2 py-1 rounded">Layers:</span>
              <button onClick={()=>alert('Outline toggled')} className="bg-[#1a283e] px-2 py-1 rounded">Outline | Details</button>
              <button onClick={()=>alert('Background removed toggled')} className="bg-[#1a283e] px-2 py-1 rounded border border-[#2a3a52]">Background removed</button>
            </div>
            {/* SAME FRAME */}
            <div className="flex-1 bg-[#090f1c] rounded-xl mt-3 p-6 flex items-center justify-center min-h-[460px] border border-[#1e2f45]">
              <div style={{transform:`scale(${zoom/100})`}} className="transition-transform">
                {/* FIX: Use correct public path + unoptimized - THIS IS WHY NO IMAGE */}
                <Image 
                  src="/studios/vector-studio/wolf.png" 
                  alt="wolf" 
                  width={380} 
                  height={380} 
                  className="w-[340px] h-auto" 
                  style={{filter: wireframe ? 'invert(1) hue-rotate(180deg) brightness(1.2) sepia(1) hue-rotate(150deg) saturate(4)':'none'}} 
                  priority 
                  unoptimized 
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2 text-[14px]"><button onClick={()=>setZoom(z=>Math.max(50,z-10))} className="text-[#5de1ff]">Q</button>Zoom {zoom}%<button onClick={()=>setZoom(z=>Math.min(200,z+10))} className="text-[#5de1ff]">+</button></div>
              <button onClick={()=>handleDownload('SVG')} className="bg-[#5de1ff] text-black font-bold px-5 py-2 rounded-lg text-[14px]">⬇ Download SVG</button>
            </div>
            <p className="text-[12px] text-[#7a8faa] mt-2 text-center">Processing {progress}/100 • Est {isGen?'1m 23s':'0s'}</p>
          </div>
        </div>

        {/* RIGHT - Point 2: Expand to bottom line */}
        <div className="bg-[#0f1828] border border-[#1e2f45] rounded-[16px] p-4 flex flex-col h-full self-stretch min-h-[600px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2"><button onClick={()=>alert('Notifications')} className="text-[#7a8faa]">🔔</button><button onClick={()=>alert('Settings')} className="text-[#7a8faa]">⚙️</button><span className="w-7 h-7 rounded-full bg-[#1a283e] border border-[#5de1ff] text-[#5de1ff] flex items-center justify-center text-[11px] font-bold">JD</span><span className="text-[11px] border border-[#2a3a52] px-2 py-0.5 rounded">PRO • Annual</span><span className="text-[10px] bg-[#0d2a35] border border-[#5de1ff] text-[#5de1ff] px-2 py-0.5 rounded">● Batch 100x Queue • Active</span></div>
          </div>
          <h3 className="font-bold text-[18px] mt-4 flex justify-between">Output & Settings <span className="text-[#5de1ff]">✦</span></h3>
          <p className="font-bold text-[14px] mt-3">Output Formats</p>
          <div className="mt-2 space-y-1.5 text-[12px]">
            {[
              {k:'SVG', label:'Scalable Vector Graphic', rec:true},
              {k:'EPS', label:'Encapsulated PostScript'},
              {k:'AI', label:'Adobe Illustrator'},
              {k:'PDF', label:'Portable Document Format'},
              {k:'CDR', label:'CorelDRAW'},
              {k:'PNG', label:'Raster Export'},
            ].map((f:any)=>(
              <label key={f.k} className="flex items-center gap-2 cursor-pointer hover:text-[#5de1ff]">
                <input type="checkbox" checked={formats[f.k as keyof typeof formats]} onChange={()=>toggleFormat(f.k)} className="accent-[#5de1ff] w-4 h-4" />
                <span className="font-bold w-8">{f.k}</span><span className="text-[#9ab0c7] flex-1">{f.label}</span>
                {f.rec && <span className="text-[10px] bg-[#1a3a4a] text-[#5de1ff] px-2 py-0.5 rounded">recommended</span>}
                {f.k==='PNG' && <button onClick={()=>alert('Raster settings')} className="ml-auto text-[#7a8faa]">⚙️</button>}
              </label>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-bold text-[14px]">Batch 100x Queue</p>
            <p className="text-[12px] text-[#9ab0c7] mt-1">100 / 100 queued • ~12s remaining</p>
            <div className="mt-2 h-1.5 bg-[#0a1322] rounded-full overflow-hidden flex"><div className="h-full bg-[#5de1ff] transition-all" style={{width:`${batchProgress}%`}}></div><span className="ml-2 text-[11px] text-[#5de1ff] -mt-1">{Math.round(batchProgress)}%</span></div>
            <p className="text-[11px] text-[#7a8faa] mt-1">Completed: 98 • Failed: 0</p>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleExportAll} className="flex-1 bg-[#5de1ff] hover:bg-[#7ae8ff] text-black font-bold py-2.5 rounded-lg text-[14px]">Export All</button>
            <button onClick={()=>handleDownload('ZIP')} className="flex-1 border border-[#2a3a52] text-white py-2.5 rounded-lg text-[14px] hover:border-[#5de1ff]">Download ZIP</button>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 mt-5">
        <div className="bg-[#111a2a] border border-[#5de1ff]/60 rounded-[14px] px-4 py-3 flex flex-col md:flex-row gap-4 items-center shadow-[0_0_20px_rgba(93,225,255,0.15)]">
          <div className="flex items-center gap-6 flex-1 w-full">
            <span className="text-[#5de1ff] font-bold text-[14px] flex items-center gap-1">AI✦ AI is generating vectors — {progress}%</span>
            <div className="hidden md:flex gap-6 text-[12px]"><span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#1a2d40] text-[#5de1ff] flex items-center justify-center">✓</span> Cleaning edges</span><span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#1a2d40] text-[#5de1ff] flex items-center justify-center">✓</span> Removing background</span><span className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#1a2d40] text-[#5de1ff] flex items-center justify-center">✓</span> Optimizing paths</span></div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-[35%]"><span className="text-[#5de1ff] text-[14px] font-bold">{progress}%</span><div className="flex-1 h-1.5 bg-[#0a1322] rounded-full overflow-hidden"><div className="h-full bg-[#5de1ff] transition-all" style={{width:`${progress}%`}}></div></div><span className="text-[11px] text-[#7a8faa]">{isGen?`${progress}/100 processing`:`Idle - upload or prompt to start`}</span></div>
        </div>
      </div>

      <div className="mt-5 border-t border-[#1a2a3f] bg-[#0e1623] py-3 flex flex-wrap justify-center gap-12 md:gap-32 px-4 text-[13px]">
        <button onClick={()=>alert('Today completed')} className="flex items-center gap-2 hover:text-[#5de1ff]"><span className="text-[#5de1ff]">◈</span> Completed today: <b>312</b></button>
        <button onClick={()=>alert('Processing speed')} className="flex items-center gap-2 hover:text-[#5de1ff]"><span className="text-[#5de1ff]">◷</span> Avg processing: <b>1.2s</b></button>
        <button onClick={()=>alert('Credits')} className="flex items-center gap-2 hover:text-[#5de1ff]"><span className="text-[#5de1ff]">▭</span> Credits remaining: <b>2450</b></button>
      </div>
    </div>
  )
}