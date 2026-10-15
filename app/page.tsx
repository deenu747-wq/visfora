import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b">
        <div className="flex items-center gap-3">
          <Image src="/Logo.png" alt="Visfora" width={40} height={40} />
          <span className="text-xl font-black tracking-tight">VISFORA</span>
        </div>
        <nav className="text-sm opacity-60">AI Visual Platform</nav>
      </header>

      {/* Hero */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-black leading-tight">
          Create Visuals<br/>That Convert.
        </h1>
        <p className="mt-6 text-lg opacity-70">
          Visfora helps brands generate high-converting ad creatives, product shoots & social content in seconds.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-8 py-3 bg-black text-white rounded-full font-semibold">
            Start Creating
          </button>
          <button className="px-8 py-3 border rounded-full font-semibold">
            View Demo
          </button>
        </div>
      </section>

      <footer className="text-center py-10 text-xs opacity-40 border-t">
        © 2026 VISFORA. All rights reserved.
      </footer>
    </main>
  );
}