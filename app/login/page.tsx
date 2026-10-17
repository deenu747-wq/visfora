import Link from 'next/link'
import HeaderHome from '@/components/home/HeaderHome'
import Footer from '@/components/Footer'

export default function LoginPage(){
 return (
  <div className="min-h-screen bg-[#FFFCF7] text-black">
   <HeaderHome/>
   <section className="max-w-[420px] mx-auto px-6 pt-16 pb-20">
    <div className="bg-white rounded-[20px] border border-black/5 p-8 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
     <h1 className="font-bold text-[24px] text-center">Welcome back</h1>
     <p className="mt-1 text-[12px] text-black/50 text-center">Login to your VISFORA account</p>
     
     <div className="mt-6 space-y-3">
      <input placeholder="Email address" className="w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-[#FFFCF7] outline-none focus:border-[#C89B3C]" />
      <input placeholder="Password" type="password" className="w-full rounded-full border border-black/10 px-4 py-2.5 text-[13px] bg-[#FFFCF7] outline-none focus:border-[#C89B3C]" />
      <button className="w-full bg-[#C89B3C] hover:bg-[#b48a35] text-white rounded-full py-2.5 text-[13px] font-medium transition">Login</button>
     </div>

     <div className="mt-4 text-center text-[11px] text-black/40">or</div>
     <button className="mt-3 w-full border border-black/10 rounded-full py-2.5 text-[13px] font-medium hover:bg-[#FFFCF7] transition">Continue with Google</button>
     
     <div className="mt-6 text-center text-[11px] text-black/50">
      Don&apos;t have an account? <Link href="/get-started" className="text-[#C89B3C] hover:underline font-medium">Get Started</Link>
     </div>
    </div>
   </section>
   <Footer/>
  </div>
 )
}