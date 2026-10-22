// app/studios/motion-studio/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const motions = [
  { id: 1, title: "Logo Reveal", tag: "Intro • 4K", type: "Intro", time: "Used 30m ago", duration: "0:08", img: "https://images.unsplash.com/photo-1626785774573-6dd65b279390?w=400" },
  { id: 2, title: "Glitch Transition", tag: "Transition • 4K", type: "Transition", time: "Used 2h ago", duration: "0:05", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" },
  { id: 3, title: "Kinetic Text", tag: "Text • 4K", type: "Text", time: "Used 5h ago", duration: "0:12", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400" },
  { id: 4, title: "Particle Explosion", tag: "FX • 4K", type: "FX", time: "Used 1d ago", duration: "0:06", img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400" },
  { id: 5, title: "Camera Zoom", tag: "Camera • 4K", type: "Camera", time: "Used 2d ago", duration: "0:10", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400" },
  { id: 6, title: "Liquid Motion", tag: "FX • 4K", type: "FX", time: "Used 3d ago", duration: "0:07", img: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400" },
  { id: 7, title: "Slide Reveal", tag: "Transition • 4K", type: "Transition", time: "Used 1w ago", duration: "0:09", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
  { id: 8, title: "Neon Stroke", tag: "Text • 4K", type: "Text", time: "Used 1w ago", duration: "0:11", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400" },
]

export default function MotionStudio() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [showMenu, setShowMenu] = useState<number | null>(null)
  const [preview, setPreview] = useState<number | null>(null)
  const router = useRouter()

  const filtered = motions.filter(t => {
    const s = t.title.toLowerCase().includes(search.toLowerCase())
    const f = filter === "All" || t.type === filter
    return s && f
  })

  return (
    <div className="min-h-screen bg-[#1a1a23] text-white flex flex-col">
      {/* HEADER - Logo public/Logo.png 80px double - CLICKABLE */}
      <header className="h-[80px] bg-[#1a1a23] border-b border-[#2a2a35] flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <img src="/Logo.png" alt="Visfora" className="w-[80px] h-[80px] object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          </Link>
          <h1 className="text-[42px] font-black text-[#22d3ee] tracking-tight ml-4">Motion Studio</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search motion..." className="w-[260px] h-[40px] bg-[#242430] border border-[#22d3ee]/30 rounded-full px-12 text-[14px] outline-none focus:border-[#22d3ee] cursor-text" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22d3ee] pointer-events-none">🔍</span>
          </div>
          <button onClick={()=>router.push('/notifications')} className="w-10 h-10 rounded-full bg-[#242430] hover:bg-[#2a2a35] cursor-pointer flex items-center justify-center text-[20px]">🔔</button>
          <button onClick={()=>alert('Help: Motion Studio Docs')} className="w-10 h-10 rounded-full bg-[#242430] hover:bg-[#2a2a35] cursor-pointer flex items-center justify-center text-[20px]">?</button>
          <button onClick={()=>router.push('/profile')} className="w-10 h-10 rounded-full bg-[#22d3ee] text-[#1a1a23] font-bold cursor-pointer">JD</button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[240px] bg-[#1e1e26] border-r border-[#2a2a35] p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[12px] text-[#22d3ee] bg-[#22d3ee]/10 px-3 py-1 rounded-full w-fit mb-6 font-bold tracking-widest">WORKSPACE</p>
            {[
              { icon: "📁", label: "Project", path: "/studios/template-studio" },
              { icon: "🎬", label: "Motion", path: "/studios/motion-studio", active: true },
              { icon: "📦", label: "Assets", path: "/studios/assets" },
              { icon: "📚", label: "Scene", path: "/studios/scene" },
              { icon: "▶️", label: "Render", path: "/studios/render" },
              { icon: "⚙️", label: "Settings", path: "/settings" },
            ].map(item => (
              <button key={item.label} onClick={()=>router.push(item.path)} className={`w-full h-[48px] flex items-center gap-4 px-4 rounded-[10px] text-[18px] font-medium cursor-pointer ${item.active ? "bg-[#22d3ee] text-[#1a1a23]" : "text-[#a0a0b0] hover:bg-[#2a2a35] hover:text-white"}`}>
                <span className="text-[20px]">{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
          <button onClick={()=>alert('All motion files synced')} className="text-[13px] text-[#6a6a7a] flex items-center gap-2 cursor-pointer hover:text-white">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online • Synced
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-[26px] font-bold">Motion Gallery</h2>
                <div className="flex gap-2">
                  {["All","Intro","Transition","Text","FX","Camera"].map(f => (
                    <button key={f} onClick={()=>setFilter(f)} className={`h-[32px] px-4 rounded-full text-[13px] font-bold cursor-pointer ${filter===f ? "bg-[#22d3ee] text-[#1a1a23]" : "bg-[#242430] text-[#8a8a95] hover:bg-[#2a2a35] hover:text-white"}`}>{f}</button>
                  ))}
                </div>
              </div>
              <p className="text-[14px] text-[#8a8a95] mt-2">Cinematic motion presets — {filtered.length} clips • Hover to preview</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>alert('Timeline View')} className="h-[36px] px-4 bg-[#242430] border border-[#2a2a35] rounded-full text-[13px] cursor-pointer hover:bg-[#2a2a35]">Timeline ▼</button>
              <button onClick={()=>router.push('/studios/motion-studio/new')} className="h-[44px] px-6 bg-[#22d3ee] text-[#1a1a23] rounded-[10px] font-bold text-[16px] hover:bg-[#06b6d4] cursor-pointer">+ New Motion</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {filtered.map(t => (
              <div key={t.id} className="group bg-[#242430] border border-[#22d3ee]/20 rounded-[16px] p-4 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] relative"
                onMouseEnter={()=>setPreview(t.id)} onMouseLeave={()=>setPreview(null)}
              >
                <Link href={`/studios/motion-studio/${t.id}`} className="cursor-pointer">
                  <div className="relative">
                    <img src={t.img} className="w-full h-[140px] object-cover rounded-[10px]" alt={t.title} />
                    <div className="absolute inset-0 bg-black/40 rounded-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-10 h-10 bg-[#22d3ee] rounded-full flex items-center justify-center text-[#1a1a23] font-black">▶</span>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[11px] font-bold">{t.duration}</span>
                    {preview===t.id && <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                  </div>
                  <h3 className="text-[16px] font-bold mt-4 group-hover:text-[#22d3ee]">{t.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-[#22d3ee] text-[#1a1a23] text-[11px] font-bold rounded-full">{t.tag.toUpperCase()}</span>
                    <p className="text-[13px] text-[#8a8a95]">{t.time}</p>
                  </div>
                </Link>
                <button onClick={()=>setShowMenu(showMenu===t.id?null:t.id)} className="absolute top-6 right-6 w-7 h-7 bg-black/60 rounded-full text-white hover:bg-black/80 cursor-pointer flex items-center justify-center">•••</button>
                {showMenu===t.id && (
                  <div className="absolute top-14 right-6 bg-[#1e1e26] border border-[#2a2a35] rounded-[10px] p-2 w-[150px] z-10 shadow-xl">
                    <button onClick={()=>{alert(`Play ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#2a2a35] rounded cursor-pointer">▶ Play Preview</button>
                    <button onClick={()=>{alert(`Duplicate ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#2a2a35] rounded cursor-pointer">Duplicate</button>
                    <button onClick={()=>{alert(`Export ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#2a2a35] rounded cursor-pointer">Export</button>
                    <button onClick={()=>{alert(`Delete ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 rounded cursor-pointer">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#6a6a7a] mt-8">Showing {filtered.length} of 8 motions • All buttons enabled • Hover to preview</p>
        </main>
      </div>
    </div>
  )
}