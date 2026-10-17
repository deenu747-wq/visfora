'use client'
import Link from 'next/link'
export default function HeaderHome(){
 return (
  <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/[0.06]">
   <div className="max-w-[1280px] mx-auto h-[68px] px-6 flex items-center justify-between">
    <a href="/home" className="flex items-center gap-2.5"><img src="/Logo.png" alt="V" className="h-7 w-7 object-contain"/><span className="font-bold tracking-[0.18em] text-[22px]">VISFORA</span></a>
    <nav className="hidden md:flex items-center gap-7 text-[14px] text-black/60">
     <a href="/product" className="hover:text-black">Product</a>
     <a href="/solutions" className="hover:text-black">Solutions</a>
     <a href="/home#pricing" className="hover:text-black">Pricing</a>
     <a href="/resources" className="hover:text-black">Resources</a>
     <a href="/company" className="hover:text-black">Company</a>
    </nav>
    <div className="flex items-center gap-3">
     <a href="/login" className="hidden md:flex border rounded-full px-4 py-2 text-[13px]">Log in</a>
     <a href="/photo-studio" className="bg-black text-white rounded-full px-5 py-2.5 text-[13px] font-medium">Get started</a>
    </div>
   </div>
  </header>
 )
}
