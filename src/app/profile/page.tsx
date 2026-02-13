'use client';

import { Suspense, useTransition } from 'react';
import { logoutAction } from '../login/actions';
import { useSearchParams } from 'next/navigation';
import BackButton from '@/components/backButton';

type User = {
  name: string | null;
  email: string | null;
  role: string | null;
  avatar: string | null;
};

export default function ProfilePage(){
  return (
    <Suspense>
      <Profile/>
    </Suspense>
  )
}

function Profile() {

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams()

  const user: User = {
    name: searchParams.get("name"),
    email: searchParams.get("email"),
    role: searchParams.get("role"),
    avatar: searchParams.get("avatar")
  }

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <>
        <div className="mb-6 flex items-center gap-4 py-4">
            <BackButton/>
        </div>
        
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6 py-12 text-zinc-200">
        <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            
            {/* Avatar */}
            <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-800 shadow-lg">
                <img
                src={user.avatar || '/avatar.png'}
                alt="User Avatar"
                className="object-cover"
                />
            </div>

            {/* Name */}
            <h1 className="mt-6 text-2xl font-semibold text-white">
                {user.name}
            </h1>

            {/* Role Badge */}
            <span className="mt-2 px-4 py-1 text-xs font-medium rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                {user.role}
            </span>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-zinc-800" />

            {/* Info Section */}
            <div className="space-y-6">
            <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="text-base text-zinc-200 break-all">
                {user.email}
                </p>
            </div>
            </div>

            {/* Logout */}
            <button
            onClick={handleLogout}
            disabled={isPending}
            className="mt-8 w-full rounded-xl bg-red-600/90 hover:bg-red-600 transition py-3 font-semibold text-white shadow-lg shadow-red-600/20 active:scale-[0.98]"
            >
            {isPending ? 'Logging out...' : 'Logout'}
            </button>
        </div>
        </div>
    </>
  );
}
