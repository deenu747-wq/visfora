"use client";
import { useState } from "react";

export default function Home() {
  const [isYearly, setIsYearly] = useState(true);
  const plans = [
    { name: "Free", m: 0, y: 0, tag: "Explore", desc: "Try all 6 studios", features: ["20 generations / month","Access to 6 Studios","Standard export","Community templates","CC BY license"], cta: "Start for Free", pop: false },
    { name: "Pro", m: 1499, y: 999, tag: "Most Popular", desc: "For freelancers & creators", features: ["500 generations / month","HD 4K export","No watermark","PBR + Quad topology","API access 1000 calls","Blender/Unity plugins","Commercial license"], cta: "Start Pro Trial", pop: true },
    { name: "Team", m: 2999, y: 1999, tag: "Scale", desc: "For teams shipping fast", features: ["Unlimited generations","Priority queue","Team workspace + Brand Kit","MCP server access","SSO + Admin","5000 API calls + Webhooks","Dedicated support"], cta: "Start Team Trial", pop: false },
  ];
  const studios = [
    { name: "Photo Studio", icon: "📷", tools: "BG Remove, Magic Eraser, Upscale, Retouch", status: "Live", desc: "AI photo gen, background removal, retouch. Export JPG/PNG/WEBP" },
    { name: "Vector Studio", icon: "✒️", tools: "Pen, Boolean, Auto-Trace, Brand Kit", status: "Live", desc: "Logo, icons, illustrations. SVG, PDF export with layers" },
    { name: "3D Studio", icon: "🧊", tools: "Text-to-3D, Image-to-3D, Meshy-6, Tripo H3.1", status: "Live", desc: "Watertight mesh, auto-rig, 586 animations. Export GLB/FBX/OBJ/STL/USDZ" },
    { name: "Motion Studio", icon: "🎞️", tools: "Auto-Animate, Keyframes, Lottie", status: "Coming Soon", desc: "Motion graphics, transitions. Export MP4/GIF/Lottie" },
    { name: "Mockup Studio", icon: "📦", tools: "Device, Packaging, Print mockups", status: "Live", desc: "500+ realistic mockups. Smart object replacement" },
    { name: "Template Studio", icon: "🎨", tools: "500+ templates, Magic Resize", status: "Live", desc: "Social, ads, pitch decks, resume. 1-click resize" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F3EE] via-[#FDFBF7] to-[#EDE6DB] text-[#0B0B0B]">
      <header className="sticky top-0 z-50 bg-[#F6F3EE]/85 backdrop-blur-xl border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-black text-[20px] tracking-tight">VISFORA<span className="text-[#C9A86A]">.</span></div>
            <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-black/70">
              <span>Product</span><span>Studios</span><a href="#api">API</a><a href="#mcp">MCP NEW</a><a href="#pricing">Pricing</a><span>Resources</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/signin" className="px-5 py-2 rounded-full bg-white border border-black/10 text-[14px] font-medium">Log in</a>
            <a href="/signup" className="px-5 py-2 rounded-full bg-[#0B0B0B] text-white text-[14px] font-semibold">Sign up Free</a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-[1280px] px-6 pt-20 pb-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#C9A86A]/25 via-[#F6D8A8]/15 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1 text-[11px] font-medium mb-6">
            NEW: Tripo H3.1 + Meshy-6 + Canva-like Brand Kit Live
          </div>
          <h1 className="text-[44px] md:text-[68px] font-black tracking-[-0.04em] leading-[0.9]">All-in-One AI Design Stack</h1>
          <p className="mt-5 text-[17px] text-black/60 max-w-[760px] mx-auto">Canva for 2D, Meshy for 3D, Tripo for PBR — all in one. Photos, vectors, 3D, motion, mockups & templates with API, MCP, Blender, Unity, Figma.</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/signup" className="px-8 py-3.5 rounded-full bg-[#0B0B0B] text-white font-semibold">Get Started Free</a>
            <a href="#demo" className="px-6 py-3.5 rounded-full bg-white border border-black/10 font-medium">Watch Demo</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-16">
        <h2 className="text-[24px] font-bold">Six Studios. One Platform.</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {studios.map((s) => (
            <div key={s.name} className="bg-white border border-black/5 rounded-[16px] p-6 shadow-sm">
              <div className="flex justify-between"><div className="w-10 h-10 rounded-[10px] bg-[#F6F3EE] flex items-center justify-center">{s.icon}</div><span className={`text-[10px] px-2 py-1 rounded-full font-bold ${s.status==="Live"?"bg-green-500 text-white":"bg-[#C9A86A] text-white"}`}>{s.status}</span></div>
              <h3 className="mt-3 font-bold text-[15px]">{s.name}</h3>
              <p className="text-[12px] text-black/60 mt-1">{s.desc}</p>
              <p className="text-[11px] text-black/40 mt-3">Tools: {s.tools}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-16 grid md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-[16px] p-6"><h4 className="font-bold text-[14px]">API + MCP Server</h4><p className="text-[12px] text-black/60 mt-2">REST API like Meshy and Tripo. MCP for Claude and Cursor.</p><div className="text-[10px] bg-black text-white px-2 py-1 rounded mt-3">POST /v2/openapi/task</div></div>
        <div className="bg-white border rounded-[16px] p-6"><h4 className="font-bold text-[14px]">Brand Kit + Templates</h4><p className="text-[12px] text-black/60 mt-2">Like Canva: Logo, fonts, colors. 500 plus templates, Magic Resize coming soon.</p></div>
        <div className="bg-white border rounded-[16px] p-6"><h4 className="font-bold text-[14px]">Integrations</h4><p className="text-[12px] text-black/60 mt-2">Blender Add-on, Unity, Unreal, Figma Plugin, Godot, Bambu Studio direct print.</p></div>
      </section>

      <section id="pricing" className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="text-center">
          <h2 className="text-[28px] font-black">Pricing for India - Save 33% yearly</h2>
          <div className="mt-6 inline-flex p-1 rounded-full bg-white border">
            <button onClick={()=>setIsYearly(false)} className={`px-5 py-2 rounded-full text-[13px] font-bold ${!isYearly?"bg-black text-white":""}`}>Monthly</button>
            <button onClick={()=>setIsYearly(true)} className={`px-5 py-2 rounded-full text-[13px] font-bold ${isYearly?"bg-black text-white":""}`}>Yearly Save 33%</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {plans.map((p)=>{
            const price = isYearly? p.y : p.m;
            return (
              <div key={p.name} className={`rounded-[20px] border p-7 ${p.pop?"bg-black text-white scale-[1.02]":"bg-white"}`}>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-[12px] opacity-60">{p.desc}</p>
                <p className="mt-3 text-[36px] font-black">₹{price}<span className="text-[13px] font-normal opacity-60">/mo</span></p>
                {p.name!=="Free" && <p className="text-[11px] opacity-50">Billed ₹{price*12}/year Save ₹{(p.m-p.y)*12}</p>}
                <ul className="mt-5 space-y-2">{p.features.map((f)=><li key={f} className="text-[12px] flex gap-2"><span className="text-[#C9A86A]">✓</span>{f}</li>)}</ul>
                <button className={`w-full mt-6 py-3 rounded-full font-semibold text-[13px] ${p.pop?"bg-white text-black":"bg-black text-white"}`}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="bg-white border-t py-8 text-center text-[12px] opacity-40">VISFORA 2024 - Canva + Meshy + Tripo3D in one - API - MCP - 6 Studios</footer>
    </div>
  );
}
