// app/studios/mockup-studio/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const mockups = [
  { id: 1, title: "Phone Mockup", tag: "Device", type: "Device", time: "2h ago", img: "https://images.unsplash.com/photo-1592899677977-9bb10ba128a5?w=400" },
  { id: 2, title: "Laptop Mockup", tag: "Device", type: "Device", time: "5h ago", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 3, title: "Poster Mockup", tag: "Print", type: "Print", time: "1d ago", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400" },
  { id: 4, title: "T-Shirt Mockup", tag: "Apparel", type: "Apparel", time: "1d ago", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 5, title: "Packaging Mockup", tag: "Branding", type: "Branding", time: "3d ago", img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400" },
  { id: 6, title: "Website Mockup", tag: "Device", type: "Device", time: "4d ago", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb4?w=400" },
  { id: 7, title: "Business Card Mockup", tag: "Branding", type: "Branding", time: "5d ago", img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400" },
  { id: 8, title: "Social Post Mockup", tag: "Social", type: "Branding", time: "6d ago", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400" },
]

export default function MockupStudio() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [showMenu, setShowMenu] = useState<number | null>(null)
  const router = useRouter()

  const filtered = mockups.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "All" || t.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-[#1a1a23] text-white flex flex-col">
      <header className="h-[80px] bg-[#1a1a23] border-b border-[#2a2a35] flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <img src="/Logo.png" alt="Visfora" className="w-[80px] h-[80px] object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            </Link>
          <h1 className="text-[42px] font-black text-[#22d3ee] tracking-tight ml-4">Mockup Studio</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search mockups..." className="w-[260px] h-[40px] bg-[#242430] border border-[#22d3ee]/30 rounded-full px-12 text-[14px] outline-none focus:border-[#22d3ee] cursor-text" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22d3ee] pointer-events-none">🔍</span>
          </div>
          <button onClick={()=>router.push('/notifications')} className="w-10 h-10 rounded-full bg-[#242430] hover:bg-[#2a2a35] cursor-pointer flex items-center justify-center text-[20px]">🔔</button>
          <button onClick={()=>alert('Help Center Open')} className="w-10 h-10 rounded-full bg-[#242430] hover:bg-[#2a2a35] cursor-pointer flex items-center justify-center text-[20px]">?</button>
          <button onClick={()=>router.push('/profile')} className="w-10 h-10 rounded-full bg-[#22d3ee] text-[#1a1a23] font-bold cursor-pointer">JD</button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[240px] bg-[#1e1e26] border-r border-[#2a2a35] p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[12px] text-[#22d3ee] bg-[#22d3ee]/10 px-3 py-1 rounded-full w-fit mb-6 font-bold tracking-widest">WORKSPACE</p>
            {[
              { icon: "📁", label: "Project", path: "/studios/template-studio" },
              { icon: "🖌️", label: "Studio", path: "/studios/mockup-studio", active: true },
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
          <button onClick={()=>alert('Sync Status: All files synced')} className="text-[13px] text-[#6a6a7a] flex items-center gap-2 cursor-pointer hover:text-white">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online • Synced
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-[26px] font-bold">Mockup Gallery</h2>
                <div className="flex gap-2">
                  {["All","Device","Print","Apparel","Branding"].map(f => (
                    <button key={f} onClick={()=>setFilter(f)} className={`h-[32px] px-4 rounded-full text-[13px] font-bold cursor-pointer ${filter===f ? "bg-[#22d3ee] text-[#1a1a23]" : "bg-[#242430] text-[#8a8a95] hover:bg-[#2a2a35] hover:text-white"}`}>{f}</button>
                  ))}
                </div>
              </div>
              <p className="text-[14px] text-[#8a8a95] mt-2">Ready-to-use mockups — {filtered.length} results</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>setFilter('All')} className="h-[36px] px-4 bg-[#242430] border border-[#2a2a35] rounded-full text-[13px] cursor-pointer hover:bg-[#2a2a35]">Recently updated ▼</button>
              <button onClick={()=>router.push('/studios/mockup-studio/new')} className="h-[44px] px-6 bg-[#22d3ee] text-[#1a1a23] rounded-[10px] font-bold text-[16px] hover:bg-[#06b6d4] cursor-pointer">+ New Mockup</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {filtered.map(t => (
              <div key={t.id} className="group bg-[#242430] border border-[#22d3ee]/20 rounded-[16px] p-4 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] relative">
                <Link href={`/studios/mockup-studio/${t.id}`} className="cursor-pointer">
                  <img src={t.img} className="w-full h-[140px] object-cover rounded-[10px]" alt={t.title} />
                  <h3 className="text-[16px] font-bold mt-4 group-hover:text-[#22d3ee]">{t.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-[#22d3ee] text-[#1a1a23] text-[11px] font-bold rounded-full">{t.tag.toUpperCase()}</span>
                    <p className="text-[13px] text-[#8a8a95]">{t.time}</p>
                  </div>
                </Link>
                <button onClick={()=>setShowMenu(showMenu===t.id?null:t.id)} className="absolute top-6 right-6 w-7 h-7 bg-black/60 rounded-full text-white hover:bg-black/80 cursor-pointer flex items-center justify-center">•••</button>
                {showMenu===t.id && (
                  <div className="absolute top-14 right-6 bg-[#1e1e26] border border-[#2a2a35] rounded-[10px] p-2 w-[140px] z-10 shadow-xl">
                    <button onClick={()=>{alert(`Duplicate ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#2a2a35] rounded cursor-pointer">Duplicate</button>
                    <button onClick={()=>{alert(`Rename ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#2a2a35] rounded cursor-pointer">Rename</button>
                    <button onClick={()=>{alert(`Delete ${t.title}`); setShowMenu(null)}} className="w-full text-left px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 rounded cursor-pointer">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}