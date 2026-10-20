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
     
     {/* STUDIOS - FIXED HOVER MEGA MENU */}
     <div className="relative group">
       <button className="flex items-center gap-1 py-8 font-medium text-black/60 group-hover:text-black transition">
         Studios <span className="text-[10px] group-hover:rotate-180 transition-transform duration-200">▼</span>
       </button>
       
       {/* 6 CARDS IN ONE HORIZONTAL LINE */}
       <div className="fixed left-0 top-[80px] w-screen invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-[#FFFCF7] border-y border-black/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.12)] z-50">
         <div className="max-w-[1440px] mx-auto px-10 py-8">
           <div className="grid grid-cols-6 gap-4">
             {[
               { num: "01 PHOTO STUDIO", title: "Studio-Grade Photo Enhancement", sub: "AI Background Removal", href: "/studios/photo-studio", footer: "BEFORE → AFTER | Studio lighting auto-fix" },
               { num: "02 BATCH STUDIO", title: "100 images • 2 min", sub: "BATCH PROCESSING - 100 PRODUCTS", href: "/studios/batch-studio", tags: ["Social Post","Holiday Sale","New Launch","Promo Offer"] },
               { num: "03 TEMPLATE STUDIO", title: "Instant 3D Templates", sub: "", href: "/studios/3d-studio", tags: ["Text to 3D models","AI texturing","PBR maps","Turn ideas into 3D fast"] },
               { num: "04 VECTOR STUDIO", title: "SVG & Logos", sub: "AI Vector Generation", href: "/studios/vector-studio", tags: ["Logo Maker","Icon Set","SVG Export","Brand Kit"] },
               { num: "05 MOCKUP STUDIO", title: "Realistic Mockups", sub: "Place in seconds", href: "/studios/mockup-studio", tags: ["T-Shirt","Bottle","Box","Device"] },
               { num: "06 MOTION STUDIO", title: "Animate & Video", sub: "AI Motion Studio", href: "/studios/motion-studio", tags: ["Product Video","Reels","Ad Animation","360° Spin"] },
             ].map((s) => (
               <Link key={s.num} href={s.href} className="bg-white rounded-[16px] border border-black/[0.06] p-3 hover:border-black/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 block">
                 <div className="text-[10px] tracking-[0.2em] text-[#d6a85a] font-bold mb-2">{s.num}</div>
                 <div className="text-[12px] font-bold leading-[1.3] min-h-[36px] text-black">
                   {s.title}<br/><span className="font-normal text-black/60 text-[11px]">{s.sub}</span>
                 </div>
                 <div className="bg-[#F7F2EB] rounded-[12px] aspect-[4/2.6] my-3 flex items-center justify-center text-[10px] text-black/30">Preview</div>
                 {s.footer ? (
                   <div className="bg-[#F7F2EB] rounded-full text-[9.5px] py-2 px-3 text-center truncate">{s.footer}</div>
                 ) : (
                   <div className="grid grid-cols-2 gap-1.5">
                     {s.tags!.map((t) => (
                       <div key={t} className="bg-[#F7F2EB] rounded-full text-[9px] py-[6px] px-2 text-center truncate">{t}</div>
                     ))}
                   </div>
                 )}
               </Link>
             ))}
           </div>
           <div className="flex justify-between items-center mt-6 text-[12px]">
             <Link href="/studios" className="font-medium hover:underline">Explore all Studios →</Link>
             <span className="opacity-50">New • AI-powered editing</span>
           </div>
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