import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome() {
  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-white/10">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
          
          {/* 1. Logo - ENLARGED + ALIGNED */}
          <div className="col-span-2 md:col-span-1 flex justify-start items-center h-full">
          <Link href="/" className="block translate-y-0" translate-x-0>
              <Image 
                src="/Logo.png"
                alt="VISFORA" 
                width={180}
                height={90}
                className="object-contain w-[100px] md:w-[130px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/product" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white">Changelog</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white">Amazon Sellers</Link></li>
              <li><Link href="#" className="hover:text-white">Shopify Stores</Link></li>
              <li><Link href="#" className="hover:text-white">D2C Brands</Link></li>
              <li><Link href="#" className="hover:text-white">Agencies</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Case Studies</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/company" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
              <li><Link href="#" className="hover:text-white">Legal</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR - Same margin + Single words */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[56px] flex items-center justify-between">
          
          {/* LEFT - Single words */}
          <div className="flex items-center gap-5 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
          </div>
          
          {/* CENTER */}
          <p className="text-xs text-gray-500">
            © 2024 VISFORA, All rights reserved.
          </p>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="#" className="hover:text-white"><span className="text-[18px] font-bold">in</span></Link>
            <Link href="#" className="hover:text-white"><span className="text-[16px] font-bold">X</span></Link>
            <Link href="#" className="hover:text-white"><span className="text-[14px] font-bold">IG</span></Link>
            <Link href="#" className="hover:text-white"><span className="text-[18px]">▶</span></Link>
          </div>

        </div>
      </div>
    </footer>
  )
}