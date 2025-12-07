import { supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'

export const revalidate = 60

async function getTrendingProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .eq('is_trending', true)
    .order('created_at', { ascending: false })
    .limit(8)

  return { data, error }
}

export default async function TrendingSection() {
  const { data: products, error } = await getTrendingProducts()

  if (error || !products || products.length === 0) {
    return null
  }

  return (
    <section className="bg-white dark:bg-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🔥 Top Trending</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Most popular items this week</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

