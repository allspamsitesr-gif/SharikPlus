"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/hooks/useCart'

interface CheckoutForm {
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: 'cash' | 'card'
  notes: string
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Россия'
    },
    paymentMethod: 'cash',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CheckoutForm],
          [child]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.items.length === 0) {
      alert('Корзина пуста')
      return
    }

    if (!form.customerName || !form.customerEmail) {
      alert('Заполните обязательные поля')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          shippingAddress: form.shippingAddress,
          subtotal: cart.total,
          tax: 0,
          shipping: 0,
          discount: 0
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOrderNumber(data.data.orderNumber)
        setOrderSuccess(true)
        clearCart()
      } else {
        alert(data.error || 'Ошибка создания заказа')
      }
    } catch (error) {
      alert('Ошибка создания заказа')
      console.error('Error creating order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Заказ успешно оформлен!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Детали заказа
              </h2>
              <div className="text-left space-y-2">
                <p><span className="font-medium">Номер заказа:</span> {orderNumber}</p>
                <p><span className="font-medium">Сумма:</span> {cart.total} ₽</p>
                <p><span className="font-medium">Статус:</span> <span className="text-green-600">Оформлен</span></p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                Вернуться на главную
              </Link>
              
              <Link
                href="/products"
                className="inline-block border-2 border-purple-300 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-all ml-4"
              >
                Продолжить покупки
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Корзина пуста
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link
              href="/products"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Перейти к каталогу
            </Link>
          </div>
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
            href="/cart"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к корзине
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Оформление заказа</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Форма оформления */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Контактная информация */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Контактная информация
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя * <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="Ваше имя"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email * <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={form.customerPhone}
                        onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>

                {/* Адрес доставки */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Адрес доставки
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Улица и дом
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.street}
                        onChange={(e) => handleInputChange('shippingAddress.street', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="ул. Примерная, д. 123"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Город
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.city}
                        onChange={(e) => handleInputChange('shippingAddress.city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="Москва"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Индекс
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.postalCode}
                        onChange={(e) => handleInputChange('shippingAddress.postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                </div>

                {/* Способ оплаты */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Способ оплаты
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={form.paymentMethod === 'cash'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Наличными при получении</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={form.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Банковской картой онлайн</span>
                    </label>
                  </div>
                </div>

                {/* Дополнительная информация */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Комментарий к заказу
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Укажите особые пожелания по доставке или оформлению..."
                  />
                </div>

                {/* Кнопка оформления */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                >
                  {isSubmitting ? 'Оформляем заказ...' : 'Оформить заказ'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Итого заказа */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Итого заказа
              </h2>

              {/* Товары */}
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                        {item.image || '🎈'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.quantity} × {item.price} ₽</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {item.price * item.quantity} ₽
                    </span>
                  </div>
                ))}
              </div>

              {/* Детализация */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({cart.count}):</span>
                  <span>{cart.total} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка:</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Итого:</span>
                    <span>{cart.total} ₽</span>
                  </div>
                </div>
              </div>

              {/* Информация о доставке */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">Доставка</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Бесплатная доставка при заказе от 2000 ₽. 
                      Срок доставки: 1-3 дня.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
