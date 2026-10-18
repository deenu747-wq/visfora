import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import FooterHome from '@/components/home/FooterHome'

export default function ProductPage(){
  return(
    <div className="min-h-screen bg-[#F9F6F0] text-[#111827]">
      <HeaderHome/>
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold">Product</h1>
        <p className="mt-4">Explore Visfora AI sourcing platform.</p>
        <Link href="/" className="mt-6 inline-block underline">Back to home</Link>
      </main>
      <FooterHome/>
    </div>
  )
}
