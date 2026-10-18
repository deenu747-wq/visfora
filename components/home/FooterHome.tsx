import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome() {
  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-white/10">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* 1. Logo - Aligned left + Clickable like header */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start justify-start -mt-2">
            <Link href="/" className="bg-black p-2 rounded block hover:opacity-90 transition-opacity">
              <Image 
                src="/logo-visfora.png" // <-- change to your actual logo path if different: /images/logo.svg etc
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

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left - Copyright */}
          <p className="text-xs text-gray-500 order-2 md:order-1">
            © 2024 VISFORA, All rights reserved.
          </p>

          {/* Right - Privacy + Terms + Icons BIGGER */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <div className="flex items-center gap-4 text-xs">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            </div>
            
            {/* Icons - Bigger & Visible */}
            <div className="flex items-center gap-4 ml-6 text-gray-400">
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
      </div>
    </footer>
  )
}