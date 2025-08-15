"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Набор 'День рождения'",
      sku: "BALLOON-BD-001",
      price: 1500,
      stock: 25,
      category: "Наборы",
      status: "active",
    },
    {
      id: 2,
      name: "Свадебная арка",
      sku: "BALLOON-WED-001",
      price: 5000,
      stock: 8,
      category: "Свадебные",
      status: "active",
    },
    {
      id: 3,
      name: "Корпоративное оформление",
      sku: "BALLOON-CORP-001",
      price: 8000,
      stock: 12,
      category: "Корпоративные",
      status: "active",
    },
    {
      id: 4,
      name: "Латексные шары красные",
      sku: "BALLOON-LAT-RED",
      price: 50,
      stock: 150,
      category: "Латексные",
      status: "active",
    },
    {
      id: 5,
      name: "Фольгированное сердце",
      sku: "BALLOON-FOIL-HEART",
      price: 200,
      stock: 0,
      category: "Фольгированные",
      status: "inactive",
    },
  ]

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Товары
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Управление каталогом товаров
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
            ➕ Добавить товар
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {products.length}
              </div>
              <div className="text-sm text-gray-500">Всего товаров</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === "active").length}
              </div>
              <div className="text-sm text-gray-500">Активных</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {products.filter(p => p.stock === 0).length}
              </div>
              <div className="text-sm text-gray-500">Нет в наличии</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {products.filter(p => p.stock > 0 && p.stock <= 10).length}
              </div>
              <div className="text-sm text-gray-500">Заканчиваются</div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Список товаров</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Товар</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Категория</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Цена</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Остаток</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Статус</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sku}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">{product.price.toLocaleString()} ₽</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "destructive"}>
                          {product.stock} шт
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.status === "active" ? "success" : "secondary"}>
                          {product.status === "active" ? "Активен" : "Неактивен"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">👁️</Button>
                          <Button variant="ghost" size="sm">✏️</Button>
                          <Button variant="ghost" size="sm">🗑️</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    
  )
}