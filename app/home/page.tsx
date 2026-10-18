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
    <div className="min-h-screen bg-[#FFFCF7] text-black">
      <HeaderHome />

      {/* MAIN HEADING */}
      <section className="max-w-[1280px] mx-auto px-6 pt-12 pb-6 text-center">
        <h1 className="text-[40px] md:text-[56px] font-black tracking-tight leading-[0.95]">
          CRAFTED BY AI, FOR <span className="text-[#C9A86A]">CREATORS</span>
        </h1>
        <p className="mt-3 text-[15px] text-black/60">
          Generate studio-quality product photos for Amazon in seconds
        </p>
      </section>

      {/* CREATION BAR */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-[18px] border border-black/10 bg-white shadow-sm">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3">
            <span>🔍</span>
            <input placeholder="Describe your product visual..." className="w-full outline-none bg-transparent text-sm" />
          </div>
          <Link href="/product" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white hover:bg-black hover:text-white">✨ Text to Photo</Link>
          <Link href="/photo-studio" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white hover:bg-black hover:text-white">📦 Image to 3D</Link>
          <Link href="/batch-studio" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white hover:bg-black hover:text-white">🗂 Batch Mode</Link>
          <Link href="/product" className="px-3 py-1.5 rounded-full border text-xs font-medium bg-white hover:bg-black hover:text-white">⊞ Templates</Link>
          <Link href="/photo-studio" className="px-5 py-2 rounded-full bg-[#D4B87A] font-semibold text-sm">✨ Generate</Link>
        </div>
        <div className="flex justify-center gap-3 mt-5">
          <Link href="/photo-studio" className="px-6 py-3 rounded-full bg-black text-white text-sm font-semibold">Start creating free</Link>
          <Link href="/resources" className="px-6 py-3 rounded-full border border-black/20 bg-white text-sm font-semibold">Watch demo</Link>
        </div>
        {/* 1 - REMOVED: Trusted by 500+ creators & brands */}
      </div>

      {/* 2 - NEW SUB-HEADING + 3 - MOVED LINE BELOW IT */}
      <section className="max-w-[1280px] mx-auto px-6 mt-14 text-center">
        <h2 className="text-[28px] md:text-[38px] font-black tracking-tight leading-[1.1]">
          From Photos to 3D — All in One Studio
        </h2>
        <p className="mt-2 text-[14px] text-black/50">
          Studios showcase — Text to 3D models • AI texturing • PBR maps • Turn ideas into 3D fast, realistic
        </p>
      </section>

      {/* STUDIOS CARDS */}
      <section className="max-w-[1280px] mx-auto px-6 mt-8 grid md:grid-cols-3 gap-5">
        <Link href="/photo-studio" className="rounded-2xl border bg-white p-4 hover:shadow-lg transition">
          <div className="text-xs text-[#C9A86A] font-semibold">01 Photo Studio</div>
          <div className="font-semibold mt-1">Output: before & after shoe transformation</div>
          <div className="mt-3 rounded-xl bg-[#f5f2eb] p-3 text-xs">BEFORE → AFTER | Studio lighting auto-fix</div>
        </Link>
        <Link href="/batch-studio" className="rounded-2xl border bg-white p-4 hover:shadow-lg transition">
          <div className="text-xs text-[#C9A86A] font-semibold">02 Batch Studio</div>
          <div className="font-semibold mt-1">100 images • 2 min</div>
          <div className="mt-3 flex gap-2 text-[10px]"><span className="px-2 py-1 bg-[#F6F1E8] rounded">Social Post</span><span className="px-2 py-1 bg-[#F6F1E8] rounded">Holiday Sale</span><span className="px-2 py-1 bg-[#F6F1E8] rounded">New Launch</span><span className="px-2 py-1 bg-[#F6F1E8] rounded">Promo Offer</span></div>
        </Link>
        <Link href="/product" className="rounded-2xl border bg-white p-4 hover:shadow-lg transition">
          <div className="text-xs text-[#C9A86A] font-semibold">03 Template Studio</div>
          <div className="font-semibold mt-1">Instant 3D Templates</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 border rounded">Text to 3D models</div>
            <div className="p-2 border rounded">AI texturing</div>
            <div className="p-2 border rounded">PBR maps</div>
            <div className="p-2 border rounded">Turn ideas into 3D fast</div>
          </div>
        </Link>
      </section>

      {/* 4 - PRICING CENTRE RESIZED + CATCHY LINE + TOGGLE CENTRE */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-16 pb-20">
        <div className="text-center">
          <div className="font-black tracking-tight text-[34px] md:text-[44px] leading-none">PRICING</div>
          <p className="mt-3 text-[15px] text-black/60">
            Simple, transparent pricing — scale your visuals without breaking the bank
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={isMonthly ? "text-sm font-bold text-black" : "text-sm text-black/40"}>Monthly</span>
            <button
              onClick={() => setBilling(isMonthly ? "yearly" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-black/10 border border-black/10 p-1"
            >
              <div className={isYearly ? "w-5 h-5 rounded-full bg-[#D4B87A] shadow translate-x-6 transition-all duration-300" : "w-5 h-5 rounded-full bg-black shadow transition-all duration-300"} />
            </button>
            <span className={isYearly ? "text-sm font-bold text-black" : "text-sm text-black/40"}>
              Yearly <span className="bg-[#F5E6C6] px-2 py-0.5 rounded-full ml-1 text-[11px]">20% OFF</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-10">
          <div className="rounded-2xl border bg-white p-6 text-center">
            <div className="font-semibold">Starter</div>
            <div className="text-[26px] font-extrabold mt-2">Rs{isMonthly ? prices.starter.m : prices.starter.y}/month</div>
            <div className="text-xs opacity-70 mt-1">Up to 50 images</div>
            <ul className="text-xs mt-3 text-left space-y-1"><li>✓ Basic AI edits</li><li>✓ Email support</li></ul>
            <Link href="/get-started?plan=starter" className="block w-full mt-5 py-2.5 rounded-lg border text-sm font-semibold hover:bg-black hover:text-white">Start Starter</Link>
          </div>

          <div className="rounded-2xl border bg-black text-white p-6 text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] bg-[#D4B87A] text-black px-2 py-1 rounded-full">Most Popular</div>
            <div className="font-semibold">Pro</div>
            <div className="text-[26px] font-extrabold mt-2">Rs{isMonthly ? prices.pro.m : prices.pro.y}/month</div>
            <div className="text-xs opacity-70 mt-1">Up to 500 images</div>
            <ul className="text-xs mt-3 text-left space-y-1"><li>✓ Advanced AI edits</li><li>✓ Batch processing</li><li>✓ Priority support</li></ul>
            <Link href="/get-started?plan=pro" className="block w-full mt-5 py-2.5 rounded-lg bg-[#D4B87A] text-black text-sm font-semibold">Get Pro</Link>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center">
            <div className="font-semibold">Business</div>
            <div className="text-[26px] font-extrabold mt-2">Rs{isMonthly ? prices.business.m : prices.business.y}/month</div>
            <div className="text-xs opacity-70 mt-1">Up to 2000 images</div>
            <ul className="text-xs mt-3 text-left space-y-1"><li>✓ Custom styles</li><li>✓ Team collaboration</li><li>✓ API access</li></ul>
            <Link href="/company" className="block w-full mt-5 py-2.5 rounded-lg border text-sm font-semibold hover:bg-black hover:text-white">Talk to Sales</Link>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center">
            <div className="font-semibold">Enterprise • Custom</div>
            <div className="text-[26px] font-extrabold mt-2">Custom</div>
            <div className="text-xs opacity-70 mt-1">Contact us for volume</div>
            <ul className="text-xs mt-3 text-left space-y-1"><li>✓ Unlimited images</li><li>✓ Dedicated manager • SLA and security</li><li>✓ Custom integration</li></ul>
            <Link href="/company" className="block w-full mt-5 py-2.5 rounded-lg border text-sm font-semibold hover:bg-black hover:text-white">Contact Us</Link>
          </div>
        </div>
      </section>

      <FooterHome />
    </div>
  );
}