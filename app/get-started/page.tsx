'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HeaderHome(){
 const pathname = usePathname()
 const isActive = (p:string)=> pathname===p ? 'text-[#C89B3C] font-semibold' : 'text-black/70 hover:text-black'

 return (
  <header className="sticky top-0 z-50 bg-[#FFFCF7]/80 backdrop-blur border-b border-black/5">
   <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
    <Link href="/home" className="flex items-baseline gap-0">
     <span className="font-light tracking-[0.18em] text-[22px] text-black">VISF</span>
     <span className="font-medium tracking-[0.18em] text-[22px] text-[#C89B3C]">ORA</span>
    </Link>
    <nav className="hidden md:flex items-center gap-7 text-[13px]">
     <Link href="/product" className={isActive('/product')}>Products</Link>
     <Link href="/solutions" className={isActive('/solutions')}>Solutions</Link>
     <Link href="/home#pricing" className="text-black/70 hover:text-black">Pricing</Link>
     <Link href="/resources" className={isActive('/resources')}>Resources</Link>
     <Link href="/company" className={isActive('/company')}>Company</Link>
    </nav>
    <div className="flex items-center gap-3">
     <Link href="/login" className="text-[13px] px-4 py-2 rounded-full hover:bg-black/5 transition">Login</Link>
     <Link href="/get-started" className="bg-[#C89B3C] hover:bg-[#b48a35] text-white text-[13px] px-5 py-2 rounded-full font-medium transition">Get Started</Link>
    </div>
   </div>
  </header>
 )
}