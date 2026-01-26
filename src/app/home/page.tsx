'use client'

import { useEffect, useState } from "react";
import { Product } from "../types/products";
import axios from "axios";
import Card from "../components/card";

function Page(){
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
                setProducts(response.data)
            } catch (err) {
                setError('Failed to load products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <p className="p-6">Loading products...</p>
    }
    
    if (error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    return <>
        <div className="p-20">
            <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    </>
}

export default Page;