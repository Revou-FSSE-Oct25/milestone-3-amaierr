'use client'

import { useCartStore } from "@/store/useCartStore"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

function CartButton(){
    const {
        totalQuantity
      } = useCartStore()

    return <>
        <Link href={'/cart'}>
            <div className="relative inline-flex">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg hover:bg-zinc-600">
                <ShoppingCart size={21}/>
            </div>

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalQuantity}
            </span>
            </div>
        </Link>
    </>
}

export default CartButton