import { Suspense } from 'react';
import BackButton from '@/components/backButton';
import { User, getSession } from '@/lib/auth';
import LogoutButton from '@/components/logoutButton';
import Loading from '@/components/loading';


export default function ProfilePage(){
  return (
    <Suspense fallback={<Loading/>}>
      <Profile/>
    </Suspense>
  )
}

async function Profile() {
  const session = await getSession()

  const user: User = {
    name: session?.name || "user",
    email: session?.email || "",
    role: session?.role || "",
    avatar: session?.avatar || ""
  }

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
              <LogoutButton/>
          </div>
        </div>
    </>
  );
}
