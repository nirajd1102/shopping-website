'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Plus } from 'lucide-react'
import { useCart } from './CartProvider'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string | null
    price: number
    original_price: number | null
    image_urls: string[]
    categories: { name: string } | null
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const imageUrl = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls[0] 
    : 'https://via.placeholder.com/400x400?text=No+Image'
  
  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price,
      image_urls: product.image_urls,
    })
    toast.success('Added to cart!')
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          {product.categories && (
            <p className="text-xs text-primary-600 dark:text-primary-400 mb-1 font-medium uppercase">
              {product.categories.name}
            </p>
          )}
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                ₹{product.price.toFixed(2)}
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
                  ₹{product.original_price.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl animate-glow"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

