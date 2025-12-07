'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import CheckoutForm from './CheckoutForm'
import SingleProductCheckout from './SingleProductCheckout'

interface Product {
  id: string
  name: string
  price: number
  original_price: number | null
  image_urls: string[]
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  selectedSize?: string | null
  selectedColor?: string | null
  image_urls?: string[]
}

interface BuyNowButtonProps {
  product: Product
  cartItems?: CartItem[]
  selectedSize?: string | null
  selectedColor?: string | null
}

export default function BuyNowButton({ product, cartItems, selectedSize, selectedColor }: BuyNowButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  const handleBuyNow = () => {
    setShowCheckout(true)
  }

  const handleClose = () => {
    setShowCheckout(false)
  }

  const handleSuccess = () => {
    // Order sent successfully
    setShowCheckout(false)
  }

  return (
    <>
      <button
        onClick={handleBuyNow}
        className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl animate-glow"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartItems && cartItems.length > 0 ? 'Order via WhatsApp' : 'Buy Now via WhatsApp'}
      </button>

      {showCheckout && (
        <>
          {cartItems && cartItems.length > 0 ? (
            <CheckoutForm
              items={cartItems}
              totalPrice={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
              onClose={handleClose}
              onSuccess={handleSuccess}
            />
          ) : (
            <SingleProductCheckout
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              quantity={1}
              onClose={handleClose}
              onSuccess={handleSuccess}
            />
          )}
        </>
      )}
    </>
  )
}

