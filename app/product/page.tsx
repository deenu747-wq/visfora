import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

export default function ProductPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>
   <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
    <div>
     <div className="inline-block bg-[#E9DCC6] text-black/70 text-[11px] tracking-wide px-3 py-1 rounded-full">NEW • AI-powered for D2C brands</div>
     <h1 className="mt-4 text-[44px] leading-[0.95] font-bold tracking-tight">AI Photo Studio for<br/>D2C Brands</h1>
     <p className="mt-4 text-[15px] text-black/60 leading-relaxed max-w-[460px]">Create on-brand product photos instantly. Remove backgrounds, relight scenes, and add realistic shadows — no photo shoot needed.</p>
     <div className="mt-6 flex gap-3">
      <Link href="/get-started" className="bg-[#2B1D12] text-white px-6 py-3 rounded-[12px] text-[14px] font-medium">Start Free Trial</Link>
      <button className="border border-black/20 px-6 py-3 rounded-[12px] text-[14px] font-medium flex items-center gap-2"><span>▶</span> See Examples</button>
     </div>
     <div className="mt-6 flex items-center gap-2 text-[12px] text-black/50">
      <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-black/10 border border-white"/><div className="w-6 h-6 rounded-full bg-black/20 border border-white"/><div className="w-6 h-6 rounded-full bg-black/30 border border-white"/><div className="w-6 h-6 rounded-full bg-black/40 border border-white"/></div>
      Trusted by 2,000+ D2C brands • 4.9/5 on ProductHunt
     </div>
    </div>
    <div className="bg-white rounded-[20px] border border-black/5 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
     <div className="bg-[#F6F2ED] rounded-[16px] p-4 relative">
      <div className="absolute top-3 left-3 bg-white text-[11px] px-3 py-1 rounded-full border flex items-center gap-2"><span>AI Preview</span><span className="text-[#10B981]">● Live</span></div>
      <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600" className="rounded-[12px] w-full h-[320px] object-contain mix-blend-multiply" alt="serum"/>
      <div className="mt-3 flex items-center justify-center gap-3 text-[12px]"><span>Original</span><span className="opacity-30">→</span><span>AI Edit</span></div>
     </div>
    </div>
   </section>

   <section className="max-w-[1280px] mx-auto px-6 py-16 border-t border-black/10">
    <h2 className="text-center font-semibold text-[28px]">Everything you need to create studio-quality photos</h2>
    <p className="text-center text-[14px] text-black/60 mt-2">Built for ecommerce teams to generate consistent, on-brand product visuals in seconds.</p>
    <div className="mt-10 grid md:grid-cols-3 gap-6">
     {[
      {t:'Background Removal', d:'Instantly remove or replace backgrounds with clean, brand-consistent backdrops. Export PNG with transparent or custom background.'},
      {t:'Lighting', d:'AI relighting to match natural studio lighting. Adjust brightness, warmth, and highlight to elevate your product.'},
      {t:'Shadow', d:'Add realistic natural shadows and depth to ground your products. Customize direction, softness, and intensity.'}
     ].map(f=>(
      <div key={f.t} className="bg-white rounded-[16px] border border-black/5 p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
       <div className="w-10 h-10 mx-auto bg-[#F6EFE3] rounded-[10px] mb-4"/>
       <div className="font-semibold text-[18px]">{f.t}</div>
       <div className="mt-2 text-[13px] text-black/60 leading-relaxed">{f.d}</div>
      </div>
     ))}
    </div>
   </section>
   <Footer/>
  </div>
 )
}