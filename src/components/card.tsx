'use client'

import { Product } from "../types/products";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MouseEvent, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useProductStore } from "@/store/useProductStore";

type Props = {
    product: Product
    titleStyle?: string
}

function Card({ product, titleStyle }: Props){

    const {
        addItem,
    } = useCartStore()

    const {
        clearProducts
    } = useProductStore()

    // useEffect(() => {
    //     console.log(items)
    //     console.log(total)
    // }, [total])

    function onClickAdd(e: MouseEvent<HTMLButtonElement | HTMLSpanElement>){
        e.preventDefault()
        e.stopPropagation()
        addItem({product, quantity: 1})
    }

    function onClickDelete (e: MouseEvent<HTMLButtonElement | HTMLSpanElement>) {
        e.preventDefault()
        e.stopPropagation()
        axios.delete(`https://api.escuelajs.co/api/v1/products/${product.id}`)
        clearProducts
    }
    return <>
        <div className="border rounded-lg p-6 m-4">
            <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 w-full object-cover rounded"
            />
            <h3 className={`mt-2 font-semibold ${titleStyle}`}>{product.title}</h3>
            <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-400">${product.price}</p>
                <div className="flex gap-2">
                    <button
                        onClick= {onClickAdd}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-transform hover:scale-110 active:scale-95"
                    >
                        <Plus className="h-5 w-5"/>
                    </button>

                    <Link
                        href={`/add-product/${product.id}`} 
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-transform hover:scale-110 active:scale-95"
                    >
                        <Pencil className="h-5 w-5"/>
                    </Link>
                    
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-transform hover:scale-110 active:scale-95"
                        onClick={onClickDelete}
                    >
                        <Trash2 className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default Card;