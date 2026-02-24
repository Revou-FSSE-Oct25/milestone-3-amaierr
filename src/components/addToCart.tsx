'use client'

import { useCartStore } from "@/store/useCartStore"
import { Product } from "@/types/products"
import Link from "next/link";
import { useState } from "react"

type AddToCartProps = {
    product: Product
};


function AddToCart({product}: AddToCartProps){
    const {
        addItem
    } = useCartStore()

    const [quantity, setQuantity] = useState(0)
    
    return <>
        <div className="flex items-center justify-between rounded-lg bg-gray-200 px-4 py-3 sm:w-40">
            <button
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="text-orange-500 font-bold text-xl"
            >
                −
            </button>

            <span className="font-semibold text-black">{quantity}</span>

            <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-orange-500 font-bold text-xl"
            >
                +
            </button>
        </div>

        <Link href={'/cart'} className="flex-1 flex items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-4 text-white font-semibold hover:bg-orange-600 transition">
            <button onClick={() => addItem({product: product, quantity: quantity})}>
                🛒 Add to cart
            </button>
        </Link>
    </>
}

export default AddToCart