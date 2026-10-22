"use client";

import { useState } from 'react';

const FEATURED = [
  { id: 'ai-bg', label: 'AI Background Remover', icon: '✂️', gradient: 'from-purple-600 to-cyan-400', action: 'Try AI' },
  { id: 'ai-3d', label: 'Meshy AI 3D Generator', icon: '🧊', gradient: 'from-cyan-400 to-blue-600', action: 'Generate 3D' },
  { id: 'ai-upscale', label: 'AI Upscaler', icon: '⚡', gradient: 'from-pink-500 to-orange-400', action: 'Upscale' },
];

const ASSETS = [
  { id: 1, title: 'Photoroom Style Product Backgrounds', cat: 'Backgrounds', type: 'JPG', price: 'FREE', tag: 'AI', trending: true, thumb: 'https://picsum.photos/seed/bg1/400/300' },
  { id: 2, title: 'Meshy 3D Icons - 200 Isometric Pack', cat: '3D Icons', type: 'GLB', price: 199, tag: 'Bestseller', thumb: 'https://picsum.photos/seed/3d1/400/300' },
  { id: 3, title: 'Freepik Premium Vectors Bundle', cat: 'Vectors', type: 'SVG', price: 299, tag: 'Premium', thumb: 'https://picsum.photos/seed/v1/400/300' },
  { id: 4, title: 'Transparent PNG Products', cat: 'Photos', type: 'PNG', price: 'FREE', tag: 'FREE', thumb: 'https://picsum.photos/seed/p1/400/300' },
  { id: 5, title: 'Modern Sans Font Family', cat: 'Fonts', type: 'TTF', price: 149, tag: 'Premium', thumb: 'https://picsum.photos/seed/f1/400/300' },
  { id: 6, title: 'Neon Mockup Templates', cat: 'Mockups', type: 'PSD', price: 0, tag: 'FREE', thumb: 'https://picsum.photos/seed/m1/400/300' },
  { id: 7, title: 'Character Pack by Seller', cat: 'Illustrations', type: 'FIG', price: 199, tag: 'Sold by You', thumb: 'https://picsum.photos/seed/c1/400/300' },
  { id: 8, title: 'Social Media Kit 2024', cat: 'Bundles', type: 'PSD', price: 399, tag: 'Premium', thumb: 'https://picsum.photos/seed/s1/400/300' },
];

export default function AssetsStudio() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [showSell, setShowSell] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', price: '199', cat: 'Vectors', format: 'SVG' });

  const list = ASSETS.filter(a => (filter==='All' || a.cat===filter || a.tag===filter || (filter==='My Assets' && a.tag==='Sold by You')) && a.title.toLowerCase().includes(query.toLowerCase()));

  const handleDownload = (id: number) => {
    setDownloading(id);
    setTimeout(()=>{ setDownloading(null); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <header className="h-[80px] sticky top-0 z-20 bg-[#12121a]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-400 rounded-xl flex items-center justify-center">V</div>
          <div><h1 className="text-[24px] font-bold leading-none text-[#4ef2ff]">Assets Studio</h1><p className="text-[11px] text-white/40">GLOBAL MARKETPLACE</p></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 2.4M assets..." className="w-[320px] h-[44px] bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm outline-none" /><span className="absolute left-3 top-3">🔍</span></div>
          <button onClick={()=>setShowSell(true)} className="h-[44px] px-6 bg-[#4ef2ff] text-black rounded-full font-bold">Sell +</button>
        </div>
      </header>
      <div className="flex">
        <aside className="w-[240px] bg-[#181821] border-r border-white/5 p-4">
          <p className="text-[11px] text-white/30 mb-4">WORKSPACE</p>
          {['Project','Template','Mockup','Motion','Assets','Scene Settings'].map(n=>(
            <div key={n} className={`h-[44px] px-3 rounded-xl flex items-center mb-1 ${n==='Assets'?'bg-[#4ef2ff] text-black font-bold':'text-white/60'}`}>{n}</div>
          ))}
        </aside>
        <main className="flex-1 p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {FEATURED.map(f=>(
              <div key={f.id} className={`h-[72px] rounded-2xl bg-gradient-to-r ${f.gradient} p-[1px]`}><div className="h-full bg-[#1e1e2c] rounded-2xl flex items-center justify-between px-5"><div className="flex items-center gap-3"><span>{f.icon}</span><span className="font-semibold text-sm">{f.label}</span></div><span className="text-xs px-3 py-1 bg-white text-black rounded-full font-bold">{f.action}</span></div></div>
            ))}
          </div>
          <div className="flex gap-2 mb-5 flex-wrap">
            {['All','My Assets','Bundles','Vectors','Photos','Fonts','Icons','PSD','3D Icons','Backgrounds','Free','Premium'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`h-[36px] px-4 rounded-full text-[13px] font-semibold ${filter===f?'bg-[#4ef2ff] text-black':'bg-white/10 text-white/70'}`}>{f}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {list.map(a=>(
              <div key={a.id} className="bg-[#1a1a26] border border-white/5 rounded-2xl overflow-hidden">
                <img src={a.thumb} className="w-full h-[180px] object-cover" />
                <div className="p-3"><h4 className="text-[13px] font-semibold truncate">{a.title}</h4><p className="text-[11px] text-white/40">{a.cat} • {a.type}</p><button onClick={()=>handleDownload(a.id)} className={`mt-2 w-full h-[36px] rounded-full font-bold text-[12px] ${downloading===a.id?'bg-white/20':'bg-[#4ef2ff] text-black'}`}>{downloading===a.id?'Downloading...':'↓ Download'}</button></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}