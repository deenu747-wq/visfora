import Link from 'next/link'
import FooterHome from '@/components/home/FooterHome'
import HeaderHome from '@/components/home/HeaderHome'

export default function GetStartedPage(){
 return (
  <div className="min-h-screen bg-[#fffcf7] text-black">
   <HeaderHome/>
   <section className="max-w-[1120px] mx-auto px-6 pt-10 pb-20 grid md:grid-cols-2 gap-10 items-start">
    
    {/* Left Form */}
    <div className="bg-white rounded-[24px] border border-black/[0.06] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
     <h1 className="font-bold text-[26px] tracking-tight">Get started with VISFORA</h1>
     <p className="mt-2 text-[13px] leading-5 text-black/60">Create your free account. No credit card required. Trusted by 1000+ D2C brands.</p>
     
     <div className="mt-7 space-y-4">
      <div className="grid grid-cols-2 gap-3">
       <div><label className="text-[11px] font-semibold tracking-wide">First name</label><input placeholder="e.g. Aarav" className="mt-1.5 w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-white outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all" /></div>
       <div><label className="text-[11px] font-semibold tracking-wide">Last name</label><input placeholder="e.g. Sharma" className="mt-1.5 w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-white outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all" /></div>
      </div>
      <div><label className="text-[11px] font-semibold tracking-wide">Work email</label><input placeholder="you@yourstore.in" className="mt-1.5 w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-white outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all" /></div>
      <div><label className="text-[11px] font-semibold tracking-wide">Store URL</label><input placeholder="yourstore.myshopify.com" className="mt-1.5 w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-white outline-none focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 transition-all" /></div>
      
      <button className="w-full bg-[#facc15] hover:bg-[#d6a85a] text-black rounded-full py-3 text-[14px] font-semibold border border-[#facc15] hover:border-[#d6a85a] hover:shadow-[0_8px_20px_rgba(214,168,90,0.3)] transition-all duration-200 mt-2">
        Create free account
      </button>
     </div>
     
     <div className="mt-5 text-[11px] text-black/40 text-center">By creating an account you agree to Terms & Privacy Policy.</div>
     <div className="mt-3 text-center text-[12px]">Already have an account? <Link href="/login" className="text-black font-semibold underline decoration-[#facc15] decoration-2 underline-offset-2 hover:text-[#d6a85a] transition">Log in</Link></div>
    </div>

    {/* Right Plans */}
    <div>
     <h2 className="font-bold text-[22px] tracking-tight">Choose your plan</h2>
     <p className="text-[12px] text-black/60 mt-1.5 leading-4">Simple, transparent pricing. All plans include 14-day free trial. GST extra on all plans.</p>
     <div className="mt-6 space-y-4">
      
      <div className="bg-white rounded-[20px] border border-black/10 p-5 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
       <div className="font-bold text-[14px]">Starter</div><div className="font-bold text-[22px] mt-1">₹1499/mo</div><div className="text-[10px] text-black/40 -mt-1">+ GST</div>
       <ul className="mt-3 text-[12px] text-black/60 space-y-1"><li>✓ Up to 100 orders/month</li><li>✓ Basic analytics & reports</li><li>✓ WhatsApp support</li><li>✓ Email integrations</li></ul>
       <button className="mt-4 w-full border border-black/15 rounded-full py-2.5 text-[12px] font-semibold hover:bg-[#d6a85a] hover:border-[#d6a85a] hover:text-black transition-all duration-200">Select Starter</button>
      </div>

      <div className="bg-white rounded-[20px] border-2 border-[#facc15]/60 p-5 relative shadow-[0_8px_24px_rgba(250,204,21,0.15)]">
       <div className="absolute -top-3 right-4 bg-[#facc15] text-black text-[10px] font-bold px-3 py-1 rounded-full">Most Popular</div>
       <div className="font-bold text-[14px]">Growth</div><div className="font-bold text-[22px] mt-1">₹3999/mo</div><div className="text-[10px] text-black/40 -mt-1">+ GST</div>
       <ul className="mt-3 text-[12px] text-black/60 space-y-1"><li>✓ Up to 1000 orders/month</li><li>✓ Advanced analytics & insights</li><li>✓ Automation workflows</li><li>✓ Priority support</li><li>✓ Multi-channel integrations</li></ul>
       <button className="mt-4 w-full bg-[#facc15] text-black rounded-full py-2.5 text-[12px] font-bold border border-[#facc15] hover:bg-[#d6a85a] hover:border-[#d6a85a] hover:shadow-[0_8px_20px_rgba(214,168,90,0.3)] transition-all duration-200">Select Growth</button>
      </div>

      <div className="bg-white rounded-[20px] border border-black/10 p-5 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
       <div className="font-bold text-[14px]">Scale</div><div className="font-bold text-[22px] mt-1">₹9999/mo</div><div className="text-[10px] text-black/40 -mt-1">+ GST</div>
       <ul className="mt-3 text-[12px] text-black/60 space-y-1"><li>✓ Unlimited orders</li><li>✓ Custom integrations & API access</li><li>✓ Dedicated account manager</li><li>✓ Advanced security & SSO</li></ul>
       <button className="mt-4 w-full border border-black/15 rounded-full py-2.5 text-[12px] font-semibold hover:bg-[#d6a85a] hover:border-[#d6a85a] hover:text-black transition-all duration-200">Select Scale</button>
      </div>

     </div>
    </div>

   </section>
   <FooterHome/>
  </div>
 )
}