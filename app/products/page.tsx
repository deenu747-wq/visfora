"use client";
import Link from "next/link";

const list = [
  ["Photo", "Retouch, grade, and organize."],
  ["Vector", "Scalable graphics made simple."],
  ["3D", "Model, light, and render."],
  ["Animate", "Animate with ease."],
  ["Template", "Start fast with ready layouts."],
  ["Mockup", "Showcase in clean scenes."],
  ["Motion", "Micro-interactions & playful motion."],
  ["AI Product", "Generate products from text."],
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EE]">
      <div className="bg-[#FFFCF7] text-center py-8 border-b">
        <h1 className="text-6xl font-black">VF</h1>
        <p className="tracking-[0.5em] text-xs">VISFORA</p>
        <p className="text-xs mt-3">Products · Studios · Marketplace · Pricing · Docs</p>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#8B7CFF] to-[#D8B26A]" />

      <div className="max-w-[1000px] mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mt-6">Studios, built for joyful creation</h2>
        <p className="text-center text-sm opacity-60 mt-2">Six focused studios. One seamless workspace.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {list.map(([title, desc]) => (
            <Link key={title} href={`/product?prompt=${title}`} className="bg-white p-4 rounded-xl border">
              <h4 className="font-bold text-sm">{title}</h4>
              <p className="text-xs opacity-60 mt-1">{desc}</p>
            </Link>
          ))}
        </div>

        <p className="text-center text-[11px] opacity-40 mt-16">© 2024 Visfora</p>
      </div>
    </div>
  );
}