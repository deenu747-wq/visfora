import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome(){
 return (
  <footer className="bg-[#111111] text-white">
   <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-12 pb-10 grid md:grid-cols-5 gap-8 items-start">
    
    {/* 1. LOGO SYMBOL + TEXT CENTER ALIGNED */}
    <div className="md:col-span-1 flex items-center">
     <Link href="/home" className="flex items-center gap-3">
      <Image src="/Logo.png" alt="Visfora" width={48} height={48} className="h-11 w-11 object-contain"/>
      {/* 2. FORA SAME COLOR - ALL GOLD */}
      <span className="text-[22px] tracking-[0.25em] font-bold text-[#d6a85a]">VISFORA</span>
     </Link>
     {/* 4. EMAIL REMOVED */}
    </div>

    <div>
     <div className="font-semibold text-[13px]">Product</div>
     <div className="mt-4 space-y-3 text-[12px] text-white/55">
      <Link href="/product" className="block hover:text-white">Features</Link>
      <Link href="/home#pricing" className="block hover:text-white">Pricing</Link>
      <Link href="/product" className="block hover:text-white">Integrations</Link>
      <Link href="/resources" className="block hover:text-white">Changelog</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px]">Solutions</div>
     <div className="mt-4 space-y-3 text-[12px] text-white/55">
      <Link href="/solutions" className="block hover:text-white">Amazon Sellers</Link>
      <Link href="/solutions" className="block hover:text-white">Shopify Stores</Link>
      <Link href="/solutions" className="block hover:text-white">D2C Brands</Link>
      <Link href="/solutions" className="block hover:text-white">Agencies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px]">Resources</div>
     <div className="mt-4 space-y-3 text-[12px] text-white/55">
      <Link href="/resources" className="block hover:text-white">Documentation</Link>
      <Link href="/resources" className="block hover:text-white">Blog</Link>
      <Link href="/resources" className="block hover:text-white">Help Center</Link>
      <Link href="/resources" className="block hover:text-white">Case Studies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px]">Company</div>
     <div className="mt-4 space-y-3 text-[12px] text-white/55">
      <Link href="/company" className="block hover:text-white">About Us</Link>
      <Link href="/company" className="block hover:text-white">Careers</Link>
      <Link href="/company" className="block hover:text-white">Contact</Link>
      <Link href="/company" className="block hover:text-white">Legal</Link>
     </div>
    </div>
   </div>

   {/* 3. BOTTOM MOVED TO CENTER */}
   <div className="border-t border-white/10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between md:justify-center md:gap-0 relative">
     
     <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] text-white/40">
      <span>© 2024 VISFORA. All rights reserved.</span>
      <Link href="/company" className="hover:text-white">Privacy Policy</Link>
      <Link href="/company" className="hover:text-white">Terms of Service</Link>
     </div>

     <div className="flex gap-3.5 mt-3 md:mt-0 md:absolute md:right-8 text-[#d6a85a] text-[11px]">
      <a href="#" className="hover:text-white">in</a>
      <a href="#" className="hover:text-white">X</a>
      <a href="#" className="hover:text-white">IG</a>
      <a href="#" className="hover:text-white">▶</a>
     </div>
    </div>
   </div>
  </footer>
 )
}