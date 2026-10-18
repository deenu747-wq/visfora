import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import FooterHome from '@/components/home/FooterHome'

export default function ResourcesPage(){
  return(
    <div className="min-h-screen bg-[#F9F6F0] text-[#111827]">
      <HeaderHome/>
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold">Resources</h1>
        <p className="mt-4">Guides, case studies and sourcing insights.</p>
        <Link href="/" className="mt-6 inline-block underline">Back to home</Link>
      </main>
      <FooterHome/>
    </div>
  )
}
