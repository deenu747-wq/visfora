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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedPreview(url);
      setHasResult(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt && !uploadedFile) return;
    // mock result for now
    setResultUrl(uploadedPreview);
    setHasResult(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <HeaderHome />

      {/* HERO */}
      <section className="text-center pt-16 pb-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Product Photos <br /> in 10 Seconds.
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Upload an iPhone photo. Get studio lighting, clean background,
          Amazon-ready. No Photoshop needed.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-full shadow-sm border border-gray-100 flex items-center p-2 gap-2">
          <span className="pl-4 text-gray-400">🔍</span>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your product visual..."
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <button
            onClick={handleGenerate}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition cursor-pointer"
          >
            Generate →
          </button>
        </div>

        {/* ACTION BUTTONS - FIXED CURSOR POINTER */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#D2B48C] text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#c4a77f] transition cursor-pointer"
          >
            <span>📁</span> Upload Your Product Photo
          </button>

          <Link
            href="/studios"
            className="bg-white border border-gray-200 text-black font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition cursor-pointer inline-flex items-center justify-center"
          >
            View Studios
          </Link>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedPreview && (
          <div className="mt-6 max-w-md mx-auto">
            <img
              src={uploadedPreview}
              alt="preview"
              className="rounded-xl mx-auto max-h-[300px] object-contain border"
            />
          </div>
        )}
      </section>

      {/* STUDIOS SECTION */}
      <section className="px-6 md:px-16 pb-20">
        <h2 className="text-center text-4xl font-bold">
          All-in-One Studio <span className="font-serif italic font-normal">for Sellers</span>
        </h2>
        <p className="text-center text-gray-400 text-sm mt-2">3 featured • 6 total studios</p>

        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {/* PHOTO STUDIO */}
          <Link href="/studios/photo-studio" className="group cursor-pointer">
            <div className="bg-white rounded-[24px] border border-[#E8D5B5] overflow-visible shadow-sm hover:shadow-md transition relative pt-10 pb-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] tracking-widest px-4 py-1 rounded-full z-10">
                MOST POPULAR
              </div>
              <div className="text-center px-6">
                <p className="text-[#C9A86A] text-xs tracking-widest font-semibold">PHOTO STUDIO</p>
                <p className="font-bold text-sm mt-1 leading-tight">Amazon-Ready Photos • AI Background Removal</p>
              </div>
              <img src="/studios/ps.jpg" alt="Photo Studio" className="w-full h-[280px] object-cover mt-4 rounded-b-[24px]" />
            </div>
          </Link>

          {/* VECTOR STUDIO */}
          <Link href="/studios/vector-studio" className="group cursor-pointer">
            <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition pt-10">
              <div className="text-center px-6">
                <p className="text-[#C9A86A] text-xs tracking-widest font-semibold">VECTOR STUDIO</p>
                <p className="font-bold text-sm mt-1">Logo to Vector • SVG Instant</p>
              </div>
              <img src="/studios/vs.jpg" alt="Vector Studio" className="w-full h-[280px] object-cover mt-4" />
            </div>
          </Link>

          {/* 3D STUDIO */}
          <Link href="/studios/3d-studio" className="group cursor-pointer">
            <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition pt-10">
              <div className="text-center px-6">
                <p className="text-[#C9A86A] text-xs tracking-widest font-semibold">3D STUDIO</p>
                <p className="font-bold text-sm mt-1">Text to 3D • 360° Views</p>
              </div>
              <img src="/studios/3d.jpg" alt="3D Studio" className="w-full h-[280px] object-cover mt-4" />
            </div>
          </Link>
        </div>
      </section>

      <FooterHome />
    </div>
  );
}