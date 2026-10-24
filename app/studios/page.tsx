"use client";
import Link from 'next/link'
import HeaderHome from "@/components/home/HeaderHome"
import FooterHome from "@/components/home/FooterHome"

const studios = [
  {
    slug: "photo-studio",
    title: "Photo",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Amazon-Ready Photos • AI BG Removal • Studio lighting in 8 seconds.",
    features: ["Edit","Enhance","BG Removal","Amazon Ready"],
    img: "/studios/photo-studio.jpg",
  },
  {
    slug: "vector-studio",
    title: "Vector",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Logo to Vector • SVG Instant • Crisp scalable graphics.",
    features: ["Logos","Icons","Illustrations","SVG"],
    img: "/studios/vector-studio.jpg",
  },
  {
    slug: "3d-studio",
    title: "3D",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Text to 3D • 360° Views • High quality models.",
    features: ["3D Models","Characters","Scenes","360°"],
    img: "/studios/3d-studio.jpg",
  },
  {
    slug: "template-maker",
    title: "Template",
    highlight: "Maker",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Landing • Portfolio • Dashboard templates ready to ship.",
    features: ["Landing","Portfolio","Dashboard","Figma"],
    img: "/studios/template-studio.jpg",
  },
  {
    slug: "mockup-studio",
    title: "Mockup",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "iPhone • MacBook • Branding mockups that sell.",
    features: ["Devices","Packaging","Apparel","Branding"],
    img: "/studios/mockup-studio.jpg",
  },
  {
    slug: "motion-studio",
    title: "Motion",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Animations • Light Trails • Motion that converts.",
    features: ["Animation","Transitions","Effects","Export"],
    img: "/studios/motion-studio.jpg",
  },
  {
    slug: "audio-studio",
    title: "Audio",
    highlight: "Studio",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "Waveforms • Coming Soon • Premium audio assets.",
    features: ["Waveforms","Coming Soon","Premium","Audio"],
    img: "/studios/audio-studio.jpg",
    comingSoon: true,
  },
  {
    slug: "assets",
    title: "Assets",
    highlight: "Marketplace",
    color: "#D4B87A",
    bg: "bg-[#111]",
    inner: "bg-[#1A1A1A]",
    desc: "1000+ Premium Mockups, Vectors, Templates in one place.",
    features: ["Mockups","3D","Vectors","Templates"],
    img: "/studios/assets.jpg",
  },
];

export default function StudiosPage(){
 return (
  <>
   <HeaderHome />
   <div className="min-h-screen bg-[#FFFBF0]">
     <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-8 text-center">
       <h1 className="text-[42px] md:text-[56px] font-black tracking-tight leading-none text-[#111]">Studios</h1>
       <p className="mt-3 text-[14px] md:text-[16px] text-black/60 max-w-[620px] mx-auto">
         Your creative workspace. Seven studios + Assets Marketplace. All premium, all real images.
       </p>
     </div>

     <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {studios.map((s) => (
           <Link key={s.slug} href={s.comingSoon ? "#" : `/studios/${s.slug}`} className={`${s.bg} p-6 md:p-7 rounded-[20px] border border-white/5 shadow-lg hover:scale-[1.02] hover:shadow-2xl hover:brightness-110 transition-all duration-300 group relative overflow-hidden`}>
             {s.comingSoon && <div className="absolute top-4 right-4 text-[9px] bg-[#D4B87A] text-black px-3 py-1 rounded-full font-bold tracking-widest">COMING SOON</div>}
             <h2 className="text-[18px] font-bold tracking-tight text-white">{s.title} <span style={{color: s.color}}>{s.highlight}</span></h2>
             <p className="mt-2 text-[11px] leading-[1.5] text-white/60">{s.desc}</p>
             <div className="mt-3 flex flex-wrap gap-2">
               {s.features.map(f => (
                 <span key={f} className="text-[10px] text-white/50 flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-white/10 grid place-items-center">•</span> {f}</span>
               ))}
             </div>
             {/* REAL IMAGE HERE */}
             <div className={`mt-5 h-[185px] rounded-[12px] ${s.inner} border border-white/5 overflow-hidden flex items-center justify-center group-hover:border-white/20 transition`}>
               <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
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