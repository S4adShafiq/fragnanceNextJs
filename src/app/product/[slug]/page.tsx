import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getAllProductSlugs, getFullImageUrl } from "../../../lib/api"
import ProductImageGallery from "./components/product-image-gallery"
import ProductDetails from "./components/product-details"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()

    return slugs.map((slug) => ({
      slug: slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | Junaid Jamshed",
      description: "The requested product could not be found.",
    }
  }

  const description =
    product.Description?.map((block) => block.children?.map((child) => child.text).join(" "))
      .join(" ")
      .slice(0, 160) || `${product.title} - Premium quality product from Junaid Jamshed`

  return {
    title: `${product.title} | Junaid Jamshed`,
    description,
    keywords: [product.title, product.catagory?.Name || "", "Junaid Jamshed", "Fashion", "Pakistan"]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title: `${product.title} | Junaid Jamshed`,
      description,
      images: product.images?.[0]?.url
        ? [
            {
              url: getFullImageUrl(product.images[0].url),
              width: 800,
              height: 1000,
              alt: product.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Junaid Jamshed`,
      description,
      images: product.images?.[0]?.url ? [getFullImageUrl(product.images[0].url)] : [],
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  }
}

// Server Component - renders on server
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.Description?.map((block) => block.children?.map((child) => child.text).join(" ")).join(" ") ||
      product.title,
    image: product.images?.map((img) => getFullImageUrl(img.url)) || [],
    sku: product.documentId,
    brand: {
      "@type": "Brand",
      name: "Junaid Jamshed",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: product.isavailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Junaid Jamshed",
      },
    },
    category: product.catagory?.Name || "Fashion",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="bg-white px-2 sm:px-4 py-6 sm:py-10 mx-auto text-gray-900 text-sm md:text-base min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Suspense fallback={<div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />}>
            <ProductImageGallery product={product} />
          </Suspense>

          <Suspense
            fallback={
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            }
          >
            <ProductDetails product={product} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

// Enable ISR - page will be regenerated in background
export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-static" // Force static generation
export const dynamicParams = true // Allow new slugs to be generated on-demand
