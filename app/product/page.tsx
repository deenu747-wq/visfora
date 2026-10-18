import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import FooterHome from '@/components/home/FooterHome`
export default function ProductPage(){
  return(
    <div className="min-h-screen bg-[#F9F6F0] text-[#111827]">
      {/* TOP NAV - as in screenshot */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="font-black text-[22px] tracking-tight flex items-center gap-2">
            <span className="text-[#D4A84B]">◇</span> VISFORA
          </div>
          <nav className="hidden md:flex gap-7 text-[14px] font-medium">
            <span className="font-bold">Product</span>
            <Link href="/studios">Studios</Link>
            <Link href="/api">API</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/login" className="border border-black/20 rounded-full px-5 py-2 text-[13px] font-medium">Login</Link>
            <Link href="/get-started" className="bg-[#E8C26A] hover:bg-[#D4A84B] rounded-full px-5 py-2 text-[13px] font-medium">Get Started</Link>
          </div>
        </div>
      </header>

      {/* MAIN CARD CONTAINER - as in screenshot white box */}
      <div className="max-w-[1180px] mx-auto p-4 md:p-8">
        <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden">
          <div className="p-6 md:p-10">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-[28px] md:text-[44px] font-black tracking-tight leading-none">ONE PLATFORM, <span className="text-[#D4A84B]">6 STUDIOS</span></h1>
              <p className="mt-3 text-[13px] md:text-[15px] text-black/60 max-w-[800px] mx-auto">
                Create, design, and build everything — from photos to 3D, vectors, motion, templates, and mockups — all in one platform.
              </p>
            </div>

            {/* 6 STUDIOS GRID - exact layout */}
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {/* PHOTO STUDIO - with gold image */}
              <Link href="/photo-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition bg-white">
                <div className="h-[130px] bg-[#E8C26A] relative flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400" alt="headphones" className="w-[120px] object-contain mix-blend-multiply opacity-80" />
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-6 left-4 bg-white rounded-[10px] shadow-md px-4 py-3 flex gap-3 items-center border border-black/5 min-w-[200px]">
                    <div className="w-9 h-9 rounded-full bg-[#FFF6D6] grid place-items-center">📷</div>
                    <div>
                      <div className="font-bold text-[14px]">Photo Studio</div>
                      <div className="text-[11px] text-black/60 leading-tight mt-0.5">Edit photos with AI — background removal, retouch, enhancer, and more.</div>
                    </div>
                  </div>
                  <div className="h-[40px]"></div>
                </div>
              </Link>

              {/* VECTOR */}
              <Link href="/vector-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6E2A8] grid place-items-center flex-shrink-0 text-[16px]">✏️</div>
                <div>
                  <div className="font-bold text-[16px]">Vector Studio</div>
                  <div className="mt-1 text-[12px] text-black/60 leading-snug">Create scalable vectors, logos, and icons with AI-powered tools.</div>
                </div>
              </Link>

              {/* 3D STUDIO */}
              <Link href="/3d-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6E2A8] grid place-items-center flex-shrink-0 text-[16px]">📦</div>
                <div>
                  <div className="font-bold text-[16px]">3D Studio</div>
                  <div className="mt-1 text-[12px] text-black/60 leading-snug">Generate 3D models, scenes, and realistic renders in seconds.</div>
                </div>
              </Link>

              {/* TEMPLATE */}
              <Link href="/template-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6E2A8] grid place-items-center flex-shrink-0 text-[16px]">📄</div>
                <div>
                  <div className="font-bold text-[16px]">Template Studio</div>
                  <div className="mt-1 text-[12px] text-black/60 leading-snug">Design using ready templates for social, brand, web, and presentations.</div>
                </div>
              </Link>

              {/* MOTION */}
              <Link href="/motion-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6E2A8] grid place-items-center flex-shrink-0 text-[16px]">▶️</div>
                <div>
                  <div className="font-bold text-[16px]">Motion Studio</div>
                  <div className="mt-1 text-[12px] text-black/60 leading-snug">Animate videos, motion graphics, and dynamic transitions effortlessly.</div>
                </div>
              </Link>

              {/* MOCKUP */}
              <Link href="/mockup-studio" className="rounded-[16px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6E2A8] grid place-items-center flex-shrink-0 text-[16px]">📱</div>
                <div>
                  <div className="font-bold text-[16px]">Mockup Studio</div>
                  <div className="mt-1 text-[12px] text-black/60 leading-snug">Create realistic mockups for devices, apparel, and product displays.</div>
                </div>
              </Link>
            </div>

            {/* API + MCP SECTION - exact */}
            <div className="mt-8 bg-[#FBF7F1] rounded-[16px] border border-black/5 p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-black text-[20px]"><span className="text-[#D4A84B]">• API + MCP</span> INTEGRATION</h3>
                <p className="mt-2 text-[12px] text-black/60 leading-relaxed">Build and automate with VISFORA&apos;S API and MCP for seamless workflows. Integrates with your AI agents, apps, and internal tools.</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="border border-[#D4A84B]/30 bg-white rounded-full px-3 py-1.5 text-[11px]">RESTful API</span>
                  <span className="border border-[#D4A84B]/30 bg-white rounded-full px-3 py-1.5 text-[11px]">SDKs: Python · Node · Go</span>
                  <span className="border border-[#D4A84B]/30 bg-white rounded-full px-3 py-1.5 text-[11px]">MCP for AI Agents</span>
                </div>
                <div className="mt-4 text-[11px]">🇮🇳 Made in India 🇮🇳 · Trusted by 1000+ creators & startups</div>
              </div>
              <div className="bg-[#111827] rounded-[12px] p-5 relative font-mono text-[11px] text-gray-400">
                <div>curl</div>
                <div className="mt-3 text-gray-300 leading-relaxed">
                  curl -X POST https://api.visfora.ai/v1/generate<br/>
                  -H &quot;Authorization: Bearer YOUR_API_KEY&quot;<br/>
                  -H &quot;Content-Type: application/json&quot;<br/>
                  -d {`{"studio": "photo", "prompt": "product on white background"}`}<br/>
                  {"}"}
                </div>
                <Link href="/docs" className="absolute bottom-4 right-4 bg-[#E8C26A] text-black rounded-full px-4 py-2 text-[12px] font-sans font-medium">View Docs →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}