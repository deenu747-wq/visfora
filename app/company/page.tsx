import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

const team = [
 { initials: 'AS', name: 'Aarav Sharma', role: 'CEO & Co-founder' },
 { initials: 'PV', name: 'Priya Verma', role: 'Head of Product' },
 { initials: 'RM', name: 'Rohan Mehta', role: 'CTO & Engineering' },
 { initials: 'AN', name: 'Ananya Singh', role: 'Head of Marketing' },
 { initials: 'VP', name: 'Vikram Patel', role: 'Head of Operations' },
]

export default function CompanyPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>

   {/* HERO */}
   <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-10 text-center">
    <h1 className="font-extrabold tracking-tight text-[40px] md:text-[54px] leading-[0.9]">Building the Future of eCommerce</h1>
    <p className="mt-4 text-[15px] text-black/60 max-w-[600px] mx-auto">We&apos;re on a mission to empower Indian sellers to sell globally with AI. Made for India, built for scale.</p>
    <div className="mt-6 flex justify-center gap-3">
     <Link href="/product" className="bg-[#C89B3C] hover:bg-[#b48a35] text-white rounded-full px-6 py-2.5 text-[13px] font-medium transition">Explore Products</Link>
     <Link href="/home#pricing" className="border border-[#C89B3C]/30 bg-white hover:bg-[#FFFCF7] rounded-full px-6 py-2.5 text-[13px] font-medium transition">Watch Demo</Link>
    </div>
    <div className="mt-8 text-[11px] tracking-wide text-black/40">Trusted by 500+ sellers • Shopify • Amazon India • Meesho • WooCommerce</div>
   </section>

   {/* OUR STORY */}
   <section className="bg-[#FFF8ED]/60 border-y border-black/5 py-12">
    <div className="max-w-[1080px] mx-auto px-6">
     <div className="text-center">
      <div className="inline-block bg-[#FFE9B8] text-[#8a6a2a] text-[11px] tracking-widest px-3 py-1 rounded-full font-semibold">OUR STORY</div>
      <h2 className="mt-3 font-bold text-[26px]">From idea to impact</h2>
     </div>
     <div className="mt-8 bg-white rounded-[16px] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C89B3C]/20">
      <div className="p-6">
       <div className="text-[22px]">🚀</div>
       <div className="mt-2 font-semibold text-[14px]">2022 • Founded in Delhi</div>
       <p className="mt-1 text-[12px] text-black/60 leading-relaxed">VISFORA was founded to simplify eCommerce for independent Indian sellers, starting with ₹ pricing.</p>
      </div>
      <div className="p-6">
       <div className="text-[22px]">🧠</div>
       <div className="mt-2 font-semibold text-[14px]">2023 • AI Launched</div>
       <p className="mt-1 text-[12px] text-black/60 leading-relaxed">Launched AI tools for product listings, GST invoicing, and ad automation for Indian marketplaces.</p>
      </div>
      <div className="p-6">
       <div className="text-[22px]">📈</div>
       <div className="mt-2 font-semibold text-[14px]">2024 • 500+ Indian Sellers</div>
       <p className="mt-1 text-[12px] text-black/60 leading-relaxed">Now empowering 500+ sellers across Amazon, Flipkart, Shopify & Meesho from India to global.</p>
      </div>
     </div>
    </div>
   </section>

   {/* TEAM + VALUES */}
   <section className="max-w-[1080px] mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
    {/* TEAM */}
    <div>
     <h3 className="font-bold text-[18px]">Meet the team behind VISFORA</h3>
     <div className="mt-5 grid grid-cols-3 gap-3">
      {team.map((m)=>(
       <div key={m.name} className="bg-white rounded-[14px] border border-black/5 p-4 text-center shadow-sm">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF0C0] text-[#8a6a2a] font-bold grid place-items-center text-[13px]">{m.initials}</div>
        <div className="mt-2 font-semibold text-[12px] leading-tight">{m.name}</div>
        <div className="mt-0.5 text-[10px] text-black/50">{m.role}</div>
       </div>
      ))}
     </div>
    </div>

    {/* VALUES */}
    <div>
     <div className="text-center md:text-left">
      <div className="inline-block bg-[#FFE9B8] text-[#8a6a2a] text-[11px] tracking-widest px-3 py-1 rounded-full font-semibold">OUR VALUES</div>
      <h3 className="mt-2 font-bold text-[22px]">What we stand for</h3>
     </div>
     <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-white rounded-[14px] border border-black/5 p-4 text-center shadow-sm">
       <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF0C0] grid place-items-center">💡</div>
       <div className="mt-2 font-semibold text-[12px]">Innovation</div>
       <p className="mt-1 text-[10px] text-black/50 leading-relaxed">We push boundaries to build smarter AI for Bharat&apos;s sellers.</p>
      </div>
      <div className="bg-white rounded-[14px] border border-black/5 p-4 text-center shadow-sm">
       <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF0C0] grid place-items-center">🛡️</div>
       <div className="mt-2 font-semibold text-[12px]">Trust</div>
       <p className="mt-1 text-[10px] text-black/50 leading-relaxed">Transparent, GST-compliant & reliable for Indian businesses.</p>
      </div>
      <div className="bg-white rounded-[14px] border border-black/5 p-4 text-center shadow-sm">
       <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF0C0] grid place-items-center">📈</div>
       <div className="mt-2 font-semibold text-[12px]">Growth</div>
       <p className="mt-1 text-[10px] text-black/50 leading-relaxed">Helping every seller scale from ₹10k to ₹10L per month.</p>
      </div>
     </div>
     <div className="mt-6 bg-[#FFF0E0] rounded-[16px] p-5 flex items-center justify-between">
      <div>
       <div className="font-bold text-[16px]">Join our growing team</div>
       <div className="text-[11px] text-black/50">Hiring in Delhi, Bangalore & Remote</div>
      </div>
      <Link href="/company" className="bg-[#C89B3C] text-white rounded-full px-5 py-2 text-[12px]">Join Us</Link>
     </div>
    </div>
   </section>

   <Footer/>
  </div>
 )
}