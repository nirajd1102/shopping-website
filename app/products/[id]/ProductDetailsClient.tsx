'use client'

import { useState } from 'react'
import BuyNowButton from '@/components/BuyNowButton'
import AddToCartButton from '@/components/AddToCartButton'
import ProductVariants from '@/components/ProductVariants'

interface Product {
  id: string
  name: string
  price: number
  original_price: number | null
  image_urls: string[]
  available_sizes?: string[] | null
  available_colors?: string[] | null
  default_size?: string | null
  default_color?: string | null
  stock_quantity: number
}

interface ProductDetailsClientProps {
  product: Product
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(product.default_size || null)
  const [selectedColor, setSelectedColor] = useState<string | null>(product.default_color || null)

  const handleSelectionChange = (size: string | null, color: string | null) => {
    setSelectedSize(size)
    setSelectedColor(color)
  }

  const availableSizes = product.available_sizes || []
  const availableColors = product.available_colors || []

  return (
    <div className="space-y-6">
      {/* Size and Color Selection */}
      {(availableSizes.length > 0 || availableColors.length > 0) && (
        <ProductVariants
          availableSizes={availableSizes}
          availableColors={availableColors}
          defaultSize={product.default_size || null}
          defaultColor={product.default_color || null}
          onSelectionChange={handleSelectionChange}
        />
      )}

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Stock Status</p>
            <p className={`font-semibold ${product.stock_quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          
          <div className="flex gap-4">
            <AddToCartButton 
              product={product} 
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
            <BuyNowButton 
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}





