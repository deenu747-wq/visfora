"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    tag: "STRATEGY • EXECUTION • GROWTH",
    title: "From Idea to Impact",
    desc: "We help startups and enterprises build products that users love and scale with performance, design and technology.",
    img: "/company/office.jpg",
  },
  {
    tag: "INNOVATION • DESIGN • DEVELOPMENT",
    title: "We Build for Visionaries",
    desc: "We design and develop cutting-edge products that transform bold ideas into scalable, real-world solutions.",
    img: "/company/office.jpg",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p+1)%slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <div className="bg-[#fffaf0] rounded-[20px] overflow-hidden shadow-sm border border-black/[0.03] flex flex-col md:flex-row min-h-[380px]">
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <span className="w-fit px-3 py-1 bg-[#FEF3C7] text-[#B45309] text-[11px] tracking-widest font-bold rounded-full mb-4">
            {slides[current].tag}
          </span>
          <h1 className="text-3xl md:text-[36px] font-bold leading-tight mb-3">{slides[current].title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[420px]">{slides[current].desc}</p>
          <div className="flex gap-3">
            <button className="bg-[#FACC15] text-black px-5 py-2.5 rounded-full text-sm font-semibold">Start Your Project</button>
            <button className="bg-white border px-5 py-2.5 rounded-full text-sm font-semibold">Learn More</button>
          </div>
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button key={i} onClick={()=>setCurrent(i)} className={`h-2 rounded-full transition-all ${i===current ? "w-6 bg-[#FACC15]" : "w-2 bg-black/10"}`} />
            ))}
          </div>
        </div>
        <div className="flex-1 relative bg-[#fffcf7]">
          <img src={slides[current].img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}