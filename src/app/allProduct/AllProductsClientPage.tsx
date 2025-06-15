"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { type Product, type Category, getFullImageUrl } from "../../lib/api"

const ProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      key={product.id}
      className="bg-white p-4 flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-400/60 rounded-lg"
    >
      <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col group">
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg" />}
          {product.images?.[0]?.url && (
            <>
              <Image
                src={getFullImageUrl(product.images[0].url) || "/placeholder.svg"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-contain transition-opacity duration-300 group-hover:opacity-0 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
              />
              {product.images[1]?.url && (
                <Image
                  src={getFullImageUrl(product.images[1].url) || "/placeholder.svg"}
                  alt={`${product.title} - Hover`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </>
          )}
        </div>

        <div className="text-xs tracking-wider text-gray-600 uppercase mb-2 truncate">{product.title || ""}</div>
        <div className="text-black font-semibold text-sm mb-3 truncate">PKR {product.price || ""}</div>

        <div className="mt-auto pt-3">
          <button className="w-full text-xs border border-black px-4 py-2 transition-colors duration-200 bg-white hover:bg-black hover:text-white">
            ADD TO BAG
          </button>
        </div>
      </Link>
    </div>
  )
}

const ProductSkeletonCard = () => {
  return (
    <div className="bg-white p-4 flex flex-col rounded-lg shadow-sm">
      <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded mb-3 w-1/2 animate-pulse" />
      <div className="h-9 bg-gray-300 rounded mt-auto animate-pulse" />
    </div>
  )
}

interface AllProductsClientPageProps {
  initialProducts: Product[]
  initialCategories: Category[]
}

export default function AllProductsClientPage({ initialProducts, initialCategories }: AllProductsClientPageProps) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [sortOption, setSortOption] = useState<"none" | "price-low" | "price-high">("none")

  const toggleCategory = (id: number | "all") => {
    if (id === "all") {
      setSelectedCategoryIds([])
    } else {
      setSelectedCategoryIds((prev) => (prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]))
    }
  }

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts
    if (selectedCategoryIds.length > 0) {
      filtered = initialProducts.filter((product) => selectedCategoryIds.includes(product.catagory?.id || 0))
    }

    if (sortOption === "price-low") {
      return [...filtered].sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
    } else if (sortOption === "price-high") {
      return [...filtered].sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
    }
    return filtered
  }, [initialProducts, selectedCategoryIds, sortOption])

  return (
    <div className="bg-white text-gray-800 min-h-screen text-sm">
      {/* Mobile Filters */}
      <div className="p-4 md:hidden border-b border-gray-200">
        <h4 className="font-semibold text-sm mb-2">CATEGORY</h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <button
            onClick={() => toggleCategory("all")}
            className={`px-3 py-1 border rounded-full transition-colors duration-200 ${selectedCategoryIds.length === 0 ? "bg-black text-white" : "border-gray-400"}`}
          >
            All
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1 border rounded-full transition-colors duration-200 ${selectedCategoryIds.includes(cat.id) ? "bg-black text-white" : "border-gray-400"}`}
            >
              {cat.Name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
        {/* Desktop Filters */}
        <aside className="p-6 hidden md:block">
          <h3 className="font-semibold text-base mb-4">SHOPPING OPTIONS</h3>
          <div className="mb-6">
            <button
              className="font-bold mb-2 text-xs flex items-center justify-between w-full"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              CATEGORY
              <span className={`text-xl transition-transform duration-300 ${categoryOpen ? "rotate-0" : "rotate-90"}`}>
                {categoryOpen ? "−" : "+"}
              </span>
            </button>

            <div
              className={`transition-all duration-500 overflow-hidden ${categoryOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
            >
              <div className="space-y-2 text-xs mt-2">
                <button onClick={() => toggleCategory("all")} className="flex items-center gap-2">
                  <input type="radio" checked={selectedCategoryIds.length === 0} readOnly className="accent-black" />
                  All
                </button>
                {initialCategories.map((cat) => (
                  <button key={cat.id} onClick={() => toggleCategory(cat.id)} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedCategoryIds.includes(cat.id)}
                      readOnly
                      className="accent-black"
                    />
                    {cat.Name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="p-6">
          <div className="flex justify-end mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as "none" | "price-low" | "price-high")}
              className="text-xs border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="none">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
