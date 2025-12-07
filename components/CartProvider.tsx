'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  original_price: number | null
  image_urls: string[]
  quantity: number
  selectedSize?: string | null
  selectedColor?: string | null
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, size?: string | null, color?: string | null) => void
  removeFromCart: (id: string, size?: string | null, color?: string | null) => void
  updateQuantity: (id: string, quantity: number, size?: string | null, color?: string | null) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: (_product, _size?, _color?) => {},
  removeFromCart: (_id, _size?, _color?) => {},
  updateQuantity: (_id, _quantity, _size?, _color?) => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = (product: Omit<CartItem, 'quantity'>, size?: string | null, color?: string | null) => {
    setItems((prev) => {
      // Check if same product with same size and color exists
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      )
      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size || null, selectedColor: color || null }]
    })
  }

  const removeFromCart = (id: string, size?: string | null, color?: string | null) => {
    setItems((prev) => 
      prev.filter((item) => 
        !(item.id === id && 
          item.selectedSize === size && 
          item.selectedColor === color)
      )
    )
  }

  const updateQuantity = (id: string, quantity: number, size?: string | null, color?: string | null) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color)
      return
    }
    setItems((prev) =>
      prev.map((item) => 
        item.id === id && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  return context
}

