"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const BASE_URL = "https://passionate-cherry-2410795bbd.strapiapp.com";

interface Size {
  id: number;
  size: string;
}

interface Product {
  id: number;
  slug: string;
  title: string;
  price: string;
  Description: { type: string; children: { text: string }[] }[];
  images: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
    };
  }[];
  catagory?: {
    id: number;
    Name: string;
  };
  size: Size[];
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`${BASE_URL}/api/products?populate=*`);
        const data = await res.json();
        const matched = data.data.find((p: any) => p.slug === slug);
        if (matched) {
          setProduct(matched);
          setSelectedImage(matched.images?.[0]?.url || "");
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const getFullImageUrl = (url: string) => {
    return url?.startsWith("http") ? url : BASE_URL + url;
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 text-sm">Loading...</p>
    );
  if (!product)
    return (
      <p className="text-center py-10 text-red-500 text-sm">
        Product not found.
      </p>
    );

  return (
    <div className="bg-white px-2 sm:px-4 py-6 sm:py-10 max-w-auto mx-auto text-gray-900 text-sm md:text-base min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Left: Images */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[220px] sm:max-w-[260px] aspect-[4/5] relative">
            <Image
              src={getFullImageUrl(selectedImage || "")}
              alt={product.title}
              fill
              className="object-contain rounded-lg border"
              unoptimized={false}
              priority
            />
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto w-full max-w-[220px] sm:max-w-[260px]">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className={`min-w-[44px] h-11 border-2 rounded overflow-hidden ${
                  selectedImage === img.url ? "border-black" : "border-gray-300"
                }`}
              >
                <Image
                  src={getFullImageUrl(img.formats?.thumbnail?.url || img.url)}
                  alt="Thumbnail"
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-3 md:space-y-5">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide uppercase">
            {product.title}
          </h1>
          <p className="text-xs text-gray-500">SKU#: 01060632-100-001</p>
          <p className="text-xs text-green-600">IN STOCK</p>

          <div className="text-yellow-500 text-xs font-medium flex flex-wrap items-center gap-1">
            ★★★★★{" "}
            <span className="text-gray-500 underline cursor-pointer">
              42 REVIEWS
            </span>{" "}
            <span className="text-gray-500">|</span>{" "}
            <span className="text-gray-500 underline cursor-pointer">
              WRITE YOUR REVIEW
            </span>
          </div>

          <p className="text-lg sm:text-xl font-bold">PKR {product.price}</p>
          <p className="text-green-600 text-xs font-medium">
            Pay in 3 installments of PKR {(+product.price / 3).toFixed(2)}
          </p>

          <p className="text-red-600 text-xs font-semibold mt-1">
            ● Only 10 Left in Stock — Act Fast!
          </p>

          <button className="w-1/2 border border-black py-2 text-xs font-semibold uppercase hover:bg-black hover:text-white transition">
            Add to Bag
          </button>

          <p className="text-red-500 text-[10px] mt-2">
            (!) Fragrances and perfumes are not shipped internationally due to
            the courier and airline DG policy.
          </p>
            <div className="border-t pt-3 mt-3">
            <h3 className="font-semibold mb-1">Details</h3>
            <div className="text-gray-600 text-xs space-y-1">
              {product.Description.map((block, index) =>
                block.children.map((child, i) =>
                  typeof child.text === "string"
                    ? child.text.split('\n').map((line, j) => (
                        <p key={`${index}-${i}-${j}`}>{line}</p>
                      ))
                    : null
                )
              )}
            </div>
            </div>

          <div className="border-t pt-3 mt-3">
            <h3 className="font-semibold mb-1">More Information</h3>
            <p className="text-gray-500 text-xs">
              Additional product information, shipping details, and customer
              policies can be found here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
