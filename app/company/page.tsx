import BannerSlider from "@/components/company/BannerSlider";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative bg-black pt-28 pb-10 text-center">
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

        {/* SLIDER */}
        <div className="mt-16">
          <BannerSlider />
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 border-y border-black/10 py-8 text-center">
        <div><p className="text-3xl font-bold">6</p><p className="text-sm text-black/50">Studios</p></div>
        <div><p className="text-3xl font-bold">100+</p><p className="text-sm text-black/50">Templates</p></div>
        <div><p className="text-3xl font-bold">2k+</p><p className="text-sm text-black/50">Designers</p></div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Craft over quantity", d: "Every template is manually reviewed, not AI dumped." },
            { t: "Made for real brands", d: "Not dribbble shots. Usable in client work from day 1." },
            { t: "No subscription trap", d: "Pay once, own it. Simple." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-black/10 p-8">
              <h3 className="font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-black/60">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}