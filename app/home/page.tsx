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

      <section className="max-w-[1280px] mx-auto px-6 pt-14 pb-6 text-center">
        <h1 className="text-[38px] md:text-[60px] font-[800] tracking-[-0.03em] leading-[0.9] text-black">
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

      <section className="max-w-[1280px] mx-auto px-6 mt-16 text-center">
        <h2 className="text-[30px] md:text-[40px] font-bold tracking-[-0.025em] leading-[1.15]">
          From Photos to 3D — <span className="font-serif font-semibold italic text-black/70">All in One Studio</span>
        </h2>
        <p className="mt-3 text-[14px] tracking-[0.02em] font-medium text-black/40">
          Studios showcase — Text to 3D models • AI texturing • PBR maps • Turn ideas into 3D fast, realistic
        </p>
      </section>

      {/* RECTIFIED CARDS - ALL 3 POINTS FIXED */}
      <section className="max-w-[1280px] mx-auto px-6 mt-8 grid md:grid-cols-3 gap-6">
        {/* POINT-1: IMAGE FRAME + INCREASED BOX FONT */}
        <Link href="/photo-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
          <div className="p-6 pb-3">
            <div className="text-[16px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">01 Photo Studio</div>
            <div className="font-semibold mt-2 text-[14px] tracking-tight leading-tight">Studio-Grade Photo Enhancement • AI Background Removal</div>
          </div>
          {/* IMAGE FRAME */}
          <div className="mx-4 rounded-[16px] overflow-hidden border border-black/[0.06] bg-[#FAF6EE] aspect-[16/10]">
            <img src="/images/photo-studio-shoe-before-after.jpg" alt="Shoe before after" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          </div>
          <div className="p-4 mt-auto">
            <div className="rounded-[12px] bg-[#FAF6EE] border border-black/[0.04] p-3 text-[13px] font-medium text-black/70 text-center">BEFORE → AFTER | Studio lighting auto-fix</div>
          </div>
        </Link>

        {/* POINT-2: FRAME + 2+2 LAYOUT + UNIFORM 13px */}
        <Link href="/batch-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
          <div className="p-6 pb-3">
            <div className="text-[16px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">02 Batch Studio</div>
            <div className="font-semibold mt-2 text-[14px] tracking-tight">100 images • 2 min</div>
          </div>
          {/* IMAGE FRAME */}
          <div className="mx-4 rounded-[16px] overflow-hidden border border-black/[0.06] bg-[#FAF6EE] aspect-[16/10]">
            <img src="/images/batch-studio-100-images.jpg" alt="Batch 100 images" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          </div>
          <div className="p-4 mt-auto grid grid-cols-2 gap-2">
            <span className="px-3 py-2 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium text-[13px] text-center">Social Post</span>
            <span className="px-3 py-2 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium text-[13px] text-center">Holiday Sale</span>
            <span className="px-3 py-2 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium text-[13px] text-center">New Launch</span>
            <span className="px-3 py-2 bg-[#FFFCF7] border border-black/[0.06] rounded-full font-medium text-[13px] text-center">Promo Offer</span>
          </div>
        </Link>

        {/* POINT-3: FRAME + UNIFORM 13px */}
        <Link href="/product" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
          <div className="p-6 pb-3">
            <div className="text-[16px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">03 Template Studio</div>
            <div className="font-semibold mt-2 text-[14px] tracking-tight">Instant 3D Templates</div>
          </div>
          {/* IMAGE FRAME */}
          <div className="mx-4 rounded-[16px] overflow-hidden border border-black/[0.06] bg-[#FAF6EE] aspect-[16/10]">
            <img src="/images/template-studio-3d-instant.jpg" alt="3D Templates" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
          </div>
          <div className="p-4 mt-auto grid grid-cols-2 gap-2">
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7] text-[13px] font-medium text-center">Text to 3D models</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7] text-[13px] font-medium text-center">AI texturing</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7] text-[13px] font-medium text-center">PBR maps</div>
            <div className="p-2.5 border border-black/[0.06] rounded-[12px] bg-[#FFFCF7] text-[13px] font-medium text-center">Turn ideas into 3D fast</div>
          </div>
        </Link>
      </section>

      {/* POINT-4 & 5: PREMIUM FONT + REDUCED SPACING */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-10 pb-16">
        <div className="text-center">
          {/* POINT-4: PREMIUM FONT - Serif Editorial Luxury */}
          <h2 className="font-serif font-[900] tracking-[-0.04em] text-[36px] md:text-[52px] leading-[0.9]">Pricing</h2>
          <p className="mt-2 text-[14px] tracking-[0.02em] font-medium text-black/40">
            Simple, Transparent Pricing — Scale Your Visuals Without Breaking The Bank
          </p>
          {/* POINT-5: REDUCED SPACING mt-3 instead of mt-6 */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className={isMonthly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Monthly</span>
            <button onClick={() => setBilling(isMonthly ? "yearly" : "monthly")} className="relative w-14 h-7 rounded-full bg-black/[0.08] border border-black/10 p-1">
              <div className={isYearly ? "w-5 h-5 rounded-full bg-[#D4B87A] shadow translate-x-6 transition-all duration-300" : "w-5 h-5 rounded-full bg-black shadow transition-all duration-300"} />
            </button>
            <span className={isYearly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Yearly <span className="bg-[#F5E6C6] px-2 py-0.5 rounded-full ml-1 text-[10px] font-bold">20% OFF</span></span>
          </div>
        </div>

        {/* REDUCED SPACING mt-6 instead of mt-12 */}
        <div className="grid md:grid-cols-4 gap-6 mt-6">
          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="font-medium text-[13px] tracking-tight">Starter</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.starter.m : prices.starter.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 50 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Basic AI edits</li><li>✓ Email support</li></ul>
            <Link href="/get-started?plan=starter" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white">Start Starter</Link>
          </div>
          <div className="rounded-[24px] border border-black bg-black text-white p-7 text-center relative shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="absolute top-4 right-4 text-[9px] bg-[#D4B87A] text-black px-2.5 py-1 rounded-full font-bold tracking-widest">Most Popular</div>
            <div className="font-medium text-[13px] tracking-tight">Pro</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.pro.m : prices.pro.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 500 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-white/80"><li>✓ Advanced AI edits</li><li>✓ Batch processing</li><li>✓ Priority support</li></ul>
            <Link href="/get-started?plan=pro" className="block w-full mt-6 py-3 rounded-full bg-[#D4B87A] text-black text-[13px] font-semibold">Get Pro</Link>
          </div>
          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="font-medium text-[13px] tracking-tight">Business</div>
            <div className="text-[22px] font-bold tracking-tight mt-3">Rs{isMonthly ? prices.business.m : prices.business.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 2000 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Custom styles</li><li>✓ Team collaboration</li><li>✓ API access</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white">Talk to Sales</Link>
          </div>
          <div className="rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="font-medium text-[13px] tracking-tight">Enterprise • Custom</div>
            <div className="text-[20px] font-bold tracking-tight mt-3">Custom</div>
            <div className="text-[11px] opacity-60 mt-1">Contact us for volume</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Unlimited images</li><li>✓ Dedicated manager • SLA and security</li><li>✓ Custom integration</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white">Contact Us</Link>
          </div>
        </div>
      </section>

      <FooterHome />
    </div>
  );
}