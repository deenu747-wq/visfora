"use client";
import Link from "next/link";

const studios = [
  { title: "Photo", desc: "Retouch, grade, and organize.\nFast, clean, natural results.", icon: "📷", href: "/product?prompt=photo studio" },
  { title: "Vector", desc: "Scalable graphics made simple.\nShapes, strokes, precision.", icon: "✏️", href: "/product?prompt=vector studio" },
  { title: "3D Model", desc: "Model, light, and render.\nLightweight 3D for every idea.", icon: "⬡", href: "/product?prompt=3d model" },
  { title: "3D Motion", desc: "Animate with ease. Keyframes,\nrigging, playful motion.", icon: "⬔", href: "/product?prompt=3d motion" },
  { title: "Templates", desc: "Start fast with ready layouts.\nDesigned for real projects.", icon: "🗂️", href: "/product?prompt=templates" },
  { title: "Illustration", desc: "Draw, sketch, and illustrate.\nTools for creators & designers.", icon: "📝", href: "/product?prompt=illustration" },
  { title: "Mockup", desc: "Showcase designs in clean scenes.\nDrag. Drop. Done.", icon: "📱", href: "/product?prompt=mockup" },
  { title: "Audio", desc: "Edit audio, sound effects, and\nvoiceovers seamlessly.", icon: "✨", href: "/product?prompt=audio" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EE]">
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B7CFF] via-[#D8B26A] to-[#F3E8C9]" />

      <div className="max-w-[1120px] mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-[34px] md:text-[44px] font-bold tracking-tight">Studios, built for joyful creation</h1>
          <p className="text-[14px] text-black/60 mt-2 max-w-[620px] mx-auto">
            Six focused studios. One seamless workspace. Playful, precise, and made for makers.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/product?prompt=marketplace" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#6C5CFF] text-white text-[13px] font-semibold hover:scale-[1.02] transition">
              Explore the Marketplace
            </Link>
            <Link href="/#how-it-works" className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-medium hover:bg-black hover:text-white transition">
              Learn how it works
            </Link>
          </div>
        </div>

        {/* 6 Studios */}
        <h2 className="text-[20px] font-bold mt-12">6 Studios</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {studios.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group bg-white rounded-[20px] border border-[#E9DFC8] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all"
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FDF6E7] border border-[#E9DFC8] flex items-center justify-center text-[#B8965A] group-hover:bg-black group-hover:text-[#FFD700] transition">
                {s.icon}
              </div>
              <h3 className="font-bold text-[14px] mt-4">{s.title}</h3>
              <p className="text-[12px] text-black/55 mt-1 whitespace-pre-line leading-[1.4]">{s.desc}</p>
            </Link>
          ))}
        </div>

        {/* Assets Marketplace */}
        <div className="mt-12">
          <h2 className="text-[22px] font-bold flex items-center gap-2">✦ Assets Marketplace</h2>
          <p className="text-[13px] text-black/60 mt-1">A curated marketplace for assets that feel good to use. Premium. Playful. Always on-brand.</p>

          <div className="mt-4 bg-[#FFFCF7] rounded-[24px] border border-[#E9DFC8] p-4 md:p-5">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full">● Thousands of ready assets</span>
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full">● Licensed for commercial use</span>
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full">● Updated weekly — fresh & fun</span>
            </div>

            <div className="mt-4 bg-white rounded-[18px] border border-[#E9DFC8] p-5 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div>
                <p className="font-bold text-[15px]">Launch your next project faster</p>
                <p className="text-[12px] text-black/50 mt-1 max-w-[520px]">Browse bundles, mockups, and motion packs — designed to keep your work consistent and joyful.</p>
              </div>
              <Link href="/product?prompt=marketplace" className="shrink-0 h-11 px-6 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#6C5CFF] text-white text-[12px] font-semibold flex items-center hover:scale-[1.02] transition">
                Open Marketplace →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}