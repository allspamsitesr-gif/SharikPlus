"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [refreshKey, setRefreshKey] = useState(0)

  // Загрузка заказов из API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/orders')
        const data = await response.json()
        
        if (data.success) {
          setOrders(data.data.orders || [])
        } else {
          console.error('Ошибка загрузки заказов:', data.error)
        }
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [refreshKey])

  // Обновление заказов
  const refreshOrders = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Обновление статуса заказа
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Здесь можно добавить API вызов для обновления статуса
      console.log(`Обновление статуса заказа ${orderId} на ${newStatus}`)
      
      // Обновляем локально для демонстрации
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Ошибка обновления статуса:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PLACED: { variant: "secondary" as const, label: "Оформлен" },
      PROCESSING: { variant: "warning" as const, label: "В обработке" },
      SHIPPED: { variant: "default" as const, label: "Отправлен" },
      DELIVERED: { variant: "success" as const, label: "Доставлен" },
      CANCELLED: { variant: "destructive" as const, label: "Отменён" },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PLACED
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const completedOrders = orders.filter(order => order.status === "DELIVERED").length
  const pendingOrders = orders.filter(order => order.status === "PLACED").length
  const processingOrders = orders.filter(order => order.status === "PROCESSING").length

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Заказы
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Управление заказами клиентов ({filteredOrders.length} из {orders.length})
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={refreshOrders} variant="outline" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {orders.length}
              </div>
              <div className="text-sm text-gray-500">Всего заказов</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {completedOrders}
              </div>
              <div className="text-sm text-gray-500">Выполнено</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {processingOrders}
              </div>
              <div className="text-sm text-gray-500">В обработке</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {totalRevenue.toLocaleString()} ₽
              </div>
              <div className="text-sm text-gray-500">Общая выручка</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск по номеру заказа, имени или email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="all">Все статусы</option>
              <option value="PLACED">Оформлен</option>
              <option value="PROCESSING">В обработке</option>
              <option value="SHIPPED">Отправлен</option>
              <option value="DELIVERED">Доставлен</option>
              <option value="CANCELLED">Отменён</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Список заказов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Заказ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Клиент</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Товаров</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Сумма</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Статус</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Загрузка заказов...</p>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <p className="text-gray-500">Заказы не найдены</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {order.orderNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {order.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customerEmail}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-900 dark:text-white">
                            {order.items?.length || 0} шт
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {order.total.toLocaleString()} ₽
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            >
                              <option value="PLACED">Оформлен</option>
                              <option value="PROCESSING">В обработке</option>
                              <option value="SHIPPED">Отправлен</option>
                              <option value="DELIVERED">Доставлен</option>
                              <option value="CANCELLED">Отменён</option>
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    
  )
}