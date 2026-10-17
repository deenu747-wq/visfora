"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const SLIDES = [
  { img: "/banners/banner-photo-studio.jpg" },
  { img: "/banners/banner-vector-studio.jpg" },
  { img: "/banners/banner-3d-studio.jpg" },
  { img: "/banners/banner-motion-studio.jpg" },
  { img: "/banners/banner-mockup-studio.jpg" },
  { img: "/banners/banner-template-studio.jpg" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {SLIDES.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.img} alt="visfora" fill className="object-cover" sizes="100vw" priority={i === 0} />
        </div>
      ))}

      {/* BIGGER LOGO */}
      <div className="absolute top-7 left-8 md:top-10 md:left-14 z-20 flex items-center gap-4">
        <Image src="/Logo.png" alt="V" width={80} height={80} className="h-14 w-14 md:h-[76px] md:w-[76px] object-contain" />
        <span className="text-white text-[26px] md:text-[34px] tracking-[0.4em] font-light">
          VISF<span className="font-bold text-[#d6a85a]">ORA</span>
        </span>
      </div>

      {/* CTA - FIXED: ALWAYS GOES TO /home */}
      <Link
        href="/home"
        className="absolute bottom-10 right-10 md:bottom-14 md:right-16 z-20 font-serif italic font-light text-white text-[44px] md:text-[56px] tracking-wide hover:text-[#d6a85a] transition-colors"
      >
        Continue &gt;&gt;
      </Link>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <div key={i} className={`h-[2px] transition-all duration-500 ${i === current ? "w-10 bg-white" : "w-5 bg-white/30"}`} />
        ))}
      </div>
    </main>
  );
}