'use client'
import Link from 'next/link'
import Image from 'next/image'
export default function HeaderHome(){
 return (
  <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/[0.06]">
   <div className="max-w-[1280px] mx-auto h-[68px] px-6 flex items-center justify-between">
    <Link href="/home" className="flex items-center gap-3">
     <Image src="/Logo.png" alt="V" width={76} height={76} className="h-8 w-8 md:h-9 md:w-9 object-contain"/>
     <span className="text-[22px] md:text-[24px] tracking-[0.4em] font-light text-black">
      VISF<span className="font-bold text-[#d6a85a]">ORA</span>
     </span>
    </Link>
    <nav className="hidden md:flex items-center gap-7 text-[14px] text-black/60">
     <Link href="/product" className="hover:text-black">Product</Link>
     <Link href="/solutions" className="hover:text-black">Solutions</Link>
     <Link href="/home#pricing" className="hover:text-black">Pricing</Link>
     <Link href="/resources" className="hover:text-black">Resources</Link>
     <Link href="/company" className="hover:text-black">Company</Link>
    </nav>
    <div className="flex items-center gap-3">
     <Link href="/login" className="hidden md:flex border rounded-full px-4 py-2 text-[13px]">Log in</Link>
     <Link href="/get-started" className="bg-black text-white rounded-full px-5 py-2.5 text-[13px] font-medium">Get started</Link>
    </div>
   </div>
  </header>
 )
}
