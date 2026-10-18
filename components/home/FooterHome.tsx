import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome(){
 return (
  <footer className="bg-[#111111] text-white">
   <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pt-12 pb-10 grid md:grid-cols-5 gap-8">
    
    {/* LOGO - BIGGER, NO TAGLINE, NO MADE IN INDIA */}
    <div className="md:col-span-1">
     <Link href="/home" className="flex flex-col items-start gap-3">
      <Image src="/Logo.png" alt="Visfora" width={72} height={72} className="h-16 w-16 object-contain"/>
      <span className="text-[28px] tracking-[0.25em] font-light">VISF<span className="font-bold text-[#d6a85a]">ORA</span></span>
     </Link>
     <div className="mt-5 text-[12px] text-white/40">
      Contact: <a href="mailto:info@visfora.com" className="text-white/60 hover:text-white">info@visfora.com</a>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px] opacity-90">Product</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/product" className="block hover:text-white">Features</Link>
      <Link href="/home#pricing" className="block hover:text-white">Pricing</Link>
      <Link href="/product" className="block hover:text-white">Integrations</Link>
      <Link href="/resources" className="block hover:text-white">Changelog</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px] opacity-90">Solutions</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/solutions" className="block hover:text-white">Amazon Sellers</Link>
      <Link href="/solutions" className="block hover:text-white">Shopify Stores</Link>
      <Link href="/solutions" className="block hover:text-white">D2C Brands</Link>
      <Link href="/solutions" className="block hover:text-white">Agencies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px] opacity-90">Resources</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/resources" className="block hover:text-white">Documentation</Link>
      <Link href="/resources" className="block hover:text-white">Blog</Link>
      <Link href="/resources" className="block hover:text-white">Help Center</Link>
      <Link href="/resources" className="block hover:text-white">Case Studies</Link>
     </div>
    </div>

    <div>
     <div className="font-semibold text-[13px] opacity-90">Company</div>
     <div className="mt-4 space-y-3 text-[13px] text-white/55">
      <Link href="/company" className="block hover:text-white">About Us</Link>
      <Link href="/company" className="block hover:text-white">Careers</Link>
      <Link href="/company" className="block hover:text-white">Contact</Link>
      <Link href="/company" className="block hover:text-white">Legal</Link>
     </div>
    </div>
   </div>

   {/* BOTTOM - MOVED TO LEFT, SMALLER ICONS RIGHT */}
   <div className="border-t border-white/10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between">
     {/* LEFT SIDE NOW */}
     <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/40">
      <span>© 2024 VISFORA. All rights reserved.</span>
      <Link href="/company" className="hover:text-white transition">Privacy Policy</Link>
      <Link href="/company" className="hover:text-white transition">Terms of Service</Link>
     </div>

     {/* RIGHT - REDUCED SIZE */}
     <div className="flex gap-4 mt-3 md:mt-0 text-[#d6a85a] text-[13px]">
      <a href="https://linkedin.com" target="_blank" className="hover:text-white">in</a>
      <a href="https://x.com" target="_blank" className="hover:text-white">X</a>
      <a href="https://instagram.com" target="_blank" className="hover:text-white">IG</a>
      <a href="https://youtube.com" target="_blank" className="hover:text-white">▶</a>
     </div>
    </div>
   </div>
  </footer>
 )
}