// src/pages/AssetsStudio.tsx - FINAL GLOBAL MARKETPLACE
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
  { id: 7, title: 'Character Pack by Seller', cat: 'Illustrations', type: 'FIG', price: 199, tag: 'Sold by You', sales: 12, thumb: 'https://picsum.photos/seed/c1/400/300' },
  { id: 8, title: 'Social Media Kit 2024', cat: 'Bundles', type: 'PSD', price: 399, tag: 'Premium', thumb: 'https://picsum.photos/seed/s1/400/300' },
];

export default function AssetsStudio() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [showSell, setShowSell] = useState(false);
  const [form, setForm] = useState({ title: '', price: '199', cat: 'Vectors', format: 'SVG' });
  const [downloading, setDownloading] = useState<number | null>(null);

  const list = ASSETS.filter(a => 
    (filter==='All' || a.cat===filter || a.tag===filter || (filter==='My Assets' && a.tag==='Sold by You')) &&
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDownload = (id: number) => {
    setDownloading(id);
    setTimeout(()=>{ setDownloading(null); alert(`Downloaded! PNG/JPG/SVG/Original saved to My Library. Now available in all Studios.`); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* HEADER - 80px Logo */}
      <header className="h-[80px] sticky top-0 z-20 bg-[#12121a]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-[80px] h-[80px] bg-cyan-500/20 border border-cyan-400 rounded-xl flex items-center justify-center text-[10px] text-cyan-300">80x80</div>
          <img src="/Logo.png" className="w-[80px] h-[80px] object-contain -ml-3" alt="logo"/>
          <div className="-ml-2"><h1 className="text-[30px] font-bold leading-none text-[#4ef2ff]">Assets Studio</h1><p className="text-[11px] text-white/40 tracking-widest">GLOBAL MARKETPLACE</p></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 2.4M assets • Photoroom, Meshy, Freepik style..." className="w-[420px] h-[44px] bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm outline-none focus:border-[#4ef2ff]"/><span className="absolute left-3 top-3 text-white/40">🔍</span></div>
          <button onClick={()=>setShowSell(true)} className="h-[44px] px-6 bg-[#4ef2ff] text-black rounded-full font-bold hover:brightness-110">Sell Your Assets +</button>
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">U</span>
        </div>
      </header>

      <div className="flex">
        {/* LEFT WORKSPACE - 240px */}
        <aside className="w-[240px] min-h-[calc(100vh-80px)] bg-[#181821] border-r border-white/5 p-4 sticky top-[80px]">
          <p className="text-[11px] tracking-widest text-white/30 mb-4">WORKSPACE</p>
          {['Project','Template','Mockup','Motion','Assets','Scene Settings'].map(n=>(
            <div key={n} className={`h-[44px] px-3 rounded-xl flex items-center gap-3 mb-1 cursor-pointer ${n==='Assets'?'bg-[#4ef2ff] text-black font-bold':'text-white/60 hover:bg-white/5'}`}>{n}</div>
          ))}
          <p className="text-[11px] tracking-widest text-white/30 mt-6 mb-3">MARKETPLACE</p>
          <div className="text-[13px] text-white/60 space-y-2">
            <div>🔥 Trending • 1.2k assets</div>
            <div>✨ New • 340 this week</div>
            <div>💎 Premium • Freepik style</div>
            <div>🧊 3D • Meshy style</div>
            <div>✂️ BG Remover • Photoroom style</div>
          </div>
          <div className="mt-6 p-3 bg-[#1e1e2c] rounded-xl"><p className="text-xs text-white/50">Seller Payouts</p><p className="font-bold">Rs 2,388 earned</p><button onClick={()=>alert('Payouts')} className="mt-2 w-full h-8 border border-[#4ef2ff] text-[#4ef2ff] rounded-full text-xs">View Payouts</button></div>
        </aside>

        {/* CENTER */}
        <main className="flex-1 p-6">
          {/* AI TOOLS BAR - Like Photoroom/Meshy */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {FEATURED.map(f=>(
              <div key={f.id} className={`h-[72px] rounded-2xl bg-gradient-to-r ${f.gradient} p-[1px]`}>
                <div className="h-full bg-[#1e1e2c] rounded-2xl flex items-center justify-between px-5 cursor-pointer hover:bg-[#252538]" onClick={()=>alert(`${f.label} clicked`)}>
                  <div className="flex items-center gap-3"><span className="text-xl">{f.icon}</span><span className="font-semibold text-sm">{f.label}</span></div>
                  <span className="text-xs px-3 py-1 bg-white text-black rounded-full font-bold">{f.action}</span>
                </div>
              </div>
            ))}
          </div>

          {/* FILTERS */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {['All','My Assets','Bundles','Vectors','Photos','Fonts','Icons','PSD','3D Icons','Backgrounds','Free','Premium'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`h-[36px] px-4 rounded-full text-[13px] font-semibold ${filter===f?'bg-[#4ef2ff] text-black':'bg-white/10 text-white/70 hover:bg-white/15'}`}>{f}</button>
            ))}
          </div>

          {/* SELLER CTA */}
          <div className="h-[76px] rounded-2xl bg-gradient-to-r from-[#1e1e2c] via-[#1e1e2c] to-[#164e53] border border-[#4ef2ff]/20 flex items-center justify-between px-6 mb-6">
            <div><h3 className="font-bold">Start Selling Your Designs • Global Audience</h3><p className="text-xs text-white/50">Earn 70% • Like Freepik Contributors • Instant Payouts • Your assets work in Template/Mockup/Motion</p></div>
            <button onClick={()=>setShowSell(true)} className="h-[40px] px-5 bg-[#4ef2ff] text-black rounded-xl font-bold">Become a Seller →</button>
          </div>

          {/* ASSETS GRID - Freepik Style */}
          <div className="grid grid-cols-3 gap-4">
            {list.map(a=>(
              <div key={a.id} className="group bg-[#1a1a26] border border-white/5 rounded-2xl overflow-hidden hover:border-[#4ef2ff]/30 transition">
                <div className="relative">
                  <img src={a.thumb} className="w-full h-[180px] object-cover" />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {a.trending && <span className="text-[10px] px-2 py-1 bg-orange-500 text-white rounded-full font-bold">🔥 TRENDING</span>}
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${a.tag==='FREE'?'bg-green-500 text-white':a.tag==='Sold by You'?'bg-[#4ef2ff] text-black':'bg-white/20 text-white'}`}>{a.tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button onClick={()=>handleDownload(a.id)} className="px-4 h-9 bg-[#4ef2ff] text-black rounded-full font-bold text-sm">Download</button>
                    <button onClick={()=>alert('Preview')} className="px-4 h-9 bg-white/20 text-white rounded-full text-sm">Preview</button>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-[13px] font-semibold truncate">{a.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-white/40">{a.cat} • {a.type} • {a.price==='FREE'||a.price===0?'FREE':`Rs ${a.price}`}</span>
                    <div className="flex gap-2 text-white/50">
                      <button onClick={()=>alert('Like')} className="hover:text-white">♡</button>
                      <button onClick={()=>alert('Cart')} className="hover:text-white">🛒</button>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>handleDownload(a.id)} disabled={downloading===a.id} className={`flex-1 h-[36px] rounded-full font-bold text-[12px] ${downloading===a.id?'bg-white/20':'bg-[#4ef2ff] text-black'}`}>{downloading===a.id?'Downloading...':'↓ Download • PNG/JPG/SVG/Original'}</button>
                  </div>
                  {a.tag==='Sold by You' && <p className="text-[10px] text-[#4ef2ff] mt-2">{a.sales || 12} sales • Available in all Studios • Template/Mockup/Motion</p>}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT - My Library */}
        <aside className="w-[300px] bg-[#181821] border-l border-white/5 p-4 sticky top-[80px] h-[calc(100vh-80px)] overflow-auto">
          <h3 className="font-bold text-[18px]">My Library</h3>
          <p className="text-xs text-white/40 mb-4">Global • Works everywhere</p>
          
          <div className="bg-[#1e1e2c] rounded-xl p-3 mb-4">
            <p className="text-xs text-white/50">Downloads</p>
            <p className="text-sm font-bold">24 files • 412MB / 5GB</p>
            <div className="mt-2 space-y-2">
              {[
                {n:'Branding Kit.psd',p:95},{n:'Icon Pack.svg',p:60},{n:'Photo Pack.zip',p:30},
              ].map(d=>(
                <div key={d.n}><p className="text-[11px] truncate">{d.n} • {d.p}%</p><div className="h-1 bg-white/10 rounded-full"><div className="h-1 bg-[#4ef2ff] rounded-full" style={{width:`${d.p}%`}}></div></div></div>
              ))}
            </div>
            <button onClick={()=>alert('Download All')} className="mt-3 w-full h-8 bg-white/10 rounded-full text-xs">Download All</button>
          </div>

          <div className="bg-[#1e1e2c] rounded-xl p-3 mb-4">
            <p className="text-xs text-white/50">Sales</p><p className="font-bold">12 sales</p><p className="text-[#4ef2ff] text-sm">Rs 2,388 earned</p>
            <button onClick={()=>alert('Payout history')} className="mt-2 w-full h-8 border border-[#4ef2ff] text-[#4ef2ff] rounded-full text-xs">Payout History</button>
          </div>

          <div className="bg-[#4ef2ff]/10 border border-[#4ef2ff]/20 rounded-xl p-3">
            <p className="text-xs font-bold text-[#4ef2ff]">Global Access Enabled</p>
            <p className="text-[11px] text-white/60 mt-1">✓ Use in Template Studio ✓ Use in Mockup Studio ✓ Use in Motion Studio ✓ Download PNG/JPG/SVG/Original anywhere</p>
          </div>
        </aside>
      </div>

      {/* SELLER MODAL */}
      {showSell && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-[520px] bg-[#1e1e2c] border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Sell Your Assets • Become Global Seller</h2><button onClick={()=>setShowSell(false)}>✕</button></div>
            <div className="h-[100px] border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-xs text-white/40 mb-4">
              <span>Drag & drop file here</span><span>PNG, JPG, SVG, GLB, PSD, TTF up to 100MB</span><span className="mt-1 px-3 py-1 bg-white/10 rounded-full">Browse Files</span>
            </div>
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Asset title e.g. Photoroom Backgrounds Pack" className="w-full h-[44px] bg-white/5 border border-white/10 rounded-xl px-3 mb-3 outline-none" />
            <div className="grid grid-cols-3 gap-2 mb-3">
              <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} className="h-[44px] bg-[#2a2a3a] rounded-xl px-3"><option>Vectors</option><option>Photos</option><option>3D Icons</option><option>Backgrounds</option><option>Fonts</option><option>Mockups</option><option>Bundles</option></select>
              <select value={form.format} onChange={e=>setForm({...form,format:e.target.value})} className="h-[44px] bg-[#2a2a3a] rounded-xl px-3"><option>PNG</option><option>JPG</option><option>SVG</option><option>GLB</option><option>PSD</option><option>TTF</option></select>
              <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price Rs / 0=FREE" className="h-[44px] bg-white/5 border border-white/10 rounded-xl px-3" />
            </div>
            <p className="text-[11px] text-white/40 mb-4">• AI tools like Photoroom BG Remove, Meshy 3D Convert available • Asset will be downloadable in PNG/JPG/SVG/Original • Usable globally in Template/Mockup/Motion • You earn 70% per sale</p>
            <button onClick={()=>{ alert(`Published ${form.title || 'Asset'} for Rs ${form.price} • Live Globally!`); setShowSell(false); }} className="w-full h-[48px] bg-[#4ef2ff] text-black rounded-xl font-bold">Publish Globally • Start Earning</button>
          </div>
        </div>
      )}
    </div>
  );
}