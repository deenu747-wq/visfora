// app/studios/template/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"

const templates = [
  { id: 1, title: "Modern Interior", tag: "Interior • 4K", time: "Used 24h ago", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400" },
  { id: 2, title: "Product Showcase", tag: "Product • 4K", time: "Used 2 days ago", img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400" },
  { id: 3, title: "Cyber City", tag: "Environment • 4K", time: "Used 3 days ago", img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400" },
  { id: 4, title: "Nature Scene", tag: "Nature • 4K", time: "Used 5 days ago", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
  { id: 5, title: "Portrait Studio", tag: "Portrait • 4K", time: "Used 1 week ago", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { id: 6, title: "Isometric Room", tag: "Isometric • 4K", time: "Used 1 week ago", img: "https://images.unsplash.com/photo-1497366216548-37526070297?w=400" },
  { id: 7, title: "Sci-Fi Corridor", tag: "Sci-Fi • 4K", time: "Used 2 weeks ago", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400" },
  { id: 8, title: "Abstract 3D", tag: "Abstract • 4K", time: "Used 2 weeks ago", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" },
]

export default function TemplateStudio() {
  const [search, setSearch] = useState("")

  const filtered = templates.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#1a1a23] text-white flex flex-col">
      {/* HEADER - Double Logo Same Size */}
      <header className="h-[80px] bg-[#1a1a23] border-b border-[#2a2a35] flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          {/* YOUR LOGO - Same Double Size 80px */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#22d3ee] to-[#06b6d4] rounded-[16px] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <span className="text-[42px] font-black text-[#1a1a23]">VF</span>
            </div>
            <span className="text-[18px] text-[#8a8a95] font-medium">Visfora</span>
          </Link>
          <h1 className="text-[42px] font-black text-[#22d3ee] tracking-tight ml-4">Template Studio</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search templates..." 
              className="w-[260px] h-[40px] bg-[#242430] border border-[#22d3ee]/30 rounded-full px-12 text-[14px] outline-none focus:border-[#22d3ee] cursor-text"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22d3ee]">🔍</span>
          </div>
          <button onClick={()=>alert('Notifications')} className="w-10 h-10 rounded-full hover:bg-[#2a2a35] cursor-pointer text-[20px]">🔔</button>
          <button onClick={()=>alert('Help')} className="w-10 h-10 rounded-full hover:bg-[#2a2a35] cursor-pointer text-[20px]">?</button>
          <button onClick={()=>alert('Profile JD')} className="w-10 h-10 rounded-full bg-[#22d3ee] text-[#1a1a23] font-bold cursor-pointer">JD</button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR - Tabs Left Bigger */}
        <aside className="w-[240px] bg-[#1e1e26] border-r border-[#2a2a35] p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[12px] text-[#22d3ee] bg-[#22d3ee]/10 px-3 py-1 rounded-full w-fit mb-6 font-bold tracking-widest">WORKSPACE</p>
            
            {[
              { icon: "📁", label: "Project", active: true },
              { icon: "🖌️", label: "Studio", active: false },
              { icon: "📦", label: "Assets", active: false },
              { icon: "📚", label: "Scene", active: false },
              { icon: "▶️", label: "Render", active: false },
              { icon: "⚙️", label: "Settings", active: false },
            ].map(item => (
              <button 
                key={item.label}
                onClick={()=>alert(`${item.label} clicked - navigates to /studios/${item.label.toLowerCase()}`)}
                className={`w-full h-[48px] flex items-center gap-4 px-4 rounded-[10px] text-[18px] font-medium cursor-pointer transition-all ${
                  item.active ? "bg-[#22d3ee] text-[#1a1a23]" : "text-[#a0a0b0] hover:bg-[#2a2a35] hover:text-white"
                }`}
              >
                <span className="text-[20px]">{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="text-[13px] text-[#6a6a7a] flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Synced • Autosave on
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-[26px] font-bold">Template Gallery</h2>
              <p className="text-[14px] text-[#8a8a95] mt-1">Choose from {filtered.length} templates to start your project • Newest first</p>
            </div>
            <button 
              onClick={()=>alert('Create New Template Modal')}
              className="h-[44px] px-6 bg-[#22d3ee] text-[#1a1a23] rounded-[10px] font-bold text-[16px] hover:bg-[#06b6d4] cursor-pointer transition-colors"
            >
              + New Template
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {filtered.map(t => (
              <Link key={t.id} href={`/studios/template/${t.id}`} className="group cursor-pointer">
                <div className="bg-[#242430] border border-[#22d3ee]/20 rounded-[16px] p-4 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div className="relative">
                    <img src={t.img} className="w-full h-[140px] object-cover rounded-[10px]" alt={t.title} />
                    <button 
                      onClick={(e)=>{e.preventDefault(); alert(`Menu for ${t.title}: Duplicate, Rename, Delete`)}}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full text-white hover:bg-black/80 cursor-pointer"
                    >•••</button>
                  </div>
                  <h3 className="text-[16px] font-bold mt-4 group-hover:text-[#22d3ee]">{t.title}</h3>
                  <span className="inline-block mt-2 px-2 py-1 bg-[#22d3ee] text-[#1a1a23] text-[12px] font-bold rounded-full">{t.tag}</span>
                  <p className="text-[13px] text-[#8a8a95] mt-2">{t.time}</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-[13px] text-[#6a6a7a] mt-8">Showing {filtered.length} of 8 templates • Page 1 of 1</p>
        </main>
      </div>
    </div>
  )
}