import type { Metadata } from "next"
import { getAllProducts, getAllCategories } from "../../lib/api"
import AllProductsClientPage from "./AllProductsClientPage"

export const metadata: Metadata = {
  title: "All Products | Junaid Jamshed",
  description:
    "Browse our complete collection of premium fashion, fragrances, and lifestyle products from Junaid Jamshed.",
  keywords: "Junaid Jamshed, fashion, fragrances, clothing, Pakistan, premium products",
  openGraph: {
    title: "All Products | Junaid Jamshed",
    description: "Browse our complete collection of premium fashion, fragrances, and lifestyle products.",
    type: "website",
  },
}


export default async function AllProductsPage() {

  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])

  return <AllProductsClientPage initialProducts={products} initialCategories={categories} />
}


export const revalidate = 3600 // Revalidate every 60 minutes
