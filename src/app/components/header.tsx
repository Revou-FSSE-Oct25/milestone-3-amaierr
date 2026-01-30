'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string
  showBack?: boolean
  prevPage?: string
};

function Header({
  title,
  showBack = false,
}: HeaderProps) {
  const router = useRouter()

  return (
    <header className="mb-6 flex items-center gap-4 py-4 border-b-2">
      {showBack && (
        <button 
          type="button" 
          onClick={() => router.back()}
          className="rounded-md border font-bold border-gray-200 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-50"  
        >
          Back
        </button>
      )}{}
      <nav className="p-6 w-full mx-auto">
        <div className="flex justify-between">
          <Link href={'/products'} className="text-2xl font-bold sm:text-3xl">RevoShop</Link>
          <div className="content-center">
            <Link href={'/FAQ'} className="text-lg font-bold sm:text-xl">FAQ</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header