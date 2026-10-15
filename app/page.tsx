"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [yearly, setYearly] = useState(true);
  const plans = [
    { name: "Starter", monthly: 499, yearly: 3999, features: ["100 Generations/mo", "Ad Creatives", "BG Remover"] },
    { name: "Pro", monthly: 1499, yearly: 11999, popular: true, features: ["500 Generations/mo", "All Tools", "Product Shoots", "Priority Support"] },
    { name: "Scale", monthly: 3999, yearly: 31999, features: ["Unlimited Generations", "Team Access (5)", "API Access", "Custom Models"] },
  ];
  return (
    <main className="min-h-screen bg-[#fafafa] text-black antialiased">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-3">
            <Image src="/Logo.png" alt="Visfora" width={48} height={48} className="object-contain" />
            <span className="text-[20px] font-extrabold tracking-tight">VISFORA</span>
          </div>
          <button className="px-6 py-2.5 bg-black text-white rounded-full text-[13px] font-semibold">Get Started</button>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 text-center">
        <h1 className="text-[44px] md:text-[72px] font-black leading-[0.9] tracking-tighter">Create Visuals<br/><span className="relative">That Convert.<span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-400/40 -z-10"></span></span></h1>
        <p className="mt-5 text-[17px] opacity-60 max-w-2xl mx-auto">Generate high-converting ad creatives, product shoots & social content in seconds.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight">Simple Pricing in INR</h2>
          <div className="mt-6 inline-flex p-1 bg-white border border-black/10 rounded-full">
            <button onClick={()=>setYearly(false)} className={`px-5 py-2 rounded-full text-[13px] font-semibold transition ${!yearly? 'bg-black text-white' : 'opacity-60'}`}>Monthly</button>
            <button onClick={()=>setYearly(true)} className={`px-5 py-2 rounded-full text-[13px] font-semibold transition ${yearly? 'bg-black text-white' : 'opacity-60'}`}>Yearly <span className="ml-1 text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded-full">SAVE 33%</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`bg-white rounded-[24px] border p-7 flex flex-col ${p.popular? 'border-black shadow-xl scale-[1.02]' : 'border-black/5 shadow-sm'}`}>
              {p.popular && <span className="text-[10px] font-bold tracking-widest bg-yellow-400 px-2 py-1 rounded-full self-start mb-3">MOST POPULAR</span>}
              <h3 className="font-bold text-[18px]">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[36px] font-black">₹{yearly? p.yearly.toLocaleString('en-IN') : p.monthly.toLocaleString('en-IN')}</span>
                <span className="text-[13px] opacity-50">/{yearly? 'year' : 'month'}</span>
              </div>
              {yearly && <p className="text-[12px] opacity-50 mt-1">₹{Math.round(p.yearly/12).toLocaleString('en-IN')}/mo billed yearly</p>}
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map(f => <li key={f} className="text-[13px] flex gap-2"><span className="text-yellow-500">✓</span> {f}</li>)}
              </ul>
              <button className={`mt-7 w-full py-3 rounded-full font-semibold text-[14px] ${p.popular? 'bg-black text-white' : 'bg-zinc-100'}`}>Choose {p.name}</button>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-black/5 py-8 text-center text-[12px] opacity-30">© 2026 VISFORA</footer>
    </main>
  );
}