"use client";
import Image from "next/image";

const slides = [
  { id: 1, title: "Branding", img: "/studios/branding.jpg" },
  { id: 2, title: "UI Kits", img: "/studios/ui.jpg" },
  { id: 3, title: "Mockups", img: "/studios/mockup.jpg" },
  { id: 4, title: "Motion", img: "/studios/motion.jpg" },
  { id: 5, title: "3D Assets", img: "/studios/3d.jpg" },
  { id: 6, title: "Icons", img: "/studios/icons.jpg" },
];

export default function BannerSlider() {
  // Duplicate for infinite loop
  const loopSlides = [...slides, ...slides];

  return (
    <div className="relative w-full overflow-hidden bg-black py-8">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-max animate-[slide_25s_linear_infinite] gap-6 hover:[animation-play-state:paused]">
        {loopSlides.map((s, i) => (
          <div
            key={`${s.id}-${i}`}
            className="group relative h-[280px] w-[380px] shrink-0 overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={s.img}
              alt={s.title}
              fill
              className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm font-medium text-white">{s.title} Studio</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}