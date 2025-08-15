"use client"

import { useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface CartData {
  items: CartItem[]
  total: number
  count: number
}

export function useCart() {
  const [cart, setCart] = useState<CartData>({ items: [], total: 0, count: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузить корзину
  const loadCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/cart')
      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
      } else {
        setError(data.error || 'Ошибка загрузки корзины')
      }
    } catch (err) {
      setError('Ошибка загрузки корзины')
      console.error('Error loading cart:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Добавить товар в корзину
  const addToCart = useCallback(async (product: {
    id: string
    name: string
    price: number
    image?: string
  }, quantity: number = 1) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
        return { success: true, message: data.message }
      } else {
        setError(data.error || 'Ошибка добавления товара')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMsg = 'Ошибка добавления товара'
      setError(errorMsg)
      console.error('Error adding to cart:', err)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  // Обновить количество товара
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
        return { success: true, message: data.message }
      } else {
        setError(data.error || 'Ошибка обновления корзины')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMsg = 'Ошибка обновления корзины'
      setError(errorMsg)
      console.error('Error updating cart:', err)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  // Удалить товар из корзины
  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
        return { success: true, message: data.message }
      } else {
        setError(data.error || 'Ошибка удаления товара')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMsg = 'Ошибка удаления товара'
      setError(errorMsg)
      console.error('Error removing from cart:', err)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  // Очистить корзину
  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, count: 0 })
  }, [])

  // Проверить, есть ли товар в корзине
  const isInCart = useCallback((productId: string) => {
    return cart.items.some(item => item.productId === productId)
  }, [cart.items])

  // Получить количество товара в корзине
  const getItemQuantity = useCallback((productId: string) => {
    const item = cart.items.find(item => item.productId === productId)
    return item ? item.quantity : 0
  }, [cart.items])

  // Загрузить корзину при инициализации
  useEffect(() => {
    loadCart()
  }, [loadCart])

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
    loadCart
  }
}
