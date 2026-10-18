"use client";
import { useState } from "react";
import Link from "next/link";
import HeaderHome from "@/components/home/HeaderHome";
import FooterHome from "@/components/home/FooterHome";

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const prices = {
    starter: { m: 499, y: 399 },
    pro: { m: 1999, y: 1599 },
    business: { m: 4999, y: 3999 },
  };

  const isMonthly = billing === "monthly";
  const isYearly = billing === "yearly";

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black antialiased">
      <HeaderHome />

      {/* FONT-STYLE PREMIUM - Editorial mix serif + sans */}
      <section className="max-w-[1280px] mx-auto px-6 pt-14 pb-6 text-center">
        <h1 className="text-[38px] md:text-[58px] font-[800] tracking-[-0.03em] leading-[0.9] text-black">
          CRAFTED BY AI, FOR <span className="font-serif font-[700] italic tracking-[-0.01em] text-[#C9A86A]">CREATORS</span>
        </h1>
        <p className="mt-4 text-[14px] tracking-[0.02em] text-black/50 font-[450]">
          Generate studio-quality product photos for Amazon in seconds
        </p>
      </section>

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-[18px] border border-black/[0.08] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3">
            <span>🔍</span>
            <input placeholder="Describe your product visual..." className="w-full outline-none bg-transparent text-sm" />
          </div>
          <Link href="/product" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white">✨ Text to Photo</Link>
          <Link href="/photo-studio" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white">📦 Image to 3D</Link>
          <Link href="/batch-studio" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white">🗂 Batch Mode</Link>
          <Link href="/product" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white">⊞ Templates</Link>
          <Link href="/photo-studio" className="px-5 py-2 rounded-full bg-[#D4B87A] font-semibold text-sm">✨ Generate</Link>
        </div>
        <div className="flex justify-center gap-3 mt-5">
          <Link href="/photo-studio" className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium">Start creating free</Link>
          <Link href="/resources" className="px-6 py-3 rounded-full border border-black/10 bg-white text-sm font-medium">Watch demo</Link>
        </div>
      </div>

      {/* FONT-STYLE PREMIUM - second */}
      <section className="max-w-[1280px] mx-auto px-6 mt-16 text-center">
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.025em] leading-[1.15]">
          From Photos to 3D — <span className="font-serif font-semibold italic text-black/70">All in One Studio</span>
        </h2>
        <p className="mt-2.5 text-[12px] tracking-[0.04em] uppercase font-medium text-black/40">
          Studios showcase — Text to 3D models • AI texturing • PBR maps • Turn ideas into 3D fast, realistic
        </p>
      </section>

      {/* CARD-STYLE PREMIUM TRENDY - soft, floating, no thick border */}
      <section className="max-w-[1280px] mx-auto px-6 mt-8 grid md:grid-cols-3 gap-6">
        <Link href="/photo-studio" className="group rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300">
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">01 Photo Studio</div>
          <div className="font-semibold mt-2 text-[14.5px] tracking-tight">Output: before & after shoe transformation</div>
          <div className="mt-4 rounded-[14px] bg-[#FAF6EE] border border-black/[0.04] p-3.5 text-[12px] font-medium text-black/70">BEFORE → AFTER | Studio lighting auto-fix</div>
        </Link>
        <Link href="/batch-studio" className="group rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300">
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">02 Batch Studio</div>
          <div className="font-semibold mt-2 text-[14.5px] tracking-tight">100 images • 2 min</div>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px]"><span className="px-3 py-1.5 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium">Social Post</span><span className="px-3 py-1.5 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium">Holiday Sale</span><span className="px-3 py-1.5 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium">New Launch</span><span className="px-3 py-1.5 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium">Promo Offer</span></div>
        </Link>
        <Link href="/product" className="group rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300">
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">03 Template Studio</div>
          <div className="font-semibold mt-2 text-[14.5px] tracking-tight">Instant 3D Templates</div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 text-[11px] font-medium">
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7]">Text to 3D models</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7]">AI texturing</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7]">PBR maps</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7]">Turn ideas into 3D fast</div>
          </div>
        </Link>
      </section>

      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-20 pb-20">
        <div className="text-center">
          <div className="font-extrabold tracking-[-0.03em] text-[32px] md:text-[40px] leading-none">PRICING</div>
          <p className="mt-3 text-[11px] tracking-[0.12em] uppercase font-semibold text-black/35">
            Simple, transparent pricing — scale your visuals without breaking the bank
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={isMonthly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Monthly</span>
            <button onClick={() => setBilling(isMonthly ? "yearly" : "monthly")} className="relative w-14 h-7 rounded-full bg-black/[0.08] border border-black/10 p-1">
              <div className={isYearly ? "w-5 h-5 rounded-full bg-[#D4B87A] shadow translate-x-6 transition-all duration-300" : "w-5 h-5 rounded-full bg-black shadow transition-all duration-300"} />
            </button>
            <span className={isYearly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Yearly <span className="bg-[#F5E6C6] px-2 py-0.5 rounded-full ml-1 text-[10px] font-bold">20% OFF</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
            <div className="font-medium text-[13px] tracking-tight">Starter</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.starter.m : prices.starter.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 50 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Basic AI edits</li><li>✓ Email support</li></ul>
            <Link href="/get-started?plan=starter" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white hover:bg-black hover:text-white transition">Start Starter</Link>
          </div>

          <div className="rounded-[24px] border border-black bg-black text-white p-7 text-center relative shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all">
            <div className="absolute top-4 right-4 text-[9px] bg-[#D4B87A] text-black px-2.5 py-1 rounded-full font-bold tracking-widest">Most Popular</div>
            <div className="font-medium text-[13px] tracking-tight">Pro</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.pro.m : prices.pro.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 500 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-white/80"><li>✓ Advanced AI edits</li><li>✓ Batch processing</li><li>✓ Priority support</li></ul>
            <Link href="/get-started?plan=pro" className="block w-full mt-6 py-3 rounded-full bg-[#D4B87A] text-black text-[13px] font-semibold">Get Pro</Link>
          </div>

          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
            <div className="font-medium text-[13px] tracking-tight">Business</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.business.m : prices.business.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 2000 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Custom styles</li><li>✓ Team collaboration</li><li>✓ API access</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white hover:bg-black hover:text-white transition">Talk to Sales</Link>
          </div>

          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
            <div className="font-medium text-[13px] tracking-tight">Enterprise • Custom</div>
            <div className="text-[20px] font-bold tracking-tight mt-3">Custom</div>
            <div className="text-[11px] opacity-60 mt-1">Contact us for volume</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Unlimited images</li><li>✓ Dedicated manager • SLA and security</li><li>✓ Custom integration</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white hover:bg-black hover:text-white transition">Contact Us</Link>
          </div>
        </div>
      </section>

      <FooterHome />
    </div>
  );
}