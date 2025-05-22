"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SplashScreen from "../components/splashscreen";

const BASE_URL = "https://passionate-cherry-2410795bbd.strapiapp.com";

interface Size {
  id: number;
  size: string;
}

interface Category {
  id: number;
  Name: string;
}

interface Product {
  id: number;
  slug: string;
  title: string;
  price: string;
  Description: { type: string; children: { text: string }[] }[];
  catagory: { id: number; Name: string };
  images: {
    id: number;
    documentId: string;
    url: string;
  }[];
  size: Size[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      key={product.id}
      className="bg-white transition-all duration-300 hover:shadow-xl hover:shadow-gray-400/60 flex flex-col p-4"
    >
      <Link
        href={`/product/${product.slug}`}
        className="w-full group flex-1 flex flex-col"
      >
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          )}
          {product.images?.[0]?.url && (
            <>
              {/* Default image */}
              <Image
                src={product.images[0].url}
                alt={product.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-contain absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setImageLoaded(true)}
              />

              {/* Hover image */}
              {product.images[1]?.url && (
                <Image
                  src={product.images[1].url}
                  alt={`${product.title} - Hover`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </>
          )}
        </div>

        <div className="text-xs tracking-wide text-gray-700 uppercase mb-2 text-left">
          {product.title}
        </div>
        <div className="text-black font-bold text-sm mb-3 text-left">
          PKR {product.price}
        </div>

        <div className="mt-auto pt-3">
          <button
            className={`w-full text-xs border px-4 py-2 transition-colors duration-200
              md:border-black md:text-black md:bg-white md:hover:bg-black md:hover:text-white
              border-black text-white bg-black hover:bg-white hover:text-black
            `}
          >
            ADD TO BAG
          </button>
        </div>
      </Link>
    </div>
  );
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(true); // 🔄 Collapsible toggle

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch(
          `${BASE_URL}/api/catagories?populate=products`
        );
        const catData = await catRes.json();
        setCategories(catData.data);

        const prodRes = await fetch(
          `${BASE_URL}/api/products?populate[images][fields][0]=url&populate[catagory][fields][0]=Name&populate[size]=true`
        );
        const prodData = await prodRes.json();
        setProducts(prodData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleCategory = (id: number | "all") => {
    if (id === "all") {
      setSelectedCategoryIds([]);
    } else {
      setSelectedCategoryIds((prev) =>
        prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
      );
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategoryIds.length === 0) return products;
    return products.filter((product) =>
      selectedCategoryIds.includes(product.catagory?.id)
    );
  }, [products, selectedCategoryIds]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen text-sm">
      {/* Mobile category filter */}
      <div className="p-4 md:hidden border-b border-gray-200">
        <h4 className="font-semibold text-sm mb-2">CATEGORY</h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <button
            onClick={() => toggleCategory("all")}
            className={`px-3 py-1 border rounded-full ${
              selectedCategoryIds.length === 0
                ? "bg-black text-white"
                : "border-gray-400"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1 border rounded-full ${
                selectedCategoryIds.includes(cat.id)
                  ? "bg-black text-white"
                  : "border-gray-400"
              }`}
            >
              {cat.Name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
        {/* Sidebar for desktop */}
        {/* Sidebar for desktop */}
        <aside className="p-6 hidden md:block">
          <h3 className="font-semibold text-base mb-4">SHOPPING OPTIONS</h3>
          <div className="mb-6">
            <button
              className="font-bold mb-2 text-xs flex items-center justify-between w-full"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              CATEGORY
              <span
          className={`text-xl transform transition-transform duration-300 ${
            categoryOpen ? "rotate-0" : "rotate-90"
          }`}
              >
          {categoryOpen ? "−" : "+"}
              </span>
            </button>

            {/* Smooth collapsible animation with fade and slide */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
          categoryOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
              }`}
              style={{
          transitionProperty: "max-height, opacity, transform",
              }}
            >
              <div className="space-y-2 text-xs mt-2">
          <button
            onClick={() => toggleCategory("all")}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              checked={selectedCategoryIds.length === 0}
              readOnly
            />{" "}
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center gap-2"
            >
              <input
                type="radio"
                checked={selectedCategoryIds.includes(cat.id)}
                readOnly
              />{" "}
              {cat.Name}
            </button>
          ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
