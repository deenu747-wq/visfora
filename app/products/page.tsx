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
  { title: "Illustration", desc: "Draw, sketch, and illustrate.\nTools for creators & designers.", icon: "🎨", href: "/studios/vector-studio" },
  { title: "Mockup", desc: "Showcase designs in clean scenes.\nDrag. Drop. Done.", icon: "🖼️", href: "/studios/mockup-studio" },
  { title: "Audio", desc: "Edit audio, sound effects, and\nvoiceovers seamlessly.", icon: "✨", href: "/assets" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EE] text-[#111]">
      <HeaderHome />
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B7CFF] via-[#D8B26A] to-[#F3E8C9]" />
      <main className="max-w-[1120px] mx-auto px-6 py-10">
        <div className="text-center">
          <h1 className="text-[32px] md:text-[44px] font-black tracking-tight text-[#111]">Studios, built for joyful creation</h1>
          <p className="text-[14px] text-[#111]/70 mt-2">Six focused studios. One seamless workspace. Playful, precise, and made for makers.</p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/assets" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#8B7355] text-white text-[13px] font-semibold">Explore the Marketplace</Link>
            <Link href="/get-started" className="px-6 py-3 rounded-full bg-white border border-black/15 text-[13px] font-medium text-black">Learn how it works</Link>
          </div>
        </div>

        <h2 className="text-[18px] font-bold mt-12 text-black">6 Studios</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {studios.map((s) => (
            <Link key={s.title} href={s.href} className="bg-white rounded-[16px] border border-black/10 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-[8px] bg-[#FDF6E7] border flex items-center justify-center text-[#B8965A]">{s.icon}</div>
              <h3 className="font-bold text-[14px] mt-12 text-black">{s.title}</h3>
              <p className="text-[12px] text-black/60 mt-1 whitespace-pre-line leading-snug">{s.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-[20px] font-bold mt-12 text-black">✦ Assets Marketplace</h2>
        <p className="text-[13px] text-black/60 mt-1">A curated marketplace for assets that feel good to use. Premium. Playful. Always on-brand.</p>
        <div className="mt-4 bg-[#FFFCF7] rounded-[20px] border border-[#E9DFC8] p-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black">● Thousands of ready assets</span>
            <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black">● Licensed for commercial use</span>
            <span className="text-[11px] bg-[#F6F1E8] border border-[#E9DFC8] px-3 py-1.5 rounded-full text-black">● Updated weekly — fresh & fun</span>
          </div>
          <div className="mt-4 bg-white rounded-[14px] border border-[#E9DFC8] p-4 flex justify-between items-center">
            <p className="text-[12px] text-black/70 max-w-[500px]">Browse bundles, mockups, and motion packs — designed to keep your work consistent and joyful.</p>
            <Link href="/assets" className="h-10 px-5 rounded-full bg-gradient-to-r from-[#C9A96A] to-[#8B7355] text-white text-xs font-bold flex items-center">Open Marketplace →</Link>
          </div>
        </div>
      </main>
      <FooterHome />
    </div>
  );
}