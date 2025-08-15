"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/hooks/useCart'
import Link from 'next/link'

export function CartWidget() {
  const { cart, loading, updateQuantity, removeFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      await updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId)
  }

  return (
    <div className="relative">
      {/* Кнопка корзины */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        
        {/* Бейдж с количеством товаров */}
        {cart.count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {cart.count}
          </motion.span>
        )}
      </button>

      {/* Выпадающая панель корзины */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
          >
            {/* Заголовок */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">Корзина</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Содержимое корзины */}
            <div className="max-h-64 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Корзина пуста
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {/* Изображение товара */}
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
                        {item.image || '🎈'}
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.price} ₽ × {item.quantity}
                        </p>
                      </div>

                      {/* Управление количеством */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={loading}
                          className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={loading}
                          className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Удаление товара */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={loading}
                        className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Итого и кнопки */}
            {cart.items.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {/* Итого */}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Итого:</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {cart.total} ₽
                  </span>
                </div>

                {/* Кнопки */}
                <div className="space-y-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center block"
                  >
                    Перейти к корзине
                  </Link>
                  
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    Оформить заказ
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
