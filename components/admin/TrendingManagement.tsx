'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
  image_urls: string[]
  is_trending: boolean
}

export default function TrendingManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_urls, is_trending')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (error: any) {
      toast.error('Failed to load products: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTrending = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_trending: !currentStatus })
        .eq('id', productId)

      if (error) throw error
      toast.success(
        `Product ${!currentStatus ? 'added to' : 'removed from'} trending`
      )
      loadProducts()
    } catch (error: any) {
      toast.error('Failed to update trending status: ' + error.message)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  const trendingProducts = products.filter((p) => p.is_trending)
  const nonTrendingProducts = products.filter((p) => !p.is_trending)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Items Management</h2>
      <p className="text-gray-600 mb-6">
        Manage which products appear in the "Top Trending" section on the homepage.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Products */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔥 Currently Trending ({trendingProducts.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {trendingProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No trending products</p>
            ) : (
              trendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {product.image_urls && product.image_urls.length > 0 && (
                      <img
                        src={product.image_urls[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTrending(product.id, true)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Non-Trending Products */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Available Products ({nonTrendingProducts.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {nonTrendingProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">All products are trending</p>
            ) : (
              nonTrendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {product.image_urls && product.image_urls.length > 0 && (
                      <img
                        src={product.image_urls[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTrending(product.id, false)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    Add to Trending
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

