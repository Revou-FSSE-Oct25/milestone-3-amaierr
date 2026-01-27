'use client'

import { useEffect, useState } from "react";
import { Product } from "../types/products";
import axios from "axios";
import Card from "../components/card";

const LIMIT = 10

function ProductPage(){
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    const fetchProducts = async () => {
        if (loading || !hasMore) return

        setLoading(true)
        try {
            const offset = (page - 1) * LIMIT
            const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products', {
                params: {
                    offset,
                    limit: LIMIT,
                },
            })

            setProducts((prev) => [...prev, ...response.data])
            console.log(products)

            if (response.data.length < LIMIT) {
                setHasMore(false)
            } else {
                setPage((prev) => prev + 1)
            }
        } catch (err) {
            setError('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    
    if (error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    return <>
    <div className="flex justify-center">
        <div className="p-6 max-w-11/12">
            <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                <Card key={product.id} product={product} />
                ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-6">
                {hasMore ? (
                    <button
                        onClick={fetchProducts}
                        disabled={loading}
                        className="px-6 py-2 border rounded"
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <p className="text-gray-500">No more products</p>
                )}
            </div>
        </div>
    </div>
    </>
}

export default ProductPage;