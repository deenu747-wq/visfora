"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const studios = [
  {
    title: "PHOTO STUDIO",
    sub: "Remove Background • Enhance • Retouch",
    img: "/banners/banner-photo-studio.jpg",
    link: "/studios/photo",
    btn: "Explore Photo Studio →",
  },
  {
    title: "VECTOR STUDIO",
    sub: "Image to Vector • Clean SVG • Infinite Scale",
    img: "/banners/banner-vector-studio.jpg",
    link: "/studios/vector",
    btn: "Explore Vector Studio →",
  },
  {
    title: "3D STUDIO",
    sub: "Image to 3D • Multi-Image to 3D • GLB OBJ",
    img: "/banners/banner-3d-studio.jpg",
    link: "/studios/3d",
    btn: "Explore 3D Studio →",
  },
  {
    title: "MOTION STUDIO",
    sub: "Text to Motion • Fluid Animations • MP4",
    img: "/banners/banner-motion-studio.jpg",
    link: "/studios/motion",
    btn: "Explore Motion Studio →",
  },
  {
    title: "MOCKUP STUDIO",
    sub: "Realistic Mockups • Brand Showcase",
    img: "/banners/banner-mockup-studio.jpg",
    link: "/studios/mockup",
    btn: "Explore Mockup Studio →",
  },
  {
    title: "TEMPLATE STUDIO",
    sub: "Premium Templates • Instant Ready",
    img: "/banners/banner-template-studio.jpg",
    link: "/studios/template",
    btn: "Explore Template Studio →",
  },
];

export default function Home() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % studios.length), 4000);
    return () => clearInterval(id);
  }, []);

  const s = studios[i];

  return (
    <main className="relative w-full h-[100vh] overflow-hidden bg-[#1c242c]">
      {/* SLIDER */}
      {studios.map((st, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx===i ? "opacity-100" : "opacity-0"}`}>
          <Image src={st.img} alt={st.title} fill className="object-cover" priority={idx===0} />
          <div className="absolute inset-0 bg-[#1c242c]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c242c] via-[#1c242c]/50 to-transparent" />
        </div>
      ))}

      {/* Logo V + VISFORA Name */}
<div className="absolute top-6 left-6 md:top-10 md:left-12 z-20 flex items-center gap-3">
  <Image src="/Logo.png" alt="V" width={40} height={40} className="h-9 w-9 md:h-10 md:w-10" />
  <span className="text-white text-xl md:text-2xl tracking-[0.35em] font-light">
    VISF<span className="font-bold text-[#c9a367]">ORA</span>
  </span>
</div>

      {/* Left Title */}
      <div className="absolute z-20 top-[45%] left-6 md:left-20 -translate-y-1/2">
        <h1 className="text-white text-5xl md:text-8xl font-light leading-none tracking-tight">
          {s.title.split(" ")[0]} <br/> <b className="font-bold">{s.title.split(" ")[1]}</b>
        </h1>
        <p className="mt-4 text-[#c9a367] tracking-[0.25em] uppercase text-xs md:text-sm">{s.sub}</p>
      </div>

      {/* DYNAMIC CTA BUTTON - BOTTOM RIGHT */}
      <div className="absolute z-20 bottom-8 right-6 md:bottom-12 md:right-12">
        <Link 
          href={s.link} 
          key={s.link} // re-animate when changes
          className="inline-block bg-[#c9a367] text-[#1c242c] px-8 py-4 text-[12px] md:text-[13px] font-bold tracking-widest uppercase hover:bg-[#d8b77d] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          {s.btn}
        </Link>
        
        {/* Dots */}
        <div className="flex justify-end gap-2 mt-4">
          {studios.map((_, idx) => (
            <button key={idx} onClick={()=>setI(idx)} className={`h-[2px] transition-all ${idx===i ? "w-8 bg-[#c9a367]" : "w-3 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </main>
  );
}