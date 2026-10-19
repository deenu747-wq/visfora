'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function HeaderHome(){
 return (
  <header className="sticky top-0 z-50 w-full bg-[#FFFCF7] border-b border-black/[0.06]">
   <div className="max-w-[1440px] mx-auto h-[80px] px-10 flex items-center justify-between">
    <Link href="/home" className="flex items-center gap-3">
     <Image
    src="/Logo.png"
    alt="Visfora"
    width={56}
    height={56}
    className="object-contain"
    priority
    style={{ width: "56px", height: "56px" }}
  />
     <span className="text-[36px] tracking-[0.32em] font-light text-black">
       VISF<span className="font-light text-[#d6a85a]">ORA</span>
     </span>
    </Link>

    <nav className="hidden md:flex items-center gap-9 text-[13.5px] tracking-wide text-black/60">
     <Link href="/products" className="hover:text-black transition">Products</Link>
     <Link href="/solutions" className="hover:text-black transition">Solutions</Link>
     // In your Header.tsx, inside nav
<div className="relative group">
  <button className="flex items-center gap-1 py-6 font-medium">
    Studios <span className="text-[10px] group-hover:rotate-180 transition">▼</span>
  </button>
  
  <div className="absolute left-1/2 -translate-x-1/2 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
    <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 p-3 flex gap-2 w-[980px]">
      {[
        { name: "Photo Studio", desc: "Product photography", href: "/studios/photo-studio" },
        { name: "Batch Studio", desc: "Process at scale", href: "/studios/batch-studio" },
        { name: "3D Studio", desc: "Render 3D objects", href: "/studios/3d-studio" },
        { name: "Vector Studio", desc: "Logos & SVG", href: "/studios/vector-studio" },
        { name: "Mockup Studio", desc: "Realistic mockups", href: "/studios/mockup-studio" },
        { name: "Motion Studio", desc: "Animate & video", href: "/studios/motion-studio" },
      ].map((s) => (
        <a key={s.name} href={s.href} className="flex-1 rounded-[16px] p-5 hover:bg-[#FFFCF7] transition text-center">
          <div className="w-10 h-10 mx-auto rounded-[10px] bg-[#F6F0E8] flex items-center justify-center mb-3">✦</div>
          <div className="text-[14px] font-semibold whitespace-nowrap">{s.name}</div>
          <div className="text-[11px] opacity-50 mt-1">{s.desc}</div>
        </a>
      ))}
    </div>
    <div className="bg-[#FFFCF7] mt-3 rounded-[12px] px-5 py-3 flex justify-between text-[12px]">
      <a href="/studios" className="font-medium hover:underline">Explore all Studios →</a>
      <span className="opacity-50">New • AI-powered editing</span>
    </div>
  </div>
</div>
     <Link href="/assets" className="hover:text-black transition">Assets</Link>
     <Link href="/company" className="hover:text-black transition">Company</Link>
    </nav>

    <div className="hidden md:flex items-center gap-3">
     <Link href="/login" className="border border-black/80 rounded-full px-[22px] py-[9px] text-[13px] font-medium bg-[#FFFCF7] hover:bg-black/[0.04] transition">
       Log in
     </Link>
     <Link href="/get-started" className="bg-black text-white rounded-full px-[22px] py-[9px] text-[13px] font-medium hover:bg-black/90 transition">
       Get started
     </Link>
    </div>
   </div>
  </header>
 )
}