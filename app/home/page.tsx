import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import FooterHome from '@/components/home/FooterHome'

export default function HomePage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>
   
   {/* HERO */}
   <section className="max-w-[1280px] mx-auto px-6 pt-14 text-center">
    <h1 className="font-extrabold tracking-tight leading-[0.9] text-[38px] md:text-[62px]">CRAFTED BY AI, FOR<br/><span className="text-[#C89B3C]">CREATO₹</span></h1>
    <p className="mt-4 text-[15px] text-black/60">Generate studio-quality product photos for Amazon in seconds.</p>
    <div className="mt-6 flex justify-center gap-3">
     <Link href="/photo-studio" className="bg-black text-white rounded-full px-6 py-2.5 text-[13px] hover:bg-black/80 transition">Start creating free</Link>
     <Link href="/resources" className="border bg-white rounded-full px-6 py-2.5 text-[13px] hover:bg-black/5 transition">Watch demo</Link>
    </div>
   </section>

   {/* 3 CARDS */}
   <section className="max-w-[1280px] mx-auto px-6 mt-12 grid md:grid-cols-3 gap-5">
    <Link href="/photo-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
     <div className="flex items-center gap-2"><span className="bg-[#FFF0C0] w-7 h-7 grid place-items-center rounded-full">Photo</span><span className="font-bold text-[18px]">Photo Studio</span></div>
     <div className="mt-1 text-[11px] bg-[#FFF0C0] inline-block px-2 py-0.5 rounded-full ml-9">Output</div>
     <div className="mt-4 flex justify-center"><img src="/sneaker.png" alt="product" className="h-[120px] w-auto object-contain"/></div>
    </Link>
    <Link href="/batch-studio" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
     <div className="flex items-center gap-2"><span className="bg-[#FFF0C0] w-7 h-7 grid place-items-center rounded-full">Batch</span><span className="font-bold text-[18px]">Batch Studio</span></div>
     <div className="text-[16px] font-bold mt-1">100 images <span className="text-[12px] font-normal text-black/50">2 min left</span></div>
     <div className="mt-3 grid grid-cols-2 gap-2"><div className="bg-[#F8F5EF] rounded-lg h-[54px] grid place-items-center text-[11px]">bottle</div><div className="bg-[#F8F5EF] rounded-lg h-[54px] grid place-items-center text-[11px]">candle</div><div className="bg-[#F8F5EF] rounded-lg h-[54px] grid place-items-center text-[11px]">mug</div><div className="bg-[#F8F5EF] rounded-lg h-[54px] grid place-items-center text-[11px]">cream</div></div>
    </Link>
    <Link href="/home#pricing" className="bg-white rounded-[16px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition">
     <div className="flex items-center gap-2"><span className="bg-[#FFF0C0] w-7 h-7 grid place-items-center rounded-full">Price</span><span className="font-bold text-[18px]">Pricing Pro</span></div>
     <div className="mt-6 text-[42px] font-extrabold text-[#C89B3C]">₹1999</div>
     <div className="mt-1 text-[11px] bg-[#FFF0C0] inline-block px-2 py-0.5 rounded-full">Most Popular</div>
    </Link>
   </section>

   {/* PRICING */}
   <section id="pricing" className="max-w-[1280px] mx-auto px-6 mt-10 pb-12">
    <div className="text-center text-[11px] tracking-[0.2em] text-black/40 mb-4">PRICING</div>
    <div className="grid md:grid-cols-4 gap-4">
     <div className="bg-white rounded-[14px] border p-5"><div className="font-semibold">Starter</div><div className="text-[28px] font-extrabold">₹499<span className="text-[12px] font-normal text-black/50"> /month</span></div><ul className="mt-4 text-[12px] space-y-1.5 text-black/70"><li>Up to 50 images</li><li>Basic AI edits</li><li>Email support</li></ul><Link href="/photo-studio" className="mt-5 block text-center border rounded-full py-2 text-[12px] hover:bg-black hover:text-white transition">Start Starter</Link></div>
     <div className="bg-white rounded-[14px] border-2 border-[#C89B3C]/30 p-5 relative"><div className="absolute top-3 right-3 bg-[#FFEDB0] text-[10px] px-2 py-0.5 rounded-full">Most Popular</div><div className="font-semibold">Pro</div><div className="text-[28px] font-extrabold">₹1999<span className="text-[12px] font-normal text-black/50"> /month</span></div><ul className="mt-4 text-[12px] space-y-1.5 text-black/70"><li>Up to 500 images</li><li>Advanced AI edits</li><li>Batch processing</li><li>Priority support</li></ul><Link href="/photo-studio" className="mt-5 block text-center bg-black text-white rounded-full py-2 text-[12px] hover:bg-black/80 transition">Get Pro</Link></div>
     <div className="bg-white rounded-[14px] border p-5"><div className="font-semibold">Business</div><div className="text-[28px] font-extrabold">₹4999<span className="text-[12px] font-normal text-black/50"> /month</span></div><ul className="mt-4 text-[12px] space-y-1.5 text-black/70"><li>Up to 2000 images</li><li>Custom styles</li><li>Team collaboration</li><li>API access</li></ul><Link href="/company" className="mt-5 block text-center border rounded-full py-2 text-[12px] hover:bg-black hover:text-white transition">Talk to Sales</Link></div>
     <div className="bg-white rounded-[14px] border p-5"><div className="font-bold leading-tight">Enterprise<br/>Custom</div><div className="mt-1 text-[11px] text-black/50">Contact us for volume</div><ul className="mt-4 text-[12px] space-y-1.5 text-black/70"><li>Unlimited images</li><li>Dedicated manager</li><li>SLA and security</li><li>Custom integration</li></ul><Link href="/company" className="mt-5 block text-center border rounded-full py-2 text-[12px] hover:bg-black hover:text-white transition">Contact Us</Link></div>
    </div>
   </section>

   <FooterHome/>
  </div>
 )
}
