'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "../login/actions";

type HeaderProps = {
  showBack?: boolean
  prevPage?: string
};

function Header({
  showBack = false,
}: HeaderProps) {
  const router = useRouter()
  
  const [isPending, startTransition] = useTransition();

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
      <button
        onClick={() => startTransition(() => logoutAction())}
        disabled={isPending}
        className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
      >
        {isPending ? 'Logging out...' : 'Logout'}
      </button>
    </header>
  );
}

export default Header