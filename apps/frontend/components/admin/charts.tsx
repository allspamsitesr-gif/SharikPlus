"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Данные для графиков
const salesData = [
  { month: 'Янв', sales: 120000, orders: 45 },
  { month: 'Фев', sales: 180000, orders: 62 },
  { month: 'Мар', sales: 150000, orders: 58 },
  { month: 'Апр', sales: 220000, orders: 78 },
  { month: 'Май', sales: 280000, orders: 95 },
  { month: 'Июн', sales: 320000, orders: 112 },
  { month: 'Июл', sales: 290000, orders: 98 },
  { month: 'Авг', sales: 350000, orders: 125 },
  { month: 'Сен', sales: 380000, orders: 135 },
  { month: 'Окт', sales: 420000, orders: 148 },
  { month: 'Ноя', sales: 450000, orders: 162 },
  { month: 'Дек', sales: 520000, orders: 185 }
]

const categoryData = [
  { name: 'Наборы', value: 35, color: '#8B5CF6' },
  { name: 'Свадебные', value: 25, color: '#EC4899' },
  { name: 'Корпоративные', value: 20, color: '#3B82F6' },
  { name: 'Латексные', value: 15, color: '#10B981' },
  { name: 'Фольгированные', value: 5, color: '#F59E0B' }
]

const visitorData = [
  { day: 'Пн', visitors: 1200, pageViews: 3400 },
  { day: 'Вт', visitors: 1350, pageViews: 3800 },
  { day: 'Ср', visitors: 1100, pageViews: 3200 },
  { day: 'Чт', visitors: 1400, pageViews: 4000 },
  { day: 'Пт', visitors: 1600, pageViews: 4500 },
  { day: 'Сб', visitors: 1800, pageViews: 5200 },
  { day: 'Вс', visitors: 2000, pageViews: 5800 }
]

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Продажи по месяцам
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Продажи</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Заказы</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function CategoryChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Продажи по категориям
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        {categoryData.map((category, index) => (
          <div key={category.name} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {category.name}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
              {category.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function VisitorsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Посетители по дням недели
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Посетители</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Просмотры</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={visitorData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="day" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="visitors" 
            stackId="1"
            stroke="#10B981" 
            fill="#10B981"
            fillOpacity={0.3}
          />
          <Area 
            type="monotone" 
            dataKey="pageViews" 
            stackId="1"
            stroke="#F59E0B" 
            fill="#F59E0B"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Выручка по месяцам
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Bar 
            dataKey="sales" 
            fill="url(#gradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
