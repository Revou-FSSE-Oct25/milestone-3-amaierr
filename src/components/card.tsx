import Link from "next/link";
import { Product } from "../types/products";
import { Plus } from "lucide-react";

type Props = {
    product: Product
    titleStyle?: string
}

function Card({ product, titleStyle }: Props){

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
                <button
                    // TODO CONTEXT 9: Implement onClick to add item
                    // onClick={() => addItem({ id, name, price })}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-transform hover:scale-110 active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>
        </div>
    </>
}

export default Card;