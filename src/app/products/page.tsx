'use client'

import { useEffect } from "react";
import Card from "../components/card";
import { useProductStore } from "../store/useProductStore";
import Link from "next/link";
import Header from "../components/header";
import { useRouter } from "next/navigation";


function ProductPage(){
    const router = useRouter()
    const {
        products,
        loading,
        error,
        hasMore,
        fetchProducts,
    } = useProductStore()

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products.length])
    
    if (error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    return <>
    <Header title="Products"></Header>
    <div className="flex justify-center">
        <div className="p-6 max-w-11/12">
            <h1 className="text-2xl text-center mx-auto font-bold sm:text-3xl mb-4">Products</h1>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link 
                        key={product.id}
                        href={`/products/${product.slug}/${product.id}`}
                        className="hover:scale-105 transition"
                    >
                        <Card product={product} />
                    </Link>
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