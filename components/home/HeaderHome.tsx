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
     <Link href="/studios" className="hover:text-black transition">Studios</Link>
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