import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome() {
  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-white/10">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* 1. Logo - FIXED PATH: /Logo.png */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start justify-start -mt-2">
            <Link href="/" className="block hover:opacity-90 transition-opacity">
              <Image 
                src="/Logo.png" // <-- FIXED: Was /logo-visfora.png, actual file is /Logo.png
                alt="VISFORA" 
                width={140} 
                height={60}
                className="object-contain"
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

      {/* BOTTOM BAR - RECTIFIED: Left Legal | Center Copyright | Right Icons */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[56px] flex items-center justify-between relative">
          
          {/* LEFT - Privacy + Terms */}
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
          </div>
          
          {/* CENTER - Copyright */}
          <p className="text-xs text-gray-500 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            © 2024 VISFORA, All rights reserved.
          </p>

          {/* RIGHT - Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="#" aria-label="LinkedIn" className="hover:text-white transition">
              <span className="text-[18px] font-bold leading-none">in</span>
            </Link>
            <Link href="#" aria-label="X" className="hover:text-white transition">
              <span className="text-[16px] font-bold leading-none">X</span>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-white transition">
              <span className="text-[14px] font-bold tracking-widest leading-none">IG</span>
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-white transition">
              <span className="text-[18px] leading-none">▶</span>
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}