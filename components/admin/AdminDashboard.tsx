'use client'

import { useState } from 'react'
import { LogOut, Package, Tag, TrendingUp, Ticket, BarChart3 } from 'lucide-react'
import ProductManagement from './ProductManagement'
import CategoryManagement from './CategoryManagement'
import TrendingManagement from './TrendingManagement'
import CouponManagement from './CouponManagement'
import OrdersView from './OrdersView'

interface AdminDashboardProps {
  onLogout: () => void
}

type Tab = 'products' | 'categories' | 'trending' | 'coupons' | 'orders'

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('products')

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    onLogout()
  }

  const tabs = [
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'categories' as Tab, label: 'Categories', icon: Tag },
    { id: 'trending' as Tab, label: 'Trending', icon: TrendingUp },
    { id: 'coupons' as Tab, label: 'Coupons', icon: Ticket },
    { id: 'orders' as Tab, label: 'Orders', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'categories' && <CategoryManagement />}
          {activeTab === 'trending' && <TrendingManagement />}
          {activeTab === 'coupons' && <CouponManagement />}
          {activeTab === 'orders' && <OrdersView />}
        </div>
      </div>
    </div>
  )
}

