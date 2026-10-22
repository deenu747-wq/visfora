"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderHome from "@/components/home/HeaderHome";
import FooterHome from "@/components/home/FooterHome";

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const prices = {
    starter: { m: 499, y: 399 },
    pro: { m: 1999, y: 1599 },
    business: { m: 4999, y: 3999 },
  };

  const isMonthly = billing === "monthly";
  const isYearly = billing === "yearly";

  const handleGenerate = () => {
    const q = encodeURIComponent(prompt.trim());
    router.push(q ? `/studios/photo-studio?prompt=${q}` : `/studios/photo-studio`);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black antialiased">
      <HeaderHome />

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold tracking-widest mb-4">
          ● USED BY 2,400+ SELLERS IN INDIA
        </div>
        <h1 className="text-[40px] md:text-[64px] font-[900] tracking-[-0.04em] leading-[0.9]">
          Amazon Photos That <span className="font-serif italic text-[#C9A86A]">Sell.</span><br/>In 8 Seconds.
        </h1>
        <p className="mt-4 text-[16px] text-black/60 max-w-[600px] mx-auto">
          Upload an iPhone photo. Get studio lighting, clean background, Amazon-ready. No Photoshop needed.
        </p>
        <div className="max-w-[700px] mx-auto mt-8 flex items-center gap-2 p-2 rounded-[18px] border border-black/[0.08] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          <span className="px-3 text-black/40">🔍</span>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Describe your product visual..."
            className="flex-1 outline-none bg-transparent text-[14px] placeholder:text-black/30"
          />
          <button onClick={handleGenerate} className="px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-[#D4B87A] hover:text-black transition-all">
            Generate →
          </button>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={() => router.push('/studios/photo-studio')} className="px-8 py-3 rounded-full bg-[#D4B87A] text-black text-sm font-bold">⬆ Upload Your Product Photo</button>
          <button onClick={() => document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-full border border-black/10 bg-white text-sm">View Studios</button>
        </div>
      </section>

      {/* 3 FEATURED STUDIOS - LINKED CORRECTLY */}
      <section id="studios" className="max-w-[1280px] mx-auto px-6 mt-16 text-center">
        <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em]">All-in-One Studio <span className="font-serif italic font-medium text-black/60">for Sellers</span></h2>
        <p className="mt-2 text-[14px] text-black/40">3 featured • 6 total studios</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
          
          {/* PHOTO STUDIO - TOP BADGE, LINKED, BOTTOM CLEAN */}
          <Link href="/studios/photo-studio" className="group rounded-[24px] border-2 border-[#D4B87A] bg-white overflow-visible shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all relative flex flex-col text-center">
            {/* TOP EDGE BADGE */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-4 py-1 rounded-full font-bold tracking-widest z-20 shadow-lg whitespace-nowrap">MOST POPULAR</div>
            <div className="p-6 pb-4 pt-8">
              <div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">PHOTO STUDIO</div>
              <div className="font-bold mt-2 text-[16px]">Amazon-Ready Photos • AI Background Removal</div>
            </div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">Photo Studio Preview</div>
            <div className="bg-white h-[48px] w-full rounded-b-[24px]"></div>
          </Link>

          {/* VECTOR STUDIO - LINKED, BOTTOM CLEAN */}
          <Link href="/studios/vector-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all relative flex flex-col text-center">
            <div className="p-6 pb-4 pt-8">
              <div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">VECTOR STUDIO</div>
              <div className="font-bold mt-2 text-[16px]">Logo to Vector • SVG Instant</div>
            </div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">Vector Studio Preview</div>
            <div className="bg-white h-[48px] w-full"></div>
          </Link>

          {/* 3D STUDIO - LINKED, BOTTOM CLEAN */}
          <Link href="/studios/3d-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all relative flex flex-col text-center">
            <div className="p-6 pb-4 pt-8">
              <div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">3D STUDIO</div>
              <div className="font-bold mt-2 text-[16px]">Text to 3D • 360° Views</div>
            </div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">3D Studio Preview</div>
            <div className="bg-white h-[48px] w-full"></div>
          </Link>

        </div>

        {/* THIS IS YOUR ONLY CTA FOR ALL 6 - KEEPING AS YOU SAID */}
        <Link href="/studios" className="inline-flex mt-12 px-8 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-[#D4B87A] hover:text-black transition-all">
          View All 6 Studios → Template, Mockup, Motion included
        </Link>
      </section>

      {/* PRICING SECTION - SAME */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-20 pb-16">
        <div className="text-center">
          <h2 className="font-serif font-[900] tracking-[-0.04em] text-[26px] md:text-[42px] leading-[0.9]">Pricing</h2>
          <p className="mt-2 text-[14px] tracking-[0.02em] font-medium text-black/40">Simple, Transparent Pricing — Scale Your Visuals Without Breaking The Bank</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className={isMonthly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Monthly</span>
            <button onClick={() => setBilling(isMonthly ? "yearly" : "monthly")} className="relative w-14 h-7 rounded-full bg-black/[0.08] border border-black/10 p-1 cursor-pointer">
              <div className={isYearly ? "w-5 h-5 rounded-full bg-[#D4B87A] shadow translate-x-6 transition-all duration-300" : "w-5 h-5 rounded-full bg-black shadow transition-all duration-300"} />
            </button>
            <span className={isYearly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Yearly <span className="bg-[#F5E6C6] px-2 py-0.5 rounded-full ml-1 text-[10px] font-bold">20% OFF</span></span>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all cursor-pointer">
            <div className="font-medium text-[16px]">Starter</div>
            <div className="text-[22px] font-bold mt-3">₹{isMonthly ? prices.starter.m : prices.starter.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 50 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Basic AI edits</li><li>✓ Email support</li></ul>
            <Link href="/get-started?plan=starter" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Start Starter</Link>
          </div>
          <div className="group rounded-[24px] border-2 border-[#D4B87A] bg-black text-white p-7 text-center relative shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:scale-[1.03] transition-all cursor-pointer ring-2 ring-[#D4B87A]/30">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] bg-[#D4B87A] text-black px-3 py-1 rounded-full font-bold tracking-widest">MOST POPULAR</div>
            <div className="font-medium text-[16px] mt-2">Pro</div>
            <div className="text-[32px] font-bold mt-3">₹{isMonthly ? prices.pro.m : prices.pro.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 500 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-white/80"><li>✓ Advanced AI edits</li><li>✓ Batch processing</li><li>✓ Priority support</li></ul>
            <Link href="/get-started?plan=pro" className="block w-full mt-6 py-3 rounded-full bg-[#D4B87A] text-black text-[13px] font-semibold group-hover:bg-white transition-all">Get Pro</Link>
          </div>
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all cursor-pointer">
            <div className="font-medium text-[16px]">Business</div>
            <div className="text-[22px] font-bold mt-3">₹{isMonthly ? prices.business.m : prices.business.y}/month</div>
            <div className="text-[11px] opacity-60 mt-1">Up to 2000 images</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Custom styles</li><li>✓ Team collaboration</li><li>✓ API access</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Talk to Sales</Link>
          </div>
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all cursor-pointer">
            <div className="font-medium text-[16px]">Enterprise • Custom</div>
            <div className="text-[20px] font-bold mt-3">Custom</div>
            <div className="text-[11px] opacity-60 mt-1">Contact us for volume</div>
            <ul className="text-[12px] mt-5 text-left space-y-1.5 text-black/70"><li>✓ Unlimited images</li><li>✓ Dedicated manager</li><li>✓ Custom integration</li></ul>
            <Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Contact Us</Link>
          </div>
        </div>
      </section>
      <FooterHome />
    </div>
  );
}