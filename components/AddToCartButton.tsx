'use client'

import { Plus, ShoppingCart } from 'lucide-react'
import { useCart } from './CartProvider'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
  original_price: number | null
  image_urls: string[]
}

interface AddToCartButtonProps {
  product: Product
  selectedSize?: string | null
  selectedColor?: string | null
}

export default function AddToCartButton({ product, selectedSize, selectedColor }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image_urls: product.image_urls,
      },
      selectedSize,
      selectedColor
    )
    
    const variantInfo = []
    if (selectedSize) variantInfo.push(`Size: ${selectedSize}`)
    if (selectedColor) variantInfo.push(`Color: ${selectedColor}`)
    
    toast.success(
      variantInfo.length > 0 
        ? `Added to cart! (${variantInfo.join(', ')})`
        : 'Added to cart!',
      {
        icon: '🛍️',
      }
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl animate-glow"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  )
}

