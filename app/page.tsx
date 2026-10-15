// app/page.tsx - VISFORA Final Homepage - LIGHT MODE LOCKED
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0B0B0B] selection:bg-[#C9A86A]/20">
      {/* HEADER - BIG LOGO LIKE CANVA - 44px LOCKED */}
      <header className="sticky top-0 z-50 bg-[#F6F3EE]/80 backdrop-blur-xl border-b border-black/5">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* FINAL LOGO - h-11 = 44px LOCKED */}
            <img
              src="/logo/VISFORA_FINAL.png"
              alt="VISFORA"
              className="h-11 w-auto object-contain"
            />
            <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium">
              <a href="/photo" className="hover:opacity-60 transition">Photo</a>
              <a href="/vector" className="hover:opacity-60 transition">Vector</a>
              <a href="/3d" className="hover:opacity-60 transition">3D</a>
              <a href="/motion" className="hover:opacity-60 transition">Motion</a>
              <a href="/mockup" className="hover:opacity-60 transition">Mockup</a>
              <a href="/template" className="hover:opacity-60 transition">Template</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/pricing" className="hidden md:block text-[14px] font-medium hover:opacity-60">Pricing</a>
            <a href="/get-started" className="bg-[#0B0B0B] text-white px-6 py-[10px] rounded-full text-[14px] font-semibold hover:bg-black transition">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-[48px] lg:text-[72px] font-black tracking-[-0.04em] leading-[0.9] max-w-[900px] mx-auto">
          Build Visuals at Scale
        </h1>
        <p className="mt-6 text-[16px] lg:text-[18px] text-black/60 max-w-[720px] mx-auto leading-relaxed">
          Create professional photos, vectors, 3D scenes, motion graphics, mockups, and templates — all in one platform. 10x faster than traditional design tools.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="/create" className="bg-[#0B0B0B] text-white px-7 py-3 rounded-full text-[15px] font-semibold">
            Start Creating — Free
          </a>
          <a href="/demo" className="bg-white border border-black/10 px-7 py-3 rounded-full text-[15px] font-semibold hover:bg-black/5">
            Watch Demo ▶
          </a>
        </div>
        <p className="mt-6 text-[13px] text-black/50">
          Trusted by 10,000+ designers, marketers, and creators • No credit card required
        </p>
      </section>

      {/* 6 STUDIOS - ONE PLATFORM */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-[24px] font-bold tracking-tight">Six Studios. One Platform.</h2>
          <p className="text-[14px] text-black/60 mt-1">Everything you need to design, visualize, and ship — unified in a seamless workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Photo Studio", desc: "AI-powered photo generation & editing. Backgrounds, lighting, and retouching on demand.", icon: "📷", href: "/photo" },
            { title: "Vector Studio", desc: "Create and edit scalable vectors. Logos, icons, and illustrations with precision tools.", icon: "🔗", href: "/vector" },
            { title: "3D Studio", desc: "Generate 3D scenes, objects, and renders. Materials, lighting, and environments ready to export.", icon: "🧊", href: "/3d" },
            { title: "Motion Studio", desc: "Animate with ease. Create motion graphics, transitions, and micro animations in seconds.", icon: "▶️", href: "/motion" },
            { title: "Mockup Studio", desc: "Showcase designs in realistic mockups. Devices, packaging, print, and product mockups.", icon: "🖥️", href: "/mockup" },
            { title: "Template Studio", desc: "Start from 500+ ready templates. Social, ads, presentations, and branding templates.", icon: "📐", href: "/template" },
          ].map((s) => (
            <a key={s.title} href={s.href} className="group bg-white rounded-[16px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <div className="w-9 h-9 rounded-[8px] bg-[#C9A86A] text-white flex items-center justify-center text-[16px] mb-4">
                {s.icon}
              </div>
              <h3 className="text-[20px] font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-black/60">{s.desc}</p>
              <div className="mt-4 text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition">Open Studio →</div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/5 py-8 text-center text-[13px] text-black/50">
        VISFORA © 2024 • Privacy • Terms • Support • Careers
      </footer>
    </div>
  );
}