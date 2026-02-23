import { Product } from "@/types/products"
import { create } from "zustand"

type CartItem = {
    product: Product
    quantity: number
}

type CartState = {
    items: CartItem[]
    totalQuantity: number
    totalPrice: number
    addItem: (newItem: CartItem) => void
    removeItem: (productId: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items:[], 
    totalQuantity: 0,
    totalPrice: 0,

    addItem: (newItem: CartItem) => {
        const { items, totalQuantity, totalPrice } = get()
        var addedPrice = 0

        const existingItem = items.find(item => item.product.id === newItem.product.id)
        if(existingItem) {
            items.map(
                (item) => {
                    if(item.product.id === newItem.product.id) {
                        item.quantity += newItem.quantity
                        addedPrice += newItem.product.price * newItem.quantity
                    }
                }
            )

            set({
                items: [...items],
                totalPrice: totalPrice + addedPrice,
                totalQuantity: totalQuantity + newItem.quantity
            })
        } else {
            set({
                items: [...items, {product: newItem.product, quantity: newItem.quantity}],
                totalPrice: totalPrice + (newItem.product.price * newItem.quantity),
                totalQuantity: totalQuantity + newItem.quantity
            })
        }
    },

    removeItem: async (productId: number) => {
        const { items, totalQuantity, totalPrice } = get()
        const deletedProduct = items.find(item => item.product.id === productId)

        const deletedProductQuantity = deletedProduct?.quantity || 0
        const deletedProductPrice = deletedProduct?.product.price || 0

        const newItems =  items.filter(item => item.product.id !== productId)
        set({
            items: newItems,
            totalQuantity: totalQuantity - deletedProductQuantity,
            totalPrice: totalPrice - (deletedProductPrice * deletedProductQuantity)
        })
    }
})) 