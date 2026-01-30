import Card from "@/app/components/card";
import Header from "@/app/components/header";
import { Product } from "@/app/types/products";

type PageProps = {
  params: Promise<{
    slug: string
    id: string
  }>
}

var product: Product;

async function DetailPage({ params }: PageProps) {
    const { slug, id } = await params

    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      { cache: "no-store" }
    )

    product = await res.json()

    return <>
      <Header
        title={slug}
        showBack
      ></Header>
      <h1 className="text-2xl text-center mx-auto font-bold sm:text-3xl mb-4">{slug}</h1>

      <Card product={product} />
    </>
}

export default DetailPage