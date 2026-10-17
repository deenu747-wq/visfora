import Link from 'next/link';
export default function Page(){
 return <div className='p-20 text-center'><h1 className='text-2xl font-bold'>Log in</h1><Link href='/home' className='mt-6 inline-block bg-black text-white px-6 py-2 rounded-full'>Go to Home</Link></div>
}
