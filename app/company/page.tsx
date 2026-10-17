import Link from 'next/link';
export default function Page(){
 return <div className='p-20 text-center'><h1 className='text-3xl font-bold'>Company - Made in India</h1><p className='mt-3'>Built in Bengaluru</p><Link href='/home' className='mt-6 inline-block bg-black text-white px-6 py-2 rounded-full'>Back to Home</Link></div>
}
