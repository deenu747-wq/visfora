import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'

export default function ProductPage(){
 return (
  <div className="min-h-screen bg-white text-black">
   <HeaderHome/>
   <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-16">
    <div className="text-center">
     <h1 className="text-[36px] md:text-[52px] font-extrabold tracking-tight">ONE PLATFORM, <span className="text-[#C89B3C]">6 STUDIOS</span></h1>
     <p className="mt-3 text-[14px] text-black/60 max-w-[700px] mx-auto">Create, design, and build everything — from photos to 3D, vectors, motion, templates, and mockups — all in one platform.</p>
    </div>

    <div className="mt-10 grid md:grid-cols-3 gap-5">
     {/* Photo Studio - Featured */}
     <Link href="/photo-studio" className="group bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition">
      <div className="bg-gradient-to-br from-[#FFF0C0] to-[#D6B36A] rounded-[12px] h-[140px] flex items-center justify-center overflow-hidden">
       <img src="/sneaker.png" className="h-[110px] w-auto object-contain group-hover:scale-105 transition" alt="sneaker"/>
      </div>
      <div className="mt-4 flex gap-3">
       <span className="w-9 h-9 bg-[#FFF0C0] rounded-full grid place-items-center">📷</span>
       <div><div className="font-bold text-[16px]">Photo Studio</div><div className="text-[12px] text-black/60 mt-1">Edit photos with AI — background removal, retouch, enhancer, and more.</div></div>
      </div>
     </Link>

     <Link href="/photo-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition flex gap-3">
      <span className="w-9 h-9 bg-[#FFE8A0]/70 rounded-full grid place-items-center">✏️</span>
      <div><div className="font-bold text-[16px]">Vector Studio</div><div className="text-[12px] text-black/60 mt-1">Create scalable vectors, logos, and icons with AI-powered tools.</div></div>
     </Link>

     <Link href="/photo-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition flex gap-3">
      <span className="w-9 h-9 bg-[#FFE8A0]/70 rounded-full grid place-items-center">📦</span>
      <div><div className="font-bold text-[16px]">3D Studio</div><div className="text-[12px] text-black/60 mt-1">Generate 3D models, scenes, and realistic renders in seconds.</div></div>
     </Link>

     <Link href="/batch-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition flex gap-3">
      <span className="w-9 h-9 bg-[#FFE8A0]/70 rounded-full grid place-items-center">📄</span>
      <div><div className="font-bold text-[16px]">Template Studio</div><div className="text-[12px] text-black/60 mt-1">Design using ready templates for social, brand, web, and presentations.</div></div>
     </Link>

     <Link href="/batch-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition flex gap-3">
      <span className="w-9 h-9 bg-[#FFE8A0]/70 rounded-full grid place-items-center">▶️</span>
      <div><div className="font-bold text-[16px]">Motion Studio</div><div className="text-[12px] text-black/60 mt-1">Animate videos, motion graphics, and dynamic transitions effortlessly.</div></div>
     </Link>

     <Link href="/photo-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-xl transition flex gap-3">
      <span className="w-9 h-9 bg-[#FFE8A0]/70 rounded-full grid place-items-center">📱</span>
      <div><div className="font-bold text-[16px]">Mockup Studio</div><div className="text-[12px] text-black/60 mt-1">Create realistic mockups for devices, apparel, and product displays.</div></div>
     </Link>
    </div>

    <div className="mt-12 bg-[#FFFCF7] border border-black/5 rounded-[20px] p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
     <div>
      <div className="text-[24px] font-extrabold"><span className="text-[#C89B3C]">• API + MCP</span> INTEGRATION</div>
      <p className="mt-3 text-[13px] text-black/60">Build and automate with VISFORA&apos;s API and MCP for seamless workflows.</p>
      <div className="mt-5 flex flex-wrap gap-2">
       <span className="border bg-white rounded-full px-3 py-1.5 text-[11px]">RESTful API</span>
       <span className="border bg-white rounded-full px-3 py-1.5 text-[11px]">SDKs: Python • Node • Go</span>
       <span className="border bg-white rounded-full px-3 py-1.5 text-[11px]">MCP for AI Agents</span>
      </div>
      <div className="mt-4 text-[11px] text-black/50">Made in India • Trusted by 1000+ creators</div>
     </div>
     <div className="bg-[#101828] text-white rounded-[14px] p-5 font-mono text-[11px] leading-[1.6]">
      <div>curl -X POST https://api.visfora.ai/v1/generate</div>
      <div>-H &quot;Authorization: Bearer YOUR_API_KEY&quot;</div>
      <div>-d &#123; &quot;studio&quot;: &quot;photo&quot; &#125;</div>
      <Link href="/resources" className="mt-4 inline-block bg-[#E9C46A] text-black rounded-full px-4 py-1.5 text-[12px] font-sans font-medium">View Docs →</Link>
     </div>
    </div>
   </section>
  </div>
 )
}