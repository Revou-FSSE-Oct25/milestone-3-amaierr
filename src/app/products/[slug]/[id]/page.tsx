import AddToCart from "@/components/addToCart";
import Header from "@/components/header";
import Loading from "@/components/loading";
import { Product } from "@/types/products";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    id: string
  }>
}

var product: Product;

async function DetailPage({ params }: PageProps) {
    const { id } = await params

    try{
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        { cache: "no-store" }
      )
      
      product = await res.json()
    } catch(error){
      throw new Error(`HTTP error! status: ${error}`);
    }


    return <Suspense fallback={<Loading/>}>
      <Header></Header>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="rounded-xl overflow-hidden border-3 border-gray-700">
            <img
              src={product.images[0]}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col justify-center">
            <span className="text-sm uppercase tracking-widest text-orange-200 font-semibold">
              {product.category.name}
            </span>

            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-orange-500">
              {product.title}
            </h1>

            <p className="mt-6 text-[#348aa7] leading-relaxed">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="mt-6">
              <span className="text-2xl ">${product.price}</span>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <AddToCart product = {product}/>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
}

export default DetailPage