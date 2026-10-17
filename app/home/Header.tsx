'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header(){
 const pathname = usePathname()
 const isActive = (p:string) => pathname===p ? 'text-black font-bold border-b-2 border-[#C8A165]' : 'text-black/60 hover:text-black'

 return (
  <header className="sticky top-0 z-50 bg-[#FFFBF5]/90 backdrop-blur border-b border-black/5">
   <div className="max-w-[1400px] mx-auto px-6 h-[64px] flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2">
     <img src="/Logo.png" alt="VISFORA" className="h-7 w-auto" />
     <span className="font-serif text-[22px] tracking-[0.15em] font-bold">VISFORA</span>
    </Link>
    <nav className="hidden md:flex gap-7">
     <Link href="/home" className={`text-[14px] ${isActive('/home')}`}>Product</Link>
     <Link href="/home#batch" className="text-[14px] text-black/60">Solutions</Link>
     <Link href="/home#pricing" className={`text-[14px] ${isActive('/home#pricing')}`}>Pricing</Link>
     <Link href="/resources" className="text-[14px] text-black/60">Resources</Link>
     <Link href="/login" className="text-[14px] text-black/60">Login</Link>
    </nav>
    <Link href="/photo-studio" className="bg-[#C8A165] text-white px-5 py-2 rounded-full text-[14px] font-medium">Get Started</Link>
   </div>
  </header>
 )
}