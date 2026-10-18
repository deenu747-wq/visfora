import Link from 'next/link'
import FooterHome from '@/components/home/FooterHome'
import HeaderHome from '@/components/home/HeaderHome'

export default function GetStartedPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>
   <section className="max-w-[1080px] mx-auto px-6 pt-10 pb-16 grid md:grid-cols-2 gap-8 items-start">
    
    <div className="bg-white rounded-[20px] border border-black/5 p-8 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
     <h1 className="font-bold text-[26px]">Get started with VISFORA</h1>
     <p className="mt-2 text-[13px] text-black/60">Create your free account. No credit card required. Trusted by 1000+ D2C brands.</p>
     
     <div className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
       <div><label className="text-[12px] font-semibold">First name</label><input placeholder="e.g. Aarav" className="mt-1 w-full rounded-[10px] border border-black/15 px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#C89B3C]" /></div>
       <div><label className="text-[12px] font-semibold">Last name</label><input placeholder="e.g. Sharma" className="mt-1 w-full rounded-[10px] border border-black/15 px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#C89B3C]" /></div>
      </div>
      <div><label className="text-[12px] font-semibold">Work email</label><input placeholder="you@yourstore.in" className="mt-1 w-full rounded-[10px] border border-black/15 px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#C89B3C]" /></div>
      <div><label className="text-[12px] font-semibold">Store URL</label><input placeholder="yourstore.myshopify.com" className="mt-1 w-full rounded-[10px] border border-black/15 px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#C89B3C]" /></div>
      <button className="w-full bg-[#C89B3C] hover:bg-[#b48a35] text-white rounded-[10px] py-3 text-[14px] font-semibold transition">Create free account</button>
     </div>
     
     <div className="mt-4 text-[11px] text-black/50 text-center">By creating an account you agree to Terms & Privacy Policy.</div>
     <div className="mt-2 text-center text-[12px]">Already have an account? <Link href="/login" className="text-[#C89B3C] underline">Log in</Link></div>
    </div>

    <div>
     <h2 className="font-bold text-[22px]">Choose your plan</h2>
     <p className="text-[12px] text-black/60 mt-1">Simple, transparent pricing. All plans include 14-day free trial. GST extra on all plans.</p>
     <div className="mt-4 space-y-4">
      <div className="bg-white rounded-[14px] border border-black/10 p-4">
       <div className="font-bold">Starter</div><div className="font-bold text-[20px]">₹1499/mo</div><div className="text-[10px] text-black/50">+ GST</div>
       <ul className="mt-2 text-[11px] text-black/70 space-y-0.5"><li>✓ Up to 100 orders/month</li><li>✓ Basic analytics & reports</li><li>✓ WhatsApp support</li><li>✓ Email integrations</li></ul>
       <button className="mt-3 w-full border border-black rounded-[8px] py-2 text-[12px] font-semibold">Select Starter</button>
      </div>
      <div className="bg-white rounded-[14px] border-2 border-[#C89B3C]/50 p-4 relative">
       <div className="absolute -top-3 right-3 bg-[#C89B3C] text-white text-[10px] px-2 py-0.5 rounded-full">Most Popular</div>
       <div className="font-bold">Growth</div><div className="font-bold text-[20px]">₹3999/mo</div><div className="text-[10px] text-black/50">+ GST</div>
       <ul className="mt-2 text-[11px] text-black/70 space-y-0.5"><li>✓ Up to 1000 orders/month</li><li>✓ Advanced analytics & insights</li><li>✓ Automation workflows</li><li>✓ Priority support</li><li>✓ Multi-channel integrations</li></ul>
       <button className="mt-3 w-full bg-[#C89B3C] text-white rounded-[8px] py-2 text-[12px] font-semibold">Select Growth</button>
      </div>
      <div className="bg-white rounded-[14px] border border-black/10 p-4">
       <div className="font-bold">Scale</div><div className="font-bold text-[20px]">₹9999/mo</div><div className="text-[10px] text-black/50">+ GST</div>
       <ul className="mt-2 text-[11px] text-black/70 space-y-0.5"><li>✓ Unlimited orders</li><li>✓ Custom integrations & API access</li><li>✓ Dedicated account manager</li><li>✓ Advanced security & SSO</li></ul>
       <button className="mt-3 w-full border border-black rounded-[8px] py-2 text-[12px] font-semibold">Select Scale</button>
      </div>
     </div>
    </div>

   </section>
   <FooterHome/>
  </div>
 )
}