import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProductReviews from '@/components/ProductReviews'
import ProductRecommendations from '@/components/ProductRecommendations'
import ProductDetailsClient from './ProductDetailsClient'

export const revalidate = 60

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const mainImage = product.image_urls && product.image_urls.length > 0
    ? product.image_urls[0]
    : 'https://via.placeholder.com/800x800?text=No+Image'

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-pulse">
                    {discount}% OFF
                  </div>
                )}
              </div>
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.image_urls.slice(1, 5).map((url: string, index: number) => (
                    <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded overflow-hidden">
                      <Image
                        src={url}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {product.categories && (
                <p className="text-primary-600 dark:text-primary-400 font-medium uppercase text-sm">
                  {product.categories.name}
                </p>
              )}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.original_price && (
                  <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">
                    ₹{product.original_price.toFixed(2)}
                  </span>
                )}
              </div>

              {product.description && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              )}

              <ProductDetailsClient product={product} />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        {/* Recommendations */}
        <ProductRecommendations 
          currentProductId={product.id} 
          categoryId={product.category_id}
        />
      </div>
    </div>
  )
}
