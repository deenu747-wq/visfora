import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

export default function ResourcesPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>

   {/* HERO */}
   <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-6 text-center">
    <h1 className="font-extrabold tracking-tight text-[44px] md:text-[56px] leading-[0.9]">Learn, Build, Grow</h1>
    <p className="mt-4 text-[15px] text-black/60">Documentation, guides, and insights to scale your eCommerce</p>
    <div className="mt-6 h-[1px] w-20 bg-black/10 mx-auto"/>
   </section>

   {/* DOCUMENTATION */}
   <section className="max-w-[1280px] mx-auto px-6 mt-6">
    <div className="flex items-center justify-between max-w-[1080px] mx-auto">
     <h2 className="font-semibold text-[18px]">Documentation</h2>
     <Link href="/product" className="text-[13px] text-[#C89B3C] hover:underline">View all →</Link>
    </div>
    <div className="max-w-[1080px] mx-auto mt-4 grid md:grid-cols-3 gap-4">
     <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
      <div className="w-9 h-9 rounded-full bg-[#FFF0C0] grid place-items-center text-[16px]">📄</div>
      <div className="mt-3 font-semibold text-[16px]">Getting Started</div>
      <p className="mt-1 text-[12px] text-black/60 leading-relaxed">Set up your VISFORA account and launch your store in minutes.</p>
     </Link>
     <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
      <div className="w-9 h-9 rounded-full bg-[#FFF0C0] grid place-items-center text-[14px]">{"{ }"}</div>
      <div className="mt-3 font-semibold text-[16px]">API Reference</div>
      <p className="mt-1 text-[12px] text-black/60 leading-relaxed">Explore endpoints, authentication, and example requests for our API.</p>
     </Link>
     <Link href="/product" className="bg-white rounded-[16px] border border-black/5 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
      <div className="w-9 h-9 rounded-full bg-[#FFF0C0] grid place-items-center text-[16px]">🧩</div>
      <div className="mt-3 font-semibold text-[16px]">Integrations</div>
      <p className="mt-1 text-[12px] text-black/60 leading-relaxed">Connect Shopify, Stripe, Klaviyo, and 50+ tools to automate workflows.</p>
     </Link>
    </div>
   </section>

   {/* BLOG */}
   <section className="max-w-[1280px] mx-auto px-6 mt-10">
    <div className="flex items-center justify-between max-w-[1080px] mx-auto">
     <h2 className="font-semibold text-[18px]">Blog</h2>
     <Link href="/resources" className="text-[13px] text-[#C89B3C] hover:underline">View all posts →</Link>
    </div>
    <div className="max-w-[1080px] mx-auto mt-4 grid md:grid-cols-2 gap-4">
     <Link href="/resources" className="bg-white rounded-[16px] border border-black/5 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
      <div className="h-[140px] bg-[#F8F5EF] grid place-items-center text-[11px] text-black/40">Image: Product Page Optimization</div>
      <div className="p-5">
       <div className="inline-block bg-[#FFEDB0] text-[10px] px-2 py-0.5 rounded-full">GUIDE • 6 MIN READ</div>
       <div className="mt-2 font-semibold text-[14px] leading-tight">How to Optimize Your Product Pages for Higher Conversions</div>
       <p className="mt-1 text-[12px] text-black/60">Learn proven tactics to improve page performance and boost sales.</p>
      </div>
     </Link>
     <Link href="/resources" className="bg-white rounded-[16px] border border-black/5 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
      <div className="h-[140px] bg-[#F8F5EF] grid place-items-center text-[11px] text-black/40">Image: Peak Season Scaling</div>
      <div className="p-5">
       <div className="inline-block bg-[#FFEDB0] text-[10px] px-2 py-0.5 rounded-full">INSIGHTS • 4 MIN READ</div>
       <div className="mt-2 font-semibold text-[14px] leading-tight">Scaling eCommerce During Peak Season: What We Learned in 2024</div>
       <p className="mt-1 text-[12px] text-black/60">Key strategies for handling traffic spikes and inventory management.</p>
      </div>
     </Link>
    </div>
   </section>

   {/* HELP CENTER */}
   <section className="max-w-[1080px] mx-auto px-6 mt-10 pb-12 grid md:grid-cols-2 gap-4">
    <div className="col-span-2 font-semibold text-[18px] -mb-2">Help Center</div>
    <Link href="/company" className="bg-white rounded-[16px] border border-black/5 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
     <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full bg-[#FFF0C0] grid place-items-center">?</div>
      <div>
       <div className="font-semibold text-[16px]">FAQ</div>
       <p className="mt-1 text-[12px] text-black/60">Find answers to common questions about billing, integrations, and features.</p>
       <div className="mt-3 text-[12px] text-[#C89B3C]">Browse FAQs →</div>
      </div>
     </div>
    </Link>
    <Link href="/company" className="bg-white rounded-[16px] border border-black/5 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
     <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full bg-[#FFF0C0] grid place-items-center">🎧</div>
      <div>
       <div className="font-semibold text-[16px]">Contact Support</div>
       <p className="mt-1 text-[12px] text-black/60">Our support team is available 24/5 to help you succeed.</p>
       <div className="mt-3 inline-block border border-[#C89B3C]/40 text-[#C89B3C] rounded-full px-3 py-1 text-[12px]">Contact Support →</div>
      </div>
     </div>
    </Link>
   </section>

   <Footer/>
  </div>
 )
}