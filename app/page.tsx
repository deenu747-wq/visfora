export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#111] selection:bg-[#C9A86A]/20 font-sans antialiased">
      {/* HEADER - Premium Light */}
      <header className="sticky top-0 z-50 h-[72px] px-6 md:px-10 flex items-center justify-between bg-[#FFFBF5]/80 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-[12px] border-[1.5px] border-[#C9A86A] bg-white flex items-center justify-center font-black text-[13px] shadow-sm">VF</div>
          <span className="text-[20px] font-black tracking-[-0.02em]">VISFORΛ</span>
          <span className="ml-3 hidden md:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[#C9A86A] text-black font-bold">PREMIUM</span>
        </div>
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white border border-black/5 shadow-sm">
          {["Photo","Vector","3D","Motion","Mockup","Template","API"].map(t=>(
            <a key={t} href={`/${t.toLowerCase()}`} className="h-[32px] px-4 rounded-full text-[13px] font-medium hover:bg-black hover:text-white transition flex items-center">{t}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <a href="/api" className="h-[40px] px-5 rounded-full bg-white border border-black/10 text-[13px] font-semibold shadow-sm flex items-center">API Docs</a>
          <a href="/vector" className="h-[40px] px-6 rounded-full bg-black text-white text-[13px] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center hover:bg-[#1a1a1a]">Start Free →</a>
        </div>
      </header>

      {/* HERO - Canva Premium */}
      <section className="relative px-6 md:px-10 pt-16 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] -z-10 bg-[radial-gradient(600px_400px_at_50%_0%,#C9A86A25,transparent)]" />
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 h-[32px] px-4 rounded-full bg-white border border-black/5 shadow-sm text-[11px] font-bold tracking-widest"><span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span> 7 STUDIOS • API • MCP • BATCH 100x • MADE IN INDIA</div>
          <h1 className="mt-8 text-[48px] md:text-[84px] font-black leading-[0.9] tracking-[-0.05em]">The Design Platform<br/><span className="bg-gradient-to-r from-[#C9A86A] to-[#8B5CF6] bg-clip-text text-transparent">Developers Love.</span><br/>Creators Profit From.</h1>
          <p className="mt-6 text-[16px] md:text-[19px] leading-relaxed opacity-60 max-w-[640px] mx-auto">One subscription. 7 professional studios. Image to SVG with $0 cost, FLUX Fill, 3D Textured Mesh, Video, Mockups. <b className="opacity-100 text-black">100% margin on Vector.</b> Like Canva, but for API-first India.</p>
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-3">
            <a href="/vector" className="h-[52px] px-8 rounded-full bg-black text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">Start Vector Free — $0 Cost <span>→</span></a>
            <a href="#pricing" className="h-[52px] px-8 rounded-full bg-white border border-black/10 font-semibold text-[15px] flex items-center justify-center shadow-sm">See Tricky Pricing</a>
          </div>
          <div className="mt-6 text-[12px] opacity-50">✓ No credit card • ✓ 10 free credits • ✓ Export SVG/EPS/AI/PDF/CDR</div>
        </div>
      </section>

      {/* 6 STUDIOS - Premium Cards */}
      <section className="px-6 md:px-10 pb-10 max-w-[1280px] mx-auto grid md:grid-cols-3 gap-5">
        {[
          {n:"Photo Studio", tag:"BG Remove + Upscale + FLUX Fill", d:"Replace background, upscale 4x, generative fill. Powered by fal.ai + BiRefNet.", price:"₹8/call • 60% margin", grad:"from-[#8B5CF6] to-[#6366F1]"},
          {n:"Vector Studio", tag:"MOST PROFITABLE", d:"Image → SVG / EPS / AI / PDF / CDR. VTracer Rust WASM runs in browser.", price:"₹2/call • 100% margin • $0 COST", grad:"from-[#C9A86A] to-[#EAB308]", hot:true},
          {n:"3D Studio", tag:"Textured Mesh", d:"Image → 3D Textured Mesh + R3D Remesh + USDZ for iOS AR.", price:"₹20/call • 70% margin", grad:"from-[#06B6D4] to-[#3B82F6]"},
          {n:"Motion Studio", tag:"Image → Video", d:"Animate image, upscale video 4K, face swap. fal.ai + REEM.", price:"₹15/call • 65% margin", grad:"from-[#F59E0B] to-[#EF4444]"},
          {n:"Mockup Studio", tag:"Print Ready", d:"T-shirt, Mug, Book, Box, Device. One click print-ready mockups.", price:"₹5/call • 80% margin", grad:"from-[#EC4899] to-[#8B5CF6]"},
          {n:"Template Studio", tag:"Canva Killer", d:"Posters, Resumes, Social, Ads. Fabric.js + PDF export.", price:"₹3/call • 90% margin", grad:"from-[#10B981] to-[#06B6D4]"},
        ].map(s=>(
          <div key={s.n} className="group relative p-[1px] rounded-[24px] bg-gradient-to-br from-black/10 to-black/0 hover:from-black/20 transition">
            <div className="h-full p-6 rounded-[23px] bg-white border border-black/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition">
              <div className="flex items-start justify-between">
                <div className={`w-[48px] h-[48px] rounded-[14px] bg-gradient-to-br ${s.grad} flex items-center justify-center text-white font-black shadow-sm`}>{s.n[0]}</div>
                {s.hot? <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-black text-white">🔥 HOT $0 COST</span> : <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFFBF5] border border-black/5">{s.tag}</span>}
              </div>
              <h3 className="mt-5 text-[18px] font-bold tracking-tight">{s.n}</h3>
              <p className="mt-2 text-[13px] leading-[1.5] opacity-60">{s.d}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFFBF5] border">{s.price}</span>
                <a href={`/${s.n.split(" ")[0].toLowerCase()}`} className="text-[12px] font-bold group-hover:translate-x-0.5 transition">Open →</a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* TRICKY PRICING - Your Plan */}
      <section id="pricing" className="px-6 md:px-10 py-20 bg-white border-y border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] md:text-[48px] font-black tracking-tight">Tricky Plans that Sell Itself.</h2>
            <p className="mt-3 opacity-60">Free hooks, Creator converts, Pro prints money. 60-100% margins built-in.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* FREE */}
            <div className="p-8 rounded-[28px] bg-[#FFFBF5] border border-black/5">
              <div className="text-[11px] font-black tracking-widest opacity-40">FREE • HOOK</div>
              <div className="mt-3 text-[36px] font-black">₹0 <span className="text-[14px] font-medium opacity-50">/ 10 credits</span></div>
              <ul className="mt-6 space-y-2.5 text-[13px]">
                <li>✓ 10 credits, watermarked</li><li>✓ Try all 7 studios</li><li>✓ Batch 5 files only</li><li>✓ Community support</li>
              </ul>
              <a href="/vector" className="mt-8 h-[44px] w-full rounded-full bg-white border border-black/10 font-bold text-[14px] flex items-center justify-center">Start Free</a>
            </div>
            {/* CREATOR - BEST SELLER */}
            <div className="relative p-[2px] rounded-[28px] bg-gradient-to-br from-black to-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] -mt-4">
              <div className="p-8 rounded-[26px] bg-black text-white">
                <div className="flex items-center justify-between"><span className="text-[11px] font-black tracking-widest text-[#C9A86A]">CREATOR • MOST POPULAR</span><span className="text-[10px] px-2 py-1 rounded-full bg-white text-black font-black">80% CHOOSE THIS</span></div>
                <div className="mt-3 text-[36px] font-black">₹499 <span className="text-[14px] font-medium opacity-60">/ 100 credits</span></div>
                <div className="mt-2 text-[12px] px-3 py-1.5 rounded-full bg-white/10 inline-block">Vector ₹2/call = 100% profit • Photo ₹8 = 60% profit</div>
                <ul className="mt-6 space-y-2.5 text-[13px] opacity-80">
                  <li>✓ No watermark • HD export</li><li>✓ Batch 100x files</li><li>✓ SVG / EPS / AI / PDF / CDR</li><li>✓ API 500 calls/mo • MCP tools</li><li>✓ Priority queue</li>
                </ul>
                <a href="/vector" className="mt-8 h-[48px] w-full rounded-full bg-white text-black font-black text-[14px] flex items-center justify-center">Get Creator — Best Value →</a>
              </div>
            </div>
            {/* PRO */}
            <div className="p-8 rounded-[28px] bg-[#C9A86A]/10 border border-[#C9A86A]/20">
              <div className="text-[11px] font-black tracking-widest text-[#8B6914]">PRO • SCALE • AGENCY</div>
              <div className="mt-3 text-[36px] font-black">₹1999 <span className="text-[14px] font-medium opacity-60">/ 600 credits</span></div>
              <div className="mt-2 text-[12px] px-3 py-1.5 rounded-full bg-[#C9A86A] text-black font-bold inline-block">Margin 85% on API resell</div>
              <ul className="mt-6 space-y-2.5 text-[13px]">
                <li>✓ Everything in Creator</li><li>✓ API Unlimited + Webhook</li><li>✓ White-label + Team 5 seats</li><li>✓ Batch 500x + Priority GPU</li><li>✓ Resell API @ 2x</li>
              </ul>
              <a href="/api" className="mt-8 h-[44px] w-full rounded-full bg-black text-white font-bold text-[14px] flex items-center justify-center">Go Pro + Resell →</a>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[16px] bg-[#FFFBF5] border flex items-center justify-between text-[13px]"><span><b>API:</b> POST /api/v1/vector/image-to-vector → Margin 85%</span><a href="/api" className="font-bold underline">Docs →</a></div>
            <div className="p-4 rounded-[16px] bg-[#8B5CF6]/10 border border-[#8B5CF6]/10 flex items-center justify-between text-[13px]"><span><b>MCP:</b> visfora-vectorize, visfora-bg-remove for Claude/Cursor</span><span className="font-bold">Claude Ready</span></div>
          </div>
        </div>
      </section>

      <footer className="px-10 py-8 text-center text-[11px] opacity-40">© 2026 VISFORA • Light Cream Premium • Delhi • Batch 100x • VTracer $0 Cost • API 85% Margin</footer>
    </div>
  )
}