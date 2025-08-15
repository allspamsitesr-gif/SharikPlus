"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: React.ReactNode
  color: string
  delay: number
}

const statsData: StatsCardProps[] = [
  {
    title: 'Общая выручка',
    value: '₽1,250,000',
    change: '+12.5%',
    changeType: 'increase',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    delay: 0.1
  },
  {
    title: 'Заказы',
    value: '1,234',
    change: '+8.2%',
    changeType: 'increase',
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
    delay: 0.2
  },
  {
    title: 'Товары',
    value: '567',
    change: '-2.1%',
    changeType: 'decrease',
    icon: <Package className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-600',
    delay: 0.3
  },
  {
    title: 'Пользователи',
    value: '2,345',
    change: '+15.3%',
    changeType: 'increase',
    icon: <Users className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    delay: 0.4
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stat.delay }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl blur-xl" />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {stat.title}
            </p>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Отдельная карточка для использования в других местах
export function StatsCard({ title, value, change, changeType, icon, color, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {changeType === 'increase' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {value}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {title}
      </p>
    </motion.div>
  )
}
