"use client";
import Link from "next/link";
import HeaderHome from "../../components/home/HeaderHome";
import FooterHome from "../../components/home/FooterHome";

const plans = [
  {
    name: "Free",
    price: "$0",
    sub: "/ month",
    desc: "Perfect for exploring Visfora.",
    features: ["1 Studio Access", "10 Exports / mo", "720p Export", "Community Support"],
    cta: "Start Free",
    href: "/get-started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    sub: "/ month",
    desc: "For creators & designers daily.",
    features: ["All 6 Studios", "Unlimited Exports", "4K + Transparent PNG", "Assets Marketplace", "Priority Support"],
    cta: "Go Pro",
    href: "/get-started",
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    sub: "/ month",
    desc: "For teams & agencies who ship fast.",
    features: ["Everything in Pro", "5 Team Seats", "Brand Kit + Shared Assets", "License for Clients", "Dedicated Manager"],
    cta: "Start Team",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EE] text-[#111]">
      <HeaderHome />
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B7CFF] via-[#D8B26A] to-[#F3E8C9]" />

      <main className="max-w-[1120px] mx-auto px-6 py-14 flex flex-col items-center text-center">
        <h1 className="text-[34px] md:text-[48px] font-black tracking-tight">Simple, joyful pricing</h1>
        <p className="text-[14px] text-black/60 mt-2">Start free. Upgrade when you need more power. Cancel anytime.</p>

        {/* Pricing Cards - CENTERED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full">
          {plans.map((p) => (
            <div key={p.name} className={`relative bg-white rounded-[20px] border p-6 text-left flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] ${p.popular ? "border-[#C9A96A] shadow-[0_10px_30px_rgba(201,169,106,0.15)]" : "border-black/10"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-3 py-1 rounded-full font-bold">MOST POPULAR</span>}
              <h3 className="font-bold text-[18px]">{p.name}</h3>
              <p className="text-[12px] text-black/60 mt-1">{p.desc}</p>
              <div className="flex items-baseline gap-1 mt-5">
                <span className="text-[36px] font-black">{p.price}</span>
                <span className="text-[12px] text-black/50">{p.sub}</span>
              </div>
              <ul className="mt-6 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="text-[12px] flex gap-2"><span className="text-[#C9A96A]">●</span> {f}</li>
                ))}
              </ul>
              <Link href={p.href} className={`mt-8 h-11 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${p.popular ? "bg-black text-white hover:bg-[#111]" : "bg-white border border-black/15 text-black hover:bg-black hover:text-white"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-black/50 mt-8">All plans include 7-day money back guarantee. No credit card for Free plan.</p>
      </main>

      <FooterHome />
    </div>
  );
}