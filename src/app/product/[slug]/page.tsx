'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

 const BASE_URL = 'https://passionate-cherry-2410795bbd.strapiapp.com';

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const zoomRef = useRef<HTMLDivElement | null>(null);
  const zoomImgRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`${BASE_URL}/api/products?populate=*`);
        const data = await res.json();
        const matched = data.data.find((p: any) => p.slug === slug);
        if (matched) {
          setProduct(matched);
          const firstImageUrl = matched.images?.[0]?.url || '';
          setSelectedImage(firstImageUrl);
        }
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const getFullImageUrl = (url: string) => {
    return url?.startsWith('http') ? url : BASE_URL + url;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomRef.current || !zoomImgRef.current || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    zoomRef.current.style.display = 'block';
    zoomRef.current.style.left = `${e.pageX + 20}px`;
    zoomRef.current.style.top = `${e.pageY - 150}px`;

    zoomImgRef.current.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    zoomImgRef.current.style.transform = `scale(3)`;
  };

  const handleMouseEnter = () => {
    if (zoomRef.current) zoomRef.current.style.display = 'block';
  };

  const handleMouseLeave = () => {
    if (zoomRef.current) zoomRef.current.style.display = 'none';
    if (zoomImgRef.current) zoomImgRef.current.style.transform = 'scale(1)';
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center py-20 text-red-500">Product not found.</p>;

  return (
    <div className="bg-white text-gray-800 px-4 sm:px-6 md:px-10 py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Product Image & Thumbnails */}
        <div className="flex-1">
          <div
            ref={imageContainerRef}
            className="relative w-full h-[350px] sm:h-[400px] bg-gray-100 rounded-xl overflow-hidden mb-4 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={getFullImageUrl(selectedImage || '')}
              alt={product.title}
              fill
              className="object-contain pointer-events-none"
              priority
              unoptimized={false}
            />
            <div
              ref={zoomRef}
              className="hidden fixed z-50 w-64 h-64 overflow-hidden border-2 border-gray-300 rounded-lg shadow-lg bg-white"
              style={{ display: 'none' }}
            >
              <img
                ref={zoomImgRef}
                src={getFullImageUrl(selectedImage || '')}
                alt="Zoomed"
                className="w-full h-full object-contain transition-transform duration-75 ease-in-out"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className={`w-16 h-16 rounded overflow-hidden border-2 ${
                  selectedImage === img.url ? 'border-blue-600' : 'border-gray-300'
                }`}
              >
                <Image
                  src={getFullImageUrl(img.formats?.thumbnail?.url || img.url)}
                  alt="Thumbnail"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{product.title}</h1>
            <p className="text-lg text-gray-600 mb-1">Rs. {product.price}</p>
            <p className="text-sm text-gray-400">Category: {product.catagory?.Name}</p>
          </div>

          {/* Size Selector */}
          {product.size?.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.size.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-1 rounded-full border text-sm transition ${
                      selectedSize === s.size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="mt-2 text-sm text-green-600">Selected: {selectedSize}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => {}}
              className="flex-1 sm:flex-none sm:w-40 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 active:scale-95 transition duration-200"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => {}}
              className="flex-1 sm:flex-none sm:w-40 px-6 py-3 border border-blue-600 text-blue-600 text-sm font-semibold rounded-md hover:bg-blue-50 active:scale-95 transition duration-200"
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-md font-semibold mb-2">Product Description</h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-2">
              {product.Description.map((block, index) =>
                block.children.map((child, i) => (
                  <p key={`${index}-${i}`}>{child.text}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
