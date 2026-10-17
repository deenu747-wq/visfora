import Link from 'next/link'

export default function HomePage(){
 return (
  <div className="bg-[#FFFBF5] min-h-screen">
   {/* HERO */}
   <section className="max-w-[1400px] mx-auto px-6 pt-10 pb-6 text-center">
    <h1 className="font-sans font-bold text-[48px] md:text-[64px] leading-[0.95] tracking-tight text-black">CRAFTED BY AI, FOR CREATORS</h1>
    <p className="mt-3 text-[15px] text-[#8B7355] underline decoration-[#C8A165]/30 underline-offset-8">AI photography studio for e-commerce brands — fast, consistent, on-brand visuals</p>
   </section>

   {/* MAIN DASHBOARD */}
   <section id="batch" className="max-w-[1400px] mx-auto px-6 grid grid-cols-12 gap-5">
    
    {/* LEFT TRUST */}
    <div className="col-span-12 md:col-span-3">
     <h2 className="font-bold text-[20px] text-black">Generate professional photos</h2>
     <p className="font-medium mt-1 text-[14px]">Built for Indian sellers</p>
     <div className="mt-4 space-y-3 text-[13px]">
      <div className="flex gap-2"><span className="bg-[#C8A165] text-white w-5 h-5 rounded-full grid place-items-center text-[10px]">✓</span>GST-compliant invoices & billing</div>
      <div className="flex gap-2"><span className="bg-[#C8A165] text-white w-5 h-5 rounded-full grid place-items-center text-[10px]">✓</span>UPI payments enabled</div>
      <div className="flex gap-2"><span className="bg-[#C8A165] text-white w-5 h-5 rounded-full grid place-items-center text-[10px]">✓</span>Optimized for Amazon, Flipkart, Meesho</div>
     </div>
     <div className="mt-4 border border-[#C8A165]/30 inline-block px-3 py-1 rounded-lg text-[11px] bg-white">Trusted by 10,000+ Indian sellers</div>
     <Link href="/photo-studio" className="mt-4 block w-full bg-black text-white text-center py-2 rounded-full text-[13px]">Open Photo Studio →</Link>
    </div>

    {/* CENTER BATCH */}
    <div className="col-span-12 md:col-span-5">
     <div className="bg-white border border-black/10 rounded-[12px] p-4 shadow-sm">
      <div className="flex justify-between items-center">
       <div className="flex items-center gap-2 font-semibold text-[14px]">☰ Batch Studio Dashboard</div>
       <div className="text-[10px] border border-[#C8A165]/40 px-2 py-1 rounded-full">Batch: #BF-1248</div>
      </div>
      <div className="mt-4 border rounded-lg p-3 space-y-3">
       <div className="flex justify-between text-[12px]"><span>📄 gold_candle.png</span><span className="text-[#B8945F]">Processing 80%</span></div>
       <div className="h-1.5 bg-black/10 rounded-full overflow-hidden"><div className="h-full w-[80%] bg-[#C8A165]"></div></div>
       <div className="flex justify-between text-[12px]"><span>📄 gold_perfume.png</span><span className="bg-[#1A7A4C] text-white text-[10px] px-2 py-1 rounded-full">✓ Completed</span></div>
      </div>
      <Link href="/photo-studio" className="mt-3 block text-center text-[12px] text-[#C8A165] underline">Upload More → Photo Studio</Link>
     </div>
    </div>

    {/* RIGHT PRODUCT */}
    <div className="col-span-12 md:col-span-4">
     <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <img src="/sneaker.png" alt="product" className="h-[230px] w-full object-cover" />
      <div className="p-3">
       <div className="text-[11px] font-medium">Shadow Controls — Marble Light</div>
       <Link href="/photo-studio" className="mt-2 block w-full bg-[#C8A165] text-white text-center py-2 rounded-full text-[12px]">Edit in Photo Studio</Link>
      </div>
     </div>
    </div>
   </section>

   {/* PRICING */}
   <section id="pricing" className="max-w-[1400px] mx-auto px-6 mt-12">
    <h2 className="text-center font-bold text-[20px]">Simple, transparent pricing</h2>
    <p className="text-center text-[13px] text-black/50">Choose a plan that grows with your business</p>
    <div className="grid grid-cols-12 gap-4 mt-5">
     <div className="col-span-6 md:col-span-3 bg-white border rounded-xl p-5 text-center"><div className="font-bold">Free</div><div className="text-[32px] font-bold">₹0</div><Link href="/photo-studio" className="mt-3 block border border-black rounded-full py-2 text-[12px]">Start Free</Link></div>
     <div className="col-span-6 md:col-span-3 bg-white border rounded-xl p-5 text-center"><div className="font-bold">Starter</div><div className="text-[32px] font-bold">₹699</div><Link href="/photo-studio" className="mt-3 block bg-[#C8A165] text-white rounded-full py-2 text-[12px]">Get Starter</Link></div>
     <div className="col-span-6 md:col-span-3 bg-white border-2 border-[#C8A165] rounded-xl p-5 text-center relative"><div className="absolute -top-2 right-3 bg-[#C8A165] text-white text-[9px] px-2 py-1 rounded-full">Best for Amazon sellers</div><div className="font-bold">Growth</div><div className="text-[32px] font-bold">₹1999</div><Link href="/photo-studio" className="mt-3 block bg-black text-white rounded-full py-2 text-[12px]">Get Growth</Link></div>
     <div className="col-span-6 md:col-span-3 bg-white border rounded-xl p-5 text-center"><div className="font-bold">Scale</div><div className="text-[32px] font-bold">₹4999</div><Link href="/photo-studio" className="mt-3 block border border-black rounded-full py-2 text-[12px]">Get Scale</Link></div>
    </div>
   </section>

   <div className="mt-10 border-t py-4 text-center text-[11px] text-black/50">Made in India — Built in Bengaluru · Secure · GST-compliant · 24/7 Support</div>
  </div>
 )
}