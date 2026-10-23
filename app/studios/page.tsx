"use client";
import Link from 'next/link'
import HeaderHome from "@/components/home/HeaderHome"
import FooterHome from "@/components/home/FooterHome"

const studios = [
  {
    slug: "photo-studio",
    title: "Photo Studio",
    highlight: "Studio",
    color: "#8B5CF6",
    desc: "Turn your photos into stunning visuals with powerful editing tools, filters and effects.",
    features: [
      { icon: "◫", label: "Edit" },
      { icon: "✦", label: "Enhance" },
      { icon: "◎", label: "Filter" },
      { icon: "⤢", label: "Transform" },
    ],
    gradient: "from-[#1E1B4B] via-[#1E1B3A] to-[#0F0A2A]",
  },
  {
    slug: "vector-studio",
    title: "Vector Studio",
    highlight: "Studio",
    color: "#10B981",
    desc: "Create crisp, scalable vector graphics for logos, icons, illustrations and more.",
    features: [
      { icon: "◐", label: "Logos" },
      { icon: "★", label: "Icons" },
      { icon: "▭", label: "Illustrations" },
      { icon: "⤢", label: "Scalable" },
    ],
    gradient: "from-[#022C22] via-[#0A2E1E] to-[#0B3320]",
  },
  {
    slug: "3d-studio",
    title: "3D Studio",
    highlight: "Studio",
    color: "#3B82F6",
    desc: "Bring your ideas to life with stunning 3D models, characters and scenes.",
    features: [
      { icon: "⬢", label: "3D Models" },
      { icon: "◍", label: "Characters" },
      { icon: "⛰", label: "Scenes" },
      { icon: "◆", label: "High Quality" },
    ],
    gradient: "from-[#0C1A3A] via-[#0F1D40] to-[#101A35]",
  },
  {
    slug: "motion-studio",
    title: "Motion Studio",
    highlight: "Studio",
    color: "#F97316",
    desc: "Create dynamic videos and animations that bring your stories to life.",
    features: [
      { icon: "▶", label: "Animation" },
      { icon: "⇄", label: "Transitions" },
      { icon: "✦", label: "Effects" },
      { icon: "⤓", label: "Export" },
    ],
    gradient: "from-[#2A1205] via-[#1A0F05] to-[#1A1205]",
  },
  {
    slug: "mockup-studio",
    title: "Mockup Studio",
    highlight: "Studio",
    color: "#A855F7",
    desc: "Showcase your designs in realistic mockups and professional scenes.",
    features: [
      { icon: "◫", label: "Devices" },
      { icon: "⧉", label: "Packaging" },
      { icon: "T", label: "Apparel" },
      { icon: "◑", label: "Branding" },
    ],
    gradient: "from-[#1A1030] via-[#1E1435] to-[#19102E]",
  },
  {
    slug: "template-maker",
    title: "Template Maker",
    highlight: "Maker",
    color: "#3B82F6",
    desc: "Design beautiful layouts and ready-to-use templates in minutes.",
    features: [
      { icon: "◫", label: "Social Media" },
      { icon: "▭", label: "Presentations" },
      { icon: "▭", label: "Posters" },
      { icon: "▭", label: "Documents" },
    ],
    gradient: "from-[#0A122A] via-[#0F1A30] to-[#0C1530]",
  },
];

export default function StudiosPage(){
 return (
  <div className="min-h-screen bg-[#080716] text-white">
   <HeaderHome />
   <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
     <div className="grid grid-cols-1 md:grid-cols-3 border-white/10 rounded-[20px] overflow-hidden">
       {studios.map((s) => (
         <Link key={s.slug} href={`/studios/${s.slug}`} className={`relative p-7 bg-gradient-to-br ${s.gradient} border-b md:border-b border-r border-white/10 hover:brightness-110 transition group`}>
           <div className="flex items-center gap-2">
             <h2 className="text-[28px] font-black leading-none tracking-tight">
               {s.title.split(' ')[0]} <span style={{color: s.color}}>{s.highlight}</span>
             </h2>
           </div>
           <p className="mt-2 text-[12px] leading-[1.5] text-white/70 line-clamp-2">{s.desc}</p>
           
           <div className="mt-4 flex flex-wrap gap-3">
             {s.features.map(f => (
               <span key={f.label} className="text-[11px] text-white/80 flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[10px]">{f.icon}</span> {f.label}</span>
             ))}
           </div>

           {/* Visual Placeholder — replace with your Image */}
           <div className="mt-6 h-[220px] rounded-[14px] bg-black/30 border border-white/5 flex items-center justify-center text-white/20 text-[12px]">
             {s.title} Visual
           </div>
         </Link>
       ))}
     </div>
   </div>
   <FooterHome />
  </div>
 )
}