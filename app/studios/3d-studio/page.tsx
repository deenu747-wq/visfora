"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";

function HelmetWireframe() {
  return (
    <group position={[0, 0.3, 0]} rotation={[0.15, -0.4, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        <meshStandardMaterial color="#c2c2ce" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.15, 0.4]} scale={[0.92, 0.88, 0.55]}>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial color="#a8a8b8" wireframe opacity={0.7} transparent />
      </mesh>
      <mesh position={[0, -0.75, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.78, 0.18, 10, 32]} />
        <meshStandardMaterial color="#999" wireframe />
      </mesh>
      <mesh position={[-0.96, -0.15, 0]}><cylinderGeometry args={[0.14, 0.14, 0.32, 12]} /><meshStandardMaterial color="#888" wireframe /></mesh>
      <mesh position={[0.96, -0.15, 0]}><cylinderGeometry args={[0.14, 0.14, 0.32, 12]} /><meshStandardMaterial color="#888" wireframe /></mesh>
    </group>
  );
}

export default function Page() {
  const [tab, setTab] = useState("Studio");

  return (
    <div className="min-h-screen bg-[#3b3b4a] p-3 text-white flex flex-col gap-3">
      {/* HEADER - LOGO SIZE/PLACEMENT KEPT AS YOUR CURRENT - NOT CHANGED */}
      <div className="flex justify-between items-center bg-[#1e1e26] rounded-xl px-5 py-2.5 border border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo.png" alt="VF" width={64} height={32} className="h-8 w-auto" priority />
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex gap-7 text-[13px]">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`pb-1 border-b-2 ${tab===t ? "border-[#7ee8ff] text-white" : "border-transparent text-white/50"}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-4">
            <div className="font-bold text-[16px]"><span className="text-[#4fb0d6]">3D</span><span className="text-white/70 ml-1 font-normal">Studio</span></div>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[12px]">U</div>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">🔔</div>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">⚙️</div>
          </div>
        </div>
      </div>

      {/* Generation Mode BAR */}
      <div className="flex items-center gap-3 bg-[#1e1e26] rounded-xl px-5 py-3 border border-white/5">
        <span className="text-[13px] text-white/50">Generation Mode:</span>
        <button className="border border-[#7ee8ff] text-[#7ee8ff] text-[13px] rounded-lg px-3 py-2 flex items-center gap-1">Text to 3D Prompt <span className="text-[10px]">▼</span></button>
        <input placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] outline-none placeholder:text-white/30" />
        <button className="bg-[#7ee8ff] text-black px-5 py-2.5 rounded-lg text-[13px] font-bold">⚡ Generate</button>
      </div>

      <div className="grid grid-cols-[200px_1fr_280px] gap-3">
        <div className="flex flex-col gap-3">
          <div className="bg-[#1e1e26] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">GENERATE</div>
            <button className="w-full text-left rounded-lg px-3 py-3 text-[13px] mb-2 bg-[#7ee8ff] text-black font-bold flex gap-2"><span>🖼️</span> Image to 3D</button>
            {[
              {l:"Multi-Image", i:"◫"},
              {l:"Text to 3D", i:"☰"},
              {l:"Remesh", i:"⬡"},
              {l:"Rig", i:"🧍"},
              {l:"Animate", i:"🏃"},
            ].map(o=>(
              <button key={o.l} className="w-full text-left rounded-lg px-3 py-3 text-[13px] mb-2 bg-[#2a2a35] border border-white/10 text-white/60 flex gap-2"><span>{o.i}</span> {o.l}</button>
            ))}
          </div>
          <div className="bg-[#1e1e26] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">UPLOAD</div>
            <div className="border border-dashed border-white/20 rounded-xl p-5 text-center bg-[#12121a]">
              <div className="text-[#7ee8ff] text-[22px]">☁️</div>
              <div className="text-[12px] font-bold">Drag & drop image here</div>
              <div className="text-[10px] text-white/40 mt-1">or click to browse • PNG, JPG</div>
            </div>
            <button className="mt-3 w-full border border-white/20 rounded-lg py-2 text-[11px]">Upload Image</button>
          </div>
        </div>

        {/* CENTER - REFERENCE HELMET + GRID */}
        <div className="bg-[#1e1e26] rounded-xl border border-white/5 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center px-5 py-3 border-b border-white/5">
            <span className="font-bold text-[15px]">3D Model Viewer</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#7ee8ff] flex gap-1">⬡ Three.js • Orbit Controls</span>
              <span className="bg-[#2a2a35] border border-white/10 px-3 py-1.5 rounded-lg">↻ Reset View</span>
              <span className="bg-[#2a2a35] border border-white/10 px-3 py-1.5 rounded-lg">Fullscreen</span>
              <span className="bg-[#2a2a35] border border-white/10 w-8 h-8 flex items-center justify-center rounded-lg">⛶</span>
            </div>
          </div>
          <div className="bg-[#10101a] h-[540px] relative">
            <Canvas camera={{ position: [0, 0.4, 2.3], fov: 50 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[3, 3, 3]} intensity={0.9} />
              <HelmetWireframe />
              <Grid position={[0, -0.9, 0]} args={[30, 30]} cellSize={0.6} sectionSize={3} cellThickness={0.4} sectionThickness={0.8} fadeDistance={12} fadeStrength={1} infiniteGrid cellColor="#1e1e2a" sectionColor="#2a2a3a" />
              <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.7} minDistance={1.2} maxDistance={4} />
            </Canvas>
            {/* Orbit icon like ref */}
            <div className="absolute bottom-20 right-[30%] w-16 h-16 border border-white/30 rounded-full flex items-center justify-center opacity-70">
              <span className="text-[20px]">🌐</span>
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-1.5 rounded-full text-[11px] border border-white/10">
              Model: helmet_v02 • 12.4k polygons • 1 material
            </div>
          </div>
          <div className="bg-[#15151c] border-t border-white/5 py-2.5 text-center text-[12px] text-[#7ec8a0]">• Ready • Loaded in 1.2s</div>
        </div>

        <div className="bg-[#1e1e26] rounded-xl p-4 border border-white/5 flex flex-col gap-4">
          <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1">EXPORT & VIEW</div>
          <div className="text-[12px] font-bold tracking-wider">DOWNLOAD FORMATS</div>
          <div className="grid grid-cols-2 gap-2">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} className="bg-[#12121a] border border-white/15 rounded-lg py-2.5 text-[12px] flex items-center justify-center gap-1">↓ {f}</button>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="text-[10px] text-white/40 bg-white/10 rounded w-fit px-2 py-1 mb-3">AR VIEW</div>
            <button className="w-full bg-[#7ee8ff] text-black rounded-lg py-3 text-[13px] font-bold">👓 Launch AR View</button>
            <div className="text-[11px] text-white/40 mt-2">View in augmented reality on mobile</div>
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="text-[12px] font-bold mb-3">EXPORT OPTIONS</div>
            <div className="flex gap-2">
              <span className="text-[11px] px-3 py-1.5 rounded-full bg-[#7ee8ff] text-black">☑ Include Textures</span>
              <span className="text-[11px] px-3 py-1.5 rounded-full bg-[#2a2a35] border border-white/10 text-white/60">Compressed</span>
            </div>
            <button className="w-full mt-3 bg-[#12121a] border border-white/15 rounded-lg py-2.5 text-[12px] flex justify-center gap-2">↓ Export All Formats</button>
          </div>
        </div>
      </div>

      {/* BOTTOM LONG BAR - LIKE REFERENCE */}
      <div className="bg-[#1e1e26] rounded-xl px-5 py-3 border border-white/5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-3">
          <span className="text-[#7ee8ff] flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7ee8ff] rounded-full"></span> AI generating 62%</span>
          <div className="w-[200px] h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[62%] bg-[#7ee8ff]"></div></div>
          <span className="text-white/60">Estimated 18s remaining</span>
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