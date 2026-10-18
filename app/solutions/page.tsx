import Link from 'next/link'
import FooterHome from "@/components/home/FooterHome"
import HeaderHome from "@/components/home/HeaderHome"

export default function SolutionsPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>

   {/* HERO */}
   <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-8 text-center">
    <h1 className="font-extrabold tracking-tight leading-[0.9] text-[38px] md:text-[56px]">Built for Every Seller</h1>
    <p className="mt-4 text-[16px] text-black/60">Tailored AI solutions for every eCommerce model</p>
   </section>

   {/* 4 SOLUTION CARDS */}
   <section className="max-w-[1080px] mx-auto px-6 grid md:grid-cols-2 gap-5">
    {/* Amazon */}
    <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition text-center group">
     <div className="flex justify-center"><span className="text-[36px]">↗</span></div>
     <div className="mt-2 font-bold text-[20px] group-hover:text-[#C89B3C] transition">Amazon Sellers</div>
     <p className="mt-2 text-[13px] leading-relaxed text-black/60 max-w-[340px] mx-auto">Optimize listings, ads, and inventory with AI-driven insights for Amazon FBA & FBM.</p>
    </Link>

    {/* Shopify */}
    <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition text-center group">
     <div className="flex justify-center"><div className="w-10 h-10 rounded-lg bg-[#FFF0C0] grid place-items-center font-bold text-[#C89B3C]">S</div></div>
     <div className="mt-2 font-bold text-[20px] group-hover:text-[#C89B3C] transition">Shopify Stores</div>
     <p className="mt-2 text-[13px] leading-relaxed text-black/60 max-w-[340px] mx-auto">Automate marketing, product data, and customer support for your Shopify store.</p>
    </Link>

    {/* D2C */}
    <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition text-center group">
     <div className="flex justify-center"><div className="w-10 h-10 rounded-lg bg-[#FFF0C0] grid place-items-center text-[20px]">📦</div></div>
     <div className="mt-2 font-bold text-[20px] group-hover:text-[#C89B3C] transition">D2C Brands</div>
     <p className="mt-2 text-[13px] leading-relaxed text-black/60 max-w-[340px] mx-auto">Grow your direct-to-consumer brand with predictive analytics and personalized campaigns.</p>
    </Link>

    {/* Agencies */}
    <Link href="/company" className="bg-white rounded-[16px] border border-black/5 p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition text-center group">
     <div className="flex justify-center"><div className="w-10 h-10 rounded-lg bg-[#FFF0C0] grid place-items-center text-[18px]">👥</div></div>
     <div className="mt-2 font-bold text-[20px] group-hover:text-[#C89B3C] transition">Agencies</div>
     <p className="mt-2 text-[13px] leading-relaxed text-black/60 max-w-[340px] mx-auto">Manage multiple client stores with scalable AI tools and reporting dashboards.</p>
    </Link>
   </section>

   {/* PRICING TEASER */}
   <section className="max-w-[720px] mx-auto px-6 mt-8">
    <div className="bg-white/70 backdrop-blur rounded-[16px] border border-black/5 p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
     <div className="inline-block bg-[#D6A85A] text-white text-[11px] tracking-[0.15em] px-3 py-1 rounded-full font-semibold">PRICING</div>
     <h3 className="mt-3 font-bold text-[22px]">Simple, transparent pricing</h3>
     <p className="mt-2 text-[13px] text-black/60">Start scaling today. No hidden fees, flexible plans for every seller. Try free for 14 days.</p>
     <div className="mt-5 flex justify-center gap-3">
      <Link href="/home#pricing" className="bg-[#C89B3C] hover:bg-[#b48a35] text-white rounded-full px-6 py-2.5 text-[13px] font-medium transition">View Pricing Plans</Link>
      <Link href="/company" className="border bg-[#FFFCF7] hover:bg-white rounded-full px-6 py-2.5 text-[13px] font-medium transition">Contact Sales</Link>
     </div>
     <div className="mt-4 text-[11px] text-black/40">All plans include AI insights • Integrations • 24/7 support</div>
    </div>
   </section>

   <Footer/>
  </div>
 )
}