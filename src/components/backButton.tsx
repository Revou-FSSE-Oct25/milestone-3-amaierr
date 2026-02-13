'use client'

import { useRouter } from "next/navigation"

function BackButton(){
    const router = useRouter()

    return <>
        <button 
            type="button" 
            onClick={() => router.back()}
            className="rounded-md border font-bold bg-gray-400 px-3 py-1 ml-5 text-sm text-gray-700 hover:bg-gray-300"  
        >
        Back
      </button>
    </>
}

export default BackButton