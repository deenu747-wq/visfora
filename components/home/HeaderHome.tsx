'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function HeaderHome(){
 const studios = [
   { label: "PHOTO STUDIO", title: "Enhance-Grade Photo", sub: "AI Background Removal", href: "/studios/photo-studio", footer: "BEFORE → AFTER | Studio lighting auto-fix", img: "/images/photo.jpg" },
   { label: "VECTOR STUDIO", title: "SVG & Logos", sub: "AI Vector Generation", href: "/studios/vector-studio", tags: ["Logo Maker","Icon Set","SVG Export","Brand Kit"], img: "/images/vector.jpg" },
   { label: "3D STUDIO", title: "Instant 3D Models", sub: "AI 3D Model Generator", href: "/studios/3d-studio", tags: ["Text to 3D models","AI texturing","PBR maps","Turn ideas into 3D fast"], img: "/images/3d.jpg" },
   { label: "TEMPLATE STUDIO", title: "100 images • 2 min", sub: "Batch & Template Processing", href: "/studios/template-studio", tags: ["Social Post","Holiday Sale","New Launch","Promo Offer"], img: "/images/template.jpg" },
   { label: "MOCKUP STUDIO", title: "Realistic Mockups", sub: "Place in seconds", href: "/studios/mockup-studio", tags: ["T-Shirt","Bottle","Box","Device"], img: "/images/mockup.jpg" },
   { label: "MOTION STUDIO", title: "Animate & Video", sub: "AI Motion Studio", href: "/studios/motion-studio", tags: ["Product Video","Reels","Ad Animation","360° Spin"], img: "/images/motion.jpg" },
 ]

 return (
  <header className="sticky top-0 z-50 w-full bg-[#FFFCF7] border-b border-black/[0.06]">
   <div className="max-w-[1440px] mx-auto h-[80px] px-10 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-3">
     <Image src="/Logo.png" alt="Visfora" width={100} height={100} className="object-contain" priority style={{ width: "100px", height: "100px" }} />
     <span className="text-[36px] tracking-[0.32em] font-light text-black">
       VIS<span className="font-normal text-[#D4A85B]">FORA</span>
     </span>
    </Link>

    <nav className="hidden md:flex items-center gap-9 text-[13.5px] tracking-wide text-black/60">
     <Link href="/" className="hover:text-black transition font-medium !text-black">Home</Link>
     <Link href="/solutions" className="hover:text-black transition">Solutions</Link>
     <div className="relative group">
      <Link href="/studios" className="flex items-center gap-1 py-8 font-medium text-black/60 group-hover:text-black transition">
        Studios
      </Link>
      <div className="fixed left-0 top-[80px] w-screen invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-[#FFFCF7] border-y border-black/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.12)] z-50">
        <div className="max-w-[1440px] mx-auto px-10 py-8">
          <div className="grid grid-cols-6 gap-4">
            {studios.map((s) => (
              <Link key={s.label} href={s.href} className="bg-white rounded-[16px] border border-black/[0.06] p-3 hover:border-black/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 block overflow-hidden">
                <div className="text-[13px] tracking-[0.2em] text-[#D4A85B] font-bold mb-2 text-center">{s.label}</div>
                <div className="text-[12px] font-bold leading-[1.3] min-h-[36px] text-black text-center">
                  {s.title}<br/><span className="font-normal text-black/60 text-[11px]">{s.sub}</span>
                </div>
                <div className="bg-[#F7F2EB] rounded-[12px] aspect-[4/2.6] my-3 overflow-hidden relative">
                  <Image src={s.img} alt={s.label} fill className="object-cover" sizes="200px" />
                </div>
                {s.footer ? (
                  <div className="bg-[#F7F2EB] rounded-full text-[9.5px] py-2 px-3 text-center truncate text-black/70">{s.footer}</div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5">
                    {s.tags!.map((t) => (
                      <div key={t} className="bg-[#F7F2EB] rounded-full text-[9px] py-[6px] px-2 text-center truncate text-black/70">{t}</div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
     </div>
     <Link href="/assets" className="hover:text-black transition">Assets</Link>
     <Link href="/company" className="hover:text-black transition">Company</Link>
    </nav>

    <div className="hidden md:flex items-center gap-3">
     <Link href="/login" className="!text-black border border-black rounded-full px-[26px] py-[10px] text-[13.5px] font-semibold bg-white hover:bg-black hover:!text-white transition-all">
       Log in
     </Link>
     {/* UPDATED - CLAY DEFAULT + BLACK HOVER */}
     <Link href="/get-started" className="bg-black text-white rounded-full px-[22px] py-[10px] text-[13px] font-medium border border-black hover:bg-[#D4A85B] hover:text-black hover:border-[#D4A85B] hover:shadow-[0_8px_20px_rgba(212,168,91,0.3)] transition-all duration-200">
  Get started
</Link>
    </div>
   </div>
  </header>
 )
}