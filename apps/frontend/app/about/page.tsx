import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, Users, Heart, Star, Truck, Shield, Clock } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '5000+', label: 'Довольных клиентов', icon: Users },
    { number: '15000+', label: 'Реализованных заказов', icon: Heart },
    { number: '4.9', label: 'Средний рейтинг', icon: Star },
    { number: '5 лет', label: 'На рынке', icon: Award }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Качество',
      description: 'Мы используем только лучшие материалы и следуем строгим стандартам качества'
    },
    {
      icon: Truck,
      title: 'Надёжность',
      description: 'Быстрая доставка и выполнение заказов точно в срок'
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Гарантируем безопасность всех наших продуктов для детей и взрослых'
    },
    {
      icon: Clock,
      title: '24/7 поддержка',
      description: 'Наша команда поддержки готова помочь в любое время'
    }
  ]

  const team = [
    {
      name: 'Анна Петрова',
      position: 'Основатель и CEO',
      image: '👩‍💼',
      description: '10+ лет опыта в индустрии праздничного оформления'
    },
    {
      name: 'Михаил Сидоров',
      position: 'Главный дизайнер',
      image: '👨‍🎨',
      description: 'Создаёт уникальные композиции для особых случаев'
    },
    {
      name: 'Елена Козлова',
      position: 'Менеджер по работе с клиентами',
      image: '👩‍💻',
      description: 'Помогает клиентам выбрать идеальное оформление'
    }
  ]

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
              О компании
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаём незабываемые моменты с помощью ярких и качественных воздушных шаров. 
            Наша миссия — превратить каждый праздник в волшебное событие.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Всё началось в 2019 году, когда наша команда энтузиастов решила 
                  создать нечто особенное в мире праздничного оформления.
                </p>
                <p>
                  Мы начали с небольшой мастерской, где создавали уникальные композиции 
                  из воздушных шаров для друзей и знакомых.
                </p>
                <p>
                  Сегодня SharikPlus — это ведущий бренд в области праздничного оформления, 
                  который помог создать тысячи незабываемых моментов.
                </p>
                <p>
                  Мы гордимся тем, что каждый наш клиент становится частью нашей большой 
                  семьи и возвращается к нам снова и снова.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🎈✨</div>
              <p className="text-lg text-gray-600 font-medium">
                Создаём праздник с 2019 года
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Наши ценности
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Наша команда
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Готовы создать незабываемый праздник?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам довольных клиентов SharikPlus
          </p>
          <div className="space-x-4">
            <Link
              href="/products"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
