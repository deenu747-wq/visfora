"use client";
import Link from "next/link";
import HeaderHome from "../../components/home/HeaderHome";
import FooterHome from "../../components/home/FooterHome";

const studios = [
  { title: "Photo", desc: "Retouch, grade, and organize.\nFast, clean, natural results.", icon: "📷", href: "/studios/photo-studio" },
  { title: "Vector", desc: "Scalable graphics made simple.\nShapes, strokes, precision.", icon: "✏️", href: "/studios/vector-studio" },
  { title: "3D Model", desc: "Model, light, and render.\nLightweight 3D for every idea.", icon: "⬡", href: "/studios/3d-studio" },
  { title: "3D Motion", desc: "Animate with ease. Keyframes,\nrigging, playful motion.", icon: "🎬", href: "/studios/motion-studio" },
  { title: "Templates", desc: "Start fast with ready layouts.\nDesigned for real projects.", icon: "🗂️", href: "/studios/template-studio" },
  { title: "Illustration", desc: "Draw, sketch and illustrate.\nTools for creators & designers.", icon: "🎨", href: "/studios/vector-studio" },
  { title: "Mockup", desc: "Showcase designs in clean scenes.\nDrag. Drop. Done.", icon: "🖼️", href: "/studios/mockup-studio" },
  { title: "Audio", desc: "Edit audio, sound effects, and\nvoiceovers seamlessly.", icon: "✨", href: "/assets" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EE] text-[#111]">
      <HeaderHome />
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B7CFF] via-[#D8B26A] to-[#F3E8C9]" />

      <main className="max-w-[1120px] mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Hero - CENTERED */}
        <div className="flex flex-col items-center">
          <h1 className="text-[32px] md:text-[46px] font-black tracking-tight">Studios, built for joyful creation</h1>
          <p className="text-[14px] text-black/60 mt-2">Six focused studios. One seamless workspace. Playful, precise, and made for makers.</p>
          
          {/* CTA CENTERED WITH HOVER */}
          <div className="flex justify-center gap-3 mt-7">
            <Link href="/assets" className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#8B7355] text-white text-[13px] font-bold shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:from-[#8B7355] hover:to-[#C9A96A]">
              Explore the Marketplace
            </Link>
            <Link href="/get-started" className="px-7 py-3 rounded-full bg-white border border-black/15 text-[13px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.05] hover:shadow-lg">
              Learn how it works
            </Link>
          </div>
        </div>

        {/* 6 STUDIOS - CENTERED */}
        <div className="w-full flex flex-col items-center mt-14">
          <h2 className="text-[18px] font-bold text-black">6 Studios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5 w-full">
            {studios.map((s) => (
              <Link key={s.title} href={s.href} className="group text-left bg-white rounded-[18px] border border-black/[0.08] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-[#C9A96A]/50 hover:bg-[#FFFCF3]">
                <div className="w-9 h-9 rounded-[10px] bg-[#FDF6E7] border border-[#E9DFC8] flex items-center justify-center text-[#B8965A] transition-all duration-300 group-hover:bg-black group-hover:text-[#FFD700] group-hover:scale-110">{s.icon}</div>
                <h3 className="font-bold text-[14px] mt-10 text-black group-hover:text-[#8B7355] transition-colors">{s.title}</h3>
                <p className="text-[12px] text-black/55 mt-1 whitespace-pre-line leading-snug">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ASSETS MARKETPLACE - CENTERED */}
        <div className="w-full flex flex-col items-center mt-14">
          <h2 className="text-[20px] font-bold text-black">✦ Assets Marketplace</h2>
          <p className="text-[13px] text-black/60 mt-1">A curated marketplace for assets that feel good to use. Premium. Playful. Always on-brand.</p>

          <div className="mt-5 w-full max-w-[900px] bg-[#FFFCF7] rounded-[22px] border border-[#E9DFC8] p-5 shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black transition hover:bg-white hover:border-[#C9A96A]">● Thousands of ready assets</span>
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black transition hover:bg-white hover:border-[#C9A96A]">● Licensed for commercial use</span>
              <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black transition hover:bg-white hover:border-[#C9A96A]">● Updated weekly — fresh & fun</span>
            </div>
            <div className="mt-4 bg-white rounded-[16px] border border-[#E9DFC8] p-4 flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[12px] text-black/60 text-left md:text-center w-full">Browse bundles, mockups, and motion packs — designed to keep your work consistent and joyful.</p>
              <Link href="/assets" className="shrink-0 h-11 px-6 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#8B7355] text-white text-xs font-bold flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#8B7355] hover:to-[#C9A96A]">
                Open Marketplace →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterHome />
    </div>
  );
}