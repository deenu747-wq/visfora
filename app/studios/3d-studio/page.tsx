"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function HelmetModel() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
        <meshStandardMaterial color="#7ee8ff" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -0.3, 0.5]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.1, 0.6, 0.7]} />
        <meshStandardMaterial color="#3dd6ff" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Page() {
  const [tab, setTab] = useState("Studio");
  const toast = (m: string) => alert(m);

  return (
    <div className="min-h-screen bg-[#2a2a32] p-3 text-white flex flex-col gap-3">
      {/* TOP NAV - LOGO DOUBLE + CLICKABLE + STUDIO NAME ON RIGHT */}
      <div className="flex items-center justify-between bg-[#1e1e28] rounded-xl px-5 py-2.5 border border-white/5">
        <Link href="/" className="flex items-center cursor-pointer hover:opacity-80">
          <Image src="/Logo.png" alt="VF" width={128} height={128} className="h-[88px] w-auto object-contain" priority />
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[13px]">
            {["Project","Studio","Assets","Scene","Render","Settings"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`pb-1 border-b-2 cursor-pointer ${tab===t ? "text-white border-[#7ee8ff]" : "text-white/50 border-transparent hover:text-white"}`}>{t}</button>
            ))}
          </div>
          <div className="h-5 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-1 font-bold text-[18px]">
            <span className="text-[#ffbe0b]">3D</span><span className="text-white/80 ml-1">Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>toast("Profile")} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">U</button>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">🔔</button>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">⚙️</button>
          </div>
        </div>
      </div>

      {/* GENERATION MODE */}
      <div className="flex items-center gap-3 bg-[#1e1e28] rounded-xl px-4 py-2.5 border border-white/5">
        <span className="text-[12px] text-white/50">Generation Mode:</span>
        <button className="px-3 py-1.5 rounded-lg border border-[#7ee8ff] text-[#7ee8ff] text-[12px] cursor-pointer">Text to 3D Prompt ▾</button>
        <input placeholder="Describe your 3D model e.g. minimal low poly fox, neon cyan wireframe" className="flex-1 bg-[#2a2a35] border border-white/10 rounded-lg px-4 py-2 text-[12px] outline-none" />
        <button onClick={()=>toast("Generate")} className="bg-[#7ee8ff] text-black px-5 py-2 rounded-lg text-[12px] font-bold cursor-pointer">⚡ Generate</button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-[200px_1fr_240px] gap-3 flex-1">
        {/* LEFT */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 px-2 py-1 bg-white/10 rounded w-fit mb-3">GENERATE</div>
            {["Image to 3D","Multi-Image","Text to 3D","Remesh","Rig","Animate"].map(t=>(
              <button key={t} onClick={()=>toast(t)} className={`w-full text-left rounded-lg px-3 py-2.5 text-[12px] mb-2 cursor-pointer ${t==="Image to 3D" ? "bg-[#7ee8ff] text-black font-bold" : "bg-[#2a2a35] border border-white/10 text-white/60 hover:text-white"}`}>{t}</button>
            ))}
          </div>
          <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-white/40 px-2 py-1 bg-white/10 rounded w-fit mb-2">UPLOAD</div>
            <div className="w-full border border-dashed border-white/20 rounded-xl p-6 text-center text-[11px] text-white/60">Drag & drop image here<br/><span className="text-white/30">PNG, JPG</span></div>
            <button onClick={()=>toast("Upload")} className="mt-3 w-full border border-[#7ee8ff]/50 rounded-lg py-2 text-[11px] cursor-pointer hover:bg-white/5">Upload Image</button>
          </div>
        </div>

        {/* CENTER - 1:1 SQUARE VIEWER - 600x600 */}
        <div className="flex justify-center items-start">
          <div className="bg-[#1e1e28] rounded-xl border border-white/5 overflow-hidden w-[600px] h-[600px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 shrink-0">
              <span className="font-bold text-[13px]">3D Model Viewer</span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-[#7ee8ff]">Three.js • Orbit Controls</span>
                <button className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer">Reset View</button>
                <button className="bg-[#2a2a35] border border-white/10 px-2 py-1 rounded cursor-pointer">Fullscreen</button>
              </div>
            </div>
            {/* 600x600 SQUARE */}
            <div className="flex-1 w-[600px] h-[520px] bg-[#0f0f14] relative">
              <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 2]} intensity={1.2} />
                <directionalLight position={[-2, -1, -1]} intensity={0.4} />
                <HelmetModel />
                <OrbitControls enablePan={false} minDistance={1.2} maxDistance={4} autoRotate autoRotateSpeed={1} />
                <gridHelper args={[10, 10, "#1a1a1a", "#111"]} position={[0, -1.2, 0]} />
              </Canvas>
              <div className="absolute bottom-2 left-3 text-[10px] text-white/30">Drag to orbit • Scroll to zoom • 600x600 • 1:1</div>
              <div className="absolute bottom-2 right-3 text-[10px] text-[#7ee8ff]">● Live Helmet</div>
            </div>
            <div className="text-[10px] text-center py-2 bg-black/30 text-white/40 shrink-0">Model: helmet_v02 • 12.4k polys • 1 material • Ready • Loaded in 1.2s</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5 h-fit">
          <div className="text-[10px] text-white/40 px-2 py-1 bg-white/10 rounded w-fit mb-3">EXPORT & VIEW</div>
          <div className="grid grid-cols-2 gap-2">
            {[".GLB",".OBJ",".FBX",".STL",".USDZ",".BLEND"].map(f=>(
              <button key={f} onClick={()=>toast(f)} className="bg-[#2a2a35] border border-white/10 rounded-lg px-3 py-2 text-[11px] cursor-pointer hover:border-[#7ee8ff]/50">↓ {f}</button>
            ))}
          </div>
          <button onClick={()=>toast("AR")} className="w-full mt-3 bg-[#7ee8ff] text-black rounded-lg py-2.5 text-[12px] font-bold cursor-pointer">Launch AR View</button>
          <div className="mt-4">
            <div className="text-[10px] text-white/40 mb-2">EXPORT OPTIONS</div>
            <div className="flex gap-2 mb-2">
              <button className="text-[10px] px-2 py-1 rounded-full bg-[#7ee8ff]/20 text-[#7ee8ff] border border-[#7ee8ff]/30">✓ Include Textures</button>
              <button className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/50">Compressed</button>
            </div>
            <button className="w-full bg-[#2a2a35] border border-white/10 rounded-lg py-2 text-[11px] cursor-pointer">↓ Export All Formats</button>
          </div>
        </div>
      </div>

      {/* BOTTOM - CHANGE 2 & 3: CENTERED + RIGHT SECTION REMOVED */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-[11px] text-white/50">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7ee8ff] animate-pulse"></span>AI generating 62%</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[500px]"><div className="h-full w-[62%] bg-[#7ee8ff] rounded-full"></div></div>
          <span>Estimated 16s remaining</span>
        </div>

        {/* BOTTOM CARDS - NOW CENTERED */}
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[700px]">
            <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
              <div className="text-[10px] text-white/40">RECENT</div>
              <div className="text-[12px] font-bold mt-1">12 Models Today</div>
              <button className="text-[11px] text-[#7ee8ff] mt-1 cursor-pointer">View all →</button>
            </div>
            <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
              <div className="text-[10px] text-white/40">QUEUE</div>
              <div className="text-[12px] font-bold mt-1">3 in progress</div>
              <div className="text-[10px] text-white/40 mt-1">Avg 22s</div>
            </div>
            <div className="bg-[#1e1e28] rounded-xl p-3 border border-white/5">
              <div className="text-[10px] text-white/40">CREDITS</div>
              <div className="text-[12px] font-bold mt-1">187 remaining</div>
              <button className="text-[11px] text-[#ffbe0b] mt-1 cursor-pointer">Buy more →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}