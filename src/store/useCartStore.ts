import { Product } from "@/types/products"
import { create } from "zustand"

type CartItem = {
    product: Product
    quantity: number
}

type CartState = {
    items: CartItem[]
    addItem: (newItem: CartItem) => void
    removeItem: (productId: number) => void
    total: number
}

export const useCartStore = create<CartState>((set, get) => ({
    items:[], 
    total: 0,

    addItem: (newItem: CartItem) => {
        const { items, total } = get()

        const existingItem = items.find(item => item.product.id === newItem.product.id)
        if(existingItem) {
            items.map(
                (item) => {item.product.id === newItem.product.id ? (item.quantity += newItem.quantity) : item.quantity}
            )
            set({
                items: [...items]
            })
        } else {
            set({
                items: [...items, {product: newItem.product, quantity: newItem.quantity}]
            })
        }
        
        set({
            total: total + newItem.quantity
        })
        
    },

    removeItem: async (productId: number) => {
        const { items, total } = get()

        const newItems =  items.filter(item => item.product.id !== productId)
        set({
            items: newItems,
            total: total - 1 //belom dikurangin quantity dari barang yang di delete
        })
    }
})) 