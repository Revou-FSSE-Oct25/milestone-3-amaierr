'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";

function Header() {
  const router = useRouter()
  

  return (
    <header className="mb-6 flex items-center gap-4 py-4 border-b-2">
      <button 
        type="button" 
        onClick={() => router.back()}
        className="rounded-md border font-bold bg-gray-400 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-300"  
      >
        Back
      </button>
      
      <div className="p-6 w-full mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex min-w-1/2 justify-between items-center">
            <Link href={'/products'} className="text-2xl font-bold sm:text-3xl">RevoShop</Link>
            
            {/* navigation */}
            <nav className="flex gap-8">
              <Link href={'/products'} className="text-lg font-bold sm:text-xl">Products</Link>
              <Link href={'/FAQ'} className="text-lg font-bold sm:text-xl">FAQ</Link>
            </nav>
          </div>

          {/* icon & login/logout */}
          <div className="flex gap-3 items-center">
            {/* shopping cart icon */}
            <Link href={'/cart'}>
              <div className="relative inline-flex">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg hover:bg-zinc-600">
                    <ShoppingCart size={21}/>
                </div>

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
            </Link>

            <Link href={'/profile'}>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg hover:bg-zinc-600">
                  <User size={21}/>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Header