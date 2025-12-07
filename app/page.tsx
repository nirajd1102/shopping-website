import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import TrendingSection from '@/components/TrendingSection'
import DiscountBanner from '@/components/DiscountBanner'
import Header from '@/components/Header'

export const revalidate = 60 // Revalidate every 60 seconds

async function getProducts(categoryId?: string) {
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query
  return { data, error }
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  return { data, error }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const { data: products, error: productsError } = await getProducts(
    searchParams.category
  )
  const { data: categories } = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Discount Banner */}
      <DiscountBanner />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 dark:from-primary-800 dark:via-accent-800 dark:to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Welcome to Fashion Store</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Discover the latest trends in Kurta, T-Shirts & Pants</p>
          <Link
            href="#products"
            className="inline-block bg-white text-primary-600 dark:text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Trending Section */}
      <TrendingSection />

      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <CategoryFilter categories={categories} selectedCategory={searchParams.category} />
      )}

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">All Products</h2>
        
        {productsError ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Error loading products. Please try again later.</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fashion Store</h3>
              <p className="text-gray-400">
                Your one-stop shop for the latest fashion trends in kurta, t-shirts, and pants.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/#products" className="hover:text-white transition">Products</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Order via WhatsApp for quick delivery
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fashion Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
