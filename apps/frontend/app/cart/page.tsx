"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/hooks/useCart'

export default function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      await updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Здесь будет переход к оформлению заказа
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          </div>

          {/* Пустая корзина */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ваша корзина пуста
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Link
              href="/products"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              Перейти к каталогу
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Товары в корзине ({cart.count})
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* Изображение товара */}
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl">
                        {item.image || '🎈'}
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.price} ₽ за шт.
                        </p>
                      </div>

                      {/* Управление количеством */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={loading}
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="text-lg font-medium text-gray-900 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={loading}
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Сумма за товар */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold text-gray-900">
                          {item.price * item.quantity} ₽
                        </p>
                      </div>

                      {/* Удаление */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={loading}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Кнопка очистки корзины */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  disabled={loading}
                  className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          </div>

          {/* Итого и оформление заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Итого заказа
              </h2>

              {/* Детализация */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cart.count}):</span>
                  <span>{cart.total} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка:</span>
                  <span>Бесплатно</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Итого:</span>
                    <span>{cart.total} ₽</span>
                  </div>
                </div>
              </div>

              {/* Кнопка оформления заказа */}
              <button
                onClick={handleCheckout}
                disabled={loading || isCheckingOut}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isCheckingOut ? 'Переход к оформлению...' : 'Оформить заказ'}
              </button>

              {/* Дополнительная информация */}
              <div className="mt-6 text-sm text-gray-500">
                <p>• Бесплатная доставка при заказе от 2000 ₽</p>
                <p>• Оплата при получении</p>
                <p>• Гарантия качества</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
