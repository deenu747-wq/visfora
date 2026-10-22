import Link from 'next/link';
export default function Studio(){
  return <div className="p-10 text-white"><h1 className="text-3xl font-bold">Motion Studio</h1><p className="text-white/60 mt-2">Studio coming soon - will connect to Global Assets</p><Link href="/assets" className="mt-4 inline-block px-4 py-2 bg-white text-black rounded-full">Browse Assets Marketplace</Link></div>
}
