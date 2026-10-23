"use client";
import Link from 'next/link'
import HeaderHome from "@/components/home/HeaderHome"
import FooterHome from "@/components/home/FooterHome"

const studios = [
  {
    slug: "photo-studio",
    title: "Photo",
    highlight: "Studio",
    color: "#8B5CF6",
    bg: "bg-[#1A1435]",
    inner: "bg-[#231D4A]",
    desc: "Turn your photos into stunning visuals with powerful editing tools, filters and effects.",
    features: ["Edit","Enhance","Filter","Transform"],
  },
  {
    slug: "vector-studio",
    title: "Vector",
    highlight: "Studio",
    color: "#10B981",
    bg: "bg-[#0F241A]",
    inner: "bg-[#173324]",
    desc: "Create crisp, scalable vector graphics for logos, icons, illustrations and more.",
    features: ["Logos","Icons","Illustrations","Scalable"],
  },
  {
    slug: "3d-studio",
    title: "3D",
    highlight: "Studio",
    color: "#3B82F6",
    bg: "bg-[#111E3C]",
    inner: "bg-[#1A2B55]",
    desc: "Bring your ideas to life with stunning 3D models, characters and scenes.",
    features: ["3D Models","Characters","Scenes","High Quality"],
  },
  {
    slug: "template-maker",
    title: "Template",
    highlight: "Maker",
    color: "#60A5FA",
    bg: "bg-[#12213F]",
    inner: "bg-[#1A2F58]",
    desc: "Design beautiful layouts and ready-to-use templates in minutes.",
    features: ["Social Media","Presentations","Posters","Documents"],
  },
  {
    slug: "mockup-studio",
    title: "Mockup",
    highlight: "Studio",
    color: "#C084FC",
    bg: "bg-[#1C1540]",
    inner: "bg-[#2A2158]",
    desc: "Showcase your designs in realistic mockups and professional scenes.",
    features: ["Devices","Packaging","Apparel","Branding"],
  },
  {
    slug: "motion-studio",
    title: "Motion",
    highlight: "Studio",
    color: "#FB923C",
    bg: "bg-[#251A0A]",
    inner: "bg-[#3A2812]",
    desc: "Create dynamic videos and animations that bring your stories to life.",
    features: ["Animation","Transitions","Effects","Export"],
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
         Your creative workspace. Six studios, one platform. Craft photos, vectors, 3D, motion, mockups, and templates — all in one place.
       </p>
     </div>

     <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {studios.map((s) => (
           <Link key={s.slug} href={`/studios/${s.slug}`} className={`${s.bg} p-6 md:p-7 rounded-[20px] border border-white/5 shadow-lg hover:scale-[1.02] hover:shadow-2xl hover:brightness-110 transition-all duration-300 group`}>
             <h2 className="text-[18px] font-bold tracking-tight text-white">{s.title} <span style={{color: s.color}}>{s.highlight}</span></h2>
             <p className="mt-2 text-[11px] leading-[1.5] text-white/60">{s.desc}</p>
             <div className="mt-3 flex flex-wrap gap-2">
               {s.features.map(f => (
                 <span key={f} className="text-[10px] text-white/50 flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-white/10 grid place-items-center">•</span> {f}</span>
               ))}
             </div>
             <div className={`mt-5 h-[185px] rounded-[12px] ${s.inner} border border-white/5 flex items-center justify-center text-white/20 text-[11px] group-hover:border-white/20 transition`}>
               {s.title} {s.highlight} Visual
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