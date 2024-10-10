import Link from 'next/link'


export default function Home() {
  return (
    <>
    <div className="flex items-center space-x-4 mb-10">
      <Link href="/sign-in" className="text-sm hover:underline">Sign In</Link>  
    </div>  
    </>
  );
}
