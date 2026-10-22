"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderHome from "@/components/home/HeaderHome";
import FooterHome from "@/components/home/FooterHome";

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prices = {
    starter: { m: 499, y: 399 },
    pro: { m: 1999, y: 1599 },
    business: { m: 4999, y: 3999 },
  };

  const isMonthly = billing === "monthly";
  const isYearly = billing === "yearly";

  const handleGenerate = () => {
    if (!prompt.trim() && !uploadedFile) { alert("Add a prompt or upload a photo"); return; }
    if (uploadedFile && prompt.trim()) { setResultUrl(uploadedPreview); setHasResult(true); }
    else if (prompt.trim()) { setResultUrl(`/studios/photo-studio?prompt=${encodeURIComponent(prompt)}`); setHasResult(true); }
    const q = encodeURIComponent(prompt.trim());
    if (!uploadedFile) router.push(q ? `/studios/photo-studio?prompt=${q}` : `/studios/photo-studio`);
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setUploadedFile(file); const url = URL.createObjectURL(file); setUploadedPreview(url); setResultUrl(url); setHasResult(false); }
  };
  const handleDownload = () => {
    if (resultUrl?.startsWith("blob:")) { const a = document.createElement("a"); a.href = resultUrl; a.download = `amazon-photo-${Date.now()}.jpg`; a.click(); }
    else if (resultUrl) window.open(resultUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black antialiased">
      <HeaderHome />
      <section className="max-w-[1280px] mx-auto px-6 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold tracking-widest mb-4">● USED BY 2,400+ SELLERS IN INDIA</div>
        <h1 className="text-[40px] md:text-[64px] font-[900] tracking-[-0.04em] leading-[0.9]">Amazon Photos That <span className="font-serif italic text-[#C9A86A]">Sell.</span><br/>In 8 Seconds.</h1>
        <p className="mt-4 text-[16px] text-black/60 max-w-[600px] mx-auto">Upload an iPhone photo. Get studio lighting, clean background, Amazon-ready. No Photoshop needed.</p>
        <div className="max-w-[700px] mx-auto mt-8 flex items-center gap-2 p-2 rounded-[18px] border border-black/[0.08] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
          <span className="px-3 text-black/40">🔍</span>
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} placeholder="Describe your product visual..." className="flex-1 outline-none bg-transparent text-[14px] placeholder:text-black/30" />
          <button onClick={handleGenerate} className="px-6 py-3 rounded-full bg-black text-white font-semibold text-sm">Generate →</button>
        </div>
        {uploadedPreview && (
          <div className="mt-4 mx-auto w-fit flex items-center gap-3 p-2 pr-4 border rounded-full bg-white shadow-sm">
            <img src={uploadedPreview} className="h-10 w-10 rounded-full object-cover" />
            <div className="text-left"><div className="text-[12px] font-bold">{uploadedFile?.name.slice(0,18)}...</div><div className="text-[10px] text-[#C9A86A] font-bold">MODE 2: Prompt + Image Ready</div></div>
            <button onClick={() => { setUploadedFile(null); setUploadedPreview(null); setResultUrl(null); setHasResult(false); }} className="text-[11px] px-2 py-1 bg-black/5 rounded-full">✕</button>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={handleUploadClick} className="px-8 py-3 rounded-full bg-[#D4B87A] text-black text-sm font-bold">⬆ Upload Your Product Photo</button>
          {hasResult ? <button onClick={handleDownload} className="px-8 py-3 rounded-full bg-black text-white text-sm font-bold">⬇ Download File</button> : <button onClick={() => document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-full border border-black/10 bg-white text-sm">View Studios</button>}
        </div>
      </section>

      {/* FIXED STUDIO CARDS */}
      <section id="studios" className="max-w-[1280px] mx-auto px-6 mt-20 text-center">
        <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em]">All-in-One Studio <span className="font-serif italic font-medium text-black/60">for Sellers</span></h2>
        <p className="mt-2 text-[14px] text-black/40">3 featured • 6 total studios</p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
          {/* CARD 1 - FIXED OVERFLOW */}
          <Link href="/studios/photo-studio" className="group relative rounded-[24px] border-2 border-[#D4B87A] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all flex flex-col pt-2 overflow-visible">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-4 py-1 rounded-full font-bold tracking-widest z-30 shadow-lg whitespace-nowrap">MOST POPULAR</div>
            <div className="p-6 pb-4 pt-6"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">PHOTO STUDIO</div><div className="font-bold mt-2 text-[16px] leading-tight">Amazon-Ready Photos • AI Background Removal</div></div>
            <div className="w-full aspect-[16/10] bg-[#FAF6EE] overflow-hidden rounded-b-[22px]">
              <img src="/studios/ps.jpg" alt="Photo Studio" className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.08] transition-transform duration-500" />
            </div>
          </Link>

          <Link href="/studios/vector-studio" className="group relative rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all flex flex-col">
            <div className="p-6 pb-4 pt-8"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">VECTOR STUDIO</div><div className="font-bold mt-2 text-[16px] leading-tight">Logo to Vector • SVG Instant</div></div>
            <div className="w-full aspect-[16/10] bg-[#FAF6EE] overflow-hidden">
              <img src="/studios/vs.jpg" alt="Vector Studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </Link>

          <Link href="/studios/3d-studio" className="group relative rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all flex flex-col">
            <div className="p-6 pb-4 pt-8"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">3D STUDIO</div><div className="font-bold mt-2 text-[16px] leading-tight">Text to 3D • 360° Views</div></div>
            <div className="w-full aspect-[16/10] bg-[#FAF6EE] overflow-hidden">
              <img src="/studios/3d.jpg" alt="3D Studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </Link>
        </div>

        <Link href="/studios" className="inline-flex mt-12 px-8 py-3 rounded-full bg-black text-white text-[13px] font-semibold">View All 6 Studios → Template, Mockup, Motion included</Link>
      </section>

      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-24 pb-20">
        <div className="text-center">
          <h2 className="font-serif font-[900] tracking-[-0.04em] text-[36px] md:text-[48px] leading-[0.9]">Pricing</h2>
          <p className="mt-3 text-[14px] text-black/40 font-medium">Simple, Transparent Pricing — Pay for results, not tools.</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={isMonthly ? "text-[13px] font-bold" : "text-[13px] text-black/40"}>Monthly</span>
            <button onClick={() => setBilling(isMonthly ? "yearly" : "monthly")} className="relative w-[52px] h-[30px] rounded-full bg-black/[0.08] border border-black/10 p-1"><div className={isYearly ? "w-[22px] h-[22px] rounded-full bg-black translate-x-[20px] transition-all" : "w-[22px] h-[22px] rounded-full bg-black transition-all"} /></button>
            <span className={isYearly ? "text-[13px] font-bold flex items-center gap-2" : "text-[13px] text-black/40 flex items-center gap-2"}>Yearly <span className="bg-[#F5E6C6] border border-[#E8D5A8] px-2.5 py-0.5 rounded-full text-[10px] font-bold">20% OFF</span></span>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-5 mt-10">
          <Link href="/get-started?plan=starter" className="group relative rounded-[24px] border border-black/[0.06] bg-white p-7 text-left shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"><div className="text-[12px] font-bold tracking-[0.12em] text-black/40">STARTER</div><div className="text-[26px] font-[900] mt-2">₹{isMonthly ? prices.starter.m : prices.starter.y}<span className="text-[13px] font-medium text-black/40">/month</span></div><div className="text-[11px] bg-black/5 w-fit px-2.5 py-1 rounded-full mt-2">Up to 50 images • Best for trial</div><ul className="text-[12px] mt-5 space-y-2 text-black/70"><li>✓ 50 AI Photo Generations</li><li>✓ White Background + Shadow</li><li>✓ Amazon Main Image Ready</li><li className="text-black/30">✕ No Batch Processing</li></ul><div className="mt-auto pt-7"><div className="w-full py-3 rounded-full border border-black/10 text-center text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Start Starter →</div></div></Link>
          <Link href="/get-started?plan=pro" className="group relative rounded-[24px] border-[1.5px] border-[#D4B87A] bg-black text-white p-7 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-300 flex flex-col"><div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] bg-[#D4B87A] text-black px-4 py-1.5 rounded-full font-bold tracking-[0.12em]">MOST POPULAR • 2.4K SELLERS</div><div className="flex justify-between items-center mt-2"><div className="text-[12px] font-bold tracking-[0.12em] text-[#D4B87A]">PRO</div><div className="text-[10px] bg-[#D4B87A]/20 text-[#D4B87A] px-2 py-0.5 rounded-full font-bold">SAVE ₹{(prices.pro.m - prices.pro.y) * 12}/YEAR</div></div><div className="text-[30px] font-[900] mt-2">₹{isMonthly ? prices.pro.m : prices.pro.y}<span className="text-[13px] font-medium text-white/40">/month</span></div><div className="text-[11px] bg-white/10 w-fit px-2.5 py-1 rounded-full mt-2 text-white/70">Up to 500 images • 🔥 10x Faster Sales</div><ul className="text-[12px] mt-5 space-y-2 text-white/80"><li>✓ Everything in Starter +</li><li>✓ 500 AI Generations + Batch</li><li>✓ Lifestyle Backgrounds (Prompt+Image)</li><li>✓ A+ Content & Infographics</li><li>✓ Priority 2hr Support</li></ul><div className="mt-auto pt-7"><div className="w-full py-3 rounded-full bg-[#D4B87A] text-black text-center text-[13px] font-bold group-hover:bg-white transition-all">Get Pro →</div></div></Link>
          <Link href="/get-started?plan=business" className="group relative rounded-[24px] border border-black/[0.06] bg-white p-7 text-left shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"><div className="text-[12px] font-bold tracking-[0.12em] text-black/40">BUSINESS</div><div className="text-[26px] font-[900] mt-2">₹{isMonthly ? prices.business.m : prices.business.y}<span className="text-[13px] font-medium text-black/40">/month</span></div><div className="text-[11px] bg-[#F5E6C6] w-fit px-2.5 py-1 rounded-full mt-2 font-bold">Up to 2000 images • For Teams</div><ul className="text-[12px] mt-5 space-y-2 text-black/70"><li>✓ Everything in Pro +</li><li>✓ 2000 Generations / Team Access</li><li>✓ API Access + Custom Styles</li><li>✓ 6 Studios Unlocked</li><li>✓ Dedicated Success Manager</li></ul><div className="mt-auto pt-7"><div className="w-full py-3 rounded-full border border-black/10 text-center text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Talk to Sales →</div></div></Link>
          <Link href="/company" className="group relative rounded-[24px] border border-black/[0.06] bg-[#FFFCF7] p-7 text-left shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"><div className="text-[12px] font-bold tracking-[0.12em] text-black/40">ENTERPRISE • CUSTOM</div><div className="text-[22px] font-[900] mt-2">Custom Pricing</div><div className="text-[11px] bg-black text-white w-fit px-2.5 py-1 rounded-full mt-2">Unlimited • SLA + Security</div><ul className="text-[12px] mt-5 space-y-2 text-black/70"><li>✓ Unlimited Generations</li><li>✓ On-Premise + SSO</li><li>✓ Custom Model Training</li><li>✓ Volume Discounts</li></ul><div className="mt-auto pt-7"><div className="w-full py-3 rounded-full border border-black/10 text-center text-[13px] font-semibold bg-white group-hover:bg-black group-hover:text-white transition-all">Contact Us →</div></div></Link>
        </div>
      </section>
      <FooterHome />
    </div>
  );
}