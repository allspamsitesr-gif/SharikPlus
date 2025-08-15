"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (999) 123-45-67',
      description: 'Пн-Вс: 9:00 - 21:00'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@sharikplus.ru',
      description: 'Ответим в течение 2 часов'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'г. Москва, ул. Примерная, д. 123',
      description: 'Офис и склад'
    },
    {
      icon: Clock,
      title: 'Режим работы',
      value: 'Ежедневно',
      description: '9:00 - 21:00'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Сообщение отправлено!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.
            </p>
            
            <div className="space-x-4">
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                Вернуться на главную
              </Link>
              
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-block border-2 border-purple-300 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-all"
              >
                Отправить ещё
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SharikPlus
              </h1>
              <p className="text-sm text-gray-600">Воздушные шары</p>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Свяжитесь с нами
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            У вас есть вопросы или нужна консультация? Мы всегда рады помочь! 
            Свяжитесь с нами любым удобным способом.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Контактная информация
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-lg text-gray-700 font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Дополнительная информация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white"
            >
              <h3 className="text-xl font-semibold mb-3">
                🎈 Специальные предложения
              </h3>
              <p className="mb-4">
                Подпишитесь на нашу рассылку и получайте эксклюзивные предложения, 
                скидки и новости о новых поступлениях!
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Подписаться
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Напишите нам
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="Ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email * <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тема
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="Вопрос о заказе"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение * <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Опишите ваш вопрос или пожелание..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Отправляем...' : 'Отправить сообщение'}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Часто задаваемые вопросы
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'Как долго выполняется заказ?',
                answer: 'Стандартные заказы выполняются в течение 1-3 дней. Срочные заказы - в день заказа.'
              },
              {
                question: 'Есть ли доставка в другие города?',
                answer: 'Да, мы доставляем по всей России. Стоимость и сроки зависят от региона.'
              },
              {
                question: 'Можно ли заказать индивидуальный дизайн?',
                answer: 'Конечно! Наши дизайнеры создадут уникальную композицию под ваши пожелания.'
              },
              {
                question: 'Какие способы оплаты принимаете?',
                answer: 'Наличные при получении, банковские карты, электронные платежи.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
