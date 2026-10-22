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

  // 2-MODE GENERATE LOGIC
  const handleGenerate = () => {
    if (!prompt.trim() && !uploadedFile) {
      alert("Add a prompt or upload a photo");
      return;
    }

    if (uploadedFile && prompt.trim()) {
      // MODE 2: Prompt + Image
      console.log("MODE 2: Prompt + Image", prompt, uploadedFile.name);
      // TODO API: FormData with image + prompt
      // const fd = new FormData();
      // fd.append("image", uploadedFile);
      // fd.append("prompt", prompt);
      // const res = await fetch("/api/generate/photo", { method: "POST", body: fd });
      // const data = await res.json(); setResultUrl(data.imageUrl);
      setResultUrl(uploadedPreview); // demo
      setHasResult(true);
    } else if (prompt.trim()) {
      // MODE 1: Only Prompt
      console.log("MODE 1: Only Prompt", prompt);
      // TODO API: await fetch("/api/generate/photo", { method: "POST", body: JSON.stringify({ prompt }) })
      setResultUrl(`/studios/photo-studio?prompt=${encodeURIComponent(prompt)}`);
      setHasResult(true);
    }
    
    // Optional navigate to studio with data
    const q = encodeURIComponent(prompt.trim());
    if (!uploadedFile) {
       router.push(q ? `/studios/photo-studio?prompt=${q}` : `/studios/photo-studio`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedPreview(url);
      setResultUrl(url);
      // Don't set hasResult yet — user must click Generate for Prompt+Image mode
      setHasResult(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl?.startsWith("blob:")) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = `amazon-photo-${Date.now()}.jpg`;
      a.click();
    } else if (resultUrl) {
      window.open(resultUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black antialiased">
      <HeaderHome />
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
        
        {/* INPUT */}
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

        {/* MODE INDICATOR + PREVIEW */}
        {uploadedPreview && (
          <div className="mt-4 mx-auto w-fit flex items-center gap-3 p-2 pr-4 border rounded-full bg-white shadow-sm">
            <img src={uploadedPreview} className="h-10 w-10 rounded-full object-cover" />
            <div className="text-left">
              <div className="text-[12px] font-bold">{uploadedFile?.name.slice(0,18)}...</div>
              <div className="text-[10px] text-[#C9A86A] font-bold">MODE 2: Prompt + Image Ready</div>
            </div>
            <button onClick={() => { setUploadedFile(null); setUploadedPreview(null); setResultUrl(null); setHasResult(false); }} className="text-[11px] px-2 py-1 bg-black/5 rounded-full">✕</button>
          </div>
        )}
        {!uploadedPreview && prompt.trim() && (
          <div className="mt-3 text-[11px] text-black/50 font-medium">MODE 1: Prompt Only</div>
        )}

        {/* CTAs */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={handleUploadClick} className="px-8 py-3 rounded-full bg-[#D4B87A] text-black text-sm font-bold cursor-pointer hover:bg-black hover:text-white transition-all active:scale-95">
            ⬆ Upload Your Product Photo
          </button>
          {hasResult ? (
            <button onClick={handleDownload} className="px-8 py-3 rounded-full bg-black text-white text-sm font-bold cursor-pointer hover:bg-[#D4B87A] hover:text-black transition-all">
              ⬇ Download File
            </button>
          ) : (
            <button onClick={() => document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-full border border-black/10 bg-white text-sm cursor-pointer">
              View Studios
            </button>
          )}
        </div>
      </section>

      {/* REST SAME - 3 STUDIOS + PRICING */}
      <section id="studios" className="max-w-[1280px] mx-auto px-6 mt-16 text-center">
        <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em]">All-in-One Studio <span className="font-serif italic font-medium text-black/60">for Sellers</span></h2>
        <p className="mt-2 text-[14px] text-black/40">3 featured • 6 total studios</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
          <Link href="/studios/photo-studio" className="group rounded-[24px] border-2 border-[#D4B87A] bg-white overflow-visible shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all relative flex flex-col text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-4 py-1 rounded-full font-bold tracking-widest z-20 shadow-lg">MOST POPULAR</div>
            <div className="p-6 pb-4 pt-8"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">PHOTO STUDIO</div><div className="font-bold mt-2 text-[16px]">Amazon-Ready Photos • AI Background Removal</div></div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">Photo Studio Preview</div><div className="bg-white h-[48px] w-full rounded-b-[24px]"></div>
          </Link>
          <Link href="/studios/vector-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all relative flex flex-col text-center">
            <div className="p-6 pb-4 pt-8"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">VECTOR STUDIO</div><div className="font-bold mt-2 text-[16px]">Logo to Vector • SVG Instant</div></div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">Vector Studio Preview</div><div className="bg-white h-[48px] w-full"></div>
          </Link>
          <Link href="/studios/3d-studio" className="group rounded-[24px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all relative flex flex-col text-center">
            <div className="p-6 pb-4 pt-8"><div className="text-[15px] font-bold tracking-[0.14em] uppercase text-[#C9A86A]">3D STUDIO</div><div className="font-bold mt-2 text-[16px]">Text to 3D • 360° Views</div></div>
            <div className="bg-[#FAF6EE] aspect-[16/10] w-full flex items-center justify-center text-[12px] text-black/30">3D Studio Preview</div><div className="bg-white h-[48px] w-full"></div>
          </Link>
        </div>
        <Link href="/studios" className="inline-flex mt-12 px-8 py-3 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-[#D4B87A] hover:text-black transition-all">View All 6 Studios → Template, Mockup, Motion included</Link>
      </section>

      <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-20 pb-16">
        <div className="text-center">
          <h2 className="font-serif font-[900] tracking-[-0.04em] text-[26px] md:text-[42px] leading-[0.9]">Pricing</h2>
          <p className="mt-2 text-[14px] tracking-[0.02em] font-medium text-black/40">Simple, Transparent Pricing</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className={isMonthly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Monthly</span>
            <button onClick={() => setBilling(isMonthly ? "yearly" : "monthly")} className="relative w-14 h-7 rounded-full bg-black/[0.08] border border-black/10 p-1 cursor-pointer"><div className={isYearly ? "w-5 h-5 rounded-full bg-[#D4B87A] shadow translate-x-6 transition-all duration-300" : "w-5 h-5 rounded-full bg-black shadow transition-all duration-300"} /></button>
            <span className={isYearly ? "text-sm font-semibold text-black" : "text-sm text-black/40"}>Yearly <span className="bg-[#F5E6C6] px-2 py-0.5 rounded-full ml-1 text-[10px] font-bold">20% OFF</span></span>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]"><div className="font-medium text-[16px]">Starter</div><div className="text-[22px] font-bold mt-3">₹{isMonthly ? prices.starter.m : prices.starter.y}/month</div><div className="text-[11px] opacity-60 mt-1">Up to 50 images</div><Link href="/get-started?plan=starter" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold">Start Starter</Link></div>
          <div className="group rounded-[24px] border-2 border-[#D4B87A] bg-black text-white p-7 text-center relative"><div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] bg-[#D4B87A] text-black px-3 py-1 rounded-full font-bold tracking-widest">MOST POPULAR</div><div className="font-medium text-[16px] mt-2">Pro</div><div className="text-[32px] font-bold mt-3">₹{isMonthly ? prices.pro.m : prices.pro.y}/month</div><Link href="/get-started?plan=pro" className="block w-full mt-6 py-3 rounded-full bg-[#D4B87A] text-black text-[13px] font-semibold">Get Pro</Link></div>
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]"><div className="font-medium text-[16px]">Business</div><div className="text-[22px] font-bold mt-3">₹{isMonthly ? prices.business.m : prices.business.y}/month</div><Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold">Talk to Sales</Link></div>
          <div className="group rounded-[24px] border border-black/[0.06] bg-white p-7 text-center shadow-[0_16px_40px_rgba(0,0,0,0.05)]"><div className="font-medium text-[16px]">Enterprise • Custom</div><div className="text-[20px] font-bold mt-3">Custom</div><Link href="/company" className="block w-full mt-6 py-3 rounded-full border border-black/10 text-[13px] font-semibold">Contact Us</Link></div>
        </div>
      </section>
      <FooterHome />
    </div>
  );
}