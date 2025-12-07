'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  original_price: z.number().min(0).optional().nullable(),
  category_id: z.string().optional().nullable(),
  stock_quantity: z.number().min(0, 'Stock must be non-negative'),
  is_active: z.boolean(),
  is_trending: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  category_id: string | null
  stock_quantity: number
  is_active: boolean
  is_trending: boolean
  image_urls: string[]
}

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  product: Product | null
  categories: Category[]
  onClose: () => void
}

// Helper function to normalize Product to ProductFormData
const normalizeProduct = (product: Product | null): ProductFormData => {
  if (!product) {
    return {
      name: '',
      description: undefined,
      price: 0,
      original_price: null,
      category_id: null,
      stock_quantity: 0,
      is_active: true,
      is_trending: false,
    }
  }
  
  return {
    name: product.name,
    description: product.description ?? undefined, // Convert null to undefined
    price: product.price,
    original_price: product.original_price,
    category_id: product.category_id,
    stock_quantity: product.stock_quantity,
    is_active: product.is_active,
    is_trending: product.is_trending,
  }
}

export default function ProductForm({ product, categories, onClose }: ProductFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(product?.image_urls || [])
  const [availableSizes, setAvailableSizes] = useState<string[]>(
    (product as any)?.available_sizes || []
  )
  const [availableColors, setAvailableColors] = useState<string[]>(
    (product as any)?.available_colors || []
  )
  const [defaultSize, setDefaultSize] = useState<string>((product as any)?.default_size || '')
  const [defaultColor, setDefaultColor] = useState<string>((product as any)?.default_color || '')
  const [isLoading, setIsLoading] = useState(false)
  
  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const commonColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Navy']
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: normalizeProduct(product),
  })

  const handleImageUrlAdd = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      handleImageUrlAddDirect(url.trim())
    }
  }

  const handleImageUrlAddDirect = (url: string) => {
    if (!url || !url.trim()) {
      return
    }

    const trimmedUrl = url.trim()
    
    // Basic URL validation
    try {
      const urlObj = new URL(trimmedUrl)
      
      // Check if it's http or https
      if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        toast.error('URL must start with http:// or https://')
        return
      }

      // Check if URL is already in the list
      if (imageUrls.includes(trimmedUrl)) {
        toast.error('This URL is already added')
        return
      }

      // Add the URL
      setImageUrls([...imageUrls, trimmedUrl])
      toast.success('Image URL added successfully!')
    } catch (error) {
      toast.error('Please enter a valid URL (e.g., https://example.com/image.jpg)')
      console.error('URL validation error:', error)
    }
  }

  const handleImageUrlRemove = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    try {
      const productData = {
        ...data,
        image_urls: imageUrls.length > 0 ? imageUrls : [],
        available_sizes: availableSizes.length > 0 ? availableSizes : [],
        available_colors: availableColors.length > 0 ? availableColors : [],
        default_size: defaultSize || null,
        default_color: defaultColor || null,
        original_price: data.original_price || null,
        category_id: data.category_id || null,
      }

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)

        if (error) throw error
        toast.success('Product updated successfully!')
      } else {
        // Create new product
        const { error } = await supabase.from('products').insert([productData])
        if (error) throw error
        toast.success('Product created successfully!')
      }

      onClose()
    } catch (error: any) {
      toast.error('Failed to save product: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₹) *
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Price (₹) - for discount
              </label>
              <input
                {...register('original_price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                {...register('category_id')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity *
              </label>
              <input
                {...register('stock_quantity', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
              {errors.stock_quantity && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stock_quantity.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URLs *
            </label>
            <div className="space-y-2">
              {/* Add new URL input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const input = e.currentTarget
                      if (input.value) {
                        handleImageUrlAddDirect(input.value)
                        input.value = ''
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[type="url"][placeholder*="example.com"]') as HTMLInputElement
                    if (input?.value) {
                      handleImageUrlAddDirect(input.value)
                      input.value = ''
                    } else {
                      handleImageUrlAdd()
                    }
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Add
                </button>
              </div>
              
              {/* Existing URLs */}
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...imageUrls]
                      newUrls[index] = e.target.value
                      setImageUrls(newUrls)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageUrlRemove(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {imageUrls.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add at least one image URL
                </p>
              )}
            </div>
          </div>

          {/* Size Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {commonSizes.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availableSizes.includes(size)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAvailableSizes([...availableSizes, size])
                      } else {
                        setAvailableSizes(availableSizes.filter(s => s !== size))
                      }
                    }}
                    className="mr-2 w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{size}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or enter custom sizes (comma separated)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onBlur={(e) => {
                if (e.target.value) {
                  const customSizes = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  setAvailableSizes([...new Set([...availableSizes, ...customSizes])])
                  e.target.value = ''
                }
              }}
            />
            <select
              value={defaultSize}
              onChange={(e) => setDefaultSize(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Default Size</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Color Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Colors
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {commonColors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availableColors.includes(color)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAvailableColors([...availableColors, color])
                      } else {
                        setAvailableColors(availableColors.filter(c => c !== color))
                      }
                    }}
                    className="mr-2 w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{color}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or enter custom colors (comma separated)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onBlur={(e) => {
                if (e.target.value) {
                  const customColors = e.target.value.split(',').map(c => c.trim()).filter(c => c)
                  setAvailableColors([...new Set([...availableColors, ...customColors])])
                  e.target.value = ''
                }
              }}
            />
            <select
              value={defaultColor}
              onChange={(e) => setDefaultColor(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Default Color</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                {...register('is_active')}
                type="checkbox"
                className="mr-2 w-4 h-4 text-primary-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
            </label>
            <label className="flex items-center">
              <input
                {...register('is_trending')}
                type="checkbox"
                className="mr-2 w-4 h-4 text-primary-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Trending</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isLoading || imageUrls.length === 0}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



