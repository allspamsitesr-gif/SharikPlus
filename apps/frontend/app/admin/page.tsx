"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { StatsCards } from '@/components/admin/stats-cards'
import { SalesChart, CategoryChart, VisitorsChart, RevenueChart } from '@/components/admin/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Package, ShoppingCart, User } from 'lucide-react'

const recentOrders = [
  { id: "#1234", customer: "Анна Иванова", amount: 2500, status: "completed", time: "2 мин назад" },
  { id: "#1235", customer: "Петр Сидоров", amount: 1800, status: "processing", time: "15 мин назад" },
  { id: "#1236", customer: "Мария Петрова", amount: 3200, status: "shipped", time: "1 час назад" },
  { id: "#1237", customer: "Иван Козлов", amount: 1500, status: "pending", time: "2 часа назад" },
  { id: "#1238", customer: "Елена Смирнова", amount: 4200, status: "completed", time: "3 часа назад" }
]

const recentProducts = [
  { name: "Набор 'День рождения'", category: "Наборы", stock: 15, price: 1500 },
  { name: "Свадебная арка", category: "Свадебные", stock: 8, price: 5000 },
  { name: "Латексные шары красные", category: "Латексные", stock: 45, price: 50 },
  { name: "Фольгированное сердце", category: "Фольгированные", stock: 12, price: 200 }
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { variant: "secondary" as const, label: "Ожидает", color: "bg-yellow-100 text-yellow-800" },
    processing: { variant: "warning" as const, label: "В обработке", color: "bg-blue-100 text-blue-800" },
    shipped: { variant: "default" as const, label: "Отправлен", color: "bg-purple-100 text-purple-800" },
    completed: { variant: "success" as const, label: "Выполнен", color: "bg-green-100 text-green-800" },
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  return <Badge variant={config.variant} className={config.color}>{config.label}</Badge>
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Дашборд
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Добро пожаловать в админ-панель SharikPlus. Обзор ключевых метрик и аналитики.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <CategoryChart />
        <VisitorsChart />
        <RevenueChart />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span>Последние заказы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {order.customer.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{order.customer}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <span>{order.id}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{order.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">{order.amount} ₽</div>
                    {getStatusBadge(order.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-600" />
              <span>Популярные товары</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-medium">
                      🎈
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <span>{product.category}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Package className="w-3 h-3" />
                          <span>{product.stock} шт.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">{product.price} ₽</div>
                    <Badge variant="outline" className="text-xs">
                      {product.stock > 10 ? 'В наличии' : 'Мало'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <button className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="text-center">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Добавить товар</span>
          </div>
        </button>
        
        <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="text-center">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Новый заказ</span>
          </div>
        </button>
        
        <button className="p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="text-center">
            <User className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Добавить пользователя</span>
          </div>
        </button>
        
        <button className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="text-center">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Импорт данных</span>
          </div>
        </button>
      </motion.div>
    </div>
  )
}