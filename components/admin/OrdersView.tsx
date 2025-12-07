'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Order {
  id: string
  customer_name: string | null
  customer_phone: string | null
  customer_address: string | null
  products: any[]
  total_amount: number
  coupon_code: string | null
  discount_amount: number
  status: string
  created_at: string
}

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error: any) {
      toast.error('Failed to load orders: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error
      toast.success('Order status updated')
      loadOrders()
    } catch (error: any) {
      toast.error('Failed to update order status: ' + error.message)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading orders...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders Management</h2>
      <p className="text-gray-600 mb-6">
        View and manage orders received via WhatsApp
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Products</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div>
                    {order.customer_name && (
                      <div className="font-medium text-gray-900">{order.customer_name}</div>
                    )}
                    {order.customer_phone && (
                      <div className="text-sm text-gray-600">{order.customer_phone}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-600">
                    {Array.isArray(order.products) ? (
                      order.products.map((p: any, idx: number) => (
                        <div key={idx}>
                          {p.name || p.product_name} - ₹{p.price?.toFixed(2) || '0.00'}
                        </div>
                      ))
                    ) : (
                      <div>No product details</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">
                    ₹{order.total_amount.toFixed(2)}
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="text-xs text-green-600">
                      Discount: ₹{order.discount_amount.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="whatsapp_pending">WhatsApp Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  {order.customer_phone && (
                    <a
                      href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Contact
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  )
}

