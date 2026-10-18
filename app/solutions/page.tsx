import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

export default function SolutionsPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>
   {/* HERO */}
   <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
    <div>
     <h1 className="text-[46px] leading-[0.95] font-bold tracking-tight">Built for D2C Brands<br/>to Scale Faster</h1>
     <p className="mt-4 text-[14px] text-black/60 max-w-[460px] leading-relaxed">All-in-one AI photo solutions for Amazon sellers, Shopify stores, skincare & fashion brands — create on-brand product photos without a shoot.</p>
     <div className="mt-6 flex gap-3">
      <Link href="/get-started" className="bg-[#1F2A44] text-white px-6 py-3 rounded-[12px] text-[13px] font-medium">Start free trial</Link>
      <Link href="/company" className="border border-black/20 px-6 py-3 rounded-[12px] text-[13px] font-medium">Book a demo →</Link>
     </div>
     <div className="mt-4 text-[11px] text-black/50">No credit card required • Setup in 5 minutes • Trusted by 500+ D2C brands</div>
    </div>
    <div className="bg-white rounded-[20px] border border-black/5 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
     <div className="bg-[#F6F2ED] rounded-[14px] h-[260px] flex flex-col items-center justify-center">
      <div className="text-[12px] font-medium">Revenue Overview</div>
      <div className="mt-3 w-[80%] h-[100px] bg-gradient-to-b from-[#C9DCEB] to-transparent rounded-[10px]"/>
      <div className="mt-4 flex gap-8 text-[11px]"><span>Orders ↗ +22%</span><span>CAC ↘ -14%</span><span>Repeat Buyers ↗ 38%</span></div>
     </div>
    </div>
   </section>

   {/* SOLUTIONS GRID - 4 CARDS NOW */}
   <section className="max-w-[1280px] mx-auto px-6 py-12">
    <h2 className="text-center text-[26px] font-semibold">Solutions tailored for every seller</h2>
    <p className="text-center text-[13px] text-black/60 mt-1">Purpose-built workflows for Amazon, Shopify, skincare, and fashion.</p>
    <div className="mt-8 grid md:grid-cols-4 gap-5">
     <div className="bg-white rounded-[16px] border border-[#C89B3C]/30 p-6 ring-1 ring-[#C89B3C]/20">
      <div className="w-12 h-12 bg-[#FFF3DC] rounded-full mx-auto mb-3 flex items-center justify-center text-[20px]">📦</div>
      <div className="text-center font-semibold">Amazon Sellers</div>
      <div className="mt-2 text-[12px] text-black/60 text-center leading-relaxed">Pure white background, infographics, A+ Content & listing-ready photos that pass Amazon TOS.</div>
      <div className="mt-6 bg-[#FFF8EC] rounded-[10px] p-3 text-[11px]">Amazon Listing | 7 Images<br/><span className="opacity-50">White BG + Lifestyle + Infographic</span></div>
      <Link href="/get-started" className="mt-4 block text-center text-[11px] text-[#C89B3C] font-medium">For Amazon →</Link>
     </div>
     <div className="bg-white rounded-[16px] border border-black/10 p-6">
      <div className="w-12 h-12 bg-[#F6EFE3] rounded-full mx-auto mb-3"/>
      <div className="text-center font-semibold">Shopify Stores</div>
      <div className="mt-2 text-[12px] text-black/60 text-center leading-relaxed">Auto-generate store-ready product photos - all from one dashboard.</div>
      <div className="mt-6 bg-[#F9F5F0] rounded-[10px] p-3 text-[11px]">Organic Cotton Tee | $32<br/><span className="opacity-50">Shopify Ready</span></div>
      <Link href="/get-started" className="mt-4 block text-center text-[11px] text-black/50 font-medium">For Shopify →</Link>
     </div>
     <div className="bg-white rounded-[16px] border border-black/10 p-6">
      <div className="w-12 h-12 bg-[#F6EFE3] rounded-full mx-auto mb-3"/>
      <div className="text-center font-semibold">Skincare Brands</div>
      <div className="mt-2 text-[12px] text-black/60 text-center leading-relaxed">Aesthetic lifestyle shots with AI backgrounds & shadows for high-converting PDPs.</div>
      <div className="mt-6 bg-[#F9F5F0] rounded-[10px] p-3 text-[11px]">Vitamin C Serum | $42<br/><span className="opacity-50">Best seller</span></div>
      <Link href="/get-started" className="mt-4 block text-center text-[11px] text-black/50 font-medium">For Skincare →</Link>
     </div>
     <div className="bg-white rounded-[16px] border border-black/10 p-6">
      <div className="w-12 h-12 bg-[#F6EFE3] rounded-full mx-auto mb-3"/>
      <div className="text-center font-semibold">Fashion Brands</div>
      <div className="mt-2 text-[12px] text-black/60 text-center leading-relaxed">Consistent AI photo automation for apparel drops, sizes & seasonal collections.</div>
      <div className="mt-6 bg-[#F9F5F0] rounded-[10px] p-3 text-[11px]">Linen Blazer | $98<br/><span className="opacity-50">New drop</span></div>
      <Link href="/get-started" className="mt-4 block text-center text-[11px] text-black/50 font-medium">For Fashion →</Link>
     </div>
    </div>

    <div className="mt-10 bg-[#EEE8E0] rounded-[16px] p-6 grid md:grid-cols-2 gap-6 items-center">
     <div>
      <div className="font-semibold">Built to grow with your brand</div>
      <div className="mt-3 text-[12px] leading-6 text-black/70">
       ✓ Amazon TOS compliant white background<br/>
       ✓ Shopify & Amazon listing export in 1 click<br/>
       ✓ Real-time inventory & listing tracker<br/>
       ✓ AI insights for product & marketing performance
      </div>
     </div>
     <div className="text-center">
      <div className="font-semibold text-[18px]">Ready to scale your brand?</div>
      <div className="text-[12px] text-black/60 mt-1">Join 500+ Amazon & D2C brands using VISFORA.</div>
      <div className="mt-4 flex gap-3 justify-center">
       <Link href="/get-started" className="bg-[#1F2A44] text-white px-5 py-2.5 rounded-[10px] text-[12px]">Get started now</Link>
       <Link href="/company" className="border border-black/20 px-5 py-2.5 rounded-[10px] text-[12px]">Talk to sales</Link>
      </div>
     </div>
    </div>
   </section>
   <Footer/>
  </div>
 )
}