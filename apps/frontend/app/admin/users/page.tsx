"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Анна Иванова",
      email: "anna@example.com",
      phone: "+7 (999) 123-45-67",
      role: "customer",
      status: "active",
      orders: 12,
      totalSpent: 45000,
      lastLogin: "2025-01-13T10:30:00Z",
      createdAt: "2024-06-15T09:00:00Z",
    },
    {
      id: 2,
      name: "Петр Сидоров",
      email: "petr@example.com",
      phone: "+7 (999) 234-56-78",
      role: "customer",
      status: "active",
      orders: 8,
      totalSpent: 28000,
      lastLogin: "2025-01-12T16:45:00Z",
      createdAt: "2024-08-20T14:30:00Z",
    },
    {
      id: 3,
      name: "Мария Петрова",
      email: "maria@example.com",
      phone: "+7 (999) 345-67-89",
      role: "customer",
      status: "inactive",
      orders: 3,
      totalSpent: 12000,
      lastLogin: "2024-12-20T11:15:00Z",
      createdAt: "2024-09-10T10:00:00Z",
    },
    {
      id: 4,
      name: "Администратор",
      email: "admin@sharikplus.ru",
      phone: "+7 (999) 000-00-00",
      role: "admin",
      status: "active",
      orders: 0,
      totalSpent: 0,
      lastLogin: "2025-01-13T12:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 5,
      name: "Менеджер Иван",
      email: "manager@sharikplus.ru",
      phone: "+7 (999) 111-11-11",
      role: "manager",
      status: "active",
      orders: 0,
      totalSpent: 0,
      lastLogin: "2025-01-13T09:30:00Z",
      createdAt: "2024-03-15T12:00:00Z",
    },
  ]

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { variant: "destructive" as const, label: "Администратор" },
      manager: { variant: "warning" as const, label: "Менеджер" },
      customer: { variant: "secondary" as const, label: "Клиент" },
    }
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.customer
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "success" : "secondary"}>
        {status === "active" ? "Активен" : "Неактивен"}
      </Badge>
    )
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

  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === "active").length
  const customers = users.filter(user => user.role === "customer").length
  const admins = users.filter(user => user.role === "admin" || user.role === "manager").length

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Пользователи
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Управление пользователями и их правами доступа
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
            👤 Добавить пользователя
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👥</span>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalUsers}
                  </div>
                  <div className="text-sm text-gray-500">Всего пользователей</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {activeUsers}
                  </div>
                  <div className="text-sm text-gray-500">Активных</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🛍️</span>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {customers}
                  </div>
                  <div className="text-sm text-gray-500">Клиентов</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔐</span>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {admins}
                  </div>
                  <div className="text-sm text-gray-500">Администраторов</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Список пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Пользователь</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Роль</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Статус</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Заказов</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Потрачено</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Последний вход</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">{user.orders}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.totalSpent.toLocaleString()} ₽
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(user.lastLogin)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">👁️</Button>
                          <Button variant="ghost" size="sm">✏️</Button>
                          <Button variant="ghost" size="sm">🔒</Button>
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