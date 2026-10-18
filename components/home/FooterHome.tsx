import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome(){
 return (
  <footer className="bg-[#111111] text-white">
   <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-14 pb-12 grid md:grid-cols-5 gap-10">
    
    {/* LOGO - IMPROVISED */}
    <div className="md:col-span-1 flex flex-col">
     <Link href="/home" className="flex items-center gap-3">
      <Image src="/Logo.png" alt="Visfora" width={42} height={42} className="h-10 w-10 object-contain"/>
      <span className="text-[26px] tracking-[0.25em] font-light">VISF<span className="font-bold text-[#d6a85a]">ORA</span></span>
     </Link>
     <p className="mt-6 text-[13px] text-white/50 leading-6 max-w-[260px]">
      AI-powered SaaS solutions for modern eCommerce sellers.
     </p>
     <div className="mt-6 text-[11px] text-white/40 flex gap-2">
      <span>Contact: info@visfora.com</span>
      <span className="text-white/20">|</span>
      <span>Made in India</span>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[15px]">Product</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/product" className="block hover:text-white">Features</Link>
      <Link href="/home#pricing" className="block hover:text-white">Pricing</Link>
      <Link href="/product" className="block hover:text-white">Integrations</Link>
      <Link href="/resources" className="block hover:text-white">Changelog</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[15px]">Solutions</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/solutions" className="block hover:text-white">Amazon Sellers</Link>
      <Link href="/solutions" className="block hover:text-white">Shopify Stores</Link>
      <Link href="/solutions" className="block hover:text-white">D2C Brands</Link>
      <Link href="/solutions" className="block hover:text-white">Agencies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[15px]">Resources</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/resources" className="block hover:text-white">Documentation</Link>
      <Link href="/resources" className="block hover:text-white">Blog</Link>
      <Link href="/resources" className="block hover:text-white">Help Center</Link>
      <Link href="/resources" className="block hover:text-white">Case Studies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[15px]">Company</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/company" className="block hover:text-white">About Us</Link>
      <Link href="/company" className="block hover:text-white">Careers</Link>
      <Link href="/company" className="block hover:text-white">Contact</Link>
      <Link href="/company" className="block hover:text-white">Legal</Link>
     </div>
    </div>
   </div>

   {/* BOTTOM - CENTER ALIGNED + BIG ICONS RIGHT */}
   <div className="border-t border-white/10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-5 grid grid-cols-1 md:grid-cols-3 items-center">
     <div className="hidden md:block"></div>
     
     <div className="flex justify-center items-center gap-3 text-[12px] text-white/40 text-center">
      <span>© 2024 VISFORA. All rights reserved.</span>
      <span className="text-white/15">|</span>
      <Link href="/company" className="hover:text-white">Privacy Policy</Link>
      <span className="text-white/15">|</span>
      <Link href="/company" className="hover:text-white">Terms of Service</Link>
     </div>

     <div className="flex justify-center md:justify-end gap-5 mt-4 md:mt-0 text-[#d6a85a]">
      <a href="https://linkedin.com" target="_blank" className="hover:text-white transition text-[22px] font-bold">in</a>
      <a href="https://x.com" target="_blank" className="hover:text-white transition text-[20px] font-bold">X</a>
      <a href="https://instagram.com" target="_blank" className="hover:text-white transition text-[18px]">IG</a>
      <a href="https://youtube.com" target="_blank" className="hover:text-white transition text-[18px]">▶</a>
     </div>
    </div>
   </div>
  </footer>
 )
}