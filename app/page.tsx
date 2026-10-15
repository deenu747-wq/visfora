export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#111] font-sans antialiased">
      {/* HEADER - EXACT LIKE YOUR SCREENSHOT */}
      <header className="sticky top-0 z-50 h-[72px] px-6 md:px-10 flex items-center justify-between bg-[#FAF6F1]/95 backdrop-blur-md border-b border-black/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="w-[44px] h-[44px] rounded-[12px] border-[1.8px] border-[#C9A86A] bg-[#FFFEFB] flex items-center justify-center shadow-[0_2px_8px_rgba(201,168,106,0.15)]">
            <span className="font-black text-[18px] text-[#C9A86A] tracking-tighter">VF</span>
          </div>
          <span className="text-[26px] font-black tracking-[-0.03em]">VISFORΛ</span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
          <a href="/photo" className="hover:opacity-60 transition">Photo</a>
          <a href="/vector" className="hover:opacity-60 transition">Vector</a>
          <a href="/3d" className="hover:opacity-60 transition">3D</a>
          <a href="/motion" className="hover:opacity-60 transition">Motion</a>
          <a href="/mockup" className="hover:opacity-60 transition">Mockup</a>
          <a href="/template" className="hover:opacity-60 transition">Template</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="/login" className="hidden md:flex h-[40px] px-5 rounded-[12px] bg-white border border-black/10 text-[14px] font-semibold items-center hover:bg-black hover:text-white transition">Login</a>
          <a href="/vector" className="h-[40px] px-6 rounded-[12px] bg-black text-white text-[14px] font-bold flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-[#222]">Get started</a>
        </div>
      </header>

      {/* HERO - Like Screenshot */}
      <section className="px-6 md:px-10 pt-12 md:pt-20 pb-10 max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-[42px] md:text-[56px] font-black leading-[0.95] tracking-[-0.04em]">Build Visuals at Scale</h1>
          <p className="mt-4 text-[15px] leading-[1.6] opacity-70 max-w-[460px]">AI-powered design platform for teams to create photos, vectors, 3D, motion, mockups, and templates—10x faster. Everything you need to produce on-brand visuals in one place.</p>
          <div className="mt-6 flex gap-3">
            <a href="/vector" className="h-[44px] px-6 rounded-[10px] bg-black text-white text-[14px] font-bold flex items-center">Start for free</a>
            <a href="#demo" className="h-[44px] px-6 rounded-[10px] bg-[#D6B782] text-white text-[14px] font-semibold flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">▶</span> Watch demo</a>
          </div>
          <div className="mt-4 text-[12px] opacity-50">Trusted by 5,000+ creative teams and designers • No credit card required</div>
        </div>
        <div className="relative h-[320px] md:h-[400px] rounded-[24px] bg-[#F5EFE6] overflow-hidden flex items-center justify-center">
          {/* Purple blob - CSS version of your screenshot */}
          <div className="absolute w-[340px] h-[260px] bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[60%_40%_50%_50%/50%_60%_40%_50%] blur-[0.5px] shadow-[0_20px_60px_rgba(139,92,246,0.4)] rotate-6"></div>
          <div className="absolute top-10 right-20 w-16 h-8 bg-[#A78BFA]/60 rounded-[12px] rotate-12"></div>
          <div className="absolute bottom-16 left-16 w-12 h-12 bg-[#C4B5FD]/50 rotate-45"></div>
          <div className="absolute top-4 left-20 w-5 h-5 bg-[#8B5CF6] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-14 h-8 bg-[#8B5CF6] rounded-full rotate-45"></div>
        </div>
      </section>

      {/* SIX STUDIOS - Like Screenshot */}
      <section className="px-6 md:px-10 pb-10 max-w-[1280px] mx-auto">
        <h2 className="text-center text-[24px] md:text-[28px] font-black tracking-tight mb-8">Six studios. One platform.</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {n:"Photo", d:"AI photo editing & generation", icon:"📷"},
            {n:"Vector", d:"Scalable illustrations & icons", icon:"✒️"},
            {n:"3D", d:"Render 3D scenes & objects", icon:"🧊"},
            {n:"Motion", d:"Animate graphics & videos", icon:"▶️"},
            {n:"Mockup", d:"Product & device mockups", icon:"📱"},
            {n:"Template", d:"Ready-to-use brand templates", icon:"📄"},
          ].map(s=>(
            <div key={s.n} className="relative p-5 rounded-[16px] bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[60px] h-[28px] rounded-[8px] bg-[#EDE0C5] flex items-center justify-center text-[14px]">{s.icon}</div>
              <div className="mt-4 font-bold text-[16px]">{s.n}</div>
              <div className="mt-1 text-[12px] opacity-60">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BUILT FOR TEAMS - Like Screenshot */}
      <section className="px-6 md:px-10 py-12 max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[24px] md:text-[28px] font-black">Built for modern creative teams</h2>
          <p className="text-[13px] opacity-60 mt-1">Collaborate, automate, and keep your brand on point—at scale.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EDE0C5] flex items-center justify-center flex-shrink-0">✨</div>
            <div><h4 className="font-bold text-[14px]">Scale with automation</h4><p className="text-[12px] opacity-60 mt-1 leading-relaxed">Generate hundreds of on-brand visuals in minutes with AI workflows and bulk export.</p></div>
          </div>
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EDE0C5] flex items-center justify-center flex-shrink-0">🛡️</div>
            <div><h4 className="font-bold text-[14px]">Consistent brand quality</h4><p className="text-[12px] opacity-60 mt-1 leading-relaxed">Lock brand kits, colors, and styles to ensure every asset stays on brand.</p></div>
          </div>
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EDE0C5] flex items-center justify-center flex-shrink-0">👥</div>
            <div><h4 className="font-bold text-[14px]">Collaborate in real time</h4><p className="text-[12px] opacity-60 mt-1 leading-relaxed">Comment, review, and share with your team seamlessly across projects.</p></div>
          </div>
        </div>
      </section>

      {/* TRICKY PRICING */}
      <section className="px-6 md:px-10 py-12 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-[20px] bg-white border"><div className="text-[11px] font-black opacity-40">FREE</div><div className="text-[28px] font-black mt-2">₹0 / 10 credits</div><div className="text-[12px] opacity-60 mt-3">✓ Watermarked • Batch 5 • Try all studios</div></div>
          <div className="p-6 rounded-[20px] bg-black text-white -mt-2 shadow-xl"><div className="text-[11px] font-black text-[#C9A86A]">CREATOR • MOST POPULAR</div><div className="text-[28px] font-black mt-2">₹499 / 100 credits</div><div className="text-[11px] mt-2 bg-white/10 px-3 py-1 rounded-full inline-block">Vector ₹2 = 100% profit</div><div className="text-[12px] opacity-70 mt-3">✓ Batch 100x • API • No watermark • SVG/EPS/AI</div></div>
          <div className="p-6 rounded-[20px] bg-[#C9A86A]/20 border border-[#C9A86A]/30"><div className="text-[11px] font-black">PRO • AGENCY</div><div className="text-[28px] font-black mt-2">₹1999 / 600 credits</div><div className="text-[11px] mt-2 bg-black text-white px-3 py-1 rounded-full inline-block">Resell API 85% margin</div><div className="text-[12px] opacity-70 mt-3">✓ Batch 500x • White-label • Team 5</div></div>
        </div>
      </section>

      {/* FOOTER CTA - Like Screenshot */}
      <section className="px-6 md:px-10 pb-10">
        <div className="max-w-[1280px] mx-auto p-6 md:p-8 rounded-[20px] bg-black text-white text-center">
          <h3 className="text-[20px] font-bold">Ready to build visuals at scale?</h3>
          <p className="text-[13px] opacity-70 mt-1">Join thousands of teams creating on VISFORA. Start today and ship visuals faster.</p>
          <div className="mt-5 flex justify-center gap-3">
            <a href="/vector" className="h-[40px] px-6 rounded-[10px] bg-white text-black font-bold text-[13px] flex items-center">Get started now</a>
            <a href="/login" className="h-[40px] px-6 rounded-[10px] border border-white/30 font-medium text-[13px] flex items-center">Talk to sales</a>
          </div>
        </div>
        <div className="text-center text-[11px] opacity-40 mt-4">© 2024 VISFORA • Terms • Privacy • Careers • Contact • Delhi • Batch 100x</div>
      </section>
    </div>
  )
}