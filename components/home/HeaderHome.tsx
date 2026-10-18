'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function HeaderHome(){
 return (
  <header className="sticky top-0 z-50 bg-[#FFFCF7] border-b border-black/[0.06]">
   <div className="max-w-[1440px] mx-auto h-[72px] px-6 lg:px-10 flex items-center justify-between">
    <Link href="/home" className="flex items-center gap-3">
     <Image 
       src="/Logo.png" 
       alt="Visfora" 
       width={88} 
       height={88} 
       className="h-10 w-10 md:h-11 md:w-11 object-contain"
       priority
     />
     <span className="text-[22px] tracking-[0.35em] font-light text-black">
       VISF<span className="font-bold text-[#d6a85a]">ORA</span>
     </span>
    </Link>

    <nav className="hidden md:flex items-center gap-8 text-[14px] text-black/60">
     <Link href="/product" className="hover:text-black transition">Product</Link>
     <Link href="/solutions" className="hover:text-black transition">Solutions</Link>
     <Link href="/home#pricing" className="hover:text-black transition">Pricing</Link>
     <Link href="/resources" className="hover:text-black transition">Resources</Link>
     <Link href="/company" className="hover:text-black transition">Company</Link>
    </nav>

    <div className="hidden md:flex items-center gap-3">
     <Link href="/login" className="border border-black rounded-full px-6 py-2.5 text-[13px] font-medium bg-[#FFFCF7] hover:bg-black/[0.04] transition">
       Log in
     </Link>
     <Link href="/get-started" className="bg-black text-white rounded-full px-6 py-2.5 text-[13px] font-medium hover:bg-black/90 transition">
       Get started
     </Link>
    </div>
   </div>
  </header>
 )
}