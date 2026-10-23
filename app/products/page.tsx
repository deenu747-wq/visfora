"use client";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF7] p-6">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-2xl font-bold">All Products</h1>
        <p className="text-sm mt-2">Browse your generated products</p>
        <div className="mt-6">
          <Link href="/product?prompt=football" className="underline">
            Go to Product Result
          </Link>
        </div>
      </div>
    </div>
  );
}