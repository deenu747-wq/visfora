"use client";
import Link from "next/link";
import Image from "next/image";

const slides = [
  { id: 1, title: "Branding" },
  { id: 2, title: "UI Kits" },
  { id: 3, title: "Mockups" },
  { id: 4, title: "Motion" },
  { id: 5, title: "3D Assets" },
  { id: 6, title: "Icons" },
];

export default function CompanyPage() {
  const loopSlides = [...slides, ...slides];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative bg-black pt-28 pb-10 text-center overflow-hidden">
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          We build templates <br />
          <span className="text-[#FFD700]">that sell.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-white/60">
          Visfora was built for designers who are tired of generic mockups.
          6 studios, crafted for real brands.
        </p>
        <div className="mt-8">
          <Link
            href="/studios"
            className="rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-[#FFD700]"
          >
            Explore Studios
          </Link>
        </div>

        {/* BANNER SLIDER - INLINE, NO IMPORT */}
        <div className="relative mt-16 w-full overflow-hidden bg-black py-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-black to-transparent" />

          <div className="flex w-max animate-[slide_25s_linear_infinite] gap-6 hover:[animation-play-state:paused]">
            {loopSlides.map((s, i) => (
              <div
                key={`${s.id}-${i}`}
                className="group relative h-[280px] w-[380px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
              >
                <div className="flex h-full items-center justify-center text-white/30">
                  {s.title}
                </div>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm font-medium text-white">{s.title} Studio</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 border-y border-black/10 py-8 text-center">
        <div><p className="text-3xl font-bold">6</p><p className="text-sm text-black/50">Studios</p></div>
        <div><p className="text-3xl font-bold">100+</p><p className="text-sm text-black/50">Templates</p></div>
        <div><p className="text-3xl font-bold">2k+</p><p className="text-sm text-black/50">Designers</p></div>
      </section>
    </main>
  );
}