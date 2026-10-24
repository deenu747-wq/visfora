"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    tag: "INNOVATION • DESIGN • DEVELOPMENT",
    title: "We Build for Visionaries",
    desc: "We design and develop cutting-edge products that transform bold ideas into scalable, real-world solutions. Partner with us to innovate, build, and launch with confidence.",
    img: "/company/office.jpg",
  },
  {
    tag: "STRATEGY • EXECUTION • GROWTH",
    title: "From Idea to Impact",
    desc: "We help startups and enterprises build products that users love and scale with performance, design and technology.",
    img: "/company/team.jpg",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8">
      <div className="bg-[#fffaf0] rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-black/[0.04] grid md:grid-cols-2">
        {/* Left */}
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <span className="inline-block w-fit px-3 py-1 bg-[#F5C518]/15 text-[#B8960C] text-xs tracking-widest font-semibold rounded-full mb-4">
            {slides[current].tag}
          </span>
          <h1 className="text-4xl md:text-[44px] font-bold leading-[1.1] text-black mb-4">
            {slides[current].title}
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
            {slides[current].desc}
          </p>
          <div className="flex gap-3">
            <button className="bg-[#F5C518] hover:bg-[#e6b800] text-white px-6 py-3 rounded-[12px] font-semibold text-sm transition">
              Start Your Project
            </button>
            <button className="bg-white border border-[#F5C518]/40 text-black px-6 py-3 rounded-[12px] font-semibold text-sm hover:bg-[#fffcf7] transition">
              Learn More
            </button>
          </div>
          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-[#F5C518]" : "w-2.5 bg-black/10"}`} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="relative h-[340px] md:h-auto min-h-[400px]">
          <img src={slides[current].img} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf0] via-[#fffaf0]/40 to-transparent md:via-[#fffaf0]/20" />
        </div>
      </div>
    </div>
  );
}