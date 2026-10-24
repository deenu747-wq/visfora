import BannerSlider from "./BannerSlider";
import HeaderHome from "@/components/home/HeaderHome";
import FooterHome from "@/components/home/FooterHome";

export default function CompanyPage() {
  return (
    <main style={{ backgroundColor: "#fffcf7" }} className="min-h-screen">
      <HeaderHome />
      <BannerSlider />

      {/* 3 Cards - White */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: "◎", title: "Mission", desc: "To empower visionaries by building innovative digital products that drive growth and create lasting impact." },
          { icon: "◉", title: "Vision", desc: "To be the trusted partner for startups and innovators, shaping the future through design-led technology solutions." },
          { icon: "◍", title: "Team", desc: "A passionate team of designers, developers, and strategists dedicated to turning ambition into reality." },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-[16px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-black/[0.04] text-center hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-black/10 transition-all duration-200 group">
            <div className="w-14 h-14 bg-black group-hover:bg-[#D4A85B] rounded-full flex items-center justify-center mx-auto mb-5 text-white group-hover:text-black text-2xl transition-all duration-200">
              {c.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-black">{c.title}</h3>
            <p className="text-black/60 text-[14px] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </section>

      <p className="text-center text-black/40 text-sm pb-16">Trusted by 100+ founders and growing startups worldwide</p>
      <FooterHome />
    </main>
  );
}