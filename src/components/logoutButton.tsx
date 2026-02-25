'use client';

import { logoutAction } from "@/app/login/actions";
import { useTransition } from "react";

function LogoutButton(){
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
          await logoutAction();
        });
      };

    return <>
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="mt-8 w-full rounded-xl bg-red-600/90 hover:bg-red-600 transition py-3 font-semibold text-white shadow-lg shadow-red-600/20 active:scale-[0.98]"
        >
            {isPending ? 'Logging out...' : 'Logout'}
        </button>
    </>
}

export default LogoutButton