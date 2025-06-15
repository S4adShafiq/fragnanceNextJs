"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { type Product, getFullImageUrl } from "../../../../lib/api"

interface ProductImageGalleryProps {
  product: Product
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images?.[0]?.url || "")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setMousePosition({ x, y })
      setIsHovering(true)
    } else {
      setIsHovering(false)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const magnifierSize = 120
  const zoomLevel = 2.5
  const backgroundX = -(mousePosition.x * zoomLevel - magnifierSize / 2)
  const backgroundY = -(mousePosition.y * zoomLevel - magnifierSize / 2)

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={imageRef}
        className="w-full max-w-[220px] sm:max-w-[260px] aspect-[4/5] relative cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg" />}
        {selectedImage && (
          <Image
            src={getFullImageUrl(selectedImage) || "/placeholder.svg"}
            alt={product.title}
            fill
            className={`object-contain rounded-lg border transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            priority
            sizes="(max-width: 768px) 260px, 260px"
          />
        )}
        {isHovering && selectedImage && (
          <div
            className="absolute w-[300px] h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg pointer-events-none z-10"
            style={{
              top: `${mousePosition.y - magnifierSize / 2}px`,
              left: `${mousePosition.x + 20}px`,
              backgroundImage: `url(${getFullImageUrl(selectedImage)})`,
              backgroundSize: `${(imageRef.current?.offsetWidth || 260) * zoomLevel}px ${(imageRef.current?.offsetHeight || 325) * zoomLevel}px`,
              backgroundPosition: `${backgroundX}px ${backgroundY}px`,
            }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2 overflow-x-auto w-full max-w-[220px] sm:max-w-[260px]">
        {product.images.map((img) => (
          <button
            key={img.id}
            onClick={() => {
              setSelectedImage(img.url)
              setImageLoaded(false)
            }}
            className={`min-w-[44px] h-11 border-2 rounded overflow-hidden transition-colors duration-200 ${selectedImage === img.url ? "border-black" : "border-gray-300"}`}
          >
            <Image
              src={getFullImageUrl(img.formats?.thumbnail?.url || img.url)}
              alt="Thumbnail"
              width={44}
              height={44}
              className="object-cover"
              sizes="44px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
