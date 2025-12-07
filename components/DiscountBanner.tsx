'use client'

import { useState, useEffect } from 'react'
import { Tag } from 'lucide-react'

const discountMessages = [
  '🎉 FLAT 50% OFF on all Kurta! Limited Time Offer',
  '🔥 Buy 2 Get 1 FREE on T-Shirts! Shop Now',
  '💎 Special 30% Discount on Pants Collection',
  '⭐ Flash Sale: Up to 60% OFF on Trending Items',
  '🎁 Extra 20% OFF on Orders Above ₹2000',
]

export default function DiscountBanner() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % discountMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 dark:from-primary-800 dark:via-accent-800 dark:to-primary-800 text-white py-3">
      <div className="flex items-center justify-center gap-3">
        <Tag className="w-5 h-5 animate-pulse" />
        <div className="relative h-6 overflow-hidden w-full max-w-4xl">
          <div
            key={currentMessage}
            className="absolute inset-0 flex items-center justify-center animate-slide text-sm md:text-base font-semibold whitespace-nowrap"
          >
            {discountMessages[currentMessage]}
          </div>
        </div>
        <Tag className="w-5 h-5 animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-slide"></div>
    </div>
  )
}

