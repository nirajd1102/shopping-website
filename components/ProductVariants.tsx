'use client'

import { useState } from 'react'

interface ProductVariantsProps {
  availableSizes: string[]
  availableColors: string[]
  defaultSize?: string | null
  defaultColor?: string | null
  onSelectionChange: (size: string | null, color: string | null) => void
}

export default function ProductVariants({
  availableSizes,
  availableColors,
  defaultSize,
  defaultColor,
  onSelectionChange,
}: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(defaultSize || null)
  const [selectedColor, setSelectedColor] = useState<string | null>(defaultColor || null)

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    onSelectionChange(size, selectedColor)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    onSelectionChange(selectedSize, color)
  }

  if (availableSizes.length === 0 && availableColors.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {availableSizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Select Size {selectedSize && <span className="text-primary-600 dark:text-primary-400">({selectedSize})</span>}
          </label>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeSelect(size)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:scale-105'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {availableColors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Select Color {selectedColor && <span className="text-primary-600 dark:text-primary-400">({selectedColor})</span>}
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 capitalize ${
                  selectedColor === color
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg scale-105 ring-2 ring-primary-300 dark:ring-primary-700'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:scale-105'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}





