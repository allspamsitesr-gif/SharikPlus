"use client"

import React, { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general")
  const [settings, setSettings] = useState({
    storeName: "SharikPlus",
    storeDescription: "Интернет-магазин воздушных шаров",
    storeEmail: "info@sharikplus.ru",
    storePhone: "+7 (999) 123-45-67",
    currency: "RUB",
    theme: "system",
    emailNotifications: true,
    pushNotifications: true,
    orderNotifications: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
  })

  const settingsSections = [
    {
      id: "general",
      title: "Общие настройки",
      description: "Основная информация о магазине",
      icon: "🌐",
    },
    {
      id: "appearance",
      title: "Внешний вид",
      description: "Настройки темы и интерфейса",
      icon: "🎨",
    },
    {
      id: "notifications",
      title: "Уведомления",
      description: "Настройки email и push уведомлений",
      icon: "🔔",
    },
    {
      id: "security",
      title: "Безопасность",
      description: "Настройки безопасности и доступа",
      icon: "🔐",
    },
  ]

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings))
    alert("Настройки сохранены!")
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Название магазина
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => handleInputChange("storeName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            placeholder="Название вашего магазина"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.storeEmail}
            onChange={(e) => handleInputChange("storeEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Описание
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          rows={3}
          value={settings.storeDescription}
          onChange={(e) => handleInputChange("storeDescription", e.target.value)}
          placeholder="Краткое описание вашего магазина"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Телефон
          </label>
          <input
            type="text"
            value={settings.storePhone}
            onChange={(e) => handleInputChange("storePhone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            placeholder="+7 (999) 123-45-67"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Валюта
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            value={settings.currency}
            onChange={(e) => handleInputChange("currency", e.target.value)}
          >
            <option value="RUB">Российский рубль (₽)</option>
            <option value="USD">Доллар США ($)</option>
            <option value="EUR">Евро (€)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Тема интерфейса
        </label>
        <div className="grid gap-3 md:grid-cols-3">
          {["light", "dark", "system"].map((theme) => (
            <button
              key={theme}
              onClick={() => handleInputChange("theme", theme)}
              className={`p-4 border rounded-lg text-left transition-all ${
                settings.theme === theme
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">
                {theme === "light" ? "Светлая" : theme === "dark" ? "Тёмная" : "Системная"}
              </div>
              <div className="text-sm text-gray-500">
                {theme === "light" 
                  ? "Всегда светлая тема" 
                  : theme === "dark" 
                  ? "Всегда тёмная тема" 
                  : "Следует системным настройкам"
                }
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {[
        { key: "emailNotifications", label: "Email уведомления", description: "Получать уведомления на email" },
        { key: "pushNotifications", label: "Push уведомления", description: "Уведомления в браузере" },
        { key: "orderNotifications", label: "Уведомления о заказах", description: "Уведомления о новых заказах" },
      ].map((notification) => (
        <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {notification.label}
            </div>
            <div className="text-sm text-gray-500">
              {notification.description}
            </div>
          </div>
          <button
            onClick={() => handleInputChange(notification.key, !settings[notification.key as keyof typeof settings])}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings[notification.key as keyof typeof settings]
                ? "bg-purple-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings[notification.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            Двухфакторная аутентификация
          </div>
          <div className="text-sm text-gray-500">
            Дополнительная защита аккаунта
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleInputChange("twoFactorAuth", !settings.twoFactorAuth)}
        >
          {settings.twoFactorAuth ? "Отключить" : "Включить"}
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Время сессии (минуты)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
          min="5"
          max="480"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
        />
        <p className="text-sm text-gray-500 mt-1">
          Автоматический выход через указанное время бездействия
        </p>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings()
      case "appearance":
        return renderAppearanceSettings()
      case "notifications":
        return renderNotificationSettings()
      case "security":
        return renderSecuritySettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Настройки
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Управление настройками админ-панели
            </p>
          </div>
          <Button onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-blue-600">
            💾 Сохранить
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Settings Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Разделы</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-r-2 border-purple-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-sm text-gray-500">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {settingsSections.find(s => s.id === activeSection)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
  )
}