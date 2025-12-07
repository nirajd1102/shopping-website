'use client'

import { useState } from 'react'
import { X, User, Phone, MapPin, ShoppingBag, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  customerAddress: z.string().min(10, 'Address must be at least 10 characters'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  selectedSize?: string | null
  selectedColor?: string | null
  image_urls?: string[]
}

interface CheckoutFormProps {
  items: CartItem[]
  totalPrice: number
  onClose: () => void
  onSuccess: () => void
}

export default function CheckoutForm({ items, totalPrice, onClose, onSuccess }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)
    
    try {
      // Get WhatsApp number from environment
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'
      const cleanNumber = whatsappNumber.replace(/\D/g, '')
      
      // Create comprehensive order message
      let orderMessage = `🛍️ *NEW ORDER REQUEST*\n\n`
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n`
      orderMessage += `*CUSTOMER DETAILS*\n`
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n\n`
      orderMessage += `👤 *Name:* ${data.customerName}\n`
      orderMessage += `📱 *Phone:* ${data.customerPhone}\n`
      orderMessage += `📍 *Address:* ${data.customerAddress}\n\n`
      
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n`
      orderMessage += `*ORDER ITEMS*\n`
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n\n`
      
      items.forEach((item, index) => {
        orderMessage += `${index + 1}. *${item.name}*\n`
        if (item.selectedSize) {
          orderMessage += `   📏 Size: ${item.selectedSize}\n`
        }
        if (item.selectedColor) {
          orderMessage += `   🎨 Color: ${item.selectedColor}\n`
        }
        orderMessage += `   💰 Price: ₹${item.price.toFixed(2)} each\n`
        orderMessage += `   📦 Quantity: ${item.quantity}\n`
        orderMessage += `   💵 Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`
      })
      
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n`
      orderMessage += `*ORDER SUMMARY*\n`
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n\n`
      orderMessage += `📦 Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n`
      orderMessage += `💰 Total Amount: ₹${totalPrice.toFixed(2)}\n`
      orderMessage += `🚚 Shipping: Free\n\n`
      orderMessage += `━━━━━━━━━━━━━━━━━━━━\n`
      orderMessage += `✅ Please confirm this order and proceed with delivery.\n`
      orderMessage += `Thank you! 🙏`
      
      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(orderMessage)
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
      
      // Save order to database
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.customerName,
          customer_phone: data.customerPhone,
          customer_address: data.customerAddress,
          products: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.selectedSize,
            color: item.selectedColor,
          })),
          total_amount: totalPrice,
          status: 'whatsapp_pending',
        }),
      })
      
      toast.success('Order sent to WhatsApp!', {
        icon: '✅',
        duration: 3000,
      })
      
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error processing order:', error)
      toast.error('Failed to process order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>
                    {item.name}
                    {item.selectedSize && ` (Size: ${item.selectedSize})`}
                    {item.selectedColor && ` (Color: ${item.selectedColor})`}
                    {' x'} {item.quantity}
                  </span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Delivery Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                {...register('customerName')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                {...register('customerPhone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your phone number"
              />
              {errors.customerPhone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerPhone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Delivery Address *
              </label>
              <textarea
                {...register('customerAddress')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your complete delivery address (Street, City, State, Pincode)"
              />
              {errors.customerAddress && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerAddress.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl animate-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Send Order via WhatsApp
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}





