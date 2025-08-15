"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const sidebarItems: SidebarItem[] = [
  { title: 'Дашборд', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { title: 'Пользователи', href: '/admin/users', icon: <Users className="w-5 h-5" />, badge: '12' },
  { title: 'Товары', href: '/admin/products', icon: <Package className="w-5 h-5" />, badge: '45' },
  { title: 'Заказы', href: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" />, badge: '8' },
  { title: 'Аналитика', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { title: 'Настройки', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
]

export function ModernSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎈</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SharikPlus
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <div className={cn(
                "transition-colors",
                isActive ? "text-white" : "text-gray-500 group-hover:text-purple-600"
              )}>
                {item.icon}
              </div>
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-2 h-2 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Home className="w-5 h-5 text-gray-500" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                key="home"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium"
              >
                Вернуться на сайт
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        
        <button className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full">
          <LogOut className="w-5 h-5 text-gray-500" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                key="logout"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium"
              >
                Выйти
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
