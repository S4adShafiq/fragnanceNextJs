"use client"

import { useState } from "react"
import type { Product, Size } from "../../../../lib/api"

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(product.size?.length ? product.size[0] : null)

  return (
    <div className="space-y-3 md:space-y-5">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider uppercase">{product.title}</h1>

      <p className="text-xs text-gray-500">SKU#: {product.documentId}</p>
      <p className={`text-xs font-semibold ${product.isavailable ? "text-green-600" : "text-red-600"}`}>
        {product.isavailable ? "IN STOCK" : "OUT OF STOCK"}
      </p>

      <div className="text-yellow-500 text-xs font-medium flex flex-wrap items-center gap-1">
        ★★★★★ <span className="text-gray-500 underline cursor-pointer">42 REVIEWS</span>{" "}
        <span className="text-gray-500">|</span>{" "}
        <span className="text-gray-500 underline cursor-pointer">WRITE YOUR REVIEW</span>
      </div>

      <p className="text-lg sm:text-xl font-bold">PKR {product.price}</p>
      <p className="text-green-600 text-xs font-medium">
        Pay in 3 installments of PKR {(+product.price / 3).toFixed(2)}
      </p>

      <p className="text-xs font-semibold mt-1">🟢 Limited Stock Alert: Get Yours Before They're Gone!</p>

      {product.size?.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium mb-1">Select Size:</p>
          <div className="flex gap-2 flex-wrap">
            {product.size.map((sz) => (
              <button
                key={sz.id}
                onClick={() => setSelectedSize(sz)}
                className={`px-3 py-1 border rounded text-xs transition-colors duration-200 ${selectedSize?.id === sz.id ? "bg-black text-white border-black" : "border-gray-300"}`}
              >
                {sz.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="w-1/2 border border-black py-2 text-xs font-semibold uppercase transition-colors duration-200 hover:bg-black hover:text-white">
        Add to Bag
      </button>

      <p className="text-red-500 text-[10px] mt-2">
        (!) Fragrances and perfumes are not shipped internationally due to the courier and airline DG policy.
      </p>

      <div className="border-t pt-3 mt-3">
        <h3 className="font-semibold mb-1">Details</h3>
        <div className="text-gray-600 text-xs space-y-1">
          {product.Description.map((block, index) =>
            block.children.map((child, i) =>
              typeof child.text === "string"
                ? child.text.split("\n").map((line, j) => <p key={`${index}-${i}-${j}`}>{line}</p>)
                : null,
            ),
          )}
        </div>
      </div>

      <div className="border-t pt-3 mt-3">
        <h3 className="font-semibold mb-1">More Information</h3>
        <p className="text-gray-500 text-xs">
          Additional product information, shipping details, and customer policies can be found here.
        </p>
      </div>
    </div>
  )
}
