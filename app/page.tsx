"use client";
import { useState } from "react";

export default function Home() {
  const [isYearly, setIsYearly] = useState(true);

  // Pricing - INDIA TRICKY LIKE CANVA + MESHY + TRIPO
  const plans = [
    {
      name: "Free",
      m: 0, y: 0,
      tag: "Explore",
      desc: "Try all 6 studios with limits",
      features: ["20 generations / month", "Access to 6 Studios", "Standard quality export", "Community templates", "CC BY license"],
      cta: "Start for Free",
      pop: false,
    },
    {
      name: "Pro",
      m: 1499, y: 999,
      tag: "Most Popular",
      desc: "For freelancers & creators",
      features: ["500 generations / month", "HD 4K export", "No watermark", "PBR + Quad topology", "API access 1000 calls", "Blender/Unity plugins", "Commercial license"],
      cta: "Start Pro Trial",
      pop: true,
    },
    {
      name: "Team",
      m: 2999, y: 1999,
      tag: "Scale",
      desc: "For teams shipping fast",
      features: ["Unlimited generations", "Priority queue", "Team workspace + Brand Kit", "MCP server access", "SSO + Admin", "5000 API calls + Webhooks", "Dedicated support"],
      cta: "Start Team Trial",
      pop: false,
    },
  ];

  const studios = [
    { name: "Photo Studio", icon: "📷", tools: "BG Remove, Magic Eraser, Upscale, Retouch", canvaRef: "Like Canva BG Remover", meshyRef: "-", tripoRef: "-", status: "Live", desc: "AI photo gen, background removal, lighting, retouch. Export JPG/PNG/WEBP" },
    { name: "Vector Studio", icon: "✒️", tools: "Pen, Boolean, Auto-Trace, Brand Kit", canvaRef: "Like Canva Logo Maker + Brand Kit", meshyRef: "-", tripoRef: "-", status: "Live", desc: "Logo, icons, illustrations. SVG, PDF export with layers" },
    { name: "3D Studio", icon: "🧊", tools: "Text-to-3D, Image-to-3D, Meshy-6, Tripo H3.1", canvaRef: "-", meshyRef: "Like Meshy Text-to-3D + PBR", tripoRef: "Like Tripo Quad + 4K PBR", status: "Live", desc: "Watertight mesh, auto-rig, 586 animations. Export GLB/FBX/OBJ/STL/USDZ" },
    { name: "Motion Studio", icon: "🎞️", tools: "Auto-Animate, Keyframes, Lottie export", canvaRef: "Like Canva Animate", meshyRef: "Like Meshy Auto-Rig", tripoRef: "-", status: "Coming Soon", desc: "Motion graphics, transitions. Export MP4/GIF/Lottie" },
    { name: "Mockup Studio", icon: "📦", tools: "Device, Packaging, Print mockups", canvaRef: "Like Canva Mockups", meshyRef: "-", tripoRef: "-", status: "Live", desc: "500+ realistic mockups. Smart object replacement" },
    { name: "Template Studio", icon: "🎨", tools: "500+ templates, Magic Resize", canvaRef: "Like Canva Templates", meshyRef: "-", tripoRef: "-", status: "Live", desc: "Social, ads, pitch decks, resume. 1-click resize" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F3EE] via-[#FDFBF7] to-[#EDE6DB] text-[#0B0B0B] selection:bg-[#C9A86A]/20">

      {/* HEADER LIKE CANVA + MESHY */}
      <header className="sticky top-0 z-50 bg-[#F6F3EE]/85 backdrop-blur-xl border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/logo/VISFORA_FINAL.png" alt="VISFORA" className="h-11 w-auto object-contain" />
            <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-black/70">
              <span className="hover:text-black cursor-pointer flex items-center gap-1">Product ▾</span>
              <span className="hover:text-black cursor-pointer flex items-center gap-1">Studios ▾</span>
              <a href="#api" className="hover:text-black">API</a>
              <a href="#mcp" className="hover:text-black flex items-center gap-1">MCP <span className="bg-[#C9A86A] text-white text-[9px] px-1.5 py-0.5 rounded-full">NEW</span></a>
              <a href="#pricing" className="hover:text-black">Pricing</a>
              <span className="hover:text-black cursor-pointer">Resources ▾</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/signin" className="px-5 py-2 rounded-full bg-white border border-black/10 text-[14px] font-medium hover:bg-black/5">Log in</a>
            <a href="/signup" className="px-5 py-2 rounded-full bg-[#0B0B0B] text-white text-[14px] font-semibold hover:bg-black">Sign up — Free</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-[1280px] px-6 pt-20 pb-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#C9A86A]/25 via-[#F6D8A8]/15 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 shadow-sm rounded-full px-3 py-1 text-[11px] font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> NEW: Tripo H3.1 + Meshy-6 + Canva-like Brand Kit Live
          </div>
          <h1 className="text-[44px] md:text-[68px] font-black tracking-[-0.04em] leading-[0.9]">All-in-One AI Design Stack</h1>
          <p className="mt-5 text-[17px] text-black/60 max-w-[760px] mx-auto leading-relaxed">
            Canva for 2D, Meshy for 3D, Tripo for PBR — all in one platform. Create photos, vectors, 3D, motion, mockups & templates with API, MCP, and plugins for Blender, Unity, Figma.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/signup" className="px-8 py-3.5 rounded-full bg-[#0B0B0B] text-white font-semibold text-[15px] shadow-xl">Get Started Free — No CC</a>
            <a href="#demo" className="px-6 py-3.5 rounded-full bg-white border border-black/10 font-medium text-[15px]">▶ Watch 30s Demo</a>
          </div>
          <p className="mt-4 text-[12px] text-black/40">Trusted by 10k+ creators • Free plan • 4.8/5 on G2 • Exports: PNG, SVG, GLB, FBX, OBJ, STL, USDZ, MP4, Lottie</p>
        </div>
      </section>

      {/* 6 STUDIOS - DETAILED LIKE MESHY + CANVA */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16">
        <h2 className="text-[24px] font-bold">Six Studios. One Platform.</h2>
        <p className="text-[14px] text-black/50 mb-6">Everything you need to design — powered by tools like Canva, Meshy, Tripo3D</p>
        <div className="grid md:grid-cols-3 gap-5">
          {studios.map(s => (
            <div key={s.name} className="bg-white border border-black/5 rounded-[16px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-[10px] bg-[#F6F3EE] flex items-center justify-center text-[18px]">{s.icon}</div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${s.status==="Live"? "bg-green-500 text-white" : "bg-[#C9A86A] text-white"}`}>{s.status}</span>
              </div>
              <h3 className="mt-3 font-bold text-[15px]">{s.name}</h3>
              <p className="text-[12px] text-black/60 mt-1 leading-snug">{s.desc}</p>
              <p className="text-[11px] text-black/40 mt-3"><b>Tools:</b> {s.tools}</p>
              <p className="text-[10px] text-black/30 mt-1">{s.canvaRef} {s.meshyRef} {s.tripoRef}</p>
              {s.status==="Coming Soon" && <div className="mt-3 text-[11px] font-semibold text-[#C9A86A]">Notify me →</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES MIDDLE LIKE CANVA */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 grid md:grid-cols-3 gap-5">
        <div className="bg-white border border-black/5 rounded-[16px] p-6"><h4 className="font-bold text-[14px]">🔌 API + MCP Server</h4><p className="text-[12px] text-black/60 mt-2">REST API like Meshy/Tripo: Text-to-3D, Image-to-3D, Text-to-Image. MCP for Claude/Cursor: `npx visfora-mcp`. Async tasks, webhooks, GLB/FBX callbacks.</p><code className="text-[10px] bg-black text-white px-2 py-1 rounded mt-3 block">POST /v2/openapi/task {"text": "a cat"}</code></div>
        <div className="bg-white border border-black/5 rounded-[16px] p-6"><h4 className="font-bold text-[14px]">🎨 Brand Kit + Templates</h4><p className="text-[12px] text-black/60 mt-2">Like Canva: Upload logo, fonts, colors. AI applies branding to all 6 studios. 500+ templates, Magic Resize, social scheduler — coming soon.</p></div>
        <div className="bg-white border border-black/5 rounded-[16px] p-6"><h4 className="font-bold text-[14px]">🔗 Integrations</h4><p className="text-[12px] text-black/60 mt-2">Blender Add-on, Unity, Unreal, Figma Plugin, Godot, Bambu Studio direct print. Like Meshy plugins. API keys: TRIPO_API_KEY style.</p></div>
      </section>

      {/* PRICING INR - TRICKY */}
      <section id="pricing" className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="text-center">
          <h2 className="text-[28px] font-black">Pricing built for India — Save 33% yearly</h2>
          <p className="text-[13px] text-black/60">Like Canva Pro $12.99 + Meshy Pro $20 — we bundle at ₹999. GST incl.</p>
          <div className="mt-6 inline-flex p-1 rounded-full bg-white border border-black/10">
            <button onClick={()=>setIsYearly(false)} className={`px-5 py-2 rounded-full text-[13px] font-bold ${!isYearly?"bg-black text-white":"text-black/60"}`}>Monthly</button>
            <button onClick={()=>setIsYearly(true)} className={`px-5 py-2 rounded-full text-[13px] font-bold flex gap-2 ${isYearly?"bg-black text-white":"text-black/60"}`}>Yearly <span className="bg-[#C9A86A] text-white px-2 py-0.5 rounded-full text-[10px]">Save 33%</span></button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {plans.map(p=>{
            const price = isYearly? p.y: p.m;
            return (
              <div key={p.name} className={`rounded-[20px] border p-7 ${p.pop?"bg-black text-white scale-[1.03] shadow-2xl":"bg-white"}`}>
                {p.pop && <div className="bg-[#C9A86A] text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit -mt-10 mb-4">Most Popular</div>}
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-[12px] opacity-60">{p.desc}</p>
                <p className="mt-3 text-[36px] font-black">₹{price}<span className="text-[13px] font-normal opacity-60">/mo</span></p>
                {p.name!=="Free" && <p className="text-[11px] opacity-50">Billed ₹{price*12}/year • Save ₹{(p.m-p.y)*12} • GST incl</p>}
                <ul className="mt-5 space-y-2">{p.features.map(f=><li key={f} className="text-[12.5px] flex gap-2"><span className="text-[#C9A86A]">✓</span>{f}</li>)}</ul>
                <button className={`w-full mt-6 py-3 rounded-full font-semibold text-[13px] ${p.pop?"bg-white text-black":"bg-black text-white"}`}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </section>

      {/* FOOTER LIKE CANVA - COMPLETE */}
      <footer className="bg-white border-t border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-[13px]">
          <div><p className="font-bold mb-3">Product</p><p className="opacity-60 space-y-2 flex flex-col"><span>Photo Studio</span><span>Vector Studio</span><span>3D Studio (Meshy/Tripo)</span><span>Motion Studio — Coming Soon</span><span>Mockup Studio</span><span>Template Studio</span></p></div>
          <div><p className="font-bold mb-3">Developers</p><p className="opacity-60 space-y-2 flex flex-col"><span>API Docs /v2/openapi</span><span>MCP Server</span><span>Blender Add-on</span><span>Unity/Unreal SDK</span><span>Figma Plugin — Coming Soon</span><span>Webhooks</span></p></div>
          <div><p className="font-bold mb-3">Features</p><p className="opacity-60 space-y-2 flex flex-col"><span>Text-to-3D / Image-to-3D</span><span>PBR 4K Textures</span><span>Quad Topology + Rigging</span><span>BG Remover + Upscale</span><span>Brand Kit + Magic Resize</span><span>Export GLB/FBX/STL/USDZ</span></p></div>
          <div><p className="font-bold mb-3">Pricing</p><p className="opacity-60 space-y-2 flex flex-col"><span>Free — ₹0</span><span>Pro — ₹999/yr</span><span>Team — ₹1999/yr</span><span>Enterprise — Custom</span><span>Credits System</span><span>GST Invoice</span></p></div>
          <div><p className="font-bold mb-3">Resources</p><p className="opacity-60 space-y-2 flex flex-col"><span>Tutorials</span><span>Community</span><span>Changelog</span><span>Roadmap</span><span>Help Center</span><span>Contact</span></p></div>
          <div><p className="font-bold mb-3">Legal</p><p className="opacity-60 space-y-2 flex flex-col"><span>Privacy</span><span>Terms</span><span>License (CC BY/Commercial)</span><span>Status</span><span>Made for India 🇮🇳</span></p></div>
        </div>
        <div className="border-t border-black/5 py-6 text-center text-[12px] opacity-40">VISFORA © 2024 • All-in-One AI Design Stack • API • MCP • 6 Studios • Built like Canva + Meshy + Tripo3D • <a href="/signin">Sign in</a> • <a href="/signup">Sign up</a></div>
      </footer>
    </div>
  );
}
