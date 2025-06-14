"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SplashScreen from "@/app/components/splashscreen";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

interface Size {
  id: number;
  size: string;
}

interface Product {
  documentId: string;
  slug: string;
  title: string;
  price: string;
  isavailable?: boolean;
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
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/products?filters[slug][$eq]=${slug}&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[catagory][fields][0]=Name&populate[size]=true`,
        );
        const data = await res.json();
        const matched = data.data[0];
        if (matched) {
          setProduct(matched);
          setSelectedImage(matched.images?.[0]?.url || "");
          if (matched.size?.length) {
            setSelectedSize(matched.size[0]);
          }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ensure mouse position is within image bounds
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setMousePosition({ x, y });
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if (loading) return <SplashScreen />;

  if (!product) {
    return <p className="text-center py-10 text-red-500 text-sm">Product not found.</p>;
  }

  // Calculate magnifier position and background position
  const magnifierSize = 120; // Size of the magnifier popup
  const zoomLevel = 2.5; // Magnification level
  const imageRect = imageRef.current?.getBoundingClientRect();
  const backgroundX = -(mousePosition.x * zoomLevel - magnifierSize / 2);
  const backgroundY = -(mousePosition.y * zoomLevel - magnifierSize / 2);

  return (
    <div className="bg-white px-2 sm:px-4 py-6 sm:py-10 mx-auto text-gray-900 text-sm md:text-base min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Left: Image Display */}
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
                src={getFullImageUrl(selectedImage)}
                alt={product.title}
                fill
                className={`object-contain rounded-lg border transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoadingComplete={() => setImageLoaded(true)}
                priority
              />
            )}
            {isHovering && selectedImage && (
              <div
                className="absolute w-[300px] h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg pointer-events-none"
                style={{
                  top: `${mousePosition.y - magnifierSize / 2}px`,
                  left: `${mousePosition.x + 20}px`, // Offset to avoid overlapping cursor
                  backgroundImage: `url(${getFullImageUrl(selectedImage)})`,
                  backgroundSize: `${(imageRef.current?.offsetWidth || 260) * zoomLevel}px ${(imageRef.current?.offsetHeight || 325) * zoomLevel}px`,
                  backgroundPosition: `${backgroundX}px ${backgroundY}px`,
                }}
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 overflow-x-auto w-full max-w-[220px] sm:max-w-[260px]">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => {
                  setSelectedImage(img.url);
                  setImageLoaded(false);
                }}
                className={`min-w-[44px] h-11 border-2 rounded overflow-hidden transition-colors duration-200 ${selectedImage === img.url ? "border-black" : "border-gray-300"}`}
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
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider uppercase">
            {product.title}
          </h1>

          <p className="text-xs text-gray-500">SKU#: {product.documentId}</p>
          <p
            className={`text-xs font-semibold ${product.isavailable ? "text-green-600" : "text-red-600"}`}
          >
            {product.isavailable ? "IN STOCK" : "OUT OF STOCK"}
          </p>

          <div className="text-yellow-500 text-xs font-medium flex flex-wrap items-center gap-1">
            ★★★★★{" "}
            <span className="text-gray-500 underline cursor-pointer">42 REVIEWS</span>{" "}
            <span className="text-gray-500">|</span>{" "}
            <span className="text-gray-500 underline cursor-pointer">WRITE YOUR REVIEW</span>
          </div>

          <p className="text-lg sm:text-xl font-bold">PKR {product.price}</p>
          <p className="text-green-600 text-xs font-medium">
            Pay in 3 installments of PKR {(+product.price / 3).toFixed(2)}
          </p>

          <p className="text-xs font-semibold mt-1">
            🟢 Limited Stock Alert: Get Yours Before They're Gone!
          </p>

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
                    : null
                )
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
      </div>
    </div>
  );
}