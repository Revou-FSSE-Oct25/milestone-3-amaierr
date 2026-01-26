import { Product } from "../types/products";

type Props = {
    product: Product
}

function Card({ product }: Props){
    return <>
        <div className="border rounded-lg p-6 m-4">
            <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
        </div>
    </>
}

export default Card;