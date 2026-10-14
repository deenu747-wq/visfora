"use client";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0D1A] text-white font-sans">
      {/* NAV - EXACT COPY */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-[#0E0D1A] border-b border-white/5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2.5">
          {/* LOCKED VF LOGO - PURPLE VERSION */}
          <svg width="32" height="32" viewBox="0 0 100 80" fill="none">
            <path d="M10 12 C22 12 32 16 42 36 L62 76 L87 36 C77 36 67 32 57 12 M52 26 L72 66 L92 26" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M70 39 H90 M72 46 H87" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round"/>
          </svg>
          <span className="text-[24px] font-bold tracking-tight">Visfora</span>
        </div>
        <div className="hidden md:flex gap-6 text-[15px] font-medium text-white/80">
          <span>Product</span><span className="text-white/30">|</span><span>Studios</span><span className="text-white/30">|</span><span>Pricing</span><span className="text-white/30">|</span><span>Resources</span>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-lg border border-[#8B5CF6]/50 text-[14px] flex items-center gap-2"><span className="opacity-60">👻</span> Log in</button>
          <button className="px-5 py-2 rounded-lg bg-[#8B5CF6] text-white text-[14px] font-semibold">Get Started</button>
        </div>
      </nav>

      {/* HERO WITH PURPLE GLOW */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/40 to-transparent blur-[60px] pointer-events-none"></div>
        <section className="text-center px-6 pt-16 pb-8 max-w-5xl mx-auto relative z-10">
          <h1 className="text-[42px] md:text-[56px] font-extrabold tracking-tight leading-tight mb-3">All-in-One AI Design Stack</h1>
          <p className="text-[15px] md:text-[16px] text-white/70 max-w-3xl mx-auto mb-6">Create photos, vectors, 3D, motion, mockups, and templates in one place. Build faster with AI-powered studios for every creative workflow.</p>
          <div className="flex gap-3 justify-center mb-4">
            <button className="px-8 py-3 rounded-lg bg-[#8B5CF6] font-semibold text-[15px] leading-tight">Get Started<br/><span className="text-[11px] font-normal opacity-80">It&apos;s Free</span></button>
            <button className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-[15px]">▶ Watch Demo</button>
          </div>
          <div className="flex gap-4 justify-center text-[12px] text-white/60">
            <span>✓ No credit card required</span><span>•</span><span>✓ Free plan available</span><span>•</span><span>✓ Join 10k+ creators</span>
          </div>
        </section>
      </div>

      {/* 6 STUDIOS */}
      <section className="max-w-[1200px] mx-auto px-6 pb-12">
        <h2 className="text-[20px] font-bold mb-5">6 Studios — Everything you need to design</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Photo Studio", "AI photo editing, background removal, retouching", "📷"],
            ["Vector Studio", "Create & edit scalable vectors, logos, icons", "✏️"],
            ["3D Studio", "Generate and edit 3D models with AI prompts", "🧊"],
            ["Motion Studio", "Create animations, motion graphics, and video", "🎞️"],
            ["Mockup Studio", "Instant product mockups for merch & branding", "🖨️"],
            ["Template Maker", "Design templates for social, web, and print", "📄"],
          ].map(([title, desc]) => (
            <div key={title} className="relative rounded-xl border border-[#8B5CF6]/30 bg-[#15131F] p-6 text-center overflow-hidden group hover:border-[#8B5CF6]/60 transition">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8B5CF6]/20 blur-[20px] rounded-full"></div>
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[#1E1B2E] border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-[18px]">◈</div>
              <h3 className="font-bold text-[15px] mb-1">{title}</h3>
              <p className="text-[12px] text-white/60 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="text-center mb-6">
          <h2 className="text-[20px] font-bold">Pricing Free Creator Studio</h2>
          <p className="text-[14px] text-white/60">Start for free. Upgrade when you need more</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {/* FREE */}
          <div className="rounded-xl border border-white/10 bg-[#15131F] p-6">
            <h3 className="text-[15px] font-medium">Free</h3>
            <p className="text-[28px] font-extrabold">$0<span className="text-[13px] font-normal text-white/60"> /month</span></p>
            <ul className="mt-4 text-[12px] text-white/70 space-y-1 leading-relaxed">
              <li>✓ Access to 6 studios</li><li>✓ 20 exports per month</li><li>✓ Standard AI credits</li><li>✓ Community templates</li>
            </ul>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-white/20 text-[13px]">Get Started Free</button>
          </div>
          {/* PRO - POPULAR */}
          <div className="rounded-xl border border-[#8B5CF6] bg-gradient-to-b from-[#1E1B3A] to-[#15131F] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-[#8B5CF6]/20 blur-[30px]"></div>
            <div className="absolute -top-0 left-6 px-2 py-0.5 bg-[#8B5CF6] text-[11px] rounded-b-md">Most Popular</div>
            <h3 className="text-[15px] font-medium mt-2">Pro</h3>
            <p className="text-[28px] font-extrabold">$19<span className="text-[13px] font-normal text-white/60"> /month</span></p>
            <ul className="mt-4 text-[12px] text-white/70 space-y-1 leading-relaxed relative z-10">
              <li>✓ Everything in Free</li><li>✓ 500 exports per month</li><li>✓ Advanced AI credits</li><li>✓ Priority generation speed</li><li>✓ Premium templates</li>
            </ul>
            <button className="w-full mt-6 py-2.5 rounded-lg bg-[#8B5CF6] text-[13px] font-semibold relative z-10">Start Pro Trial</button>
          </div>
          {/* TEAM */}
          <div className="rounded-xl border border-white/10 bg-[#15131F] p-6">
            <h3 className="text-[15px] font-medium">Team</h3>
            <p className="text-[28px] font-extrabold">$39<span className="text-[13px] font-normal text-white/60"> /month</span></p>
            <ul className="mt-4 text-[12px] text-white/70 space-y-1 leading-relaxed">
              <li>✓ Everything in Pro</li><li>✓ Unlimited exports</li><li>✓ Team collaboration</li><li>✓ Shared workspace & asset</li><li>✓ Priority support</li>
            </ul>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-white/20 text-[13px]">Contact Sales</button>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 border-t border-white/5 text-[12px] text-white/30">
        © 2024 Visfora • Privacy • Terms • Help • Status
      </footer>
    </div>
  );
}