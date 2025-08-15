"use client"

import Link from "next/link"
import { ArrowLeft, Star, Filter, Search, ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { useState } from "react"

export default function ProductsPage() {
  const { addToCart, isInCart, getItemQuantity } = useCart()
  const [products] = useState([
    {
      id: "1",
      name: "Набор 'День рождения'",
      price: 1500,
      comparePrice: 2000,
      image: "🎈",
      rating: 5,
      reviews: 24,
      category: "Наборы",
      description: "Яркий набор из 15 шаров для незабываемого дня рождения",
      inStock: true,
      featured: true
    },
    {
      id: "2",
      name: "Свадебная арка",
      price: 5000,
      comparePrice: 6000,
      image: "💒",
      rating: 5,
      reviews: 18,
      category: "Свадебные",
      description: "Элегантная арка из белых и розовых шаров для торжества",
      inStock: true,
      featured: false
    },
    {
      id: "3",
      name: "Корпоративное оформление",
      price: 8000,
      comparePrice: 10000,
      image: "🏢",
      rating: 4,
      reviews: 12,
      category: "Корпоративные",
      description: "Профессиональное оформление для деловых мероприятий",
      inStock: true,
      featured: false
    },
    {
      id: "4",
      name: "Латексные шары красные",
      price: 50,
      comparePrice: 75,
      image: "🔴",
      rating: 5,
      reviews: 156,
      category: "Латексные",
      description: "Качественные латексные шары ярко-красного цвета",
      inStock: true,
      featured: true
    },
    {
      id: 5,
      name: "Фольгированное сердце",
      price: 200,
      comparePrice: 250,
      image: "💖",
      rating: 5,
      reviews: 89,
      category: "Фольгированные",
      description: "Романтичное фольгированное сердце для признаний",
      inStock: false,
      featured: true
    },
    {
      id: "6",
      name: "Цифра на день рождения",
      price: 300,
      comparePrice: 400,
      image: "🔢",
      rating: 4,
      reviews: 67,
      category: "Цифры",
      description: "Большая фольгированная цифра любого возраста",
      inStock: true,
      featured: false
    }
  ])

  const categories = [
    { name: "Все", count: products.length, active: true },
    { name: "Наборы", count: 1, active: false },
    { name: "Свадебные", count: 1, active: false },
    { name: "Корпоративные", count: 1, active: false },
    { name: "Латексные", count: 1, active: false },
    { name: "Фольгированные", count: 1, active: false },
    { name: "Цифры", count: 1, active: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                На главную
              </Link>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🎈</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SharikPlus
                </span>
              </div>
            </div>
            
            <Link 
              href="/admin"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
            >
              Админ
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Каталог товаров
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Выберите идеальные воздушные шары для вашего праздника
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-purple-500" />
                  Категории
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        category.active
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className={`text-sm ${category.active ? 'text-purple-100' : 'text-gray-500'}`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Цена</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="От"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="number"
                      placeholder="До"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                    Применить
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Популярные теги</h3>
                <div className="flex flex-wrap gap-2">
                  {['Популярное', 'Новинки', 'Скидки', 'В наличии'].map((tag, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Найдено <span className="font-semibold">{products.length}</span> товаров
              </p>
              
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                <option>По популярности</option>
                <option>По цене: сначала дешёвые</option>
                <option>По цене: сначала дорогие</option>
                <option>По рейтингу</option>
                <option>Новинки</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 relative">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.featured && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Хит
                      </span>
                    )}
                    {product.comparePrice && product.comparePrice > product.price && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Скидка
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-20">
                      <span className="bg-gray-800 text-white px-4 py-2 rounded-full font-medium">
                        Нет в наличии
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="p-8 text-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <div className="text-6xl mb-4 animate-float">{product.image}</div>
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviews} отзывов)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-600">
                          {product.price} ₽
                        </span>
                        {product.comparePrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {product.comparePrice} ₽
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cart Actions */}
                    <div className="space-y-3">
                      {product.inStock ? (
                        isInCart(product.id) ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => addToCart(product, getItemQuantity(product.id) - 1)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium text-gray-900">
                                {getItemQuantity(product.id)}
                              </span>
                              <button
                                onClick={() => addToCart(product, getItemQuantity(product.id) + 1)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-sm text-green-600 font-medium">
                              В корзине
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-medium flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>В корзину</span>
                          </button>
                        )
                      ) : (
                        <button 
                          className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                          disabled
                        >
                          Недоступно
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Предыдущая
                </button>
                
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Следующая
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}