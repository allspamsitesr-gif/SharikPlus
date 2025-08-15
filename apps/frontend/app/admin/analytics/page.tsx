"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  const salesData = [
    { month: "Янв", sales: 45000, orders: 120 },
    { month: "Фев", sales: 52000, orders: 145 },
    { month: "Мар", sales: 48000, orders: 132 },
    { month: "Апр", sales: 61000, orders: 168 },
    { month: "Май", sales: 55000, orders: 155 },
    { month: "Июн", sales: 67000, orders: 189 },
  ]

  const categoryData = [
    { name: "Латексные шары", value: 35, sales: 245000 },
    { name: "Фольгированные", value: 25, sales: 175000 },
    { name: "Наборы для праздников", value: 20, sales: 140000 },
    { name: "Свадебные композиции", value: 15, sales: 105000 },
    { name: "Аксессуары", value: 5, sales: 35000 },
  ]

  const topProducts = [
    { name: "Набор 'День рождения'", sales: 1250, revenue: 187500 },
    { name: "Свадебная арка", sales: 890, revenue: 445000 },
    { name: "Латексные красные", sales: 2340, revenue: 117000 },
    { name: "Фольгированное сердце", sales: 1560, revenue: 312000 },
    { name: "Корпоративный набор", sales: 670, revenue: 536000 },
  ]

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Аналитика
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Детальная аналитика продаж и поведения клиентов
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Общая выручка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                700,000 ₽
              </div>
              <div className="flex items-center text-sm text-green-600">
                <span>+12.5%</span>
                <span className="ml-1 text-gray-500">за месяц</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Конверсия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                3.2%
              </div>
              <div className="flex items-center text-sm text-green-600">
                <span>+0.8%</span>
                <span className="ml-1 text-gray-500">за месяц</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Средний чек
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                2,850 ₽
              </div>
              <div className="flex items-center text-sm text-red-600">
                <span>-2.1%</span>
                <span className="ml-1 text-gray-500">за месяц</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Новые клиенты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                148
              </div>
              <div className="flex items-center text-sm text-green-600">
                <span>+15.3%</span>
                <span className="ml-1 text-gray-500">за месяц</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Динамика продаж</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <div className="text-gray-600 dark:text-gray-400">График продаж по месяцам</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {salesData.map((item, index) => (
                      <span key={index} className="inline-block mx-2">
                        {item.month}: {item.sales.toLocaleString()} ₽
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Продажи по категориям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.value}% ({item.sales.toLocaleString()} ₽)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Топ товары</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.sales} продаж
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.revenue.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Источники трафика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Прямые переходы", visitors: 3420, percentage: 45 },
                  { source: "Поисковые системы", visitors: 2890, percentage: 38 },
                  { source: "Социальные сети", visitors: 890, percentage: 12 },
                  { source: "Реклама", visitors: 380, percentage: 5 },
                ].map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {source.source}
                      </span>
                      <span className="text-sm text-gray-500">
                        {source.visitors} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    
  )
}