"use client";
import Link from 'next/link'
import HeaderHome from "@/components/home/HeaderHome"
import FooterHome from "@/components/home/FooterHome"

const studios = [
  { slug: "photo-studio", title: "Photo", highlight: "Studio", desc: "Amazon-Ready Photos • AI BG Removal • Studio lighting in 8 seconds.", features: ["Edit","Enhance","BG Removal","Amazon Ready"], img: "/studios/photo-studio.jpg" },
  { slug: "vector-studio", title: "Vector", highlight: "Studio", desc: "Logo to Vector • SVG Instant • Crisp scalable graphics.", features: ["Logos","Icons","Illustrations","SVG"], img: "/studios/vector-studio.jpg" },
  { slug: "3d-studio", title: "3D", highlight: "Studio", desc: "Text to 3D • 360° Views • High quality models.", features: ["3D Models","Characters","Scenes","360°"], img: "/studios/3d-studio.jpg" },
  { slug: "template-maker", title: "Template", highlight: "Maker", desc: "Landing • Portfolio • Dashboard templates ready to ship.", features: ["Landing","Portfolio","Dashboard","Figma"], img: "/studios/template-studio.jpg" },
  { slug: "mockup-studio", title: "Mockup", highlight: "Studio", desc: "iPhone • MacBook • Branding mockups that sell.", features: ["Devices","Packaging","Apparel","Branding"], img: "/studios/mockup-studio.jpg" },
  { slug: "motion-studio", title: "Motion", highlight: "Studio", desc: "Animations • Light Trails • Motion that converts.", features: ["Animation","Transitions","Effects","Export"], img: "/studios/motion-studio.jpg" },
  { slug: "audio-studio", title: "Audio", highlight: "Studio", desc: "Waveforms • Coming Soon • Premium audio assets.", features: ["Waveforms","Coming Soon","Premium","Audio"], img: "/studios/audio-studio.jpg", comingSoon: true },
  { slug: "assets", title: "Assets", highlight: "Marketplace", desc: "1000+ Premium Mockups, Vectors, Templates in one place.", features: ["Mockups","3D","Vectors","Templates"], img: "/studios/assets.jpg" },
];

export default function StudiosPage(){
 return (
  <>
   <HeaderHome />
   <div className="min-h-screen bg-[#FFFBF0]">
     <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-8 text-center">
       <h1 className="text-[42px] md:text-[56px] font-black tracking-tight leading-none text-[#111]">Studios</h1>
       <p className="mt-3 text-[14px] md:text-[16px] text-black/60 max-w-[620px] mx-auto">Your creative workspace. Seven studios + Assets Marketplace.</p>
     </div>

     <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {studios.map((s) => (
           <Link key={s.slug} href={s.comingSoon ? "#" : `/studios/${s.slug}`} className="bg-white p-6 md:p-7 rounded-[20px] border border-black/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group relative overflow-hidden">
             {s.comingSoon && <div className="absolute top-4 right-4 text-[9px] bg-black text-white px-3 py-1 rounded-full font-bold tracking-widest">COMING SOON</div>}
             <h2 className="text-[18px] font-bold tracking-tight text-[#111]">{s.title} <span className="text-[#C9A86A]">{s.highlight}</span></h2>
             <p className="mt-2 text-[11px] leading-[1.5] text-black/60">{s.desc}</p>
             <div className="mt-3 flex flex-wrap gap-2">
               {s.features.map(f => (
                 <span key={f} className="text-[10px] text-black/50 flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-black/5 grid place-items-center">•</span> {f}</span>
               ))}
             </div>
             {/* WHITE CARD + REAL IMAGE */}
             <div className="mt-5 h-[185px] rounded-[12px] bg-[#FAF6EE] border border-black/[0.05] overflow-hidden flex items-center justify-center group-hover:border-[#D4B87A]/30 transition">
               <img 
                 src={s.img} 
                 alt={s.title} 
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   // Fallback if jpg not found, try webp
                   const target = e.target as HTMLImageElement;
                   if (target.src.endsWith('.jpg')) {
                     target.src = target.src.replace('.jpg', '.webp');
                   }
                 }}
               />
             </div>
           </Link>
         ))}
       </div>
     </div>
   </div>
   <FooterHome />
  </>
 )
}