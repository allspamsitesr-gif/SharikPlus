import Link from "next/link"
import { ArrowRight, Star, Heart, Gift, Sparkles } from "lucide-react"
import { CartWidget } from "@/components/cart/CartWidget"

export default function HomePage() {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Праздничное настроение",
      description: "Создаём незабываемые моменты с яркими воздушными шарами"
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      title: "Готовые наборы",
      description: "Тематические композиции для любого праздника"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: "Быстрая доставка",
      description: "Доставим ваш заказ в день праздника"
    }
  ]

  const products = [
    {
      id: 1,
      name: "Набор 'День рождения'",
      price: "1,500 ₽",
      image: "🎈",
      rating: 5,
      category: "Наборы"
    },
    {
      id: 2,
      name: "Свадебная арка",
      price: "5,000 ₽", 
      image: "💒",
      rating: 5,
      category: "Свадебные"
    },
    {
      id: 3,
      name: "Корпоративное оформление",
      price: "8,000 ₽",
      image: "🏢",
      rating: 4,
      category: "Корпоративные"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎈</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SharikPlus
                </h1>
                <p className="text-sm text-gray-600">Воздушные шары</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
                Каталог
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                О нас
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
                Контакты
              </Link>
              
              {/* Корзина */}
              <CartWidget />
              
              <Link 
                href="/admin" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Админ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Воздушные шары
              </span>
              <br />
              <span className="text-gray-800">для любого праздника</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Создаём незабываемые моменты с яркими композициями из воздушных шаров. 
              От дня рождения до свадьбы — у нас есть всё для вашего праздника!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Смотреть каталог
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link 
                href="/admin"
                className="border-2 border-purple-300 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all flex items-center justify-center"
              >
                Админ панель
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Почему выбирают нас
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Популярные товары
            </h2>
            <p className="text-gray-600">
              Самые востребованные композиции для ваших праздников
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                <div className="p-8 text-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({product.rating}.0)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      {product.price}
                    </span>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all">
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
            >
              Смотреть все товары
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать незабываемый праздник?
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Свяжитесь с нами для индивидуального заказа или выберите готовую композицию
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
            >
              Выбрать товары
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🎈</span>
                </div>
                <span className="text-xl font-bold">SharikPlus</span>
              </div>
              <p className="text-gray-400">
                Воздушные шары для любого праздника. Создаём незабываемые моменты!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Каталог</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-white transition-colors">Все товары</Link></li>
                <li><Link href="/products?category=birthday" className="hover:text-white transition-colors">День рождения</Link></li>
                <li><Link href="/products?category=wedding" className="hover:text-white transition-colors">Свадьба</Link></li>
                <li><Link href="/products?category=corporate" className="hover:text-white transition-colors">Корпоративные</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
                <li><Link href="/delivery" className="hover:text-white transition-colors">Доставка</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Админ панель</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 +7 (999) 123-45-67</p>
                <p>📧 info@sharikplus.ru</p>
                <p>📍 Москва, ул. Праздничная, 1</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SharikPlus. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}