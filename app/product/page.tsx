import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

const studios = [
  {
    title: 'Photo Studio',
    desc: 'Edit photos with AI — background removal, retouch, enhancer, and more.',
    icon: '📷',
    highlight: true,
    image: true,
  },
  {
    title: 'Vector Studio',
    desc: 'Create scalable vectors, logos, and icons with AI-powered tools.',
    icon: '✏️',
  },
  {
    title: '3D Studio',
    desc: 'Generate 3D models, scenes, and realistic renders in seconds.',
    icon: '📦',
  },
  {
    title: 'Template Studio',
    desc: 'Design using ready templates for social, brand, web, and presentations.',
    icon: '📄',
  },
  {
    title: 'Motion Studio',
    desc: 'Animate videos, motion graphics, and dynamic transitions effortlessly.',
    icon: '▶️',
  },
  {
    title: 'Mockup Studio',
    desc: 'Create realistic mockups for devices, apparel, and product displays.',
    icon: '📱',
  },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black">
      <HeaderHome />

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="bg-white rounded-[20px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 md:p-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-extrabold tracking-tight text-[32px] md:text-[48px]">
              ONE PLATFORM, <span className="text-[#C9A85C]">6 STUDIOS</span>
            </h1>
            <p className="mt-2 text-[14px] md:text-[15px] text-black/60 max-w-[900px] mx-auto">
              Create, design, and build everything — from photos to 3D, vectors, motion, templates, and mockups — all in one platform.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {studios.map((s) => (
              <Link
                key={s.title}
                href={`/${s.title.toLowerCase().split(' ')[0]}-studio`}
                className={`rounded-[14px] border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-5 relative overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition text-left ${s.highlight ? 'pt-0' : ''}`}
              >
                {s.image && (
                  <div className="h-[120px] bg-gradient-to-r from-[#E8C873] to-[#C9A85C] rounded-t-[14px] -mx-5 -mt-0 mb-4 flex items-center justify-center">
                    <span className="text-[48px]">🎧</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F6E8C0] grid place-items-center text-[16px] flex-shrink-0">{s.icon}</div>
                  <div>
                    <div className="font-bold text-[16px]">{s.title}</div>
                    <p className="mt-1 text-[12px] leading-snug text-black/60">{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* API + MCP */}
          <div className="mt-8 grid md:grid-cols-2 gap-6 bg-[#FAF7F2] rounded-[16px] p-6 border border-black/5">
            <div>
              <h2 className="font-extrabold text-[22px]">
                <span className="text-[#C9A85C]">• API + MCP</span> INTEGRATION
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-black/60">
                Build and automate with VISFORA&apos;S API and MCP for seamless workflows. Integrates with your AI agents, apps, and internal tools.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full border border-[#C9A85C]/30 text-[11px] bg-white">RESTful API</span>
                <span className="px-3 py-1.5 rounded-full border border-[#C9A85C]/30 text-[11px] bg-white">SDKs: Python · Node · Go</span>
                <span className="px-3 py-1.5 rounded-full border border-[#C9A85C]/30 text-[11px] bg-white">MCP for AI Agents</span>
              </div>
              <div className="mt-4 text-[11px] text-black/60">🇮🇳 Made in India 🇮🇳 · Trusted by 1000+ creators & startups</div>
            </div>

            <div className="bg-[#121827] rounded-[12px] p-4 text-[11px] font-mono text-gray-300 relative">
              <div className="text-gray-500">curl</div>
              <div className="mt-2 leading-relaxed">
                curl -X POST https://api.visfora.ai/v1/generate<br />
                -H &quot;Authorization: Bearer YOUR_API_KEY&quot;<br />
                -H &quot;Content-Type: application/json&quot;<br />
                -d {`{"studio": "photo", "prompt": "product on white background"}`}<br />
                {`}`}
              </div>
              <Link href="/docs" className="absolute bottom-4 right-4 bg-[#E8C873] text-black px-4 py-1.5 rounded-full text-[12px] font-sans font-medium">View Docs →</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}