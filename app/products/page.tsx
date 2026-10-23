"use client";
import Link from "next/link";

const studios = [
  { icon: "📷", title: "Photo", desc: "Retouch, grade, and organize.\nFast, clean, natural results." },
  { icon: "✏️", title: "Vector", desc: "Scalable graphics made simple.\nShapes, strokes, precision." },
  { icon: "⬔", title: "3D", desc: "Model, light, and render.\nLightweight 3D for every idea." },
  { icon: "⬔", title: "3D", desc: "Animate with ease.\nMicro-" },
  { icon: "🗒️", title: "Template", desc: "Start fast with ready layouts.\nDesigned for real projects." },
  { icon: "🗒️", title: "Template", desc: "Start fast with ready layouts.\nDesigned for real projects." },
  { icon: "📱", title: "Mockup", desc: "Showcase designs in clean scenes.\nDrag. Drop. Done." },
  { icon: "✨", title: "Motion", desc: "Animate with ease. Micro-interactions\n& playful motion." },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F9F5EB] text-black font-sans">
      {/* HEADER */}
      <div className="text-center pt-10 pb-6 bg-[#FFFCF7] border-b border-black/5">
        <h1 className="text-6xl font-serif font-black tracking-tighter">VF</h1>
        <p className="tracking-[0.5em] text-sm mt-1">VISFORA</p>
        <div className="flex justify-center gap-2 text-[13px] mt-3 font-medium">
          <Link href="/products" className="font-bold underline">Products</Link>
          <span>·</span><span>Studios</span><span>·</span><span>Marketplace</span><span>·</span><span>Pricing</span><span>·</span><span>Docs</span>
        </div>
      </div>
      
      {/* Gradient Line */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#7C5CFF] via-[#D4A76A] to-[#7C5CFF]/20" />

      {/* HERO */}
      <div className="max-w-[1000px] mx-auto px-6 text-center mt-10">
        <h2 className="text-3xl md:text-[36px] font-bold">Studios, built for joyful creation</h2>
        <p className="text-[15px] mt-2 opacity-80">Six focused studios. One seamless workspace. Playful, precise, and made for makers.</p>
        
        <div className="flex justify-center gap-3 mt-6">
          <Link href="/product?prompt=football" className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4A76A] to-[#7C5CFF] text-white text-sm font-medium">
            Explore the Marketplace
          </Link>
          <button className="px-6 py-2.5 rounded-lg bg-[#FFFCF7] border border-black/10 text-sm">Learn how it works</button>
        </div>
      </div>

      {/* 6 STUDIOS */}
      <div className="max-w-[1000px] mx-auto px-6 mt-12">
        <h3 className="text-xl font-bold mb-4">6 Studios</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studios.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-black/10 p-4 shadow-sm">
              <div className="text-[#C9A96A] text-xl">{s.icon}</div>
              <h4 className="font-bold mt-2 text-sm">{s.title}</h4>
              <p className="text-[11px] mt-1 whitespace-pre-line opacity-70 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ASSETS */}
        <h3 className="text-xl font-bold mt-10">Assets Marketplace</h3>
        <p className="text-sm opacity-70">A curated marketplace for assets that feel good to use. Premium. Playful. Always on-brand.</p>
        
        <div className="bg-[#FFFCF7]/80 rounded-xl border border-black/5 p-4 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-[11px] bg-[#F6F1E8] border px-3 py-1 rounded-full">● Thousands of ready assets</span>
            <span className="text-[11px] bg-[#F6F1E8] border px-3 py-1 rounded-full">● Licensed for commercial use</span>
            <span className="text-[11px] bg-[#F6F1E8] border px-3 py-1 rounded-full">● Updated weekly — fresh & fun</span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-xl border mt-4 p-4">
            <div>
              <p className="font-bold text-sm">Launch your next project faster</p>
              <p className="text-[11px] opacity-60">Browse bundles, mockups, and motion packs — designed to keep your work consistent and joyful.</p>
            </div>
            <Link href="/" className="text-xs border border-[#D4A76A] px-4 py-2 rounded-lg">Open Marketplace →</Link>
          </div>
        </div>
        
        <div className="text-center text-[11px] opacity-50 mt-10 pb-10">
          © 2024 Visfora · Made with care · Privacy · Terms · Contact
        </div>
      </div>
    </div>
  );
}