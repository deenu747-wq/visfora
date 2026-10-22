"use client";
import { useState } from 'react';

const FEATURED = [
  { id: 'ai-bg', label: 'AI Background Remover', sub: 'Remove backgrounds in 1 click • Photoroom style', icon: '✂️', badge: 'POPULAR', gradient: 'from-purple-600 to-cyan-400' },
  { id: 'ai-3d', label: 'Meshy AI 3D Generator', sub: 'Generate 3D models from text • Meshy AI', icon: '🧊', badge: 'NEW', gradient: 'from-cyan-400 to-blue-600' },
  { id: 'ai-upscale', label: 'AI Upscaler', sub: 'Enhance to 4K resolution • Photoreal results', icon: '🚀', badge: 'FAST', gradient: 'from-pink-500 to-orange-400' },
];

const ASSETS = [
  { id: 1, title: 'Product Backgrounds', desc: '12 Photos • Commercial Use', cat: 'Backgrounds', type: 'JPG', price: 'FREE', tag: 'FREE', badges: ['Trending','Bestseller'], thumb: 'https://picsum.photos/seed/bg1/400/300' },
  { id: 2, title: '3D Icons GLB', desc: '48 Icons • GLB/OBJ', cat: '3D Icons', type: 'GLB', price: 199, tag: 'Bestseller', badges: ['FREE','Bestseller','3D Icons'], thumb: 'https://picsum.photos/seed/3d1/400/300' },
  { id: 3, title: 'Premium Vectors', desc: '64 Vectors • EPS/AI', cat: 'Vectors', type: 'SVG', price: 299, tag: 'Premium', badges: ['Premium'], thumb: 'https://picsum.photos/seed/v1/400/300' },
  { id: 4, title: 'Premium Vectors', desc: '64 Vectors • Transparent PNG', cat: 'Vectors', type: 'PNG', price: 299, tag: 'Premium', badges: ['Premium'], thumb: 'https://picsum.photos/seed/v2/400/300' },
  { id: 5, title: 'Transparent PNG', desc: '32 Cutouts • Transparent PNG', cat: 'Photos', type: 'PNG', price: 199, tag: 'Sold by You', badges: ['Sold by You'], sales: 12, thumb: 'https://picsum.photos/seed/p1/400/300' },
  { id: 6, title: 'Fonts', desc: '8 Fonts • OTF/TTF', cat: 'Fonts', type: 'OTF', price: 149, tag: 'Bestseller', badges: ['Bestseller','Trending'], thumb: 'https://picsum.photos/seed/f1/400/300' },
  { id: 7, title: 'Mockups', desc: '24 PSD Mockups', cat: 'Mockups', type: 'PSD', price: 249, tag: 'Bestseller', badges: ['Bestseller'], thumb: 'https://picsum.photos/seed/m1/400/300' },
  { id: 8, title: 'Mockups', desc: '8 Fonts • OTF/TTF', cat: 'Mockups', type: 'PSD', price: 199, tag: 'Bestseller', badges: ['Bestseller','Trending'], thumb: 'https://picsum.photos/seed/m2/400/300' },
  { id: 9, title: 'Icons Pack', desc: '120 Icons • SVG', cat: 'Icons', type: 'SVG', price: 0, tag: 'FREE', badges: ['FREE','Trending'], thumb: 'https://picsum.photos/seed/i1/400/300' },
  { id: 10, title: 'Background Textures', desc: '30 Backgrounds • JPG/PNG', cat: 'Backgrounds', type: 'JPG', price: 199, tag: 'Premium', badges: ['Premium'], thumb: 'https://picsum.photos/seed/b1/400/300' },
];

export default function Page() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [showSell, setShowSell] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);

  const list = ASSETS.filter(a => {
    const matchFilter = filter==='All' || a.cat===filter || a.tag===filter || (filter==='My Assets' && a.tag==='Sold by You') || (filter==='Free' && a.tag==='FREE') || (filter==='Premium' && a.tag==='Premium');
    const matchQuery = a.title.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#4ef2ff]/30">
      {/* HEADER */}
      <header className="h-[80px] sticky top-0 z-30 bg-[#0f0f14]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold">V</div>
          <div><h1 className="font-bold text-[18px] leading-none">Assets Studio</h1><p className="text-[14px] font-bold text-[#4ef2ff] leading-none mt-1">Global Marketplace</p></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-white/5">🔔</button>
          <button className="w-9 h-9 rounded-full bg-white/5">⚙️</button>
          <div className="w-9 h-9 rounded-full bg-[#4ef2ff] text-black flex items-center justify-center font-bold text-sm">SA</div>
          <button className="h-9 px-4 bg-[#4ef2ff] text-black rounded-full font-bold text-sm">Upgrade Pro</button>
        </div>
      </header>

      <div className="flex">
        {/* LEFT - Hidden on mobile, same as your other studios */}
        <aside className="hidden lg:block w-[240px] min-h-[calc(100vh-80px)] bg-[#12121a] border-r border-white/5 p-4 sticky top-[80px]">
          <p className="text-[11px] tracking-widest text-white/30 mb-3">WORKSPACE</p>
          {['Project','Template','Mockup','Motion','Assets','Scene Settings'].map(n=>(
            <div key={n} className={`h-10 px-3 rounded-xl flex items-center mb-1 cursor-pointer text-sm ${n==='Assets'?'bg-[#4ef2ff] text-black font-bold':'text-white/60 hover:bg-white/5'}`}>{n}</div>
          ))}
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4 md:p-6 pb-24">
          {/* TOP 3 AI CARDS - Photoroom/Meshy style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {FEATURED.map(f=>(
              <div key={f.id} className="rounded-2xl bg-[#14141e] border border-cyan-500/20 p-4 relative overflow-hidden">
                <span className="absolute top-3 right-3 text-[10px] px-2 py-1 bg-[#4ef2ff] text-black rounded-full font-bold">{f.badge}</span>
                <div className="flex gap-3"><div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">{f.icon}</div><div><h3 className="font-bold text-[15px]">{f.label}</h3><p className="text-[12px] text-white/50 mt-1 leading-tight">{f.sub}</p></div></div>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTERS */}
          <div className="bg-[#14141e] rounded-2xl p-3 mb-4 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="flex-1 relative"><span className="absolute left-3 top-[10px] text-white/40">🔍</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 2.4M assets • Photoroom • Meshy • Freepik" className="w-full h-10 bg-[#0f0f14] border border-white/10 rounded-xl pl-9 pr-3 text-sm outline-none focus:border-[#4ef2ff]" /></div>
              <button className="h-10 px-4 bg-white/5 rounded-xl text-sm">Filters</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['All','My Assets','Bundles','Vectors','Photos','Fonts','Icons','PSD','3D Icons','Backgrounds','Free','Premium'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`h-8 px-3 rounded-full text-[12px] font-semibold transition ${filter===f?'bg-[#4ef2ff] text-black':'bg-[#0f0f14] border border-white/10 text-white/60 hover:text-white'}`}>{f}</button>
              ))}
            </div>
          </div>

          {/* SELLER BANNER */}
          <div className="h-auto md:h-[68px] rounded-2xl bg-gradient-to-r from-[#14141e] to-[#0f2a2e] border border-[#4ef2ff]/20 flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-3 mb-6">
            <div className="flex gap-3"><span className="text-xl">🏪</span><div><h3 className="font-bold text-sm">Start Selling — Earn 70% • Global Audience <span className="font-normal text-white/50 hidden md:inline">on millions of creats worldwide.</span></h3><p className="text-[11px] text-white/50">Open your seller store and reach millions of Payouts weekly via bank, PayPal, Stripe.</p></div></div>
            <div className="flex gap-2"><button onClick={()=>setShowSell(true)} className="h-9 px-4 bg-[#4ef2ff] text-black rounded-full font-bold text-sm">Become a Seller</button><button className="h-9 px-3 border border-white/20 rounded-full text-xs">Learn More</button></div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {list.map(a=>(
              <div key={a.id} className="bg-[#14141e] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#4ef2ff]/20 transition">
                <div className="relative h-[150px] bg-[#0f0f14]"><img src={a.thumb} alt={a.title} className="w-full h-full object-cover" /><div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[85%]">{a.badges.map(b=><span key={b} className={`text-[10px] px-2 py-1 rounded-full font-bold ${b==='FREE'?'bg-green-500 text-white':b==='Bestseller'?'bg-orange-400 text-black':b==='Sold by You'?'bg-[#4ef2ff] text-black':b==='Trending'?'bg-[#4ef2ff]/20 text-[#4ef2ff] border border-[#4ef2ff]/30':'bg-white/10 text-white'}`}>{b}</span>)}</div></div>
                <div className="p-3"><h4 className="font-semibold text-[13px] truncate">{a.title}</h4><p className="text-[11px] text-white/40 mt-1">{a.desc}</p><div className="flex items-center gap-2 mt-3"><span className="text-[10px] px-2 py-1 bg-white/5 rounded-full">{a.type}</span><span className="text-[10px] px-2 py-1 bg-white/5 rounded-full">Original</span><button onClick={()=>{setDownloading(a.id); setTimeout(()=>setDownloading(null),1000);}} className={`ml-auto h-7 px-3 rounded-full text-[11px] font-bold flex items-center gap-1 ${downloading===a.id?'bg-white/10':'bg-[#4ef2ff] text-black'}`}>{downloading===a.id?'...':'↓ Download'}</button></div></div>
              </div>
            ))}
          </div>

          {/* BOTTOM GLOBAL BAR */}
          <div className="mt-8 h-14 rounded-2xl border-2 border-[#4ef2ff] bg-[#0f0f14] flex items-center justify-between px-5">
            <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span><span className="text-[#4ef2ff] font-bold">Global Access Enabled</span><span className="text-white/40 hidden md:inline">• Use in Template • Mockup • Motion</span></div>
            <div className="text-[12px] text-white/40">Help Center • Docs • Community • Status: Online</div>
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="hidden xl:block w-[300px] bg-[#12121a] border-l border-white/5 p-4 sticky top-[80px] h-[calc(100vh-80px)] overflow-auto">
          <h3 className="font-bold text-[18px]">My Library</h3>
          <p className="text-xs text-[#4ef2ff] flex items-center gap-1 mt-1">🌐 Global • Works everywhere</p>
          <div className="mt-6"><p className="font-semibold text-sm">Downloads</p><p className="text-xs text-white/50 mt-1">3 of 10 downloads today</p><div className="h-1 bg-white/10 rounded-full mt-2"><div className="h-1 w-[30%] bg-[#4ef2ff] rounded-full"></div></div></div>
          <div className="mt-6"><p className="font-semibold text-sm">Sales</p><p className="text-sm mt-1">12 sales</p><p className="text-[#4ef2ff] font-bold text-lg">Rs2388</p><p className="text-[11px] text-green-400">+18% this week ↑</p></div>
          <div className="mt-6"><p className="font-semibold text-sm">Storage</p><p className="text-sm mt-1">4.2 GB / 20 GB used</p><div className="h-1 bg-white/10 rounded-full mt-2"><div className="h-1 w-[21%] bg-[#4ef2ff] rounded-full"></div></div><p className="text-[11px] text-[#4ef2ff] mt-2 cursor-pointer">Upgrade for 100GB</p></div>
          <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10"><p className="text-xs">Your Assets • 9 Uploaded</p><p className="text-xs text-white/50 mt-1">View My Assets</p></div>
        </aside>
      </div>

      {/* SELL MODAL */}
      {showSell && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[520px] bg-[#1a1a26] border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Sell Your Assets • Global</h2><button onClick={()=>setShowSell(false)} className="w-8 h-8 bg-white/10 rounded-full">✕</button></div>
            <div className="h-[100px] border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-xs text-white/40"><span>Drag & drop file here</span><span className="mt-1">PNG, JPG, SVG, GLB, PSD, TTF up to 100MB</span></div>
            <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Asset title" className="mt-4 w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 outline-none" />
            <div className="grid grid-cols-3 gap-2 mt-3"><select value={form.cat} onChange={e=>setForm({...form, cat: e.target.value})} className="h-11 bg-[#2a2a3a] rounded-xl px-2 text-sm"><option>Vectors</option><option>Photos</option><option>3D Icons</option><option>Backgrounds</option></select><select value={form.format} onChange={e=>setForm({...form, format: e.target.value})} className="h-11 bg-[#2a2a3a] rounded-xl px-2 text-sm"><option>SVG</option><option>PNG</option><option>GLB</option><option>PSD</option></select><input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" className="h-11 bg-white/5 border border-white/10 rounded-xl px-3" /></div>
            <button onClick={()=>{alert(`Published ${form.title || 'Asset'} for Rs ${form.price} • Live Globally!`); setShowSell(false);}} className="mt-4 w-full h-12 bg-[#4ef2ff] text-black rounded-xl font-bold">Publish Globally • Start Earning</button>
          </div>
        </div>
      )}
    </div>
  );
}