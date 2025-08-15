"use client"

import React from "react"
import { motion } from "framer-motion"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardCards } from "@/components/admin/dashboard-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react"

export default function DemoPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Демонстрация компонентов
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Все компоненты современной админ-панели в стиле Modernize
          </p>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Карточки статистики
          </h2>
          <DashboardCards />
        </motion.section>

        {/* Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Кнопки
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Варианты кнопок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Основная</Button>
                <Button variant="secondary">Вторичная</Button>
                <Button variant="outline">Контур</Button>
                <Button variant="ghost">Призрак</Button>
                <Button variant="destructive">Удалить</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Градиент
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button size="sm">Маленькая</Button>
                <Button size="default">Обычная</Button>
                <Button size="lg">Большая</Button>
                <Button size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Бейджи
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Статусы и метки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge>По умолчанию</Badge>
                <Badge variant="secondary">Вторичный</Badge>
                <Badge variant="outline">Контур</Badge>
                <Badge variant="destructive">Ошибка</Badge>
                <Badge variant="success">Успех</Badge>
                <Badge variant="warning">Предупреждение</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Forms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Формы
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Элементы форм</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Название товара
                  </label>
                  <Input placeholder="Введите название товара" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Цена
                  </label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Описание
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                  rows={3}
                  placeholder="Описание товара"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Dropdowns and Dialogs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Интерактивные элементы
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Меню и модальные окна</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="h-4 w-4 mr-2" />
                      Действия
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Открыть модальное окно</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Подтверждение действия</DialogTitle>
                      <DialogDescription>
                        Вы уверены, что хотите выполнить это действие? Это действие нельзя отменить.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Отмена</Button>
                      <Button>Подтвердить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Icons Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Иконки
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Lucide React Icons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
                {[
                  Package,
                  ShoppingCart,
                  Users,
                  Settings,
                  Edit,
                  Trash2,
                  Eye,
                  Plus,
                  MoreHorizontal,
                ].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Цветовая палитра
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Modernize Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg"></div>
                  <div className="text-sm font-medium">Purple</div>
                  <div className="text-xs text-gray-500">#8B5CF6</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
                  <div className="text-sm font-medium">Blue</div>
                  <div className="text-xs text-gray-500">#3B82F6</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg"></div>
                  <div className="text-sm font-medium">Green</div>
                  <div className="text-xs text-gray-500">#10B981</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg"></div>
                  <div className="text-sm font-medium">Orange</div>
                  <div className="text-xs text-gray-500">#F59E0B</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </AdminLayout>
  )
}