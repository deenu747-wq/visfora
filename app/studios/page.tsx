"use client";
import Link from "next/link";
import { useState } from "react";

const studios = [
  {
    slug: "photo-studio",
    name: "Photo Studio",
    desc: "Text to professional product photos. 8K, shadow, lighting control.",
    tag: "Most Popular",
    color: "#111",
  },
  {
    slug: "batch-studio",
    name: "Batch Studio",
    desc: "Generate 100+ variations in one click. Bulk workflow for teams.",
    tag: "For Teams",
    color: "#111",
  },
  {
    slug: "3d-studio",
    name: "3D Studio",
    desc: "Template engine reimagined. Build 3D-ready templates in seconds.",
    tag: "New",
    color: "#111",
  },
  {
    slug: "vector-studio",
    name: "Vector Studio",
    desc: "Image to clean SVG vectors. Logo, icons, illustrations.",
    tag: "AI Vector",
    color: "#111",
  },
  {
    slug: "mockup-studio",
    name: "Mockup Studio",
    desc: "Instant mockups for packaging, apparel, and devices.",
    tag: "E-com",
    color: "#111",
  },
  {
    slug: "motion-studio",
    name: "Motion Studio",
    desc: "Static to motion. Product reels, ads, and animations.",
    tag: "Video",
    color: "#111",
  },
];

export default function StudiosPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black">
      {/* Header spacer - uses your main header */}
      <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-20">
        <div className="mb-16">
          <p className="text-[12px] tracking-[0.2em] uppercase opacity-50 mb-4">VISFORA STUDIOS</p>
          <h1 className="text-[56px] leading-[0.95] font-[700] tracking-[-0.03em] max-w-[600px]">
            Six studios.
            <br />
            <span className="font-[400] italic">One creative OS.</span>
          </h1>
          <p className="mt-6 text-[16px] opacity-60 max-w-[420px] leading-relaxed">
            Each studio is purpose-built for real production workflows. Not toys. Tools you ship with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((s) => (
            <Link
              key={s.slug}
              href={`/studios/${s.slug}`}
              className="group relative bg-white border border-black/[0.06] rounded-[24px] p-7 flex flex-col justify-between min-h-[320px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 rounded-full bg-[#FFFCF7] border border-black/5 flex items-center justify-center text-[18px]">
                    ✦
                  </div>
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-black text-white">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-[26px] font-semibold tracking-tight mb-3 group-hover:tracking-[-0.01em] transition-all">
                  {s.name}
                </h3>
                <p className="text-[14px] leading-[1.5] opacity-60 max-w-[240px]">{s.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium mt-10">
                <span>Open Studio</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note about API */}
        <div className="mt-10 rounded-[24px] bg-black text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-[18px] font-medium">MCP Server + API</h4>
            <p className="text-[13px] opacity-60 mt-1">Automate all 6 studios. For developers.</p>
          </div>
          <Link href="/get-started" className="px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-medium">
            View Docs →
          </Link>
        </div>
      </div>
    </div>
  );
}