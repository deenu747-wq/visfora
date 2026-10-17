import Link from 'next/link'
import Image from 'next/image'
export default function FooterHome(){
 return (
  <footer className="bg-[#111111] text-white mt-16">
   <div className="max-w-[1280px] mx-auto px-6 py-12 grid md:grid-cols-5 gap-8">
    <div className="md:col-span-1">
     <Link href="/home" className="flex items-center gap-2">
      <Image src="/Logo.png" alt="V" width={32} height={32} className="h-8 w-8 object-contain"/>
      <span className="text-[22px] tracking-[0.3em] font-light">VISF<span className="font-bold text-[#d6a85a]">ORA</span></span>
     </Link>
     <p className="mt-3 text-[12px] text-white/50 leading-relaxed">AI-powered SaaS solutions for modern eCommerce sellers.</p>
     <div className="mt-4 text-[12px] text-white/50">Contact: info@visfora.com<br/>Made in India</div>
    </div>
    <div><div className="font-semibold text-[14px]">Product</div><div className="mt-3 space-y-2 text-[13px] text-white/60"><Link href="/product" className="block hover:text-white">Features</Link><Link href="/home#pricing" className="block hover:text-white">Pricing</Link><Link href="/product" className="block hover:text-white">Integrations</Link><Link href="/resources" className="block hover:text-white">Changelog</Link></div></div>
    <div><div className="font-semibold text-[14px]">Solutions</div><div className="mt-3 space-y-2 text-[13px] text-white/60"><Link href="/solutions" className="block hover:text-white">Amazon Sellers</Link><Link href="/solutions" className="block hover:text-white">Shopify Stores</Link><Link href="/solutions" className="block hover:text-white">D2C Brands</Link><Link href="/solutions" className="block hover:text-white">Agencies</Link></div></div>
    <div><div className="font-semibold text-[14px]">Resources</div><div className="mt-3 space-y-2 text-[13px] text-white/60"><Link href="/resources" className="block hover:text-white">Documentation</Link><Link href="/resources" className="block hover:text-white">Blog</Link><Link href="/resources" className="block hover:text-white">Help Center</Link><Link href="/resources" className="block hover:text-white">Case Studies</Link></div></div>
    <div><div className="font-semibold text-[14px]">Company</div><div className="mt-3 space-y-2 text-[13px] text-white/60"><Link href="/company" className="block hover:text-white">About Us</Link><Link href="/company" className="block hover:text-white">Careers</Link><Link href="/company" className="block hover:text-white">Contact</Link><Link href="/company" className="block hover:text-white">Legal</Link></div></div>
   </div>
   <div className="border-t border-white/10"><div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[12px] text-white/40"><div className="flex gap-4"><span>© 2024 VISFORA. All rights reserved.</span><Link href="/company" className="hover:text-white">Privacy Policy</Link><Link href="/company" className="hover:text-white">Terms of Service</Link></div><div className="flex gap-3 mt-2 md:mt-0 text-[#d6a85a]"><span>in</span><span>X</span><span>IG</span><span>YT</span></div></div></div>
  </footer>
 )
}
