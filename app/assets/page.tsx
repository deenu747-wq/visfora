// @ts-nocheck
"use client";
import { useState } from 'react';

const FEATURED = [
  { id: 'ai-bg', label: 'AI Background Remover', sub: 'Remove backgrounds in 1 click • Photoroom style', icon: '✂️', badge: 'POPULAR', gradient: 'from-black to-[#D4A85B]' },
  { id: 'ai-3d', label: 'Meshy AI 3D Generator', sub: 'Generate 3D models from text • Meshy AI', icon: '🧊', badge: 'NEW', gradient: 'from-zinc-800 to-black' },
  { id: 'ai-upscale', label: 'AI Upscaler', sub: 'Enhance to 4K resolution • Photoreal results', icon: '🚀', badge: 'FAST', gradient: 'from-[#D4A85B] to-black' },
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
  const [form, setForm] = useState({ title: '', cat: 'Vectors', format: 'SVG', price: '' });

  const list = ASSETS.filter(a => {
    const matchFilter = filter==='All' || a.cat===filter || a.tag===filter || (filter==='My Assets' && a.tag==='Sold by You') || (filter==='Free' && a.tag==='FREE') || (filter==='Premium' && a.tag==='Premium');
    const matchQuery = a.title.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black selection:bg-[#D4A85B]/30">
      {/* HEADER */}
      <header className="h-[80px] sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">V</div>
          <div><h1 className="font-bold text-[18px] leading-none text-black">Assets Studio</h1><p className="text-[13px] font-bold text-[#D4A85B] leading-none mt-1">Global Marketplace</p></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-black/5 hover:bg-black hover:text-white transition-all">🔔</button>
          <button className="w-9 h-9 rounded-full bg-black/5 hover:bg-black hover:text-white transition-all">⚙️</button>
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">SA</div>
          <button className="h-9 px-4 bg-black text-white hover:bg-[#D4A85B] hover:text-black rounded-full font-bold text-sm transition-all duration-200">Upgrade Pro</button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-[240px] min-h-[calc(100vh-80px)] bg-white border-r border-black/5 p-4 sticky top-[80px]">
          <p className="text-[11px] tracking-widest text-black/30 mb-3">WORKSPACE</p>
          {['Project','Template','Mockup','Motion','Assets','Scene Settings'].map(n=>(
            <div key={n} className={`h-10 px-3 rounded-xl flex items-center mb-1 cursor-pointer text-sm transition-all ${n==='Assets'?'bg-black text-white font-bold':'text-black/60 hover:bg-black hover:text-white'}`}>{n}</div>
          ))}
        </aside>

        <main className="flex-1 p-4 md:p-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {FEATURED.map(f=>(
              <div key={f.id} className="rounded-2xl bg-white border border-black/10 p-4 relative overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
                <span className="absolute top-3 right-3 text-[10px] px-2 py-1 bg-black text-white rounded-full font-bold">{f.badge}</span>
                <div className="flex gap-3"><div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-xl">{f.icon}</div><div><h3 className="font-bold text-[15px]">{f.label}</h3><p className="text-[12px] text-black/50 mt-1 leading-tight">{f.sub}</p></div></div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-3 mb-4 flex flex-col gap-3 border border-black/5 shadow-sm">
            <div className="flex gap-2">
              <div className="flex-1 relative"><span className="absolute left-3 top-[10px] text-black/40">🔍</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 2.4M assets • Photoroom • Meshy • Freepik" className="w-full h-10 bg-[#FFFCF7] border border-black/10 rounded-full pl-9 pr-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all" /></div>
              <button className="h-10 px-4 bg-black text-white rounded-full text-sm hover:bg-[#D4A85B] hover:text-black transition-all">Filters</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['All','My Assets','Bundles','Vectors','Photos','Fonts','Icons','PSD','3D Icons','Backgrounds','Free','Premium'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`h-8 px-3 rounded-full text-[12px] font-semibold transition-all duration-200 ${filter===f?'bg-black text-white':'bg-white border border-black/10 text-black/60 hover:bg-black hover:text-white'}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="h-auto md:h-[68px] rounded-2xl bg-white border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-3 mb-6 shadow-sm">
            <div className="flex gap-3"><span className="text-xl">🏪</span><div><h3 className="font-bold text-sm">Start Selling — Earn 70% • Global Audience <span className="font-normal text-black/50 hidden md:inline">on millions of creats worldwide.</span></h3><p className="text-[11px] text-black/50">Open your seller store and reach millions of Payouts weekly via bank, PayPal, Stripe.</p></div></div>
            <div className="flex gap-2"><button onClick={()=>setShowSell(true)} className="h-9 px-4 bg-black text-white hover:bg-[#D4A85B] hover:text-black rounded-full font-bold text-sm transition-all">Become a Seller</button><button className="h-9 px-3 border border-black/20 rounded-full text-xs hover:bg-black hover:text-white transition-all">Learn More</button></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {list.map(a=>(
              <div key={a.id} className="bg-white border border-black/5 rounded-2xl overflow-hidden group hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
                <div className="relative h-[150px] bg-[#FFFCF7]"><img src={a.thumb} alt={a.title} className="w-full h-full object-cover" /><div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[85%]">{a.badges.map(b=><span key={b} className={`text-[10px] px-2 py-1 rounded-full font-bold ${b==='FREE'?'bg-green-500 text-white':b==='Bestseller'?'bg-[#D4A85B] text-black':b==='Sold by You'?'bg-black text-white':b==='Trending'?'bg-black/10 text-black border border-black/10':'bg-white/90 text-black border'}`}>{b}</span>)}</div></div>
                <div className="p-3"><h4 className="font-semibold text-[13px] truncate">{a.title}</h4><p className="text-[11px] text-black/40 mt-1">{a.desc}</p><div className="flex items-center gap-2 mt-3"><span className="text-[10px] px-2 py-1 bg-black/5 rounded-full">{a.type}</span><span className="text-[10px] px-2 py-1 bg-black/5 rounded-full">Original</span><button onClick={()=>{setDownloading(a.id); setTimeout(()=>setDownloading(null),1000);}} className={`ml-auto h-7 px-3 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${downloading===a.id?'bg-black/10':'bg-black text-white hover:bg-[#D4A85B] hover:text-black'}`}>{downloading===a.id?'...':'↓ Download'}</button></div></div>
              </div>
            ))}
          </div>

          <div className="mt-8 h-14 rounded-2xl border-2 border-black bg-white flex items-center justify-between px-5">
            <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-black font-bold">Global Access Enabled</span><span className="text-black/40 hidden md:inline">• Use in Template • Mockup • Motion</span></div>
            <div className="text-[12px] text-black/40">Help Center • Docs • Community • Status: Online</div>
          </div>
        </main>

        <aside className="hidden xl:block w-[300px] bg-white border-l border-black/5 p-4 sticky top-[80px] h-[calc(100vh-80px)] overflow-auto">
          <h3 className="font-bold text-[18px]">My Library</h3>
          <p className="text-xs text-[#D4A85B] flex items-center gap-1 mt-1">🌐 Global • Works everywhere</p>
          <div className="mt-6"><p className="font-semibold text-sm">Downloads</p><p className="text-xs text-black/50 mt-1">3 of 10 downloads today</p><div className="h-1 bg-black/10 rounded-full mt-2"><div className="h-1 w-[30%] bg-black rounded-full"></div></div></div>
          <div className="mt-6"><p className="font-semibold text-sm">Sales</p><p className="text-sm mt-1">12 sales</p><p className="text-black font-bold text-lg">Rs2388</p><p className="text-[11px] text-green-600">+18% this week ↑</p></div>
          <div className="mt-6"><p className="font-semibold text-sm">Storage</p><p className="text-sm mt-1">4.2 GB / 20 GB used</p><div className="h-1 bg-black/10 rounded-full mt-2"><div className="h-1 w-[21%] bg-black rounded-full"></div></div><p className="text-[11px] text-[#D4A85B] font-semibold mt-2 cursor-pointer hover:text-black">Upgrade for 100GB</p></div>
          <div className="mt-6 p-3 bg-[#FFFCF7] rounded-xl border border-black/10"><p className="text-xs">Your Assets • 9 Uploaded</p><p className="text-xs text-black/50 mt-1">View My Assets</p></div>
        </aside>
      </div>

      {showSell && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[520px] bg-white border border-black/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Sell Your Assets • Global</h2><button onClick={()=>setShowSell(false)} className="w-8 h-8 bg-black/5 hover:bg-black hover:text-white rounded-full transition-all">✕</button></div>
            <div className="h-[100px] border-2 border-dashed border-black/20 rounded-xl flex flex-col items-center justify-center text-xs text-black/40"><span>Drag & drop file here</span><span className="mt-1">PNG, JPG, SVG, GLB, PSD, TTF up to 100MB</span></div>
            <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Asset title" className="mt-4 w-full h-11 bg-white border border-black/10 rounded-full px-4 outline-none focus:border-black" />
            <div className="grid grid-cols-3 gap-2 mt-3"><select value={form.cat} onChange={e=>setForm({...form, cat: e.target.value})} className="h-11 bg-[#FFFCF7] border border-black/10 rounded-full px-3 text-sm"><option>Vectors</option><option>Photos</option><option>3D Icons</option><option>Backgrounds</option></select><select value={form.format} onChange={e=>setForm({...form, format: e.target.value})} className="h-11 bg-[#FFFCF7] border border-black/10 rounded-full px-3 text-sm"><option>SVG</option><option>PNG</option><option>GLB</option><option>PSD</option></select><input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder="Price" className="h-11 bg-white border border-black/10 rounded-full px-3" /></div>
            <button onClick={()=>{alert(`Published ${form.title || 'Asset'} for Rs ${form.price} • Live Globally!`); setShowSell(false);}} className="mt-4 w-full h-12 bg-black text-white hover:bg-[#D4A85B] hover:text-black rounded-full font-bold transition-all duration-200">Publish Globally • Start Earning</button>
          </div>
        </div>
      )}
    </div>
  );
}