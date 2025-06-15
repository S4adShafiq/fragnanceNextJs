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

// Server Component - fetches data on server
export default async function AllProductsPage() {
  // Fetch data on server side with ISR
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])

  return <AllProductsClientPage initialProducts={products} initialCategories={categories} />
}

// Enable ISR for product listing
export const revalidate = 1800 // Revalidate every 30 minutes
