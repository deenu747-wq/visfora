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
          <span className="inline-block w-fit px-3 py-1 bg-[#fef3c7] text-[#b89a4c] text-[11px] tracking-widest font-semibold rounded-full mb-4">
            {slides[current].tag}
          </span>
          <h1 className="text-4xl md:text-[44px] font-bold leading-[1.1] text-black mb-4">
            {slides[current].title}
          </h1>
          <p className="text-gray-600 text-[14px] leading-[22px] mb-8 max-w-[440px]">
            {slides[current].desc}
          </p>
          <div className="flex gap-3">
            <button className="bg-[#facc15] text-black px-6 py-2.5 rounded-full font-semibold text-[13px] border border-[#facc15] hover:bg-[#d6a85a] hover:border-[#d6a85a] hover:text-black hover:shadow-[0_8px_20px_rgba(214,168,90,0.3)] transition-all duration-200">
              Start Your Project
            </button>
            <button className="bg-white border border-[#f5e6a0] text-black px-6 py-2.5 rounded-full font-semibold text-[13px] hover:bg-[#d6a85a] hover:border-[#d6a85a] hover:text-black transition-all duration-200">
              Learn More
            </button>
          </div>
          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[#facc15]" : "w-2.5 bg-black/10"}`} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="relative h-[340px] md:h-auto min-h-[400px]">
          <img src={slides[current].img} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf0] via-[#fffaf0]/60 to-transparent hidden md:block" />
        </div>
      </div>
    </div>
  );
}