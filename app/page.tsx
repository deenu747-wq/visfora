export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#C9A86A]/30 font-sans antialiased">
      {/* HEADER - Screenshot 6 */}
      <header className="sticky top-0 z-50 h-[64px] px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] rounded-[10px] border-[1.5px] border-[#C9A86A] flex items-center justify-center font-black text-[14px] tracking-widest">VF</div>
          <span className="text-[18px] font-bold tracking-[-0.02em]">VISFORΛ</span>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {["Photo","Vector","3D","Motion","Mockup","Template"].map(t=>(
            <a key={t} href={`/${t.toLowerCase()}`} className="h-[32px] px-4 rounded-full text-[13px] font-medium bg-white/[0.06] hover:bg-white text-white hover:text-black transition flex items-center">{t}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/api" className="h-[36px] px-4 rounded-full bg-white/[0.06] text-[13px] flex items-center hover:bg-white hover:text-black transition">API</a>
          <a href="/vector" className="h-[36px] px-5 rounded-full bg-white text-black text-[13px] font-semibold flex items-center">Start Free</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_400px_at_50%_0%,#C9A86A22,transparent)]" />
        <div className="inline-flex items-center gap-2 h-[28px] px-3 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[11px] tracking-widest text-[#C9A86A] mb-6">7 STUDIOS • API • MCP • $0 COST VECTOR</div>
        <h1 className="text-[56px] md:text-[84px] font-black tracking-[-0.05em] leading-[0.9]">Design API<br/><span className="text-[#C9A86A]">for Developers.</span></h1>
        <p className="mt-6 text-[16px] md:text-[18px] opacity-60 max-w-[560px] mx-auto leading-relaxed">One platform: Photo, Vector, 3D, Motion, Mockup, Template, API. Batch 100x, VTracer WASM, FLUX Fill, R3D. 100% margin on Vector.</p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="/vector" className="h-[44px] px-6 rounded-full bg-white text-black font-semibold text-[14px] flex items-center">Start Vector Free →</a>
          <a href="/api" className="h-[44px] px-6 rounded-full bg-white/[0.08] border border-white/10 font-medium text-[14px] flex items-center">View API Docs</a>
        </div>
      </section>

      {/* 6 STUDIOS GRID */}
      <section className="px-6 py-12 max-w-[1200px] mx-auto grid md:grid-cols-3 gap-4">
        {[
          {n:"Photo Studio", d:"Background Remover + Upscaler + FLUX Fill + Gen Fill. 60% margin.", c:"#8B5CF6"},
          {n:"Vector Studio", d:"Image→SVG/EPS/AI/PDF/CDR. VTracer Rust WASM. 100% margin.", c:"#C9A86A", hot:true},
          {n:"3D Studio", d:"Image→3D Textured Mesh. TripoSR + R3D Remesh + USDZ.", c:"#06B6D4"},
          {n:"Motion Studio", d:"Image→Video, Video Upscale, Face Swap. fal.ai + REEM.", c:"#F59E0B"},
          {n:"Mockup Studio", d:"T-shirt, Mug, Book, Box, Device. Print-ready.", c:"#EC4899"},
          {n:"Template Studio", d:"Posters, Resumes, Social. Fabric.js + Export PDF/PNG.", c:"#10B981"},
        ].map(s=>(
          <a key={s.n} href={`/${s.n.split(" ")[0].toLowerCase()}`} className="group p-6 rounded-[20px] bg-[#121212] border border-white/[0.06] hover:border-white/20 transition text-left">
            <div className="flex items-center justify-between mb-4"><div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center font-bold text-black" style={{background:s.c}}>{s.n[0]}</div>{s.hot&&<span className="text-[10px] px-2 py-1 rounded-full bg-[#C9A86A] text-black font-bold">HOT • $0 COST</span>}</div>
            <h3 className="text-[18px] font-bold">{s.n}</h3>
            <p className="mt-2 text-[13px] opacity-60 leading-relaxed">{s.d}</p>
            <div className="mt-4 text-[12px] opacity-40 group-hover:opacity-100">Open Studio →</div>
          </a>
        ))}
      </section>

      {/* PRICING */}
      <section className="px-6 py-16 max-w-[900px] mx-auto">
        <div className="rounded-[24px] bg-[#121212] border border-white/[0.06] p-8 md:p-10 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[28px] font-bold tracking-tight">Pricing</h3>
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-[14px] bg-white/[0.04] border border-white/5"><div className="text-[11px] tracking-widest opacity-50">FREE</div><div className="text-[20px] font-bold mt-1">₹0 / 10 credits</div><div className="text-[12px] opacity-60 mt-1">Watermarked • Try all studios</div></div>
              <div className="p-4 rounded-[14px] bg-white text-black"><div className="text-[11px] tracking-widest opacity-60">CREATOR</div><div className="text-[20px] font-bold mt-1">₹499 / 100 credits</div><div className="text-[12px] opacity-60 mt-1">Vector ₹2/call • Photo ₹8/call • 60-100% margin</div></div>
              <div className="p-4 rounded-[14px] bg-[#C9A86A] text-black"><div className="text-[11px] tracking-widest">PRO</div><div className="text-[20px] font-bold mt-1">₹1999 / 500 credits</div><div className="text-[12px] mt-1">Batch 100x + API + No watermark</div></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-[14px] bg-[#0A0A0A] border border-white/10"><h4 className="font-bold">API + MCP</h4><p className="text-[13px] opacity-60 mt-2">POST /api/v1/vector/image-to-vector<br/>MCP: visfora-vectorize, visfora-remove-bg<br/>Margin: 50-85% on API</p><a href="/api" className="mt-3 inline-flex h-[32px] px-4 rounded-full bg-white text-black text-[12px] font-semibold items-center">Docs →</a></div>
            <div className="p-4 rounded-[14px] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20"><h4 className="font-bold text-[#8B5CF6]">Why VISFORA?</h4><p className="text-[12px] opacity-70 mt-2">• Vector: $0 cost WASM = 100% profit<br/>• Photo: fal.ai + Replicate mix = 60% margin<br/>• Batch 100x = 10x competitors<br/>• Vercel + Upstash = Auto-scale India</p></div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-[11px] opacity-30 border-t border-white/[0.06]">© 2026 VISFORA • Built for India • Delhi</footer>
    </div>
  )
}