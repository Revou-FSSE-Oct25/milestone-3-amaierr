'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { logoutAction } from "../login/actions";
import { getSession } from "@/lib/auth";
import { ListPlus, ShoppingCart, User } from "lucide-react";

type HeaderProps = {
  isLoggedIn: boolean
};

function Header({isLoggedIn}: HeaderProps) {
  const router = useRouter()
  
  const [isPending, startTransition] = useTransition();

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
          <Link href={'/products'} className="text-2xl font-bold sm:text-3xl">RevoShop</Link>
          
          {/* navigation */}
          <nav className="flex gap-8">
            <Link href={'/products'} className="text-lg font-bold sm:text-xl">Products</Link>
            <Link href={'/FAQ'} className="text-lg font-bold sm:text-xl">FAQ</Link>
          </nav>

          {/* icon & login/logout */}
          <div className="flex gap-3 items-center">
            {/* add product icon */}
            <Link href={'/add-product'}>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg hover:bg-zinc-600">
                  <ListPlus size={21}/>
              </div>
            </Link>

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

            {/* login/logout */}
            {isLoggedIn && (
              <button
                onClick={() => startTransition(() => logoutAction())}
                disabled={isPending}
                className="rounded bg-red-600 p-4 py-2 mr-5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
              >
                {isPending ? 'Logging out...' : 'Logout'}
              </button>
            ) || (
              <Link
                href="/login"
                className="rounded font-bold bg-gray-600 px-4 py-2 mr-5 text-sm text-white hover:bg-gray-400"
              >
                Login
              </Link>
            )}

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