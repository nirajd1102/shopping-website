import { supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'

export const revalidate = 60

async function getRecommendations(currentProductId: string, categoryId?: string) {
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .neq('id', currentProductId)
    .limit(4)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data } = await query
  return data || []
}

interface ProductRecommendationsProps {
  currentProductId: string
  categoryId?: string | null
}

export default async function ProductRecommendations({
  currentProductId,
  categoryId,
}: ProductRecommendationsProps) {
  const recommendations = await getRecommendations(currentProductId, categoryId || undefined)

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

