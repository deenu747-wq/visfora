"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";

function HelmetCyan() {
  return (
    <group position={[0, 0.3, 0]} rotation={[0.15, -0.4, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.6} wireframe transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.15, 0.4]} scale={[0.92, 0.88, 0.55]}>
        <sphereGeometry args={[0.85, 28, 28]} />
        <meshStandardMaterial color="#06b6d4" emissive="#22d3ee" emissiveIntensity={0.8} wireframe opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, -0.75, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.78, 0.18, 12, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0e7490" emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh position={[-0.96, -0.15, 0]}><cylinderGeometry args={[0.14, 0.14, 0.32, 16]} /><meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.4} wireframe /></mesh>
      <mesh position={[0.96, -0.15, 0]}><cylinderGeometry args={[0.14, 0.14, 0.32, 16]} /><meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.4} wireframe /></mesh>
    </group>
  );
}

export default function Page() {
  const [tab, setTab] = useState("Studio");
  const [activeGen, setActiveGen] = useState("Image to 3D");
  const [genMode, setGenMode] = useState("Text to 3D Prompt");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(62);
  const [includeTex, setIncludeTex] = useState(true);
  const [compressed, setCompressed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const handleGenerate = () => {
    setGenerating(0);
    const id = setInterval(() => {
      setGenerating(p => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + Math.random()*15;
      });
    }, 600);
  };
  const handleDownload = (f: string) => alert(`Downloading helmet_v02${f.toLowerCase()}`);
  const resetView = () => controlsRef.current?.reset();
  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) viewerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  return (
    <div className="min-h-screen bg-[#3b3b4a] p-3 text-white flex flex-col gap-3">
      {/* HEADER - LOGO DOUBLE SIZE, TABS LEFT + BIGGER, 3D STUDIO BIGGER */}
      <div className="flex justify-between items-center bg-[#1e1e26] rounded-xl px-6 py-3 border border-white/5">
        <div className="flex items-center gap-10">
          {/* 1. LOGO DOUBLE SIZE */}
          <Link href="/" className="cursor-pointer">
            <Image src="/Logo.png" alt="VF" width={128} height={64} className="h-16 w-auto" priority />
          </Link>
          {/* 2. TABS MOVED TO LEFT SIDE + INCREASED SIZE */}
          <div className="flex gap-8 text-[16px] font-medium">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`pb-1 border-b-2 cursor-pointer transition-all ${tab===t ? "border-[#7ee8ff] text-white font-bold" : "border-transparent text-white/50 hover:text-white"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 3. 3D STUDIO BIGGER */}
          <div className="font-bold text-[24px] tracking-wide"><span className="text-[#4fb0d6]">3D</span><span className="text-white ml-1 font-normal">Studio</span></div>
          <button onClick={()=>alert("Profile")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[13px] cursor-pointer hover:bg-white/20">U</button>
          <button onClick={()=>alert("Notifications")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">🔔</button>
          <button onClick={()=>alert("Settings")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">⚙️</button>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-[#1e1e26] rounded-xl px-5 py-3 border border-white/5">
        <span className="text-[13px] text-white/50">Generation Mode:</span>
        <select value={genMode} onChange={(e)=>setGenMode(e.target.value)} className="bg-[#1e1e26] border border-[#7ee8ff] text-[#7ee8ff] text-[13px] rounded-lg px-3 py-2 cursor-pointer outline-none">
          <option>Text to 3D Prompt</option>
          <option>Image to 3D</option>
          <option>Multi-Image to 3D</option>
        </select>
        <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] outline-none" />
        <button onClick={handleGenerate} className="bg-[#7ee8ff] text-black px-5 py-2.5 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-[#6dd0e8] active:scale-95">⚡ Generate</button>
      </div>

      <div className="grid grid-cols-[200px_1fr_280px] gap-3">
        <div className="flex flex-col gap-3">
          <div className="bg-[#1e1e26] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">GENERATE</div>
            {[
              {l:"Image to 3D", i:"🖼️"},
              {l:"Multi-Image", i:"◫"},
              {l:"Text to 3D", i:"☰"},
              {l:"Remesh", i:"⬡"},
              {l:"Rig", i:"🧍"},
              {l:"Animate", i:"🏃"},
            ].map(o=>(
              <button key={o.l} onClick={()=>setActiveGen(o.l)} className={`w-full text-left rounded-lg px-3 py-3 text-[13px] mb-2 flex gap-2 cursor-pointer transition ${activeGen===o.l ? "bg-[#7ee8ff] text-black font-bold" : "bg-[#2a2a35] border border-white/10 text-white/60 hover:text-white"}`}>{o.i} {o.l}</button>
            ))}
          </div>
          <div className="bg-[#1e1e26] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">UPLOAD</div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e)=>alert(`Selected: ${e.target.files?.[0]?.name}`)} />
            <div onClick={()=>fileRef.current?.click()} className="border border-dashed border-white/20 rounded-xl p-5 text-center bg-[#12121a] cursor-pointer hover:border-[#7ee8ff]/50">
              <div className="text-[#7ee8ff] text-[22px]">☁️</div>
              <div className="text-[12px] font-bold">Drag & drop image here</div>
              <div className="text-[10px] text-white/40 mt-1">or click to browse • PNG, JPG</div>
            </div>
            <button onClick={()=>fileRef.current?.click()} className="mt-3 w-full border border-white/20 rounded-lg py-2 text-[11px] cursor-pointer hover:bg-white/10">Upload Image</button>
          </div>
        </div>

        <div ref={viewerRef} className="bg-[#1e1e26] rounded-xl border border-white/5 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center px-5 py-3 border-b border-white/5">
            <span className="font-bold text-[15px]">3D Model Viewer</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#7ee8ff]">⬡ Three.js • Orbit Controls</span>
              <button onClick={resetView} className="bg-[#2a2a35] border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:border-white/30">↻ Reset View</button>
              <button onClick={toggleFullscreen} className="bg-[#2a2a35] border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:border-white/30">Fullscreen</button>
            </div>
          </div>
          <div className="bg-[#0a0a14] h-[540px] relative">
            <Canvas camera={{ position: [0, 0.4, 2.3], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[3, 3, 3]} intensity={1.2} color="#22d3ee" />
              <pointLight position={[0, 2, 2]} intensity={1.5} color="#06b6d4" />
              <HelmetCyan />
              <Grid position={[0, -0.9, 0]} args={[30, 30]} cellSize={0.6} sectionSize={3} cellThickness={0.4} sectionThickness={0.8} fadeDistance={12} fadeStrength={1} infiniteGrid cellColor="#0e2a36" sectionColor="#164e63" />
              <OrbitControls ref={controlsRef} enablePan={false} autoRotate autoRotateSpeed={0.7} minDistance={1.2} maxDistance={4} />
            </Canvas>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-1.5 rounded-full text-[11px] border border-cyan-500/20 text-cyan-300">
              Model: {activeGen} • 12.4k polygons • cyan shining
            </div>
          </div>
          <div className="bg-[#15151c] border-t border-white/5 py-2.5 text-center text-[12px] text-[#7ec8a0]">{generating < 100 ? `⏳ Generating ${Math.round(generating)}%` : "● Ready • Loaded in 1.2s"}</div>
        </div>

        <div className="bg-[#1e1e26] rounded-xl p-4 border border-white/5 flex flex-col gap-4">
          <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1">EXPORT & VIEW</div>
          <div className="text-[12px] font-bold">DOWNLOAD FORMATS</div>
          <div className="grid grid-cols-2 gap-2">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} onClick={()=>handleDownload(f)} className="bg-[#12121a] border border-white/15 rounded-lg py-2.5 text-[12px] flex items-center justify-center gap-1 cursor-pointer hover:border-[#22d3ee] hover:text-[#22d3ee]">↓ {f}</button>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">AR VIEW</div>
            <button onClick={()=>alert("Opening AR View...")} className="w-full bg-[#22d3ee] text-black rounded-lg py-3 text-[13px] font-bold cursor-pointer hover:bg-[#06b6d4]">👓 Launch AR View</button>
            <div className="text-[11px] text-white/40 mt-2">View in augmented reality on mobile</div>
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="text-[12px] font-bold mb-3">EXPORT OPTIONS</div>
            <div className="flex gap-2">
              <button onClick={()=>setIncludeTex(!includeTex)} className={`text-[11px] px-3 py-1.5 rounded-full cursor-pointer border ${includeTex ? "bg-[#22d3ee] text-black border-[#22d3ee]" : "bg-[#2a2a35] border-white/10 text-white/60"}`}>{includeTex ? "☑" : "☐"} Include Textures</button>
              <button onClick={()=>setCompressed(!compressed)} className={`text-[11px] px-3 py-1.5 rounded-full cursor-pointer border ${compressed ? "bg-[#22d3ee] text-black border-[#22d3ee]" : "bg-[#2a2a35] border-white/10 text-white/60"}`}>{compressed ? "☑" : "☐"} Compressed</button>
            </div>
            <button onClick={()=>alert("Exporting All")} className="w-full mt-3 bg-[#12121a] border border-white/15 rounded-lg py-2.5 text-[12px] flex justify-center gap-2 cursor-pointer hover:border-white/30">↓ Export All Formats</button>
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e26] rounded-xl px-5 py-3 border border-white/5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-3">
          <button onClick={handleGenerate} className="text-[#22d3ee] flex items-center gap-2 cursor-pointer"><span className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full animate-pulse"></span> AI generating {Math.round(generating)}%</button>
          <div className="w-[200px] h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#22d3ee]" style={{width: `${generating}%`}}></div></div>
          <span className="text-white/60">Estimated {Math.max(0, 18 - Math.round(generating/6))}s remaining</span>
        </div>
        <div className="flex items-center gap-6 text-white/50 border-l border-white/10 pl-6">
          <span>Completed today <b className="text-white">14</b></span>
          <span>Avg processing <b className="text-white">22s</b></span>
          <span>💳 Credits remaining <b className="text-white">187</b></span>
        </div>
      </div>
    </div>
  );
}