"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const SLIDES = [
  { img: "/banner1.jpg", studio: "Photo Studio", link: "/studios/photo" },
  { img: "/banner2.jpg", studio: "Video Studio", link: "/studios/video" },
  { img: "/banner3.jpg", studio: "Audio Studio", link: "/studios/audio" },
  { img: "/banner4.jpg", studio: "Film Studio", link: "/studios/film" },
  { img: "/banner5.jpg", studio: "Podcast Studio", link: "/studios/podcast" },
  { img: "/banner6.jpg", studio: "Vector Studio", link: "/vector-studio" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* BANNERS - No extra text, your image already has it */}
      {SLIDES.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.img} alt={s.studio} fill className="object-cover" priority={i === 0} />
        </div>
      ))}

      {/* BIGGER LOGO - V + VISFORA */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex items-center gap-4">
        <Image src="/Logo.png" alt="V" width={70} height={70} className="h-12 w-12 md:h-[68px] md:w-[68px] object-contain" />
        <span className="text-white text-2xl md:text-[32px] tracking-[0.35em] font-light">
          VISF<span className="font-bold text-[#c9a367]">ORA</span>
        </span>
      </div>

      {/* CTA - Only italic text, no box */}
      <a
        href={SLIDES[current].link}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-14 z-20 font-serif italic text-white/90 hover:text-[#c9a367] text-base md:text-xl tracking-wide transition-colors duration-300"
      >
        Continue to {SLIDES[current].studio} →
      </a>

      {/* Minimal Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-[2px] transition-all duration-300 ${i === current ? "w-10 bg-white" : "w-5 bg-white/40"}`} />
        ))}
      </div>
    </main>
  );
}