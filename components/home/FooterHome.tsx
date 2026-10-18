import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome(){
 return (
  <footer className="bg-[#111111] text-white mt-0">
   {/* Top */}
   <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-12 grid md:grid-cols-5 gap-8">
    {/* Brand */}
    <div className="md:col-span-1">
     <Link href="/home" className="flex items-center gap-2">
      <Image src="/Logo.png" alt="Visfora" width={32} height={32} className="h-8 w-8 object-contain"/>
      <span className="text-[22px] tracking-[0.3em] font-light">VISF<span className="font-bold text-[#d6a85a]">ORA</span></span>
     </Link>
     <p className="mt-3 text-[12px] text-white/50 leading-relaxed max-w-[240px]">AI-powered SaaS solutions for modern eCommerce sellers.</p>
     <div className="mt-4 text-[11px] text-white/50 leading-5">Contact: info@visfora.com<br/>Made in India</div>
    </div>

    {/* Product */}
    <div>
     <div className="font-semibold text-[14px]">Product</div>
     <div className="mt-3 space-y-2.5 text-[13px] text-white/60">
      <Link href="/product" className="block hover:text-white transition">Features</Link>
      <Link href="/home#pricing" className="block hover:text-white transition">Pricing</Link>
      <Link href="/product" className="block hover:text-white transition">Integrations</Link>
      <Link href="/resources" className="block hover:text-white transition">Changelog</Link>
     </div>
    </div>

    {/* Solutions */}
    <div>
     <div className="font-semibold text-[14px]">Solutions</div>
     <div className="mt-3 space-y-2.5 text-[13px] text-white/60">
      <Link href="/solutions" className="block hover:text-white transition">Amazon Sellers</Link>
      <Link href="/solutions" className="block hover:text-white transition">Shopify Stores</Link>
      <Link href="/solutions" className="block hover:text-white transition">D2C Brands</Link>
      <Link href="/solutions" className="block hover:text-white transition">Agencies</Link>
     </div>
    </div>

    {/* Resources */}
    <div>
     <div className="font-semibold text-[14px]">Resources</div>
     <div className="mt-3 space-y-2.5 text-[13px] text-white/60">
      <Link href="/resources" className="block hover:text-white transition">Documentation</Link>
      <Link href="/resources" className="block hover:text-white transition">Blog</Link>
      <Link href="/resources" className="block hover:text-white transition">Help Center</Link>
      <Link href="/resources" className="block hover:text-white transition">Case Studies</Link>
     </div>
    </div>

    {/* Company */}
    <div>
     <div className="font-semibold text-[14px]">Company</div>
     <div className="mt-3 space-y-2.5 text-[13px] text-white/60">
      <Link href="/company" className="block hover:text-white transition">About Us</Link>
      <Link href="/company" className="block hover:text-white transition">Careers</Link>
      <Link href="/company" className="block hover:text-white transition">Contact</Link>
      <Link href="/company" className="block hover:text-white transition">Legal</Link>
     </div>
    </div>
   </div>

   {/* Bottom */}
   <div className="border-t border-white/10">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40">
     <div className="flex gap-4 items-center">
      <span>© 2024 VISFORA. All rights reserved.</span>
      <Link href="/company" className="hover:text-white transition">Privacy Policy</Link>
      <Link href="/company" className="hover:text-white transition">Terms of Service</Link>
     </div>
     <div className="flex gap-4 mt-2 md:mt-0 text-[#d6a85a] font-medium tracking-widest">
      <a href="https://linkedin.com" target="_blank" className="hover:text-white">in</a>
      <a href="https://x.com" target="_blank" className="hover:text-white">X</a>
      <a href="https://instagram.com" target="_blank" className="hover:text-white">IG</a>
      <a href="https://youtube.com" target="_blank" className="hover:text-white">YT</a>
     </div>
    </div>
   </div>
  </footer>
 )
}