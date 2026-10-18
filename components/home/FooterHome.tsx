import Link from 'next/link'
import Image from 'next/image'

export default function FooterHome() {
  return (
    <footer className="bg-black text-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
    <div className="flex justify-between gap-8">
      
      {/* Logo */}
      <div className="shrink-0">
        {/* your logo here */}
        <div className="text-4xl font-bold text-amber-500">VF</div>
      </div>

      {/* Product */}
      <div>
        <h4 className="font-semibold mb-4">Product</h4>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>Features</div><div>Pricing</div><div>Integrations</div><div>Changelog</div>
        </div>
      </div>

      {/* Solutions */}
      <div>
        <h4 className="font-semibold mb-4">Solutions</h4>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>Amazon Sellers</div><div>Shopify Stores</div><div>D2C Brands</div><div>Agencies</div>
        </div>
      </div>

      {/* Resources */}
      <div>
        <h4 className="font-semibold mb-4">Resources</h4>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>Documentation</div><div>Blog</div><div>Help Center</div><div>Case Studies</div>
        </div>
      </div>

      {/* Company */}
      <div>
        <h4 className="font-semibold mb-4">Company</h4>
        <div className="space-y-2 text-sm text-zinc-400">
          <div>About Us</div><div>Careers</div><div>Contact</div><div>Legal</div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-12 pt-6 border-t border-white/10 flex justify-between text-xs text-zinc-500">
      <div className="flex gap-4"><span>Privacy</span><span>Terms</span></div>
      <div>© 2024 VISFORA, All rights reserved.</div>
      <div className="flex gap-3"><span>in</span><span>X</span><span>IG</span></div>
    </div>
  </div>
</footer>
  )
}