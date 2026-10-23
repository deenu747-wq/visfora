    "use client";
import Link from "next/link";

const products = [
  { id: 1, title: "Football Concept", prompt: "football", tag: "Sports" },
  { id: 2, title: "Cyberpunk Street", prompt: "cyberpunk city at night", tag: "Futuristic" },
  { id: 3, title: "Minimal Chair", prompt: "minimal chair product photo", tag: "Furniture" },
  { id: 4, title: "Sneaker Drop", prompt: "sneaker product shot", tag: "Fashion" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] text-black">
      <div className="max-w-[1200px] mx-auto p-6 md:p-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs tracking-widest opacity-50">VISFORA</p>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">All Products</h1>
          </div>
          <Link href="/" className="text-sm underline opacity-60">Back Home</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product?prompt=${encodeURIComponent(p.prompt)}`}
              className="group bg-white rounded-[32px] border border-black/5 p-5 hover:shadow-xl transition-all"
            >
              <div className="h-[200px] bg-[#F6F1E8] rounded-[20px] flex items-center justify-center text-black/20 text-sm">
                Preview: {p.title}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-black text-white px-2 py-1 rounded-full">{p.tag}</span>
                  <h3 className="font-bold mt-2">{p.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}