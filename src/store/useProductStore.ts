import { create } from "zustand"
import { Product } from "../types/products"
import axios from "axios"

const LIMIT = 8

type ProductState = {
    products: Product[]
    page: number
    loading: boolean
    error: string | null
    hasMore: boolean
    fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    page: 1,
    loading: false,
    error: null,
    hasMore: true,
  
    fetchProducts: async () => {
        const { loading, hasMore, page, products } = get()

        if (loading || !hasMore) return

        set({ loading: true })

        try {
            const offset = (page - 1) * LIMIT

            const res = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products', {
            params: {
                offset,
                limit: LIMIT,
            },
            })

            set({
                products: [...products, ...res.data],
                page: page + 1,
                hasMore: res.data.length === LIMIT,
            })
        } catch (err) {
            set({error: `Failed to fetch products : ${err}`})
        } finally {
            set({ loading: false })
        }
    },
  }))