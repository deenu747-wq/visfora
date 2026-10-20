'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function HeaderHome(){
 const studios = [
   { 
     label: "PHOTO STUDIO", 
     title: "Studio-Grade Photo Enhancement", 
     sub: "AI Background Removal", 
     href: "/studios/photo-studio", 
     footer: "BEFORE → AFTER | Studio lighting auto-fix",
     img: "/images/photo.jpg"
   },
   { 
     label: "VECTOR STUDIO", 
     title: "SVG & Logos", 
     sub: "AI Vector Generation", 
     href: "/studios/vector-studio", 
     tags: ["Logo Maker","Icon Set","SVG Export","Brand Kit"],
     img: "/images/vector.jpg"
   },
   { 
     label: "3D STUDIO", 
     title: "Instant 3D Models", 
     sub: "AI 3D Model Generator", 
     href: "/studios/3d-studio", 
     tags: ["Text to 3D models","AI texturing","PBR maps","Turn ideas into 3D fast"],
     img: "/images/3d.jpg"
   },
   { 
     label: "TEMPLATE STUDIO", 
     title: "100 images • 2 min", 
     sub: "Batch & Template Processing", 
     href: "/studios/template-studio", 
     tags: ["Social Post","Holiday Sale","New Launch","Promo Offer"],
     img: "/images/template.jpg"
   },
   { 
     label: "MOCKUP STUDIO", 
     title: "Realistic Mockups", 
     sub: "Place in seconds", 
     href: "/studios/mockup-studio", 
     tags: ["T-Shirt","Bottle","Box","Device"],
     img: "/images/mockup.jpg"
   },
   { 
     label: "MOTION STUDIO", 
     title: "Animate & Video", 
     sub: "AI Motion Studio", 
     href: "/studios/motion-studio", 
     tags: ["Product Video","Reels","Ad Animation","360° Spin"],
     img: "/images/motion.jpg"
   },
 ]

 return (
  <header className="sticky top-0 z-50 w-full bg-[#FFFCF7] border-b border-black/[0.06]">
   <div className="max-w-[1440px] mx-auto h-[80px] px-10 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-3">
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
       VIS<span className="font-normal text-[#d6a85a]">FORA</span>
     </span>
    </Link>

    <nav className="hidden md:flex items-center gap-9 text-[13.5px] tracking-wide text-black/60">
     <Link href="/products" className="hover:text-black transition">Products</Link>
     <Link href="/solutions" className="hover:text-black transition">Solutions</Link>
     
     <div className="relative group">
       <button className="flex items-center gap-1 py-8 font-medium text-black/60 group-hover:text-black transition">
         Studios
       </button>
       
       <div className="fixed left-0 top-[80px] w-screen invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-[#FFFCF7] border-y border-black/[0.06] shadow-[0_30px_80px_rgba(0,0,0,0.12)] z-50">
         <div className="max-w-[1440px] mx-auto px-10 py-8">
           <div className="grid grid-cols-6 gap-4">
             {studios.map((s) => (
               <Link key={s.label} href={s.href} className="bg-white rounded-[16px] border border-black/[0.06] p-3 hover:border-black/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 block overflow-hidden">
                 <div className="text-[13px] tracking-[0.2em] text-[#d6a85a] font-bold mb-2 text-center">{s.label}</div>
                 <div className="text-[12px] font-bold leading-[1.3] min-h-[36px] text-black text-center">
                   {s.title}<br/><span className="font-normal text-black/60 text-[11px]">{s.sub}</span>
                 </div>
                 {/* IMAGE */}
                 <div className="bg-[#F7F2EB] rounded-[12px] aspect-[4/2.6] my-3 overflow-hidden relative">
                   <Image 
                     src={s.img} 
                     alt={s.label} 
                     fill 
                     className="object-cover"
                     sizes="200px"
                   />
                 </div>
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