"use client"

import React from "react"
import { motion } from "framer-motion"
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
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const salesData = [
  { name: "Янв", sales: 4000, orders: 240 },
  { name: "Фев", sales: 3000, orders: 198 },
  { name: "Мар", sales: 5000, orders: 300 },
  { name: "Апр", sales: 4500, orders: 278 },
  { name: "Май", sales: 6000, orders: 389 },
  { name: "Июн", sales: 5500, orders: 349 },
  { name: "Июл", sales: 7000, orders: 430 },
]

const categoryData = [
  { name: "Латексные шары", value: 35, color: "#8B5CF6" },
  { name: "Фольгированные", value: 25, color: "#3B82F6" },
  { name: "Наборы", value: 20, color: "#10B981" },
  { name: "Аксессуары", value: 15, color: "#F59E0B" },
  { name: "Другое", value: 5, color: "#EF4444" },
]

const recentOrders = [
  { id: "#1234", customer: "Анна Иванова", amount: 2500, status: "Выполнен" },
  { id: "#1235", customer: "Петр Сидоров", amount: 1800, status: "В обработке" },
  { id: "#1236", customer: "Мария Петрова", amount: 3200, status: "Доставка" },
  { id: "#1237", customer: "Иван Козлов", amount: 1500, status: "Новый" },
  { id: "#1238", customer: "Елена Смирнова", amount: 4100, status: "Выполнен" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey === "sales" ? "Продажи" : "Заказы"}: {entry.value}
            {entry.dataKey === "sales" ? " ₽" : ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="lg:col-span-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Продажи и заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Категории товаров</CardTitle>
          </CardHeader>
          <CardContent>
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
                  formatter={(value) => [`${value}%`, "Доля"]}
                  labelStyle={{ color: "#374151" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="lg:col-span-3"
      >
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {order.customer.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount} ₽</div>
                    <div className={`text-sm px-2 py-1 rounded-full inline-block ${
                      order.status === "Выполнен" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : order.status === "В обработке"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : order.status === "Доставка"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}