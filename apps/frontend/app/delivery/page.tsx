"use client"

import Link from 'next/link'
import { ArrowLeft, Truck, Clock, CreditCard, Shield } from 'lucide-react'

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Доставка и оплата
              </h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Truck className="w-5 h-5 mr-2 text-purple-500"/> Доставка</h2>
            <ul className="space-y-3 text-gray-700">
              <li>— По Москве: в день заказа или на следующий день</li>
              <li>— По области: в течение 1–3 дней</li>
              <li>— Самовывоз: бесплатно из нашего офиса</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-purple-500"/> График</h2>
            <p className="text-gray-700">Доставляем ежедневно с 9:00 до 21:00. Срочные заказы согласовываются отдельно.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-purple-500"/> Оплата</h2>
            <ul className="space-y-3 text-gray-700">
              <li>— Банковские карты</li>
              <li>— Наличные при получении</li>
              <li>— Безналичный расчёт для юр. лиц</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Shield className="w-5 h-5 mr-2 text-purple-500"/> Гарантии</h2>
            <p className="text-gray-700">Если с заказом возникнет проблема, мы оперативно заменим товар или вернём деньги.</p>
          </div>
        </div>
      </div>
    </div>
  )
}