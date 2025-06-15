// Centralized API configuration and functions
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface Size {
  id: number
  size: string
}

export interface Category {
  id: number
  Name: string
}

export interface Product {
  id: number
  documentId: string
  slug: string
  title: string
  price: string
  isavailable?: boolean
  Description: { type: string; children: { text: string }[] }[]
  images: {
    id: number
    documentId: string
    url: string
    formats?: {
      thumbnail?: { url: string }
    }
  }[]
  catagory?: Category
  size: Size[]
}

// Fetch all products with ISR
export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products?populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[catagory][fields][0]=Name&populate[size]=true`,
      {
        next: {
          revalidate: 3600, // Revalidate every hour
          tags: ["products"],
        },
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`)
    }

    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Fetch single product by slug with ISR
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products?filters[slug][$eq]=${slug}&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[catagory][fields][0]=Name&populate[size]=true`,
      {
        next: {
          revalidate: 3600, // Revalidate every hour
          tags: [`product-${slug}`],
        },
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`)
    }

    const data = await res.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error)
    return null
  }
}

// Fetch all categories with ISR
export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/catagories?populate=products`, {
      next: {
        revalidate: 7200, // Revalidate every 2 hours
        tags: ["categories"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`)
    }

    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Get full image URL
export function getFullImageUrl(url: string): string {
  if (!url) return "/placeholder.svg?height=400&width=400"
  return url.startsWith("http") ? url : BASE_URL + url
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products?fields[0]=slug`, {
      next: {
        revalidate: 3600,
        tags: ["product-slugs"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch product slugs: ${res.status}`)
    }

    const data = await res.json()
    return data.data?.map((product: { slug: string }) => product.slug) || []
  } catch (error) {
    console.error("Error fetching product slugs:", error)
    return []
  }
}
