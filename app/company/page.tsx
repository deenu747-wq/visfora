import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import FooterHome from '@/components/home/FooterHome'

const team = [
  { initials: 'AS', name: 'Aarav Sharma', role: 'CEO & Co-founder' },
]
export default function CompanyPage(){
  return(
    <div className="min-h-screen bg-[#F9F6F0] text-[#111827]">
      <HeaderHome/>
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold">Company</h1>
        <p className="mt-4">Visfora team building the future of sourcing.</p>
      </main>
      <FooterHome/>
    </div>
  )
}
