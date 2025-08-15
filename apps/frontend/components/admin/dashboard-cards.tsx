"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  value: string | number
  change: number
  changeType: "increase" | "decrease"
  icon: React.ReactNode
  color: string
}

function DashboardCard({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}: DashboardCardProps) {
  const isPositive = changeType === "increase"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`font-medium ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-gray-500">за месяц</span>
          </div>
        </CardContent>
        
        {/* Gradient overlay */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div className={`w-full h-full rounded-full ${color.replace('bg-', 'bg-gradient-to-br from-')}`} />
        </div>
      </Card>
    </motion.div>
  )
}

export function DashboardCards() {
  const cards = [
    {
      title: "Общая выручка",
      value: formatCurrency(1250000),
      change: 12.5,
      changeType: "increase" as const,
      icon: <DollarSign className="h-5 w-5 text-white" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Заказы",
      value: "1,234",
      change: 8.2,
      changeType: "increase" as const,
      icon: <ShoppingCart className="h-5 w-5 text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Товары",
      value: "567",
      change: -2.1,
      changeType: "decrease" as const,
      icon: <Package className="h-5 w-5 text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Пользователи",
      value: "2,345",
      change: 15.3,
      changeType: "increase" as const,
      icon: <Users className="h-5 w-5 text-white" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <DashboardCard {...card} />
        </motion.div>
      ))}
    </div>
  )
}