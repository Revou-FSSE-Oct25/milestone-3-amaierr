'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { logoutAction } from "../login/actions";
import { getSession } from "@/lib/auth";

type HeaderProps = {
  showBack?: boolean
  isLoggedIn: boolean
};

function Header({showBack = false, isLoggedIn}: HeaderProps) {
  const router = useRouter()
  
  const [isPending, startTransition] = useTransition();

  return (
    <header className="mb-6 flex items-center gap-4 py-4 border-b-2">
      {showBack && (
        <button 
          type="button" 
          onClick={() => router.back()}
          className="rounded-md border font-bold bg-gray-400 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-300"  
        >
          Back
        </button>
      )}
      
      <nav className="p-6 w-full mx-auto">
        <div className="flex justify-between">
          <Link href={'/products'} className="text-2xl font-bold sm:text-3xl">RevoShop</Link>
          <div className="content-center">
            <Link href={'/add-product'} className="text-lg font-bold sm:text-xl mx-4">Add Product</Link>
            <Link href={'/FAQ'} className="text-lg font-bold sm:text-xl mx-4">FAQ</Link>
          </div>
        </div>
      </nav>

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
    </header>
  );
}

export default Header