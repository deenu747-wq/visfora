"use client";
import Link from 'next/link'
import HeaderHome from "@/components/home/HeaderHome"
import FooterHome from "@/components/home/FooterHome"

const studios = [
  {
    slug: "photo-studio",
    title: "Photo",
    highlight: "Studio",
    color: "#A78BFA",
    desc: "Turn your photos into stunning visuals with powerful editing tools, filters and effects.",
    features: ["Edit","Enhance","Filter","Transform"],
    bg: "bg-[#14102A]",
    inner: "bg-[#1C153F]",
  },
  {
    slug: "vector-studio",
    title: "Vector",
    highlight: "Studio",
    color: "#34D399",
    desc: "Create crisp, scalable vector graphics for logos, icons, illustrations and more.",
    features: ["Logos","Icons","Illustrations","Scalable"],
    bg: "bg-[#0E2318]",
    inner: "bg-[#122E1F]",
  },
  {
    slug: "3d-studio",
    title: "3D",
    highlight: "Studio",
    color: "#60A5FA",
    desc: "Bring your ideas to life with stunning 3D models, characters and scenes.",
    features: ["3D Models","Characters","Scenes","High Quality"],
    bg: "bg-[#101B36]",
    inner: "bg-[#16224A]",
  },
  {
    slug: "motion-studio",
    title: "Motion",
    highlight: "Studio",
    color: "#FB923C",
    desc: "Create dynamic videos and animations that bring your stories to life.",
    features: ["Animation","Transitions","Effects","Export"],
    bg: "bg-[#21160A]",
    inner: "bg-[#2D1C0C]",
  },
  {
    slug: "mockup-studio",
    title: "Mockup",
    highlight: "Studio",
    color: "#C084FC",
    desc: "Showcase your designs in realistic mockups and professional scenes.",
    features: ["Devices","Packaging","Apparel","Branding"],
    bg: "bg-[#1A1330]",
    inner: "bg-[#221A44]",
  },
  {
    slug: "template-maker",
    title: "Template",
    highlight: "Maker",
    color: "#60A5FA",
    desc: "Design beautiful layouts and ready-to-use templates in minutes.",
    features: ["Social Media","Presentations","Posters","Documents"],
    bg: "bg-[#121C35]",
    inner: "bg-[#192445]",
  },
];

export default function StudiosPage(){
 return (
  <div className="min-h-screen bg-[#080716] text-white">
   <HeaderHome />
   <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
     <h1 className="sr-only">Studios</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 rounded-[16px] overflow-hidden border border-white/10">
       {studios.map((s) => (
         <Link key={s.slug} href={`/studios/${s.slug}`} className={`${s.bg} p-6 md:p-7 border-b border-r border-white/[0.08] hover:brightness-110 transition-all group`}>
           <h2 className="text-[22px] font-extrabold tracking-tight leading-none">
             {s.title} <span style={{color: s.color}}>{s.highlight}</span>
           </h2>
           <p className="mt-2 text-[11px] leading-[1.5] text-white/60 line-clamp-2">{s.desc}</p>
           
           <div className="mt-3 flex flex-wrap gap-2">
             {s.features.map(f => (
               <span key={f} className="text-[10px] text-white/60 flex items-center gap-1.5">
                 <span className="w-4 h-4 rounded-full bg-white/10 grid place-items-center text-[8px]">•</span> {f}
               </span>
             ))}
           </div>

           <div className={`mt-5 h-[200px] rounded-[12px] ${s.inner} border border-white/5 flex items-center justify-center text-white/20 text-[11px]`}>
             {s.title} {s.highlight} Visual
           </div>
         </Link>
       ))}
     </div>
   </div>
   <FooterHome />
  </div>
 )
}